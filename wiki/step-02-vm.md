# 2단계 따라하기 — VM 생성 설정

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

갱신일: 2026-10-26. 현재는 생성 화면 설정 검토 중이며 VM 생성 완료가 아니다.

**화면이 닫혀 다시 입력하는 경우 [현재 설정 재입력 체크리스트](vm-restart-checklist.md)를 먼저 본다. 아래에는 이전 UI와 문제 해결 과정의 기록도 포함된다.**

## 캡처에서 확인한 현재 값

### 재입력 후 Review 검토 완료

사용자 Review 캡처 6장에서 다음을 확인했다.

- Name: `instance-20261026-2315` (제안했던 kwonyc-web-01이 아닌 자동 이름).
- Placement: AD-1, on-demand, fault domain 자동 선택.
- Image: Canonical Ubuntu 22.04, 2026.09.18-0.
- Shape: VM.Standard.A1.Flex, 2 OCPU·12GB.
- VNIC: kwonyc-vnic, VCN: kwonyc-vcn, Subnet: public subnet-kwonyc-vcn.
- **Public IPv4 address: Yes**. 기존 비활성 문제는 생성 설정 기준으로 해결됐다. 실제 IP 주소는 생성 후 확인한다.
- Private IPv4: 생성 시 자동 할당, DNS record Yes, NSG No. NSG를 사용하지 않는다고 보안 목록까지 없는 것으로 해석하지 않는다.
- SSH keys: 공개 키 항목이 있음. 실제 대응 개인 키 보유·접속 가능 여부는 아직 직접 확인하지 않았다. 키 내용은 기록하지 않는다.
- Authorization header Enabled, 재시작 Enabled, Shielded 관련 Secure Boot·Measured Boot·TPM은 Disabled.
- 부팅 디스크 사용자 지정 없음, 전송 중 암호화 Enabled, 추가 블록 볼륨 없음.

위 Review 설정에서 변경이 꼭 필요한 항목은 발견하지 않았다. 이름은 관리 편의상 Basic information Edit에서 kwonyc-web-01로 바꿀 수 있으나 필수는 아니다. 현재 등록 공개 키에 대응하는 개인 키 파일이 PC에 보관되어 있다면 Create로 생성 요청을 진행할 수 있다고 안내한다. 계정 전체 사용량·홈 리전·실제 비용과 A1 물리 재고는 Review 캡처만으로 확정하지 않는다.

생성 후에는 Running 상태와 Public IP address를 확인한다. Out of host capacity 등 오류가 나오면 문구를 확인하고 기존 네트워크나 키를 임의 삭제·재생성하지 않는다. 아직 VM 생성 성공이나 SSH 접속은 확인되지 않았다.

### 최신 적용 화면

가장 최근 Image and shape 요약 캡처에서 **Canonical Ubuntu 22.04, 빌드 2026.09.18-0 + VM.Standard.A1.Flex, 2 OCPU·12GB** 적용을 확인했다. 네트워크 대역폭 표시는 2Gbps다. Always Free-eligible 표시가 있으며 Security 행은 `-`다. 실제 VM은 아직 생성하지 않았다.

사용자가 1 OCPU·6GB에서 2 OCPU·12GB로 다시 변경했다. 이후 안내는 최신 사양 기준이다. 아키텍처 이름 자체는 캡처에 없으며 실제 부팅은 미검증이다. 다른 A1 사용량이 있다면 계정 합산 무료 한도를 확인해야 한다. 다음은 Next로 다음 설정 단계에 진입하여 Security·Networking·SSH 키·Storage를 확인하는 것이다. Next는 설정 단계 이동이며 최종 VM 생성 완료를 뜻하지 않는다.

### 최초 화면 기록

사용자가 제공한 Image and shape 캡처 기준:

- OS: Oracle Linux 9
- Image build: 2026.10.16-0
- Security: Shielded instance
- Shape: VM.Standard.E2.1.Micro
- Always Free-eligible 표시 있음
- 메모리: 1GB

