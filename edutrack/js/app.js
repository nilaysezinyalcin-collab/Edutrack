/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Ana Uygulama Mantığı ve Olay Yöneticisi (3. Hafta Geliştirilmiş Sürüm)
 * Geliştirici: Onur Uzun (Dokümantasyon + Geliştirici) & Ekip
 */

import { INITIAL_WEEKS_DATA, INITIAL_TASKS_DATA, SCHEDULE_DATA, EXAM_DATA } from "./data.js";
import { StorageService } from "./storage.js";
import { UIManager } from "./ui.js";

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
          this.refreshAll();
          UIManager.showToast("Yeni görev başarıyla oluşturuldu! ✨");
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