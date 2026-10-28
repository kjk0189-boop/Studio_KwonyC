# Studio KWONYC LLM 위키

최종 정리: 2026-10-28. **서버·도메인·HTTPS 준비 완료, 반응형 홈페이지 디자인 준비 단계.**

## 현재 사실을 읽는 순서

1. [프로젝트 현황](project.md) — 확정 사항·실제 확인·미확인
2. [현재 체크리스트](checklist.md)
3. [디자인·실제 참고 사이트](homepage-design.md)
4. [브랜드와 로고](branding.md)
5. [기술 구조](architecture.md) · [실행 순서](roadmap.md)
6. [결정과 미결 사항](decisions.md) · [검증과 근거](sources-and-validation.md)
7. [게임과 기존 배포](games.md) · [도메인 설정](step-04-domain.md)
8. [Git 저장소와 작업 규칙](repository.md)
9. [작업 일지](work-log.md) · [다음 작업 인계](handoff-homepage.md)

## 현재 다음 행동

참고 사이트의 좋은 부분을 고르고 레이아웃을 제작한다. 요구는 **모바일·태블릿·데스크톱 반응형, 심플한 분위기, 게임·개발 프로젝트·이력 정리**다. 로고는 사용자 수용 완료. 구체 레이아웃과 공개할 경력 정보는 미확정이다.

## 이전 과정과 따라하기

아래는 당시 화면·설정·문제 해결 기록이다. 대기·실패·미확인 표현을 현재 상태로 읽지 않는다. 클라우드 정책·가격·UI는 재실행 전 공식 자료·콘솔에서 재확인한다.

- [계정·리전 준비](step-01-preparation.md), [최초 VM 설정](step-02-vm.md)
- [VM 재입력](vm-restart-checklist.md), [AMD VM 경로](vm-amd-start.md)
- [SSH 연결과 키 권한](ssh-first-connection.md), [서버 설정·방화벽](step-03-server.md)
- [문제 해결](troubleshooting.md), [저장한 Stack](save-as-stack.md)
- [당시 도메인 업체 비교](domain-registrars.md), [채택하지 않은 대안](hosting-alternative.md)

## 기록 규칙

- 저장소 안의 Markdown 위키다. GitHub 별도 Wiki 탭이나 전체 채팅 원문 자동 수집이 아니다.
- 현재 사실은 주제 문서에 정리하고 과거 변화는 작업 일지에 누적한다.
- 사용자 확정·사용자 보고·출력 확인·제안·미검증을 구분한다.
- UTF-8로 저장하고 메뉴·버튼·실행 위치와 이어지는 흐름을 설명한다.
- 키·토큰·비밀번호·결제 상세·감정적인 대화는 기록하지 않는다.
- 문서 검사·로컬 렌더·실제 서비스 검증을 구분한다.
