/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Veri Modeli ve Başlangıç Veri Seti (FR-05, FR-06, FR-07, FR-08, FR-13)
 * Geliştirici: Oğuzhan İnce (Analist + Geliştirici)
 */

export const INITIAL_WEEKS_DATA = [
  {
    id: 1,
    weekNo: 1,
    title: "Yazılım Yaşam Döngüsü ve İhtiyaç Analizi",
    description: "Proje gereksinimlerinin belirlenmesi, kullanıcı hikâyeleri ve kabul kriterlerinin yazılması.",
    topics: [
      "Yazılım geliştirme süreç modelleri (Agile, Scrum)",
      "İhtiyaç analizi ve fonksiyonel/fonksiyonel olmayan gereksinimler",
      "Kullanıcı senaryoları ve kabul kriterleri",
      "Git & GitHub ortamının kurulması ve proje repo yönetimi"
    ],
    status: "completed",
    badge: "1. Hafta"
  },
  {
    id: 2,
    weekNo: 2,
    title: "Arayüz Tasarımı ve Temel İskelet",
    description: "Modern web teknolojileri ile arayüz iskeletinin, tema yönetiminin ve temel işlevlerin kurulması.",
    topics: [
      "Modern HTML5 semantik etiketler ve CSS3 Grid/Flexbox",
      "Responsive (duyarlı) tasarım ve erişilebilirlik (a11y) standartları",
      "Modüler JavaScript (ES6 Modules) ve DOM etkileşimi",
      "İstemci tarafı veri kalıcılığı (localStorage API)"
    ],
    status: "in-progress",
    badge: "2. Hafta"
  },
  {
    id: 3,
    weekNo: 3,
    title: "İleri Etkileşim, Filtreleme ve Arama",
    description: "Dinamik görev filtreleme, anlık metin araması, durum yönetimi ve görsel geri bildirimler.",
    topics: [
      "JavaScript Event Delegation ve dinamik filtreleme algoritmaları",
      "Arama motoru ve çok kriterli süzme",
      "Kullanıcı bildirimleri (toast alerts) ve hata yakalama",
      "Birim test senaryolarının kodlanması ve doğrulanması"
    ],
    status: "upcoming",
    badge: "3. Hafta"
  },
  {
    id: 4,
    weekNo: 4,
    title: "Kalite Güvencesi, Dokümantasyon ve Canlı Demo",
    description: "Proje 1 kapsamındaki son kullanıcı testleri, kapsamlı dokümantasyon, sunum hazırlığı ve canlı demo.",
    topics: [
      "Çapraz tarayıcı (cross-browser) ve mobil uyumluluk testleri",
      "Lighthouse performans, erişilebilirlik ve SEO denetimi",
      "Proje teknik raporu ve kullanıcı dokümantasyonunun tamamlanması",
      "Canlı demo sunumu ve akran değerlendirmesi"
    ],
    status: "upcoming",
    badge: "4. Hafta"
  }
];

