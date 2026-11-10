# BİREYSEL YANSITMA RAPORU (SELF-REFLECTION REPORT)

**T.C. KARADENİZ TEKNİK ÜNİVERSİTESİ**  
**Fen Fakültesi • Yazılım Geliştirme Bölümü • Yazılım Geliştirme Dersi • Proje 1 (Edutrack / AkademiX)**  

* **Öğrenci Adı Soyadı:** Onur Uzun  
* **Öğrenci Numarası:** 444101  
* **Grup Bilgisi:** Grup 4  
* **Projedeki Rolü:** Teknik Dokümantasyon / Sunum Sorumlusu & Geliştirici  
* **Tarih:** 10 Kasım 2026  

---

## 1. Giriş ve Proje Özeti
Bu bireysel yansıtma raporu, Karadeniz Teknik Üniversitesi Fen Fakültesi Yazılım Geliştirme Bölümü Yazılım Geliştirme Dersi kapsamında Grup 4 olarak geliştirdiğimiz **Edutrack (AkademiX – Etkileşimli Ders Deneyimi Panosu)** projesindeki bireysel çalışma sürecimi, üstlendiğim teknik ve dokümantasyon sorumluluklarını, karşılaştığım problemleri ve elde ettiğim kazanımları değerlendirmek üzere hazırlanmıştır. Projemiz; 4 haftalık etkileşimli ders ve öğrenme kartlarını, görev ilerleme takibini, Türkçe duyarlı arama/filtreleme motorunu, KTÜ 30 kişi kuralına uyumlu Bağıl/Mutlak (BDS/MDS) sınav/AGNO simülatörünü, haftalık ders programını ve kişisel çalışma notlarını tek bir duyarlı (responsive) web arayüzünde birleştirmektedir.

---

## 2. Üstlendiğim Görevler ve Projeye Bireysel Katkılarım
Grup 4 bünyesinde **Teknik Dokümantasyon / Sunum Sorumlusu ve Geliştirici** olarak projenin hem ön yüz işlevselliğine hem de kurumsal dokümantasyon standartlarına kavuşması için şu somut çalışmaları gerçekleştirdim:

