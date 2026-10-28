# 3단계 서버 기본 설정

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

최신 결과(2026-10-28): 사용자가 웹 포트 허용 후 브라우저 페이지 열림과 netfilter-persistent save 완료를 보고했다. **외부 HTTP 접속·규칙 저장 완료**로 기록한다. 재부팅 후 유지 테스트, 실제 OCI 규칙 전체, SSH 소스 제한은 아직 별도 검증하지 않았다. 다음은 도메인 결정·구매와 DNS·HTTPS다.

## 확인된 OS 방화벽 차단과 조치 — 2026-10-28

사용자 출력에서 Caddy `*:80` LISTEN, INPUT 체인의 ESTABLISHED/RELATED·ICMP·loopback·신규 TCP22 허용 후 최종 REJECT를 확인했다. 웹 80·443 허용은 없어 OS 방화벽 차단이 확인됐다. OCI 규칙 적용 여부는 아직 직접 확인하지 않았다.

Ubuntu SSH 터미널에서 각 명령을 한 번씩 실행하여 최종 REJECT 앞에 웹 포트 허용을 추가한다. SSH·기존 규칙·OUTPUT 체인은 변경하지 않는다.

```bash
sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
```

즉시 브라우저에서 공인 IP의 HTTP 주소로 재시도한다. 성공하면 다음으로 재부팅 후에도 유지되도록 저장한다.

```bash
sudo netfilter-persistent save
```

도구가 없다는 오류면 iptables-persistent 설치·서비스 상태를 확인하는 후속 절차로 진행한다. save 명령만 실패해도 앞서 추가한 런타임 규칙이 자동 취소되는 것은 아니지만 영구 저장 완료로 표시하지 않는다. 규칙을 여러 번 반복 추가하지 않는다.

