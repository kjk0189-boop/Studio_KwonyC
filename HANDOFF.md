# Studio KWONYC 작업 인수인계

## 2026-11-27 / Blog와 관리자 계획

- 다음 블로그 작업은 [Blog 원고와 관리자 글쓰기](wiki/blog-editor.md)부터 확인한다. 현재 공개 페이지의 소스와 배포는 그대로다.
- 다음은 공통 Markdown 예시와 .md 불러오기·이미지 첨부 흐름 검증이다. 발행 구현 전 관리자 로그인, 이미지 저장, 정적 발행 방식을 확정한다.

## 2026-11-17 / 이 노트북 직접 준비 결과

앞선 인계 PC·과거 Oracle 배포 결과와 구분한 이번 실행 기록이다.

- 현재 작업 폴더와 상위 경로에 Git 저장소가 없음을 먼저 확인하고, 하루 스도쿠 저장소와 형제인 독립 폴더에 새 clone했다. main, 시작 HEAD `f3f34e8`, 원격과 ahead/behind 0/0, 기존 미커밋·미푸시 변경 없음. 새 clone이므로 기존 checkout의 pull은 해당하지 않는다. origin·공개 범위 보존.
- Git 2.56.0.windows.4, 기존 Node 24.22.1 사용. Python 런처에는 설치된 Python이 없었다. 공식 python.org Windows embeddable Python 3.13.17을 프로젝트 밖 사용자 쓰기 가능 도구 폴더에 준비해 실행했다. 시스템 전역 PATH·관리자 설정은 변경하지 않았다. pip나 npm install·프레임워크·MCP/스킬 추가 설치·.env 생성 없음.
- 요청한 `node --check site/app.js`, `node --check scripts/serve-site.mjs`, `node scripts/check-site.mjs`, `node scripts/site-graph.mjs`, Python `scripts/validate_repository.py`, `git diff --check` 모두 통과. 자산13·앵커10·모의 DOM 메뉴5, Markdown36·대상79파일·오류0. 그래프10참조 재생성 후 기존 wiki/site-map.md와 차이 없음.
- codegraph CLI/연결 도구가 없어 기존 HTML 자산 참조 그래프 및 코드 import를 사용했다. 전체 AST/호출 분석으로 간주하지 않으며 패키지명을 추측해 설치하지 않았다.
- `node scripts/serve-site.mjs` 실행 중: http://127.0.0.1:4173/ . 기본 포트 충돌 없음. HTML·JS·CSS·로고·게임 PNG·Pretendard WOFF2·Poppins TTF 실제 HTTP200과 MIME 확인. 다른 프로세스는 종료하지 않았다.
- 브라우저 도구의 loopback origin 접근 승인이 거절되어 실제 렌더·메뉴 클릭·모바일 크기·터치·확대는 미검증. 정적/모의 DOM·HTTP 성공을 화면 검증으로 보고하지 않는다. 사용자가 브라우저에서 위 주소를 열어 메뉴 및 390px 너비/200% 확대를 확인한다.
- GitHub 앱 연결 계정과 기존 커밋 작성자가 일치함을 확인해 저장소 로컬 작성자 설정만 적용. 터미널 Git은 schannel 오류로 clone 시 일회성 `-c http.sslBackend=openssl` 사용. 터미널 push dry-run은 wincredman 접근 실패 및 username 비대화형 오류. 연결된 GitHub 도구로 이번 문서만 main에 반영 완료(준비 커밋 `ad4fea4`). 로컬 fetch와 fast-forward 후 작업 트리 깨끗함·ahead/behind 0/0을 확인했다. 이 결과의 후속 기록도 같은 문서 범위로 반영한다. 인증 값을 출력/저장하지 않았다.
- 이번 파일: HANDOFF.md, docs/HANDOFF-VERIFICATION.md, wiki/work-log.md. 기존 사용자 변경은 없고 구현·배포 설정은 수정하지 않았다. 커밋 자체 SHA를 선기록하지 않으며 최종 보고와 원격 HEAD/로컬 HEAD 비교를 따른다.
- 이번 범위는 로컬 개발이다. 실제 도메인 배포·Oracle·DNS·SSH 접속·실서비스 재검증·로고 재생성은 미수행. 과거 호스팅 성공을 이번 성공으로 쓰지 않는다. SSH 개인 키·GitHub 인증·MCP/스킬 설정과 게임 localStorage 기록은 Git clone으로 이전되지 않는다.
- 다음: 일반 브라우저의 데스크톱/모바일 실제 화면 확인. 배포가 필요할 때만 기존 docs/SETUP.md와 wiki/deployment.md에 따라 별도 인증·배포한다.

