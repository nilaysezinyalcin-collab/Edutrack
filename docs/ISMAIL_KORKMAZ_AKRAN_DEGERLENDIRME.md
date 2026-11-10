# AKRAN DEĞERLENDİRME FORMU VE RAPORU – İSMAİL KORKMAZ

**T.C. Karadeniz Teknik Üniversitesi • Fen Fakültesi • Yazılım Geliştirme Bölümü**  
**Ders:** Yazılım Geliştirme · **Proje:** Proje 1 (Edutrack / AkademiX) · **Grup:** 4  
**Değerlendiren:** İsmail Korkmaz (`444082`) · **Rol:** Test / Kalite Güvencesi Sorumlusu (QA Lead) & Geliştirici · **Tarih:** 10 Kasım 2026  

---

## 1. Değerlendirme Ölçütleri ve Puanlama Baremi
Her ekip üyesi KTÜ Yazılım Geliştirme Dersi yönergeleri doğrultusunda aşağıdaki 5 temel ölçüt üzerinden hem `1–5` ölçeğinde (`Toplam 25`) hem de `100` puan üzerinden değerlendirilmiştir (`1 = hiç katılmıyorum`, `5 = tamamen katılıyorum` / `20p`):

1. **Görev sorumluluğu (5 / 20p):** Üzerine aldığı işleri zamanında ve beklenen kalitede tamamladı mı?
2. **Teknik katkı (5 / 20p):** Kod, test, tasarım, analiz veya teknik çözüm üretti mi?
3. **İletişim (5 / 20p):** Grup içi iletişimi düzenli ve yapıcı mıydı?
4. **Zaman yönetimi (5 / 20p):** Proje takvimine ve teslim tarihlerine uydu mu?
5. **İş birliği (5 / 20p):** Ekip çalışmasına ve problem çözmeye katkı sağladı mı?

---

## 2. Grup Üyeleri Puanlama Tablosu

| Öğrenci | Rol | Görev Sorumluluğu | Teknik Katkı | İletişim | Zaman Yönetimi | İş Birliği | Toplam (25) | Puan (100) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Nilay Sezin Yalçın (444090)** | Proje Lideri / Geliştirici | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |
| **Oğuzhan İnce (444083)** | Sistem Analisti / Geliştirici | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |
| **Onur Uzun (444101)** | Dokümantasyon / Sunum / Geliştirici | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |
| **İsmail Korkmaz (444082)** | Test / Kalite / Geliştirici (Öz) | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |

---

## 3. Kanıtlar ve Üye Bazlı Değerlendirme Yorumları
*GitHub durumu 10 Kasım 2026 itibarıyla (`v1.0` sürümü yayınlandı, `#1`–`#8` arası tüm issue’lar kapatıldı).*

### 👤 1. Nilay Sezin Yalçın (`444090`) – Proje Lideri / Geliştirici
* **Issue:** `#1` repo yapısının düzenlenmesi (`/src`, `/docs`, `/presentation`), `#8` katkı kontrolü, `server.py` ve başlatıcılar, `v1.0` sürümü; `#1–#8` tüm issue’ların açılması ve görev dağılımı.
* **Commit:** `cd9a2a8` (`refactor: restructure repo into src/docs/presentation and remove duplicate HTML copies`); `2224a20` (`fix(run): serve app from src/ in server.py and launch scripts`); `61f7482` (`fix(run): detect a working Python in Windows launcher`); `e941994` (`repair sunum.pptx so PowerPoint can open it`).
* **Rol çıktısı:** `src/index.html`, `server.py`, `baslat_windows.bat`, `baslat.sh`, `.gitattributes`, `v1.0` sürümü.
* **Yorumum:** Projenin genel koordinasyonunu, toplantı takvimini ve iş bölümü dağılımını başarıyla yönetti. Tek giriş noktalı (`src/index.html`) temiz mimariyi kurdu ve başlatıcı betikleri Windows/Mac ortamlarında doğruladı.

