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

# --- 4) Download assets to public/assets ---
echo "Downloading assets..."
ASSETS=(
  # images
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/main_slide-18.jpg|public/assets/images/hero-bg.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/mainpage_advocate_01-20.jpg|public/assets/images/service-corporate.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/mainpage_advocate_02-21.jpg|public/assets/images/service-family.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/rechtsbijstand-14.webp|public/assets/images/service-insurance.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/photo_430869-12.webp|public/assets/images/albert-portrait.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/d0d1e880653562f088630ddd74260827-13.webp|public/assets/images/kirill-portrait.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_1-1.jpg|public/assets/images/case-moscow.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_3-3.jpg|public/assets/images/case-kursk.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_4-4.jpg|public/assets/images/case-belgorod.jpg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/ask-block-23.jpg|public/assets/images/contact-bg.jpg"
  # svgs
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/whatsapp-2.svg|public/assets/svgs/whatsapp-orange.svg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/whatsapp-y-4.svg|public/assets/svgs/whatsapp-green.svg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/logo_footer-3.svg|public/assets/svgs/logo.svg"
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/arrow_icon-19.svg|public/assets/svgs/arrow.svg"
)

for item in "${ASSETS[@]}"; do
  IFS='|' read -r url out <<<"$item"
  if [ ! -f "$out" ]; then
    echo " - $(basename "$out")"
    if ! download "$url" "$out"; then
      echo "   Skipped (download failed): $url" >&2
    fi
  fi
done

# --- 5) Install dependencies ---
node -v
npm -v

npm install

# --- 6) Run dev server ---
npm run dev