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

export const StorageService = {
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