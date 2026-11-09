/**
 * AkademiX - Otomatik Kabul Testleri (Issue #3)
 * Geliştirici: İsmail Korkmaz (Test / Kalite Sorumlusu)
 *
 * Bu testler uygulamanın GERÇEKTE kullandığı kodu (js/portal.js, js/a11y.js)
 * ve gerçek sayfayı (index.html) test eder.
 *
 * Çalıştırma: index.html?test=1 adresini açın (veya test-runner.html).
 * Sunucu gerekmez; dosyaya çift tıklayarak da çalışır.
 *
 * Testler kullanıcının verisini bozmaz: başlamadan önce görev listesi ve
 * localStorage yedeklenir, testler bitince geri yüklenir.
 */
(function () {
  "use strict";

  var TASKS_KEY = "akademix_tasks_v1";
  var THEME_KEY = "portal_theme";

  // ---------------------------------------------------------------------
  // Yardımcılar
  // ---------------------------------------------------------------------
  function assert(cond, msg) {
    if (!cond) throw new Error(msg || "Beklenen koşul sağlanmadı");
  }

  function container() {
    return document.getElementById("tasks-list-container");
  }

  function rows() {
    return Array.prototype.slice.call(container().querySelectorAll(".task-row"));
  }

  function visibleRows() {
    return rows().filter(function (r) { return r.style.display !== "none"; });
  }

  function progressPercent() {
    var el = document.getElementById("progress-val-text");
    return el ? parseInt(el.textContent.replace(/[^0-9]/g, ""), 10) : NaN;
  }

  function savedTasks() {
    return JSON.parse(localStorage.getItem(TASKS_KEY) || "null");
  }

  function resetFilters() {
    var q = document.getElementById("task-search-input");
    var w = document.getElementById("filter-week-select");
    if (q) q.value = "";
    if (w) w.value = "all";
    setTaskStatusFilter("all", document.getElementById("btn-filter-all"));
  }

  function hasAccessibleName(el) {
    if (el.getAttribute("aria-label")) return true;
    if (el.getAttribute("aria-labelledby")) return true;
    if (el.labels && el.labels.length > 0) return true;
    if (el.title) return true;
    return false;
  }

  // Toast bildirimleri test sırasında ekranı doldurmasın
  var realToast = window.showPortalToast;

  // ---------------------------------------------------------------------
  // Test senaryoları  (ID'ler docs/test-senaryolari.md ile aynıdır)
  // ---------------------------------------------------------------------
  var TESTS = [
    {
      id: "TC-01", req: "FR-01",
      name: "Haftalık ders kartları görünür ve detayında öğrenme hedefleri listelenir",
      fn: function () {
        var cards = document.querySelectorAll(".week-card");
        assert(cards.length >= 4, "En az 4 hafta kartı bekleniyordu, bulunan: " + cards.length);
        showWeekModal(1);
        var modal = document.getElementById("modal-week-view");
        assert(getComputedStyle(modal).display !== "none", "Hafta detay penceresi açılmadı");
        var topics = document.querySelectorAll("#modal-week-topics-list li");
        assert(topics.length > 0, "Öğrenme hedefleri listesi boş");
        closeWeekModal();
        assert(getComputedStyle(modal).display === "none", "Hafta detay penceresi kapanmadı");
      }
    },
    {
      id: "TC-02", req: "FR-02, FR-06",
      name: "Görev tamamlanınca durumu, sayaçlar ve ilerleme yüzdesi güncellenir",
      fn: function () {
        var row = rows().filter(function (r) { return r.getAttribute("data-status") !== "completed"; })[0];
        assert(row, "Tamamlanmamış görev bulunamadı");
        var before = progressPercent();
        var chk = row.querySelector(".task-checkbox-input");
        chk.checked = true;
        toggleTaskStatus(chk);
        assert(row.getAttribute("data-status") === "completed", "Görev durumu 'completed' olmadı");
        assert(row.classList.contains("completed"), "Görev satırı tamamlandı görünümü almadı");
        assert(progressPercent() > before, "İlerleme yüzdesi artmadı (" + before + " → " + progressPercent() + ")");
      }
    },
    {
      id: "TC-03", req: "FR-08",
      name: "Görev durumu localStorage'a kaydedilir ve yeniden yüklemede korunur",
      fn: function () {
        var row = rows()[0];
        var title = row.querySelector(".task-title").textContent.trim();
        var chk = row.querySelector(".task-checkbox-input");
        chk.checked = !chk.checked;
        toggleTaskStatus(chk);
        var expected = chk.checked ? "completed" : "in-progress";

        var saved = savedTasks();
        assert(Array.isArray(saved), "localStorage'da görev listesi yok");
        var item = saved.filter(function (t) { return t.title === title; })[0];
        assert(item && item.status === expected, "Kaydedilen durum yanlış: " + (item && item.status));

        // Sayfa yenilemesini taklit et: listeyi boşalt ve kayıttan geri yükle
        container().innerHTML = "";
        restoreTasksFromStorage();
        var restored = rows().filter(function (r) {
          return r.querySelector(".task-title").textContent.trim() === title;
        })[0];
        assert(restored, "Görev geri yüklenmedi");
        assert(restored.getAttribute("data-status") === expected, "Geri yüklenen görevin durumu korunmadı");
      }
    },
    {
      id: "TC-04", req: "FR-03, FR-08",
      name: "Yeni görev eklenir ve kalıcı olarak kaydedilir",
      fn: function () {
        var count = rows().length;
        addNewTaskDirectly("TEST görevi - ekleme", "Otomatik test", "3", "Orta", "Test");
        assert(rows().length === count + 1, "Görev sayısı artmadı");
        var saved = savedTasks();
        assert(saved.some(function (t) { return t.title === "TEST görevi - ekleme"; }), "Eklenen görev kaydedilmedi");
      }
    },
    {
      id: "TC-05", req: "NFR (güvenlik)",
      name: "Görev başlığındaki HTML kodu çalıştırılmaz, düz metin olarak gösterilir",
      fn: function () {
        window.__xssTriggered = false;
        addNewTaskDirectly('<img src=x onerror="window.__xssTriggered=true">', "x", "1", "Düşük", "Test");
        var first = container().querySelector(".task-row .task-title");
        assert(first.querySelector("img") === null, "Başlıkta HTML etiketi oluştu");
        assert(first.textContent.indexOf("<img") === 0, "Başlık düz metin olarak gösterilmedi");
        assert(window.__xssTriggered === false, "Zararlı kod çalıştı");
        deleteTaskRow(first.closest(".task-row").querySelector(".btn-task-delete"));
      }
    },
    {
      id: "TC-06", req: "FR-02, FR-08",
      name: "Görev silinir ve silme kalıcı olarak kaydedilir",
      fn: function () {
        var row = rows().filter(function (r) {
          return r.querySelector(".task-title").textContent === "TEST görevi - ekleme";
        })[0];
        assert(row, "Silinecek test görevi bulunamadı");
        var count = rows().length;
        deleteTaskRow(row.querySelector(".btn-task-delete"));
        assert(rows().length === count - 1, "Görev sayısı azalmadı");
        assert(!savedTasks().some(function (t) { return t.title === "TEST görevi - ekleme"; }), "Silinen görev hâlâ kayıtlı");
      }
    },
    {
      id: "TC-07", req: "FR-04",
      name: "Durum filtresi: yalnızca seçilen durumdaki görevler görünür",
      fn: function () {
        resetFilters();
        setTaskStatusFilter("completed", document.getElementById("btn-filter-completed"));
        var vis = visibleRows();
        assert(vis.length > 0, "Tamamlanan görev görünmüyor");
        assert(vis.every(function (r) { return r.getAttribute("data-status") === "completed"; }), "Tamamlanmamış görev de görünüyor");

        setTaskStatusFilter("in-progress", document.getElementById("btn-filter-in-progress"));
        assert(visibleRows().every(function (r) { return r.getAttribute("data-status") === "in-progress"; }), "Devam eden filtresi hatalı");
        resetFilters();
      }
    },
    {
      id: "TC-08", req: "FR-04",
      name: "Hafta filtresi: yalnızca seçilen haftanın görevleri görünür",
      fn: function () {
        resetFilters();
        document.getElementById("filter-week-select").value = "3";
        filterTasks();
        var vis = visibleRows();
        assert(vis.length > 0, "3. hafta görevi görünmüyor");
        assert(vis.every(function (r) { return r.getAttribute("data-week") === "3"; }), "Başka haftanın görevi de görünüyor");
        resetFilters();
      }
    },
    {
      id: "TC-09", req: "FR-05",
      name: "Arama: liste anında daralır, Türkçe büyük harflerle (İ, I) de çalışır",
      fn: function () {
        resetFilters();
        var q = document.getElementById("task-search-input");
        q.value = "zzzz-olmayan-kelime";
        filterTasks();
        assert(visibleRows().length === 0, "Eşleşmeyen aramada görev görünüyor");

        // Türkçe karakter testi: küçük harfle eklenen görev BÜYÜK harfle aranır (ı/İ dönüşümü)
        addNewTaskDirectly("Kullanıcı ihtiyaç listesi TEST", "Türkçe arama testi", "2", "Düşük", "Test");
        q.value = "İHTİYAÇ LİSTESİ";
        filterTasks();
        var found = visibleRows().filter(function (r) {
          return r.querySelector(".task-title").textContent === "Kullanıcı ihtiyaç listesi TEST";
        });
        assert(found.length === 1, "'İHTİYAÇ LİSTESİ' araması 'ihtiyaç listesi' görevini bulamadı (Türkçe büyük/küçük harf hatası)");
        deleteTaskRow(found[0].querySelector(".btn-task-delete"));
        resetFilters();
      }
    },
    {
      id: "TC-10", req: "FR-05",
      name: "Arama sonuç bulamazsa kullanıcıya mesaj gösterilir",
      needs: "updateTasksEmptyMessage",
      fn: function () {
        var q = document.getElementById("task-search-input");
        q.value = "zzzz-olmayan-kelime";
        filterTasks();
        var msg = document.getElementById("tasks-empty-message");
        assert(msg && !msg.hidden && msg.textContent.length > 0, "Boş sonuç mesajı görünmedi");
        resetFilters();
        assert(msg.hidden, "Filtre temizlenince mesaj gizlenmedi");
      }
    },
    {
      id: "TC-11", req: "FR-03",
      name: "Boş görev başlığı kabul edilmez, kullanıcı uyarılır",
      needs: "showTaskTitleError",
      fn: function () {
        var count = rows().length;
        openCreateTaskModal();
        document.getElementById("modal-t-title").value = "   ";
        saveNewTask();
        var err = document.getElementById("modal-t-title-error");
        assert(rows().length === count, "Boş başlıklı görev eklendi");
        assert(err && !err.hidden, "Hata mesajı görünmedi");
        closeCreateTaskModal();
      }
    },
    {
      id: "TC-12", req: "FR-06",
      name: "Hiç görev yokken ilerleme %0 gösterilir, hata oluşmaz",
      fn: function () {
        container().innerHTML = "";
        updateAllStats();
        assert(progressPercent() === 0, "Görev yokken ilerleme %0 değil: %" + progressPercent());
      }
    },
    {
      id: "TC-13", req: "FR-07",
      name: "Tema değiştirilir ve tercih localStorage'a kaydedilir",
      fn: function () {
        var html = document.documentElement;
        var before = html.getAttribute("data-theme") || "light";
        togglePortalTheme();
        var after = html.getAttribute("data-theme");
        assert(after !== before, "Tema değişmedi");
        assert(localStorage.getItem(THEME_KEY) === after, "Tema tercihi kaydedilmedi");
        togglePortalTheme();
        assert(html.getAttribute("data-theme") === before, "Tema geri alınamadı");
      }
    },
    {
      id: "TC-14", req: "FR-08 (hata yönetimi)",
      name: "Bozuk kayıtlı veri uygulamayı çökertmez",
      fn: function () {
        localStorage.setItem(TASKS_KEY, "{bozuk-json");
        var result = loadTasksFromStorage();
        assert(result === null, "Bozuk veri için null bekleniyordu");
      }
    },
    {
      id: "TC-15", req: "FR-08 (hata yönetimi)",
      name: "Tarayıcı kaydedemezse (kota dolu) uygulama çökmez",
      fn: function () {
        var original = Storage.prototype.setItem;
        Storage.prototype.setItem = function () {
          throw new DOMException("Kota doldu", "QuotaExceededError");
        };
        try {
          saveTasksToStorage();
        } catch (e) {
          throw new Error("Kayıt hatası yakalanmadı: " + e.message);
        } finally {
          Storage.prototype.setItem = original;
        }
      }
    },
    {
      id: "TC-16", req: "NFR-02",
      name: "Tüm form alanlarının erişilebilir bir adı (etiketi) var",
      fn: function () {
        var missing = Array.prototype.slice.call(document.querySelectorAll("input, select, textarea"))
          .filter(function (el) { return el.type !== "hidden" && !hasAccessibleName(el); })
          .map(function (el) { return el.id || el.className || el.type; });
        assert(missing.length === 0, "Etiketsiz alanlar: " + missing.join(", "));
      }
    },
    {
      id: "TC-17", req: "NFR-03",
      name: "Tıklanabilir kartlar klavyeyle erişilebilir (role=button + tabindex)",
      fn: function () {
        var bad = Array.prototype.slice.call(document.querySelectorAll(".week-card, .stat-pill"))
          .filter(function (el) { return el.getAttribute("role") !== "button" || el.getAttribute("tabindex") !== "0"; });
        assert(bad.length === 0, bad.length + " kart klavyeyle erişilemiyor");
      }
    }
  ];

  // ---------------------------------------------------------------------
  // Test koşucu
  // ---------------------------------------------------------------------
  function backup() {
    var ls = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      ls[k] = localStorage.getItem(k);
    }
    return {
      ls: ls,
      tasksHtml: container().innerHTML,
      theme: document.documentElement.getAttribute("data-theme")
    };
  }

  function restore(b) {
    localStorage.clear();
    Object.keys(b.ls).forEach(function (k) { localStorage.setItem(k, b.ls[k]); });
    container().innerHTML = b.tasksHtml;
    document.documentElement.setAttribute("data-theme", b.theme || "light");
    resetFilters();
    updateAllStats();
    // updateAllStats kaydı tetikleyebilir; kullanıcının orijinal kaydını geri yaz
    if (b.ls[TASKS_KEY] !== undefined) localStorage.setItem(TASKS_KEY, b.ls[TASKS_KEY]);
    else localStorage.removeItem(TASKS_KEY);
  }

  function runAll() {
    var b = backup();
    window.showPortalToast = function () {};
    var results = [];
    TESTS.forEach(function (t) {
      var r = { id: t.id, req: t.req, name: t.name, status: "GEÇTİ", detail: "" };
      if (t.needs && typeof window[t.needs] !== "function") {
        r.status = "ATLANDI";
        r.detail = "İlgili özellik bu sürümde yok (" + t.needs + ")";
      } else {
        try {
          t.fn();
        } catch (e) {
          r.status = "KALDI";
          r.detail = e.message;
        }
      }
      results.push(r);
    });
    window.showPortalToast = realToast;
    restore(b);
    return results;
  }

  // ---------------------------------------------------------------------
  // Sonuç paneli
  // ---------------------------------------------------------------------
  function render(results) {
    var old = document.getElementById("qa-test-panel");
    if (old) old.remove();

    var pass = results.filter(function (r) { return r.status === "GEÇTİ"; }).length;
    var fail = results.filter(function (r) { return r.status === "KALDI"; }).length;
    var skip = results.filter(function (r) { return r.status === "ATLANDI"; }).length;

    var panel = document.createElement("section");
    panel.id = "qa-test-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Otomatik test sonuçları");
    panel.style.cssText = "position:fixed;inset:5vh 5vw;z-index:99999;overflow:auto;" +
      "background:var(--bg-surface,#fff);color:var(--text-main,#111);border:2px solid var(--primary,#4f46e5);" +
      "border-radius:16px;padding:1.25rem;box-shadow:0 20px 60px rgba(0,0,0,.35);font-size:14px;";

    var rowsHtml = results.map(function (r) {
      var color = r.status === "GEÇTİ" ? "#16a34a" : (r.status === "KALDI" ? "#dc2626" : "#d97706");
      return "<tr>" +
        "<td style='padding:6px;font-weight:700'>" + r.id + "</td>" +
        "<td style='padding:6px'>" + r.req + "</td>" +
        "<td style='padding:6px'>" + escapeAiHtml(r.name) +
          (r.detail ? "<br><small style='color:" + color + "'>" + escapeAiHtml(r.detail) + "</small>" : "") + "</td>" +
        "<td style='padding:6px;font-weight:800;color:" + color + "'>" + r.status + "</td></tr>";
    }).join("");

    panel.innerHTML =
      "<div style='display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap'>" +
        "<h2 style='margin:0'>🧪 Otomatik Kabul Testleri</h2>" +
        "<div style='display:flex;gap:.5rem'>" +
          "<button id='qa-rerun' class='btn-action'>Tekrar çalıştır</button>" +
          "<button id='qa-close' class='btn-action' aria-label='Test panelini kapat'>Kapat</button>" +
        "</div>" +
      "</div>" +
      "<p style='font-size:1.05rem;margin:.75rem 0'><strong>" + pass + "/" + results.length + " GEÇTİ</strong>" +
        (fail ? " · <span style='color:#dc2626'><strong>" + fail + " KALDI</strong></span>" : "") +
        (skip ? " · <span style='color:#d97706'>" + skip + " ATLANDI</span>" : "") +
        " · " + new Date().toLocaleString("tr-TR") + "</p>" +
      "<p style='margin:0 0 .75rem;opacity:.75'>Testler gerçek uygulama kodunu (portal.js, a11y.js) çalıştırır. Verileriniz test öncesi yedeklenip sonrasında geri yüklenir.</p>" +
      "<table style='width:100%;border-collapse:collapse'>" +
        "<thead><tr style='text-align:left;border-bottom:2px solid var(--border-color,#ddd)'>" +
        "<th style='padding:6px'>ID</th><th style='padding:6px'>Gereksinim</th><th style='padding:6px'>Senaryo</th><th style='padding:6px'>Sonuç</th>" +
        "</tr></thead><tbody>" + rowsHtml + "</tbody></table>";

    document.body.appendChild(panel);
    document.getElementById("qa-close").onclick = function () { panel.remove(); };
    document.getElementById("qa-rerun").onclick = function () { render(runAll()); };
    document.getElementById("qa-close").focus();
    console.table(results);
  }

  window.AkademiXTests = { tests: TESTS, run: runAll, show: function () { render(runAll()); } };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(window.AkademiXTests.show, 300); });
  } else {
    setTimeout(window.AkademiXTests.show, 300);
  }
})();
