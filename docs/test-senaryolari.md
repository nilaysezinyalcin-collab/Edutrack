# Proje 1 - Kalite Kontrol ve Test Senaryoları Matrisi
**Ders:** Yazılım Geliştirme (Proje 1 - Etkileşimli Ders Deneyimi Panosu)  
**Grup:** Grup 4 (G4)  
**Test ve Kalite Sorumlusu:** 444082 İsmail Korkmaz (+ Geliştirici)  
**Güncelleme:** 3. Hafta Entegrasyon ve Otomasyon Sürümü  
**Kapsam:** 17 İşlevsel Gereksinim (FR-01 .. FR-17), 10 Fonksiyonel Olmayan Gereksinim (NFR-01 .. NFR-10) ve Otomatik Test Koşucu (`test-runner.html`)

---

## 1. Giriş ve Test Amacı
Bu doküman, Proje 1 (Etkileşimli Ders Deneyimi Panosu) kapsamında geliştirilen istemci tarafı web uygulamasının işlevsel doğruluğunu, kullanılabilirliğini, veri bütünlüğünü ve responsive davranışını denetlemek amacıyla Test / Kalite Sorumlusu İsmail Korkmaz tarafından hazırlanmıştır.

3. Hafta itibarıyla sisteme **Tarayıcı İçi Otomatik Test Koşucu (`src/test-runner.html`)** entegre edilmiş olup birim ve entegrasyon testleri tek tıkla yürütülebilir hale getirilmiştir.

---

## 2. İşlevsel Gereksinimler Test Senaryoları (FR Test Matrisi)

| Test ID | İlişkili FR | Test Adımı / Senaryo | Beklenen Sonuç | 3. Hafta Durumu |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FR01** | FR-01 & FR-03 | Kayıt & Giriş formu doğrulama adımları | E-posta ve şifre kontrolü ile oturum simülasyonu | **GEÇTİ (PASS)** |
| **TC-FR04** | FR-04 | Öğrenci paneli ana sayfası açılışı | Navbar, ilerleme alanı, haftalık kartlar ve görevlerin eksiksiz yüklenmesi | **GEÇTİ (PASS)** |
| **TC-FR05** | FR-05 | Haftalık ders kartlarının listelenmesi | 1, 2, 3 ve 4. haftalara ait kartların doğru başlık, durum rozeti ve açıklama ile basılması | **GEÇTİ (PASS)** |
| **TC-FR06** | FR-06 | Hafta kartı detay görüntüleme | Karta tıklandığında modal pencerenin açılması ve haftanın öğrenme kazanımlarının listelenmesi | **GEÇTİ (PASS)** |
| **TC-FR07** | FR-07 | Haftalık ders programı tablosu | Gün, saat, ders adı ve derslik bilgilerinin sistemden tanımlı okunması ve tabloda gösterilmesi | **GEÇTİ (PASS)** |
| **TC-FR08** | FR-08 | Görev ve mini etkinlik listeleme / Yeni Görev Ekleme | Görevlerin listelenmesi ve form ile yeni görev eklenebilmesi | **GEÇTİ (PASS)** |
| **TC-FR09** | FR-09 | Görev durumu güncelleme (Toggle) | Checkbox işaretlendiğinde görevin üstünün çizilmesi, durumunun "Tamamlandı" olması ve toast bildiriminin çıkması | **GEÇTİ (PASS)** |
| **TC-FR10** | FR-10 | Görevleri filtreleme (Durum, Hafta & Sıralama) | "Devam Eden", "Tamamlanan" butonları, Hafta seçici ve Öncelik sıralayıcısı ile listenin doğru süzülmesi | **GEÇTİ (PASS)** |
| **TC-FR11** | FR-11 | Görevlerde anlık arama yapma | Arama kutusuna yazılan anahtar kelimeye göre (başlık, açıklama veya kategori) listenin anında filtrelenmesi | **GEÇTİ (PASS)** |
| **TC-FR12** | FR-12 | Dinamik ilerleme çubuğu ve sayaçlar | Görev tamamlandığında progress bar ve istatistik sayaçlarının anlık matematiksel güncellenmesi | **GEÇTİ (PASS)** |
| **TC-FR13** | FR-13 | Sınav puanı ve ağırlık takibi | Derslere ait sınav ağırlıkları (%30, %40) ve açıklanan puanların listelenmesi | **GEÇTİ (PASS)** |
| **TC-FR14** | FR-14 | Sınav ortalaması hesaplama | Sistemde tanımlı puanlar üzerinden ders başarı ortalamasının (88) otomatik hesaplanması | **GEÇTİ (PASS)** |
| **TC-FR15** | FR-15 | Kişisel çalışma notu ekleme ve silme | Başlık ve metin girilerek not oluşturulması ve çarpı butonuna basılarak notun silinebilmesi | **GEÇTİ (PASS)** |
| **TC-FR16** | FR-16 | Kullanıcı tercihleri ve ayarlar | Kullanıcının tema ve filtre tercihlerini değiştirebilmesi | **GEÇTİ (PASS)** |
| **TC-FR17** | FR-17 | Aydınlık / Karanlık Tema geçişi | Tema butonuna tıklandığında renk paletinin anında değişmesi ve ikonun güncellenmesi | **GEÇTİ (PASS)** |

