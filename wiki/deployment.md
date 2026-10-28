# 도메인 홈페이지 배포와 이후 수정

기준일: 2026-10-28. **실제 Oracle VM 배포·외부 HTTPS 검증 완료.**

## 지금 접속할 주소

- https://studiokwonyc.com/ — 홈페이지 HTTP 200
- https://www.studiokwonyc.com/ — 루트 HTTPS로 HTTP 301 이동
- http://studiokwonyc.com/ — HTTPS로 HTTP 308 이동

가비아 도메인·DNS 연결은 이미 완료돼 이번에는 DNS를 변경하지 않았다. 도메인 재구매·VM 재생성·별도 호스팅 구매도 하지 않았다.

## 이번에 실제 진행한 순서

1. 기존 SSH 키로 서버를 읽기 전용 확인: Caddy active, 기존 root /usr/share/caddy, 디스크 여유 42G.
2. site/만 tar.gz로 패키징. 위키·Git·개인 키·로컬 환경은 포함하지 않음.
3. 기존 SSH/SCP로 서버 사용자 전용 임시 보관 폴더에 전송하고 SHA-256 확인.
4. /srv/studio-kwonyc/releases 아래 새 릴리스 폴더로 풀고 Caddy 읽기 권한 확인.
5. 새 Caddy 설정 validate → 기존 설정 백업 → current 심볼릭 링크 전환 → Caddy reload.
6. 서버 내부 HTTPS 응답의 HTML SHA-256과 릴리스 파일을 비교.
7. 외부 HTTPS·www·HTTP 이동 및 이미지·폰트 응답 확인. 외부 HTML도 로컬 파일 SHA-256과 일치.

## 배포 기록

| 항목 | 값 |
|---|---|
| 최초 릴리스 | 20261028T073458Z-7a65d36 |
| 사이트 소스 커밋 | 7a65d36 |
| 실제 파일 | /srv/studio-kwonyc/releases/20261028T073458Z-7a65d36 |
| Caddy 제공 경로 | /srv/studio-kwonyc/current |
| 이전 설정 백업 | /etc/caddy/Caddyfile.before-20261028T073458Z-7a65d36 |
| 업로드 보관 | /home/ubuntu/.studio-kwonyc-deploy |
| 아카이브 SHA-256 | 5a5a553415164f0ddd0204aa1e54e473b7edcb70aba8742af1905b0eb17b5ce6 |

초기 배포 이전에는 릴리스 폴더가 없었다. 기존 /usr/share/caddy 파일은 변경하지 않았으며 설정 백업으로 기본 페이지 복귀가 가능하다.

## 이후 수정 방법

**언제든 수정·재배포 가능하다.** 도메인은 유지하고 새 정적 파일을 올린다.

1. 내 PC에서 site/index.html, site/design.css, site/styles.css 등을 수정.
2. 내 PC PowerShell의 이 프로젝트 폴더에서 node scripts/serve-site.mjs 실행 → 로컬 화면 확인. 이미 실행 중이면 브라우저 새로고침.
3. node scripts/check-site.mjs와 관련 검사, 위키 갱신 후 Git 커밋·push.
4. **내 PC PowerShell**에서 아래 배포 스크립트 실행. Ubuntu SSH 창에서 실행하는 명령이 아니다.

```powershell
.\scripts\deploy-site.ps1 -PrivateKey "$env:USERPROFILE\Desktop\코덱스\ssh-key-2026-10-28.key"
```

개인 키가 다른 곳에 있으면 PrivateKey 경로만 실제 보관 위치로 바꾼다. 키 내용은 공유하거나 저장소에 올리지 않는다. 미커밋 site 변경이 있으면 스크립트가 중단하므로 먼저 커밋한다. 기존 SSH 신뢰 등록과 키 접근 권한이 필요하다.

5. https://studiokwonyc.com/ 에서 최신 내용·이미지·폰트·모바일을 확인. 이전 화면이면 Ctrl+F5로 새로고침.

GitHub push만으로 Oracle VM에 자동 배포되는 구성은 아니다. 현재는 이 스크립트를 실행해야 서버가 갱신된다. 게임은 기존 GitHub Pages 배포를 유지하며 홈페이지 배포가 게임 코드를 변경하지 않는다.

## 되돌리기

스크립트는 적용 중 reload·서버 내부 확인이 실패하면 이전 Caddy 설정과 current 링크를 복원하도록 작성했다. **성공 경로는 실제 실행했지만 실패를 강제로 발생시키는 복구 실험은 하지 않았다.**

첫 배포 이전 기본 페이지로 되돌려야 할 때만 **Ubuntu SSH 터미널**에서 다음을 실행한다.

```bash
sudo cp -p /etc/caddy/Caddyfile.before-20261028T073458Z-7a65d36 /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
```

validate 성공 후 sudo systemctl reload caddy. 이후 일반 업데이트의 이전 버전 복귀는 보관된 릴리스와 해당 Caddy 백업을 함께 확인하고 진행한다. 릴리스·업로드 파일 자동 삭제와 정기 백업은 아직 구성하지 않았다.

## 검증 범위

- PowerShell 배포 스크립트 문법 검사와 원격 shell 성공 경로 실제 실행.
- Caddy validate·active·reload 및 서버 내부 TLS/HTML 일치.
- 외부 클라이언트의 인증서 검증을 켠 HTTPS 성공. 인증서 상세 만료일·향후 갱신 실험과 구분.
- 실제 도메인의 design.css, 게임 이미지, Pretendard WOFF2, Poppins TTF HTTP 200·정상 Content-Type.
- 모바일 시각·터치·200% 확대는 이전 브라우저 자동 제어 오류로 미완료. 외부 HTTP 검증을 UI 검증으로 간주하지 않는다.
- 운영 무료 한도·MFA·예약 IP·SSH 소스 제한 등은 기존 [체크리스트](checklist.md)의 별도 항목이다.

공식 근거: [Caddy root와 /srv 권장](https://caddyserver.com/docs/caddyfile/directives/root), [validate·reload](https://caddyserver.com/docs/command-line).