이 캡처로 계정 전체 무료 한도·홈 리전·A1 재고·전체 생성 비용을 확인한 것은 아니다.

## Image와 Shape 변경 방법

### 후속 캡처 확인: A1 선택 화면

사용자 후속 캡처에서 Virtual machine → Ampere → `VM.Standard.A1.Flex`가 선택되어 있고 Always Free-eligible 표시와 **1 OCPU·6GB**가 보인다. 현재 Image는 여전히 Oracle Linux 9다. 이 화면의 선택이 최종 적용되었는지는 아직 확인하지 않았다.

- 행 왼쪽의 작은 삼각형을 펼쳐 CPU·메모리 조절 항목을 확인한다.
- 최초 제안은 기존 A1 사용량이 없는 경우 2 OCPU·12GB지만, 초기 정적 사이트와 브라우저 게임 파일 제공은 1 OCPU·6GB로 시작하는 것도 가능하다. 실제 성능은 배포 후 확인한다.
- `80 max`, `512 max`는 Shape의 최대 지원 사양 표시로, 무료 한도나 이 계정의 실제 사용 가능량을 의미하지 않는다.
- 이 캡처의 상단 Upgrade 안내만으로 유료 전환이 필요한 것은 아니다. 선택한 A1과 계정의 무료 사용 조건을 확인한다.
- 2 OCPU·12GB로 변경한다면 계정 전체 A1 사용량과 한도를 먼저 확인한다. 변경한 숫자가 확인되지 않으면 완료로 체크하지 않는다.

### 변경 절차

### Ubuntu 목록 화면에서 다음 클릭

사용자 캡처에는 Ubuntu 카테고리가 선택되어 있고 Canonical Ubuntu 20.04, 20.04 Minimal, 22.04, 22.04 Minimal이 보인다. 더 아래 항목은 캡처로 확인하지 않았다.

현재 보이는 목록 기준으로 **Canonical Ubuntu 22.04 (Minimal이 없는 일반 항목)** 왼쪽 ▶를 펼쳐 세부 빌드와 아키텍처를 확인한다. ARM64/aarch64 또는 A1 호환 여부를 확인한 뒤 선택한다. 이 캡처에는 상세 아키텍처가 보이지 않으므로 Ubuntu 적용 완료로 처리하지 않는다. 22.04는 2027년 5월까지 표준 보안 유지보수 대상이며 장기 운영 시 지원 종료 전 업그레이드 계획을 세운다. 이후 24.04 등이 확인되면 별도 비교할 수 있다.

