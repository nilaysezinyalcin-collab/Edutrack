#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "======================================================"
echo "🏔️ AkademiX (Gelişmiş AI & Not Panosu) Başlatılıyor..."
echo "📍 Adres: http://localhost:5173"
echo "🛑 Durdurmak için: Ctrl + C"
echo "======================================================"

# Tarayıcıyı otomatik açmayı dene (arka planda 1 sn sonra)
(
    sleep 1
    if which xdg-open > /dev/null 2>&1; then
        xdg-open http://localhost:5173 > /dev/null 2>&1
    elif which open > /dev/null 2>&1; then
        open http://localhost:5173 > /dev/null 2>&1
    fi
) &

if which python3 > /dev/null 2>&1; then
    python3 -m http.server 5173 --directory "$DIR"
elif which python > /dev/null 2>&1; then
    python -m http.server 5173 --directory "$DIR"
elif which npx > /dev/null 2>&1; then
    npx serve "$DIR" -l 5173
else
    echo "Python veya Node bulunamadı. Tek tıkla çalıştır dosyası açılıyor..."
    if which xdg-open > /dev/null 2>&1; then
        xdg-open "$DIR/AkademiX_Tek_Tikla_Calistir.html"
    elif which open > /dev/null 2>&1; then
        open "$DIR/AkademiX_Tek_Tikla_Calistir.html"
    fi
fi
