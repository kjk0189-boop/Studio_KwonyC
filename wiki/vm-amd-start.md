# 일반 VM 생성으로 재시작 — 무료 AMD Micro

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

날짜: 2026-10-28. 사용자 요청으로 Stack 경로를 중단하고 Compute 생성 화면에서 다시 진행한다. A1 용량 부족이 반복되어 AMD Micro를 다음 시도 기준으로 제안한다. 실제 AMD 선택·생성 결과는 미확인이다.

## 입력값

먼저 Compute → Instances 목록에 이미 생성된 서버가 있는지 확인한다. 없다면 Create instance. 기존 서버가 있으면 중복 생성 대신 그 상태를 확인한다.

| 항목 | 설정 |
|---|---|
| Region | Osaka / KIX |
| Name | kwonyc-web-01 |
| Compartment | 기존 root |
| Image | 공식 Canonical Ubuntu 22.04 일반 이미지, AMD/x86 호환 |
| Shape | VM.Standard.E2.1.Micro, Always Free-eligible 표시 확인 |
| Shape 경로 | Change shape → Virtual machine → Specialty and previous generation |
| Memory | 1GB, A1처럼 2 OCPU·12GB를 입력하지 않음 |
| Shielded instance | 기본 꺼짐 유지 |
| VNIC name | kwonyc-vnic |
| Primary network | Select existing virtual cloud network → kwonyc-vcn |
| Subnet | Select existing subnet → public subnet-kwonyc-vcn |
| Private IPv4 | 자동 할당 |
| Public IPv4 | 자동 할당 켜짐 |
| IPv6 | 꺼짐 |
| Boot volume | 현재 기본값 유지, 앞선 화면 46.6GB |
| In-transit encryption | 켜짐 |
| Customer-managed key | 꺼짐, Oracle 관리 키 사용 |
| Extra block volume | 없음 |

SSH는 기존 .pub와 대응 개인 키가 확실하면 공개 키 업로드. 불확실하면 새 키 쌍을 생성해 이번 개인 키를 저장한다. 개인 키를 업로드·채팅에 공유하지 않는다.

## 실행

Security·Networking·Storage는 위 표대로 입력하고 Next로 이어간다. Review에서 E2.1.Micro, Ubuntu, public subnet, Public IPv4 Yes, SSH 등록, 추가 디스크 없음과 비용 표시를 확인한다. 무료 대상·계정 전체 한도를 벗어나는 옵션이 없고 개인 키를 보관했다면 Create로 요청한다. 단계마다 화면을 요청하지 않고 오류나 설정 불일치가 있을 때만 확인한다.

성공하면 Running과 실제 Public IP 확인 → SSH 접속. 같은 Out of capacity면 재입력은 중단하고 해당 서버 계열도 재고 부족으로 기록한다. AMD도 재고를 보장하지 않는다. 1GB 메모리라 초기 범위는 정적 사이트·게임 파일 제공이며 빌드는 로컬에서 한다. 실시간 게임 서버 성능을 보장하지 않는다.

## Stack 조사에서 확인한 것

저장 Stack의 Variables 캡처에는 compartment_ocid, region(ap-osaka-1), tenancy_ocid 3개만 있다. Shape·메모리는 이 화면에서 확인되지 않았다. 이 사실이 Stack으로 실행 불가함을 뜻하지는 않는다. 사용자 의사에 따라 이 경로를 중단하며 저장 Stack과 VCN은 삭제하지 않는다. 식별자 전문은 기록하지 않는다.

공식 자료: [Always Free 사양](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm). 2026-10-28 재확인. 실제 계정 전체 무료 사용량·AMD 재고는 미확인.
