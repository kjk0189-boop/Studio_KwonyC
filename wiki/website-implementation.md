# 홈페이지 구현과 로컬 미리보기

기준일: 2026-10-28. **실제 Oracle 도메인 배포·외부 HTTPS 검증 완료.** [배포·수정 안내](deployment.md) 참고.

## 구성

별도 프레임워크·빌드·설치 없이 동작하는 정적 HTML/CSS/JavaScript로 만들었다. 준비된 Caddy 정적 배포에 맞추고 약 1GB VM에서 개발 서버를 운영할 필요를 줄인다. 이는 이번 초안의 구현 선택이며 사용자가 특정 프레임워크를 지정한 것은 아니다.

| 파일 | 수정 내용 |
|---|---|
| site/index.html | 소개 문구·게임/프로젝트·링크·기록 |
| site/styles.css | 색상·레이아웃·반응형·모션 감소 |
| site/design.css | 사용자 피드백 반영: 색상 포인트·타이포·카드 정렬·푸터 |
| site/fonts.css | 로컬 Pretendard 한글·Poppins Latin 폰트 선언 |
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

배포 후에도 같은 소스를 수정 → 로컬 확인 → 변경된 정적 파일을 다시 배포하는 흐름으로 언제든 갱신할 수 있다. 도메인을 다시 구매하거나 VM을 새로 만들 필요는 없다. Git에 push하는 것만으로 VM 자동 배포가 되는 구성은 아직 만들지 않았다.

첫 배포는 사용자 요청으로 완료했다. Caddy 설정을 백업하고 site 전송·검증·경로 변경·reload 후 외부 도메인을 확인했다. 이후 콘텐츠·화면 변경도 같은 배포 흐름을 사용한다.

경력 정보가 제공되면 실제 기간·역할·작업을 추가한다. 가짜 직장·학력·고객·수치·상표 등록 상태는 넣지 않는다.
