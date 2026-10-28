# Studio KWONYC

개인 게임과 개발 이력을 모으는 스튜디오 홈페이지 프로젝트입니다.

![Studio KWONYC 남색·흰색 로고](assets/branding/studio-kwonyc-variants-preview.png)

- 홈페이지 주소: https://studiokwonyc.com/ — 현재 Caddy 기본 페이지, 새 초안 실제 배포 전
- 대표 게임: [하루 스도쿠](https://kjk0189-boop.github.io/haru-sudoku/) — 기존 GitHub Pages 배포
- [LLM 위키](wiki/README.md) · [진행 체크리스트](wiki/checklist.md) · [디자인 방향과 참고 사이트](wiki/homepage-design.md)
- [로고 다운로드·Illustrator 편집 안내](assets/branding/README.md)

## 현재 상태

Oracle Osaka VM에 Ubuntu와 Caddy를 준비하고 가비아 도메인·DNS·HTTPS를 연결했습니다. 루트·www 양쪽 접속은 사용자 보고로 확인했습니다. 이 저장소에는 준비 과정, 결정, 실행 안내, 검증 기록과 로고 자산을 관리합니다. **site/에 반응형 홈페이지 1차 초안을 구현했습니다. 실제 도메인 배포·자동 배포는 아직 없습니다.**

다음은 **모바일·태블릿·데스크톱에 맞춰 재배치되는 깔끔한 포트폴리오** 제작입니다. 게임·개발 프로젝트·이력·개발 기록을 담습니다. 승인된 로고는 STUDIO 위 / KWONYC 아래 구성을 사용합니다.

레퍼런스는 사용자가 선택한 [백성준 포트폴리오](https://baekseongjun.github.io/)와 [Studio.Design](https://studio.design/)입니다. 실제 이력은 추가 정보를 받은 뒤 작성합니다. 정적 검사와 로컬 콘텐츠 표시를 확인했으나 모바일 화면별 시각 검증은 브라우저 자동 제어 중단으로 미완료입니다.

## 홈페이지 미리보기

프로젝트 폴더의 내 PC 터미널에서 실행하고 표시된 주소를 엽니다. 별도 패키지 설치는 필요 없습니다.

```sh
node scripts/serve-site.mjs
```

주소: http://127.0.0.1:4173/ · 종료: Ctrl+C · [구현·검증 안내](wiki/website-implementation.md)

## 폴더

| 경로 | 내용 |
|---|---|
| `wiki/` | 최신 사실, 결정, 작업 절차, 누적 작업 일지 |
| `site/` | 정적 홈페이지 소스와 실제 웹 배포용 자산 |
| `assets/branding/` | 승인된 PNG 시안과 남색·흰색 SVG·PNG·PDF·EPS |
| `scripts/` | 로고 내보내기와 저장소 검증 도구 |
| `AGENTS.md` | 협업과 기록 지침 |

## 작업을 이어갈 때

`AGENTS.md` → `wiki/README.md` → `wiki/project.md` → `wiki/checklist.md` 순서로 읽습니다. 과거 시행착오 문서보다 최신 현황을 우선합니다. 변경된 사실은 주제 문서에, 이력은 `wiki/work-log.md`에 남깁니다.

이 기록은 전체 채팅 원문이나 VM 전체 백업이 아닙니다. 스도쿠 코드는 [별도 게임 저장소](https://github.com/kjk0189-boop/haru-sudoku)에서 관리합니다. 개인 키·토큰·결제 상세는 포함하지 않습니다.

## 로고 재생성·검증

```sh
python -m pip install -r requirements-branding.txt
python scripts/export_branding.py
python scripts/validate_repository.py
node scripts/check-site.mjs
node scripts/site-graph.mjs
```

로고 내보내기는 승인 PNG에서 글자 외곽을 추출합니다. 원본의 질감은 PNG로 보관하고 벡터에서는 작은 얼룩을 정리합니다. 네이티브 `.ai`는 아직 없으며 SVG 또는 PDF를 Illustrator로 열어 AI로 저장할 수 있습니다. Illustrator 실열기 검증은 미실행입니다.
