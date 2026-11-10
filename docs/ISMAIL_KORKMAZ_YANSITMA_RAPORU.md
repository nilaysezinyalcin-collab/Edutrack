# BİREYSEL YANSITMA RAPORU – İSMAİL KORKMAZ

**Ders:** Yazılım Geliştirme · **Proje:** Proje 1 – Etkileşimli Ders Deneyimi Panosu (Edutrack / AkademiX) · **Grup:** 4  
**Öğrenci:** İsmail Korkmaz · **444082** · **Rol:** Test / Kalite Güvencesi Sorumlusu (QA Lead) & Geliştirici  
**Repo:** https://github.com/nilaysezinyalcin-collab/Edutrack · **Tarih:** 10 Kasım 2026  

---

## 1. Bu projede hangi rolü üstlendim? (Giriş ve Proje Özeti)
Proje 1 kapsamında Grup 4 bünyesinde **Test / Kalite Güvencesi Sorumlusu (QA Lead) ve Geliştirici** rolünü üstlendim. Sorumluluğum; görevlerin ve kişisel çalışma notlarının `localStorage` üzerinde oturumlar arası kalıcı olmasını sağlamak (`Issue #2`), gerçek uygulama DOM'u üzerinde çalışan 17 otomatik kabul testini (`src/js/tests.js`) ve kalite raporunu (`docs/test-senaryolari.md`) geliştirmek (`Issue #3`) ve KTÜ 30 kişi kuralına uyumlu Bağıl/Mutlak (`BDS`/`MDS`) not simülatörü ile çoklu platform başlatıcı altyapısına katkıda bulunmaktı.

---

## 2. Hangi görevleri tamamladım?
* **Görev Kalıcılığı (`localStorage` – `#2`):** Görev ekleme, tamamlama (`checkbox`) ve silme işlemlerinin `akademix_tasks_v2` anahtarıyla `localStorage` üzerinde kalıcı olarak saklanmasını ve sayfa yenilendiğinde kayıpsız geri yüklenmesini sağladım.
* **Otomatik Kabul Testleri Altyapısı ve Test Raporu (`#3`):** Eski test sisteminin projenin kullanmadığı sahte modülleri test ettiğini tespit ederek gerçek uygulama kodunu (`src/js/portal.js`, `src/js/a11y.js`) doğrudan test eden 17 senaryoluk otomatik kabul testi motorunu (`src/js/tests.js`) ve `src/test-runner.html` koşucusunu geliştirdim. Test öncesi kullanıcının mevcut `localStorage` verilerini yedekleyip test sonunda geri yükleyen izolasyon mekanizmasını kurguladım ve `docs/test-senaryolari.md` raporunu yazdım.
* **Kişisel Çalışma Notları Kalıcılığı:** "Kişisel Çalışma Notlarım" modülünün sayfa yenilendiğinde sıfırlandığını manuel testlerde tespit ederek `akademix_personal_notes_v1` anahtarıyla çalışan kalıcı CRUD altyapısını kodladım.
* **4 Haftalık Müfredat Döngüsünün Tamamlanması:** 1., 2., 3. ve 4. haftaya ait öğrenme kartlarını ve hedeflerini denetleyerek tüm haftaların eksiksiz tamamlanmasını sağladım.
* **KTÜ AGNO Motoru ve Başlatıcı Betikler:** KTÜ 30 kişi kuralı (`MDS`/`BDS`) ve 50 final barajı hesaplama sihirbazı ile `server.py`, `baslat_windows.bat` ve `baslat.sh` başlatıcılarının oluşturulmasına katkı sundum.

---

## 3. Hangi commit / issue / teknik çıktılar bana ait?

