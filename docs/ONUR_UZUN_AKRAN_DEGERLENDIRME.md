# AKRAN DEĞERLENDİRME FORMU VE RAPORU – ONUR UZUN

**Ders:** Yazılım Geliştirme · **Proje:** Proje 1 (Edutrack / AkademiX) · **Grup:** 4  
**Değerlendiren:** Onur Uzun (`444101`) · **Rol:** Teknik Dokümantasyon / Sunum Sorumlusu & Geliştirici · **Tarih:** 10 Kasım 2026  

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
| **İsmail Korkmaz (444082)** | Test / Kalite / Geliştirici | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |
| **Onur Uzun (444101)** | Dokümantasyon / Sunum / Geliştirici (Öz) | 5 | 5 | 5 | 5 | 5 | **25** | **100 / 100** |

---

## 3. Kanıtlar ve Üye Bazlı Değerlendirme Yorumları
*GitHub durumu 10 Kasım 2026 itibarıyla (`v1.0` sürümü yayınlandı, `#1`–`#8` arası tüm issue’lar kapatıldı).*

### 👤 1. Nilay Sezin Yalçın (`444090`) – Proje Lideri / Geliştirici
* **Issue:** `#1` repo yapısının düzenlenmesi (`/src`, `/docs`, `/presentation`), `#8` katkı kontrolü, `server.py` ve başlatıcılar, `v1.0` sürümü; ayrıca `#1–#8` tüm issue’ların açılması ve görev dağılımı.
* **Commit:** `cd9a2a8` (`refactor: restructure repo into src/docs/presentation and remove duplicate HTML copies`); `2224a20` (`fix(run): serve app from src/ in server.py and launch scripts`); `61f7482` (`fix(run): detect a working Python in Windows launcher`); `e941994` (`repair sunum.pptx so PowerPoint can open it`).
* **Rol çıktısı:** `src/index.html`, `server.py`, `baslat_windows.bat`, `baslat.sh`, `.gitattributes`, `v1.0` sürümü.
* **Yorumum:** Projenin başlangıcından teslimine kadar ekip içi görev dağılımını, repo mimarisini ve sürüm kontrol düzenini üstün bir liderlikle yönetti. Windows başlatıcı hatasını ve sunum dosyasını hızla onararak teslim sürecini güvenceye aldı.

### 👤 2. Oğuzhan İnce (`444083`) – Sistem Analisti / Geliştirici
* **Issue:** `#4` mobil görünümde yatay taşmanın giderilmesi (`320px–375px`), `#5` erişilebilirlik (form etiketleri, klavye erişimi) ve gereksinim–test izlenebilirlik tablosu.
* **Commit:** `bbfc755` (`fix(css): remove horizontal overflow on mobile (320-375px)`); `1328f3d` (`feat(a11y): add form labels, keyboard access and requirement-test traceability`).
* **Rol çıktısı:** `docs/gereksinim-test-eslestirme.md`, `docs/er_diyagram_v2.png`, `docs/ogrenci_paneli_diyagram_mavi.png`, `src/css/style.css`, `src/js/a11y.js`.
* **Yorumum:** 17 Fonksiyonel (`FR-01..17`) ve 10 Fonksiyonel Olmayan (`NFR-01..10`) gereksinimi, 11 tablolu ilişkisel ER modelini ve izlenebilirlik matrisini eksiksiz hazırladı. Mobil taşma ve erişilebilirlik görevlerini de zamanında tamamlayarak raporlama sürecimize sağlam bir temel sundu.

### 👤 3. İsmail Korkmaz (`444082`) – Test / Kalite / Geliştirici
* **Issue:** `#2` görev kalıcılığı (`localStorage`), `#3` otomatik kabul testleri ve test raporu.
* **Commit:** `efc8a60` (`fix(tasks): persist task status, add and delete in localStorage`); `589307e` (`test: run acceptance tests against the real app and update test report`); `0b99765` (`fix(notes): persist personal study notes in localStorage across page reloads`); `7a0db7b` (`feat(curriculum): mark all 4 weekly modules as completed`).
* **Rol çıktısı:** `src/js/tests.js` (17 kabul testi), `src/test-runner.html`, `docs/test-senaryolari.md`, `src/js/portal.js` (`localStorage` kalıcılığı ve KTÜ AGNO motoru).
* **Yorumum:** Gerçek uygulama DOM'u üzerinde çalışan 17 otomatik kabul testini geliştirerek Türkçe arama ve kontrast gibi ince hataları erken aşamada yakalamamızı sağladı. Kişisel notların kalıcılığı gibi ek iyileştirmelerle projeye çok değerli katkılar sundu.

### 👤 4. Onur Uzun (`444101`) – Dokümantasyon / Sunum / Geliştirici (Öz Değerlendirme)
* **Issue:** `#6` boş arama sonucu mesajı ve görev formu başlık doğrulaması, `#7` README, kullanıcı dokümanı, proje raporu ve sunum.
* **Commit:** `368074a` (`fix: bos arama sonucu mesaji ve gorev formu baslik kontrolu eklendi #6`); `c511346` (`docs: README duzeltildi, kullanici dokumani, proje raporu ve sunum eklendi #7`); `6193a51` (KTÜ resmi şablonlu rapor ve bireysel formlar).
* **Rol çıktısı:** `src/js/portal.js` & `src/index.html` (`#6`), `README.md`, `docs/kullanici-dokumani.pdf` (`.md`), `docs/proje-raporu.pdf` (`.docx`, `.md`), `presentation/sunum.pptx` (`.pdf`, `.md`).
* **Yorumum:** Görev arama/filtreleme modülündeki boş arama uyarısını, Türkçe karakter uyumunu ve boş başlık doğrulamasını (`#6`) kodladım; `README.md`, Kullanıcı Dokümanı, KTÜ şablonlu Proje Raporu ve Sunum dosyalarını (`#7`) eksiksiz tamamladım.

---

## 4. Genel Grup Değerlendirmesi ve Sonuç
Grup 4 olarak Proje 1 süresince her üyenin kendi uzmanlık alanında tam sorumluluk aldığı, birbirinin çıktısını denetlediği ve desteklediği örnek bir takım çalışması yürüttük. Tüm ekip arkadaşlarımın projeye katkısı üst düzeyde olduğundan her birine tam puan (`25 / 25` — `100 / 100`) takdir ediyorum.
