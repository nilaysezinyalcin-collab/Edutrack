# Edutrack (AkademiX) – Proje Sunumu

**Karadeniz Teknik Üniversitesi (KTÜ) • Yazılım Mühendisliği Bölümü**  
**Yazılım Geliştirme Dersi – Proje 1: Etkileşimli Ders Deneyimi Panosu (Grup 4)**

---

## Slayt 1: Kapak ve Ekip Tanıtımı

### Edutrack (AkademiX) – Etkileşimli Ders Deneyimi Panosu
* **Ders:** Yazılım Geliştirme – Proje 1
* **Grup:** Grup 4

| Öğrenci No | Ad Soyad | Rol | Odak Alanı |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | Lider & Geliştirici | Koordinasyon, UI/Layout, Responsive CSS, Başlatıcı Betikler |
| **444083** | **Oğuzhan İnce** | Analist & Geliştirici | 17 FR / 10 NFR Gereksinim Analizi, 11 Tablolu ER Modeli |
| **444082** | **İsmail Korkmaz** | Test / QA & Geliştirici | 17 Otomatik Kabul Testi, `localStorage` Kalıcılığı, KTÜ Not Motoru |
| **444101** | **Onur Uzun** | Dokümantasyon & Geliştirici | Arama/Filtreleme, Form Doğrulama (#6), Rapor, Kılavuz & Sunum (#7) |

---

## Slayt 2: Projenin Amacı ve Çözdüğü Problem

* **Problem:** Öğrencilerin haftalık ders konularını, öğrenme kazanımlarını, görevlerini, ders programlarını ve KTÜ sınav/AGNO hesaplamalarını dağınık araçlar yerine tek bir etkileşimli merkezden takip etme ihtiyacı.
* **Çözüm – Edutrack (AkademiX):**
  * Klasik bir "yapılacaklar listesi" (to-do list) olmanın ötesinde, **4 haftalık müfredat kazanımlarını**, **görev ilerlemesini**, **KTÜ 30 kişi kuralı not simülatörünü** ve **akıllı akademik danışmanı** birleştiren bütünleşik web platformu.
  * Harici veritabanı veya karmaşık kurulum gerektirmeden her tarayıcıda anında çalışan hızlı, güvenli ve erişilebilir mimari.

---

## Slayt 3: Gereksinim Analizi Özeti (17 FR & 10 NFR)

* **Fonksiyonel Gereksinimler (FR-01 .. FR-17):**
  * **FR-01..04:** Kayıt olma, bilgi doğrulama, giriş yapma ve merkezi öğrenci paneli.
  * **FR-05..07:** Haftalık öğrenme kartları, modal içerik detayı ve haftalık ders programı takibi.
  * **FR-08..12:** Görev listeleme/ekleme (başlık doğrulamalı), durum değiştirme, hafta/durum filtreleme, Türkçe duyarlı arama (`"Aramanızla eşleşen görev bulunamadı"` mesajı) ve dinamik ilerleme çubuğu (`%`).
  * **FR-13..17:** KTÜ sınav puanı ve ağırlıklı ortalama/AGNO hesaplama, kişisel çalışma notları ve aydınlık/karanlık tema.
* **Fonksiyonel Olmayan Gereksinimler (NFR-01 .. NFR-10):**
  * **Responsive Tasarım (NFR-03):** `320px`, `375px`, `768px` ve `1280px+` ekranlarda sıfır yatay taşma.
  * **Erişilebilirlik (NFR-05):** WCAG AA (≥ 4.5:1) kontrast oranı, anlamlı form etiketleri ve tam klavye erişimi (`Tab`, `Enter`, `Space`, `Esc`).
  * **Güvenlik & Kalıcılık (NFR-06, NFR-07):** `localStorage` kalıcılığı, XSS HTML kaçışı ve repoda gizli API anahtarı bulundurmama.

---

## Slayt 4: Sistem ve Mimari Tasarım

### Uygulama Akış Mimarisi
1. **Giriş / Kayıt Kontrolü:** `Hesabı var mı?` -> Kayıt Ol / Giriş Yap (veya Hızlı Demo Girişi) -> Doğrulama -> **Öğrenci Paneli**.
2. **Öğrenci Paneli Modülleri:**
   * **Haftalık Ders Kartları:** 4 hafta kartı -> Öğrenme hedefleri & hafta görevleri modalı.
   * **Görev ve İlerleme Motoru:** Görev ekleme/silme/tamamlama -> Dinamik Progress Bar (`%`) ve 4 canlı sayaç.
   * **Arama ve Filtreleme:** Türkçe karakter uyumlu anlık arama + Hafta ve Durum filtreleri.
   * **KTÜ AGNO & Ders Programı:** 30 kişi kuralı (MDS/BDS) + 50 final barajı simülatörü ve haftalık ders tablosu.
   * **Kişisel Notlar & Tema Ayarları:** Kalıcı çalışma notları ve Aydınlık/Karanlık mod geçişi.

---

## Slayt 5: Veritabanı Tasarımı (11 Tablolu İlişkisel ER Modeli)

Sistemin veri modeli 11 ilişkisel tablo ve PK/FK/UK kısıtlamalarıyla tasarlanmıştır:

1. **`OGRENCI`:** `ogrenci_id (PK)`, `ad`, `soyad`, `email (UK)`, `sifre_hash`
2. **`DERSLER`:** `ders_id (PK)`, `ders_adi`, `ders_kodu`
3. **`HAFTALIK_KARTLAR`:** `kart_id (PK)`, `ders_id (FK)`, `hafta_no`, `baslik`, `icerik`
4. **`DERS_PROGRAMI`:** `program_id (PK)`, `ders_id (FK)`, `gun`, `baslangic_saati`, `bitis_saati`, `derslik`
5. **`GOREVLER`:** `gorev_id (PK)`, `kart_id (FK)`, `baslik`, `tur`
6. **`OGRENCI_GOREV`:** `ogrenci_gorev_id (PK)`, `ogrenci_id (FK)`, `gorev_id (FK)`, `durum` *(M:N Ara Tablo)*
7. **`SINAV_NOTLARI`:** `sinav_notu_id (PK)`, `ogrenci_id (FK)`, `ders_id (FK)`, `sinav_turu`, `puan`, `agirlik_yuzdesi`
8. **`SINAV_ORTALAMASI`:** `ortalama_id (PK)`, `ogrenci_id (FK)`, `ders_id (FK)`, `ortalama`, `hesaplama_tarihi`
9. **`KISISEL_NOTLAR`:** `not_id (PK)`, `ogrenci_id (FK)`, `baslik`, `icerik`, `olusturma_tarihi`
10. **`AYARLAR`:** `ayar_id (PK)`, `ogrenci_id (FK, UK)`, `tema` *(1:1 İlişki)*
11. **`ILERLEME`:** `ilerleme_id (PK)`, `ogrenci_id (FK, UK)`, `tamamlanma_yuzdesi`, `guncelleme_tarihi` *(1:1 İlişki)*

---

## Slayt 6: Temel Özellikler ve Çözülen Teknik Problemler

* **Issue #6 – Arama ve Form Doğrulama:**
  * Türkçe büyük/küçük harf (`İ/i`, `I/ı`) duyarlı arama normalizasyonu (`normalizeTrSearch`).
  * Eşleşme olmadığında `"Aramanızla eşleşen görev bulunamadı"` mesajının gösterilmesi ve arama temizlenince gizlenmesi.
  * Görev ekleme formunda boş veya yalnızca boşluk içeren başlıkların engellenmesi ve input altında uyarı mesajı gösterilmesi.
* **Issue #2 & #4 – Veri Kalıcılığı ve Mobil Uyum:**
  * Görevlerin, kişisel notların, ders programının ve temanın `localStorage` üzerinde saklanması.
  * `320px - 375px` mobil görünümde yatay taşmaların CSS Grid/Flexbox ile tamamen giderilmesi.
* **Issue #5 & #3 – Erişilebilirlik ve Otomatik Kabul Testleri:**
  * Klavye navigasyonu (`Tab`, `Enter`, `Space`, `Esc`), `aria-label` etiketleri ve WCAG AA renk kontrastı.
  * Gerçek uygulama üzerinde çalışan **17/17 başarılı otomatik kabul testi (`src/js/tests.js`)**.

---

## Slayt 7: Canlı Demo Akışı

1. **Adım 1 – Giriş ve Genel Görünüm:**
   * Hızlı Demo Girişi (`444082 - İsmail Korkmaz`) ile öğrenci panelinin açılması, ilerleme çubuğu ve sayaçların incelenmesi.
2. **Adım 2 – Haftalık Ders Kartları:**
   * 1–4. Hafta kartlarına tıklayarak öğrenme hedeflerinin ve hafta görevlerinin modalda incelenmesi.
3. **Adım 3 – Görev Ekleme, Doğrulama ve Arama (Kenar Durumları):**
   * Boş başlıkla görev kaydetmeyi deneyerek doğrulama uyarısının gösterilmesi; ardından geçerli görev ekleme ve tamamlama.
   * Türkçe büyük harfle (`"İHTİYAÇ"`) arama ve olmayan bir kelime aratarak `"Aramanızla eşleşen görev bulunamadı"` mesajının doğrulanması.
4. **Adım 4 – KTÜ AGNO Simülatörü, Notlar ve Tema / Mobil Görünüm:**
   * 30 kişi kuralı (MDS/BDS) ile ders notu hesaplama, kişisel not ekleme, Aydınlık/Karanlık tema geçişi, mobil (`375px`) görünüm ve `test-runner.html` üzerinden **17/17 GEÇTİ** test sonucunun gösterilmesi.

