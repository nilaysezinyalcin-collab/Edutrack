@echo off
chcp 65001 > nul
title AkademiX Yerel Sunucusu
echo ==============================================================
echo 🏔️  AkademiX - KTU Ogrenci Basari ve Ders Portali
echo ==============================================================
echo.
echo Sunucu baslatiliyor...
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python bulundu, port 5173 uzerinde calistiriliyor...
    start http://localhost:5173
    python -m http.server 5173
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python (py) bulundu, port 5173 uzerinde calistiriliyor...
    start http://localhost:5173
    py -m http.server 5173
    goto end
)

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js npx bulundu, sunucu calistiriliyor...
    start http://localhost:5173
    npx serve . -l 5173
    goto end
)

echo [BILGI] Python veya Node bulunamadi.
echo Site kurulumsuz olarak varsayilan tarayicinizda aciliyor...
start AkademiX_Tek_Tikla_Calistir.html

:end
pause
