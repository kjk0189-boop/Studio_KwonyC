# VM 생성 후 첫 SSH 접속

> 이전 단계별 안내 보관: 아래의 현재·대기·미확인 표현은 당시 기록입니다. 최신 상태는 [프로젝트 현황](project.md)과 [체크리스트](checklist.md)를 따릅니다.

최신 결과(2026-10-28): 개인 키 권한 수정 후 Ubuntu 환영 출력으로 **SSH 로그인 성공**을 확인했다. Ubuntu 22.04.5 LTS / x86_64다. 다음은 [서버 기본 설정](step-03-server.md)이며 아래 실패·미확인 설명은 당시 기록이다.

작성일: 2026-10-28. 공식 문서를 확인했으며 실제 사용자 서버 접속은 아직 검증하지 않았다.

## 현재 확인

사용자 인스턴스 화면에서 이름 `kwonyc-web-01`, 상태 **Provisioning**, Create instance 작업 **Accepted**, 진행률 0%를 확인했다. 요청 접수는 확인됐지만 Running 성공으로 처리하지 않는다. AMD Micro 생성 안내 직후의 화면이지만 Shape와 OS는 이 캡처에 없어 실제 값을 추정하지 않는다.

## 진행 순서

1. 현재 화면에서 인스턴스 상태가 **Running**이 될 때까지 기다린다. 생성 오류가 발생하면 Work requests → Create instance → 오류 상세를 확인한다.
2. 같은 인스턴스의 **Details** 탭에서 실제 Image·Shape를 확인하고, **Networking** 탭에서 기본 VNIC/연결 정보의 **Public IPv4 address**를 확인한다. UI에 따라 Details의 Instance access 영역에 공인 IP와 Username이 표시될 수도 있다.
3. Ubuntu라면 접속 사용자 `ubuntu`, Oracle Linux라면 `opc`다. 화면의 실제 Username을 우선 따른다.
4. Windows 시작 메뉴에서 **PowerShell**을 실행한다.
5. `ssh -i "개인키의 전체 경로" ubuntu@공인IP` 형식으로 실행한다. 경로와 IP는 실제 값으로 치환하며 .pub가 아닌 개인 키를 사용한다. 예시의 ubuntu는 OS에 따라 변경한다.
6. 첫 연결 호스트 키 확인 메시지는 가능하면 인스턴스 콘솔에서 확인한 지문과 대조한 뒤 승인한다. SSH 패스프레이즈가 있다면 PC에서 입력한다. 키나 패스프레이즈를 채팅에 공유하지 않는다.
7. 서버 프롬프트가 나타나면 `whoami`와 `uname -m`으로 사용자·아키텍처를 확인한다. 성공 후 서버 업데이트·웹서버·방화벽·도메인 순서로 진행한다.

## 오류별 다음 확인

### 확인된 원인: Windows 개인 키 ACL이 너무 넓음

2026-10-28 사용자가 UNPROTECTED PRIVATE KEY FILE, permissions too open, private key ignored, bad permissions와 Permission denied(publickey)를 제공했다. 현재 실패의 직접 원인은 로컬 개인 키 권한으로 확인됐다. 이 출력으로 서버의 등록 공개 키 불일치까지 단정하지 않는다.

사용자 PC PowerShell에서 해당 **개인 키 파일 하나만** 현재 사용자 SID의 Read 허용으로 새 ACL을 적용한다. FileSecurity 새 객체, 현재 사용자 소유자, 상속 차단, 현재 사용자 읽기 규칙을 사용하며 폴더·다른 파일 권한은 변경하지 않는다. Set-Acl이 실패하면 오류를 확인하고 접속 성공으로 처리하지 않는다. ACL 수정 후 기존 SSH 명령을 재실행한다. 그래도 publickey 오류면 사용자 이름·키 대응 관계를 다음에 확인한다.

안내할 PowerShell 형식(키 경로는 실제 경로로 치환):

```powershell
$keyPath = '개인키의 실제 전체 경로'
$mySid = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
$keyAcl = [System.Security.AccessControl.FileSecurity]::new()
$keyAcl.SetOwner($mySid)
$keyAcl.SetAccessRuleProtection($true, $false)
$keyAcl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new($mySid, 'Read', 'Allow'))
Set-Acl -LiteralPath $keyPath -AclObject $keyAcl
```

본 작업에서 실제 키 파일을 읽거나 ACL 변경 명령을 실행하지 않았다. 경로는 워크스페이스 밖이며 사용자가 자기 PC에서 실행하는 절차로 제공했다. 명령을 재검토했으며 파일 한 개에만 적용되도록 LiteralPath를 사용했다. 실제 ACL 적용·SSH 로그인은 사용자 결과 대기다.

### 호스트 등록 후 Connection closed

2026-10-28 사용자 출력에서 호스트 신뢰 등록 뒤 `Connection closed by ... port 22`가 발생했다. TCP/SSH 초기 응답은 있었으나 로그인은 실패했다. 출력만으로 잘못된 키·사용자·서버 부팅 중·sshd 설정 등 구체 원인을 확정하지 않는다.

