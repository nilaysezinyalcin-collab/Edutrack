#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "🏔️ AkademiX Yerel Sunucusu Başlatılıyor..."
echo "📍 Adres: http://localhost:5173"
echo "🛑 Durdurmak için: Ctrl + C"
TARGET_DIR="$DIR/edutrack"
if [ ! -d "$TARGET_DIR" ]; then
    TARGET_DIR="$DIR/src"
fi
python3 -m http.server 5173 --directory "$TARGET_DIR"