1. **Görev Arama, Filtreleme ve Form Doğrulama Geliştirmeleri (Issue #6):**
   * Görev arama kutusunda Türkçe büyük/küçük harf (`İ/i`, `I/ı`) dönüşüm sorunlarını çözen `normalizeTrSearch()` fonksiyonunu ve çoklu filtreleme (`filterTasks()`) mekanizmasını geliştirdim.
   * Arama sonucunda hiçbir görev eşleşmediğinde görev listesi alanında kullanıcıya tam olarak `"Aramanızla eşleşen görev bulunamadı"` (`#tasks-empty-message`) mesajını gösteren ve arama temizlendiğinde mesajı otomatik gizleyen `updateTasksEmptyMessage()` yapısını kodladım.
   * Yeni görev ekleme formunda başlık alanı boş bırakıldığında veya yalnızca boşluk karakteri girildiğinde görevin eklenmesini engelleyen ve başlık alanının hemen altında görünür uyarı mesajı (`#modal-t-title-error`) çıkaran doğrulama (`showTaskTitleError()`, `clearTaskTitleError()`) kontrollerini uyguladım.

2. **Arayüz, Duyarlılık (Responsive) ve Erişilebilirlik İyileştirmeleri (Issue #2 & #5):**
   * Dar ekranlarda (320px–375px mobil görünüm) görev ekleme modalında oluşan yatay taşmayı (`.modal-task-meta-grid`) CSS medya sorgularıyla giderdim.
   * Haftalık ders kartlarında (`.week-card`) klavye ile gezinirken (`Tab` / `Enter` / `Space`) oluşan çift odaklanma sorununu düzelttim ve ARIA erişilebilirlik niteliklerini (`aria-invalid`, `aria-describedby`, `role="status"`) entegre ettim.

3. **KTÜ Resmi Şablonuna Uygun Teknik Proje Raporu ve Kullanıcı Dokümanı (Issue #7):**
   * KTÜ Fen Fakültesi Yazılım Geliştirme Bölümü resmi proje raporu şablonuna birebir uygun 25 sayfalı `docs/proje-raporu.pdf`, `docs/proje-raporu.docx` ve `docs/proje-raporu.md` dosyalarını hazırladım.
   * Uygulamanın tüm modüllerini adım adım anlatan kapsamlı Kullanıcı Dokümanını (`docs/kullanici-dokumani.pdf` ve `docs/kullanici-dokumani.md`) oluşturdum.

4. **README.md Yenilemesi ve Proje Sunumu (Issue #7):**
   * Ana dizindeki `README.md` dosyasını temiz bir ortamda yalnızca talimatlar izlenerek çalıştırılabilecek şekilde yeniden yapılandırdım; hatalı dosya yollarını, öğrenci numaralarını ve güvenlik açısından yanıltıcı hazır API anahtarı ifadelerini düzelttim.
   * Proje sunum dosyalarını (`presentation/sunum.pptx`, `presentation/sunum.pdf`, `presentation/sunum.md`) 10 slaytlık profesyonel bir akışla hazırladım.

---

## 3. Karşılaştığım Teknik Zorluklar ve Problem Çözme Sürecim
* **Türkçe Morfolojik Büyük/Küçük Harf Eşleşmesi (TC-09):** Standart JavaScript `toLowerCase()` metodunun Türkçe `'İ'` karakterini birleşik noktalı `'i\u0307'` karakterine dönüştürmesi nedeniyle `"İHTİYAÇ LİSTESİ"` aramasının `"ihtiyaç listesi"` görevini bulamadığını gördüm. Özel bir `normalizeTrSearch()` fonksiyonu yazarak Türkçe karakter dönüşümünü standartlaştırdım ve TC-09 testinin %100 geçmesini sağladım.
* **Mobil Görünümde Modal Yatay Taşması (MT-01):** Görev ekleme modalındaki 3 sütunlu satır içi (`inline`) grid yapısının 375px ekranlarda taşma yarattığını tespit ederek bu stili CSS sınıfına (`.modal-task-meta-grid`) taşıdım ve mobil medya sorgusunda tek sütuna düşürdüm.
* **Resmi Rapor Şablonu ve Türkçe Font Gömme:** PDF rapor üretiminde Türkçe karakterlerin (`Ğ, ğ, İ, ı, Ş, ş`) tüm PDF okuyucularda kusursuz görünmesi için TrueType (`Times New Roman` ve `Calibri`) fontlarını doğrudan PDF akışına gömen bir yapı kurguladım.

---

## 4. Kişisel ve Mesleki Kazanımlarım
Bu proje süresince;
* Kullanıcı girdilerinin doğrulanması (form validation), uç durum (edge-case) yönetimi ve Türkçe yerelleştirme (localization) konularında derinlemesine pratik kazandım.
* Bir yazılım projesinde kod kalitesi kadar teknik dokümantasyonun, izlenebilirlik matrisinin ve kurulum kılavuzunun da projenin sürdürülebilirliği için vazgeçilmez olduğunu deneyimledim.
* Git/GitHub üzerinden Issue odaklı (`#6`, `#7`) çalışma ve ekip içi kod/doküman entegrasyonu becerilerimi geliştirdim.

---

## 5. Sonuç ve Öz Değerlendirme
Proje 1 sürecinde bana atanan geliştirme (Issue #6), arayüz/erişilebilirlik kontrolü ve teknik dokümantasyon/sunum (Issue #7) görevlerinin tamamını eksiksiz ve zamanında yerine getirdim. Grup 4 ekip arkadaşlarımla uyum içinde çalışarak Edutrack (AkademiX) projesinin hem teknik hem de akademik açıdan yüksek standartlarda tamamlanmasına katkı sağladım.

