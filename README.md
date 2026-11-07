# 🏔️ KTÜ Yazılım Mühendisliği - Proje 1 (Grup 4)

Bu repository, **Karadeniz Teknik Üniversitesi Yazılım Geliştirme Dersi** kapsamında **Grup 4** tarafından geliştirilen iki aşamalı etkileşimli öğrenci takip ve başarı platformunu içermektedir:

1. **`edutrack/`**: İlk aşamada geliştirilen temel ders ve görev takip panosu (Nilay'ın hazırladığı temel iskelet).
2. **`akademix/`**: Daha sonradan geliştirilen; öğrenci giriş/kayıt sistemi, KTÜ 30 kişi kuralı BDS/MDS not simülatörü, dinamik haftalık ders programı, görev matrisi ve **gerçek LLM API (Google Gemini) destekli Sevimli Yapay Zeka Danışmanı** içeren **gelişmiş sürüm**.

---

## 🚀 3 Adımda Hızlı Kurulum ve Çalıştırma Rehberi

Projeyi kendi bilgisayarınızda (Windows, Mac veya Linux) çalıştırmak için aşağıdaki adımları izlemeniz yeterlidir:

### 1. Adım: Projeyi Bilgisayarınıza Klonlayın
```bash
git clone https://github.com/nilaysezinyalcin-collab/Edutrack.git
cd Edutrack
```

---

### 2. Adım: Sunucuyu Başlatın (İşletim Sisteminize Göre)

#### 🪟 Windows Kullanıcıları İçin (En Kolayı):
* **Yöntem A (Tek Tıkla):** Proje klasöründeki **`baslat_windows.bat`** dosyasına çift tıklayın! Python veya Node algılanır, sunucu başlatılır ve tarayıcınızda otomatik olarak açılır.
* **Yöntem B (Terminal / CMD / PowerShell):**
  ```cmd
  python server.py
  ```
  *(Python `py` olarak kayıtlıysa: `py server.py`)*

#### 🍎 Mac ve 🐧 Linux Kullanıcıları İçin:
* **Yöntem A (Otomatik Script):**
  Terminalde proje klasöründeyken:
  ```bash
  ./baslat.sh
  ```
* **Yöntem B (Terminal Komutu):**
  ```bash
  python3 server.py
  ```

#### 🌐 Sıfır Kurulum / Sunucusuz Çalıştırma (Acil Durum Modu):
Bilgisayarınızda Python, Node veya VS Code kurulu değilse bile:
* Proje kök dizinindeki **`akademix.html`** dosyasına çift tıklamanız yeterlidir! İnternet veya sunucuya ihtiyaç duymadan doğrudan tarayıcınızda açılır.

---

### 3. Adım: Tarayıcıdan Giriş Yapın
Tarayıcınızın adres çubuğuna şunu yazın:
👉 **`http://localhost:5173`**

* **Demo Girişi:** Giriş ekranında **"Öğrenci No: 444082"** ve **"Şifre: 123456"** bilgilerini girebilir veya doğrudan **"Hızlı Demo Girişi"** butonuna basarak tüm panoyu keşfedebilirsiniz.

---

## 🤖 Sevimli Yapay Zeka Danışmanı & Hazır API Entegrasyonu

AkademiX'in sağ alt köşesinde yer alan robot maskot, öğrencilere 7/24 rehberlik eden üretken bir yapay zeka beynine sahiptir:

* 🔑 **Hazır ve Entegre API:** Projeye Google Gemini API anahtarı önceden tanımlanmıştır. Projeyi açan hiçbir öğrencinin veya hocanın ekstra API anahtarı almasına gerek yoktur; doğrudan konuşmaya başlayabilirsiniz!
* ⚙️ **Kendi Anahtarını Kullanmak İsteyenler İçin:**
  1. Sağ alttaki sevimli robota tıklayarak sohbet çekmecesini açın.
  2. Başlıktaki **⚙️ (API Ayarları)** butonuna tıklayın.
  3. Google Gemini veya OpenAI seçip kendi API anahtarınızı girin.
  4. **"🔌 Bağlantıyı Test Et"** ve **"💾 Ayarları Kaydet"** butonlarına basın.
* 🛡️ **Akıllı Hibrit Güvencesi:** API kotası dolsa veya internet bağlantısı olmasa bile sistem asla çökmez; KTÜ mevzuatını ve ders programını bilen yerel kural motoru otomatik devreye girer.

---

## 🧮 KTÜ 30 Kişi Kuralı ve Not Sistemi (MDS / BDS)

KTÜ Yazılım Mühendisliği mevzuatına uygun geliştirilen not motoru:
* **Sınıf Mevcudu < 30:** **Mutlak Değerlendirme Sistemi (MDS)** uygulanır (AA: 90-100, BA: 85-89, BB: 80-84, CB: 75-79, CC: 70-74, DC: 60-69, DD: 50-59, FD: 40-49, FF: 0-39).
* **Sınıf Mevcudu ≥ 30:** **Bağıl Değerlendirme Sistemi (BDS)** devreye girer. Sınıf ortalaması ve standart sapması üzerinden T-Skoru hesaplanarak çan eğrisi harf notu çıkarılır.
* **KTÜ Final Barajı:** Final veya bütünleme notu **50'nin altında** olan öğrenci, ortalaması kaç olursa olsun doğrudan **FF** ile kalır.

---

## 👥 Grup Üyeleri ve Görev Dağılımı (Grup 4)

| Öğrenci No | Adı Soyadı | Projedeki Rolü | Üstlendiği Modüller ve Sorumluluklar |
| :--- | :--- | :--- | :--- |
| **444090** | **Nilay Sezin Yalçın** | **Proje Lideri & Geliştirici** | Koordinasyon, EduTrack temel proje iskeleti, layout ve UI tasarımı |
| **444082** | **Oğuzhan İnce** | **Sistem Analisti & Geliştirici** | İhtiyaç analizi, gereksinim dökümleri, ER veri modeli ve raporlama |
| **444082** | **İsmail Korkmaz** | **Test / Kalite & Geliştirici** | AkademiX portal mimarisi, AI asistan & Gemini API entegrasyonu, KTÜ BDS/MDS motoru, sunucu scriptleri |
| **444104** | **Onur Uzun** | **Dokümantasyon & Geliştirici** | Teknik dokümanlar, proje sunumu, filtreleme, arama mantığı ve kılavuzlar |

---

## 📂 Repository Klasör Yapısı

```
├── edutrack/                📁 1. AŞAMA: Temel Öğrenme Panosu (Nilay'ın İlk Sürümü)
│   ├── css/style.css        - Temel stiller ve grid tasarımı
│   ├── js/                  - courses.js, tasks.js, data.js, storage.js, app.js
│   ├── index.html           - Temel arayüz
│   └── README.md            - EduTrack modül açıklaması
│
├── akademix/                🚀 2. AŞAMA: Gelişmiş AkademiX Portalı (Gelişmiş Sürüm)
│   ├── css/style.css        - Modern tasarım, sevimli maskot ve cam efektleri
│   ├── js/                  - ai-assistant.js, ui.js, storage.js, app.js, bundle.js
│   ├── index.html           - Giriş ekranı, KTÜ AGNO motoru, ders programı & AI Robot
│   ├── test-runner.html     - Canlı birim ve entegrasyon test koşucusu
│   ├── AkademiX_Tek_Tikla_Calistir.html - Kurulumsuz çalışan dosya
│   ├── baslat_windows.bat   - Windows tek tıkla başlatıcı
│   ├── baslat.sh            - Mac & Linux başlatıcı
│   └── README.md            - AkademiX detaylı teknik rehberi
│
├── docs/                    📑 Tüm Dokümanlar, Test Senaryoları, Sunumlar ve Raporlar
│   ├── test-senaryolari.md
│   ├── proje-raporu-taslak.md
│   ├── Proje_1_Etkilesimli_Ders_Deneyimi_Panosu_Teknik_Dokuman.docx
│   ├── Yazilim_Gelistirme_Dersi_Ogrenci_Bilgilendirme_Rehberi.docx
│   ├── Yazilim_Gelistirme_Dersi_Ogrenci_Bilgilendirme_Sunumu_v2.pptx
│   ├── gereksinim_analizi.pptx
│   ├── er_diyagram_v2.png
│   └── ogrenci_paneli_diyagram_mavi.png
│
├── server.py                🖥️ Tek komutla port 5173 sunucusu açan Python motoru
├── baslat.sh                🚀 Mac & Linux için tek tıkla sunucu başlatıcı
├── baslat_windows.bat       🪟 Windows için tek tıkla sunucu başlatıcı
├── akademix.html            📄 Tek tıkla kurulumsuz çalışan tam sürüm
├── index.html               🔄 Localhost'a girildiğinde doğrudan yönlendiren giriş dosyası
└── README.md                📖 Bu tanıtım ve kurulum kılavuzu
```

---

## 🧪 Canlı Test ve Kalite Güvencesi
Projeyi başlattıktan sonra birim testlerin çalıştığını görmek için tarayıcınızdan:
👉 **`http://localhost:5173/test-runner.html`** adresini ziyaret edebilirsiniz.
