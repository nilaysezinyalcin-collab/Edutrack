#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 5173
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Uygulama dosyaları repo kökündeki src/ klasöründe (Issue #8)
APP_DIR = os.path.join(BASE_DIR, 'src')

if os.path.isfile(os.path.join(APP_DIR, 'index.html')):
    os.chdir(APP_DIR)
else:
    print(f"Hata: {APP_DIR} içinde index.html bulunamadı!")
    print("server.py dosyasını repo kök klasöründen çalıştırdığınızdan emin olun.")
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
    if e.errno in (48, 98, 10048) or "Address already in use" in str(e):
        print(f"\n[UYARI] Port {PORT} zaten kullanımda! Tarayıcınızdan http://localhost:{PORT} adresini açabilirsiniz.")
    else:
        print(f"\nHata: {e}")
