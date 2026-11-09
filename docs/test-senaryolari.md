# Test Senaryoları ve Son Test Raporu

**Proje:** AkademiX – Etkileşimli Ders Deneyimi Panosu (Proje 1, Grup 4)
**Hazırlayan:** İsmail Korkmaz (Test / Kalite Sorumlusu)
**Test tarihi:** 9 Kasım 2026
**Test ortamı:** Chromium tabanlı tarayıcı (Chrome / Edge), Windows ve Linux; `src/index.html` dosyadan açılarak ve `server.py` ile `http://localhost:5173` üzerinden

Gereksinimlerle bağlantı için bkz. `docs/gereksinim-test-eslestirme.md`.

---

## 1. Otomatik kabul testleri (TC)

### Nasıl çalıştırılır?

1. `src/test-runner.html` dosyasını tarayıcıda açın (ya da `src/index.html?test=1` adresine gidin).
2. Testler uygulamanın **gerçek sayfası ve gerçek kodu** (`js/portal.js`, `js/a11y.js`) üzerinde otomatik çalışır, sonuç paneli açılır.
3. Testler başlamadan önce görev listesi ve localStorage yedeklenir, bitince geri yüklenir; kullanıcının verisi bozulmaz.

Test kodu: `src/js/tests.js`

> **Önceki sürümle farkı:** Eski `test-runner.html`, `index.html` tarafından hiç kullanılmayan ayrı modülleri (`app.js`, `storage.js`, `data.js`…) test ediyordu; "10/10 GEÇTİ" sonucu gerçek uygulamayı ölçmüyordu. Bu modüller kaldırıldı, testler gerçek uygulamaya taşındı.

### Sonuçlar

| ID | Gereksinim | Senaryo | Beklenen sonuç | Gerçek sonuç |
|---|---|---|---|---|
| TC-01 | FR-01 | Haftalık ders kartları ve detay penceresi | En az 4 hafta kartı; karta tıklanınca öğrenme hedefleri listelenir, pencere kapanır | GEÇTİ |
| TC-02 | FR-02, FR-06 | Görevi tamamlama | Durum `completed` olur, satır üstü çizili görünür, ilerleme yüzdesi artar | GEÇTİ |
| TC-03 | FR-08 | Görev durumu kalıcılığı | Durum localStorage'a yazılır; liste kayıttan yeniden kurulunca durum korunur | GEÇTİ |
| TC-04 | FR-03, FR-08 | Görev ekleme | Görev sayısı 1 artar ve görev kaydedilir | GEÇTİ |
| TC-05 | NFR-08 | Zararlı HTML içeren görev başlığı | Başlık düz metin gösterilir, kod çalışmaz | GEÇTİ |
| TC-06 | FR-02, FR-08 | Görev silme | Görev sayısı 1 azalır, kayıttan da silinir | GEÇTİ |
| TC-07 | FR-04 | Durum filtresi | "Tamamlanan" / "Devam Eden" seçilince yalnızca o durumdaki görevler görünür | GEÇTİ |
| TC-08 | FR-04 | Hafta filtresi | "3. Hafta" seçilince yalnızca 3. hafta görevleri görünür | GEÇTİ |
| TC-09 | FR-05 | Arama (Türkçe karakter dahil) | Eşleşmeyen aramada liste boşalır; "İHTİYAÇ LİSTESİ" araması "ihtiyaç listesi" görevini bulur | GEÇTİ ¹ |
| TC-10 | FR-05 | Boş arama sonucu mesajı | Eşleşme yoksa "görev bulunamadı" mesajı görünür, filtre temizlenince gizlenir | GEÇTİ ¹ |
| TC-11 | FR-03 | Boş görev başlığı | Görev eklenmez, alanın altında uyarı görünür | GEÇTİ ¹ |
| TC-12 | FR-06 | Hiç görev yokken ilerleme | %0 gösterilir, hata oluşmaz | GEÇTİ |
| TC-13 | FR-07 | Tema değiştirme | Tema değişir ve tercih localStorage'a kaydedilir | GEÇTİ |
| TC-14 | FR-08 | Bozuk kayıtlı veri | Uygulama çökmez, varsayılan görevlerle açılır | GEÇTİ |
| TC-15 | FR-08 | Tarayıcı kaydedemiyor (kota dolu) | Uygulama çökmez, kullanıcı uyarılır | GEÇTİ |
| TC-16 | NFR-02 | Form alanı etiketleri | Tüm form alanlarının erişilebilir adı var | GEÇTİ |
| TC-17 | NFR-03 | Klavye erişimi | Hafta ve istatistik kartları `role="button"` ve `tabindex="0"` taşır | GEÇTİ |

**Özet: 17/17 GEÇTİ**

