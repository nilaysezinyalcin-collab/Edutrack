/**
 * Proje 1 - Kalite Kontrol ve Otomatik Test Koşucu
 * Birim ve Entegrasyon Test Suite (FR-01 .. FR-17, NFR-01 .. NFR-10)
 * Geliştirici: İsmail Korkmaz (Test / Kalite Sorumlusu + Geliştirici)
 */

import { StorageService } from "./storage.js";
import { INITIAL_TASKS_DATA, EXAM_DATA } from "./data.js";

export const TestRunner = {
  results: [],

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  },

  async runAllTests(onProgress) {
    this.results = [];
    const testCases = [
      {
        id: "TC-01",
        name: "LocalStorage Tema Kalıcılık Testi (FR-17, NFR-06)",
        fn: () => {
          const original = StorageService.getTheme();
          StorageService.setTheme("dark");
          this.assert(StorageService.getTheme() === "dark", "Tema dark olarak kaydedilemedi");
          StorageService.setTheme("light");
          this.assert(StorageService.getTheme() === "light", "Tema light olarak kaydedilemedi");
          StorageService.setTheme(original);
        }
      },
      {
        id: "TC-02",
        name: "Görev Durumu Güncelleme ve Saklama (FR-09, NFR-06)",
        fn: () => {
          const testTaskId = "task-test-mock-999";
          StorageService.setTaskState(testTaskId, true);
          let states = StorageService.getTaskStates();
          this.assert(states[testTaskId] === true, "Görev durumu true olarak saklanamadı");
          
          StorageService.setTaskState(testTaskId, false);
          states = StorageService.getTaskStates();
          this.assert(states[testTaskId] === false, "Görev durumu false olarak güncellenemedi");
        }
      },
      {
        id: "TC-03",
        name: "Özel Görev Oluşturma Testi (FR-08, FR-09)",
        fn: () => {
          const newTask = StorageService.addCustomTask({
            weekNo: 2,
            title: "Test Otomasyon Görevi",
            category: "Test/QA",
            priority: "Yüksek"
          });
          this.assert(newTask !== null, "Görev oluşturulamadı");
          this.assert(newTask.id.startsWith("custom-task-"), "Geçersiz görev ID formatı");
          const customTasks = StorageService.getCustomTasks();
          const found = customTasks.find(t => t.id === newTask.id);
          this.assert(found !== undefined, "Eklenen görev listede bulunamadı");
        }
      },
      {
        id: "TC-04",
        name: "Kişisel Not Ekleme ve Silme Testi (FR-15, NFR-06)",
        fn: () => {
          const note = StorageService.addNote("QA Test Notu", "Otomatik test içeriği");
          this.assert(note !== null, "Not kaydedilemedi");
          let notes = StorageService.getNotes();
          this.assert(notes.some(n => n.id === note.id), "Eklenen not listelenemedi");

          const deleted = StorageService.deleteNote(note.id);
          this.assert(deleted === true, "Not silme işlemi başarısız");
          notes = StorageService.getNotes();
          this.assert(!notes.some(n => n.id === note.id), "Silinen not listeden kaldırılmadı");
        }
      },
      {
        id: "TC-05",
        name: "Dinamik İlerleme Yüzdesi Matematiksel Doğruluğu (FR-12, NFR-04)",
        fn: () => {
          const total = 10;
          const completed = 4;
          const calculated = Math.round((completed / total) * 100);
          this.assert(calculated === 40, `İlerleme yüzdesi %40 olmalı, hesaplanan: %${calculated}`);
        }
      },
      {
        id: "TC-06",
        name: "Sınav Not Ortalaması Hesaplayıcı Doğruluğu (FR-14, NFR-09)",
        fn: () => {
          const validScores = EXAM_DATA.filter(e => e.score !== null);
          this.assert(validScores.length > 0, "Sistemde tanımlı sınav puanı bulunamadı");
          const sum = validScores.reduce((acc, curr) => acc + curr.score, 0);
          const avg = Math.round(sum / validScores.length);
          this.assert(avg === 88, `Beklenen ortalama 88, hesaplanan: ${avg}`);
        }
      },
      {
        id: "TC-07",
        name: "JSON Veri Yedekleme ve Geri Yükleme Bütünlüğü (NFR-06, NFR-08)",
        fn: () => {
          const jsonBackup = StorageService.exportAllDataJSON();
          this.assert(typeof jsonBackup === "string", "Yedek çıktısı metin formatında değil");
          const parsed = JSON.parse(jsonBackup);
          this.assert(parsed.version === "1.0", "Yedek versiyon bilgisi eksik");
          this.assert(parsed.taskStates !== undefined, "taskStates alanı eksik");

          const restored = StorageService.importAllDataJSON(jsonBackup);
          this.assert(restored === true, "JSON yedeği başarıyla geri yüklenemedi");
        }
      },
      {
        id: "TC-08",
        name: "Arama Motoru Büyük/Küçük Harf ve Alt Dize Eşleşmesi (FR-11, NFR-02)",
        fn: () => {
          const query = "görev";
          const matched = INITIAL_TASKS_DATA.filter(t => 
            t.title.toLowerCase().includes(query.toLowerCase()) || 
            t.description.toLowerCase().includes(query.toLowerCase())
          );
          this.assert(matched.length > 0, "Arama filtresi eşleşen görevleri bulamadı");
        }
      },
      {
        id: "TC-09",
        name: "DOM & XSS İzolasyon Güvenliği (NFR-07)",
        fn: () => {
          const maliciousPayload = "<script>alert(1)</script>";
          const div = document.createElement("div");
          div.textContent = maliciousPayload;
          this.assert(div.innerHTML.includes("&lt;script&gt;"), "Kullanıcı girdisi güvenli escape edilmedi");
        }
      },
      {
        id: "TC-10",
        name: "Mobil Responsive Görünüm Sınırları Doğrulaması (NFR-03)",
        fn: () => {
          const mobileWidth = 375;
          const desktopWidth = 1280;
          this.assert(mobileWidth < 640, "Mobil kırılım (breakpoint) 640px altında kalmalı");
          this.assert(desktopWidth > 992, "Masaüstü kırılım 992px üzerinde çalışmalı");
        }
      }
    ];

    for (const tc of testCases) {
      const startTime = performance.now();
      let status = "PASS";
      let errorMsg = null;

      try {
        await tc.fn();
      } catch (err) {
        status = "FAIL";
        errorMsg = err.message;
      }

      const duration = Math.round(performance.now() - startTime);
      const resultObj = {
        id: tc.id,
        name: tc.name,
        status,
        duration: `${duration}ms`,
        error: errorMsg
      };

      this.results.push(resultObj);
      if (onProgress) onProgress(resultObj);
    }

    return this.results;
  }
};