검증: 실제 INPUT 출력과 Caddy 리슨은 확인했다. 명령은 [iptables 매뉴얼](https://manpages.ubuntu.com/manpages/noble/man8/iptables.8.html), [저장 매뉴얼](https://manpages.ubuntu.com/manpages/jammy/man8/netfilter-persistent.8.html)을 확인해 검토했으며 서버에 직접 실행하지 않았다. 실제 변경·외부 HTTP 성공·영구 저장은 결과 대기다.

## 외부 HTTP 시간 초과 — 2026-10-28

사용자 브라우저 캡처에서 공인 IP 대상 ERR_CONNECTION_TIMED_OUT를 확인했다. Caddy 로컬 200 성공은 유지한다. 외부 차단의 정확한 지점은 아직 미확인이다.

### OCI 웹 인바운드 설정

콘솔 ☰ → Networking → Virtual cloud networks → kwonyc-vcn → Subnets → public subnet-kwonyc-vcn → 해당 서브넷에 연결된 Security Lists (UI에 따라 Security 탭) → 연결된 보안 목록 → Ingress Rules → Add Ingress Rules.

기존 SSH 22번 규칙은 유지하고, 같은 웹 규칙이 없을 때 TCP 80·443을 각각 추가한다. Stateless 꺼짐, Source type CIDR, Source CIDR 0.0.0.0/0, Source port All/공란, Destination port는 첫 규칙 80·두 번째 443, 설명 HTTP/HTTPS. 80-443 범위를 열지 않는다. 공개 웹 서비스의 해당 포트만 허용한다.

저장 후 사용자 PC 브라우저에서 HTTP 공인 IP 재시도. 성공하면 완료 처리한다. 실패하면 Ubuntu SSH 터미널에서 `sudo ss -lntp`와 `sudo iptables -S INPUT`을 읽기 전용으로 확인하여 외부 바인딩·차단 규칙을 진단한다. 임의 UFW 활성화나 iptables 전체 초기화를 하지 않는다. 현재 규칙 출력 없이 OS 방화벽 변경 명령을 확정하지 않는다.

근거: [OCI Security Rules](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securityrules.htm), [Security Lists](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm). 2026-10-28 문서 확인. 실제 OCI 규칙·OS 방화벽은 아직 확인/변경하지 않았다.

## 최신 결과 — 2026-10-28

사용자 캡처에서 Ubuntu 셸로 재접속한 상태와 `systemctl is-active caddy`의 active, `curl -I http://127.0.0.1`의 HTTP/1.1 200 OK, Server: Caddy, Content-Type text/html을 확인했다. 재부팅 후 SSH timeout은 이후 접속 복구로 해결됐으며 원인을 별도로 확정하지 않는다. Caddy 설치·서비스·기본 페이지 로컬 응답은 완료다. 외부 HTTP 접속·OCI/OS 방화벽·사용자 페이지·도메인은 아직 미검증이다.

다음은 사용자 PC 브라우저 주소창에 **http://129.225.170.2**를 입력하여 Caddy 기본 페이지를 확인한다. HTTPS가 아닌 HTTP로 테스트한다. 열리면 외부 접속 완료로 기록하고 Studio KWONYC 페이지·도메인으로 진행한다. 열리지 않으면 현재 로컬 Caddy는 정상임을 유지하고 OCI 웹 인바운드 규칙과 OS 방화벽을 확인한다. SSH를 허용한 상태인지 확인하기 전 UFW를 임의 활성화하거나 iptables를 전체 초기화하지 않는다.

2026-10-28 SSH 로그인 성공 확인. Ubuntu 22.04.5 LTS, 커널 6.8.0-1060-oracle, x86_64. 배너의 루트 파일시스템은 44.96GB·사용률 5.3%, 메모리 사용률은 27%이나 총 메모리·정확한 Shape는 미확인이다.

## 서버 업데이트

로컬 PowerShell의 PS 프롬프트가 아니라 **SSH로 접속한 Ubuntu 서버 터미널**에서 실행한다. 첫 명령에 오류가 없으면 두 번째로 진행한다.

```bash
sudo apt update
sudo apt upgrade -y
```

배너의 0 updates는 오래된 목록 기준일 수 있으므로 apt update로 먼저 갱신한다. 서비스 재시작 선택 창은 기본 선택을 유지하고, 설정 파일 교체 질문이나 오류가 있으면 해당 문구를 확인한다.

### 서비스 재시작 선택 화면

사용자 캡처에서 `Daemons using outdated libraries / Which services should be restarted?` 대화상자를 확인했다. 기본 체크 상태를 유지하고 **Tab으로 <Ok>에 이동 → Enter**로 진행한다. Cancel이나 Ctrl+C로 패키지 작업을 중단하지 않는다. 비슷한 질문이 다시 나올 수 있으며 완료 후 Ubuntu 셸 프롬프트가 돌아올 때까지 기다린다. 아직 업그레이드 전체 완료는 확인되지 않았다.

완료 후 확인:

```bash
free -h
df -h /
if [ -f /var/run/reboot-required ]; then cat /var/run/reboot-required; else echo "No reboot required"; fi
```

재부팅 필요 표시가 있으면 업데이트 종료 확인 후 재부팅·SSH 재접속으로 이어간다.

## 남은 순서

## 확인 결과와 Caddy 설치 안내 — 2026-10-28

### 재부팅 후 재접속 시간 초과

사용자가 REBOOT_REQUIRED를 확인한 뒤 재접속 시 port 22 Connection timed out를 보고했다. 재부팅 완료·실행 여부는 직접 확인되지 않았다. 이후 PS 프롬프트에서 sudo apt install을 실행해 Windows Sudo 안내가 나왔다. 이는 서버 명령이 로컬 Windows에서 실행된 것이며 Windows Sudo 활성화로 해결하지 않는다. 이 설치 시도로 서버 Caddy가 설치됐다고 기록하지 않는다.

진행: 잠시 기다린 뒤 기존 SSH 명령으로 재시도 → 계속 timeout이면 Oracle 콘솔 ☰ → Compute → Instances → kwonyc-web-01에서 상태 확인. Stopped면 Start, Starting/Provisioning이면 진행 상태·Work requests 확인, Running인데 timeout이면 Networking의 실제 공인 IP를 기존 접속 대상과 비교한다. 일치하고도 지속되면 재부팅 작업·콘솔 진단과 SSH 접근 경로를 확인하며 재생성·반복 강제 재부팅을 기본 조치로 하지 않는다.

프롬프트 구분: `PS C:\...>`는 내 PC, `ubuntu@...:~$`는 서버다. Ubuntu 환영 메시지와 서버 프롬프트가 나오기 전에는 apt 명령을 실행하지 않는다. SSH가 복구된 후 Caddy 설치를 시작한다.

사용자 캡처에서 업그레이드 후 셸 프롬프트 복귀와 free/df 결과를 확인했다. 총 메모리 956Mi, 사용 226Mi, 사용 가능 564Mi, swap 0B. 루트 디스크 45G, 사용 3.5G, 여유 42G, 사용률 8%. 약 1GB VM으로 보이지만 정확한 Shape는 콘솔 확인 전 확정하지 않는다.

### 1. 재부팅 필요 확인

```bash
if [ -f /var/run/reboot-required ]; then echo REBOOT_REQUIRED; else echo NO_REBOOT_REQUIRED; fi
```

REBOOT_REQUIRED면 `sudo reboot` 후 SSH 연결이 끊기고 잠시 뒤 같은 키·사용자·공인 IP로 재접속한다. NO_REBOOT_REQUIRED면 바로 아래 설치를 진행한다.

### 2. Caddy 공식 안정 저장소로 설치

Ubuntu SSH 터미널에서 한 줄씩 실행한다. 오류면 이후 명령을 진행하지 않고 해당 오류를 확인한다.

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl gnupg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
systemctl is-active caddy
curl -I http://127.0.0.1
```

공식 설치 패키지는 caddy systemd 서비스를 자동 시작한다. 기대 결과는 active와 로컬 HTTP 200이다. 브라우저 외부 접속과 OCI/OS 방화벽은 아직 별도 검증 전이다. 서버 파일 설정을 임의 덮어쓰지 않는다. 참고: [Caddy 공식 설치](https://caddyserver.com/docs/install#debian-ubuntu-raspbian), 2026-10-28 확인.

명령은 공식 절차를 검토한 안내이며 실제 실행하지 않았다. 키링·저장소 파일은 신규 설치 전제로 작성했다. 이미 파일이 있다는 질문이면 덮어쓰기를 확정하지 말고 확인한다.

- [ ] 업데이트·총 메모리·디스크 확인
- [ ] 재부팅 필요 여부 확인, 필요하면 재접속
- [ ] SSH 접속을 유지하면서 OCI 보안 규칙·OS 방화벽 상태 확인
- [ ] Caddy 설치·임시 페이지
- [ ] 웹 포트 80·443 허용과 HTTP 접속 확인
- [ ] 도메인·DNS·HTTPS

방화벽을 켜기 전 SSH 허용 여부를 확인한다. 전체 포트를 열지 않는다. Caddy 설치는 해당 단계에서 공식 문서를 확인한다.

검증: 로그인 성공은 사용자 출력으로 확인했다. 이 문서의 명령은 안내용으로 검토했으며 실제 서버에서 실행하지 않았다. 업데이트·자원·재부팅·웹서버 검증은 사용자 결과 대기다.
