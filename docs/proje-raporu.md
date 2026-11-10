# Edutrack (AkademiX) – Teknik Proje Raporu

**T.C. KARADENİZ TEKNİK ÜNİVERSİTESİ**  
**Mühendislik Fakültesi • Yazılım Mühendisliği Bölümü**  
**Yazılım Geliştirme Dersi – Proje 1: Etkileşimli Ders Deneyimi Panosu**  
**Grup:** Grup 4 • **Tarih:** 10 Kasım 2026

---

## 1. Yönetici Özeti ve Ekip Yapısı

**Edutrack (AkademiX)**, üniversite öğrencilerinin bir yarıyıl boyunca haftalık ders akışlarını, öğrenme hedeflerini, görev ve mini etkinliklerini, haftalık ders programlarını, KTÜ mevzuatına uygun sınav ve AGNO hesaplamalarını ve kişisel çalışma notlarını etkileşimli, duyarlı (responsive) ve erişilebilir bir web arayüzü üzerinden yönetebilmeleri amacıyla geliştirilmiştir.

Proje, istemci tarafı (client-side) modern web standartları (HTML5, CSS3, Vanilla JavaScript ve Web Storage API) üzerine inşa edilmiş; harici bir sunucu veya veritabanı kurulumu gerektirmeden her ortamda hızlı ve güvenilir biçimde çalışacak şekilde tasarlanmıştır.

### Grup 4 Üyeleri ve Sorumluluk Dağılımı

