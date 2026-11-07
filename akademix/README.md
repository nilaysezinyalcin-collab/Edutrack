# 🏔️ AkademiX - KTÜ Öğrenci Başarı ve Ders Yönetim Portalı (Gelişmiş Sürüm)

AkademiX, KTÜ Yazılım Mühendisliği Proje 1 (Grup 4) kapsamında geliştirilen gelişmiş öğrenci portalıdır. Öğrenci girişi, KTÜ Bağıl/Mutlak Değerlendirme Sistemi (BDS/MDS) not sihirbazı, dinamik haftalık ders programı, görev takip matrisi ve **gerçek LLM API destekli Yapay Zeka Asistanı** sunar.

---

## 🚀 Hızlı Başlatma ve Sunucu Rehberi (Tüm İşletim Sistemleri)

Arkadaşlarınız veya değerlendiriciler projeyi yerel bilgisayarlarında aşağıdaki yöntemlerden **herhangi biriyle** 5 saniyede başlatabilir:

### 1. Windows Kullanıcıları İçin (En Kolay)
* **Yöntem A (Tek Tıkla):** `akademix/baslat_windows.bat` dosyasına çift tıklayın. Sisteminizde Python veya Node varsa sunucuyu başlatıp tarayıcınızda `http://localhost:5173` adresini kendiliğinden açar.
* **Yöntem B (Terminal / CMD / PowerShell):**
  ```cmd
  cd akademix
  python -m http.server 5173
  ```
  *(Python `py` olarak kayıtlıysa: `py -m http.server 5173`)*
  Tarayıcınızdan **`http://localhost:5173`** adresini açın.

---

### 2. Mac ve Linux Kullanıcıları İçin
* **Yöntem A (Otomatik Script):**
  Terminalde `akademix` klasörüne gidip:
  ```bash
  ./baslat.sh
  ```
  *(Otomatik olarak varsayılan tarayıcınızı açacaktır).*
* **Yöntem B (Terminal):**
  ```bash
  python3 -m http.server 5173
  ```
  Tarayıcınızdan **`http://localhost:5173`** adresine gidin.

---

### 3. VS Code Kullanıcıları İçin
* VS Code içinde `akademix` klasörünü açın.
* `index.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğine basın.

---

### 4. Node.js Kullanıcıları İçin
```bash
npx serve . -l 5173
```

---

### 5. Sıfır Kurulum / Sunucusuz Çalıştırma (Acil Durum Modu)
Bilgisayarınızda Python, Node veya VS Code kurulu değilse:
* Klasördeki **`AkademiX_Tek_Tikla_Calistir.html`** dosyasına çift tıklamanız yeterlidir. Tüm CSS stilleri içine gömülü olduğundan internet veya sunucu gerekmeksizin doğrudan tarayıcınızda açılır.

---

## 🤖 Sevimli Yapay Zeka Danışmanı & Gerçek API Entegrasyonu

AkademiX AI Asistanı, hem **Yerel Hibrit Kural Motoru** hem de **Gerçek LLM API Entegrasyonu** (Google Gemini & OpenAI) ile çalışacak şekilde tasarlanmıştır.

### 🌟 Mimari ve Yetenekler:
1. **Çift Modlu Çalışma Güvencesi:** API anahtarı girilmediğinde sistem asla çökmez; KTÜ mevzuatını, ders programını ve AGNO hesaplarını bilen yerel asistan devreye girer.
2. **Gerçek LLM Desteği:** Google Gemini (1.5 Flash, 2.0 Flash, 1.5 Pro) veya OpenAI (GPT-4o Mini, GPT-4o) API anahtarı girildiğinde doğal dil kabiliyeti en üst seviyeye çıkar.
3. **KTÜ Sistem Talimatı (Prompt Engineering):** Gerçek API'ye bağlandığında asistan KTÜ 30 kişi kuralını, 50 final barajını ve öğrencinin mevcut ders listesini sistem talimatı olarak alır.

### 🔑 Gerçek API Anahtarı Nasıl Eklenir?
1. AkademiX arayüzünde sağ altta bulunan **sevimli robot ikonuna** tıklayarak AI Asistanı panelini açın.
2. Başlık kısmında yer alan **⚙️ (API Ayarları)** butonuna tıklayın.
3. Model Sağlayıcınızı seçin:
   * **Google Gemini (Önerilen - Ücretsiz):**
     * [Google AI Studio](https://aistudio.google.com/app/apikey) sayfasına gidin.
     * Google hesabınızla ücretsiz bir API anahtarı oluşturun.
     * Anahtarı AkademiX'teki kutuya yapıştırın.
   * **OpenAI (GPT-4o Mini):**
     * OpenAI Platform'dan aldığınız `sk-...` API anahtarını girin.
4. **"🔌 Bağlantıyı Test Et"** butonuna basarak bağlantıyı doğrulayın (Yeşil onay rozeti belirecektir).
5. **"💾 Ayarları Kaydet"** butonuna basın. Artık asistanınız gerçek bir üretken yapay zeka beyniyle çalışacaktır!

> 🔒 **Gizlilik ve Güvenlik Notu:** Girdiğiniz API anahtarı hiçbir üçüncü parti sunucuya veya veri tabanına gönderilmez. Sadece tarayıcınızın kendi yerel hafızasında (`localStorage`) şifresiz/güvenli olarak saklanır ve doğrudan Google / OpenAI resmi HTTPS API uç noktalarına iletilir.

---

## 🧮 KTÜ Not Sistemi (30 Kişi Kuralı)

* **Sınıf Mevcudu < 30 (MDS - Mutlak Değerlendirme Sistemi):**
  * Sabit harf baremleri uygulanır: 90-100 AA, 85-89 BA, 80-84 BB, 75-79 CB, 70-74 CC, 60-69 DC, 50-59 DD, 40-49 FD, 0-39 FF.
* **Sınıf Mevcudu ≥ 30 (BDS - Bağıl Değerlendirme Sistemi):**
  * Sınıf ortalaması ve standart sapması dikkate alınarak T-skoru ve çan eğrisi formülüyle harf notu hesaplanır.
* **Final / Bütünleme Barajı:**
  * KTÜ Yönetmeliği gereği final veya bütünleme notu **50'nin altında** olan öğrenci, ortalaması ne olursa olsun dersten doğrudan **FF** ile kalır.

---

## 🧪 Birim ve Entegrasyon Testleri

Tüm bileşenlerin (Auth, Storage, Grade Calculator, AI Robot) doğruluğunu test etmek için:
Tarayıcınızdan **`http://localhost:5173/test-runner.html`** sayfasını açabilirsiniz. Tüm testler yeşil onay alarak otomatik koşacaktır.
