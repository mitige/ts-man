# install ts-man from the latest github release, for windows.
# usage: irm https://raw.githubusercontent.com/mitige/ts-man/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

$repo = "mitige/ts-man"
$dest = if ($env:TS_MAN_DIR) { $env:TS_MAN_DIR } else { Join-Path $env:LOCALAPPDATA "ts-man" }

$arch = $env:PROCESSOR_ARCHITECTURE
if ($arch -ne "AMD64") {
  Write-Host "architecture non prise en charge : $arch"
  exit 1
}

$url = "https://github.com/$repo/releases/latest/download/ts-man-windows-x64.exe"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$exe = Join-Path $dest "ts-man.exe"
Write-Host "téléchargement de ts-man (windows-x64)..."
Invoke-WebRequest -Uri $url -OutFile $exe -UseBasicParsing

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if (($userPath -split ";") -notcontains $dest) {
  [Environment]::SetEnvironmentVariable("Path", "$userPath;$dest", "User")
  Write-Host "$dest ajouté au PATH de l'utilisateur (rouvre le terminal)."
}

Write-Host "ts-man installé dans $exe"
Write-Host "essaie : ts-man list"