| Öğrenci No | Adı Soyadı | Rolü | Sorumluluk ve Katkı Alanları |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | Proje Lideri & Geliştirici | Ekip koordinasyonu, mimari dizin yapısı (`src/`), responsive CSS düzeni, başlatıcı betikler (`.bat`, `.sh`, `server.py`) |
| **444083** | **Oğuzhan İnce** | Sistem Analisti & Geliştirici | Paydaş ve ihtiyaç analizi, 17 FR ve 10 NFR gereksinim dökümü, 11 tablolu ER veritabanı şeması ve izlenebilirlik matrisi |
| **444082** | **İsmail Korkmaz** | Test / Kalite Sorumlusu & Geliştirici | 17 otomatik kabul testi (`src/js/tests.js`), kalite raporu, `localStorage` görev/not kalıcılığı, KTÜ BDS/MDS not motoru |
| **444101** | **Onur Uzun** | Dokümantasyon / Sunum & Geliştirici | Görev arama ve filtreleme motoru, boş arama mesajı ve başlık doğrulaması (#6), teknik rapor, kullanıcı kılavuzu, README ve sunum (#7) |

---

## 2. Gereksinimler

Sistemin analiz aşamasında paydaş beklentileri (Öğrenci ve Ders Sorumlusu), uygulama akış şeması ve ER veri modeli doğrultusunda **17 Fonksiyonel Gereksinim (FR)** ve **10 Fonksiyonel Olmayan Gereksinim (NFR)** tanımlanmıştır.

### 2.1. Fonksiyonel Gereksinimler (FR)

| Kod | Gereksinim Başlığı | Açıklama | Öncelik |
| :--- | :--- | :--- | :---: |
| **FR-01** | Kayıt Olma | Hesabı olmayan öğrenci numara, ad, soyad, bölüm, e-posta ve şifre bilgileriyle kayıt olabilmelidir. | Yüksek |
| **FR-02** | Bilgi Doğrulama | Kayıt ve görev ekleme formlarında eksik/geçersiz bilgi girildiğinde uyarı mesajı gösterilmeli ve işlem engellenmelidir. | Yüksek |
| **FR-03** | Giriş Yapma | Kayıtlı öğrenci e-posta/öğrenci no ve şifresiyle veya hızlı demo girişiyle oturum açabilmelidir. | Yüksek |
| **FR-04** | Öğrenci Paneli | Başarılı giriş sonrasında tüm modüllere erişilen merkezi öğrenci paneli açılmalıdır. | Yüksek |
| **FR-05** | Haftalık Öğrenme Kartları | Ders haftalarına ait konular, durum rozetleri ve özet bilgiler kartlar hâlinde gösterilmelidir. | Yüksek |
| **FR-06** | Haftalık İçerik Detayı | Öğrenci bir hafta kartını seçerek o haftanın öğrenme hedeflerini ve görevlerini modal pencerede görüntüleyebilmelidir. | Yüksek |
| **FR-07** | Ders Programı Takibi | Haftalık ders programı (gün, başlangıç-bitiş saati, ders adı, derslik) tablo üzerinden takip edilebilmeli ve yönetilebilmelidir. | Yüksek |
| **FR-08** | Görev Listeleme ve Ekleme | Görevler ve mini etkinlikler başlık, açıklama, hafta, kategori ve öncelik bilgileriyle listelenmeli; yeni görev eklenebilmelidir. | Yüksek |
| **FR-09** | Görev Durumu Güncelleme | Öğrenci görevleri onay kutusu ile *Tamamlandı* veya *Devam Ediyor* durumuna geçirebilmeli ve silebilmelidir. | Yüksek |
| **FR-10** | Görev Filtreleme | Görevler durum (*Tümü*, *Devam Eden*, *Tamamlanan*, *Yüksek Öncelik*) ve hafta (*1–4. Hafta*) bilgisine göre filtrelenebilmelidir. | Yüksek |
| **FR-11** | Görev Arama | Öğrenci görevleri anahtar kelimeyle Türkçe karakter duyarlı olarak arayabilmeli; eşleşme yoksa `"Aramanızla eşleşen görev bulunamadı"` mesajı gösterilmelidir. | Yüksek |
| **FR-12** | İlerleme Göstergesi | Görev durumu değiştiğinde ilerleme çubuğu (`%`) ve istatistik sayaçları anında güncellenerek görsel olarak sunulmalıdır. | Yüksek |
| **FR-13** | Sınav Puanı ve Ağırlık Takibi | Öğrenci derslere ait değerlendirme bileşenlerini (vize, final, lab, proje, ödev, quiz) ve ağırlık yüzdelerini tanımlayabilmelidir. | Yüksek |
| **FR-14** | Sınav Ortalaması ve AGNO Hesaplama | Sistem KTÜ 30 kişi kuralı (MDS/BDS) ve 50 final barajına göre ders ortalamasını, harf notunu ve dönem AGNO'sunu hesaplamalıdır. | Yüksek |
| **FR-15** | Kişisel Not Yönetimi | Öğrenci başlığı ve içeriği olan kişisel çalışma notları oluşturabilmeli, görüntüleyebilmeli ve silebilmelidir. | Orta |
| **FR-16** | Ayarları Yönetme | Öğrenci uygulama tercihlerini ve isteğe bağlı yapay zekâ API ayarlarını görüntüleyip değiştirebilmelidir. | Orta |
| **FR-17** | Tema Kişiselleştirme | Kullanıcı aydınlık ve karanlık tema arasında geçiş yapabilmeli ve bu seçim kalıcı olarak saklanmalıdır. | Orta |

### 2.2. Fonksiyonel Olmayan Gereksinimler (NFR)

| Kod | Kalite Kriteri | Kabul Kriteri ve Uygulama Karşılığı |
| :--- | :--- | :--- |
| **NFR-01** | Kullanılabilirlik | Temel görev, ders ve sınav işlemleri sezgisel olmalı; en fazla 1-2 tıklama ile erişilebilmelidir. |
| **NFR-02** | Performans | İstemci tarafı arama, filtreleme ve AGNO hesaplama işlemleri sunucu gecikmesi olmadan anında (< 50 ms) sonuç vermelidir. |
| **NFR-03** | Uyumluluk (Responsive) | Mobil (`320px - 375px`), tablet (`768px`) ve masaüstü (`1280px+`) ekranlarda yatay taşma (horizontal overflow) oluşmamalıdır. |
| **NFR-04** | Tutarlılık | Tamamlanan görev sayısı, istatistik kartları ve ilerleme çubuğu yüzdesi (`%`) her işlem sonrasında matematiksel olarak tutarlı olmalıdır. |
| **NFR-05** | Erişilebilirlik (a11y) | Metin/arka plan kontrastı her iki temada da WCAG AA (≥ 4.5:1) standardını sağlamalı; form etiketleri (`label`/`aria-label`) ve klavye navigasyonu (`Tab`, `Enter`, `Space`, `Esc`) eksiksiz çalışmalıdır. |
| **NFR-06** | Veri Kalıcılığı | Görev durumları, eklenen/silinen görevler, kişisel notlar, ders programı, AGNO verileri ve tema tercihi `localStorage` üzerinde korunmalıdır. |
| **NFR-07** | Güvenlik ve Gizlilik | Kaynak kodda açık API anahtarı veya parola bulunmamalı; tüm kullanıcı girdileri XSS saldırılarına karşı HTML kaçışından (`escapeAiHtml`) geçirilmelidir. |
| **NFR-08** | Veri Bütünlüğü | E-posta adresi benzersiz (`UK`) olmalı, her öğrencinin tek bir ayar ve ilerleme kaydı bulunmalı ve ilişkisel modelde `PK`/`FK` bütünlüğü korunmalıdır. |
| **NFR-09** | Veri Doğruluğu | Sınav ortalaması, harf notu ve dönem AGNO değeri her zaman güncel ağırlık yüzdeleri ve KTÜ yönetmelik kurallarına göre doğru hesaplanmalıdır. |
| **NFR-10** | Hata Toleransı | `localStorage` verisi bozulduğunda veya tarayıcı depolama kotası dolduğunda uygulama çökmemeli (`try/catch`), varsayılan verilerle çalışmayı sürdürmelidir. |

---

## 3. Sistem ve Mimari Tasarım

### 3.1. Uygulama Akış Tasarımı

Uygulamanın çalışma akışı, kullanıcı girişinden alt modüllerin etkileşimine kadar uçtan uca aşağıdaki mimari sırayı izler:

![Öğrenci Paneli Uygulama Akış Diyagramı](ogrenci_paneli_diyagram_mavi.png)

1. **Kayıt ve Giriş Kontrolü:**
   * Uygulama açıldığında oturum kontrolü yapılır (`Hesabı var mı?`).
   * Hesabı olmayan kullanıcı **Kayıt Ol** adımında öğrenci bilgilerini girer; bilgiler doğrulanırsa (`Bilgiler geçerli mi? -> Evet`) hesap oluşturulur, geçersizse hata mesajı gösterilir.
   * Hesabı olan kullanıcı **Giriş Yap** adımında kimlik bilgilerini girer (veya Hızlı Demo Girişi kullanır); doğrulama başarılıysa merkezi **Öğrenci Paneli**ne yönlendirilir.
2. **Öğrenci Paneli Alt Modül Akışları:**
   * **Kişisel Notlar Akışı:** Öğrenci panel üzerinden yeni kişisel çalışma notu oluşturabilir veya mevcut notlarını silebilir; değişiklikler anında `localStorage` üzerine yazılır.
   * **Haftalık Ders ve Öğrenme Kartları Akışı:** Öğrenci 4 haftalık ders kartlarını görüntüler, seçtiği kartın detay penceresinde haftalık öğrenme hedeflerini inceler ve haftalık ders programını takip eder.
   * **Görev Yönetimi ve İlerleme Göstergesi Akışı:** Öğrenci görev ve mini etkinlikleri görüntüler; hafta veya duruma göre filtreler; anahtar kelimeyle arama yapar (eşleşme yoksa bilgilendirme mesajı alır); görev ekler (başlık doğrulamasından geçerek) veya görev durumunu değiştirir. Görev durumu her değiştiğinde **İlerleme Göstergesi** otomatik güncellenir ve genel ilerleme çubuğuna yansır.
   * **Sınav Puanı ve Ortalama Hesaplama Akışı:** Öğrenci ders bazında sınav bileşenlerini ve ağırlıklarını takip eder; KTÜ 30 kişi kuralı ve final barajına göre ağırlıklı ortalama ve AGNO hesaplanır.
   * **Tema ve Ayarlar Akışı:** Öğrenci üst menüden aydınlık veya karanlık temayı seçer; seçilen tema `data-theme` niteliği ve `localStorage` üzerinden anında uygulanır.

### 3.2. İstemci Tarafı Kod Mimarisi

Proje, bakım kolaylığı ve sorumlulukların ayrılması (Separation of Concerns) ilkesine uygun olarak `src/` dizini altında yapılandırılmıştır:

* **`src/index.html`:** Semantik HTML5 iskeleti; giriş/kayıt ekranı (`#auth-section`), öğrenci paneli (`#student-portal-app`), hafta detay modalı (`#modal-week-view`), görev ekleme modalı (`#modal-create-task`), KTÜ not sihirbazı (`#modal-grade-wizard`) ve AI danışman çekmecesini barındırır.
* **`src/css/style.css`:** CSS değişkenleri (`:root` ve `[data-theme="dark"]`) tabanlı tasarım sistemi, CSS Grid/Flexbox yerleşimleri, form doğrulama ve boş durum stilleri ile `992px` ve `600px` kırılım noktalarında (breakpoints) mobil uyumluluk kurallarını içerir.
* **`src/js/portal.js`:** Uygulamanın temel iş mantığı katmanıdır; kimlik doğrulama simülasyonu, görev CRUD işlemleri, Türkçe karakter duyarlı arama (`normalizeTrSearch`), boş arama sonucu yönetimi (`updateTasksEmptyMessage`), başlık validasyonu (`showTaskTitleError`), `localStorage` senkronizasyonu, KTÜ AGNO motoru ve AI asistan denetleyicisini içerir.
* **`src/js/a11y.js`:** Dinamik oluşturulan görev satırlarına ve ikon butonlarına otomatik `aria-label` atayan `MutationObserver` tabanlı erişilebilirlik katmanı; `role="button"` öğeleri için `Enter`/`Space` ve modallar için `Escape` tuş dinleyicilerini yönetir.
* **`src/js/tests.js`:** Gerçek uygulama DOM'u üzerinde çalışan, kullanıcı verisini yedekleyip geri yükleyen 17 senaryoluk otomatik kabul testi koşucusudur.

---

## 4. Veritabanı Tasarımı (İlişkisel ER Modeli)

Projenin veri mimarisi, 3. Normal Form (3NF) kurallarına uygun olarak **11 ilişkisel tablo** üzerinden modellenmiştir. Proje 1 kapsamında istemci tarafında `localStorage` JSON koleksiyonları olarak simüle edilen bu şema, Proje 2 ve Proje 3'teki ilişkisel veritabanı entegrasyonunun doğrudan temelini oluşturmaktadır.

![Veritabanı ER Diyagramı](er_diyagram_v2.png)

### 4.1. Tablo Şemaları ve Alan Tanımları

#### 1. `OGRENCI` Tablosu
Öğrencilerin temel kimlik ve oturum bilgilerini tutan ana (parent) tablodur.
* **`ogrenci_id`** (`int`, **PK**): Öğrencinin benzersiz birincil anahtarı.
* **`ad`** (`string`): Öğrencinin adı.
* **`soyad`** (`string`): Öğrencinin soyadı.
* **`email`** (`string`, **UK**): Öğrencinin benzersiz kurumsal e-posta adresi.
* **`sifre_hash`** (`string`): Güvenli biçimde özetlenmiş (hashed) şifre bilgisi.

#### 2. `DERSLER` Tablosu
Sistemde tanımlı olan derslerin katalog bilgilerini tutar.
* **`ders_id`** (`int`, **PK**): Dersin birincil anahtarı.
* **`ders_adi`** (`string`): Dersin tam adı (örn. *Yazılım Geliştirme*).
* **`ders_kodu`** (`string`): Dersin resmi kodu (örn. *YZM201*).

#### 3. `HAFTALIK_KARTLAR` Tablosu
Bir derse ait haftalık öğrenme modüllerini ve içeriklerini tutar (`DERSLER` ile `1:N` ilişkili).
* **`kart_id`** (`int`, **PK**): Haftalık kartın birincil anahtarı.
* **`ders_id`** (`int`, **FK** -> `DERSLER.ders_id`): Kartın ait olduğu ders.
* **`hafta_no`** (`int`): Hafta numarası (`1, 2, 3, 4...`).
* **`baslik`** (`string`): Haftanın konu başlığı.
* **`icerik`** (`text`): Haftalık öğrenme hedefleri ve detaylı açıklama metni.

#### 4. `DERS_PROGRAMI` Tablosu
Derslerin haftalık işlenme gün, saat ve derslik bilgilerini tutar (`DERSLER` ile `1:N` ilişkili).
* **`program_id`** (`int`, **PK**): Program satırının birincil anahtarı.
* **`ders_id`** (`int`, **FK** -> `DERSLER.ders_id`): İlgili dersin yabancı anahtarı.
* **`gun`** (`string`): Dersin günü (*Pazartesi – Cuma*).
* **`baslangic_saati`** (`time`): Ders başlangıç saati.
* **`bitis_saati`** (`time`): Ders bitiş saati.
* **`derslik`** (`string`): Dersin yapıldığı sınıf veya laboratuvar kodu.

#### 5. `GOREVLER` Tablosu
Haftalık öğrenme kartlarına bağlı görev ve mini etkinlik tanımlarını tutar (`HAFTALIK_KARTLAR` ile `1:N` ilişkili).
* **`gorev_id`** (`int`, **PK**): Görevin birincil anahtarı.
* **`kart_id`** (`int`, **FK** -> `HAFTALIK_KARTLAR.kart_id`): Görevin bağlı olduğu hafta kartı.
* **`baslik`** (`string`): Görev başlığı.
* **`tur`** (`string`): Görev kategorisi / türü (*Analiz*, *Frontend*, *Test/QA*, *Dokümantasyon* vb.).

#### 6. `OGRENCI_GOREV` Tablosu
Öğrenciler ile görevler arasındaki çoktan-çoğa (`M:N`) ilişkiyi çözen ve her öğrencinin görev bazlı tamamlanma durumunu tutan ara (junction) tablodur.
* **`ogrenci_gorev_id`** (`int`, **PK**): Kaydın birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK** -> `OGRENCI.ogrenci_id`): Görevi üstlenen öğrenci.
* **`gorev_id`** (`int`, **FK** -> `GOREVLER.gorev_id`): İlgili görev.
* **`durum`** (`string`): Görevin durumu (`completed` / `in-progress`).

