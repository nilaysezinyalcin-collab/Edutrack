#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "======================================================"
echo "🏔️ AkademiX (Gelişmiş AI & Not Panosu) Başlatılıyor..."
echo "📍 Adres: http://localhost:5173"
echo "🛑 Durdurmak için: Ctrl + C"
echo "======================================================"

python3 -m http.server 5173 --directory "$DIR"
