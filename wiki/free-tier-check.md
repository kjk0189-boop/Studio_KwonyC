# 현재 VM 무료 대상 확인

확인일: 2026-10-28.

## 직접 확인한 사실

- 기존 SSH 연결에서 OCI 인스턴스 메타데이터의 shape 항목만 조회했다.
- 실제 Shape: **VM.Standard.E2.1.Micro**.
- Oracle 공식 Always Free 문서는 홈 리전의 해당 Shape를 계정당 최대 2대 무료 대상으로 명시한다. 메모리는 1GB다.
- 따라서 현재 VM은 무료 대상 사양이다. 이전 A1 계획과 구분한다.

## 아직 확인하지 않은 것

계정의 홈 리전·전체 무료 사용량·연결된 모든 스토리지/백업·다른 유료 리소스·실제 청구 내역은 이 조회로 확인할 수 없다. 무료 대상 Shape임을 계정 전체 청구액 0원 확인으로 확대하지 않는다. 도메인 구매·갱신 비용은 Oracle VM 무료 여부와 별개다.

최종 계정 상태는 Oracle 콘솔 → Compute → Instances → kwonyc-web-01에서 Shape·Always Free-eligible 표시를 확인하고, Billing & Cost Management → Cost Analysis에서 기간·서비스별 사용 비용을 확인한다. 체험 크레딧으로 상쇄되는 비용과 Always Free 사용을 구분한다.

공식 근거: [Always Free Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm), [Free Tier FAQ](https://www.oracle.com/cloud/free/faq/).
