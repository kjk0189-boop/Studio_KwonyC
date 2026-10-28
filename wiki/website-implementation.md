# 홈페이지 구현과 로컬 미리보기

기준일: 2026-10-28. **1차 로컬 초안 구현, 실제 Oracle 도메인 배포 전.**

## 구성

별도 프레임워크·빌드·설치 없이 동작하는 정적 HTML/CSS/JavaScript로 만들었다. 준비된 Caddy 정적 배포에 맞추고 약 1GB VM에서 개발 서버를 운영할 필요를 줄인다. 이는 이번 초안의 구현 선택이며 사용자가 특정 프레임워크를 지정한 것은 아니다.

| 파일 | 수정 내용 |
|---|---|
| site/index.html | 소개 문구·게임/프로젝트·링크·기록 |
| site/styles.css | 색상·레이아웃·반응형·모션 감소 |
| site/app.js | 모바일 메뉴와 현재 섹션 표시 |
| site/assets/ | 승인 로고 복사본과 게임 개발 캡처 |
| scripts/serve-site.mjs | site 폴더만 제공하는 로컬 서버 |
| scripts/check-site.mjs | 리소스·앵커·메뉴 동작 검사 |
| scripts/site-graph.mjs | codegraph 부재 시 HTML 자산 연결 대체 그래프 |

## 미리보기

**내 PC Windows PowerShell**, 이 온라인 호스팅 프로젝트 폴더에서 실행한다. Ubuntu SSH 창이 아니다.

```powershell
node scripts/serve-site.mjs
```

출력된 http://127.0.0.1:4173/ 을 PC 브라우저에서 연다. 종료는 해당 터미널에서 Ctrl+C. 포트가 이미 사용 중이면 기존 미리보기 터미널을 확인하며 무관한 프로세스를 종료하지 않는다. 해당 주소는 내 PC 전용이며 휴대폰·외부 인터넷 공개 주소가 아니다.

package.json의 npm run dev도 동일한 명령을 실행한다. 배포 대상은 site 폴더 내용만이다. 위키·키·전체 작업 폴더를 웹 공개 경로로 올리지 않는다.

## 검증

```powershell
node --check site/app.js
node --check scripts/serve-site.mjs
node scripts/check-site.mjs
node scripts/site-graph.mjs
python scripts/validate_repository.py
```

- 문법·HTML 리소스·앵커 대상·단일 h1·placeholder 링크 없음·반응형/모션 감소 선언을 확인했다.
- 실제 app.js 이벤트를 모의 DOM으로 실행하여 메뉴 열기·Escape 닫기/초점·메뉴 항목 이동/초점·넓은 화면 전환·외부 클릭 닫기를 검사했다. 브라우저 레이아웃 테스트는 아니다.
- 로컬 HTTP 200·CSS 200·배포 대상 밖 wiki 경로 404와 브라우저 접근성 트리의 주요 콘텐츠 표시를 확인했다.
- 브라우저 자동 제어 URL 판별 실패로 스크린샷·모바일별 크기·가로 넘침·실제 터치·200% 확대는 미검증이다.
- 홈페이지에서 링크한 외부 게임의 이번 전체 플레이 재검증은 하지 않았다.
- codegraph 도구·CLI는 사용할 수 없어 작은 HTML 자산 참조 그래프를 대체로 생성했다. 전체 JavaScript 호출 그래프가 아니다.

## 검토 후 배포

디자인·문구와 공개 이력 확인 → 화면 크기별 실제 검증 → Caddyfile/기존 배포 백업 → site 내용 전송 → 경로/권한·Caddy 검증 → reload → 실제 도메인 검증. 현재 Oracle 설정·서비스는 변경하지 않았다.

경력 정보가 제공되면 실제 기간·역할·작업을 추가한다. 가짜 직장·학력·고객·수치·상표 등록 상태는 넣지 않는다.
