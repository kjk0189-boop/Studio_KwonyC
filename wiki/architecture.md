# 기술 구조

기준일: 2026-10-28.

## 현재

방문자 → 가비아 DNS → Oracle Osaka VM → Caddy → 기본 정적 페이지.

- Ubuntu 22.04.5 LTS / x86_64. 정확한 최종 Shape는 미확인.
- studiokwonyc.com, www는 CNAME으로 루트 연결.
- 안내한 Caddy 콘텐츠 경로: /usr/share/caddy.
- Caddy·HTTP·양쪽 HTTPS 표시는 사용자 출력·보고로 확인.
- 게임은 [기존 GitHub Pages](https://kjk0189-boop.github.io/haru-sudoku/) 운영.
- [홈페이지 저장소](https://github.com/kjk0189-boop/Studio_KwonyC)에 소스·로고·위키 관리.

## 구현 제안

현재 초안은 site/의 buildless HTML/CSS/JavaScript다. 추후 이 정적 파일을 VM에 배포하고 Caddy가 제공한다. 약 1GB VM에서 개발 서버·빌드를 상시 실행하지 않는다. 현재 서버에는 반영하지 않았다.

소개·게임·개발 프로젝트·이력·개발 기록을 담는다. 화면을 통째로 줄이는 대신 폭에 따라 열 수·간격·글자 크기를 조정한다. 게임은 기존 링크 활용 제안이며 이전은 미확정이다. DB·로그인·광고는 아직 없다.

후보 경로는 /, /games/, /projects/, /about/, /devlog/이며 한 페이지 섹션으로 시작할 수도 있다. 아직 확정 URL은 아니다.

## 배포와 복구

기존 Caddyfile·배포본 백업 → 전송 → 권한·설정 검토 → 검증·reload → 실제 도메인 확인 → 문제 시 이전 배포 복구. 배포 디렉터리·자동화는 구현 후 결정한다. Git 업로드만으로 서버가 바뀌지 않는다.

VM 한도·가격·정책은 변경 직전 공식 자료·콘솔에서 재확인한다. 무료 사용량·예약 IP·SSH 제한·백업은 별도 점검한다. 광고·분석 도입 시 실제 구성에 맞춘 운영 안내를 추가한다.
