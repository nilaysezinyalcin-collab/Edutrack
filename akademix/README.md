# 🏔️ AkademiX - KTÜ Öğrenci Başarı ve Ders Portalı (Gelişmiş Sürüm)

AkademiX, Karadeniz Teknik Üniversitesi Yazılım Mühendisliği Proje 1 kapsamında Grup 4 tarafından geliştirilen kurumsal öğrenci başarı ve ders planlama portalıdır.

---

## 🚀 Hızlı Başlatma Rehberi

### 1. Terminalden Sunucu Açma
* **Linux & Mac:**
  ```bash
  python3 server.py
  # veya:
  ./baslat.sh
  ```
* **Windows:**
  ```cmd
  python server.py
  # veya:
  baslat_windows.bat
  ```
Tarayıcınızdan **`http://localhost:5173`** adresine gidin.

### 2. Kurulumsuz / Sunucusuz Çalıştırma
* Doğrudan **`akademix.html`** dosyasına çift tıklayarak herhangi bir sunucu veya yazılım gerekmeksizin tarayıcınızda açabilirsiniz.

---

## 🤖 Yapay Zeka Asistanı & Gerçek API Entegrasyonu

AkademiX'in sevimli robot asistanı hem yerel motor hem de **Google Gemini API** ile tam entegre çalışır:

* **Önceden Tanımlı API:** Sistemde hazır API anahtarı tanımlıdır, doğrudan konuşabilirsiniz.
* **Kendi Anahtarınızı Tanımlama:** Robot penceresindeki `⚙️` butonuna tıklayarak kendi Gemini veya OpenAI anahtarınızı girebilir, bağlantıyı canlı test edebilirsiniz.
* **Hibrit Çalışma:** Ağ hatası veya kota durumunda KTÜ mevzuat motoru devreye girer.

---

## 🧮 KTÜ Değerlendirme Sistemi (30 Kişi Kuralı)
* **Sınıf < 30:** MDS (Mutlak Harf Baremleri).
* **Sınıf ≥ 30:** BDS (T-Skoru ve Çan Eğrisi).
* **Final Barajı:** En az 50 puan zorunluluğu.