다음은 인스턴스 Running 확인 후 실제 키 경로를 한 겹 따옴표로 지정하고 `ssh -o IdentitiesOnly=yes -i "실제키경로" ubuntu@공인IP`로 재시도한다. 동일하면 `ssh -vv -o IdentitiesOnly=yes -i "실제키경로" ubuntu@공인IP`의 마지막 약 30줄에서 키 파일 인식·제공 여부, 지원 인증 방식, 종료 시점을 확인한다. 디버그 출력에 로컬 경로·주소·식별자가 들어갈 수 있어 가려 공유하며 개인 키 내용은 보내지 않는다. OS가 Oracle Linux면 opc를 사용하고, 실제 OS는 아직 현재 캡처로 확인하지 못했다.

### 실제 키 경로 입력 후 호스트 확인 질문 도착

사용자가 실제 .key 경로를 넣어 재실행했고 Identity file 경고 없이 최초 호스트 확인 프롬프트를 받았다. 아직 공개 키 인증·접속 성공을 확인한 것은 아니다. 인스턴스 공인 IP가 대상과 일치하는지 확인하고 가능하면 호스트 지문을 신뢰 가능한 콘솔 경로로 대조한 뒤 yes로 승인한다. 지문이 불일치하면 승인하지 않는다.

사용자 명령의 경로 양쪽 따옴표가 두 겹으로 보인다. 재실행 시 `ssh -i "실제개인키경로" ubuntu@공인IP`처럼 한 겹만 쓴다. 개인 키 경로·지문 전문은 기록하지 않는다. 다음 결과가 로그인 프롬프트인지 publickey 오류인지에 따라 진행한다.

### 첫 실행에서 예시 문구가 그대로 입력된 경우

쉬운 입력 방법: 현재 PowerShell에서 Ctrl+C → Win+E → 다운로드 → .pub가 아닌 개인 키 파일 우클릭 → 경로로 복사 → PowerShell에 `ssh -i ` 입력 → Ctrl+V → 끝에 공백과 `ubuntu@129.225.170.2` 입력 → Enter. 이 IP는 사용자가 이번 접속 명령에 사용한 값이며 콘솔과 일치 여부는 별도 확인한다. 경로 복사 결과의 따옴표는 유지한다. 키 파일 내용은 열거나 공유하지 않는다.

2026-10-28 사용자는 `-i "개인키 파일의 전체 경로"`를 그대로 실행해 Identity file not accessible 경고를 받았다. 이어 호스트 키 확인 프롬프트까지 도달해 대상 SSH 서비스 응답은 확인되지만 사용자 인증 성공을 뜻하지 않는다.

1. 현재 확인 프롬프트는 Ctrl+C로 취소한다.
2. Windows 파일 탐색기 → 다운로드에서 생성 때 저장한 개인 키를 찾는다. `.pub`가 아닌 대응 개인 키 파일이다. 키 파일을 편집기로 열어 내용을 공유하지 않는다.
3. 해당 파일에서 우클릭 → 경로로 복사(Windows 버전에 따라 Shift+우클릭)로 실제 전체 경로를 복사한다.
4. PowerShell에 `ssh -i `를 입력하고 복사한 따옴표 포함 경로를 붙인 다음 공백과 `ubuntu@서버공인IP`를 이어 실행한다. 실제 OS가 Oracle Linux면 opc로 바꾼다.
5. 예시 이름을 그대로 복사하지 않도록 실제 경로를 조합한다. 개인 키와 공개 키를 혼동하지 않는다.

사용자 제공 호스트 지문은 최초 관측값일 뿐 신뢰 검증이 완료된 것은 아니다. 인스턴스 공인 IP와 가능하면 콘솔 경로의 호스트 키 지문을 대조한 뒤 첫 연결을 승인한다. 실제 개인 키 경로와 OS·인증 성공은 아직 미확인이다. IP·지문 전문은 여기 보관하지 않는다.

- Connection timed out: Running·공인 IP·인터넷 라우트·OCI SSH 22번 접근 규칙·OS 방화벽 확인. 모든 포트를 공개하지 않는다.
- Permission denied (publickey): OS 사용자 이름과 해당 VM 공개 키에 대응하는 개인 키 확인.
- UNPROTECTED PRIVATE KEY FILE / bad permissions: Windows 개인 키 파일 ACL을 사용자 전용으로 제한하는 별도 조치 필요. 실제 파일 경로·오류를 확인한 뒤 안내한다.
- No such file: 개인 키의 실제 경로와 따옴표 확인.

현재 키 경로·공인 IP·OS·Shape·서버 지문은 미확인이다. 명령은 형식 안내이며 실행하지 않았다.

공식 자료: [Linux 인스턴스 SSH 접속](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/connect-to-linux-instance.htm).