공식 지원 주기: [Ubuntu release cycle](https://ubuntu.com/about/release-cycle).

### 실제 UI 보정: 아키텍처 대신 빌드 날짜가 표시됨

후속 캡처에서 펼친 항목에는 Image build 드롭다운만 보이며 `2026.09.18-0`, `2026.08.25-0`, `2026.07.17-0`이 표시된다. ARM64/aarch64 문구가 반드시 노출된다고 안내한 것은 부정확했다. 이 경우 아키텍처 표기를 계속 찾도록 요구하지 않는다.

현재 안내 중인 Canonical Ubuntu 22.04 일반 항목의 빌드는 **표시된 항목 중 최신인 2026.09.18-0**으로 유지하고, 항목 선택 후 하단 이미지 적용 버튼(예: Select image)으로 적용한다. 적용 후 요약에서 Ubuntu 22.04와 VM.Standard.A1.Flex 1 OCPU·6GB가 함께 유지되고 호환성 오류가 없는지 확인한다. 날짜만으로 아키텍처 호환성을 확정하지 않는다. 이 캡처 하단에 Ubuntu 24.04 항목도 일부 보이나 사용자가 변경했다고 간주하지 않는다.

1. `Change shape`를 누른다.
2. 가상 머신 유형에서 `Ampere` 또는 ARM 계열을 찾아 `VM.Standard.A1.Flex`를 확인한다.
3. 기존 A1 사용량이 없다면 초기 제안은 2 OCPU·12GB다. 계정 전체 사용량이 무료 한도를 넘지 않는지 확인한다. 다른 크기의 기본값이 채워져 있다면 수정한다.
4. 변경을 적용한 후 `Change image`에서 공식 플랫폼 이미지의 Ubuntu LTS를 선택한다. A1용 `aarch64`/`Arm64` 이미지가 필요하며 x86_64/AMD64는 선택하지 않는다.
5. 이미지 선택 후 Shape가 A1로 유지되는지 다시 확인한다. 이미지·Shape 호환성 때문에 A1이 보이지 않으면 ARM 지원 이미지 선택 여부를 먼저 확인한다.
6. A1이 비활성화되거나 오류가 나면 표시 문구를 기록한다. 유료 Shape로 임의 대체하지 않는다. AMD Micro도 무료 대안이지만 메모리 1GB 등 자원 차이를 고려하여 별도 선택한다.

목표는 Ubuntu LTS (ARM64) + VM.Standard.A1.Flex다. 현재 공식 무료 A1 기준은 총 2 OCPU·12GB이며 실제 계정 한도·사용량과 홈 리전 조건을 함께 확인해야 한다.

## 이후 남은 설정

### Networking·SSH 최초 화면과 설정 순서

최신 사용자 보고: 공인 IPv4 자동 할당은 켤 수 없어 켜지 않았고 나머지 안내 작업은 완료했다고 알렸다. 이를 새 VCN·공개 서브넷 선택 및 SSH 키 다운로드 완료의 사용자 보고로 기록하되 변경 후 캡처·저장 파일은 직접 확인하지 않았다. 현재는 Next로 Storage 화면을 살펴보는 단계다. 실제 Next 이동은 아직 미확인이다.

**미해결: 공인 IPv4 꺼짐/비활성화.** 공개 서브넷이 실제로 선택되었는지, 새 VCN 생성 과정의 UI 제약인지, 다른 원인인지는 아직 확인하지 못했다. 외부 SSH·웹 접속을 계획하므로 최종 Create 전 확인한다. 공인 IP가 없어도 VM 생성 자체는 가능하고 생성 후 할당하는 경로도 있지만, 이번 사용자가 이해하고 진행하는 구성에서는 미해결 상태를 숨기거나 네트워크 완료로 처리하지 않는다.

추가 캡처에서 `You must select a public subnet to assign a public IPv4 address` 경고가 계속 표시되는 것을 확인했다. 현재 폼이 공인 IP를 할당할 수 있는 공개 서브넷으로 인식하지 않고 있다는 증거다. 실제 선택한 서브넷의 상세는 캡처에 없어 사설 서브넷이라고 단정하지 않는다.

다음 조치: Networking 위쪽 Subnet 영역으로 이동 → `Create new public subnet` 선택 여부 확인 → 새 서브넷 이름·필수 값 확인 → 공인 IPv4 토글 활성 여부 확인. 이미 해당 옵션이 선택되어 있다면 VCN·Subnet 영역 전체 캡처로 상태를 확인한 뒤 다음 경로를 정한다. 이 상태에서 공인 IP 문제가 해결됐다고 처리하거나 최종 Create를 안내하지 않는다.

### 공개 서브넷 선택 확인 후 우회 경로

최신 캡처에서 새 VCN `kwonyc-vcn`, 새 공개 서브넷 `kwonyc-public-subnet`, CIDR `10.0.0.0/24`, VNIC `kwonyc-vnic` 입력을 확인했다. 사용자 선택 오류라고 단정했던 방향은 폐기한다. 공개 서브넷 선택은 올바르게 표시되어 있으나 공인 IP 활성화가 안 되는 원인은 아직 불명확하다. 콘솔 버그라고 확정하지 않는다.

대안으로 기존 VM 생성 탭을 유지하고 **별도 탭**에서 VCN을 먼저 만든 다음 기존 네트워크로 선택하는 경로를 안내한다. 새 탭에서 Oracle 콘솔 → Networking → Virtual cloud networks → Start VCN Wizard → Create VCN with Internet Connectivity → 마법사 설정 화면 확인 순서다. 아직 마법사 생성 버튼을 실행한 상태가 아니다.

공식 마법사는 공개·사설 서브넷, 인터넷·NAT·서비스 게이트웨이와 라우팅 등을 생성하므로 다음 화면에서 생성 리소스와 현재 비용 조건을 검토한다. 이번 공개 웹 VM은 공개 서브넷·인터넷 경로가 핵심이다. 생성 후 원래 VM 폼에서 기존 VCN·공개 서브넷 선택과 공인 IP 활성화를 확인한다. 생성 탭 새로고침으로 폼이나 SSH 키가 재생성되지 않도록 기존 탭을 보존한다.

출처: [VCN 마법사](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/quickstartnetworking.htm). 생성·연결·비용 검증은 아직 미완료다.

### VCN 목록 화면 도착

사용자 캡처에서 Virtual Cloud Networks 목록, 현재 compartment 필터, `No items to display`, `Create VCN`과 `Actions` 버튼을 확인했다. 이는 현재 필터 범위에서 표시되는 VCN이 없다는 뜻이며 계정 전체에 VCN이 없다고 단정하지 않는다.

다음 클릭은 **Actions → Start VCN Wizard → Create VCN with Internet Connectivity**다. 현재 캡처에는 Actions 내부 메뉴가 보이지 않으므로 해당 항목을 찾지 못하면 펼친 메뉴를 확인한다. 공식 문서는 목록 화면의 Actions 안에서 마법사를 시작하거나 Networking → Overview에서 Start VCN wizard를 여는 경로를 안내한다. 일반 Create VCN은 이번 마법사 경로와 구분한다. 마법사 입력 화면에서 생성 리소스를 검토한 뒤 실제 생성으로 진행한다.

### VCN 마법사 Configuration 화면

최신 사용자 캡처에서 인터넷 연결 VCN 마법사 도착을 확인했다. 다음 값을 입력·유지하도록 안내한다.

| 항목 | 값 |
|---|---|
| VCN name | `kwonyc-vcn` 입력 |
| Compartment | 현재 선택값 유지 |
| VCN IPv4 CIDR | `10.0.0.0/16` 유지 |
| Enable IPv6 | 꺼짐 유지 |
| Use DNS hostnames | 켜짐 유지 |
| Public subnet IPv4 CIDR | `10.0.0.0/24` 유지 |
| Private subnet IPv4 CIDR | `10.0.1.0/24` 유지 |
| Tags | 현재 자동 입력값 유지, 추가 태그 불필요 |

공개·사설 서브넷 CIDR은 VCN 범위 내에 있고 서로 겹치지 않는다. 다른 네트워크와 연결하는 계획은 현재 없어 그 범위까지 검증한 것은 아니다. Use DNS hostnames는 VCN 내부 이름용이며 가비아 도메인 구매를 요구하는 항목이 아니다.

상단 `Resource availability checked successfully`는 가용성 확인 성공 메시지로 해석한다. `Maximum item count reached`는 이 화면의 추가 IP 주소 유형 항목에 붙은 표시이며 VM 재고 부족의 증거로 해석하지 않는다.

다음은 화면 아래의 Next/Review 등 다음 단계 버튼으로 검토 화면에 진입한다. 버튼은 캡처에 없어 정확한 이름은 미확인이다. Review에서 인터넷·NAT·서비스 게이트웨이와 서브넷·라우팅 등 생성 항목을 확인한다. 마법사는 NAT 및 사설 서브넷도 포함하지만 이번 VM은 공개 서브넷을 사용한다. 전체 비용 무료 여부는 현재 화면만으로 확정하지 않는다. 아직 최종 Create 실행이나 생성 완료는 확인하지 않았다.

### VCN 생성 실행 후 상태

사용자가 Create를 눌렀다고 보고했고 생성 진행 캡처를 제공했다. `kwonyc-vcn`, `public subnet-kwonyc-vcn`, `private subnet-kwonyc-vcn`, 인터넷·NAT·서비스 게이트웨이, 라우트와 보안 목록 관련 주요 작업은 Done으로 표시된다. 마지막 `Update private subnet`은 0%·처리 중 표시라 전체 마법사 완료를 아직 확정하지 않는다. 재생성이나 삭제를 요구하지 않고 마지막 작업 상태를 확인한다.

완료 후 진행:

1. 마지막 작업도 Done인지 확인하고 View VCN으로 상세 화면을 연다. 오류가 있으면 해당 문구를 기준으로 확인한다.
2. 원래 VM 생성 탭으로 돌아간다. 폼과 생성된 SSH 키를 보존하도록 전체 페이지 새로고침은 피한다.
3. Primary network를 **Select existing virtual cloud network**로 바꾸고 `kwonyc-vcn` 선택.
4. Subnet을 **Select existing subnet**으로 바꾸고 **public subnet-kwonyc-vcn** 선택. private subnet은 이번 공개 웹 VM에 선택하지 않는다.
5. 목록이 비어 있으면 리전·compartment와 목록 자체 갱신 옵션을 확인한다. 폼 전체를 새로고침해야 한다면 SSH 키 선택·다운로드 상태를 다시 대조한다.
6. 공인 IPv4 자동 할당 스위치를 켤 수 있는지 확인한다. 실제 IP 할당과 외부 통신은 VM 생성 후 별도 검증한다.

실제 서브넷 CIDR·라우트·보안 규칙과 전체 비용은 생성 상세에서 추가 확인한다. VM 생성 자체는 아직 하지 않았다.

진행 안내: Next로 Storage 화면을 확인하고, 최종 생성 전 Networking으로 돌아가 `Create new public subnet` 선택 상태와 Public IPv4 영역을 함께 확인한다. Next가 오류로 막히면 오류 문구를 기록한다. IPv4가 켜졌다고 추정하지 않으며 키는 입력·다운로드 이후 재생성하지 않는다.

사용자 캡처 3장에서 기존 VCN 선택 상태지만 VCN·서브넷 값이 비어 있음, 사설 IPv4 자동 할당 선택, 공인 IPv4 토글 꺼짐, 공개 서브넷 선택 필요 경고를 확인했다. IPv6도 꺼짐이며 SSH는 Generate a key pair for me가 선택되어 있다.

이번 새 사이트용 네트워크를 만드는 안내:

1. VNIC name에는 식별용 `kwonyc-vnic`를 사용할 수 있다.
2. Primary network에서 **Create new virtual cloud network** 선택. 이름을 묻는다면 `kwonyc-vcn`, compartment는 현재 선택값을 유지한다.
3. Subnet에서 **Create new public subnet** 선택. 이름을 묻는다면 `kwonyc-public-subnet`. CIDR이 자동 제안되면 현재 표시값을 확인한 뒤 유지한다. 새 선택 후 나타나는 필드는 아직 캡처로 확인하지 않았다.
4. Private IPv4는 **Automatically assign private IPv4 address** 유지.
5. 공개 서브넷 선택 후 **Automatically assign public IPv4 address**를 켠다. 여전히 비활성화되어 있으면 네트워크 설정 화면을 다시 확인한다. 이 자동 할당은 예약 IP 확보 완료를 뜻하지 않는다. 도메인 연결 전 예약 IP 계획은 별도로 확인한다.
6. 초기에는 IPv6를 꺼둔 채 진행한다. Advanced options는 별도 요구가 없으면 변경하지 않는다.
7. SSH는 **Generate a key pair for me** 유지. **Download private key**와 **Download public key**로 두 파일을 사용자 PC에 저장한다. 특히 개인 키는 나중에 서버 접속에 필요하며 생성 화면에서 다시 표시되지 않으므로 다음 단계로 가기 전에 파일 저장을 확인한다.
8. 개인 키는 본인 전용 안전한 폴더에 보관하며 채팅·위키·Git 저장소에 올리지 않는다. 키 내용 대신 저장 완료 여부만 공유한다.
9. 새 VCN·공개 서브넷·공인 IPv4 켜짐·개인 키 저장을 확인한 뒤 Next로 Storage에 이동한다.

주의: 공개 서브넷과 공인 IP 선택만으로 외부 통신 검증이 완료되는 것은 아니다. 실제 생성 후 인터넷 게이트웨이·라우트·보안 규칙·OS 방화벽과 SSH 접속을 확인한다. 신규 VCN의 자동 설정은 생성 결과로 검증하며 현재 캡처에서는 확인하지 못했다.

### Security 화면

사용자 캡처에서 2단계 Security 화면, Shielded instance 토글 꺼짐, Advanced options 접힘을 확인했다. 초기 구성에서는 현재 기본값을 유지하고 Next로 Networking에 진입하도록 안내한다. Advanced options는 이번 구성에서 별도 요구가 없어 변경하지 않는다.

Shielded instance는 부팅·펌웨어 무결성 보호를 추가하는 기능이다. 네트워크 방화벽이나 SSH 인증을 설정하는 스위치가 아니며, 꺼짐을 서버 보안 전체가 꺼졌다는 뜻으로 해석하지 않는다. 호환성 및 생성 후 변경 제약을 고려하여 이번 초기 구성에서는 추가 활성화를 제안하지 않는다. 이후 SSH 키·접근 제한·방화벽·OS 업데이트를 별도로 설정한다.

공식 자료: [Compute 개요의 Shielded 설명](https://docs.oracle.com/en-us/iaas/Content/Compute/Concepts/computeoverview.htm), [Shielded instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/shielded-instances.htm). Security 화면을 확인했지만 Next 이동과 VM 생성은 아직 확인하지 않았다.

- [ ] 홈 리전과 계정 무료 한도·기존 사용량 확인
- [x] Ubuntu 22.04·A1 및 최신 2 OCPU·12GB 선택 결과 확인 — 이전 요약 캡처 기준, 재입력은 별도 확인
- [ ] VCN·공개 서브넷·공인 IP 구성
- [ ] SSH 키 생성 또는 공개 키 등록, 개인 키 안전 보관
- [ ] 부팅 디스크·성능 옵션과 비용 확인
- [ ] 생성 전 전체 설정 검토
- [ ] VM 생성 성공 및 SSH 실제 접속

네트워크·SSH·저장 공간의 구체적 안내는 해당 화면을 확인한 뒤 이 문서에 누적한다. Image·Shape 선택은 요약 캡처로 확인했다.

다음 화면 이동: 생성 폼에서 아래쪽 Networking 항목을 찾거나, 단계형 화면이면 Next로 Security 화면을 거쳐 Networking으로 이동한다. 실제 화면에 없는 버튼이나 설정을 단정하지 않는다. 네트워크 화면을 확인한 뒤 VCN·서브넷·공인 IP 값을 구체적으로 안내한다.

## 공식 자료와 검증

### Storage 실제 화면 확인

재입력 후 사용자 캡처에서 기본 부팅 디스크 46.6GB, 사용자 지정 크기·성능 꺼짐, 전송 중 암호화 켜짐, 사용자 관리 키 꺼짐, 추가 블록 볼륨 없음이 확인됐다. 현재 설정 유지 → Next → Review로 안내했다. 사용자 관리 키를 켜지 않아도 기본 Oracle 관리 키로 저장 데이터가 암호화된다. 공인 IP 해결과 계정 전체 무료 사용량은 여전히 이 화면으로 확인할 수 없다.

- [인스턴스 생성](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm)
- [Always Free 한도와 지원 이미지](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)

자료 확인일: 2026-10-26. Ubuntu 22.04·A1 2 OCPU·12GB 선택과 VCN 마법사 주요 작업 Done은 과거 캡처로 확인했다. 새 폼 재입력 결과·A1 재고·VM 생성·SSH·웹 접속은 아직 미검증이며 실행 코드는 작성하지 않았다.
