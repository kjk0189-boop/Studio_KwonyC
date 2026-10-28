# Save as stack로 설정 보관

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

최신 확인일: 2026-10-28. 상태: 사용자 Stack 목록 캡처로 저장 완료 확인.

## 실제 저장 결과

- Stack 이름: `kwonyc-web-stack-20261026-2315`
- 상태: Active
- 설명: kwonyc-web-stack
- 목록 생성 시각: 2026-10-26 14:29:13 UTC (한국 시간 23:29:13)

Active는 Stack 리소스 상태이며 VM이 Running이라는 뜻이 아니다. 저장된 CPU·메모리·이미지·네트워크 변수와 이전 Apply 작업 유무·결과는 아직 상세 화면에서 확인하지 않았다.

다음은 이름 링크로 Stack 상세 화면을 열고 Stack 정보·Variables·Jobs를 확인한다. 실제 설정과 이전 성공 작업 유무를 확인하기 전 Apply를 반복 실행하지 않는다. 저장 구성을 다시 입력할 필요는 없으며 필요한 변경은 구성·변수 상태에 따라 결정한다.

### 상세 화면 확인 — 2026-10-28

사용자 Details 캡처에서 Terraform 1.5.x (HashiCorp), 설정 Download 버튼, drift detection NOT_CHECKED와 Variables·Jobs 탭을 확인했다. 설정 다운로드의 실제 내용과 저장된 CPU·메모리는 아직 확인하지 않았다. 상단 complex data types Schema YAML 지원 메시지는 기능 안내이며 작업 실패 오류가 아니다. Drift detection NOT_CHECKED 역시 VM 생성 실패 또는 미생성을 증명하지 않는다.

다음은 **Jobs** 탭에서 작업 종류(Plan/Apply), 상태, 실행 시각을 확인한다. 과거 Apply 성공이 있다면 생성 리소스부터 확인하여 중복 생성을 피한다. Jobs 확인 후 Variables에서 사양을 확인하고 Plan/Apply 진행 여부를 결정한다. 현재 화면의 OCID는 위키에 옮기지 않는다.

### Jobs 목록 확인 — 2026-10-28

사용자 캡처에서 Jobs 탭의 검색 입력은 비어 있고 목록은 `No items to display`다. 현재 표시 범위에서 Plan/Apply 이력이 없다고 기록한다. 이전 생성 폼에서 직접 실행한 실패는 이 Stack의 Jobs와 별개이며 계정 전체 VM이 없다고 단정하지 않는다.

다음은 Variables 탭에서 shape·ocpus·memory·image·subnet 등 실제 노출 변수를 확인한다. 항목이 없거나 값이 구성에 고정되어 있으면 Details의 Terraform configuration Download로 구성을 확인하는 경로를 사용한다. 변수명·편집 가능 여부는 아직 미확인이다. 공개 키 전문이나 식별자 전체를 위키에 옮기지 않는다.

## 무엇을 저장하는가

## 현재 진행: 저장한 Stack에서 끝까지 실행

2026-10-28 사용자 의사는 **기존 Stack에서 이어서 진행**하는 것이다. 일반 VM 재입력·AMD 전환 제안은 현재 경로에서 철회한다. Variables에는 계정·리전 3개만 표시되지만 실제 Shape 등은 Terraform 구성에 들어 있을 수 있으므로 실행 불가를 뜻하지 않는다. 단계마다 캡처를 요구하지 않고 아래 전체 절차를 안내하며, 오류·계획 불일치가 있을 때만 소통한다.

