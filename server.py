#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 5173
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AKADEMIX_DIR = os.path.join(BASE_DIR, 'akademix')

if os.path.exists(AKADEMIX_DIR):
    os.chdir(AKADEMIX_DIR)
else:
    print(f"Hata: {AKADEMIX_DIR} klasörü bulunamadı!")
    sys.exit(1)

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
})

socketserver.TCPServer.allow_reuse_address = True

print("=" * 60)
print("🏔️  AkademiX Yerel Web Sunucusu Başlatıldı!")
print(f"👉  Tarayıcınızdan Açın: http://localhost:{PORT}")
print("🛑  Durdurmak için: Ctrl + C")
print("=" * 60)

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nSunucu kapatıldı.")
except OSError as e:
    if "Address already in use" in str(e):
        print(f"\n[UYARI] Port {PORT} zaten kullanımda! Tarayıcınızdan http://localhost:{PORT} adresini açabilirsiniz.")
    else:
        print(f"\nHata: {e}")