#### 7. `SINAV_NOTLARI` Tablosu
Öğrencinin bir dersteki alt değerlendirme bileşenlerinden (vize, final, proje vb.) aldığı puanları ve ağırlık yüzdelerini tutar (`OGRENCI` ve `DERSLER` ile `1:N` ilişkili).
* **`sinav_notu_id`** (`int`, **PK**): Sınav notu birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK** -> `OGRENCI.ogrenci_id`): Notun ait olduğu öğrenci.
* **`ders_id`** (`int`, **FK** -> `DERSLER.ders_id`): Notun ait olduğu ders.
* **`sinav_turu`** (`string`): Sınav bileşeni (*Vize*, *Final*, *Lab*, *Proje*, *Ödev*, *Quiz*).
* **`puan`** (`float`): Öğrencinin aldığı puan (`0 - 100`).
* **`agirlik_yuzdesi`** (`float`): Sınavın dönem sonu ortalamasına etki yüzdesi (`%`).

#### 8. `SINAV_ORTALAMASI` Tablosu
Öğrencinin ders bazında ağırlıklı sınav ortalamasını ve hesaplama zamanını tutar (`OGRENCI` ve `DERSLER` ile `1:N` ilişkili).
* **`ortalama_id`** (`int`, **PK**): Ortalama kaydının birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK** -> `OGRENCI.ogrenci_id`): İlgili öğrenci.
* **`ders_id`** (`int`, **FK** -> `DERSLER.ders_id`): İlgili ders.
* **`ortalama`** (`float`): Hesaplanan ağırlıklı başarı puanı.
* **`hesaplama_tarihi`** (`datetime`): Ortalamanın son hesaplandığı tarih ve saat.

