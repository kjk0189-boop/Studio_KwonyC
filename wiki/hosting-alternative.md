# Oracle VM 대안: 정적 호스팅

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

검토일: 2026-10-28. 사용자는 홈 리전 변경이 안 되므로 다른 방법으로 전환하기를 요청했다. **Cloudflare Pages는 제안이며 서비스 선택은 아직 사용자 확정 전**이다. Oracle 자원은 삭제하지 않는다.

## 제안 구조

가비아 도메인 → Cloudflare Pages → Studio KWONYC 메인·게임 목록·웹 게임 빌드 파일. 초기에는 VM·공인 IP·SSH·OS 관리가 필요하지 않다. 게임 엔진은 미확인이라 정적 파일만으로 실행 가능한 브라우저 게임인지 먼저 확인한다. 실시간 멀티플레이 서버·로그인·랭킹 API 등은 별도 설계한다.

## 진행 순서

- [ ] 게임 엔진·프로젝트 위치·웹 빌드 가능 여부 확인
- [ ] 게임 빌드의 가장 큰 파일 크기 확인
- [ ] Cloudflare Pages 적합성 확인 및 서비스 선택 확정
- [ ] Cloudflare 계정 준비
- [ ] 메인과 게임 1개의 정적 빌드 준비
- [ ] Pages 프로젝트 생성 및 테스트 배포
- [ ] pages.dev 주소로 게임·모바일·오디오·헤더 확인
- [ ] 가비아 도메인 후보 확인 및 사용자 직접 구매
- [ ] Pages Custom domains에 도메인 등록·DNS 연결·HTTPS 확인
- [ ] 운영 안내와 광고 도입 검토

## 도메인 연결 차이

가비아에서 구매해도 된다. 루트 도메인(예: kwonyc.com)을 Pages에 연결하려면 Cloudflare zone으로 추가하고 가비아 등록기관에서 네임서버를 Cloudflare 지정값으로 변경한다. 도메인 등록기관 이전이나 재구매가 필요한 것은 아니다. 가비아 DNS를 그대로 유지하려면 www 같은 서브도메인을 Pages Custom domains에 먼저 등록한 뒤 CNAME으로 연결하는 경로가 있다. 단순 A 레코드에 VM IP를 넣는 기존 설계와 구분한다. 실제 도메인은 아직 미정이다.

## 제약과 검증

공식 Pages 무료 플랜 제한을 확인했다. **파일 1개 최대 25MiB**이므로 Unity WebGL 등 대형 .data/.wasm 파일은 업로드 전 확인한다. 초과하면 자산 분리·다른 파일 호스팅 등 별도 설계를 검토하며 현재 구성으로 무조건 가능하다고 보장하지 않는다. Pages Functions 등 서버 기능은 별도 사용량·한도가 적용된다.

광고 스크립트 연동을 고려할 수 있지만 광고 사업자 심사·정책과 실제 게임 동작을 별도로 검증한다. 수익이나 승인을 보장하지 않는다. 서비스 약관·비용과 계정 상태는 실행 전에 확인한다.

## 공식 자료

- [Pages 제한](https://developers.cloudflare.com/pages/platform/limits/)
- [커스텀 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)

현재는 문서 검토만 수행했다. 게임 파일·Cloudflare 계정·실제 배포·DNS는 아직 확인하지 않았다.
