# Proje 1 - Teknik Proje Raporu (Taslak)
**Proje Adı:** Etkileşimli Ders Deneyimi Panosu  
**Grup:** Grup 4  
**Dokümantasyon / Sunum Sorumlusu:** 444104 Onur Uzun (+ Geliştirici)  
**Tarih:** 2. Hafta  

---

## 1. Yönetici Özeti ve Proje Amacı
Bu proje, öğrencilerin haftalık ders akışlarını, öğrenme hedeflerini, mini etkinliklerini ve kişisel ilerlemelerini görsel ve etkileşimli bir arayüzden takip edebilmeleri amacıyla geliştirilmiştir. Sistem istemci tarafı (client-side) web teknolojileri üzerine inşa edilmiş, hafif ve hızlı bir kullanıcı deneyimi sunmaktadır.

## 2. Mimari ve Teknik Kararlar
* **İstemci Tarafı Odaklılık:** Sunucu ve harici veritabanı bağımlılığı olmadan, modern tarayıcı yetenekleri (DOM API, LocalStorage) ile yüksek performans sağlanmıştır.
* **Modüler Kod Mimarisi:**
  - `data.js`: Statik veri modeli ve ders içeriği tanımları.
  - `storage.js`: Tarayıcı kalıcılığı sağlayan CRUD katmanı.
  - `ui.js`: DOM render ve etkileşim işlevleri.
  - `app.js`: İş mantığı, filtreleme algoritmaları ve olay yakalama.
* **Responsive Tasarım:** CSS Grid ve Flexbox kullanılarak mobil, tablet ve masaüstü uyumluluğu sağlanmıştır.

## 3. 2. Hafta İlerleme Raporu
2. hafta hedefleri olan arayüz tasarımı, iskeletin kurulması ve temel fonksiyonların (kartlar, görev yönetimi, dinamik progress bar, tema geçişi) çalışır hale getirilmesi başarıyla tamamlanmıştır.

## 4. Gelecek Adımlar (3. ve 4. Hafta)
* Çoklu filtreleme kombinasyonlarının zenginleştirilmesi.
* PWA (Progressive Web App) veya çevrimdışı önbellekleme desteği.
* Final sunum materyallerinin ve canlı demo adımlarının hazırlanması.