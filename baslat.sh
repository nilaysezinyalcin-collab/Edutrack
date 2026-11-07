#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "======================================================"
echo "🏔️  AkademiX Web Sunucusu Başlatılıyor..."
echo "📍  Adres: http://localhost:5173"
echo "🛑  Durdurmak için: Ctrl + C"
echo "======================================================"

# Tarayıcıyı 1 saniye sonra arka planda otomatik aç
(
    sleep 1
    if which xdg-open > /dev/null 2>&1; then
        xdg-open http://localhost:5173 > /dev/null 2>&1
    elif which open > /dev/null 2>&1; then
        open http://localhost:5173 > /dev/null 2>&1
    fi
) &

python3 "$DIR/server.py"
