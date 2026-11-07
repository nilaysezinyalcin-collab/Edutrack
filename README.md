# 🏔️ KTÜ Yazılım Mühendisliği - Proje 1 (Grup 4)

Bu repo, **Karadeniz Teknik Üniversitesi Yazılım Geliştirme Dersi** kapsamında **Grup 4** tarafından geliştirilen iki aşamalı etkileşimli öğrenci takip platformunu içermektedir:

1. **`edutrack/`**: İlk aşamada geliştirilen temel ders ve görev takip panosu (Nilay'ın hazırladığı temel iskelet).
2. **`akademix/`**: Daha sonradan geliştirilen; öğrenci giriş/kayıt sistemi, KTÜ 30 kişi kuralı BDS/MDS not simülatörü, dinamik haftalık ders programı, görev matrisi ve **gerçek LLM API (Google Gemini & OpenAI) destekli Yapay Zeka Danışmanı** içeren **gelişmiş sürüm**.

---

## 👥 Grup Üyeleri ve Rol Dağılımı (Grup 4)

| Öğrenci No | Adı Soyadı | Projedeki Rolü | Üstlendiği Modüller / Sorumluluklar |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | **Lider + Geliştirici** | Koordinasyon, EduTrack temel proje iskeleti, layout ve UI modülü |
| **444082** | **Oğuzhan İnce** | **Analist + Geliştirici** | İhtiyaç analizi, gereksinim dökümleri, ER veri modeli |
| **444082** | **İsmail Korkmaz** | **Test / Kalite + Geliştirici** | AkademiX gelişmiş mimarisi, AI robotu & Gemini/OpenAI API entegrasyonu, KTÜ not motoru, test koşucusu |
| **444104** | **Onur Uzun** | **Dokümantasyon + Geliştirici** | Teknik dokümantasyon, proje raporu, filtreleme ve arama mantığı |

---

## 🚀 Hızlı Başlatma (Ekip Arkadaşlarımız İçin Yerel Sunucu Rehberi)

Projenin yerel bilgisayarlarda çalışması için platformunuza uygun adımı seçmeniz yeterlidir:

### 🪟 Windows Kullanıcıları:
* **En Kolay Yol:** `akademix/baslat_windows.bat` dosyasına çift tıklayın! Python veya Node kuruluysa sunucu otomatik başlar ve tarayıcınızda açılır.
* **Terminalden Açmak İçin:**
  ```cmd
  cd akademix
  python -m http.server 5173
  ```
  Tarayıcınızdan **`http://localhost:5173`** adresine gidin.

### 🍎 Mac ve 🐧 Linux Kullanıcıları:
* **Script ile:**
  ```bash
  cd akademix
  ./baslat.sh
  ```
* **Terminalden:**
  ```bash
  cd akademix
  python3 -m http.server 5173
  ```
  Tarayıcınızdan **`http://localhost:5173`** adresine gidin.

### 🌐 Kurulumsuz / Sunucusuz Çalıştırma (Sıfır Ayar):
* Bilgisayarında hiçbir geliştirme aracı olmayanlar: `akademix/AkademiX_Tek_Tikla_Calistir.html` dosyasına çift tıklayarak internet/sunucu gerekmeksizin tüm özellikleri doğrudan tarayıcıda deneyimleyebilir.

---

## 🤖 Sevimli Yapay Zeka Asistanı & Gerçek API Entegrasyonu

AkademiX'in sağ alt köşesindeki sevimli robot:
* **Hem Hibrit Yerel Motor:** API anahtarı olmasa bile KTÜ yönetmeliğini, ders programını ve AGNO hesaplarını otomatik yanıtlar.
* **Hem Gerçek LLM API Desteği:** Sağ alttaki robota tıklayıp başlıktaki **⚙️ (API Ayarları)** butonundan **Google Gemini** (Gemini 1.5 Flash - Ücretsiz) veya **OpenAI** (GPT-4o Mini) API anahtarınızı girerek asistanı gerçek bir yapay zeka beynine bağlayabilirsiniz.
* Ayrıntılı API kılavuzu için [akademix/README.md](akademix/README.md) dosyasını inceleyebilirsiniz.

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
│   ├── index.html           - Giriş ekranı, KTÜ AGNO motoru, ders programı, AI Robot & API modalı
│   ├── test-runner.html     - Canlı birim ve entegrasyon test koşucusu
│   ├── AkademiX_Tek_Tikla_Calistir.html - Kurulumsuz, tek tıkla çalışan dosya
│   ├── baslat_windows.bat   - Windows için tek tıkla sunucu başlatıcı
│   ├── baslat.sh            - Mac & Linux için sunucu başlatıcı
│   └── README.md            - AkademiX özel dokümantasyonu ve API kılavuzu
│
├── docs/                    📑 Dokümantasyon, test senaryoları, sunumlar ve raporlar
│   ├── test-senaryolari.md
│   ├── proje-raporu-taslak.md
│   ├── Proje_1_Etkilesimli_Ders_Deneyimi_Panosu_Teknik_Dokuman.docx
│   ├── Yazilim_Gelistirme_Dersi_Ogrenci_Bilgilendirme_Rehberi.docx
│   ├── Yazilim_Gelistirme_Dersi_Ogrenci_Bilgilendirme_Sunumu_v2.pptx
│   ├── gereksinim_analizi.pptx
│   ├── er_diyagram_v2.png
│   ├── ogrenci_paneli_diyagram_mavi.png
│   ├── GITHUB_PAYLASIM_REHBERI.md
│   └── ARKADASLAR_ICIN_BILGI_NOTU.txt
│
└── README.md                📖 Genel repo tanıtımı
```

---

## 🧪 Canlı Test Sayfası
Projenin birim ve entegrasyon testlerini tarayıcınızda görmek için:
Sunucuyu başlattıktan sonra **`http://localhost:5173/test-runner.html`** adresini ziyaret edebilirsiniz.