### 👤 2. Oğuzhan İnce (`444083`) – Sistem Analisti / Geliştirici
* **Issue:** `#4` mobil görünümde yatay taşma (`320px–375px`), `#5` erişilebilirlik (form etiketleri, klavye erişimi) ve gereksinim–test izlenebilirlik tablosu.
* **Commit:** `bbfc755` (`fix(css): remove horizontal overflow on mobile (320-375px)`); `1328f3d` (`feat(a11y): add form labels, keyboard access and requirement-test traceability`).
* **Rol çıktısı:** `docs/gereksinim-test-eslestirme.md`, `docs/er_diyagram_v2.png`, `docs/ogrenci_paneli_diyagram_mavi.png`, `src/css/style.css`, `src/js/a11y.js`.
* **Yorumum:** Gereksinim analizi aşamasında 17 Fonksiyonel (`FR`) ve 10 Fonksiyonel Olmayan (`NFR`) gereksinimin dökümünü ve 11 tablolu ilişkisel ER veritabanı şemasını (`er_diyagram_v2.png`) eksiksiz hazırladı. Mobil taşma ve erişilebilirlik görevlerini hızla tamamlayarak kabul testlerimizin (`TC-16`, `TC-17`, `MT-01..03`) tam puanla geçmesini sağladı.

### 👤 3. Onur Uzun (`444101`) – Teknik Dokümantasyon / Sunum / Geliştirici
* **Issue:** `#6` boş arama sonucu mesajı ve görev formu başlık doğrulaması, `#7` README, kullanıcı dokümanı, proje raporu ve sunum.
* **Commit:** `368074a` (`fix: bos arama sonucu mesaji ve gorev formu baslik kontrolu eklendi #6`); `c511346` (`docs: README duzeltildi, kullanici dokumani, proje raporu ve sunum eklendi #7`); `6193a51` (KTÜ resmi şablonlu rapor ve bireysel formlar).
* **Rol çıktısı:** `src/js/portal.js` & `src/index.html` (`#6`), `README.md`, `docs/kullanici-dokumani.pdf`, `docs/proje-raporu.pdf` (`.docx`), `presentation/sunum.pptx` (`.pdf`).
* **Yorumum:** Boş arama sonucu uyarısı, Türkçe karakter duyarlı arama (`TC-09`, `TC-10`) ve boş başlık doğrulaması (`TC-11`) kodlarını eksiksiz geliştirdi; ayrıca `README.md`, Kullanıcı Dokümanı, KTÜ resmi şablonlu Proje Raporu ve Sunum dosyalarını büyük bir titizlikle hazırladı.

### 👤 4. İsmail Korkmaz (`444082`) – Test / Kalite / Geliştirici (Öz Değerlendirme)
* **Issue:** `#2` görev kalıcılığı (`localStorage`), `#3` otomatik kabul testleri ve test raporu.
* **Commit:** `efc8a60` (`fix(tasks): persist task status, add and delete in localStorage`); `589307e` (`test: run acceptance tests against the real app and update test report`); `0b99765` (`fix(notes): persist personal study notes in localStorage across page reloads`); `7a0db7b` (`feat(curriculum): mark all 4 weekly modules as completed`).
* **Rol çıktısı:** `src/js/tests.js` (17 kabul testi), `src/test-runner.html`, `docs/test-senaryolari.md`, `src/js/portal.js`.
* **Yorumum:** 17 adet otomatik kabul testini gerçek uygulama DOM'uyla buluşturdum, test koşucu altyapısını ve test raporunu (`docs/test-senaryolari.md`) hazırladım, görev ve kişisel notların `localStorage` kalıcılığını sağladım ve 4 haftalık müfredatı tamamladım.

---

## 4. Genel Grup Değerlendirmesi ve Sonuç
Grup 4 olarak Proje 1 boyunca son derece uyumlu, dengeli ve profesyonel bir işbirliği sergilenmiştir. Hiçbir grup üyesi sorumluluklarından geri durmamış, iş yükü adil bir biçimde paylaşılmış ve tüm aşamalar ortak mutabakatla başarıyla tamamlanmıştır. Tüm grup üyelerime projeye sağladıkları yüksek katkı ve özveri nedeniyle en yüksek puanı (`25 / 25` — `100 / 100`) takdir ediyorum.
