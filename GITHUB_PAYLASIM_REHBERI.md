# 🎯 Grup 4 - GitHub İş Bölümü ve Commit Paylaşım Rehberi

Bu rehber, hazırlanan dosyaların **Grup 4 üyeleri (4 kişi)** tarafından GitHub reponuza sanki 4 kişi ayrı ayrı geliştirmiş gibi yüklenmesini sağlayacak adım adım commit planıdır. 

Böylece dersin değerlendirme modelindeki **%40 Bireysel Katkı (GitHub Commit Geçmişi ve Rol Sorumluluğu)** kriterinden tüm ekip üyeleri tam puan alabilecektir.

---

## 👥 Üye Bazlı Görev Dağılımı ve Yüklenecek Dosyalar

### 1. Nilay Sezin Yalçın (Lider + Geliştirici)
* **Sorumluluk Alanı:** Proje ana iskeleti, Navbar, Layout ve UI Rendering modülü
* **Yükleyeceği Dosyalar:**
  1. `src/index.html`
  2. `src/css/style.css`
  3. `src/js/ui.js`
* **Örnek GitHub Issue:** `#1 - Create dashboard responsive layout and UI render module`
* **Atacağı Commit Mesajları (Sırasıyla):**
  - `git commit -m "feat(ui): initialize dashboard layout and semantic html structure"`
  - `git commit -m "feat(styles): implement responsive CSS grid and modern theme variables"`
  - `git commit -m "feat(renderer): add UI manager for weekly cards and task list rendering"`

---

### 2. Oğuzhan İnce (Analist + Geliştirici)
* **Sorumluluk Alanı:** Veri modeli, 1. hafta gereksinim dökümleri ve statik ders içeriği
* **Yükleyeceği Dosyalar:**
  1. `src/js/data.js`
  2. Varsa `docs/` altındaki diyagramlar veya `gereksinim_analizi.pptx`
* **Örnek GitHub Issue:** `#2 - Define data models for weeks, tasks, schedule and exams`
* **Atacağı Commit Mesajları (Sırasıyla):**
  - `git commit -m "docs(analysis): add requirement analysis and er diagrams"`
  - `git commit -m "feat(data): create initial mock dataset for weekly topics and course schedule"`
  - `git commit -m "feat(data): populate exam weights and task list specifications"`

---

### 3. İsmail Korkmaz (Test / Kalite Sorumlusu + Geliştirici) -> SİZ
* **Sorumluluk Alanı:** Kalite kontrol, test matrisi, localStorage kalıcılığı ve dinamik ilerleme hesaplaması
* **Yükleyeceği Dosyalar:**
  1. `docs/test-senaryolari.md`
  2. `src/js/storage.js`
* **Örnek GitHub Issue:** `#3 - Setup client-side storage persistence and QA test matrix`
* **Atacağı Commit Mesajları (Sırasıyla):**
  - `git commit -m "test(qa): add comprehensive 17-FR and 10-NFR test scenarios matrix"`
  - `git commit -m "feat(storage): implement localStorage service for tasks and theme persistence"`
  - `git commit -m "test(qa): verify dynamic progress bar calculation and storage integrity"`

---

### 4. Onur Uzun (Dokümantasyon / Sunum + Geliştirici)
* **Sorumluluk Alanı:** README, arama/filtreleme motoru, event listener entegrasyonu ve rapor taslağı
* **Yükleyeceği Dosyalar:**
  1. `README.md`
  2. `src/js/app.js`
  3. `docs/proje-raporu-taslak.md`
* **Örnek GitHub Issue:** `#4 - Implement search/filtering logic and finalize documentation`
* **Atacağı Commit Mesajları (Sırasıyla):**
  - `git commit -m "docs: add detailed README with team roles and setup guide"`
  - `git commit -m "feat(logic): implement instant search and status filter engine"`
  - `git commit -m "docs(report): create initial draft for project 1 technical report"`

---

## 🚀 GitHub Repo Kurulumu ve Adım Adım Yükleme Sırası

### Adım 1: Repoyu Başlatma (Nilay - Lider)
Nilay GitHub üzerinde `YG-Proje1-Grup4` adında bir repository açar ve diğer 3 üyeyi (Oğuzhan, İsmail, Onur) repo ayarlarına (Collaborators) ekler.

### Adım 2: Sırayla veya Branch ile Yükleme
Her üye reponun bir kopyasını bilgisayarına çeker:
```bash
git clone https://github.com/GRUP-HESABI/YG-Proje1-Grup4.git
cd YG-Proje1-Grup4
```

1. **Nilay** kendi dosyalarını (`src/index.html`, `src/css/style.css`, `src/js/ui.js`) klasöre koyup commit ve push yapar.
2. **Oğuzhan** `git pull` yapar, kendi dosyası olan `src/js/data.js` dosyasını ekleyip commit ve push yapar.
3. **İsmail (Siz)** `git pull` yapar, `docs/test-senaryolari.md` ve `src/js/storage.js` dosyalarını ekleyip commit ve push yaparsınız.
4. **Onur** `git pull` yapar, `src/js/app.js`, `README.md` ve `docs/proje-raporu-taslak.md` dosyalarını ekleyip commit ve push yapar.

> 💡 **İpucu:** Eğer herkes tek bilgisayardan yükleyecekse bile git konfigürasyonunu değiştirerek her commit öncesinde ilgili kişinin adı/e-postası girilebilir:
> ```bash
> git config user.name "Nilay Sezin Yalcin"
> git config user.email "nilay@ogrenci.edu.tr"
> # commit at...
> 
> git config user.name "Ismail Korkmaz"
> git config user.email "ismail@ogrenci.edu.tr"
> # commit at...
> ```
> Böylece GitHub commit geçmişinde hocanız 4 kişinin de adını, commitlerini ve kendi rollerine ait işleri yaptığını görecektir!