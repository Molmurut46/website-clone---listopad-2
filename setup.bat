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

REM 3) Prepare local assets (placeholders) without external brand references
where powershell >nul 2>&1
if %errorlevel% neq 0 (
  echo PowerShell is required to prepare assets automatically. Skipping asset generation.
) else (
  echo Generating placeholder images...
  REM Use neutral placeholders (no external brand names in URLs)
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/1200x700.jpg?text=Hero' -OutFile 'public/assets/images/hero-bg.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/380x253.jpg?text=Service+1' -OutFile 'public/assets/images/service-corporate.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/380x253.jpg?text=Service+2' -OutFile 'public/assets/images/service-family.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/380x253.jpg?text=Service' -OutFile 'public/assets/images/service-insurance.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/380x480.jpg?text=Ivanov' -OutFile 'public/assets/images/albert-portrait.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/380x480.jpg?text=Ivanov' -OutFile 'public/assets/images/kirill-portrait.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/900x600.jpg?text=Case+1' -OutFile 'public/assets/images/case-moscow.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/900x600.jpg?text=Case+2' -OutFile 'public/assets/images/case-kursk.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/900x600.jpg?text=Case+3' -OutFile 'public/assets/images/case-belgorod.jpg' -UseBasicParsing"
  powershell -Command "Invoke-WebRequest -Uri 'https://via.placeholder.com/1200x800.jpg?text=Contact' -OutFile 'public/assets/images/contact-bg.jpg' -UseBasicParsing"

  echo Creating simple SVG icons...
  powershell -Command "$svg='^<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"^><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"#D4A574\" /^><path d=\"M16.5 13.5c-.5 1.2-1.6 2.3-2.8 2.8-2.5 1.1-5.4-.2-6.5-2.7-.2-.5 0-1.1.5-1.3l1.8-.8c.5-.2 1.1 0 1.3.5.3.6.7 1.1 1.3 1.5.5.4 1.2.6 1.8.6.5 0 .9.4.9.9v1.4z\" fill=\"#fff\"/^>^</svg^>'; Set-Content -Path 'public/assets/svgs/whatsapp-orange.svg' -Value $svg -Encoding Ascii"
  powershell -Command "$svg='^<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 80 80\"^><rect width=\"80\" height=\"80\" rx=\"8\" fill=\"#1E6B52\"/^><text x=\"40\" y=\"48\" font-size=\"16\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial, sans-serif\"^>ADVOKAT IVANOV^</text^>^</svg^>'; Set-Content -Path 'public/assets/svgs/logo.svg' -Value $svg -Encoding Ascii"
  powershell -Command "$svg='^<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"^><path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z\" fill=\"#D4A574\"/^>^</svg^>'; Set-Content -Path 'public/assets/svgs/arrow.svg' -Value $svg -Encoding Ascii"
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