---

## 3. Fonksiyonel Olmayan Gereksinimler Test Senaryoları (NFR Matrisi)

| Test ID | İlişkili NFR | Kalite Ölçütü | Test Yöntemi & Kriter | Durum |
| :--- | :--- | :--- | :--- | :--- |
| **TC-NFR01** | NFR-01 (Kullanılabilirlik) | Sezgisel Arayüz | Tüm buton ve etkileşimli öğelerin 1-2 tık ile erişilebilir olması | **GEÇTİ** |
| **TC-NFR02** | NFR-02 (Performans) | Hızlı Tepki Süresi | Arama ve filtreleme işlemlerinin 50ms altında DOM güncellemesi yapması | **GEÇTİ** |
| **TC-NFR03** | NFR-03 (Uyumluluk) | Responsive Tasarım | Mobil (375px), Tablet (768px) ve Masaüstü (1280px) ekranlarda yatay taşma (horizontal scroll) olmaması | **GEÇTİ** |
| **TC-NFR04** | NFR-04 (Tutarlılık) | Veri Tutarlılığı | Tamamlanan görev sayısı ile progress bar yüzdesinin %100 matematiksel örtüşmesi | **GEÇTİ** |
| **TC-NFR05** | NFR-05 (Erişilebilirlik) | WCAG & Kontrast | Karanlık ve aydınlık temada metin kontrast oranlarının okunabilir olması, ARIA etiketlerinin varlığı | **GEÇTİ** |
| **TC-NFR06** | NFR-06 (Veri Kalıcılığı) | LocalStorage & JSON Yedek | Sayfa yenilendiğinde verilerin korunması ve JSON formatında dışa aktarılıp içe aktarılabilmesi | **GEÇTİ** |
| **TC-NFR07** | NFR-07 (Güvenlik) | İstemci Veri İzolasyonu | Kullanıcı girdilerinin (notlar/görevler) XSS zafiyetine yol açmaması, innerHTML yerine textContent / güvenli DOM kullanımı | **GEÇTİ** |
| **TC-NFR08** | NFR-08 (Veri Bütünlüğü) | ID Eşsizliği | Her görevin ve haftanın benzersiz ID anahtarlarına sahip olması | **GEÇTİ** |
| **TC-NFR09** | NFR-09 (Veri Doğruluğu) | Doğru Ağırlıklı Ortalama | Sınav notlarının ağırlık yüzdelerine göre doğru ağırlıklandırılması | **GEÇTİ** |
| **TC-NFR10** | NFR-10 (Veri Koruması) | Sistem Verisi Koruması | Ders programı ve sınav notlarının öğrenci tarafından manipüle edilememesi (read-only sunumu) | **GEÇTİ** |

---

## 4. Otomatik Test Koşucu (`test-runner.html`) Çıktısı
Sistemde koşturulan 10 birim testin tamamı **%100 başarıyla (10/10 PASS)** sonuçlanmıştır.

**İmza / Test Sorumlusu:** 444082 İsmail Korkmaz