# 게임 목록과 홈페이지 연결

## 하루 스도쿠

- 사용자 확인: 같은 상위 코덱스 폴더의 `스도쿠 개발하기`에 프로젝트가 있으며 온라인 배포 완료.
- 로컬 경로: `C:\Users\King_Kwon\Desktop\코덱스\스도쿠 개발하기`.
- 프로젝트 README·package.json·docs/wiki/deployment.md 확인: 이름은 하루 스도쿠, React + TypeScript + Vite 웹게임이다.
- 기존 배포 주소: https://kjk0189-boop.github.io/haru-sudoku/
- 배포 문서상 GitHub Pages와 GitHub Actions를 사용한다. 현재 공개 사이트 플레이는 이번 작업에서 직접 검증하지 않았다.
- 제안: Oracle VM의 Studio KWONYC 메인에 게임 소개 카드와 플레이 링크를 만들어 기존 배포 주소로 연결한다. 게임의 Oracle 이전 여부는 사용자 미확정이며 재배포가 선행 조건은 아니다.
- 주의: 추후 게임 도메인 또는 경로를 변경하면 브라우저 저장 기록의 유지 여부를 별도 검토한다.

## 도구와 검증 범위

- codegraph 전용 도구·CLI는 현재 발견되지 않았다. 게임 프로젝트에는 대체 AST 그래프 스크립트 `pnpm graph`가 있으나 이번에는 배포 문서 확인만 수행하여 실행하지 않았다.
- 게임 소스와 배포 설정은 변경하지 않았다.
