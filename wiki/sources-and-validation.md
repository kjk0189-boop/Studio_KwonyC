# 공식 자료와 검증

조사일: 2026-10-26. 아래 내용은 앞선 설계 답변에서 열람한 공식 문서 기준이다. 실제 생성·신청 전 다시 확인한다.

같은 날 1단계 안내서 작성을 위해 [공식 가입 절차](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingup_topic-Sign_Up_for_Free_Oracle_Cloud_Promotion.htm), [한국어 FAQ](https://www.oracle.com/kr/cloud/free/faq/), Always Free 문서를 재확인했다. 홈 리전 변경 불가, A1 춘천 예외, 계정별 한도와 생성 재고 차이를 안내서에 반영했다. 실제 가입 화면과 사용자 계정은 미확인이다.

## 공식 근거

| 자료 | 확인한 내용 |
|---|---|
| [Oracle Always Free Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) | 당시 문서상 A1 총 2 OCPU·12GB, 부팅·블록 볼륨 합산 200GB, 홈 리전 조건, 용량 부족 가능성, 유휴 VM 회수 가능성 |
| [Oracle Free Tier](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm) | 무료 체험과 Always Free 구분 |
| [Oracle Public IP Addresses](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingpublicIPs.htm) | 예약 IP 재할당, 공개 접속에 필요한 네트워크 구성 |
| [가비아 루트 도메인 연결](https://customer.gabia.com/faq/detail/2929/3103) | `@` A 레코드로 IP 연결 |
| [가비아 DNS 설정](https://customer.gabia.com/manual/domain/287/1201) | DNS 관리 도구에서 레코드 생성 |
| [Caddy Automatic HTTPS](https://caddyserver.com/docs/automatic-https) | 조건 충족 시 인증서 자동 발급·갱신 |
| [AdSense 사이트 소유](https://support.google.com/adsense/answer/91205?hl=en) | 사이트 HTML 수정 접근과 정책 준수 |
| [게임 페이지의 콘텐츠 광고](https://support.google.com/adsense/answer/2768340?hl=en) | 게임과 일반 광고 최소 150px 간격 권고 또는 플레이 페이지에서 제거 |
| [광고 게재위치 정책](https://support.google.com/adsense/answer/1346295?hl=ko) | 오클릭 유도 방지와 광고 배치 정책 |
| [H5 Games Ads 신청](https://developers.google.com/ad-placement/docs/signup) | 승인된 AdSense 계정 및 별도 신청 필요, 승인 보장 없음 |
| [H5 게임 광고 개요](https://support.google.com/adsense/answer/9959170?hl=en) | 전면·보상형 광고 지원 |

## 초기 작성 당시 검증 상태 — 이전 기록

- 문서 조사: 완료. 위 링크는 초기 설계 시 공식 출처로 사용함.
- 기존 코드 분석: 대상 없음. 위키 생성 전 작업 폴더에 파일이 없었음.
- codegraph: 연결된 도구 목록과 로컬 CLI를 확인했으나 사용 가능한 항목을 찾지 못함. 코드가 생기고 도구를 사용할 수 있으면 활용.
- VM 생성·무료 한도·IP 비용: 미검증. 실제 Oracle 계정과 콘솔을 확인하지 않음.
- 도메인 구매·DNS·HTTPS: 미검증. 도메인과 서버가 아직 정해지지 않음.
- 게임·성능·모바일: 미검증. 소스나 게임 빌드가 제공되지 않음.
- 광고 승인·광고 동작: 미검증. 실제 사이트와 광고 계정이 없음.
- 실행 코드: 이번 작업에서 생성하지 않음. 문서와 프로젝트 작업 지침만 작성.

문서 저장 후 8개 파일의 엄격한 UTF-8 디코딩과 내부 링크 대상 존재 검사를 통과했다. 이것은 인프라나 게임 실행 검증을 대신하지 않는다.

## 최신 검증 상태 — 2026-10-28

- 홈페이지 1차 초안은 [구현·검증 기록](website-implementation.md)에 별도로 정리했다. 문법·리소스·앵커·메뉴 이벤트 검사와 로컬 HTTP/콘텐츠 표시를 확인했고, 브라우저 제어 URL 판별 실패로 화면별 시각 검증은 미완료다.
- VM 접속·Ubuntu·Caddy·DNS 조회는 사용자 출력, 외부 HTTP·양쪽 HTTPS는 사용자 성공 보고로 확인했다. 현재 상태는 [프로젝트 현황](project.md)이 기준이다.
- 네이티브 codegraph 도구·CLI는 발견되지 않았다. 이번 생성물은 문서와 Python 벡터 내보내기·검증 도구이며 소스를 직접 검토하고 실행했다.
- 로고 벡터는 폰트·래스터 의존 없이 경로로 구성, 원본 마스크 대비 외곽 IoU 약 99.77%. 남색·흰색 비교 시트와 양쪽 PDF 렌더를 시각 확인했다.
- SVG 경로·래스터 미삽입 검사, UTF-8·로컬 Markdown 링크·키/토큰 패턴 검사 도구를 실행했다. 결과는 Git 반영 전 다시 확인한다.
- Illustrator가 없어 네이티브 AI 생성·실열기를 못 했다. EPS 렌더는 PostScript 도구 부재로 미검증이며 SVG·PDF를 주 편집용으로 제공한다.
- 홈페이지 구현·실제 모바일 화면·광고·성능은 아직 미검증이다. 무료 사용량·예약 IP·SSH 제한 등 운영 항목도 남아 있다.
- [Adobe 지원 형식](https://helpx.adobe.com/illustrator/desktop/get-started/learn-the-basics/supported-file-formats-in-illustrator.html)과 [AI 저장 안내](https://helpx.adobe.com/illustrator/desktop/save-and-export/export-files-to-different-formats/save-artwork-in-illustrator-ai-format.html)를 확인했다.
- 실제 참고 사이트는 [디자인 기록](homepage-design.md)에 근거 링크와 함께 정리했다. 사이트의 전체 모바일 동작을 실검증한 것은 아니다.
