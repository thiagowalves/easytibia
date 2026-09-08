# Abre o Chrome com depuração remota num perfil dedicado e roda o raspador.
#
# Uso:
#   powershell -File scripts/wikigrab.ps1 -OutDir "caminho/saida" -Urls "https://...","https://..."

param(
  [Parameter(Mandatory = $true)] [string]   $OutDir,
  [Parameter(Mandatory = $true)] [string[]] $Urls,
  [int] $Port = 9260
)

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { throw "Chrome não encontrado em $chrome" }

$profile = Join-Path $env:TEMP "claude-chrome-wikigrab"
$proc = Start-Process $chrome -PassThru -ArgumentList `
  '--new-window', '--disable-gpu', '--window-size=1300,900', `
  "--remote-debugging-port=$Port", "--user-data-dir=$profile", 'about:blank'

Start-Sleep -Seconds 3
$env:CDP_PORT = "$Port"
try {
  node (Join-Path $PSScriptRoot "wikigrab.mjs") $OutDir @Urls
}
finally {
  if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
}
