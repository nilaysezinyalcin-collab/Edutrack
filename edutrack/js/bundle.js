/**
 * Proje 1 - Standalone Unified Client Bundle (Grup 4)
 * Sıfır bağımlılık, anında çalışma garantili üretim derlemesi
 */

/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Veri Modeli ve Başlangıç Veri Seti (FR-05, FR-06, FR-07, FR-08, FR-13)
 * Geliştirici: Oğuzhan İnce (Analist + Geliştirici)
 */

const INITIAL_WEEKS_DATA = [
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

const INITIAL_TASKS_DATA = [
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
    title: "GitHub Repository aç ve Rolleri Tanımla",
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
    id: "task-201",
    weekNo: 2,
    title: "Modern ve Responsive Dashboard İskeletini Kodla",
    description: "Grid/Flexbox kullanarak mobil ve masaüstü uyumlu ana paneli oluştur.",
    category: "Frontend",
    priority: "Yüksek",
    dueDate: "2026-11-04",
    completed: false
  },
  {
    id: "task-202",
    weekNo: 2,
    title: "Haftalık Ders Kartları Bileşenini Oluştur",
    description: "Ders haftalarını kart olarak listele ve modal detay görünümünü bağla.",
    category: "Frontend",
    priority: "Yüksek",
    dueDate: "2026-11-05",
    completed: false
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
  {
    id: "task-301",
    weekNo: 3,
    title: "Anlık Arama ve Çoklu Filtreleme Motorunu Yaz",
    description: "Görevleri durum, hafta ve metin aramasına göre dinamik süz.",
    category: "JavaScript",
    priority: "Yüksek",
    dueDate: "2026-11-12",
    completed: false
  },
  {
    id: "task-302",
    weekNo: 3,
    title: "Kişisel Not Ekleme ve Silme Modülünü Tamamla",
    description: "Öğrencinin haftalık özel notlar almasını sağlayan arayüz.",
    category: "Frontend",
    priority: "Orta",
    dueDate: "2026-11-14",
    completed: false
  },
  {
    id: "task-401",
    weekNo: 4,
    title: "Çapraz Cihaz ve Mobil Testleri Gerçekleştir",
    description: "Farklı ekran boyutlarında arayüz taşmalarını denetle ve gider.",
    category: "Test/QA",
    priority: "Yüksek",
    dueDate: "2026-11-19",
    completed: false
  },
  {
    id: "task-402",
    weekNo: 4,
    title: "Canlı Demo ve Grup Sunumunu Hazırla",
    description: "Proje raporu, sunum slaytları ve canlı uygulamanın yayına alınması.",
    category: "Dokümantasyon",
    priority: "Yüksek",
    dueDate: "2026-11-21",
    completed: false
  }
];

const SCHEDULE_DATA = [
  { day: "Pazartesi", time: "10:00 - 12:30", course: "Yazılım Geliştirme", room: "D-204", instructor: "Öğr. Gör. Dr." },
  { day: "Çarşamba", time: "13:30 - 16:00", course: "Yazılım Laboratuvarı", room: "Lab-3", instructor: "Arş. Gör." },
  { day: "Cuma", time: "09:00 - 11:30", course: "Proje Takip ve Değerlendirme", room: "Online / Meet", instructor: "Ders Kurulu" }
];

const EXAM_DATA = [
  { course: "Yazılım Geliştirme", exam: "1. Ara Proje Teslimi", weight: "%30", score: 88 },
  { course: "Yazılım Geliştirme", exam: "2. Veritabanı Projesi", weight: "%30", score: null },
  { course: "Yazılım Geliştirme", exam: "3. AI Destekli Final Projesi", weight: "%40", score: null }
];

/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Veri Kalıcılığı, Depolama ve Yedekleme Katmanı (NFR-06, FR-15, FR-17)
 * Geliştirici: İsmail Korkmaz (Test / Kalite Sorumlusu + Geliştirici)
 */

const STORAGE_KEYS = {
  TASKS: "yg_p1_tasks_state_v1",
  CUSTOM_TASKS: "yg_p1_custom_tasks_v1",
  THEME: "yg_p1_theme_preference_v1",
  NOTES: "yg_p1_student_notes_v1",
  ACTIVE_WEEK: "yg_p1_active_week_filter_v1"
};

const StorageService = {
  getTaskStates() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("LocalStorage erişim hatası (tasks):", e);
      return {};
    }
  },

  setTaskState(taskId, isCompleted) {
    try {
      const states = this.getTaskStates();
      states[taskId] = isCompleted;
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(states));
    } catch (e) {
      console.error("LocalStorage kayıt hatası (tasks):", e);
    }
  },

  getCustomTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TASKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addCustomTask(task) {
    try {
      const tasks = this.getCustomTasks();
      const newTask = {
        id: "custom-task-" + Date.now(),
        weekNo: parseInt(task.weekNo, 10),
        title: task.title,
        description: task.description || "",
        category: task.category || "Genel",
        priority: task.priority || "Orta",
        dueDate: task.dueDate || "",
        completed: false
      };
      tasks.unshift(newTask);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TASKS, JSON.stringify(tasks));
      return newTask;
    } catch (e) {
      console.error("Özel görev ekleme hatası:", e);
      return null;
    }
  },

  getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    } catch (e) {
      return "light";
    }
  },

  setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error("LocalStorage kayıt hatası (theme):", e);
    }
  },

  getNotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addNote(title, content) {
    try {
      const notes = this.getNotes();
      const newNote = {
        id: "note-" + Date.now(),
        title,
        content,
        createdAt: new Date().toLocaleDateString("tr-TR")
      };
      notes.unshift(newNote);
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      return newNote;
    } catch (e) {
      console.error("Not kaydedilemedi:", e);
      return null;
    }
  },

  deleteNote(noteId) {
    try {
      const notes = this.getNotes().filter(n => n.id !== noteId);
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Tüm pano verilerini JSON formatında dışa aktarır (NFR-06 Yedekleme)
   */
  exportAllDataJSON() {
    const backup = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      taskStates: this.getTaskStates(),
      customTasks: this.getCustomTasks(),
      notes: this.getNotes(),
      theme: this.getTheme()
    };
    return JSON.stringify(backup, null, 2);
  },

  /**
   * JSON yedeğinden verileri geri yükler
   */
  importAllDataJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.taskStates) localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(parsed.taskStates));
      if (parsed.customTasks) localStorage.setItem(STORAGE_KEYS.CUSTOM_TASKS, JSON.stringify(parsed.customTasks));
      if (parsed.notes) localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(parsed.notes));
      if (parsed.theme) localStorage.setItem(STORAGE_KEYS.THEME, parsed.theme);
      return true;
    } catch (e) {
      console.error("Yedek içe aktarılamadı:", e);
      return false;
    }
  }
};

