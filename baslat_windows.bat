@echo off
chcp 65001 > nul
title AkademiX Yerel Sunucusu
rem Uygulama dosyalari src klasorunde (Issue #8)
cd /d "%~dp0src"

echo ==============================================================
echo  AkademiX - Etkilesimli Ders Deneyimi Panosu
echo ==============================================================
echo.

rem "where" yerine komutu gercekten calistirarak kontrol ediyoruz.
rem Windows'un Microsoft Store'a yonlendiren sahte python kisayolu
rem "where" ile bulunur ama calismaz; --version bu durumda hata verir.

py --version >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "PYCMD=py"
    goto run_python
)

python --version >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "PYCMD=python"
    goto run_python
)

npx --version >nul 2>nul
if %ERRORLEVEL% EQU 0 goto run_node

goto open_file

:run_python
echo Python bulundu. Sunucu baslatiliyor: http://localhost:5173
echo Durdurmak icin bu pencereyi kapatin veya Ctrl + C basin.
echo.
rem Sunucu hazir olsun diye tarayiciyi 2 saniye sonra ac
start "" /min cmd /c "ping -n 3 127.0.0.1 >nul && start http://localhost:5173"
%PYCMD% -m http.server 5173
goto end

:run_node
echo Node.js bulundu. Sunucu baslatiliyor: http://localhost:5173
echo.
start "" /min cmd /c "ping -n 6 127.0.0.1 >nul && start http://localhost:5173"
npx --yes serve . -l 5173
goto end

:open_file
echo [BILGI] Python veya Node.js bulunamadi.
echo Sunucu gerekmez: uygulama dogrudan tarayicinizda aciliyor...
start "" "%~dp0src\index.html"
echo.
echo Tarayici acilmadiysa su dosyaya cift tiklayin:
echo   %~dp0src\index.html
echo.

:end
pause