#### 9. `KISISEL_NOTLAR` Tablosu
Öğrencinin kendi oluşturduğu kişisel çalışma notlarını tutar (`OGRENCI` ile `1:N` ilişkili).
* **`not_id`** (`int`, **PK**): Notun birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK** -> `OGRENCI.ogrenci_id`): Notu oluşturan öğrenci.
* **`baslik`** (`string`): Not başlığı.
* **`icerik`** (`text`): Notun metin içeriği.
* **`olusturma_tarihi`** (`datetime`): Notun oluşturulma zamanı.

#### 10. `AYARLAR` Tablosu
Öğrencinin tema gibi kişisel arayüz tercihlerini tutar (`OGRENCI` ile `1:1` ilişkili).
* **`ayar_id`** (`int`, **PK**): Ayar kaydının birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK, UK** -> `OGRENCI.ogrenci_id`): Benzersiz yabancı anahtar (her öğrencinin tek bir ayar kaydı vardır).
* **`tema`** (`string`): Seçili tema (`light` veya `dark`).

#### 11. `ILERLEME` Tablosu
Öğrencinin genel görev tamamlanma yüzdesini ve son güncelleme zamanını tutar (`OGRENCI` ile `1:1` ilişkili).
* **`ilerleme_id`** (`int`, **PK**): İlerleme kaydının birincil anahtarı.
* **`ogrenci_id`** (`int`, **FK, UK** -> `OGRENCI.ogrenci_id`): Benzersiz yabancı anahtar (her öğrencinin tek bir genel ilerleme özeti vardır).
* **`tamamlanma_yuzdesi`** (`float`): Tamamlanan görevlerin toplam görevlere oranı (`0.0 - 100.0`).
* **`guncelleme_tarihi`** (`datetime`): İlerleme göstergesinin son güncellendiği zaman.

