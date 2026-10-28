# 다음 작업 인계

기준일: 2026-10-28. 사용자는 현재 대화에서 계속한다.

## 작업 종료와 다음 재개

2026-10-28 사용자가 오늘 작업을 종료하고 추가 작업은 다음에 진행하기로 했다. 홈페이지 실제 배포·외부 검증·Git 기록은 완료됐다. 예약 작업이나 자동 후속 작업은 설정하지 않는다.

다음 재개 시 배포본 https://studiokwonyc.com/ 을 기준으로 사용자 의견을 먼저 확인한다. 남은 후보는 모바일 실기기 화면·터치 점검, 소개·이력·프로젝트 상세 보강, 운영 백업·접근 설정 점검이다. 새 작업 범위를 임의로 확정하거나 서버·도메인을 다시 만들지 않는다.

읽는 순서: AGENTS.md → [위키 목차](README.md) → [현황](project.md) → [체크리스트](checklist.md) → [디자인](homepage-design.md).

## 현재 상태

- Oracle VM·SSH·Caddy·도메인·양쪽 HTTPS 준비 완료. 검증 한계는 project.md 참고.
- 하루 스도쿠는 형제 폴더 스도쿠 개발하기에 있으며 React·TypeScript·Vite, 기존 Pages 배포. [게임 기록](games.md).
- 로고 수용 완료, 남색·흰색 SVG/PNG/PDF/EPS 준비. AI는 Illustrator 부재로 미생성.
- 디자인은 심플한 반응형, 게임·개발·이력 포트폴리오.
- 저장소 https://github.com/kjk0189-boop/Studio_KwonyC — 반영 결과는 [Git 기록](repository.md).
- site/ 홈페이지를 실제 도메인에 배포했다. 외부 HTTPS·리디렉션·이미지·폰트·HTML 일치 확인. 재배포는 scripts/deploy-site.ps1, 상세는 deployment.md. 서버를 재생성하지 않는다.

## 다음 작업

배포본 검토·공개 이력 수집·실제 화면별 검증 후 수정본을 재배포한다. 브라우저 자동 제어 오류로 시각/모바일 QA는 미완료다. 게임은 기존 링크를 유지하며 Oracle 이전은 미확정이다.

## 작업 방식

Windows PowerShell과 Ubuntu SSH 실행 환경·메뉴·버튼 위치를 명확히 안내하고 이어지는 절차를 함께 설명한다. 사용자 보고·직접 검증·제안을 구분하고 위키와 일지를 UTF-8로 갱신한다. 비밀·결제 상세는 기록하지 않는다.
