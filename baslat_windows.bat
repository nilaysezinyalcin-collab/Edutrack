@echo off
chcp 65001 > nul
title AkademiX Sunucusu
echo ==============================================================
echo 🏔️  AkademiX - KTU Ogrenci Basari ve Ders Portali
echo ==============================================================
echo.
echo Sunucu baslatiliyor...
echo Tarayicidan http://localhost:5173 adresine gidiliyor...
echo.

start http://localhost:5173

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    py server.py
    goto end
)

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    npx serve akademix -l 5173
    goto end
)

echo [HATA] Python veya Node bulunamadi!
pause

:end
