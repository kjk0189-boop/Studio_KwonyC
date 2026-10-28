# 기술 구조

기준일: 2026-10-28.

## 현재

방문자 → 가비아 DNS → Oracle Osaka VM → Caddy → /srv/studio-kwonyc/current의 홈페이지.

- Ubuntu 22.04.5 LTS / x86_64. 정확한 최종 Shape는 미확인.
- studiokwonyc.com, www는 CNAME으로 루트 연결.
- 현재 Caddy 경로: /srv/studio-kwonyc/current. 이전 /usr/share/caddy는 보존.
- Caddy·HTTP·양쪽 HTTPS 표시는 사용자 출력·보고로 확인.
- 게임은 [기존 GitHub Pages](https://kjk0189-boop.github.io/haru-sudoku/) 운영.
- [홈페이지 저장소](https://github.com/kjk0189-boop/Studio_KwonyC)에 소스·로고·위키 관리.

## 구현 제안

현재 site/의 buildless HTML/CSS/JavaScript를 VM에 배포하고 Caddy가 제공한다. 약 1GB VM에서 개발 서버·빌드를 상시 실행하지 않는다. 실제 배포 결과는 [배포 기록](deployment.md)에 정리했다.

소개·게임·개발 프로젝트·이력·개발 기록을 담는다. 화면을 통째로 줄이는 대신 폭에 따라 열 수·간격·글자 크기를 조정한다. 게임은 기존 링크 활용 제안이며 이전은 미확정이다. DB·로그인·광고는 아직 없다.

후보 경로는 /, /games/, /projects/, /about/, /devlog/이며 한 페이지 섹션으로 시작할 수도 있다. 아직 확정 URL은 아니다.

## 배포와 복구

기존 Caddyfile 백업 → 새 releases 폴더 전송·검증 → current 링크 전환·reload → 실제 도메인 확인 순서다. deploy-site.ps1로 재배포하며 Git push만으로 서버가 바뀌지는 않는다. 적용 실패 복원 경로는 작성했지만 강제 실패 복구 실험은 미실행이다.

VM 한도·가격·정책은 변경 직전 공식 자료·콘솔에서 재확인한다. 무료 사용량·예약 IP·SSH 제한·백업은 별도 점검한다. 광고·분석 도입 시 실제 구성에 맞춘 운영 안내를 추가한다.
