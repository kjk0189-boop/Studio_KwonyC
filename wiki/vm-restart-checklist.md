# VM 생성 화면 재입력 체크리스트

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

작성일: 2026-10-26. 생성 폼이 닫힌 뒤 다시 입력할 때 쓰는 현재 기준 안내다. 과거 화면 기록은 [VM 설정 일지](step-02-vm.md)에 있다.

## 현재 구분

- VM 생성 완료 증거는 아직 없다. 사용자의 'VM 꺼짐'은 생성 폼이 닫힌 상황으로 우선 해석한다.
- 이미 Instances에 같은 VM이 있고 Stopped라면 새로 만들지 말고 기존 인스턴스 상태를 확인한다.
- 별도 VCN 마법사 Create는 실행됐다. 주요 리소스 Done을 캡처로 확인했고 마지막 private subnet 업데이트 완료는 미확인이다. 기존 VCN을 확인하여 재사용한다.
- 아래 체크박스는 이번 재입력 시 새로 확인할 항목이다. 과거 설정 확인과 구분한다.

## 0. 시작

- [ ] 선택 리전 Japan Central (Osaka), KIX / ap-osaka-1 확인
- [ ] Compute → Instances에서 기존 인스턴스 유무 확인. 없다면 Create instance
- [ ] Osaka가 홈 리전인지와 다른 A1 사용량·계정 한도 확인

## 1. Basic information

| 항목 | 입력 |
|---|---|
| Name | kwonyc-web-01 |
| Compartment | 이전과 같은 root compartment |
| Image | Canonical Ubuntu 22.04, 일반 항목 |
| Image build | 이전 확인값 2026.09.18-0, 현재 목록이 같으면 유지 |
| Instance type | Virtual machine |
| Shape series | Ampere |
| Shape | VM.Standard.A1.Flex |
| OCPU | 2 |
| Memory | 12GB |

- [ ] 이미지·Shape 선택 후 요약 값 확인, Next

계정 전체 A1 무료 한도와 기존 사용량을 합산한다. 이 표의 숫자만으로 전체 비용 무료를 확정하지 않는다. 아키텍처가 따로 표시되지 않는 UI에서는 ARM64 글자를 계속 찾지 말고 A1 호환 선택과 최종 요약을 확인한다.

## 2. Security

- [ ] Shielded instance 꺼짐, Advanced options 기본값 유지 후 Next

## 3. Networking

| 항목 | 선택·입력 |
|---|---|
| VNIC name | kwonyc-vnic |
| Primary network | Select existing virtual cloud network |
| VCN | kwonyc-vcn |
| Subnet | Select existing subnet |
| 공개 서브넷 | public subnet-kwonyc-vcn |
| Private IPv4 | Automatically assign |
| Public IPv4 | Automatically assign public IPv4 address 켜기 |
| IPv6 | 꺼짐 |

- [ ] 기존 VCN과 공개 서브넷 선택
- [ ] 공인 IPv4 토글 활성화·켜짐 확인

이번에는 Create new VCN을 선택하지 않는다. 기존 VCN이 목록에 없으면 리전·compartment·VCN 생성 상태를 확인한다. 생성 마법사의 public subnet 이름을 사용하며 이전 VM 폼에만 입력했던 kwonyc-public-subnet과 혼동하지 않는다. 공인 IP가 여전히 비활성화되면 현재 화면으로 진단한다.

## 4. SSH 키

두 경로 중 하나만 선택한다.

- [ ] 기존 키 재사용: 이전에 받은 공개 키 .pub와 대응하는 개인 키가 모두 있으면 Upload public key file (.pub)로 **공개 키만** 업로드. 대응하는 개인 키는 PC에 보관.
- [ ] 새 키 생성: 이전 키 쌍이 불확실하면 Generate a key pair for me로 새로 만들고 **이번 폼에서 생성된** 개인·공개 키를 저장. 이전 폼의 개인 키와 섞지 않음.

키 내용은 채팅·위키·Git에 남기지 않는다. 개인 키를 업로드하지 않는다. 위 두 체크박스는 선택한 경로 하나만 완료 처리한다.

## 5. Storage와 Review

### 실제 Storage 캡처 확인값

- 사용자 지정 크기·성능: 꺼짐, 화면 기본 부팅 디스크 **46.6GB**.
- Use in-transit encryption: 켜짐.
- Encrypt this volume with a key that you manage: 꺼짐. 기본 Oracle 관리 키 사용이며 저장 데이터 암호화가 꺼졌다는 뜻이 아니다.
- Block volumes: 추가 항목 없음.

현재 설정을 유지하고 Next로 Review에 이동하도록 안내한다. 초기 50GB는 설계 제안이었으며 실제 화면 기본값 46.6GB를 억지로 변경할 필요는 없다. 계정 전체 볼륨 사용량과 최종 비용은 이 캡처만으로 검증하지 못했다. Review에서 특히 기존 VCN·공개 서브넷·공인 IPv4·등록한 SSH 키를 확인한다.

- [ ] Storage 화면 진입 후 디스크 용량·성능·추가 볼륨과 비용 표시 확인
- [ ] 초기 디스크 제안은 약 50GB이나 실제 현재 기본값·최소값과 무료 합산 범위를 확인한 뒤 확정
- [ ] Review에서 이미지·CPU·메모리·기존 네트워크·공인 IP·SSH·디스크 확인
- [ ] 최종 Create 후 성공·Running과 공인 IP 확인
- [ ] 실제 SSH 접속 확인

Storage 설정은 아직 사용자 캡처로 검토하지 않았다. 설정 후 바로 최종 Create까지 진행했다고 간주하지 않는다.
