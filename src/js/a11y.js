/**
 * AkademiX - Erişilebilirlik (a11y) yardımcıları (Issue #5)
 * - Görev onay kutularına görev adını içeren erişilebilir ad verir
 * - Sadece simge içeren butonlara (×, 🗑️) anlamlı ad verir
 * - role="button" olan öğelerin Enter / Boşluk tuşlarıyla çalışmasını sağlar
 * - Esc tuşu ile açık pencereleri (modal) kapatır
 */
(function () {
  "use strict";

  // Görev satırlarındaki onay kutusu ve silme butonlarını etiketle
  function labelTaskControls(root) {
    (root || document).querySelectorAll(".task-row").forEach(function (row) {
      var titleEl = row.querySelector(".task-title");
      var title = titleEl ? titleEl.textContent.trim() : "görev";
      var chk = row.querySelector(".task-checkbox-input");
      if (chk) chk.setAttribute("aria-label", "Tamamlandı olarak işaretle: " + title);
      var del = row.querySelector(".btn-task-delete");
      if (del) del.setAttribute("aria-label", "Görevi sil: " + title);
    });
  }

  // Metni olmayan (yalnızca simge) butonlara ad ver
  function labelIconButtons(root) {
    (root || document).querySelectorAll("button:not([aria-label])").forEach(function (btn) {
      var text = btn.textContent.trim();
      if (/[A-Za-zÇĞİÖŞÜçğıöşü]{2}/.test(text)) return; // görünür yazısı var
      if (btn.title) { btn.setAttribute("aria-label", btn.title); return; }
      if (text === "×" || text === "✕") btn.setAttribute("aria-label", "Kapat / Sil");
    });
  }

  function refresh() {
    labelTaskControls();
    labelIconButtons();
  }

  // role="button" öğeleri klavyeyle tetiklenebilsin
  document.addEventListener("keydown", function (e) {
    var el = e.target;
    if (el && el.getAttribute && el.getAttribute("role") === "button" &&
        (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      el.click();
    }
  });

  // Esc ile açık modalları kapat
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var closers = ["closeWeekModal", "closeCreateTaskModal", "closeCourseGradeWizard", "closeAiApiSettingsModal"];
    closers.forEach(function (fn) {
      if (typeof window[fn] === "function") {
        try { window[fn](); } catch (err) { /* modal zaten kapalı */ }
      }
    });
  });

  // Görevler ve notlar dinamik eklendiği için DOM değişikliklerini izle
  document.addEventListener("DOMContentLoaded", function () {
    refresh();
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; refresh(); });
    }).observe(document.body, { childList: true, subtree: true });
  });
})();
