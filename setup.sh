#!/bin/bash
set -euo pipefail

echo "Preparing portable legal website..."
echo

# --- Helpers ---
need_cmd() { command -v "$1" >/dev/null 2>&1; }

download() {
  # download <url> <out>
  local url="$1" out="$2"
  if need_cmd curl; then
    curl -Lf --retry 3 --connect-timeout 10 -o "$out" "$url"
  elif need_cmd wget; then
    wget -q -O "$out" "$url"
  else
    echo "Neither curl nor wget found. Please install one of them to auto-download." >&2
    return 1
  fi
}

extract_tarxz() {
  # extract_tarxz <archive> <dest>
  local archive="$1" dest="$2"
  mkdir -p "$dest"
  tar -xJf "$archive" -C "$dest"
}

# --- 1) Ensure public/assets folders exist ---
mkdir -p public/assets/images public/assets/svgs

# --- 2) Ensure Node.js (portable) is available (v20 LTS) ---
if ! need_cmd node; then
  echo "Node.js not found. Installing portable Node.js v20.18.0 locally..."
  PORTABLE_DIR=".portable"
  NODE_VERSION="v20.18.0"
  OS="$(uname -s)"
  ARCH_RAW="$(uname -m)"
  case "$ARCH_RAW" in
    x86_64|amd64) ARCH="x64";;
    arm64|aarch64) ARCH="arm64";;
    *) echo "Unsupported architecture: $ARCH_RAW" >&2; exit 1;;
  esac

  case "$OS" in
    Darwin)
      DIST="node-${NODE_VERSION}-darwin-${ARCH}"
      ARCHIVE_NAME="${DIST}.tar.xz"
      URL="https://nodejs.org/dist/${NODE_VERSION}/${ARCHIVE_NAME}"
      ;;
    Linux)
      DIST="node-${NODE_VERSION}-linux-${ARCH}"
      ARCHIVE_NAME="${DIST}.tar.xz"
      URL="https://nodejs.org/dist/${NODE_VERSION}/${ARCHIVE_NAME}"
      ;;
    *)
      echo "Unsupported OS: $OS" >&2; exit 1;
      ;;
  esac

  mkdir -p "$PORTABLE_DIR"
  ARCHIVE_PATH="$PORTABLE_DIR/$ARCHIVE_NAME"

  echo "Downloading $URL ..."
  if ! download "$URL" "$ARCHIVE_PATH"; then
    echo "Failed to download Node.js portable. Please install Node v18+ manually from https://nodejs.org" >&2
    exit 1
  fi

  echo "Extracting $ARCHIVE_NAME ..."
  extract_tarxz "$ARCHIVE_PATH" "$PORTABLE_DIR"

  # Prepend portable node to PATH
  case "$OS" in
    Darwin|Linux)
      export PATH="$(pwd)/$PORTABLE_DIR/$DIST/bin:$PATH"
      ;;
  esac

  echo "Portable Node.js installed to $PORTABLE_DIR/$DIST"
fi

# Confirm npm is available
if ! need_cmd npm; then
  echo "npm not available. Something went wrong with portable Node setup." >&2
  exit 1
fi

# --- 3) Create .env from example if needed ---
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env from example. Add your GIGACHAT_AUTH_KEY if you have API access."
fi

# --- 4) Prepare local assets (placeholders) without external brand references ---
echo "Preparing local placeholder assets..."
prepare_ok=true
if need_cmd curl || need_cmd wget; then
  download "https://via.placeholder.com/1200x700.jpg?text=Hero" "public/assets/images/hero-bg.jpg" || prepare_ok=false
  download "https://via.placeholder.com/380x253.jpg?text=Service+1" "public/assets/images/service-corporate.jpg" || prepare_ok=false
  download "https://via.placeholder.com/380x253.jpg?text=Service+2" "public/assets/images/service-family.jpg" || prepare_ok=false
  download "https://via.placeholder.com/380x253.jpg?text=Service" "public/assets/images/service-insurance.jpg" || prepare_ok=false
  download "https://via.placeholder.com/380x480.jpg?text=Ivanov" "public/assets/images/albert-portrait.jpg" || prepare_ok=false
  download "https://via.placeholder.com/380x480.jpg?text=Ivanov" "public/assets/images/kirill-portrait.jpg" || prepare_ok=false
  download "https://via.placeholder.com/900x600.jpg?text=Case+1" "public/assets/images/case-moscow.jpg" || prepare_ok=false
  download "https://via.placeholder.com/900x600.jpg?text=Case+2" "public/assets/images/case-kursk.jpg" || prepare_ok=false
  download "https://via.placeholder.com/900x600.jpg?text=Case+3" "public/assets/images/case-belgorod.jpg" || prepare_ok=false
  download "https://via.placeholder.com/1200x800.jpg?text=Contact" "public/assets/images/contact-bg.jpg" || prepare_ok=false
else
  echo "Neither curl nor wget found. Skipping image downloads."
  prepare_ok=false
fi

# Create simple SVGs locally
cat > public/assets/svgs/whatsapp-orange.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <circle cx="12" cy="12" r="10" fill="#D4A574" />
  <path d="M16.5 13.5c-.5 1.2-1.6 2.3-2.8 2.8-2.5 1.1-5.4-.2-6.5-2.7-.2-.5 0-1.1.5-1.3l1.8-.8c.5-.2 1.1 0 1.3.5.3.6.7 1.1 1.3 1.5.5.4 1.2.6 1.8.6.5 0 .9.4.9.9v1.4z" fill="#fff"/>
</svg>
SVG

cat > public/assets/svgs/logo.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <rect width="80" height="80" rx="8" fill="#1E6B52"/>
  <text x="40" y="48" font-size="12" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">ADVOKAT IVANOV</text>
</svg>
SVG

cat > public/assets/svgs/arrow.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="#D4A574"/>
</svg>
SVG

if [ "$prepare_ok" = false ]; then
  echo "Asset placeholders prepared (SVGs). Some images may be missing if curl/wget was unavailable."
fi

# --- 5) Install dependencies ---
node -v
npm -v

npm install

# --- 6) Run dev server ---
npm run dev