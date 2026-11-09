@echo off
chcp 65001 > nul
title AkademiX Yerel Sunucusu
rem Uygulama dosyalari src klasorunde (Issue #8)
cd /d "%~dp0src"

echo ==============================================================
echo  AkademiX - Etkilesimli Ders Deneyimi Panosu
echo ==============================================================
echo.
echo Sunucu baslatiliyor...
echo Adres: http://localhost:5173
echo Durdurmak icin bu pencerede Ctrl + C
echo.

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python ^(py^) bulundu, port 5173 uzerinde calistiriliyor...
    start "" http://localhost:5173
    py -m http.server 5173
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python bulundu, port 5173 uzerinde calistiriliyor...
    start "" http://localhost:5173
    python -m http.server 5173
    goto end
)

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js npx bulundu, sunucu calistiriliyor...
    start "" http://localhost:5173
    npx serve . -l 5173
    goto end
)

echo [BILGI] Python veya Node bulunamadi.
echo Uygulama kurulumsuz olarak varsayilan tarayicinizda aciliyor...
start "" index.html

:end
pause
