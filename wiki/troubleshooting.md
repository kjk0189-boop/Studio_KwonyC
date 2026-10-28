# 문제 해결 기록

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

## 2026-10-28 — 리전 변경 검토

사용자가 Osaka 대신 다른 리전을 검토하자고 요청했다. 공식 문서에서 Always Free VM은 홈 리전에서 생성해야 하고, 홈 리전은 테넌시 생성 후 변경할 수 없음을 재확인했다. 현재 사용자 계정의 홈 리전 값은 아직 직접 확인하지 않았다. Osaka가 홈 리전이면 콘솔 리전 선택만 바꾸는 것으로 무료 A1을 다른 리전으로 이전할 수 없다. 유료 계정 전환을 홈 리전 변경이나 타 리전 Always Free 보장으로 안내하지 않는다.

지리적 근접성과 한국 이용자 중심 목적을 고려한 검토 후보는 Seoul(ap-seoul-1), Tokyo(ap-tokyo-1), Singapore(ap-singapore-1)다. 이는 재고 조사 결과나 실측 지연 시간 순위가 아니다. 실제 생성 가능 리전은 계정 구독·한도·현재 재고에 달려 있다. 신규 무료 계정 중복 생성을 해결책으로 제안하지 않는다.

다음 확인: OCI 콘솔 상단 프로필 → Tenancy: 계정명 → Home Region. Osaka면 무료 유지 방안(Osaka A1 재시도 또는 E2 Micro)과 비용을 허용하는 타 리전 사용을 구분해 결정한다. 다른 리전 사용 시 Osaka의 VCN은 리전 자원이므로 그대로 선택할 수 없고 대상 리전의 네트워크가 필요하다. 아직 리전 변경·구독·유료 전환을 실행하지 않았다.

근거: [Always Free Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm), [홈 리전 FAQ](https://docs.oracle.com/en-us/iaas/Content/GSG/Reference/faq.htm), [리전 목록](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm). 확인일 2026-10-28.

## 최신 상태 — 2026-10-28 A1 재시도 용량 부족

원래 A1 구성의 일반 생성으로 재시작한 뒤 사용자가 `Out of capacity for shape VM.Standard.A1.Flex in availability domain AD-1` 오류를 다시 제공했다. 실제 생성은 실패했다. 현재 선택은 원래 A1 유지이며 AMD 또는 Stack 전환을 자동으로 제안 경로로 삼지 않는다.

대응은 현재 생성 설정·기존 VCN·키를 유지하고 나중에 재시도하는 것이다. Fault domain은 이전 Review에서 Oracle 자동 선택으로 확인했으므로 강제 지정이 새로 생겼을 때만 Basic information → Placement/Advanced options에서 자동 선택으로 되돌린다. Osaka는 공식 표상 AD가 하나라 같은 리전 내 다른 AD를 선택하는 일반 권고는 적용할 수 없다. 재고가 풀리는 시점은 알 수 없고 즉시 성공시키는 설정 변경을 보장할 수 없다. 도메인·네트워크 재생성은 이 오류의 해결책이 아니다.

공식 FAQ와 리전 표를 2026-10-28 재확인했다. VM Running·실제 IP·SSH·계정 전체 사용량은 미확인이다.

## 2026-10-26 — A1 생성 Out of capacity

### 확인한 증거

사용자 캡처의 API Error: `Out of capacity for shape VM.Standard.A1.Flex in availability domain AD-1`.

2 OCPU·12GB 생성 요청은 용량 부족으로 실패했다. 선택 리전은 사용자 보고상 Osaka/KIX다. 설정 오류·도메인 미구매·무료 한도 초과라고 해석할 근거는 없다. VM 생성 성공과 공인 IP 발급은 아직 확인되지 않았다.

### 다음 시도

1. 실패 화면과 설정을 유지한다. 네트워크나 SSH 키를 삭제·재생성하지 않는다.
2. Basic information Edit → Change shape → A1을 **1 OCPU·6GB**로 낮춰 검토 후 한 번 재시도한다. 작은 사양도 실패할 수 있으며 성공을 보장하지 않는다.
3. Fault domain은 이미 자동 선택으로 Review에서 확인되어 별도 수정이 필요하지 않다.
4. Osaka는 공식 리전 표상 AD가 하나라 AD-2로 바꾸라는 일반 대응은 적용하지 않는다.
5. 같은 오류면 시간을 두고 재시도하거나 무료 AMD Micro를 대안으로 검토한다. AMD 전환은 CPU 아키텍처가 달라 호환 Ubuntu 이미지·1GB 메모리 제약을 함께 확인한다.
6. 무료 자원은 홈 리전 조건이 있으므로 다른 리전으로 임의 전환해 해결한다고 안내하지 않는다. 유료 계정 전환도 성공 보장으로 안내하지 않는다.

실패 후 Instances·Boot volumes에 남은 리소스가 있는지는 재시도 결과가 불명확하거나 폼을 다시 시작할 때 확인한다. 확인 없이 삭제하지 않는다.

### 공식 근거

- [Compute 알려진 문제](https://docs.oracle.com/en-us/iaas/Content/Compute/known-issues.htm): 작은 사양·다른 계열 검토 등 용량 부족 대응.
- [Free Tier FAQ](https://www.oracle.com/cloud/free/faq/): 무료 호스트 용량 부족과 이후 재시도.
- [리전 표](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm): Osaka AD 개수.

현재 1 OCPU·6GB 변경과 재시도는 제안이며 아직 실행 결과가 없다. 실제 물리 재고와 회복 시점은 확인할 수 없다.

## 2026-10-26 — 작은 A1 재시도도 실패, AMD 대안

사용자가 앞선 1 OCPU·6GB 재시도 안내 뒤 '그래도 안 된다'고 보고했다. 작은 사양 재시도 실패로 기록하되 새 오류 캡처가 없어 정확한 오류 문구는 재확인하지 못했다. 앞선 용량 부족 오류가 같다면 다음 대안은 무료 AMD Micro다.

### AMD Micro 확인 순서

1. 생성 폼 Basic information → Edit → Change shape.
2. Virtual machine → **Specialty and previous generation** → **VM.Standard.E2.1.Micro** 확인. 이름이 비슷한 다른 유료 AMD Flex와 혼동하지 않는다.
3. Always Free-eligible 표시와 메모리 1GB 확인.
4. A1은 ARM, E2 Micro는 x86 계열이므로 현재 Ubuntu 이미지와 호환되는지 확인한다. 호환 불가로 비활성화되면 공식 플랫폼 Ubuntu 22.04 x86_64/amd64 호환 이미지로 바꾼 뒤 E2 Micro를 재선택한다. 아키텍처 문구가 노출되지 않으면 최종 Image·Shape 요약과 오류 표시를 확인한다.
5. 기존 kwonyc-vcn·공개 서브넷·Public IPv4 Yes·SSH 공개 키·기본 디스크를 유지한다. Review 후 생성 결과를 확인한다.

1GB 메모리이므로 초기에는 정적 홈페이지·브라우저 게임 파일 제공으로 범위를 잡고 로컬에서 빌드한다. 실시간 게임 서버·여러 서버 프로세스·무거운 DB 실행 가능성을 보장하지 않는다. 재고도 보장하지 않는다. A1로 나중에 옮길 때는 ARM/x86 아키텍처 차이로 새 인스턴스와 재배포가 필요할 수 있다.

현재 AMD 변경은 제안이며 아직 선택 화면·생성 결과는 없다. 정확히 같은 용량 부족 오류가 아니라면 새 오류를 기준으로 진단한다.