기준일: **2026-11-17 (Asia/Seoul)**. 다른 노트북·새 채팅에서는 `AGENTS.md` → 이 문서 → [설치 안내](docs/SETUP.md) → [위키](wiki/README.md) 순서로 읽는다.

## 목적과 현재 목표

Studio KWONYC는 직접 만든 게임·개발 프로젝트·이력을 모으는 개인 홈페이지다. 현재 목표는 **기존 사이트와 배포 구성을 보존하면서 다른 노트북에서 개발·검증을 재개할 수 있게 하는 것**이다. 이번 인계 준비에서 실서비스 재배포나 새 페이지 구현은 하지 않는다.

- 저장소: https://github.com/kjk0189-boop/Studio_KwonyC
- 홈페이지: https://studiokwonyc.com/
- 별도 게임: https://kjk0189-boop.github.io/haru-sudoku/
- 별도 게임 저장소: https://github.com/kjk0189-boop/haru-sudoku

## 확인한 Git 상태

2026-11-17 작업 시작 시 실제 Git 루트는 현재 프로젝트 디렉터리이고 `.git`도 이 루트에 있었다. 상위 저장소에 포함된 하위 프로젝트가 아니므로 초기화·중첩 저장소 생성은 하지 않았다.

| 항목 | 확인 결과 |
|---|---|
| 작업 브랜치 | `main` |
| 원격 | `origin` → 기존 위 GitHub 주소, 변경하지 않음 |
| 시작 HEAD | `b14dc1bc5ef1ed2e07e3593d73cc02e13b7bdb63` |
| fetch 후 차이 | `HEAD...origin/main` ahead 0 / behind 0 |
| 기존 미커밋·미추적 파일 | 없음 |
| 이미 ignore되지만 추적 중인 파일 | 없음 |
| 이번 변경 | 이 문서·설치/검증 기록·인계 규칙·ignore 보강 등, 아래 검증 기록 참조 |

**인계 준비 반영 확인:** 2026-11-17 준비 커밋 `3949ced`를 기존 `origin/main`에 push하고 `git ls-remote`로 같은 SHA임을 확인했다. 그 시점의 작업 트리는 깨끗했고 ahead/behind는 0/0이었다. 이 결과를 남기는 후속 문서 커밋도 같은 브랜치에 반영한다. 기존 사용자 변경으로 남겨둔 파일은 없다.

자기 자신을 포함하는 최종 커밋 SHA는 문서에 고정하지 않는다. 새 작업 때 실제 현재 상태는 `git status --short --branch`, `git log -1 --oneline`, `git fetch origin` 후 `git rev-list --left-right --count HEAD...origin/main`으로 확인한다. 파일이 존재하는 것만으로 push 완료를 판단하지 않는다.

## 구현 완료된 내용

- `site/`의 HTML/CSS/JavaScript 정적 홈페이지, 메뉴와 현재 섹션 표시, 반응형 분기.
- 소개·게임/개발 프로젝트·작업 기록, 기존 하루 스도쿠 플레이 링크.
- 승인 로고의 남색·흰색 SVG/PNG/PDF/EPS 및 원본 PNG, 실제 게임 캡처.
- 한글 Pretendard·영문 Poppins의 로컬 파일과 OFL 라이선스.
- 로컬 미리보기·정적 검사·위키 검사·자산 연결 그래프 생성 스크립트.
- Git 원격과 누적 LLM 위키, Oracle 재배포 스크립트와 설정 백업 절차.

**과거 환경 검증:** 2026-10-28 Oracle VM에 `7a65d36` 사이트 소스를 릴리스 `20261028T073458Z-7a65d36`으로 배포했고, 당시 외부 HTTPS·HTTP/www 이동·HTML 해시·이미지/폰트 응답을 확인했다. 실제 Shape는 `VM.Standard.E2.1.Micro`였다. 상세는 [배포 기록](wiki/deployment.md)과 [무료 대상 확인](wiki/free-tier-check.md)을 읽는다. 이 사실은 **2026-11-17 서버 상태·계정 청구를 재검증했다는 뜻이 아니다.**

## 주요 결정과 이유

