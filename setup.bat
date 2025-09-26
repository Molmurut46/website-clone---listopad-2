@echo off
setlocal ENABLEDELAYEDEXPANSION

echo Preparing portable legal website...
echo.

REM Ensure public/assets folders exist
if not exist "public\assets\images" mkdir "public\assets\images"
if not exist "public\assets\svgs" mkdir "public\assets\svgs"

REM 1) Ensure Node.js (portable) is available (v20 LTS)
where node >nul 2>&1
if %errorlevel% neq 0 (
  echo Node.js not found. Installing portable Node.js v20.18.0 locally...
  set "PORTABLE_DIR=.portable"
  set "NODE_VERSION=v20.18.0"
  set "NODE_DIST=node-%NODE_VERSION%-win-x64"
  set "ZIP_PATH=%PORTABLE_DIR%\%NODE_DIST%.zip"
  set "EXTRACT_DIR=%PORTABLE_DIR%\%NODE_DIST%"
  if not exist "%PORTABLE_DIR%" mkdir "%PORTABLE_DIR%"
  powershell -Command "try { Invoke-WebRequest -Uri 'https://nodejs.org/dist/%NODE_VERSION%/%NODE_DIST%.zip' -OutFile '%ZIP_PATH%' -UseBasicParsing } catch { Write-Error $_; exit 1 }"
  if %errorlevel% neq 0 (
    echo Failed to download Node.js portable. Please install Node v18+ manually from https://nodejs.org
    pause
    exit /b 1
  )
  powershell -Command "Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '%PORTABLE_DIR%' -Force"
  if %errorlevel% neq 0 (
    echo Failed to extract Node.js portable archive.
    pause
    exit /b 1
  )
  set "PATH=%CD%\%EXTRACT_DIR%;%PATH%"
  echo Portable Node.js installed to %EXTRACT_DIR%
)

REM 2) Create .env from example if needed
if not exist ".env" (
  copy .env.example .env >nul
  echo Created .env from example. Add your GIGACHAT_AUTH_KEY if you have API access.
)

REM 3) Download assets to public/assets
where powershell >nul 2>&1
if %errorlevel% neq 0 (
  echo PowerShell is required to download assets automatically. Skipping asset download.
) else (
  echo Downloading assets...
  REM Images
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/main_slide-18.jpg' -OutFile 'public/assets/images/hero-bg.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/mainpage_advocate_01-20.jpg' -OutFile 'public/assets/images/service-corporate.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/mainpage_advocate_02-21.jpg' -OutFile 'public/assets/images/service-family.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/rechtsbijstand-14.webp' -OutFile 'public/assets/images/service-insurance.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/photo_430869-12.webp' -OutFile 'public/assets/images/albert-portrait.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/d0d1e880653562f088630ddd74260827-13.webp' -OutFile 'public/assets/images/kirill-portrait.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_1-1.jpg' -OutFile 'public/assets/images/case-moscow.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_3-3.jpg' -OutFile 'public/assets/images/case-kursk.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/services_list_4-4.jpg' -OutFile 'public/assets/images/case-belgorod.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/ask-block-23.jpg' -OutFile 'public/assets/images/contact-bg.jpg' -UseBasicParsing"
  REM SVGs
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/whatsapp-2.svg' -OutFile 'public/assets/svgs/whatsapp-orange.svg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/whatsapp-y-4.svg' -OutFile 'public/assets/svgs/whatsapp-green.svg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/svgs/logo_footer-3.svg' -OutFile 'public/assets/svgs/logo.svg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9fbcac95-e251-4e02-b45a-e4b7d5d7a542-advokat-listopad-ru/assets/images/arrow_icon-19.svg' -OutFile 'public/assets/svgs/arrow.svg' -UseBasicParsing"
)

REM 4) Install dependencies
npm -v
if %errorlevel% neq 0 (
  echo npm not available. Something went wrong with portable Node setup.
  pause
  exit /b 1
)

npm install
if %errorlevel% neq 0 (
  echo Installation failed. Check node version (v18+ recommended).
  pause
  exit /b %errorlevel%
)

REM 5) Run dev server
npm run dev

pause