/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Kullanıcı Arayüzü ve DOM Render Modülü (FR-04, FR-05, FR-06, FR-12)
 * Geliştirici: Nilay Sezin Yalçın (Lider + Geliştirici)
 */

const UIManager = {
  renderWeeks(weeks, activeWeekNo, onSelectWeek) {
    const container = document.getElementById("weeks-container");
    if (!container) return;
    container.innerHTML = "";

    weeks.forEach(week => {
      const card = document.createElement("div");
      const isActive = week.weekNo === activeWeekNo;
      card.className = `week-card ${isActive ? "active" : ""}`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${week.weekNo}. Hafta: ${week.title}`);

      card.innerHTML = `
        <div class="week-card-header">
          <span class="badge ${week.status}">${week.badge}</span>
          <span class="week-status-text">${this.getStatusLabel(week.status)}</span>
        </div>
        <h3 class="week-card-title">${week.title}</h3>
        <p class="week-card-desc">${week.description}</p>
        <div class="week-card-footer">
          <span>${week.topics.length} Öğrenme Hedefi</span>
          <button class="btn-detail" data-week="${week.weekNo}" aria-label="Hafta detayını gör">
            Detaylar →
          </button>
        </div>
      `;

      card.addEventListener("click", () => onSelectWeek(week.weekNo));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectWeek(week.weekNo);
        }
      });

      container.appendChild(card);
    });
  },

  getStatusLabel(status) {
    switch (status) {
      case "completed": return "Tamamlandı";
      case "in-progress": return "Aktif Hafta";
      default: return "Gelecek";
    }
  },

  renderTasks(tasks, taskStates, onToggleTask) {
    const container = document.getElementById("tasks-container");
    const emptyState = document.getElementById("tasks-empty-state");
    if (!container) return;
    container.innerHTML = "";

    if (!tasks || tasks.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      return;
    }
    if (emptyState) emptyState.style.display = "none";

    tasks.forEach(task => {
      const isCompleted = taskStates[task.id] !== undefined ? taskStates[task.id] : task.completed;
      const item = document.createElement("div");
      item.className = `task-item ${isCompleted ? "completed" : ""}`;
      item.id = `task-row-${task.id}`;

      item.innerHTML = `
        <div class="task-checkbox-wrapper">
          <input 
            type="checkbox" 
            id="chk-${task.id}" 
            class="task-checkbox" 
            ${isCompleted ? "checked" : ""}
            aria-label="${task.title} görevini tamamla"
          />
          <label for="chk-${task.id}" class="custom-checkbox"></label>
        </div>
        <div class="task-content">
          <div class="task-meta">
            <span class="task-week-badge">${task.weekNo}. Hafta</span>
            <span class="task-cat-badge">${task.category}</span>
            <span class="task-priority ${(task.priority || "orta").toLowerCase()}">${task.priority || "Orta"} Öncelik</span>
          </div>
          <h4 class="task-title">${task.title}</h4>
          <p class="task-desc">${task.description || ""}</p>
        </div>
        <div class="task-actions">
          <span class="task-status-tag ${isCompleted ? "tag-done" : "tag-pending"}">
            ${isCompleted ? "Tamamlandı" : "Devam Ediyor"}
          </span>
        </div>
      `;

      const chk = item.querySelector(`#chk-${task.id}`);
      chk.addEventListener("change", (e) => {
        onToggleTask(task.id, e.target.checked);
      });

      container.appendChild(item);
    });
  },

  updateProgress(tasks, taskStates) {
    if (!tasks || tasks.length === 0) return;

    let completedCount = 0;
    tasks.forEach(task => {
      const isCompleted = taskStates[task.id] !== undefined ? taskStates[task.id] : task.completed;
      if (isCompleted) completedCount++;
    });

    const totalCount = tasks.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const bar = document.getElementById("progress-fill");
    const label = document.getElementById("progress-percentage");
    const countLabel = document.getElementById("progress-count");

    if (bar) bar.style.width = `${percentage}%`;
    if (label) label.textContent = `%${percentage}`;
    if (countLabel) countLabel.textContent = `${completedCount} / ${totalCount} Görev Tamamlandı`;

    const progressContainer = document.querySelector(".progress-wrapper");
    if (progressContainer) {
      progressContainer.setAttribute("aria-valuenow", percentage);
    }
  },

  updateStatCounters(allTasks, taskStates) {
    let completedCount = 0;
    let highPriorityCount = 0;

    allTasks.forEach(task => {
      const isCompleted = taskStates[task.id] !== undefined ? taskStates[task.id] : task.completed;
      if (isCompleted) completedCount++;
      if (task.priority === "Yüksek" && !isCompleted) highPriorityCount++;
    });

    const totalCount = allTasks.length;
    const inProgressCount = totalCount - completedCount;

    const elTotal = document.getElementById("stat-counter-total");
    const elCompleted = document.getElementById("stat-counter-completed");
    const elInProgress = document.getElementById("stat-counter-inprogress");
    const elHigh = document.getElementById("stat-counter-high");

    if (elTotal) elTotal.textContent = totalCount;
    if (elCompleted) elCompleted.textContent = completedCount;
    if (elInProgress) elInProgress.textContent = inProgressCount;
    if (elHigh) elHigh.textContent = highPriorityCount;
  },

  openWeekModal(week) {
    const modal = document.getElementById("week-modal");
    if (!modal) return;

    document.getElementById("modal-week-title").textContent = `${week.weekNo}. Hafta: ${week.title}`;
    document.getElementById("modal-week-desc").textContent = week.description;

    const list = document.getElementById("modal-topics-list");
    list.innerHTML = "";
    week.topics.forEach(topic => {
      const li = document.createElement("li");
      li.textContent = topic;
      list.appendChild(li);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  closeWeekModal() {
    const modal = document.getElementById("week-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  },

  openNewTaskModal() {
    const modal = document.getElementById("new-task-modal");
    if (!modal) return;
    modal.classList.add("open");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  closeNewTaskModal() {
    const modal = document.getElementById("new-task-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  },

  renderSchedule(schedule) {
    const tbody = document.getElementById("schedule-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    schedule.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${row.day}</strong></td>
        <td>${row.time}</td>
        <td>${row.course}</td>
        <td><span class="room-pill">${row.room}</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderExams(exams) {
    const tbody = document.getElementById("exams-tbody");
    const avgElem = document.getElementById("exam-average-score");
    if (!tbody) return;
    tbody.innerHTML = "";

    let totalScore = 0;
    let totalCount = 0;

    exams.forEach(row => {
      const tr = document.createElement("tr");
      const scoreDisplay = row.score !== null ? `<strong>${row.score}</strong>` : "<span class="text-muted">Açıklanmadı</span>";
      tr.innerHTML = `
        <td>${row.course}</td>
        <td>${row.exam}</td>
        <td>${row.weight}</td>
        <td>${scoreDisplay}</td>
      `;
      tbody.appendChild(tr);

      if (row.score !== null) {
        totalScore += row.score;
        totalCount++;
      }
    });

    if (avgElem && totalCount > 0) {
      const avg = Math.round(totalScore / totalCount);
      avgElem.textContent = `${avg} / 100`;
    }
  },

  renderNotes(notes, onDeleteNote) {
    const container = document.getElementById("notes-container");
    if (!container) return;
    container.innerHTML = "";

    if (notes.length === 0) {
      container.innerHTML = "<p class="text-muted" style="font-size:0.9rem;">Henüz bir not eklenmedi.</p>";
      return;
    }

    notes.forEach(note => {
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <div class="note-card-header">
          <h5>${note.title}</h5>
          <button class="btn-delete-note" data-id="${note.id}" aria-label="Notu sil">×</button>
        </div>
        <p class="note-card-text">${note.content}</p>
        <span class="note-date">${note.createdAt}</span>
      `;
      const delBtn = card.querySelector(".btn-delete-note");
      delBtn.addEventListener("click", () => onDeleteNote(note.id));
      container.appendChild(card);
    });
  },

  showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 2800);
  }
};

/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Ana Uygulama Mantığı ve Olay Yöneticisi (3. Hafta Geliştirilmiş Sürüm)
 * Geliştirici: Onur Uzun (Dokümantasyon + Geliştirici) & Ekip
 */


class App {
  constructor() {
    this.weeks = INITIAL_WEEKS_DATA;
    this.initialTasks = INITIAL_TASKS_DATA;
    this.activeWeek = null; // null = tüm haftalar
    this.activeStatusFilter = "all"; // all, in-progress, completed
    this.sortBy = "default"; // default, priority, week
    this.searchQuery = "";
  }

  get allTasks() {
    const customTasks = StorageService.getCustomTasks();
    return [...customTasks, ...this.initialTasks];
  }

  init() {
    try {
      this.initTheme();
      this.refreshAll();

      UIManager.renderSchedule(SCHEDULE_DATA);
      UIManager.renderExams(EXAM_DATA);
      this.renderNotesSection();

      this.bindEvents();
      window.appInstance = this;
      console.log("Etkileşimli Ders Panosu v2.0 (3. Hafta) başarıyla yüklendi.");
    } catch (err) {
      console.error("Uygulama başlatma hatası:", err);
    }
  }

  initTheme() {
    const savedTheme = StorageService.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButtonIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    StorageService.setTheme(nextTheme);
    this.updateThemeButtonIcon(nextTheme);
    UIManager.showToast(`Tema değiştirildi: ${nextTheme === "dark" ? "Karanlık" : "Aydınlık"}`);
  }

  updateThemeButtonIcon(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    btn.innerHTML = theme === "dark" ? "☀️ Aydınlık Mod" : "🌙 Karanlık Mod";
  }

  getFilteredTasks() {
    const states = StorageService.getTaskStates();
    let tasks = [...this.allTasks];

    // 1. Hafta filtresi
    if (this.activeWeek !== null) {
      tasks = tasks.filter(t => t.weekNo === this.activeWeek);
    }

    // 2. Durum filtresi
    if (this.activeStatusFilter === "completed") {
      tasks = tasks.filter(t => states[t.id] !== undefined ? states[t.id] : t.completed);
    } else if (this.activeStatusFilter === "in-progress") {
      tasks = tasks.filter(t => !(states[t.id] !== undefined ? states[t.id] : t.completed));
    }

    // 3. Arama filtresi
    if (this.searchQuery.trim() !== "") {
      const q = this.searchQuery.toLowerCase();
      tasks = tasks.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // 4. Sıralama
    if (this.sortBy === "priority") {
      const priorityWeight = { "Yüksek": 3, "Orta": 2, "Düşük": 1 };
      tasks.sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
    } else if (this.sortBy === "week") {
      tasks.sort((a, b) => a.weekNo - b.weekNo);
    }

    return tasks;
  }

  refreshAll() {
    const states = StorageService.getTaskStates();
    const tasks = this.allTasks;

    // Haftalık kartlar
    UIManager.renderWeeks(this.weeks, this.activeWeek, (weekNo) => {
      const week = this.weeks.find(w => w.weekNo === weekNo);
      if (week) UIManager.openWeekModal(week);
    });

    // Görevler
    const filteredTasks = this.getFilteredTasks();
    UIManager.renderTasks(filteredTasks, states, (taskId, isChecked) => {
      this.handleTaskToggle(taskId, isChecked);
    });

    // İlerleme çubuğu ve İstatistik Sayaçları
    UIManager.updateProgress(tasks, states);
    UIManager.updateStatCounters(tasks, states);
  }

  handleTaskToggle(taskId, isChecked) {
    StorageService.setTaskState(taskId, isChecked);
    const states = StorageService.getTaskStates();
    const tasks = this.allTasks;

    const filtered = this.getFilteredTasks();
    UIManager.renderTasks(filtered, states, (id, val) => this.handleTaskToggle(id, val));
    UIManager.updateProgress(tasks, states);
    UIManager.updateStatCounters(tasks, states);

    UIManager.showToast(isChecked ? "Görev tamamlandı! 🎉" : "Görev devam ediyor durumuna alındı.");
  }

  renderNotesSection() {
    const notes = StorageService.getNotes();
    UIManager.renderNotes(notes, (noteId) => {
      StorageService.deleteNote(noteId);
      this.renderNotesSection();
      UIManager.showToast("Not silindi.");
    });
  }

  bindEvents() {
    // Tema Butonu
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) themeBtn.addEventListener("click", () => this.toggleTheme());

    // Arama Kutusu
    const searchInput = document.getElementById("task-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        const filtered = this.getFilteredTasks();
        const states = StorageService.getTaskStates();
        UIManager.renderTasks(filtered, states, (id, val) => this.handleTaskToggle(id, val));
      });
    }

    // Durum Filtre Butonları
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.activeStatusFilter = e.target.dataset.filter;
        
        const filtered = this.getFilteredTasks();
        const states = StorageService.getTaskStates();
        UIManager.renderTasks(filtered, states, (id, val) => this.handleTaskToggle(id, val));
      });
    });

    // Hafta Filtresi
    const weekSelect = document.getElementById("week-filter-select");
    if (weekSelect) {
      weekSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        this.activeWeek = val === "all" ? null : parseInt(val, 10);
        this.refreshAll();
      });
    }

    // Sıralama Seçici (3. Hafta)
    const sortSelect = document.getElementById("sort-tasks-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        const filtered = this.getFilteredTasks();
        const states = StorageService.getTaskStates();
        UIManager.renderTasks(filtered, states, (id, val) => this.handleTaskToggle(id, val));
      });
    }

    // Modal Kapatma
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalOverlay = document.getElementById("week-modal");
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => UIManager.closeWeekModal());
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) UIManager.closeWeekModal();
      });
    }

    // Yeni Görev Modalı Olayları (3. Hafta)
    const btnOpenNewTask = document.getElementById("btn-open-new-task-modal");
    const btnCloseNewTask = document.getElementById("btn-close-new-task-modal");
    const modalNewTaskOverlay = document.getElementById("new-task-modal");
    const formNewTask = document.getElementById("form-new-task");

    if (btnOpenNewTask) btnOpenNewTask.addEventListener("click", () => UIManager.openNewTaskModal());
    if (btnCloseNewTask) btnCloseNewTask.addEventListener("click", () => UIManager.closeNewTaskModal());
    if (modalNewTaskOverlay) {
      modalNewTaskOverlay.addEventListener("click", (e) => {
        if (e.target === modalNewTaskOverlay) UIManager.closeNewTaskModal();
      });
    }

    if (formNewTask) {
      formNewTask.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("new-task-title").value.trim();
        const desc = document.getElementById("new-task-desc").value.trim();
        const weekNo = document.getElementById("new-task-week").value;
        const priority = document.getElementById("new-task-priority").value;
        const category = document.getElementById("new-task-category").value.trim() || "Genel";

        if (title) {
          StorageService.addCustomTask({ title, description: desc, weekNo, priority, category });
          formNewTask.reset();
          UIManager.closeNewTaskModal();
          // Filtreyi otomatik olarak tüm haftalara veya eklenen haftaya çekelim ki anında görünsün
          this.activeWeek = null;
          const weekSelect = document.getElementById("week-filter-select");
          if (weekSelect) weekSelect.value = "all";
          this.activeStatusFilter = "all";
          document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
          const allBtn = document.querySelector(".btn-filter[data-filter="all"]");
          if (allBtn) allBtn.classList.add("active");

          this.refreshAll();
          UIManager.showToast("Yeni görev panoya eklendi! ✨");

          // Eklenen göreve hafif kaydırma (scroll)
          const tasksContainer = document.getElementById("tasks-container");
          if (tasksContainer) tasksContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }

    // JSON Veri Yedekleme (Export) Butonu (3. Hafta)
    const btnExport = document.getElementById("btn-export-json");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        const json = StorageService.exportAllDataJSON();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `yg-ders-panosu-yedek-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        UIManager.showToast("Veri yedeği JSON olarak indirildi! 💾");
      });
    }

    // JSON Veri Geri Yükleme (Import) Butonu (3. Hafta)
    const btnImport = document.getElementById("btn-import-json");
    const fileInput = document.getElementById("file-import-json");
    if (btnImport && fileInput) {
      btnImport.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const success = StorageService.importAllDataJSON(event.target.result);
            if (success) {
              this.initTheme();
              this.refreshAll();
              this.renderNotesSection();
              UIManager.showToast("Yedek başarıyla geri yüklendi! 🔄");
            } else {
              UIManager.showToast("Geçersiz yedek dosyası!");
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // Kişisel Not Ekleme Formu
    const noteForm = document.getElementById("new-note-form");
    if (noteForm) {
      noteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("note-title-input");
        const contentInput = document.getElementById("note-content-input");

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (title && content) {
          StorageService.addNote(title, content);
          titleInput.value = "";
          contentInput.value = "";
          this.renderNotesSection();
          UIManager.showToast("Kişisel not eklendi!");
        }
      });
    }
  }
}

function startApp() {
  const app = new App();
  app.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
