# AKRAN DEĞERLENDİRME FORMU VE RAPORU (PEER REVIEW REPORT)

**T.C. KARADENİZ TEKNİK ÜNİVERSİTESİ**  
**Fen Fakültesi • Yazılım Geliştirme Bölümü • Yazılım Geliştirme Dersi • Proje 1 (Edutrack / AkademiX)**  

* **Değerlendirmeyi Yapan Öğrenci:** Onur Uzun  
* **Öğrenci Numarası:** 444101  
* **Grup Bilgisi:** Grup 4  
* **Projedeki Rolü:** Teknik Dokümantasyon / Sunum Sorumlusu & Geliştirici  
* **Tarih:** 10 Kasım 2026  

---

## 1. Değerlendirme Kriterleri ve Puanlama Baremi
Grup üyelerinin proje süresince ortaya koyduğu performans, KTÜ Yazılım Geliştirme Dersi yönergeleri doğrultusunda aşağıdaki 5 temel başlık altında değerlendirilmiştir (Her kriter 20 puandır):

1. **Görev Bilinci ve Sorumluluk:** Kendisine atanan görevleri zamanında ve eksiksiz sahiplenme (20p)
2. **Teknik Katkı ve Kod Kalitesi:** Projenin geliştirilmesine sunulan somut kod, tasarım veya analiz katkısı (20p)
3. **Ekip İçi İletişim ve İşbirliği:** Toplantılara katılım, şeffaf bilgi paylaşımı ve yapıcı tutum (20p)
4. **Problem Çözme ve İnisiyatif Alma:** Karşılaşılan teknik tıkanıklıklarda çözüm üretme ve ekibe destek olma (20p)
5. **Zaman Yönetimi ve Teslimat:** Sprint/haftalık teslim tarihlerine riayet etme (20p)

---

## 2. Grup Üyeleri Puanlama ve Değerlendirme Tablosu

| Öğrenci No | Adı Soyadı | Projedeki Rolü | Puan (100) | Puan (5.0) | Katkı Oranı | Genel Değerlendirme Notu |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **444090** | **Nilay Sezin Yalçın** | Proje Lideri & Frontend | **100 / 100** | **5.0 / 5.0** | %25 | Üstün Liderlik ve Arayüz Mimarisi |
| **444083** | **Oğuzhan İnce** | Sistem Analisti & Geliştirici | **100 / 100** | **5.0 / 5.0** | %25 | Eksiksiz Gereksinim ve ER Modelleme |
| **444082** | **İsmail Korkmaz** | Test / Kalite Sorumlusu | **100 / 100** | **5.0 / 5.0** | %25 | Kapsamlı Kabul Testleri ve Kalite Güvencesi |
| **444101** | **Onur Uzun** | Dokümantasyon & Geliştirici (Öz) | **100 / 100** | **5.0 / 5.0** | %25 | Arama/Validasyon Geliştirmesi ve Dokümantasyon |

---

## 3. Üye Bazlı Detaylı Değerlendirme Gerekçeleri

### 👤 1. Nilay Sezin Yalçın (Proje Lideri & Geliştirici - 100 / 100)
* **Katkıları:** Projenin başlangıcından teslimine kadar ekip içi görev dağılımını, toplantı planlamasını ve ana uygulama iskeletini (`src/`) başarıyla yönetmiştir. Duyarlı (responsive) CSS mimarisinin kurulmasında ve çoklu platform başlatıcılarının iyileştirilmesinde (Issue #4, #8) kritik rol üstlenmiştir.
* **Gözlem:** Yapıcı liderliği ve hızlı koordinasyonu sayesinde ekip içi süreçler hiçbir aksama olmadan ilerlemiştir.

### 👤 2. Oğuzhan İnce (Sistem Analisti & Geliştirici - 100 / 100)
* **Katkıları:** Paydaş ve ihtiyaç analizini yürüterek 17 Fonksiyonel (FR-01..17) ve 10 Fonksiyonel Olmayan (NFR-01..10) gereksinimi yapılandırmıştır. 11 ilişkisel tablodan oluşan ER veritabanı diyagramını (`docs/er_diyagram_v2.png`) ve uygulama akış şemasını (`docs/ogrenci_paneli_diyagram_mavi.png`) hazırlamıştır.
* **Gözlem:** Sistemin mimari ve veri modeli temellerini analitik bir titizlikle kurgulayarak hem geliştirme hem de raporlama sürecimizi büyük ölçüde kolaylaştırmıştır.

### 👤 3. İsmail Korkmaz (Test / Kalite Güvencesi Sorumlusu & Geliştirici - 100 / 100)
* **Katkıları:** Gerçek uygulama DOM'u üzerinde çalışan 17 otomatik kabul testini (`src/js/tests.js`) ve `test-runner.html` altyapısını geliştirmiştir (Issue #3). Kişisel çalışma notlarının `localStorage` kalıcılığını sağlamış, 4 haftalık müfredat kartlarını tamamlamış ve `docs/test-senaryolari.md` raporunu oluşturmuştur.
* **Gözlem:** Yazdığı kapsamlı testler sayesinde Türkçe arama ve kontrast gibi ince hataları erken aşamada yakalamamızı sağlamıştır.

### 👤 4. Onur Uzun (Öz Değerlendirme - 100 / 100)
* **Katkıları:** Görev arama/filtreleme modülündeki boş arama sonucu uyarısını ve görev ekleme formundaki boş başlık doğrulamasını (Issue #6) kodladım. Mobil taşma ve klavye erişilebilirliği kontrollerini tamamladım. `README.md`, Kullanıcı Dokümanı (`docs/kullanici-dokumani.pdf`), KTÜ şablonlu Proje Raporu (`docs/proje-raporu.pdf` / `.docx`) ve Sunum (`presentation/sunum.pptx` / `.pdf`) dosyalarını (Issue #7) eksiksiz hazırladım.

---

## 4. Genel Grup Değerlendirmesi ve Sonuç
Grup 4 olarak Proje 1 süresince her üyenin kendi uzmanlık alanında tam sorumluluk aldığı, birbirinin çıktısını denetlediği ve desteklediği örnek bir takım çalışması yürüttük. Tüm ekip arkadaşlarımın projeye katkısı eşit ve üst düzeyde olduğundan her birine tam puan (100 / 100) veriyorum.