¹ **Testlerin yakaladığı hatalar:** TC-09, ilk çalıştırmada **KALDI**. Arama, `"İ".toLowerCase()` dönüşümü nedeniyle Türkçe büyük harflerle sonuç bulamıyordu. TC-10 ve TC-11 ise ilgili özellikler (boş sonuç mesajı, başlık doğrulaması) henüz olmadığı için **ATLANDI**. Üçü de issue #6 ile düzeltildi ve tekrar çalıştırmada GEÇTİ.

---

## 2. Manuel testler (MT)

Otomatik test edilemeyen gereksinimler elle doğrulandı.

| ID | Gereksinim | Senaryo | Adımlar | Beklenen sonuç | Gerçek sonuç |
|---|---|---|---|---|---|
| MT-01 | NFR-01 | Mobil / tablet / masaüstü görünüm | Tarayıcı geliştirici araçlarında (F12 → cihaz simgesi) genişliği 320, 375, 768 ve 1280 px yap; giriş ve pano ekranlarını kaydır | Yatay kaydırma yok, metin ve butonlar okunabilir | GEÇTİ (issue #4 sonrası; önce 375 px'te sayfa 441 px'e taşıyordu) |
| MT-02 | NFR-03 | Yalnızca klavyeyle kullanım | Fare kullanmadan: Tab ile hafta kartına gel → Enter → pencere açılır → Esc → kapanır; görev kutusuna gel → Boşluk → görev tamamlanır | Tüm adımlar klavyeyle yapılabilir, odaktaki öğe çerçeveyle görünür | GEÇTİ |
| MT-03 | NFR-04 | Renk kontrastı | Aydınlık ve karanlık temada metin / arka plan kontrast oranları ölçüldü | Normal metin en az 4.5:1 (WCAG AA) | GEÇTİ (en düşük: aktif görev açıklaması 4.76:1). Tamamlanmış görev metni önce `opacity: 0.6` yüzünden sınırın altındaydı, bu testte düzeltildi |
| MT-04 | NFR-05 | Arama hızı | Arama kutusuna harf harf yaz | Liste her tuşta gecikmeden güncellenir | GEÇTİ |
| MT-05 | NFR-06 | Temiz ortamda kurulum | Repoyu yeni bir klasöre klonla, README adımlarını izle; Python yokken `baslat_windows.bat` çalıştır | Uygulama açılır | GEÇTİ (Windows, Python yüklü değil → `index.html` doğrudan açıldı; Linux'ta `server.py` ve `baslat.sh` ile 5173 portundan açıldı) |
| MT-06 | NFR-07 | Gizli bilgi taraması | Repoda `AIza…` ve `sk-…` ile başlayan anahtarlar arandı | Anahtar bulunmaz | GEÇTİ |

---

## 3. Bulunan ve giderilen hatalar

| # | Hata | Bulan test | Durum |
|---|---|---|---|
| 1 | Görev durumu, ekleme ve silme sayfa yenilenince kayboluyordu | TC-03 / TC-04 / TC-06 | Giderildi (#2) |
| 2 | Mobilde (375 px) yatay taşma | MT-01 | Giderildi (#4) |
| 3 | Form alanlarında etiket yoktu, kartlar klavyeyle açılmıyordu | TC-16 / TC-17 / MT-02 | Giderildi (#5) |
| 4 | Türkçe büyük harfle arama sonuç bulmuyordu | TC-09 | Giderildi (#6) |
| 5 | Boş arama sonucu mesajı ve boş başlık kontrolü yoktu | TC-10 / TC-11 | Giderildi (#6) |
| 6 | `server.py` ve başlatıcılar açılır açılmaz kapanıyordu; Windows'ta sahte Python kısayolu yüzünden sunucu başlamıyordu | MT-05 | Giderildi (#8) |
| 7 | Eski test koşucusu gerçek uygulamayı test etmiyordu | İnceleme | Giderildi (#3) |
| 8 | Tamamlanmış görev metninin kontrastı aydınlık temada yetersizdi | MT-03 | Giderildi (#3) |
| 9 | `escapeAiHtml` fonksiyonu iki kez tanımlanmıştı; ikinci tanım boş değer kontrolünü kaldırıyordu | Kod incelemesi | Giderildi (#3) |

**Açık kritik hata: yok.**

## 4. Bilinen sınırlamalar

- Veriler yalnızca kullanılan tarayıcıda saklanır (localStorage); başka cihaza taşınmaz, tarayıcı verisi silinirse görevler varsayılana döner.
- Giriş sistemi gerçek bir kimlik doğrulama değildir; kullanıcı bilgileri tarayıcıda tutulur (Proje 1 kapsamında sunucu/veritabanı zorunlu değildir).
- Yapay zekâ asistanının çevrimiçi modu kullanıcının kendi API anahtarını gerektirir; anahtar girilmezse yerel (çevrimdışı) yanıtlarla çalışır.
- Otomatik testler Chromium tabanlı tarayıcılarda doğrulandı; Firefox ve Safari'de elle kontrol önerilir.
