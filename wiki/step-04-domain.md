# 도메인·DNS·HTTPS

최신 결과(2026-10-28): 사용자가 https://studiokwonyc.com과 https://www.studiokwonyc.com이 모두 잘 열린다고 보고했다. DNS 및 양쪽 HTTPS 페이지 표시를 완료 처리한다. 인증서 상세·리디렉션 동작의 개별 검사 출력은 아직 없으므로 별도 검증 범위로 남긴다. 다음은 Caddy 기본 페이지 대신 실제 브랜드 사이트·게임 배포다.

2026-10-28 사용자 신청 내역에서 **studiokwonyc.com 1년 등록 신청·결제 성공**을 확인했다. 주문·승인번호와 결제 상세는 기록하지 않는다. 최종 등록 상태·등록자 이메일 인증은 서비스 목록·메일에서 확인한다.

## 가비아 DNS 연결

이전 문제: 구매 직후 도메인 미표시를 보고했다. 이후 DNS 조회와 양쪽 HTTPS 표시가 성공해 현재 접근 문제는 해결됐다. 등록자 이메일 인증 상태는 별도 확인한다.

문제 재발 시 My가비아 → 서비스 관리 → 도메인에서 등록 상태·필터 확인 후 DNS 관리툴로 이동한다. 브라우저 접근 문제는 DNS·Caddy·네트워크를 구분해 확인한다. 같은 이름을 다시 구매하지 않는다.

가비아 로그인 → My가비아 → 서비스 관리 → DNS 관리툴 → studiokwonyc.com 선택 → DNS 설정 → 레코드 추가.

| 타입 | 호스트 | 값 |
|---|---|---|
| A | @ | 129.225.170.2 |
| CNAME | www | studiokwonyc.com. |

TTL은 기본값 유지. CNAME 마지막 점 포함. 기존 @·www가 있으면 해당 값을 수정하여 중복 충돌을 피하고 다른 MX·TXT는 변경하지 않는다. 각 행 확인 후 화면 아래 저장까지 누른다. 네임서버는 가비아 유지.

현재 IP는 사용자 SSH·외부 HTTP 접속 주소다. 예약 IP 여부는 미확인이다. 현재 IP로 연결할 수 있으나 향후 VM 재생성·IP 해제로 주소가 바뀌면 A 레코드도 수정해야 한다. 예약 IP 전환 시 새 주소와 DNS·SSH 기록을 함께 갱신한다.

## DNS 확인

### 실행 위치 구분

이전에는 Ubuntu에 Resolve-DnsName을 실행해 command not found가 발생했다. 이 명령은 Windows PowerShell용이며 DNS 실패가 아니다. 이후 새 로컬 PowerShell에서 조회에 성공했다. 재확인 시 SSH 창은 유지하고 Win+R → powershell → Enter로 새 로컬 창을 연다.

내 PC PowerShell에서 실행:

```powershell
Resolve-DnsName studiokwonyc.com -Type A
Resolve-DnsName www.studiokwonyc.com -Type A
```

최종 A 응답이 현재 서버 IP인지 확인한다. 설정 직후 캐시·반영 지연 가능. 계속 다르면 레코드·실제 위임 네임서버를 확인한다. 등록자 확인 메일이 있으면 사용자 직접 인증한다.

## 이후 HTTPS

### DNS 실조회 성공 — 2026-10-28

사용자 Windows PowerShell 출력에서 studiokwonyc.com A → 129.225.170.2 (TTL1800), www CNAME → studiokwonyc.com (TTL600), 최종 A → 동일 서버 IP를 확인했다. DNS 입력·저장과 해당 사용자 조회 경로에서의 반영을 완료 처리한다. 전 세계 모든 리졸버 전파 완료를 뜻하지 않는다.

### Caddy 적용 절차

**Ubuntu SSH 터미널**에서 실행한다. 현재는 기본 Caddy 페이지 사용 상태로 확인됐으며 사용자 정의 사이트 구현은 아직 없다. 다음 설정은 루트 도메인에서 기존 기본 페이지를 제공하고 www는 루트 HTTPS로 리디렉션한다.

```bash
sudo cp -n /etc/caddy/Caddyfile /etc/caddy/Caddyfile.before-domain
sudo tee /etc/caddy/Caddyfile > /dev/null <<'EOF'
studiokwonyc.com {
    root * /usr/share/caddy
    file_server
}

www.studiokwonyc.com {
    redir https://studiokwonyc.com{uri} permanent
}
EOF
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
```

cp 명령이 오류면 설정 쓰기를 진행하지 않는다. 기존 백업이 있으면 cp -n은 덮어쓰지 않는다. validate의 성공 메시지를 확인한 뒤 다음을 실행한다.

```bash
sudo systemctl reload caddy
```

브라우저에서 https://studiokwonyc.com과 https://www.studiokwonyc.com을 확인한다. 기본 Caddy 페이지가 열리고 인증서 경고가 없으며 www가 루트 주소로 이동해야 한다. 최초 인증서 발급이 지연될 수 있어 실패 시 Ubuntu에서 `sudo journalctl -u caddy -n 50 --no-pager`로 실제 오류를 확인한다. IPv4 인바운드80·443은 이전에 허용·저장했으나 OCI 규칙 전체는 직접 확인하지 않았다.

공식 근거: [자동 HTTPS](https://caddyserver.com/docs/automatic-https), [redir](https://caddyserver.com/docs/caddyfile/directives/redir). 2026-10-28 확인. 안내 후 사용자가 두 HTTPS 주소 표시 성공을 보고했다. 서버 직접 접속 검증·인증서 상세·개별 리디렉션 결과는 별도 미확인이다.

적용 안내 순서는 백업 → 도메인 블록 → validate → reload → 양쪽 HTTPS 확인이었다. 현재 양쪽 페이지 표시는 사용자 성공 보고로 완료다.

- [x] 등록 신청·결제 성공 확인
- [ ] 서비스 등록 상태·등록자 이메일 확인
- [x] A·CNAME 저장 — 실제 DNS 조회로 확인
- [x] DNS 조회 확인
- [x] Caddy 도메인 설정·양쪽 HTTPS 표시 — 사용자 성공 보고

공식 자료: [가비아 DNS 설정](https://customer.gabia.com/manual/domain/287/1201). DNS는 사용자 조회 출력, HTTPS 표시는 사용자 보고로 확인했다. 모든 리졸버·인증서 상세를 직접 검사한 것은 아니다.