| Çıktı | Tür | Açıklama |
| :--- | :--- | :--- |
| `#2` – Görev kalıcılığı (`localStorage`) | Issue (bana atanmış) | Görev durum değiştirme, yeni görev ekleme ve silmenin `localStorage` ile kalıcı yapılması |
| `#3` – Otomatik kabul testleri ve test raporu | Issue (bana atanmış) | 17 kabul testinin gerçek uygulamaya (`portal.js`, `a11y.js`) taşınması ve `docs/test-senaryolari.md` |
| `efc8a60` | Commit | `fix(tasks): persist task status, add and delete in localStorage` |
| `589307e` | Commit | `test: run acceptance tests against the real app and update test report` |
| `0b99765` | Commit | `fix(notes): persist personal study notes in localStorage across page reloads` |
| `7a0db7b` | Commit | `feat(curriculum): mark all 4 weekly modules as completed` |
| `0059bf4` / `65599af` | Commit | Giriş doğrulama, KTÜ AGNO hesaplayıcı, ders programı, AI asistan ve `server.py` başlatıcıları |
| `src/js/tests.js` & `docs/test-senaryolari.md` | Teknik Çıktı | 17 otomatik kabul testi (`TC-01..17`) ve 6 manuel test (`MT-01..06`) kalite raporu |

---

## 4. Hangi sorunlarla karşılaştım ve nasıl çözdüm?
* **Gerçek Uygulamadan Kopuk Testler (`#3`):** Mevcut `test-runner.html` dosyasının gerçekte kullanılmayan eski JS dosyalarını test ettiğini fark ettim. Kullanılmayan 5 dosyayı temizleyip `tests.js`'yi doğrudan `src/index.html?test=1` üzerinde gerçek DOM ile çalışacak şekilde yeniden yazdım.
* **Türkçe Karakter Arama Hatası (`TC-09`):** Kabul testlerinin ilk koşumunda `TC-09` senaryosu arama kutusuna büyük `"İHTİYAÇ LİSTESİ"` yazıldığında başarısız oldu. Kök neden analizinde JavaScript `toLowerCase()` metodunun Türkçe `'İ'` harfini hatalı dönüştürdüğünü tespit ederek çözümü doğruladım.
* **Erişilebilirlik ve Kontrast Standardı (`WCAG AA`):** Aydınlık temada tamamlanan görevlerin metin renginin okunabilirlik eşiğinin (`4.5:1`) altına düştüğünü tespit ederek CSS renk değişkenlerini güncelledim ve kontrast oranını `4.76:1` seviyesine çıkardım.
* **Yapay zekâ desteği:** Test senaryolarının uç durum (edge-case) kapsamının genişletilmesi, `localStorage` kota/bozuk veri simülasyonları (`TC-14`, `TC-15`) ve hata ayıklama süreçlerinde yapay zekâ araçlarından yararlandım. Üretilen tüm test kodlarını satır satır inceleyerek gerçek tarayıcı üzerinde doğruladım.

---

## 5. Hangi becerileri geliştirdim?
* **Canlı DOM Üzerinde Otomatik Kabul Testi:** Harici bir test çerçevesine bağımlı kalmadan gerçek uygulama DOM'u üzerinde çalışan, kullanıcı verisini yedekleyip geri yükleyen izole test koşucusu geliştirme becerisi kazandım.
* **Gereksinim–Test İzlenebilirliği:** Her fonksiyonel (`FR`) ve fonksiyonel olmayan (`NFR`) gereksinimin somut bir test kanıtıyla doğrulanmasının yazılım kalitesindeki kritik rolünü deneyimledim.
* **Git Sürüm Kontrolü ve Hata Raporlama:** Temiz commit mesajları (`Closes #3`), yama yönetimi ve ekip içi teknik geri bildirim süreçlerinde ileri düzey pratik edindim.

---

## 6. Bir sonraki projede neyi farklı yapacağım?
* **Test güdümlü (`TDD`) yaklaşımı ilk haftadan başlatacağım:** Otomatik kabul testlerini projenin son haftasında değil, her modül kodlanırken eşzamanlı olarak yazacağım.
* **Veri kalıcılığını (`Persistence`) ilk prototipte zorunlu kılacağım:** Yeni eklenen her modülün (ör. kişisel notlar) ilk günden kalıcı depolama katmanına bağlanmasını kontrol edeceğim.
* **Tarayıcılar arası (`Cross-Browser`) testleri otomatikleştireceğim:** Chromium tabanlı tarayıcıların yanı sıra Firefox ve WebKit motorlarında da düzenli test koşumu yapacağım.