1. 다음 경로로 **Stack 상세 화면 상단의 작업 버튼 영역**으로 이동한다: Oracle 콘솔 → 왼쪽 위 ☰ → Developer Services → Resource Manager → Stacks → `kwonyc-web-stack-20261026-2315` 이름 클릭 → 페이지 맨 위로 스크롤. `Details / Variables / Jobs`는 아래쪽 정보 탭이며 Plan 버튼이 있는 영역과 구분한다. Stack 제목 주변의 작업 버튼 중 **Plan**을 선택한다. Plan 패널이 열리면 기본 옵션을 유지하고 패널의 **Plan**으로 실행한다. 화면 폭·UI에 따라 버튼이 보이지 않으면 상단 Actions/More actions 같은 접힌 작업 메뉴가 있는지 확인하되 실제 메뉴 항목은 아직 캡처로 확인하지 않았다.
2. Jobs에서 Plan이 Succeeded가 되면 작업 상세의 Logs 또는 Plan 결과 확인. Plan은 생성 계획이며 VM 확보나 A1 재고 확인을 뜻하지 않는다.
3. 계획의 `oci_core_instance`, Shape, OCPU·메모리, 공개 IP, 서브넷 참조를 확인한다. 현재 저장된 정확한 사양은 아직 미확인이다. 기존 VCN·서브넷을 쓰는 계획인지 확인하고 뜻하지 않은 삭제·교체가 있으면 Apply 전에 해당 부분을 확인한다.
4. 의도한 VM 생성 계획이면 Stack으로 돌아가 **Apply**. 실행 계획 선택 옵션에서 방금 성공한 Plan 작업을 골라 Apply 실행. 자동 승인 방식만 쓰기보다 확인한 Plan을 사용한다.
5. Jobs의 Apply 결과를 확인한다. Succeeded 후 Compute → Instances에서 Running과 실제 Public IP를 확인한다. SSH 개인 키는 현재 Stack의 공개 키와 대응해야 한다.
6. Plan 또는 Apply가 Failed라면 해당 Job의 Logs 끝부분 Error를 확인한다. Out of capacity면 재고 문제라서 폼 재입력·Stack 재생성이 해결책은 아니다. 이후 같은 Stack에서 재시도하거나 사양 변경을 결정한다. 권한·이미지·서브넷 오류라면 해당 오류를 기준으로 필요한 설정만 수정한다.
7. 사양이 Variables에 노출되지 않으면 Details → Terraform configuration Download의 `.tf` 구성을 확인·수정 후 Stack 구성 업데이트 경로로 변경할 수 있다. 실제 파일을 보지 않고 특정 파일명이나 키 구조를 확정하지 않는다. 실패 시 일부 리소스가 생겼을 수 있어 새 VM을 중복 생성하거나 Destroy로 정리하지 않는다.

공식 실행 절차: [Plan](https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-job-plan.htm), [Apply](https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-job-apply.htm). 2026-10-28 확인. 실제 실행 결과는 미확인이다.

VM 생성 폼의 리소스 구성을 OCI Resource Manager의 Terraform Stack으로 보관한다. 이미지·Shape·CPU·메모리·네트워크 참조·디스크 등 인프라 생성 설정을 재사용하는 목적이다. 기존 VCN을 참조한 폼이면 기존 VCN 자체를 백업하거나 복제한 것으로 간주하지 않는다. 저장 시 실제 생성된 Terraform 구성과 변수도 확인한다.

브라우저 입력 화면을 그대로 복원하는 임시 저장 기능과는 다르다. 이후 Resource Manager에서 설정을 검토·수정하고 Apply 작업으로 리소스를 생성하는 흐름이다. Stack 저장 자체는 A1 재고 확보나 VM 생성 성공을 뜻하지 않는다. VM 데이터와 SSH 개인 키의 백업을 대신하지 않으며 개인 키는 PC에 따로 보관한다.

## 저장 안내

1. 현재 Review 화면에서 Save as stack 선택.
2. 이름은 `kwonyc-web-stack` 같은 식별용 이름 사용.
3. Compartment는 현재 리소스와 일치하는 기존 값 유지. 설명은 선택이며 비밀 정보는 넣지 않는다.
4. Create stack 화면의 안내에 따라 Next를 진행하고 구성·변수를 검토하여 저장한다.
5. `Run apply` 또는 즉시 실행 옵션이 표시되면 설정 보관만 원할 때는 해제한다. 이 옵션의 실제 노출 여부는 사용자 다음 화면에서 확인한다.
6. Stack details 화면이 열리고 Stack이 목록에 남았는지 확인한다.

다시 찾는 경로는 OCI 메뉴의 Developer Services → Resource Manager → Stacks다. 메뉴 이름은 콘솔 언어·구성에 따라 다를 수 있다.

주의: 현재 실제로 선택된 Shape와 CPU·메모리가 저장되므로 저장 전 Review에서 숫자를 확인한다. 2 OCPU·12GB와 1 OCPU·6GB의 실패 시도 기록이 있고 AMD 선택은 제안만 했으므로, 현재 폼이 어느 값인지 이 버튼 캡처만으로 확정할 수 없다. 저장 후 Apply도 같은 용량 부족 오류가 날 수 있다.

## 공식 출처

- [리소스 생성 화면에서 Stack 만들기](https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Tasks/create-stack-resource.htm)
- [인스턴스 Review의 Save as stack](https://docs.oracle.com/en-us/iaas/oracle-linux/oci/gs-create-instance.htm)
