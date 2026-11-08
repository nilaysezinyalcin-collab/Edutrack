# Gereksinim – Test Eşleştirme Tablosu

**Proje:** AkademiX – Etkileşimli Ders Deneyimi Panosu (Proje 1, Grup 4)
**Hazırlayan:** Oğuzhan İnce (Analist + Geliştirici)
**Kaynak:** *Proje 1 Teknik Proje Dokümanı* (bölüm 4, 8 ve 12)

Bu tablo, ders tarafından istenen her zorunlu gereksinimin uygulamada **hangi özellikle** karşılandığını ve **hangi test senaryosuyla** doğrulandığını gösterir. Test adımlarının ayrıntısı ve sonuçları `docs/test-senaryolari.md` dosyasındadır.

## 1. İşlevsel gereksinimler

| Gereksinim (Teknik Doküman) | Kod | AkademiX'te karşılayan özellik | Test ID | Doğrulama adımı | İlgili issue |
|---|---|---|---|---|---|
| Haftalık ders/öğrenme kartları gösterilmeli | FR-01 | Panodaki 4 hafta kartı; karta tıklayınca hedefler ve görevler penceresi | TC-01 | Giriş yap → 4 hafta kartı görünür → karta tıkla → öğrenme hedefleri listelenir | – |
| Görevler listelenmeli, durumları değiştirilebilmeli | FR-02 | "Görev ve Mini Etkinlikler" listesi, onay kutusu ile Tamamlandı / Devam Ediyor | TC-02 | Bir görevin kutusunu işaretle → üstü çizilir, sayaçlar güncellenir | – |
| Görev eklenebilmeli, geçersiz giriş yönetilmeli | FR-03 | "+ Görev Ekle" penceresi | TC-03 | Başlığı boş bırakıp kaydet → görev eklenmez, uyarı görünür | #6 |
| Durum veya hafta bilgisine göre filtreleme | FR-04 | Tümü / Devam Eden / Tamamlanan / Yüksek Öncelik butonları + hafta seçici | TC-04 | "Devam Eden" seç → yalnızca tamamlanmamış görevler kalır; "3. Hafta" seç → yalnızca 3. hafta görevleri | – |
| Arama özelliği | FR-05 | Görev arama kutusu (başlık, açıklama, kategori) | TC-05 | "rapor" yaz → liste anında daralır; eşleşme yoksa "görev bulunamadı" mesajı | #6 |
| Genel ilerlemeyi gösteren görsel gösterge | FR-06 | Dönem ilerleme çubuğu (%) ve istatistik kartları | TC-06 | Bir görevi tamamla → yüzde ve "Tamamlanan" sayısı artar; tüm görevler silinirse %0 gösterilir | – |
| Karanlık / aydınlık tema | FR-07 | Üst menüdeki tema butonu | TC-07 | Temayı değiştir → sayfayı yenile → seçilen tema korunur | – |
| Sayfa yenilendiğinde verilerin korunması (localStorage) | FR-08 | Görev durumu, eklenen ve silinen görevler, tema tercihi tarayıcıda saklanır | TC-08 | Görevi tamamla → sayfayı yenile → görev hâlâ tamamlanmış, yüzde aynı | #2 |

## 2. İşlevsel olmayan gereksinimler

| Gereksinim | Kod | Nasıl karşılandı | Test ID | Doğrulama adımı | İlgili issue |
|---|---|---|---|---|---|
| Mobil, tablet ve masaüstünde kullanılabilirlik | NFR-01 | Duyarlı (responsive) CSS; dar ekranda araç çubuğu ve görev satırları alt alta sarılır | TC-09 | Tarayıcıda 320, 375, 768 ve 1280 px genişlikte yatay kaydırma olmamalı | #4 |
| Anlamlı etiketler | NFR-02 | Tüm form alanları `<label for>` veya `aria-label` ile adlandırıldı; görev onay kutuları görev adını içerir | TC-10 | Ekran okuyucu / tarayıcı erişilebilirlik panelinde her alanın bir adı olmalı | #5 |
| Klavye ile kullanılabilir temel kontroller | NFR-03 | Hafta kartları ve istatistik kartları `role="button"` + `tabindex="0"`; Enter / Boşluk ile çalışır; Esc pencereleri kapatır; odak çerçevesi görünür | TC-11 | Yalnızca Tab, Enter, Boşluk ve Esc ile: hafta kartını aç-kapat, görevi işaretle, filtre uygula | #5 |
| Yeterli kontrast | NFR-04 | Aydınlık ve karanlık temada koyu metin / açık zemin (ve tersi) renk değişkenleri | TC-12 | Her iki temada metinler okunabilir olmalı | – |
| Hızlı ve tutarlı tepki | NFR-05 | Arama ve filtreleme sunucuya gitmeden tarayıcıda çalışır | TC-13 | Arama kutusuna yazarken liste gecikmeden güncellenir | – |
| README adımlarıyla temiz ortamda çalışma | NFR-06 | Tek giriş dosyası `src/index.html`; `server.py` ile yerel sunucu | TC-14 | Repoyu yeni bir klasöre klonla → README adımlarını izle → uygulama açılır | #1, #8 |
| Gizli bilgi / API anahtarı repoda bulunmamalı | NFR-07 | API anahtarı kodda yok; kullanıcı kendi anahtarını ayarlardan girer ve yalnızca kendi tarayıcısında saklanır | TC-15 | Repoda `AIza` / `sk-` ile başlayan anahtar aranır → bulunmamalı | #7 |

## 3. Asgari kabul kriterleri kontrolü (Teknik Doküman bölüm 12)

| Kabul kriteri | Karşılayan gereksinimler | Durum |
|---|---|---|
| Uygulama tarayıcıda çalışmalı | NFR-06 | Karşılanıyor |
| Haftalık içerik, görev takibi, filtreleme/arama ve ilerleme görünümü bulunmalı | FR-01, FR-02, FR-04, FR-05, FR-06 | Karşılanıyor |
| Mobil görünüm işlevsel olmalı | NFR-01 | #4 ile karşılanıyor |
| Ekip üyelerinin bireysel katkıları repoda görünmeli | – | Issue #1–#8, her üye kendi hesabından commit |
| README kurulumu ve kullanımı açıklamalı | NFR-06 | #7 ile tamamlanacak |
