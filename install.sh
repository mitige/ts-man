#!/bin/sh
# install ts-man from the latest github release, for linux and macos.
# usage: curl -fsSL https://raw.githubusercontent.com/mitige/ts-man/main/install.sh | sh
set -eu

repo="mitige/ts-man"
dest="${TS_MAN_DIR:-$HOME/.local/bin}"

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"
case "$arch" in
  x86_64|amd64) arch="x64" ;;
  arm64|aarch64) arch="arm64" ;;
  *) echo "architecture non prise en charge : $arch"; exit 1 ;;
esac

case "$os" in
  linux)
    base="linux-$arch"
    # alpine and other musl distros cannot run the glibc build
    if ldd --version 2>&1 | grep -qi musl; then base="$base-musl"; fi
    ;;
  darwin) base="macos-$arch" ;;
  *) echo "système non pris en charge : $os (sous windows, utiliser install.ps1)"; exit 1 ;;
esac

url="https://github.com/$repo/releases/latest/download/ts-man-$base"
mkdir -p "$dest"
echo "téléchargement de ts-man ($base)..."
curl -fsSL "$url" -o "$dest/ts-man"
chmod +x "$dest/ts-man"

echo "ts-man installé dans $dest/ts-man"
case ":$PATH:" in
  *":$dest:"*) ;;
  *) echo "ajoute $dest à ton PATH pour lancer ts-man depuis partout." ;;
esac
echo "essaie : ts-man list"