### 4.2. Tablolar Arası İlişkiler Özeti

| Kaynak Tablo | Hedef Tablo | İlişki Türü | İlişki Açıklaması |
| :--- | :--- | :---: | :--- |
| `DERSLER` | `HAFTALIK_KARTLAR` | **1 : N** | Bir dersin birden fazla haftalık öğrenme kartı vardır (`ders_id` FK). |
| `DERSLER` | `DERS_PROGRAMI` | **1 : N** | Bir dersin haftalık programda bir veya birden fazla oturumu vardır (`ders_id` FK). |
| `DERSLER` | `SINAV_NOTLARI` | **1 : N** | Bir derse ait birden fazla sınav bileşeni notu bulunur (`ders_id` FK). |
| `DERSLER` | `SINAV_ORTALAMASI` | **1 : N** | Bir ders için öğrenci bazında hesaplanan ortalama kayıtları bulunur (`ders_id` FK). |
| `HAFTALIK_KARTLAR` | `GOREVLER` | **1 : N** | Her haftalık öğrenme kartının altında birden fazla görev yer alır (`kart_id` FK). |
| `OGRENCI` & `GOREVLER` | `OGRENCI_GOREV` | **1 : N (M:N)** | Bir öğrenciye birden fazla görev atanır ve her görevin durumu `OGRENCI_GOREV` üzerinde izlenir. |
| `OGRENCI` | `SINAV_NOTLARI` | **1 : N** | Bir öğrencinin birden fazla sınav puanı kaydı vardır (`ogrenci_id` FK). |
| `OGRENCI` | `SINAV_ORTALAMASI` | **1 : N** | Bir öğrencinin farklı derslere ait sınav ortalamaları vardır (`ogrenci_id` FK). |
| `OGRENCI` | `KISISEL_NOTLAR` | **1 : N** | Bir öğrenci birden fazla kişisel çalışma notu oluşturabilir (`ogrenci_id` FK). |
| `OGRENCI` | `AYARLAR` | **1 : 1** | Her öğrencinin tek bir tema/ayar kaydı vardır (`ogrenci_id` FK, UK). |
| `OGRENCI` | `ILERLEME` | **1 : 1** | Her öğrencinin tek bir genel ilerleme kaydı vardır (`ogrenci_id` FK, UK). |