- 홈페이지 운영은 Oracle VM + Caddy, 도메인은 가비아를 유지한다. 참고 사이트 `studio.design`은 디자인 레퍼런스이며 호스팅 전환 요청이 아니다.
- 프레임워크 없이 `site/`를 바로 제공한다. Node 패키지 설치·빌드가 필요 없고 VM에서 개발 서버를 상시 실행하지 않는다.
- 사용자 선택 레퍼런스는 `baekseongjun.github.io`와 `studio.design`이다.
- 기본 흰색·네이비에 라벤더·라임·살구색 소량 포인트. 한글 Pretendard·영문 Poppins, `make it playful` 장식만 기존 세리프/italic 예외.
- 첫 화면 문구는 `WELCOME. STUDIO KWONYC`, `생각나는 모든 걸 만들어 보는 작은 공방`, 버튼 `둘러보기`. 푸터는 `Creative Idea`.
- 스도쿠는 별도 저장소·GitHub Pages를 유지하고 실제 캡처와 플레이 링크로 소개한다. 이 저장소를 clone하면 게임 소스가 함께 복제되는 것은 아니다.
- 경력·연락처·학력 등 미제공 정보를 임의로 만들지 않는다. `/about/`, `/contact/` 등은 추가 가능하다고 설명했지만 **페이지 구현 요청·구현 완료는 아니다.**
- Git push와 Oracle 배포는 별개다. 수정·검증·커밋 후 명시적으로 배포 스크립트를 실행한다.

## 중요한 파일과 의존관계

| 경로 | 역할 |
|---|---|
| `site/index.html` | 문구·프로젝트·링크·게임 이미지·섹션 |
| `site/styles.css` | 초기 기본 레이아웃과 반응형 |
| `site/design.css` | 후속 디자인 수정. HTML에서 styles.css 뒤에 로드되어 우선 적용 |
| `site/fonts.css`, `site/assets/fonts/` | Latin/Korean 폰트 분리와 원본·라이선스 |
| `site/app.js` | 모바일 메뉴·Escape/외부 클릭 처리·현재 섹션 표시 |
| `site/assets/` | 독립 배포에 필요한 로고·이미지·폰트, 출처 README |
| `assets/branding/` | 편집/전달용 로고 전체 자산 |
| `scripts/serve-site.mjs` | `site/`만 제공하는 loopback HTTP 서버, 기본 4173 |
| `scripts/check-site.mjs` | HTML 자산·앵커 및 모의 DOM 메뉴 검사 |
| `scripts/site-graph.mjs`, `wiki/site-map.md` | HTML 참조 기반 대체 자산 그래프 |
| `scripts/validate_repository.py` | 표준 라이브러리만 쓰는 UTF-8·문서 링크·SVG·일부 민감정보 검사 |
| `scripts/export_branding.py` | 선택 사항인 로고 재생성, requirements-branding.txt 필요 |
| `scripts/deploy-site.ps1` | 검증·Git revision·tar/SCP·원격 활성화, 개인 키는 실행 인자 |
| `scripts/activate-release.sh` | Oracle Ubuntu 전용 활성화·Caddy 검증·이전 설정 복원 경로 |
| `wiki/deployment.md` | 기존 배포 경로·백업·수정/복구 방법 |

미리보기·검사는 Node `node:*` 표준 모듈만 사용한다. CSS는 `fonts.css` → `styles.css` → `design.css` 순서다. 완성된 `site/` 내용이 배포본이며 `dist/` 생성 단계는 없다. [구조 분석·검증 기록](docs/HANDOFF-VERIFICATION.md)에 분석 범위를 적었다.

## 실행·빌드·테스트

아래 명령은 **clone한 저장소 루트의 로컬 터미널**에서 실행한다.

```sh
node --version
git --version
node scripts/serve-site.mjs
```

http://127.0.0.1:4173/ 접속. 종료는 Ctrl+C. Node 22 이상, 이번 검증은 Node 24.22.1. 일반 실행에는 환경변수·API 키·npm install이 필요 없다. 선택적 `PORT`만 있으며 `.env`를 자동으로 읽지 않는다.

별도 터미널에서:

```sh
node --check site/app.js
node --check scripts/serve-site.mjs
node scripts/check-site.mjs
node scripts/site-graph.mjs
python scripts/validate_repository.py
git diff --check
```

