#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"

TARGET="akademix"
if [ "$1" == "edutrack" ]; then
    TARGET="edutrack"
fi

echo "======================================================"
if [ "$TARGET" == "akademix" ]; then
    echo "🏔️ AkademiX (Gelişmiş AI & Not Panosu) Başlatılıyor..."
    echo "📍 Adres: http://localhost:5173"
    echo "💡 EduTrack'i açmak isterseniz: ./baslat.sh edutrack"
else
    echo "📚 EduTrack (Temel Sürüm) Başlatılıyor..."
    echo "📍 Adres: http://localhost:5173"
    echo "💡 AkademiX'i açmak isterseniz: ./baslat.sh"
fi
echo "🛑 Durdurmak için: Ctrl + C"
echo "======================================================"

python3 -m http.server 5173 --directory "$DIR/$TARGET"