export const INITIAL_TASKS_DATA = [
  // 1. HAFTA (4 Görev)
  {
    id: "task-101",
    weekNo: 1,
    title: "Kullanıcı İhtiyaç Analizi Tablosunu Çıkar",
    description: "Öğrenci ve ders sorumlusu paydaşları için ihtiyaçları belirle.",
    category: "Analiz",
    priority: "Yüksek",
    dueDate: "2026-10-25",
    completed: true
  },
  {
    id: "task-102",
    weekNo: 1,
    title: "GitHub Repository Aç ve Rolleri Tanımla",
    description: "YG-Proje1-Grup4 reposunu aç, branch kurallarını ve rollerini tanımla.",
    category: "Yönetim",
    priority: "Yüksek",
    dueDate: "2026-10-26",
    completed: true
  },
  {
    id: "task-103",
    weekNo: 1,
    title: "17 FR ve 10 NFR Gereksinim Listesini Hazırla",
    description: "Öğrenci paneli için işlevsel ve fonksiyonel olmayan gereksinimleri listele.",
    category: "Analiz",
    priority: "Yüksek",
    dueDate: "2026-10-28",
    completed: true
  },
  {
    id: "task-104",
    weekNo: 1,
    title: "Veritabanı ER Diyagramı ve İlişkisel Şemayı Çiz",
    description: "11 tablodan oluşan ilişkisel veri modelini (er_diyagram_v2.png) oluştur.",
    category: "Veritabanı",
    priority: "Yüksek",
    dueDate: "2026-10-29",
    completed: true
  },

  // 2. HAFTA (5 Görev)
  {
    id: "task-201",
    weekNo: 2,
    title: "Akış Şemasına Uygun Öğrenci Paneli İskeletini Kur",
    description: "Giriş/kayıt ve panel ayrımını diyagrama tam uygun kodla.",
    category: "Frontend",
    priority: "Yüksek",
    dueDate: "2026-11-04",
    completed: true
  },
  {
    id: "task-202",
    weekNo: 2,
    title: "Haftalık Ders Kartları Bileşenini Oluştur",
    description: "Ders haftalarını kart olarak listele ve modal detay görünümünü bağla.",
    category: "Frontend",
    priority: "Yüksek",
    dueDate: "2026-11-05",
    completed: true
  },
  {
    id: "task-203",
    weekNo: 2,
    title: "Görev Durumu Güncelleme ve İlerleme Çubuğunu Bağla",
    description: "Göreve tıklandığında durumu güncelle ve genel ilerleme yüzdesini hesapla.",
    category: "JavaScript",
    priority: "Yüksek",
    dueDate: "2026-11-06",
    completed: false
  },
  {
    id: "task-204",
    weekNo: 2,
    title: "Karanlık / Aydınlık Tema Geçişini Uygula",
    description: "CSS değişkenleri ve localStorage ile tema kalıcılığını sağla.",
    category: "Tasarım",
    priority: "Orta",
    dueDate: "2026-11-07",
    completed: false
  },
  {
    id: "task-205",
    weekNo: 2,
    title: "FR ve NFR Test Senaryoları Matrisini Hazırla",
    description: "İsmail Korkmaz tarafından yürütülecek 27 maddelik kalite kontrol dokümanı.",
    category: "Test/QA",
    priority: "Yüksek",
    dueDate: "2026-11-08",
    completed: false
  },

  // 3. HAFTA (5 Görev)
  {
    id: "task-301",
    weekNo: 3,
    title: "Anlık Arama ve Çoklu Filtreleme Motorunu Yaz",
    description: "Görevleri durum, hafta, öncelik ve metin aramasına göre dinamik süz.",
    category: "JavaScript",
    priority: "Yüksek",
    dueDate: "2026-11-12",
    completed: false
  },
  {
    id: "task-302",
    weekNo: 3,
    title: "KTÜ 30 Kişi Kuralı ve AGNO Simülatörünü Kodla",
    description: "MDS ve BDS (Çan eğrisi) ile çoklu ders katsayı/kredi ağırlıklı AGNO hesabı.",
    category: "Hesaplama",
    priority: "Yüksek",
    dueDate: "2026-11-13",
    completed: false
  },
  {
    id: "task-303",
    weekNo: 3,
    title: "İnteraktif Haftalık Ders Programı Modülünü Geliştir",
    description: "Öğrencinin gün, saat ve derslik bazlı kendi ders programını yönetebilmesi.",
    category: "Frontend",
    priority: "Orta",
    dueDate: "2026-11-14",
    completed: false
  },
  {
    id: "task-304",
    weekNo: 3,
    title: "Kişisel Not Ekleme ve Silme Modülünü Tamamla",
    description: "Öğrencinin haftalık özel notlar almasını sağlayan arayüz.",
    category: "Frontend",
    priority: "Orta",
    dueDate: "2026-11-15",
    completed: false
  },
  {
    id: "task-305",
    weekNo: 3,
    title: "Otomatik Birim Test Koşucusunu Geliştir",
    description: "10 adet kritik sistem testini çalıştıran bağımsız test runner arayüzü.",
    category: "Test/QA",
    priority: "Yüksek",
    dueDate: "2026-11-16",
    completed: false
  },

  // 4. HAFTA (4 Görev)
  {
    id: "task-401",
    weekNo: 4,
    title: "Çapraz Cihaz ve Mobil Responsive Testlerini Gerçekleştir",
    description: "Farklı ekran boyutlarında arayüz taşmalarını denetle ve gider.",
    category: "Test/QA",
    priority: "Yüksek",
    dueDate: "2026-11-19",
    completed: false
  },
  {
    id: "task-402",
    weekNo: 4,
    title: "Proje 1 Teknik Raporunu ve Kullanıcı Dokümanını Yaz",
    description: "Proje mimarisi, gereksinim analizi ve ekran görüntülerini kapsayan teknik rapor.",
    category: "Dokümantasyon",
    priority: "Yüksek",
    dueDate: "2026-11-20",
    completed: false
  },
  {
    id: "task-403",
    weekNo: 4,
    title: "Canlı Demo Senaryosu ve Grup Sunumunu Hazırla",
    description: "Canlı demo adımları, rol anlatımları ve sunum slayt paketinin tamamlanması.",
    category: "Yönetim",
    priority: "Yüksek",
    dueDate: "2026-11-21",
    completed: false
  },
  {
    id: "task-404",
    weekNo: 4,
    title: "Akran Değerlendirmesi ve Bireysel Katkı Kanıtlarını Derle",
    description: "GitHub commit geçmişi, issue kayıtları ve rol sorumluluklarının raporlanması.",
    category: "Kalite",
    priority: "Orta",
    dueDate: "2026-11-22",
    completed: false
  }
];

export const SCHEDULE_DATA = [
  { day: "Pazartesi", time: "10:00 - 12:30", course: "Yazılım Geliştirme", room: "D-204", instructor: "Öğr. Gör. Dr." },
  { day: "Çarşamba", time: "13:30 - 16:00", course: "Yazılım Laboratuvarı", room: "Lab-3", instructor: "Arş. Gör." },
  { day: "Cuma", time: "09:00 - 11:30", course: "Proje Takip ve Değerlendirme", room: "Online / Meet", instructor: "Ders Kurulu" }
];

export const EXAM_DATA = [
  { course: "Yazılım Geliştirme", exam: "1. Ara Proje Teslimi", weight: "%30", score: 88 },
  { course: "Yazılım Geliştirme", exam: "2. Veritabanı Projesi", weight: "%30", score: null },
  { course: "Yazılım Geliştirme", exam: "3. AI Destekli Final Projesi", weight: "%40", score: null }
];