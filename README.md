# 🏔️ EduTrack (AkademiX) – Etkileşimli Ders Deneyimi Panosu

KTÜ Yazılım Mühendisliği **Yazılım Geliştirme Dersi** kapsamında **Grup 4** tarafından geliştirilmiş modern, responsive ve etkileşimli bir öğrenci ders ve başarı takip platformudur.

---

## 👥 Grup Üyeleri ve Rol Dağılımı (Grup 4)

| Öğrenci No | Adı Soyadı | Projedeki Rolü | Üstlendiği Modüller / Sorumluluklar |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | **Lider + Geliştirici** | Koordinasyon, genel proje iskeleti, layout, UI rendering modülü (`ui.js`) |
| **444082** | **Oğuzhan İnce** | **Analist + Geliştirici** | İhtiyaç analizi, FR/NFR gereksinimleri, ER diyagramı, veri modeli (`data.js`) |
| **444082** | **İsmail Korkmaz** | **Test / Kalite + Geliştirici** | Test senaryoları (`docs/test-senaryolari.md`), veri kalıcılığı (`storage.js`), ilerleme hesaplama, AI asistan entegrasyonu |
| **444104** | **Onur Uzun** | **Dokümantasyon + Geliştirici** | Proje raporu, README, anlık arama ve dinamik filtreleme motoru (`app.js`) |

*Tüm grup üyeleri aktif olarak kod geliştirme ve sürüm kontrolü sürecine katkı sağlamıştır.*

---

## 🚀 Projenin Amacı ve Temel Özellikler

Öğrencilerin haftalık ders içeriklerini, görevlerini, öğrenme hedeflerini, sınav notlarını ve AGNO durumlarını modern bir kullanıcı deneyimi ve yapay zeka asistanı desteğiyle takip edebilmelerini sağlamak.

### Çekirdek Özellikler:
* 🔐 **Giriş ve Kayıt Akışı:** Öğrenci numarası veya KTÜ e-postası ile güvenli oturum açma, anlık demo girişi (`444082 - İsmail Korkmaz`).
* 📅 **İnteraktif Haftalık Ders Programı:** Ders ekleme, silme, derslik ve saat bazlı takvim gösterimi.
* 🧮 **KTÜ 30 Kişi Kuralı & BDS/MDS Not Simülatörü:** Sınıf mevcuduna göre bağıl/mutlak sistem seçimi, KTÜ 50 final barajı kontrolü ve canlı AGNO hesaplama.
* 🤖 **AkademiX Sevimli AI Asistanı:** Doğal dille konuşarak ders programı oluşturan, vize-final harf notunu hesaplayıp AGNO tablosuna ekleyen zeki ajan.
* 📋 **Haftalık Öğrenme Modülleri & Görev Yönetimi:** 4 haftalık müfredat kartları, arama/filtreleme, tamamlandı işaretleme.
* 📊 **Dinamik İlerleme Çubuğu:** Tamamlanan görev oranına göre gerçek zamanlı güncellenen ilerleme göstergesi.
* 📝 **Kişisel Not Defteri:** Öğrencinin hızlı ders çalışma notları alabileceği yerel not alanı.
* 🌙 **Karanlık / Aydınlık Tema:** Tek tıkla modern koyu/açık tema geçişi.
* 💾 **Veri Kalıcılığı:** Tüm durumların `localStorage` ile tarayıcıda saklanması.

---

## 🛠️ Kullanılan Teknolojiler
- **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript
- **Veri Kalıcılığı:** Web Storage API (`localStorage`)
- **Sürüm Kontrolü:** Git & GitHub

---

## 💻 Kurulum ve Çalıştırma Adımları

### Yöntem 1: Tek Tıkla Çalıştırma (Kurulumsuz)
Kök dizindeki `AkademiX_Tek_Tikla_Calistir.html` veya `edutrack/index.html` dosyasına çift tıklayarak tarayıcınızda doğrudan açabilirsiniz.

### Yöntem 2: Yerel HTTP Sunucusu (Önerilen)
```bash
# Proje dizininde:
./baslat.sh

# Veya doğrudan Python ile:
python3 -m http.server 5173 --directory edutrack
```
Tarayıcınızdan `http://localhost:5173` adresine gidiniz.
