# BİREYSEL YANSITMA RAPORU (SELF-REFLECTION REPORT)

**T.C. KARADENİZ TEKNİK ÜNİVERSİTESİ**  
**Yazılım Geliştirme Dersi • Proje 1 (AkademiX)**  

* **Öğrenci Adı Soyadı:** İsmail Korkmaz  
* **Öğrenci Numarası:** 444082  
* **Grup Bilgisi:** Grup 4  
* **Projedeki Rolü:** Test / Kalite Güvencesi Sorumlusu (QA Lead) & Geliştirici  
* **Tarih:** 10 Kasım 2026  

---

## 1. Giriş ve Proje Özeti
Bu yansıtma raporu, Karadeniz Teknik Üniversitesi Yazılım Mühendisliği bölümü Yazılım Geliştirme Dersi kapsamında Grup 4 olarak geliştirdiğimiz **AkademiX (Etkileşimli Ders ve Öğrenci Başarı Panosu)** projesindeki bireysel çalışma sürecimi, üstlendiğim sorumlulukları, karşılaştığım teknik zorlukları ve elde ettiğim kazanımları değerlendirmek üzere hazırlanmıştır. Projemiz; 4 haftalık modüler teknik müfredat takibi, KTÜ 30 kişi kuralına tam uyumlu Bağıl/Mutlak (BDS/MDS) not simülatörü, dinamik haftalık ders programı ve yapay zeka destekli akademik danışman özelliklerini bütünleşik bir mimaride sunmaktadır.

---

## 2. Üstlendiğim Görevler ve Projeye Bireysel Katkılarım
Grup 4 bünyesinde **Test ve Kalite Güvencesi Sorumlusu (QA Lead)** olarak projenin teknik doğruluğunu, standartlara uyumunu ve son kullanıcı deneyimini en üst seviyeye çıkarmak için şu somut çalışmaları gerçekleştirdim:

1. **Otomatik Kabul Testleri Altyapısının Kurulması (Issue #3):**
   * Eski test sisteminin projenin kullanmadığı sahte modülleri test ettiğini tespit ederek gerçek uygulama kodunu (`src/js/portal.js`, `src/js/a11y.js`) doğrudan test eden 17 maddelik otomatik kabul testi motorunu (`src/js/tests.js`) geliştirdim.
   * Testler başlamadan önce öğrencinin tarayıcıdaki gerçek verilerini ve görev listesini hafızaya yedekleyen, testler tamamlandığında ise verileri eksiksiz geri yükleyen güvenli `localStorage` izolasyon mekanizmasını kurguladım.
   * `src/test-runner.html` ve `index.html?test=1` parametresiyle çalışan dinamik, görsel test sonuç tablosunu tasarladım.

2. **Kişisel Çalışma Notları Kalıcılık Motorunun Geliştirilmesi:**
   * Arayüzde yer alan "Kişisel Çalışma Notlarım" modülünün sayfayı yenileyince verileri kaybettiğini manuel testler sırasında tespit ettim.
   * `portal.js` içinde `akademix_personal_notes_v1` anahtarıyla çalışan kalıcı depolama ve CRUD (ekleme, dinamik listeleme, silme) altyapısını kodlayarak notların tarayıcı oturumları arasında %100 kalıcı olmasını sağladım.

3. **4 Haftalık Müfredat Döngüsünün Tamamlanması:**
   * 1., 2., 3. ve 4. haftaya ait öğrenme kartlarını, öğrenme hedeflerini ve test senaryolarını denetleyerek tüm haftaların eksiksiz tamamlanmasını ve arayüzde "Tamamlandı" statüsüne kavuşturulmasını sağladım.

4. **Kapsamlı Test Raporunun ve İzlenebilirlik Matrisinin Hazırlanması:**
   * `docs/test-senaryolari.md` resmi kalite raporunu hazırlayarak 17 otomatik kabul testi (TC-01..17), 6 manuel test (MT-01..06) ve bulunan 10 kritik hatanın giderilme adımlarını kayıt altına aldım.

5. **Çoklu Platform Başlatıcıları ve Dağıtım Kolaylığı:**
   * Ekip arkadaşlarımızın ve değerlendiricilerin projeyi işletim sistemlerinden bağımsız kolayca çalıştırabilmesi için `server.py` Python HTTP sunucusunu, Windows için tek tıkla çalışan `baslat_windows.bat` dosyasını ve Mac/Linux için `./baslat.sh` scriptlerini hazırladım.

---

## 3. Karşılaştığım Teknik Zorluklar ve Problem Çözme Sürecim
* **Türkçe Karakter Arama Hatası (TC-09):** Kabul testlerimizin ilk koşumunda TC-09 senaryosu arama kutusuna büyük "İHTİYAÇ LİSTESİ" yazıldığında başarısız oldu. Yapılan kök neden analizinde JavaScript'in standart `toLowerCase()` metodunun Türkçe yerel ayarlarda 'İ' harfini doğru dönüştüremediğini tespit ettim ve hatayı geliştirici arkadaşım Onur'a (Issue #6) raporladım.
* **Erişilebilirlik ve Kontrast Standardı (WCAG AA):** Aydınlık temada tamamlanan görevlerin metin renginin okunabilirlik eşiğinin (4.5:1) altına düştüğünü tespit ederek CSS renk değişkenlerini güncelledim ve kontrast oranını 4.76:1 seviyesine çıkardım.
* **Git Commit ve Yazar Eşlemesi:** Git üzerinde yazılan commit'lerin e-posta uyumsuzluğu sebebiyle GitHub Contributors grafiğinde eşleşmemesi problemini `git filter-branch` ve interaktif geçmiş yönetimi ile çözerek ekibin katkı şeffaflığını sağladım.

---

## 4. Kişisel ve Mesleki Kazanımlarım
Bu proje süresince;
* Yazılım mühendisliğinde test süreçlerinin yalnızca kod yazıldıktan sonra yapılan bir formalite olmadığını, projenin mimarisini ve kullanıcı deneyimini doğrudan şekillendiren temel bir kalite omurgası olduğunu bizzat deneyimledim.
* Gereksinimler ile test senaryoları arasındaki izlenebilirliğin (Requirement Traceability) kurumsal bir yazılım teslimatında ne kadar kritik olduğunu öğrendim.
* Git yama (patch) yönetimi, dal (branch) stratejileri ve açık kaynak işbirliği süreçlerinde ileri düzey pratik kazandım.

---

## 5. Sonuç ve Öz Değerlendirme
Proje 1 kapsamında Test ve Kalite Güvencesi sorumlusu olarak üstlendiğim tüm sorumlulukları eksiksiz, zamanında ve yüksek kalite standartlarında tamamladım. Ekip arkadaşlarımla güçlü ve yapıcı bir iletişim sürdürerek projemizin hedeflenen başarıya ulaşmasında etkin rol oynadım.
