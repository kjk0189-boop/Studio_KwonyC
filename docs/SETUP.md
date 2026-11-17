# 다른 노트북에서 시작하기

작성일: 2026-11-17. 모든 프로젝트 경로는 저장소 기준 상대 경로다. 특정 PC의 Codex 번들 경로나 기존 바탕화면 폴더가 없어도 실행한다.

## 1. 도구 준비

| 목적 | 도구·버전 | 필요 여부 |
|---|---|---|
| clone·이력 관리 | Git, 이번 확인 2.56.0 | 필수 |
| 미리보기·사이트 검사 | Node.js 22 이상, 같은 환경은 24.x 권장; 이번 확인 24.22.1 | 필수 |
| 문서 검사 | Python 3.12 권장, 이번 확인 3.12.14 | 문서 검사 시. 표준 라이브러리만 사용 |
| Oracle 배포 | PowerShell 7 권장, 이번 파서 확인 7.6.9; Git·Node·OpenSSH ssh/scp·tar | 배포 시. Windows가 기존 확인 경로 |
| 로고 재생성 | Python + requirements-branding.txt | 선택 |
| 코드 편집·협업 | 선호 편집기, Codex 등 | 편집기 선택 자유 |

[Node 공식 설치](https://nodejs.org/en/download), [Git 공식 설치](https://git-scm.com/downloads/), [Python 공식 설치](https://www.python.org/downloads/). Windows에서는 설치 후 새 PowerShell을 열어 아래 명령이 실행되는지 확인한다.

```powershell
git --version
node --version
```

현재 환경에는 독립 `npm` 명령이 노출되지 않았지만 Node 직접 명령으로 전부 검증했다. 새 노트북도 npm을 필수로 요구하지 않는다.

## 2. clone과 첫 확인

**새 노트북 로컬 터미널**에서 원하는 작업 폴더로 이동한 후 실행한다.

```sh
git clone https://github.com/kjk0189-boop/Studio_KwonyC.git
cd Studio_KwonyC
git status --short --branch
git remote -v
```

`main`과 기존 origin 주소를 확인하고 `AGENTS.md`, `HANDOFF.md`를 읽는다. 기존 clone이 이미 있으면 새로 초기화하거나 중첩 clone하지 말고 그 루트에서 상태를 확인한다. 변경이 없을 때만 `git pull --ff-only`로 갱신하고, 변경이 있다면 먼저 보존·출처 확인한다.

공개 저장소라 clone에는 보통 계정 로그인이 필요 없다. push에는 소유 계정의 쓰기 권한과 새 노트북 인증이 필요하다. 기존 공개 범위·origin 주소를 바꾸지 않는다.

## 3. 설치와 환경변수

**일반 홈페이지 실행은 의존성 설치가 없다.** package.json에 dependencies/devDependencies가 없고 Node 표준 모듈만 쓴다. `npm install`, `pnpm install`, 빌드, `.env` 복사가 필요 없다. 로고·게임 이미지·폰트와 라이선스도 Git에 포함되어 있다.

필수 환경변수는 없어 `.env.example`은 만들지 않았다. 미리보기의 선택적 `PORT`만 코드에서 사용하며 `.env`를 자동 로드하지 않는다.

기본 포트가 사용 중일 때만 Windows PowerShell에서:

```powershell
$env:PORT = '4174'
node scripts/serve-site.mjs
```

macOS/Linux에서는 `PORT=4174 node scripts/serve-site.mjs`. 사용자 전역 환경을 바꾸지 않고 해당 터미널/명령에서만 설정한다. 값 없이 기본 실행하면 4173이다.

## 4. 실행·검증

```sh
node scripts/serve-site.mjs
```

표시된 http://127.0.0.1:4173/ 을 브라우저에서 연다. 종료는 Ctrl+C. 이 서버는 내 노트북에서만 접근할 수 있고, 터미널을 닫아도 실제 도메인 홈페이지는 계속 운영된다.

별도 터미널에서:

```sh
node --check site/app.js
node --check scripts/serve-site.mjs
node scripts/check-site.mjs
node scripts/site-graph.mjs
python scripts/validate_repository.py
git diff --check
```

Windows에서 python이 Microsoft Store를 열거나 실행되지 않으면 설치한 Python 런처로 `py -3 scripts/validate_repository.py`를 사용한다. macOS/Linux는 `python3 scripts/validate_repository.py`. 검증 스크립트 자체에는 pip 설치가 필요 없다.

별도 빌드/빌드 결과물 생성 단계는 없다. 웹 배포 대상은 `site/`다. npm이 있는 환경의 `npm run dev/check/graph`는 대응되는 편의 명령이며 Python 검사는 따로 실행한다.

## 5. 로고 재생성 — 선택

기존 로고를 사용하거나 홈페이지를 수정할 때는 이 절차를 실행하지 않는다. Python 패키지를 쓴 내보내기 도구는 Git의 자산 파일을 다시 쓰므로 별도 검토가 필요하다.

Windows PowerShell 예시:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-branding.txt
.\.venv\Scripts\python.exe scripts/export_branding.py
git diff --stat
```

macOS/Linux는 `python3 -m venv .venv` 후 `.venv/bin/python`을 사용한다. `.venv/`는 Git에서 제외한다. requirements는 하한 버전만 선언되어 있어 새 버전별 출력의 바이트 동일성은 보장하지 않는다. 재생성 후 외곽·색·PDF 렌더를 확인한다. Illustrator 네이티브 AI는 별도 앱에서 저장해야 한다.

## 6. 별도 준비·인증할 것

### GitHub 쓰기 권한

기존 HTTPS 원격을 유지한다. Git for Windows/Git Credential Manager 등 사용 중인 인증 도구에서 같은 계정으로 로그인한다. push 시 브라우저 로그인이 필요하면 새 노트북에서 완료한다. 토큰을 원격 URL·문서·명령 인자에 넣지 않는다. GitHub 앱/MCP 로그인과 터미널 Git 자격 증명은 별도로 확인한다.

커밋 이름/메일이 미설정이면 그 노트북에서 본인 정보를 설정한다. 인증 토큰이나 VM 개인 키를 git config에 넣는 작업이 아니다. 두 노트북의 동일 브랜치를 쓸 때는 작업 시작 전 fetch/status, 변경이 없을 때 pull --ff-only, 완료 후 commit/push를 수행한다. 충돌 시 강제 push·reset으로 덮어쓰지 않는다.

### Oracle 배포용 SSH

로컬 개발에는 필요 없다. 배포하려면 기존 관리자 개인 키를 안전한 개인 경로로 별도 전달하고 파일 권한을 현재 사용자만 읽도록 확인한다. 개인 키를 Git·채팅·위키로 전송하지 않는다. 또는 기존 관리 접속이 가능한 장치에서 새 노트북 공개 키를 서버 사용자에 등록하는 절차를 별도로 진행한다.

기존 사용자 `.ssh/known_hosts`, ssh-agent, 개인 키 ACL은 clone으로 복원되지 않는다. 새 장치의 최초 호스트 지문은 기존 신뢰 장치/콘솔에서 대조한 뒤 직접 승인한다. BatchMode 배포 스크립트는 대화형 지문 승인·암호 입력을 대신하지 않는다.

로컬 PowerShell에서 실행 파일 확인:

```powershell
Get-Command ssh, scp, tar
```

키가 준비됐고 서버 접속·sudo 권한이 확인됐을 때만:

```powershell
$deployKeyPath = Read-Host '안전하게 보관한 개인 키 파일 경로'
.\scripts\deploy-site.ps1 -PrivateKey $deployKeyPath
```

이는 실제 서비스를 갱신한다. 우선 로컬 검증·Git 커밋을 완료하고 [배포·복구 문서](../wiki/deployment.md)를 읽는다. 새 노트북에서 배포 실험은 이번 준비 작업에서 실행하지 않았다. macOS/Linux 로컬 미리보기는 가능하지만 PowerShell 배포 경로는 별도 환경 검증이 필요하다.

### 외부 서비스와 데이터

- Oracle 계정·MFA와 가비아 계정·등록자 이메일 접근은 새 장치에서 별도로 로그인한다. clone할 때 VM/DNS를 새로 만들지 않는다.
- VM의 Caddy 인증서 저장소·서버 설정·릴리스 백업은 서버에 남는다. Git은 VM 전체 백업이 아니다.
- 하루 스도쿠 개발도 할 경우 별도 작업 폴더에서 `git clone https://github.com/kjk0189-boop/haru-sudoku.git` 후 **그 저장소의** AGENTS.md·README를 따른다. 이 저장소 안에 중첩하지 않는다.
- 스도쿠의 브라우저 저장 기록은 그 브라우저/장치 데이터로 Git에 없다. 게임 코드 clone으로 플레이 기록이 옮겨지지 않는다.
- `tmp/` 배포 영수증·캐시·미리보기 중간 파일은 이전 노트북에만 있을 수 있다. 실행 시 생성되며 필수 개발 파일이 아니다.

## 7. codegraph·MCP·스킬

**사이트 실행·검사에 필요한 MCP/스킬/비밀 토큰은 없다.** 필수 작업은 위 Node/Python 명령으로 재현된다.

| 항목 | 이 프로젝트에서의 상태 | 새 노트북 준비 |
|---|---|---|
| codegraph | 이번 도구 목록·CLI에서 발견되지 않음 | 설치된 구현이 있다면 `Get-Command codegraph`와 제공자의 공식 도움말로 확인. 특정 배포판/서버가 지정되지 않아 설치 패키지명·설정값을 임의로 만들지 않음 |
| 대체 그래프 | `scripts/site-graph.mjs` 포함 | `node scripts/site-graph.mjs` 실행. HTML 참조만 분석하며 전체 AST/호출 그래프는 아님 |
| GitHub MCP/연결 | 선택 사항, 이 작업은 터미널 Git으로 완료 가능 | Codex에서 연결 기능을 쓰려면 새 장치/세션의 계정·저장소 권한을 별도 확인. 토큰은 앱/OS의 인증 경로로 설정하고 저장소에 기록하지 않음 |
| 기타 MCP | 필수 서비스 없음 | 특정 서버를 일괄 설치할 필요 없음. 이후 필요한 서버가 정해지면 공식 설정 안내를 따름 |
| Codex 스킬 | 로컬 개발 필수 없음 | AGENTS.md·HANDOFF.md·위키를 먼저 읽도록 시작. 기존 앱의 전역 스킬·연결 설정은 이 Git 저장소에 포함되지 않음. 선택적 스킬은 새 장치에서 설치하고 해당 SKILL.md를 읽음 |

[Codex MCP 공식 설정 안내](https://developers.openai.com/codex/mcp/), [스킬 안내](https://developers.openai.com/codex/skills/). 구체 codegraph 구현이 선택된 뒤에는 실제 서버/실행 파일·버전·분석 범위를 이 문서에 추가한다.

## 8. Git에 넣지 않는 파일과 인계 마무리

`.gitignore`는 개인 키·인증 설정·환경 파일·의존성 폴더·빌드 결과·Python 가상환경·로컬 편집기 설정을 제외한다. 기존 원격 공개 범위는 유지한다. `.env.example`은 향후 필요하면 실제 값 없이 작성하되 현재는 필수 환경 자체가 없다.

작업이 끝나면 관련 위키·HANDOFF.md를 갱신하고 이번 파일만 명시적으로 스테이징한다. 다른 사람이 남긴 변경은 별도 알리고 포함하지 않는다. 커밋 후 push 성공을 확인하고 `git status --short --branch`를 다시 확인한다.
