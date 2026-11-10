# BİREYSEL YANSITMA RAPORU – ONUR UZUN

**T.C. Karadeniz Teknik Üniversitesi • Fen Fakültesi • Yazılım Geliştirme Bölümü**  
**Ders:** Yazılım Geliştirme · **Proje:** Proje 1 – Etkileşimli Ders Deneyimi Panosu (Edutrack / AkademiX) · **Grup:** 4  
**Öğrenci:** Onur Uzun · **444101** · **Rol:** Teknik Dokümantasyon / Sunum Sorumlusu & Geliştirici  
**Repo:** https://github.com/nilaysezinyalcin-collab/Edutrack · **Tarih:** 10 Kasım 2026  

---

## 1. Bu projede hangi rolü üstlendim? (Giriş ve Proje Özeti)
Proje 1 kapsamında Grup 4 bünyesinde **Teknik Dokümantasyon / Sunum Sorumlusu ve Geliştirici** rolünü üstlendim. Sorumluluğum; hem görev arama/filtreleme ve form doğrulama özelliklerini (`Issue #6`) kodlamak hem de projenin `README.md`, Kullanıcı Dokümanı, KTÜ resmi şablonlu Teknik Proje Raporu ve Sunum dosyalarını (`Issue #7`) eksiksiz hazırlamaktı.

---

## 2. Hangi görevleri tamamladım?
* **Boş Arama Sonucu Mesajı ve Türkçe Arama (`#6`):** Görev arama kutusunda Türkçe büyük/küçük harf (`İ/i`, `I/ı`) dönüşüm sorununu çözen `normalizeTrSearch()` fonksiyonunu ve eşleşen görev bulunamadığında `"Aramanızla eşleşen görev bulunamadı"` (`#tasks-empty-message`) mesajını gösteren `updateTasksEmptyMessage()` yapısını kodladım.
* **Görev Ekleme Formu Başlık Doğrulaması (`#6`):** Yeni görev ekleme modalında başlık alanı boş bırakıldığında veya yalnızca boşluk karakteri girildiğinde görevin eklenmesini engelleyen ve başlık alanının hemen altında görünür uyarı mesajı (`#modal-t-title-error`) çıkaran doğrulama (`showTaskTitleError()`, `clearTaskTitleError()`) kontrollerini geliştirdim.
* **Arayüz, Mobil Taşma ve Erişilebilirlik Kontrolleri (`#2`, `#4`, `#5`):** Dar ekranlarda (`320px–375px`) görev ekleme modalındaki 3 sütunlu yapının yatay taşmasını önleyen `.modal-task-meta-grid` medya sorgusunu ve hafta kartlarında klavye odak/ARIA niteliklerini iyileştirdim.
* **README.md Yenilemesi (`#7`):** Ana dizindeki `README.md` dosyasını temiz bir ortamda yalnızca talimatlar izlenerek çalıştırılabilecek şekilde yeniden yazdım; hatalı dosya yollarını, öğrenci numaralarını ve güvenlik açısından yanıltıcı hazır API anahtarı ifadelerini düzelttim.
* **Kullanıcı Dokümanı ve KTÜ Şablonlu Proje Raporu (`#7`):** Uygulamanın tüm modüllerini adım adım anlatan `docs/kullanici-dokumani.pdf` (`.md`) kılavuzunu ve KTÜ Fen Fakültesi Yazılım Geliştirme Bölümü resmi şablonuna birebir uygun 25 sayfalı `docs/proje-raporu.pdf` (`.docx`, `.md`) raporunu hazırladım.
* **Proje Sunumu (`#7`):** Projenin amacını, mimarisini, 11 tablolu veritabanı şemasını ve demo akışını içeren `presentation/sunum.pptx`, `presentation/sunum.pdf` ve `presentation/sunum.md` dosyalarını hazırladım.

---

## 3. Hangi commit / issue / teknik çıktılar bana ait?