Python 명령은 Windows에서 `py -3`, macOS/Linux에서 `python3`로 대체 가능하다. npm이 설치되어 있으면 `npm run dev`, `npm run check`, `npm run graph`도 있지만 필수는 아니다. `npm run check`는 Python 문서 검사를 포함하지 않는다. **빌드 명령은 없고 `site/`가 바로 배포 대상**이다. 로고 재생성은 일반 개발의 선행 조건이 아니며 설치 안내의 선택 절차를 따른다.

## 실제 검증과 미검증

이번 검사·경로 이식 확인 결과는 [검증 기록](docs/HANDOFF-VERIFICATION.md)에 명령별로 남긴다. 기존 검증과 이번 검증을 구분한다.

미검증/추가 확인:

- 새 노트북 실기기와 macOS/Linux는 접근하지 못했다. 설치 안내대로 clone 후 동일 검사·미리보기를 실행한다.
- 모바일 시각·터치·200% 확대는 과거 브라우저 자동 제어 오류로 완료하지 못했다. 실기기 또는 브라우저 기기 모드로 실제 확인한다. 정적/모의 DOM 검사를 UI 검증으로 간주하지 않는다.
- Oracle 현재 상태·SSH 키·새 노트북 권한·Caddy 재배포는 이번 범위에서 실행하지 않는다. 기존 서버 정보는 배포 전 콘솔/연결에서 확인한다.
- 실패를 강제로 발생시키는 자동 rollback 실험과 VM 전체 복원은 미실행이다.
- 네이티브 `.ai`는 Illustrator가 없어 생성/열기 검증을 못 했다. SVG/PDF/EPS를 제공하며 Illustrator에서 열어 AI로 저장 가능하다.
- 무료 대상 VM 사양과 계정 전체 청구 0원은 다르다. 홈 리전·사용량·추가 서비스 비용은 계정 콘솔에서 확인한다.
- codegraph 도구·CLI는 이번에도 발견되지 않았다. 기존 HTML 자산 그래프와 `node:*` import/스크립트 연결을 직접 분석했다. 전체 AST 호출 그래프는 아니다.

## 알려진 주의사항과 옮길 것

- SSH 개인 키, GitHub 로그인/credential helper, Oracle·가비아 로그인/MFA, Codex 앱의 MCP·스킬 설정은 Git에 포함되지 않는다. [설치 안내](docs/SETUP.md)의 별도 인증 절차를 따른다.
- 새 노트북의 로컬 개발에는 서버 개인 키가 필요 없다. 배포할 때만 준비한다. 기존 private key가 없으면 Git에서 복구되지 않으며, 기존 관리자 접속으로 새 노트북의 공개 키를 등록하는 절차가 필요하다.
- `activate-release.sh`는 서버에서 root로 실행되는 파일이다. 새 노트북에서 직접 `sudo sh`로 실행하지 않는다.
- `site/`에 미커밋 변경이 있으면 deploy-site.ps1은 중단한다. Git push만으로 VM이 갱신되지는 않는다.
- 미리보기 주소는 해당 노트북에서만 열리며 포트 충돌 시 다른 프로세스를 임의로 종료하지 않는다. 선택적 PORT 설정은 설치 안내 참고.
- 과거 위키에 예전 PC 경로·미완료 표현이 남을 수 있다. 새 개발의 시작점은 이 문서와 docs/SETUP.md이며, 역사 기록을 현재 상태로 읽지 않는다.

## 다음 할 일 — 우선순위

1. 새 노트북에서 clone → 인계 문서 읽기 → Node 검사 → 로컬 미리보기. Git 상태·원격을 다시 확인.
2. 공개 사이트와 로컬 화면 비교, 모바일·터치·확대 점검.
3. 사용자에게 실제 소개·경력·프로젝트 상세를 받아 보강. 새 페이지는 별도 요구를 확인한 뒤 구현.
4. 배포가 필요하면 GitHub·Oracle 인증과 SSH 키/권한을 준비하고 기존 배포 절차 사용.
5. 운영 백업·복구 실험·SSH 소스 제한·계정 비용 점검. 광고·문의 폼·랭킹은 추후 범위 결정.

새 채팅 시작 문구:

> AGENTS.md와 HANDOFF.md, docs/SETUP.md를 읽고 Git 상태부터 확인해줘. 기존 Studio KWONYC 작업을 이어가되 사용자 변경을 보존하고 검증·위키·커밋·푸시 상태를 기록해줘.
