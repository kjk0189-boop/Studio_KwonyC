param(
    [Parameter(Mandatory = $true)][string]$PrivateKey,
    [string]$Server = 'ubuntu@129.225.170.2'
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$keyFile = (Resolve-Path -LiteralPath $PrivateKey).Path
$siteRoot = Join-Path $projectRoot 'site'
$outputRoot = Join-Path $projectRoot 'tmp/deploy'
New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null

& node (Join-Path $PSScriptRoot 'check-site.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Site checks failed' }
$siteChanges = & git -C $projectRoot status --porcelain -- site
if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect site Git status' }
if ($siteChanges) { throw 'Commit site changes before deployment so the release matches its Git revision' }
& git -C $projectRoot rev-parse --short HEAD | Tee-Object -Variable revision | Out-Null
if ($LASTEXITCODE -ne 0 -or $revision -notmatch '^[a-f0-9]+$') { throw 'Cannot identify Git revision' }
$releaseId = [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ') + '-' + $revision
$archivePath = Join-Path $outputRoot ($releaseId + '.tar.gz')
& tar -czf $archivePath -C $siteRoot .
if ($LASTEXITCODE -ne 0) { throw 'Could not package site' }
$archiveHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
$sshOptions = @('-o', 'BatchMode=yes', '-o', 'IdentitiesOnly=yes', '-o', 'ConnectTimeout=15', '-i', $keyFile)

& ssh @sshOptions $Server 'mkdir -p /home/ubuntu/.studio-kwonyc-deploy && chmod 700 /home/ubuntu/.studio-kwonyc-deploy'
if ($LASTEXITCODE -ne 0) { throw 'SSH staging preparation failed' }
& scp @sshOptions $archivePath "${Server}:/home/ubuntu/.studio-kwonyc-deploy/$releaseId.tar.gz"
if ($LASTEXITCODE -ne 0) { throw 'Site upload failed' }
# Force LF, even when Git on Windows checked this shell script out as CRLF.
$activationPath = Join-Path $outputRoot ($releaseId + '.sh')
$activationText = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'activate-release.sh')) -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($activationPath, $activationText, [System.Text.UTF8Encoding]::new($false))
& scp @sshOptions $activationPath "${Server}:/home/ubuntu/.studio-kwonyc-deploy/$releaseId.sh"
if ($LASTEXITCODE -ne 0) { throw 'Activation script upload failed' }
& ssh @sshOptions $Server "sudo -n /bin/sh /home/ubuntu/.studio-kwonyc-deploy/$releaseId.sh $releaseId $archiveHash"
if ($LASTEXITCODE -ne 0) { throw 'Remote deployment failed; inspect rollback output' }

$receipt = [ordered]@{
    release = $releaseId
    revision = $revision
    archiveSha256 = $archiveHash
    url = 'https://studiokwonyc.com/'
    serverActivation = 'passed'
    publicVerification = 'pending separate check'
}
$receipt | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputRoot 'latest.json') -Encoding utf8
Write-Output 'Server activation passed. Verify https://studiokwonyc.com/ from an external connection.'
