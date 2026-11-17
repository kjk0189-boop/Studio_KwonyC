# 인계 준비 검증 기록

실행일: 2026-11-17 (Asia/Seoul). 이번 인계 작업의 검증이며 2026-10-28 실서비스 배포 검사와 구분한다.

## 시작 상태와 보존

- 실제 Git 루트는 프로젝트 루트, git-dir는 `.git`. 새 Git 저장소를 만들지 않았다.
- 브랜치 `main`, origin은 기존 Studio_KwonyC HTTPS 주소. fetch 후 ahead/behind 0/0.
- 시작 HEAD `b14dc1bc5ef1ed2e07e3593d73cc02e13b7bdb63`.
- 시작 시 미커밋·미추적 변경과 tracked-but-ignored 파일 없음. 기존 사용자 변경을 가져와 커밋한 것은 없다.
- 기존 AGENTS.md 본문은 보존하고 인계 규칙만 뒤에 추가한다.

## 환경과 분석

- Node.js 24.22.1, Git 2.56.0.windows.4, Python 3.12.14.
- PowerShell 7.6.9. 선택적 배포 스크립트는 파서 검사만 수행했다.
- codegraph 도구·CLI를 찾지 못했다. `node scripts/site-graph.mjs`로 HTML 참조 10개를 재생성했고 기존 그래프와 diff 없음.
- 직접 읽은 import는 Node 표준 모듈 http/fs/path/url/assert/vm뿐이다. 브라우저 코드는 기본 DOM API를 사용한다. 필수 환경변수는 없고 미리보기의 선택적 PORT만 있다.
- Python 문서 검사는 표준 라이브러리만 사용하고 로고 내보내기만 Pillow/numpy/reportlab에 의존한다.

## 실제 명령과 결과

| 검사 | 결과 |
|---|---|
| `git fetch origin` + ahead/behind 확인 | 통과, 시작 시 0/0 |
| `node --check site/app.js` | 통과 |
| `node --check scripts/serve-site.mjs` | 통과 |
| `node scripts/check-site.mjs` | 통과: 로컬 리소스 13, ID/앵커 10, 메뉴 검사 5 |
| `node scripts/site-graph.mjs` | 통과, HTML 자산 참조 10개, 기존 그래프 변경 없음 |
| Python 문서·링크·SVG 검사 | 통과: Markdown 36개, 작업 파일 79개, 오류 0 |
| 민감정보 패턴 검사 | 추적 파일+이번 새 문서 전체의 텍스트 검사, 발견 0. 비밀 값은 출력하지 않음 |
| ignore 검토 | 환경 파일·SSH 키·로컬 설정·의존성/가상환경/빌드·캐시 예시 14개 제외 확인; 이미 추적 중인 ignore 대상 0 |
| AGENTS 보존 | HEAD 원문이 새 파일 앞부분에 그대로 남음을 개행 정규화 후 비교, 통과 |
| PowerShell 파서 | 현재 폴더와 별도 소스 사본에서 deploy-site.ps1 문법 통과. 배포 실행 안 함 |
| 별도 경로의 소스 사본 실행 | 79개 대상 파일만 복사하고 .git·node_modules 없이 Node 문법·리소스/메뉴·그래프·Python 문서 검사 통과 |
| 소스 사본 HTTP | 별도 PORT=44173의 HTML·design.css·게임 이미지·Poppins TTF HTTP 200 및 정상 MIME, /HANDOFF.md 404 |
| 임시 서버 정리 | 위 검사에 사용한 서버 종료. 기존 사용자 미리보기/실서비스는 변경하지 않음 |

소스 사본은 추적 파일과 이번 준비 문서를 임시 폴더에 복사한 것이며 중첩 Git 저장소를 만들지 않았다. 기록 파일에 임시 폴더의 PC별 절대 경로를 고정하지 않았다. `git clone`의 네트워크/인증은 원격 fetch와 이후 push로 따로 확인하며, 위 사본 검사를 실제 새 노트북 clone 검증이라고 쓰지 않는다.

## 검증 한계와 추가 확인

- 다른 노트북 자체와 macOS/Linux에서 실행하지 못한다. 별도 폴더 실행은 경로 의존성 확인이며 새 기기 검증을 대신하지 않는다.
- 실제 모바일·브라우저 시각 검증은 이전 자동 제어 오류 이후 미완료다. 새 노트북 브라우저에서 화면 크기·터치·키보드·200% 확대를 확인한다.
- 이번에는 실서비스 접속·Oracle/가비아 계정·SSH 키·배포·rollback을 실행하지 않는다. 배포 성공은 과거 기록이며 현재 운영을 재검증했다고 쓰지 않는다.
- 네이티브 AI와 EPS/Illustrator 실열기, 로고 재생성의 새 환경 패키지 조합은 재검증하지 않는다. 기본 개발에 필요하지 않으며 재생성은 선택 사항이다.
- 패턴 기반 민감정보 검사는 완전한 유출 방지 보장이 아니다. 내용을 출력하지 않고 파일 목록·diff도 검토한다.

## Git 결과 확인

준비 대상 9개 파일만 명시적으로 스테이징하고 staged diff/check와 파일 집합 검사를 통과한 뒤 커밋 `3949ced`를 main에 push했다. 이후 git ls-remote의 원격 main SHA와 로컬 HEAD 일치를 확인했다. 당시 작업 트리는 깨끗하고 ahead/behind는 0/0이었다. 기존 사용자 변경·별도 남겨둔 미커밋 파일은 없다.

이 결과 기록은 후속 문서 커밋으로 반영한다. 최종 상태는 완료 보고와 `git status --short --branch`, `git rev-list --left-right --count HEAD...origin/main`으로 확인한다. 자기 커밋 SHA를 문서에 고정해 반복 커밋을 만들지 않는다.