---

## 5. Uygulama, Geliştirme ve Çözülen Teknik Problemler

Geliştirme sürecinde karşılaşılan ve ekip tarafından çözüme kavuşturulan başlıca teknik problemler şunlardır:

1. **Türkçe Karakter Duyarlı Arama ve Boş Arama Sonucu Mesajı (Issue #6):**
   * **Problem:** JavaScript'in standart `.toLowerCase()` metodu Türkçe büyük `'İ'` harfini `'i̇'` (noktalı kombinasyon) veya `'I'` harfini `'i'` olarak dönüştürdüğü için `"İHTİYAÇ LİSTESİ"` araması `"ihtiyaç listesi"` görevini bulamıyordu. Ayrıca hiçbir görev eşleşmediğinde kullanıcıya geri bildirim verilmiyordu.
   * **Çözüm:** `portal.js` içerisine Türkçe karakterleri (`İ->i`, `I->ı`, `Ç->ç`, `Ğ->ğ`, `Ö->ö`, `Ş->ş`, `Ü->ü`) normalize eden `normalizeTrSearch()` fonksiyonu ve görünür görev sayısı `0` olduğunda `#tasks-empty-message` alanında tam olarak `"Aramanızla eşleşen görev bulunamadı"` mesajını gösteren, arama temizlendiğinde veya eşleşme bulunduğunda mesajı gizleyen `updateTasksEmptyMessage()` fonksiyonu eklendi.
2. **Görev Ekleme Formu Başlık Doğrulaması – Validation (Issue #6):**
   * **Problem:** Görev ekleme formunda başlık alanına yalnızca boşluk karakterleri (`"   "`) girildiğinde veya boş bırakıldığında kullanıcıya alan altında net bir doğrulama mesajı gösterilmiyordu.
   * **Çözüm:** `#modal-create-task` formuna `novalidate` kontrolü, `#modal-t-title` inputunun hemen altına `role="alert"` niteliğine sahip `#modal-t-title-error` uyarı öğesi ve `showTaskTitleError()` doğrulama fonksiyonu eklendi. `saveNewTask()` içinde `.trim()` kontrolü yapılarak boş başlıkla görev eklenmesi kesin olarak engellendi.
3. **Veri Kalıcılığı (`localStorage`) ve Hata Toleransı (Issue #2):**
   * **Problem:** Görev durumu değişiklikleri, yeni eklenen görevler ve kişisel çalışma notları sayfa yenilendiğinde sıfırlanıyordu.
   * **Çözüm:** `akademix_tasks_v1` ve `akademix_personal_notes_v1` anahtarlarıyla DOM ve `localStorage` senkronizasyonu kuruldu. Bozuk JSON verisi (`SyntaxError`) ve depolama kotası aşımı (`QuotaExceededError`) durumları `try/catch` bloklarıyla yakalanarak uygulamanın çökmesi önlendi.
4. **Mobil Görünümde Yatay Taşmanın Giderilmesi – Responsive Tasarım (Issue #4):**
   * **Problem:** `320px - 375px` genişlikteki mobil ekranlarda üst menü butonları, arama/filtre araç çubuğu ve modal içi 3 sütunlu form alanları yatay taşmaya (horizontal scroll) yol açıyordu.
   * **Çözüm:** `style.css` içerisinde `.main-two-col > * { min-width: 0; }`, `@media (max-width: 600px)` altında esnek sarma (`flex-wrap: wrap`), tam genişlikte araç çubuğu (`flex-direction: column`), `.modal-task-meta-grid` tek sütun dönüşümü ve `overflow-wrap: anywhere` kuralları uygulanarak tüm ekran boyutlarında taşma sıfırlandı.
5. **Erişilebilirlik (a11y) ve Renk Kontrastı İyileştirmeleri (Issue #5 & #3):**
   * **Problem:** Dinamik görev satırlarındaki onay kutularının ekran okuyucu etiketleri eksikti, hafta/istatistik kartları klavyeyle (`Tab`/`Enter`) tetiklenemiyordu ve aydınlık temada ikincil metin kontrastı sınırdaydı.
   * **Çözüm:** `src/js/a11y.js` ile tüm dinamik kontrollere `aria-label`, kartlara `role="button" tabindex="0"` ve `Enter`/`Space`/`Escape` klavye dinleyicileri eklendi. Aydınlık temada `--text-muted` rengi `#475569` (7.58:1 kontrast) değerine çekilerek WCAG AA standardı tam olarak sağlandı.

---

## 6. Test Senaryoları ve Doğrulama Raporu (Issue #5 & #3)

Uygulama hem gerçek DOM üzerinde çalışan **17 otomatik kabul testi (`TC-01` – `TC-17`)** hem de **6 kapsamlı manuel test senaryosu (`MT-01` – `MT-06`)** ile doğrulanmıştır.

### 6.1. Temel Kullanıcı ve Kalite Test Senaryoları Tablosu

| Test ID | Senaryo | Test Adımları ve Beklenen Sonuç | Durum |
| :--- | :--- | :--- | :---: |
| **TC-01** | Haftalık ders kartları ve detay penceresi | Panoda 4 hafta kartı görüntülenir; karta tıklanınca öğrenme hedefleri ve haftanın görevleri modal pencerede listelenir, kapatılınca gizlenir. | **Başarılı** |
| **TC-02** | Görev tamamlama ve ilerleme güncellemesi | Devam eden bir görevin onay kutusu işaretlendiğinde durumu `completed` olur, satırın üstü çizilir ve genel ilerleme yüzdesi (`%`) artar. | **Başarılı** |
| **TC-03** | Görev durumu kalıcılığı (`localStorage`) | Görev durumu değiştirilip sayfa yenilendiğinde (`restoreTasksFromStorage`) görevin son durumu ve ilerleme yüzdesi korunur. | **Başarılı** |
| **TC-04** | Yeni görev ekleme ve kayıt kalıcılığı | Geçerli başlıkla yeni görev eklendiğinde görev listesi sayısı 1 artar ve yeni görev `localStorage` içerisine kaydedilir. | **Başarılı** |
| **TC-05** | XSS ve zararlı HTML girdisi güvenliği | Görev başlığına `<img src=x onerror=...>` girildiğinde kod çalıştırılmaz; güvenli düz metin olarak görüntülenir. | **Başarılı** |
| **TC-06** | Görev silme işlemi | Sil (`🗑️`) butonuna tıklandığında görev DOM'dan ve `localStorage`'dan kaldırılır, sayaçlar güncellenir. | **Başarılı** |
| **TC-07** | Duruma göre görev filtreleme | *Tamamlanan*, *Devam Eden* veya *Yüksek Öncelik* seçildiğinde yalnızca ilgili durumdaki görevler listelenir. | **Başarılı** |
| **TC-08** | Haftaya göre görev filtreleme | Hafta seçiciden *3. Hafta* seçildiğinde yalnızca `data-week="3"` olan görevler görüntülenir. | **Başarılı** |
| **TC-09** | Türkçe karakter duyarlı anlık arama | Küçük harfle eklenen `"Kullanıcı ihtiyaç listesi"` görevi büyük harfle `"İHTİYAÇ LİSTESİ"` aratıldığında doğru şekilde bulunur. | **Başarılı** |
| **TC-10** | Boş arama sonucu mesajı (#6) | Eşleşmeyen bir ifade aratıldığında `"Aramanızla eşleşen görev bulunamadı"` mesajı görünür; arama temizlendiğinde mesaj gizlenir. | **Başarılı** |
| **TC-11** | Boş görev başlığı doğrulaması (#6) | Görev ekleme formunda başlık boş veya `"   "` bırakılıp kaydedildiğinde görev eklenmez ve başlık altında uyarı mesajı gösterilir. | **Başarılı** |
| **TC-12** | Sıfır görev durumunda ilerleme hesabı | Listede hiç görev yokken sıfıra bölme hatası oluşmaz ve ilerleme `%0` olarak gösterilir. | **Başarılı** |
| **TC-13** | Aydınlık / Karanlık tema geçişi | Tema butonuna tıklandığında `data-theme` (`light`/`dark`) değişir ve tercih `localStorage`'a kaydedilir. | **Başarılı** |
| **TC-14** | Bozuk `localStorage` verisi toleransı | `localStorage`'da bozuk JSON bulunduğunda uygulama çökmez, varsayılan görev listesiyle açılır. | **Başarılı** |
| **TC-15** | Depolama kotası aşımı toleransı | `localStorage.setItem` kota hatası fırlattığında istisna yakalanır ve uygulama çalışmaya devam eder. | **Başarılı** |
| **TC-16** | Form kontrolleri erişilebilirlik etiketleri | Sayfadaki tüm `input`, `select` ve `textarea` alanlarının anlamlı bir `<label>` veya `aria-label` etiketi bulunur. | **Başarılı** |
| **TC-17** | Klavye ile kart erişilebilirliği | Tüm hafta kartları ve istatistik kartları `role="button"` ve `tabindex="0"` niteliklerine sahiptir; `Tab` ve `Enter`/`Space` ile çalışır. | **Başarılı** |
| **MT-01** | Mobil, tablet ve masaüstü responsive görünüm | `320px`, `375px`, `768px` ve `1280px` ekran genişliklerinde yatay taşma (horizontal overflow) oluşmaz, tüm kontroller erişilebilirdir. | **Başarılı** |
| **MT-02** | Yalnızca klavye ile uçtan uca kullanım | Fare kullanmadan `Tab`, `Enter`, `Space` ve `Esc` tuşlarıyla hafta modalı açılıp kapatılır, görev tamamlanır ve filtre uygulanır. | **Başarılı** |
| **MT-03** | Aydınlık ve karanlık tema kontrast kontrolü | Her iki temada da metin ve rozet kontrast oranları WCAG AA (≥ 4.5:1) standardını karşılar. | **Başarılı** |

---

## 7. Sınırlamalar ve Gelecek Çalışmalar

### 7.1. Mevcut Sınırlamalar
1. **Tarayıcı İçi Yerel Depolama:** Proje 1'in istemci odaklı kapsamı gereği veriler `localStorage` üzerinde tutulmaktadır. Kullanıcının farklı bir cihazdan veya tarayıcıdan girmesi durumunda veriler cihazlar arası senkronize edilmez.
2. **İstemci Tarafı Oturum Simülasyonu:** Kullanıcı kayıt ve giriş işlemleri sunucu tarafı JWT/oturum doğrulaması yerine istemci tarafında simüle edilmektedir.
3. **Çevrimiçi AI İçin API Anahtarı Gereksinimi:** Güvenlik ilkeleri (NFR-07) doğrultusunda depoda gömülü API anahtarı bulunmaz; çevrimiçi LLM yanıtları için kullanıcının kendi Gemini/OpenAI anahtarını girmesi gerekir (aksi halde çevrimdışı yerel kural motoru çalışır).

### 7.2. Gelecek Çalışmalar (Proje 2 ve Proje 3 Yol Haritası)
1. **Merkezi İlişkisel Veritabanı ve REST API Entegrasyonu:** Bölüm 4'te tasarlanan 11 tablolu ER şemasının PostgreSQL / SQLite üzerinde gerçek bir arka uç (backend) servisiyle hayata geçirilmesi ve cihazlar arası senkronizasyon sağlanması.
2. **Gerçek Kimlik Doğrulama ve Yetkilendirme:** Şifrelerin sunucu tarafında `bcrypt` / `Argon2` ile özetlenmesi (`sifre_hash`) ve rol tabanlı erişim kontrolü (Öğrenci / Ders Sorumlusu).
3. **PWA (Progressive Web App) ve Bildirim Desteği:** Yaklaşan yüksek öncelikli görevler ve sınav tarihleri için çevrimdışı çalışma (Service Worker) ve tarayıcı bildirimlerinin eklenmesi.