| Çıktı | Tür | Açıklama |
| :--- | :--- | :--- |
| `#6` – Arama sonucu mesajı ve form başlık doğrulaması | Issue (bana atanmış) | `"Aramanızla eşleşen görev bulunamadı"` mesajı ve boş görev başlığı engelleme |
| `#7` – README, kullanıcı dokümanı, proje raporu ve sunum | Issue (bana atanmış) | `README.md`, `docs/kullanici-dokumani.pdf`, `docs/proje-raporu.pdf`/`.docx`, `presentation/sunum.pptx` |
| `368074a` | Commit | `fix: bos arama sonucu mesaji ve gorev formu baslik kontrolu eklendi #6` |
| `c511346` | Commit | `docs: README duzeltildi, kullanici dokumani, proje raporu ve sunum eklendi #7` |
| `6193a51` | Commit | `docs: KTU resmi proje raporu sablonu, yansitma ve akran degerlendirme formlari eklendi #7` |
| `docs/proje-raporu.pdf` & `.docx` | Teknik Çıktı | KTÜ resmi şablonuna uygun 25 sayfalı teknik proje raporu |
| `docs/kullanici-dokumani.pdf` | Teknik Çıktı | Adım adım son kullanıcı uygulama kılavuzu |
| `presentation/sunum.pptx` & `.pdf` | Teknik Çıktı | 10 slaytlık Proje 1 final sunumu |

---

## 4. Hangi sorunlarla karşılaştım ve nasıl çözdüm?
* **Türkçe Morfolojik Büyük/Küçük Harf Eşleşmesi (`TC-09`):** Standart JavaScript `toLowerCase()` metodunun Türkçe `'İ'` karakterini birleşik noktalı `'i\u0307'` karakterine dönüştürmesi nedeniyle `"İHTİYAÇ LİSTESİ"` aramasının `"ihtiyaç listesi"` görevini bulamadığını tespit ettim. Özel `normalizeTrSearch()` fonksiyonu ile Türkçe karakter dönüşümünü standartlaştırarak `TC-09` testinin %100 geçmesini sağladım.
* **Mobil Görünümde Modal Yatay Taşması (`MT-01`):** Görev ekleme modalındaki 3 sütunlu satır içi (`inline`) grid yapısının `375px` ekranlarda taşma yarattığını tespit ederek bu stili `.modal-task-meta-grid` CSS sınıfına taşıdım ve mobil medya sorgusunda tek sütuna düşürdüm.
* **Resmi Rapor Şablonu ve Türkçe Font Gömme:** PDF rapor üretiminde Türkçe karakterlerin (`Ğ, ğ, İ, ı, Ş, ş`) tüm PDF okuyucularda kusursuz görünmesi için Windows TrueType (`Times New Roman` ve `Calibri`) fontlarını doğrudan PDF akışına gömen bir yapı kurguladım.
* **Yapay zekâ desteği:** Kod incelemesi, hata ayıklama ve doküman şablonlarının yapılandırılmasında yapay zekâ asistanından destek aldım. Dersin kurallarına uygun olarak üretilen her kod parçasını ve dokümanı satır satır inceledim, tarayıcıda ve test koşucusunda (`src/test-runner.html`) bizzat doğruladım.

---

## 5. Hangi becerileri geliştirdim?
* **Form Doğrulama ve Yerelleştirme:** Kullanıcı girdilerinin doğrulanması (form validation), uç durum (edge-case) yönetimi ve Türkçe karakter duyarlı arama algoritmaları geliştirme konusunda pratik kazandım.
* **Teknik Dokümantasyon ve İzlenebilirlik:** Bir yazılım projesinde kod kalitesi kadar kurumsal şablona uygun teknik raporlamanın, gereksinim-test izlenebilirliğinin ve temiz kurulum kılavuzunun önemini deneyimledim.
* **Git ve GitHub İşbirliği:** Terminal üzerinden `fetch`, `rebase`, `commit` ve `push` süreçlerini yönetmeyi ve Issue numaralarıyla (`#6`, `#7`) izlenebilir commit atmayı öğrendim.

---

## 6. Bir sonraki projede neyi farklı yapacağım?
* **Dokümantasyonu geliştirme ile eşzamanlı yürüteceğim:** Rapor ve sunum hazırlığını son günlere bırakmak yerine her hafta tamamlanan modülün dokümantasyonunu o haftanın sonunda güncelleyeceğim.
* **Üretilen ikili (binary) dosyaları farklı programlarda hemen açıp doğrulayacağım:** `.pptx`, `.docx` ve `.pdf` çıktılarını commit etmeden önce hem masaüstü Office uygulamasında hem de tarayıcıda açarak format bütünlüğünü kontrol edeceğim.
* **Uç durum (edge-case) testlerini kodlama öncesinde yazacağım:** Boş girdi, yalnızca boşluk karakteri veya Türkçe büyük harf gibi durumları fonksiyonu yazarken ilk adım olarak ele alacağım.
