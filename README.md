# 🏔️ KTÜ Yazılım Mühendisliği - Proje 1 (Grup 4)

Bu repo, **Yazılım Geliştirme Dersi** kapsamında **Grup 4** tarafından geliştirilen iki aşamalı etkileşimli öğrenci takip platformunu içermektedir:
1. **`edutrack/`**: İlk aşamada geliştirilen temel ders ve görev takip panosu.
2. **`akademix/`**: Daha sonradan geliştirilen; giriş/kayıt mimarisi, KTÜ 30 kişi kuralı BDS/MDS not simülatörü, dinamik ders programı ve yapay zeka asistanı içeren **gelişmiş sürüm**.

---

## 👥 Grup Üyeleri ve Rol Dağılımı (Grup 4)

| Öğrenci No | Adı Soyadı | Projedeki Rolü | Üstlendiği Modüller / Sorumluluklar |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | **Lider + Geliştirici** | Koordinasyon, EduTrack temel proje iskeleti, layout ve UI modülü |
| **444082** | **Oğuzhan İnce** | **Analist + Geliştirici** | İhtiyaç analizi, gereksinim dökümleri, ER veri modeli |
| **444082** | **İsmail Korkmaz** | **Test / Kalite + Geliştirici** | AkademiX gelişmiş mimarisi, AI asistanı, KTÜ not motoru, test senaryoları matrisi (`docs/test-senaryolari.md`) |
| **444104** | **Onur Uzun** | **Dokümantasyon + Geliştirici** | Teknik dokümantasyon, proje raporu, filtreleme ve arama mantığı |

---

## 📂 Proje Klasör Yapısı

```
├── edutrack/                📁 1. AŞAMA: Temel Öğrenme Panosu (İlk Sürüm)
│   ├── css/style.css        - Temel stiller ve grid yapısı
│   ├── js/                  - courses.js, tasks.js, data.js, storage.js, app.js
│   ├── index.html           - Temel arayüz
│   └── README.md            - EduTrack modül açıklaması
│
├── akademix/                🚀 2. AŞAMA: Gelişmiş AkademiX Portalı (Gelişmiş Sürüm)
│   ├── css/style.css        - Modern tasarım, sevimli maskot ve cam efektleri
│   ├── js/                  - ai-assistant.js, ui.js, storage.js, app.js, bundle.js
│   ├── index.html           - Giriş ekranı, KTÜ AGNO motoru, ders programı & AI Robot
│   ├── test-runner.html     - Canlı birim ve entegrasyon test koşucusu
│   └── AkademiX_Tek_Tikla_Calistir.html - Kurulumsuz, tek tıkla çalışan dosya
│
├── docs/                    📑 Dokümantasyon, test senaryoları ve rapor taslakları
├── baslat.sh                ⚡ Otomatik sunucu başlatma scripti
└── README.md                📖 Genel repo tanıtımı
```

---

## 🌟 AkademiX (Gelişmiş Sürüm) Çekirdek Özellikleri

* 🔐 **Giriş ve Kayıt Akışı:** Öğrenci numarası (`444082`) ve şifreyle güvenli giriş, anında demo girişi.
* 🤖 **AkademiX Sevimli AI Danışmanı:** Doğal dille konuşarak ders programı oluşturan, vize-final harf notunu hesaplayıp AGNO tablosuna ekleyen zeki ajan.
* 🧮 **KTÜ 30 Kişi Kuralı & BDS/MDS Not Simülatörü:** Sınıf mevcuduna göre bağıl/mutlak sistem seçimi, KTÜ 50 final barajı kontrolü ve canlı AGNO hesaplama.
* 📅 **İnteraktif Haftalık Ders Programı:** Ders ekleme, silme, derslik ve saat bazlı takvim gösterimi.
* 📋 **Haftalık Öğrenme Modülleri & Görev Yönetimi:** 4 haftalık müfredat kartları, arama/filtreleme, tamamlandı işaretleme.
* 🌙 **Karanlık / Aydınlık Tema:** Tek tıkla modern koyu/açık tema geçişi.

---

## 💻 Nasıl Çalıştırılır?

### Yöntem 1: Başlatma Scripti ile (Önerilen)
```bash
# Gelişmiş AkademiX sürümünü açmak için:
./baslat.sh

# Temel EduTrack sürümünü açmak için:
./baslat.sh edutrack
```
Tarayıcınızdan **`http://localhost:5173`** adresine gidiniz.

### Yöntem 2: Kurulumsuz Doğrudan Açma
* `akademix/AkademiX_Tek_Tikla_Calistir.html` veya `akademix/index.html` dosyasına çift tıklayarak tarayıcınızda açabilirsiniz.
