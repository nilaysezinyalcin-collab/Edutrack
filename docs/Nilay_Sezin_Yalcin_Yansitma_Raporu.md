# Bireysel Yansıtma Raporu – Nilay Sezin Yalçın

**Ders:** Yazılım Geliştirme · **Proje:** Proje 1 – Etkileşimli Ders Deneyimi Panosu (AkademiX) · **Grup:** 4  
**Öğrenci:** Nilay Sezin Yalçın · **444090** · **Rol:** Proje Lideri / Geliştirici  
**Repo:** https://github.com/nilaysezinyalcin-collab/Edutrack  

---

## 1. Bu projede hangi rolü üstlendim?
Proje 1’de Grup 4’ün proje lideriydim; aynı zamanda geliştirici olarak kod katkısı da yaptım. Liderlik görevim; işleri planlamak, ekip üyeleri arasında dağıtmak, ilerlemeyi takip etmek ve teslimin eksiksiz yapılmasını sağlamaktı.

---

## 2. Hangi görevleri tamamladım?
* **Hafta 4 planlaması:** Uygulamayı teknik dokümandaki gereksinimlerle karşılaştırdım, eksikleri 8 GitHub issue’suna böldüm ve her birini rolüne uygun kişiye atadım.
* **Ekip koordinasyonu:** Her üyeye görevini, uygulama adımlarını ve kontrol yöntemini ilettim; üyelerin kendi hesaplarından commit atmasını sağladım.
* **Repo yapısı (`#1`):** Uygulamanın üç kopyasını tek bir giriş dosyasında (`src/index.html`) topladım; HTML içine gömülü JavaScript’i ayrı dosyaya taşıdım; `/docs` ve `/presentation` klasörlerini oluşturdum.
* **Çalıştırma ve kurulum (`#8`):** `server.py` ile Windows / Mac başlatıcılarını yeni yapıya uyarladım ve kendi bilgisayarımda test ettim.
* **Katkı kontrolü ve sürüm (`#8`):** Her üyenin commit ve issue bağlantılarını kontrol ettim; kontrol sonucunu `#8`’e yorum olarak yazdım ve `v1.0` sürümünü yayınladım.
* **Sunum:** Konuşma dağılımını yaptım; giriş, tasarım ve canlı demo bölümlerini ben sunuyorum.

---

## 3. Hangi commit / issue / teknik çıktılar bana ait?

| Çıktı | Tür | Açıklama |
| :--- | :--- | :--- |
| `#1` – Repo yapısını düzenle | Issue (bana atanmış) | Tek giriş dosyası, `/src`, `/docs`, `/presentation` |
| `#8` – Katkı kontrolü, `server.py` ve başlatıcılar, `v1.0` | Issue (bana atanmış) | Çalıştırma sorunları, katkı kontrolü, sürüm |
| `#1–#8` | Issue’ların açılması ve atanması | Hafta 4 işlerinin tamamının planı |
| `cd9a2a8` | Commit | `refactor: restructure repo into src/docs/presentation and remove duplicate HTML copies` |
| `2224a20` | Commit | `fix(run): serve app from src/ in server.py and launch scripts` |
| `61f7482` | Commit | `fix(run): detect a working Python in Windows launcher` |
| `e941994` | Commit | `repair sunum.pptx so PowerPoint can open it` |
| `v1.0` | Sürüm (release) | Teslim edilen son sürüm |

---

## 4. Hangi sorunlarla karşılaştım ve nasıl çözdüm?
* **Dağınık repo:** Aynı uygulamanın üç kopyası ve kullanılmayan modüller vardı, README olmayan dosyaları gösteriyordu. Tek giriş dosyasına ve dersin istediği klasör yapısına geçtik.
* **Başlatıcı çalışmıyordu:** Windows başlatıcısını kendi bilgisayarımda denediğimde “localhost bağlanmayı reddetti” hatası aldım. Siyah pencerede “Python bulunamadı” yazıyordu: bilgisayarımda Python yoktu ve Windows’un Microsoft Store’a yönlendiren sahte `python` kısayolu gerçek Python sanılıyordu. Başlatıcıyı, Python’un gerçekten çalışıp çalışmadığını kontrol edecek ve çalışmıyorsa uygulamayı doğrudan tarayıcıda açacak şekilde düzelttik; tekrar denediğimde çalıştı.
* **Katkı kanıtı:** Bir üyenin hiç commit’i yoktu, bir üyenin commitleri ise hesabına bağlı olmayan bir e-posta ile atılmıştı. Her işi bir issue’ya bölüp kişilere atadım, herkesin kendi hesabından commit atmasını sağladım ve e-posta ayarının düzeltilmesini istedim.
* **Çakışmalar:** GitHub’ın web arayüzünden README’yi düzenlediğimde, ekip arkadaşımın hazırladığı değişiklikle çakışma çıktı. Bundan sonra, herkes gönderene kadar repoda web üzerinden değişiklik yapmamayı kural olarak koydum.
* **Yapay zekâ desteği:** Eksik analizi ve düzeltmelerin hazırlanmasında yapay zekâ asistanından (Claude) destek aldım. Dersin kuralına uygun olarak her değişikliği uygulamadan önce ne yaptığını öğrendim, sonucu kendi bilgisayarımda test ettim ve ekip arkadaşlarımdan da kendi değişikliklerini okuyup anlamalarını istedim.

---

## 5. Hangi becerileri geliştirdim?
* **Git ve GitHub:** Terminalden `clone`, `pull`, `am` ve `push` kullanmayı; issue açıp atamayı ve commit mesajındaki `Closes #n` ile issue’ların otomatik kapanmasını öğrendim.
* **Gereksinimden işe:** Teknik dokümanı maddelere ayırıp uygulamayla karşılaştırmayı ve eksikleri kişilere atanabilir küçük işlere bölmeyi öğrendim.
* **Hata ayıklama:** Bir hatayı tahmin etmek yerine ekrandaki mesajı okuyup kaynağını bulmayı (Windows Python kısayolu örneği) deneyimledim.
* **Liderlik:** İşleri sıraya koymayı, bağımlı işlerde kimin önce göndereceğini belirlemeyi ve ekibe net, adım adım talimat yazmayı öğrendim.

---

## 6. Bir sonraki projede neyi farklı yapacağım?
* **Issue’ları ilk haftadan açacağım.** Bu projede işleri ancak 4. haftada issue’lara böldük; katkılar son günlere yığıldı. Bir dahakinde her haftanın işini haftanın başında issue olarak açıp atayacağım.
* **Testi en sona bırakmayacağım.** Kalıcılık ve mobil taşma gibi hatalar ancak uygulamayı gerçek kullanıcı gibi denediğimizde ortaya çıktı. Her hafta sonunda kısa bir kabul testi yapacağız.
* **“Benim bilgisayarımda çalışıyor”la yetinmeyeceğim.** Kurulumu her hafta temiz bir klasörde README’ye bakarak deneyeceğim.
* **Repo kurallarını başta yazılı hale getireceğim:** Herkes kendi hesabından commit atar, ana dala web üzerinden değişiklik yapılmaz, commit mesajları ne yapıldığını anlatır.

