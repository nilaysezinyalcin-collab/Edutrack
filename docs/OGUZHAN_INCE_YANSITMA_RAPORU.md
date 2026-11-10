# BİREYSEL YANSITMA RAPORU (SELF-REFLECTION REPORT)

**T.C. KARADENİZ TEKNİK ÜNİVERSİTESİ**  
**Fen Fakültesi • Yazılım Geliştirme Bölümü • Yazılım Geliştirme Dersi • Proje 1 (Edutrack / AkademiX)**  

* **Öğrenci Adı Soyadı:** Oğuzhan İnce  
* **Öğrenci Numarası:** 444083  
* **Grup Bilgisi:** Grup 4  
* **Projedeki Rolü:** Sistem Analisti & Geliştirici  
* **Tarih:** 10 Kasım 2026  
* **Depo:** [github.com/nilaysezinyalcin-collab/Edutrack](https://github.com/nilaysezinyalcin-collab/Edutrack)  

---

## 1. Giriş ve Proje Özeti
Bu bireysel yansıtma raporu, Karadeniz Teknik Üniversitesi Fen Fakültesi Yazılım Geliştirme Bölümü Yazılım Geliştirme Dersi kapsamında Grup 4 olarak hayata geçirdiğimiz **Edutrack (AkademiX – Etkileşimli Ders Deneyimi Panosu)** projesindeki bireysel sorumluluklarımı, sistem analizi, veri modelleme ve ön yüz geliştirme çalışmalarımı, karşılaştığım teknik zorlukları ve edindiğim mesleki kazanımları değerlendirmek üzere hazırlanmıştır. Projemiz; öğrencilerin 4 haftalık modüler ders konularını, öğrenme kazanımlarını, bireysel görevlerini, haftalık ders programlarını ve KTÜ 30 kişi kuralına uyumlu sınav/AGNO hesaplamalarını tek bir merkezden yönetebilmelerini sağlayan modern, duyarlı ve erişilebilir bir web uygulamasıdır.

---

## 2. Üstlendiğim Görevler ve Projeye Bireysel Katkılarım
Grup 4 bünyesinde **Sistem Analisti ve Geliştirici** olarak projenin gereksinim mühendisliği, sistem tasarımı, veri mimarisi ve ön yüz optimizasyon aşamalarında şu somut çalışmaları gerçekleştirdim:

1. **Paydaş Analizi ve Gereksinim Mühendisliği (FR & NFR Dökümü):**
   * Proje yönergesini ve öğrenci/öğretim elemanı paydaş ihtiyaçlarını analiz ederek sistemin sağlaması gereken **17 Fonksiyonel Gereksinimi (`FR-01` – `FR-17`)** ve **10 Fonksiyonel Olmayan Gereksinimi (`NFR-01` – `NFR-10`)** kabul kriterleri ve öncelik seviyeleriyle birlikte tanımladım.
   * Gereksinimlerin kaynak kod modülleri ve otomatik/manuel kabul testleriyle (`TC-01..17`, `MT-01..06`) eşleştiği **Gereksinim – Test İzlenebilirlik Matrisini (`docs/gereksinim-test-eslestirme.md`)** oluşturdum.

2. **11 Tablolu İlişkisel Veritabanı Tasarımı (ER Diyagramı):**
   * Projenin istemci tarafındaki `localStorage` veri yapısının temelini oluşturan ve gelecek aşamalarda (Proje 2 / Proje 3) doğrudan ilişkisel veritabanına taşınabilecek **3. Normal Form (3NF)** uyumlu 11 tablolu veri modelini (`OGRENCI`, `DERSLER`, `HAFTALIK_KARTLAR`, `DERS_PROGRAMI`, `GOREVLER`, `OGRENCI_GOREV`, `SINAV_NOTLARI`, `SINAV_ORTALAMASI`, `KISISEL_NOTLAR`, `AYARLAR`, `ILERLEME`) kurguladım.
   * Tablolar arasındaki Birincil Anahtar (`PK`), Yabancı Anahtar (`FK`), Tekil Anahtar (`UK`) ve `1:1`, `1:N`, `M:N` kardinalite ilişkilerini gösteren **`docs/er_diyagram_v2.png`** şemasını çizdim.

3. **Sistem İş Akışı ve Öğrenci Paneli Modül Tasarımı:**
   * Kullanıcının uygulamayı açmasından itibaren Kayıt/Giriş doğrulaması, Öğrenci Paneli ve 5 ana alt modül (Kişisel Notlar, Haftalık Ders Kartları, Görev Yönetimi ve İlerleme Çubuğu, Sınav/Ortalama Hesaplama, Tema Ayarları) arasındaki etkileşimi modelleyen **`docs/ogrenci_paneli_diyagram_mavi.png`** akış diyagramını hazırladım.

4. **Mobil Taşma ve Responsive Düzen Düzeltmesi (Issue #4):**
   * Mobil ve dar ekran genişliklerinde (<768px, 320–375px) sayfanın yatayda taşmasına (horizontal scroll) neden olan CSS flex/grid container genişlik hatalarını tespit ettim.
   * `src/css/style.css` dosyasında `box-sizing: border-box`, `max-width: 100%` ve medya sorgusu optimizasyonlarını gerçekleştirerek yatay taşmayı tamamen engelledim (`bbfc755 fix(css): remove horizontal overflow on mobile (320-375px)`).

5. **Form Erişilebilirliği (a11y) ve Klavye Navigasyonu (Issue #5):**
   * WCAG 2.1 AA erişilebilirlik standartları doğrultusunda form etiketlerini (`<label for="...">`), klavye erişilebilirliğini (focus göstergeleri, tabindex), ARIA özniteliklerini ve ekran okuyucu uyumluluğunu geliştirdim (`1328f3d feat(a11y): add form labels, keyboard access and requirement-test traceability`).

6. **Veri Modeli – Ön Yüz Entegrasyonu Desteği:**
   * Tasarlanan veri şemasının `src/js/portal.js` içerisindeki JSON veri yapılarına (`akademix_tasks_v2`, `akademix_personal_notes_v1`, `akademix_schedule_v1`, `portal_theme`) tutarlı biçimde eşlenmesinde geliştirici ekip arkadaşlarımla birlikte çalıştım.

---

## 3. Karşılaştığım Teknik Zorluklar ve Problem Çözme Sürecim
* **İlişkisel Şema ile İstemci Tarafı (`localStorage`) Dengesi:** Proje 1 kapsamında harici bir veritabanı sunucusu kullanılmadan tüm verilerin tarayıcıda tutulması gerekiyordu. Hem akademik açıdan eksiksiz bir 11 tablolu ilişkisel ER modeli kurgulamak hem de bunu `localStorage` anahtarlarına kayıpsız eşlemek için varlıkları modüler JSON koleksiyonları olarak modelledim.
* **Mobil Ekranlarda Yatay Taşma Hatası (Issue #4):** Özellikle 320px–375px dar mobil ekranlarda flex kapsayıcıların ve taşan tabloların tüm sayfa gövdesini sağa doğru kaydırdığını belirledim. Chrome DevTools mobil emülatörü ile taşma kaynaklarını izole edip `overflow-x: hidden`, esnek `minmax()` ve yüzde bazlı genişlik kuralları uygulayarak mobil deneyimi kusursuzlaştırdım.
* **Form Semantiği ve WCAG Erişilebilirlik Standartları (Issue #5):** Ekran okuyucuların form alanlarını düzgün tanıyamaması ve klavye gezintisinde odak halkalarının kaybolması sorununu; semantik `<label>` etiketleri, `aria-label` öznitelikleri ve özel `:focus-visible` CSS stilleri ile standartlara tam uyumlu hale getirdim.
* **Çoka-Çok (M:N) Görev İlişkisinin Modellenmesi:** Haftalık ders kartlarına bağlı görevlerin her öğrenci için ayrı tamamlanma durumu taşıyabilmesi amacıyla `GOREVLER` ile `OGRENCI` arasında `OGRENCI_GOREV` ara tablosunu ve genel özet için `1:1` `ILERLEME` tablosunu tasarlayarak veri tekrarını önledim.
* **Gereksinim ve Test Senaryosu Hizalaması:** Geliştirme ilerledikçe eklenen yeni doğrulama kurallarının (boş başlık engelleme, Türkçe karakterli arama, boş arama mesajı) `FR-02` ve `FR-11` gereksinimleriyle ve `TC-09..11` testleriyle tam uyumlu kalmasını sağladım.

---

## 4. Kişisel ve Mesleki Kazanımlarım
Bu proje süresince;
* Yazılım geliştirme yaşam döngüsünde kodlamaya geçmeden önce yapılan sağlam bir gereksinim analizi ve veri modellemesinin, sonradan çıkabilecek mimari hataları nasıl önlediğini bizzat deneyimledim.
* Varlık-İlişki (ER) diyagramları, akış şemaları ve Gereksinim – Test İzlenebilirlik Matrisi (RTM) hazırlama konusunda kurumsal düzeyde yetkinlik kazandım.
* Mobil odaklı responsive web geliştirme, CSS yerleşim teknikleri ve WCAG AA erişilebilirlik ilkelerinin yazılım kalitesindeki kritik yerini kavradım.
* Çok kişili bir yazılım ekibinde analist, geliştirici ve test sorumlusu arasındaki teknik iletişimin ve GitHub issue/commit iş akışının önemini tecrübe ettim.

---

## 5. Bir Sonraki Projede Farklı Yapacaklarım
* Gereksinim ve analiz çıktılarını projenin ilk gününden itibaren Figma/wireframe prototipleriyle destekleyerek ekibe daha erken görsel netlik sağlayacağım.
* Erişilebilirlik ve responsive denetimlerini geliştirme sonrasında değil, bileşen geliştirme sürecinin içine baştan dahil edeceğim.
* Ekip içi analiz toplantılarını düzenli haftalık sprint retrospektifleri ile daha yapılandırılmış hale getireceğim.

---

## 6. Sonuç ve Öz Değerlendirme
Proje 1 kapsamında Sistem Analisti ve Geliştirici olarak üstlendiğim tüm analiz, veri modelleme, diyagram tasarım, izlenebilirlik, mobil responsive ve erişilebilirlik görevlerini eksiksiz, zamanında ve yüksek kalite standartlarında tamamladım. Grup 4 ekip arkadaşlarımla uyumlu ve üretken bir işbirliği yürüterek projenin sağlam bir mühendislik temeli üzerine inşa edilmesine katkıda bulundum.
