/**
 * AkademiX - Etkileşimli Ders Deneyimi Panosu
 * Ana uygulama betiği (index.html içinden ayrıldı)
 */
// 1. TEMA DEĞİŞTİRİCİ (KUSURSUZ VE ANINDA ÇALIŞAN TEMA)
function togglePortalTheme() {
  var html = document.documentElement;
  var cur = html.getAttribute("data-theme") || "light";
  var next = cur === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("portal_theme", next);

  var btn = document.getElementById("theme-btn");
  if (btn) btn.innerHTML = next === "dark" ? "☀️ Aydınlık Mod" : "🌙 Karanlık Mod";
  showPortalToast("Tema: " + (next === "dark" ? "Karanlık Mod 🌙" : "Aydınlık Mod ☀️"));
}

function initTheme() {
  var saved = localStorage.getItem("portal_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  var btn = document.getElementById("theme-btn");
  if (btn) btn.innerHTML = saved === "dark" ? "☀️ Aydınlık Mod" : "🌙 Karanlık Mod";
}

// 2. AUTH & GİRİŞ / KAYIT YÖNETİMİ
var currentUser = null;

function switchAuthTab(tab) {
  document.getElementById("tab-login").classList.toggle("active", tab === "login");
  document.getElementById("tab-register").classList.toggle("active", tab === "register");
  document.getElementById("form-login").style.display = tab === "login" ? "block" : "none";
  document.getElementById("form-register").style.display = tab === "register" ? "block" : "none";
  var errLog = document.getElementById("login-error-msg");
  if (errLog) errLog.style.display = "none";
  var errReg = document.getElementById("reg-error-msg");
  if (errReg) errReg.style.display = "none";
}

function handleLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  var loginInput = document.getElementById("login-email") ? document.getElementById("login-email").value.trim() : "";
  var pass = document.getElementById("login-password") ? document.getElementById("login-password").value : "";
  var errEl = document.getElementById("login-error-msg");

  if (!loginInput) {
    // Otomatik varsayılan demo kullanıcı
    loginInput = "444082";
  }

  var users = JSON.parse(localStorage.getItem("portal_users_db") || "[]");
  var found = users.find(function(u) {
    return (u.email && u.email.toLowerCase() === loginInput.toLowerCase()) ||
           (u.studentNo && String(u.studentNo).trim() === loginInput);
  });

  if (found) {
    currentUser = found;
  } else if (loginInput.toLowerCase().includes("ismail") || loginInput === "444082" || loginInput.toLowerCase() === "ismail@ktu.edu.tr") {
    currentUser = { name: "İsmail Korkmaz", email: "ismail@ktu.edu.tr", studentNo: "444082", dept: "Yazılım Mühendisliği" };
  } else if (loginInput.includes("@")) {
    var prefix = loginInput.split("@")[0].replace(/[._-]/g, " ");
    var capName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    currentUser = { name: capName, email: loginInput, studentNo: "444000", dept: "Yazılım Mühendisliği" };
  } else {
    var cleanName = loginInput.charAt(0).toUpperCase() + loginInput.slice(1);
    currentUser = { name: cleanName, email: loginInput + "@ktu.edu.tr", studentNo: loginInput, dept: "Yazılım Mühendisliği" };
  }

  if (errEl) errEl.style.display = "none";
  localStorage.setItem("portal_session_user", JSON.stringify(currentUser));
  launchPortalApp();
  showPortalToast("AkademiX'e hoş geldin, " + currentUser.name + "! 🚀");
}

function handleRegister(e) {
  if (e && e.preventDefault) e.preventDefault();
  var no = document.getElementById("reg-no") ? document.getElementById("reg-no").value.trim() : "444082";
  var ad = document.getElementById("reg-ad") ? document.getElementById("reg-ad").value.trim() : "İsmail";
  var soyad = document.getElementById("reg-soyad") ? document.getElementById("reg-soyad").value.trim() : "Korkmaz";
  var dept = document.getElementById("reg-dept") ? document.getElementById("reg-dept").value.trim() : "Yazılım Mühendisliği";
  var email = document.getElementById("reg-email") ? document.getElementById("reg-email").value.trim() : "ismail@ktu.edu.tr";
  var pass = document.getElementById("reg-password") ? document.getElementById("reg-password").value : "123456";
  var errEl = document.getElementById("reg-error-msg");
  var succEl = document.getElementById("reg-success-msg");

  if (!no || !ad || !soyad || !email) {
    if (errEl) {
      errEl.style.display = "block";
      errEl.textContent = "❌ Lütfen gerekli alanları doldurunuz!";
    }
    return;
  }

  if (errEl) errEl.style.display = "none";
  currentUser = { name: ad + " " + soyad, email: email, studentNo: no, dept: dept };
  var users = JSON.parse(localStorage.getItem("portal_users_db") || "[]");
  users.push(currentUser);
  localStorage.setItem("portal_users_db", JSON.stringify(users));
  localStorage.setItem("portal_session_user", JSON.stringify(currentUser));

  if (succEl) succEl.style.display = "block";
  launchPortalApp();
  showPortalToast("Hesabın başarıyla oluşturuldu! Hoş geldin, " + currentUser.name + " 🎉");
}

function logoutStudent() {
  localStorage.removeItem("portal_session_user");
  currentUser = null;

  // Giriş ekranına dön
  document.getElementById("auth-section").style.display = "flex";
  document.getElementById("student-portal-app").style.display = "none";
  
  // AI asistan giriş ekranında görünmeye devam eder ve mesaj havuzu sıfırlanır
  var aiW = document.querySelector(".ai-widget-wrapper");
  if (aiW) aiW.style.display = "block";
  toggleAiDrawer(false);
  var cont = document.getElementById("ai-messages-container");
  if (cont) cont.innerHTML = "";

  showPortalToast("Oturum güvenle kapatıldı.");
}

function launchPortalApp() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("student-portal-app").style.display = "block";

  var aiWidget = document.querySelector(".ai-widget-wrapper");
  if (aiWidget) aiWidget.style.display = "block";
  var cont = document.getElementById("ai-messages-container");
  if (cont) cont.innerHTML = "";

  if (currentUser) {
    var elName = document.getElementById("user-display-name");
    if (elName) elName.textContent = currentUser.name;
  }
  renderScheduleUI();
  renderAgnoUI();
  updateAllStats();
  renderTaskCards(currentCardsFilterWeek || "all");
}


// =========================================================================
// KTÜ AGNO VE ÇOKLU DERS HESAPLAMA SİSTEMİ (30 Kişi Kuralı & Değerlendirme Seçimi)
// =========================================================================
var AGNO_STORAGE_KEY = "campusflow_agno_courses_v4";

function openCourseGradeWizard() {
  document.getElementById("modal-grade-wizard").style.display = "flex";
  calcWizTotalWeight();
}

function closeCourseGradeWizard() {
  document.getElementById("modal-grade-wizard").style.display = "none";
}

function toggleRelativeInputs() {
  var isGe30 = document.querySelector('input[name="wiz-class-size"]:checked').value === "ge30";
  document.getElementById("wiz-relative-box").style.display = isGe30 ? "flex" : "none";
}

function toggleWizInput(type) {
  var cb = document.getElementById("wiz-cb-" + type);
  var wInput = document.getElementById("wiz-w-" + type);
  var sInput = document.getElementById("wiz-s-" + type);

  wInput.disabled = !cb.checked;
  sInput.disabled = !cb.checked;
  sInput.required = cb.checked;
  calcWizTotalWeight();
}

function calcWizTotalWeight() {
  var types = ["vize", "final", "lab", "proje", "odev", "quiz"];
  var sum = 0;
  types.forEach(function(t) {
    var cb = document.getElementById("wiz-cb-" + t);
    if (cb && cb.checked) {
      sum += (parseFloat(document.getElementById("wiz-w-" + t).value) || 0);
    }
  });

  var txt = document.getElementById("wiz-total-weight-text");
  if (txt) {
    txt.textContent = "%" + sum + (sum === 100 ? " (Tam)" : " (Hedef: %100)");
    txt.style.color = sum === 100 ? "var(--success)" : "var(--warning)";
  }
}

function getAgnoCourses() {
  try {
    var d = localStorage.getItem(AGNO_STORAGE_KEY);
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

function saveAgnoCourses(list) {
  localStorage.setItem(AGNO_STORAGE_KEY, JSON.stringify(list));
}

function submitCourseGradeWizard(e) {
  e.preventDefault();
  var name = document.getElementById("wiz-course-name").value.trim();
  var credit = parseFloat(document.getElementById("wiz-course-credit").value) || 1;
  var isGe30 = document.querySelector('input[name="wiz-class-size"]:checked').value === "ge30";
  var classAvg = parseFloat(document.getElementById("wiz-class-avg").value) || 55;

  var types = ["vize", "final", "lab", "proje", "odev", "quiz"];
  var totalWeight = 0;
  var weightedSum = 0;
  var finalScore = null;

  types.forEach(function(t) {
    var cb = document.getElementById("wiz-cb-" + t);
    if (cb && cb.checked) {
      var w = parseFloat(document.getElementById("wiz-w-" + t).value) || 0;
      var s = parseFloat(document.getElementById("wiz-s-" + t).value) || 0;
      totalWeight += w;
      weightedSum += (s * w);

      if (t === "final") {
        finalScore = s;
      }
    }
  });

  if (totalWeight <= 0) {
    alert("Lütfen en az bir değerlendirme bileşeni seçin!");
    return;
  }

  var avg = Math.round((weightedSum / totalWeight) * 10) / 10;
  var gradeResult = calculateKtuLetter(avg, finalScore, isGe30, classAvg);

  var courseObj = {
    id: "c-" + Date.now(),
    name: name,
    credit: credit,
    score: avg,
    letter: gradeResult.letter,
    gpa: gradeResult.gpa,
    isRelative: isGe30
  };

  var list = getAgnoCourses();
  list.push(courseObj);
  saveAgnoCourses(list);

  renderAgnoUI();
  closeCourseGradeWizard();
  document.getElementById("form-grade-wizard").reset();
  showPortalToast(name + " dersi ve notu başarıyla eklendi! 🎓");
}

// KTÜ 30 Kişi Kuralı ve Harf Notu Skalası
function calculateKtuLetter(score, finalScore, isGe30, classAvg) {
  // KTÜ Final Barajı: Final < 50 ise doğrudan FF
  if (finalScore !== null && finalScore < 50) {
    return { letter: "FF", gpa: 0.0 };
  }

  // 1. Durum: Sınıf < 30 Kişi (Mutlak Değerlendirme Sistemi)
  if (!isGe30) {
    if (score >= 90) return { letter: "AA", gpa: 4.0 };
    if (score >= 80) return { letter: "BA", gpa: 3.5 };
    if (score >= 75) return { letter: "BB", gpa: 3.0 };
    if (score >= 70) return { letter: "CB", gpa: 2.5 };
    if (score >= 60) return { letter: "CC", gpa: 2.0 };
    if (score >= 50) return { letter: "DC", gpa: 1.5 };
    if (score >= 40) return { letter: "DD", gpa: 1.0 };
    return { letter: "FF", gpa: 0.0 };
  }

  // 2. Durum: Sınıf >= 30 Kişi (Bağıl Değerlendirme / Çan Eğrisi)
  // Çan eğrisinde sınıf ortalamasına göre baremler esner (Örn: Sınıf ortalaması 50 ise CC baremi 50 civarına kayar)
  var diff = score - classAvg;
  if (diff >= 25 || score >= 88) return { letter: "AA", gpa: 4.0 };
  if (diff >= 18 || score >= 80) return { letter: "BA", gpa: 3.5 };
  if (diff >= 10 || score >= 72) return { letter: "BB", gpa: 3.0 };
  if (diff >= 3  || score >= 65) return { letter: "CB", gpa: 2.5 };
  if (diff >= -5 || score >= 55) return { letter: "CC", gpa: 2.0 };
  if (diff >= -12 || score >= 48) return { letter: "DC", gpa: 1.5 };
  if (diff >= -20 || score >= 40) return { letter: "DD", gpa: 1.0 };
  return { letter: "FF", gpa: 0.0 };
}

function deleteAgnoCourse(index) {
  var list = getAgnoCourses();
  list.splice(index, 1);
  saveAgnoCourses(list);
  renderAgnoUI();
  showPortalToast("Ders kaldırıldı.");
}

function renderAgnoUI() {
  var tbody = document.getElementById("agno-courses-tbody");
  var emptyAlert = document.getElementById("agno-empty-alert");
  var valDisplay = document.getElementById("agno-display-val");
  var creditsDisplay = document.getElementById("agno-total-credits");
  var honorStatus = document.getElementById("agno-honor-status");

  if (!tbody) return;
  tbody.innerHTML = "";

  var list = getAgnoCourses();

  if (list.length === 0) {
    if (emptyAlert) emptyAlert.style.display = "block";
    if (valDisplay) valDisplay.textContent = "0.00";
    if (creditsDisplay) creditsDisplay.textContent = "0";
    if (honorStatus) {
      honorStatus.textContent = "Ders ekleyin";
      honorStatus.style.color = "var(--text-muted)";
    }
    return;
  }
  if (emptyAlert) emptyAlert.style.display = "none";

  var totalCredits = 0;
  var weightedGpaSum = 0;

  list.forEach(function(c, idx) {
    totalCredits += c.credit;
    weightedGpaSum += (c.gpa * c.credit);

    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${c.name}</strong>
        <div style="font-size:0.7rem; color:var(--text-muted);">${c.isRelative ? "Bağıl (≥30)" : "Mutlak (<30)"}</div>
      </td>
      <td>${c.credit} AKTS</td>
      <td>${c.score}</td>
      <td><strong style="color:var(--primary); font-size:0.95rem;">${c.letter}</strong> <span style="font-size:0.75rem; color:var(--text-muted);">(${c.gpa})</span></td>
      <td>
        <button onclick="deleteAgnoCourse(${idx})" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:1.1rem;" title="Sil">×</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  var agno = totalCredits > 0 ? (weightedGpaSum / totalCredits) : 0;
  agno = Math.round(agno * 100) / 100;

  valDisplay.textContent = agno.toFixed(2);
  creditsDisplay.textContent = totalCredits;

  if (agno >= 3.50) {
    honorStatus.textContent = "🏆 Yüksek Onur Öğrencisi";
    honorStatus.style.color = "var(--success)";
  } else if (agno >= 3.00) {
    honorStatus.textContent = "🎖️ Onur Öğrencisi";
    honorStatus.style.color = "var(--primary)";
  } else if (agno >= 2.00) {
    honorStatus.textContent = "✓ Başarılı";
    honorStatus.style.color = "var(--success)";
  } else {
    honorStatus.textContent = "⚠️ Sınamalı / Koşullu Durum";
    honorStatus.style.color = "var(--danger)";
  }
}

// 4. KULLANICI DERS PROGRAMI YÖNETİMİ
var SCH_KEY = "campusflow_schedule_items_v3";

function toggleAddCourseForm() {
  var f = document.getElementById("course-add-form");
  f.style.display = f.style.display === "none" ? "block" : "none";
}

function getSchedule() {
  try {
    var d = localStorage.getItem(SCH_KEY);
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

function renderScheduleUI() {
  var tbody = document.getElementById("schedule-table-body");
  var emptyAlert = document.getElementById("schedule-empty-alert");
  var list = getSchedule();
  tbody.innerHTML = "";

  if (list.length === 0) {
    emptyAlert.style.display = "block";
    return;
  }
  emptyAlert.style.display = "none";

  list.forEach(function(item, idx) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.day}</strong></td>
      <td style="font-size:0.8rem;">${item.time}</td>
      <td><strong>${item.name}</strong></td>
      <td><span style="background:var(--bg-hover); padding:0.2rem 0.5rem; border-radius:4px; font-size:0.8rem; font-weight:700;">${item.room}</span></td>
      <td><button onclick="deleteCourse(${idx})" style="background:none; border:none; cursor:pointer; font-size:1.1rem; color:var(--danger);" title="Sil">×</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function submitNewCourse(e) {
  e.preventDefault();
  var day = document.getElementById("course-day").value;
  var time = document.getElementById("course-time").value.trim();
  var name = document.getElementById("course-name").value.trim();
  var room = document.getElementById("course-room").value.trim();

  if (time && name && room) {
    var list = getSchedule();
    list.push({ day: day, time: time, name: name, room: room });
    localStorage.setItem(SCH_KEY, JSON.stringify(list));
    renderScheduleUI();
  renderAgnoUI();
    document.getElementById("course-add-form").reset();
    toggleAddCourseForm();
    showPortalToast("Ders programa eklendi! 📅");
  }
}

function deleteCourse(idx) {
  var list = getSchedule();
  list.splice(idx, 1);
  localStorage.setItem(SCH_KEY, JSON.stringify(list));
  renderScheduleUI();
  renderAgnoUI();
  showPortalToast("Ders silindi.");
}

// 5. GÖREV YÖNETİMİ & İLERLEME
function escapeAiHtml(text) {
  if (text === null || text === undefined) return "";
  var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
}

function escapeAiQuotes(text) {
  if (text === null || text === undefined) return "";
  return String(text).replace(/'/g, "\\'");
}

function toggleTaskStatus(chk) {
  var row = chk.closest(".task-row");
  if (!row) return;
  var isDone = chk.checked;
  row.classList.toggle("completed", isDone);
  row.setAttribute("data-status", isDone ? "completed" : "in-progress");
  updateAllStats();
  filterTasks();
  renderTaskCards(currentCardsFilterWeek || "all");
  showPortalToast(isDone ? "Görev tamamlandı! 🎉" : "Görev devam ediyor durumuna alındı.");
}

// =========================================================================
// DİNAMİK GÖREV KARTLARI VE SİLME/EKLEME MOTORU
// =========================================================================
var currentCardsFilterWeek = "all";
var isTaskCardsPanelOpen = false;

function updateTaskCardsCounter() {
  var rows = document.querySelectorAll(".task-row");
  var totalCount = rows.length;

  var btn = document.getElementById("btn-toggle-task-cards");
  if (btn) {
    if (isTaskCardsPanelOpen) {
      btn.innerHTML = '▲ Görev Kartlarını Kapat (<span id="cards-count-badge">' + totalCount + '</span>)';
    } else {
      btn.innerHTML = '📋 Görev Kartlarını Aç (<span id="cards-count-badge">' + totalCount + '</span>) ▼';
    }
  }

  var badgeAll = document.getElementById("badge-all-cards");
  if (badgeAll) badgeAll.textContent = totalCount;

  ['1', '2', '3', '4'].forEach(function(w) {
    var wCount = document.querySelectorAll('.task-row[data-week="' + w + '"]').length;
    var wBtn = document.getElementById('cards-filter-btn-' + w);
    if (wBtn) {
      wBtn.textContent = w + ". Hafta (" + wCount + ")";
    }
  });
}

function toggleTaskCardsPanel(forceState) {
  if (typeof forceState === "boolean") {
    isTaskCardsPanelOpen = forceState;
  } else {
    isTaskCardsPanelOpen = !isTaskCardsPanelOpen;
  }

  var panel = document.getElementById("task-cards-collapsible");
  if (!panel) return;

  if (isTaskCardsPanelOpen) {
    panel.style.display = "block";
    updateTaskCardsCounter();
    renderTaskCards(currentCardsFilterWeek || "all");
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    panel.style.display = "none";
    updateTaskCardsCounter();
  }
}

function filterTaskCards(week, btn) {
  currentCardsFilterWeek = week || "all";
  document.querySelectorAll("#cards-filter-bar .btn-filter-tag").forEach(function(b) {
    b.classList.remove("active");
  });
  if (btn) {
    btn.classList.add("active");
  } else {
    var targetBtn = document.getElementById(week === "all" ? "cards-filter-btn-all" : "cards-filter-btn-" + week);
    if (targetBtn) targetBtn.classList.add("active");
  }
  renderTaskCards(currentCardsFilterWeek);
}

function renderTaskCards(weekFilter) {
  if (!weekFilter) weekFilter = currentCardsFilterWeek || "all";
  currentCardsFilterWeek = weekFilter;

  var grid = document.getElementById("task-cards-grid");
  if (!grid) return;
  grid.innerHTML = "";

  var rows = document.querySelectorAll(".task-row");
  var matchedCount = 0;

  rows.forEach(function(r, idx) {
    var w = String(r.getAttribute("data-week") || "1").trim();
    if (weekFilter !== "all" && weekFilter !== w) {
      return;
    }
    matchedCount++;

    var isDone = r.classList.contains("completed") || r.getAttribute("data-status") === "completed";
    var priority = r.getAttribute("data-priority") || "Orta";
    var titleEl = r.querySelector(".task-title");
    var title = titleEl ? titleEl.textContent.trim() : ("Görev " + (idx + 1));
    var descEl = r.querySelector(".task-desc");
    var desc = descEl ? descEl.textContent.trim() : "";

    var card = document.createElement("div");
    card.className = "task-card-item" + (isDone ? " completed" : "");
    card.setAttribute("data-week", w);
    card.setAttribute("data-priority", priority);
    card.setAttribute("data-task-title", title);

    var pBadgeClass = priority === "Yüksek" ? "badge-p-high" : (priority === "Düşük" ? "badge-p-low" : "badge-p-mid");

    card.innerHTML = `
      <div class="task-card-top">
        <div class="task-card-badges">
          <span class="mini-badge">${escapeAiHtml(w)}. Hafta</span>
          <span class="mini-badge ${pBadgeClass}">${escapeAiHtml(priority)}</span>
        </div>
        <button class="btn-task-delete" type="button" title="Görevi Sil">🗑️</button>
      </div>
      <div>
        <h4 class="task-card-title">${escapeAiHtml(title)}</h4>
        <p class="task-card-desc">${escapeAiHtml(desc)}</p>
      </div>
      <div class="task-card-footer">
        <label class="task-card-status-label" style="cursor:pointer; display:flex; align-items:center; gap:0.4rem;">
          <input type="checkbox" class="task-card-checkbox" ${isDone ? 'checked' : ''} />
          <span class="task-card-status-text" style="font-size:0.8rem; font-weight:600; color:${isDone ? 'var(--secondary)' : 'var(--text-muted)'};">${isDone ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}</span>
        </label>
        <button class="btn-action btn-action-focus" style="font-size:0.75rem; padding:0.25rem 0.55rem;" type="button">Listede Gör ↓</button>
      </div>
    `;

    // Direct DOM event handlers - immune to quote escaping errors
    var delBtn = card.querySelector(".btn-task-delete");
    if (delBtn) {
      delBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        deleteTaskByTitle(title);
      });
    }

    var chk = card.querySelector(".task-card-checkbox");
    if (chk) {
      chk.addEventListener("change", function(e) {
        toggleTaskFromCard(title, this.checked);
      });
    }

    var focusBtn = card.querySelector(".btn-action-focus");
    if (focusBtn) {
      focusBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        focusTaskInList(title);
      });
    }

    grid.appendChild(card);
  });

  if (matchedCount === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding:2.5rem 1rem; color:var(--text-muted); font-size:0.92rem; background:var(--bg-surface); border-radius:var(--radius-md); border:1px dashed var(--border-color);">Bu hafta veya kriter için henüz görev bulunmuyor.</div>';
  }

  updateTaskCardsCounter();
}

function toggleTaskFromCard(taskTitle, isChecked) {
  var rows = document.querySelectorAll(".task-row");
  rows.forEach(function(r) {
    var t = r.querySelector(".task-title");
    if (t && t.textContent.trim().toLowerCase() === taskTitle.toLowerCase()) {
      var chk = r.querySelector(".task-checkbox-input");
      if (chk) chk.checked = isChecked;
      r.classList.toggle("completed", isChecked);
      r.setAttribute("data-status", isChecked ? "completed" : "in-progress");
    }
  });
  updateAllStats();
  renderTaskCards(currentCardsFilterWeek || "all");
  showPortalToast(isChecked ? "Görev tamamlandı! 🎉" : "Görev devam ediyor durumuna alındı.");
}

function focusTaskInList(taskTitle) {
  var rows = document.querySelectorAll(".task-row");
  rows.forEach(function(r) {
    var t = r.querySelector(".task-title");
    if (t && t.textContent.trim().toLowerCase() === taskTitle.toLowerCase()) {
      r.style.display = "flex";
      r.scrollIntoView({ behavior: "smooth", block: "center" });
      r.classList.add("task-focus-glow");
      setTimeout(function() { r.classList.remove("task-focus-glow"); }, 2400);
    }
  });
}

// GÖREV SİLME FONKSİYONLARI
function deleteTaskRow(btn) {
  var row = btn.closest(".task-row");
  if (row) {
    var title = row.querySelector(".task-title") ? row.querySelector(".task-title").textContent.trim() : "Görev";
    row.remove();
    updateAllStats();
    renderTaskCards(currentCardsFilterWeek || "all");
    showPortalToast("'" + title + "' görevi silindi! 🗑️");
  }
}

function deleteTaskByTitle(taskTitle) {
  var rows = document.querySelectorAll(".task-row");
  var deleted = false;
  var cleanTarget = taskTitle.toLowerCase().trim();
  rows.forEach(function(r) {
    var t = r.querySelector(".task-title");
    if (t) {
      var rTitle = t.textContent.trim().toLowerCase();
      if (rTitle === cleanTarget || rTitle.includes(cleanTarget) || cleanTarget.includes(rTitle)) {
        r.remove();
        deleted = true;
      }
    }
  });

  if (deleted) {
    updateAllStats();
    renderTaskCards(currentCardsFilterWeek || "all");
    showPortalToast("'" + taskTitle + "' görevi silindi! 🗑️");
    return true;
  }
  return false;
}

// =========================================================================
// GÖREV KALICILIĞI (localStorage) - Issue #2
// Görev listesi her değişiklikte kaydedilir, sayfa açılışında geri yüklenir.
// =========================================================================
var TASKS_STORAGE_KEY = "akademix_tasks_v1";
var tasksRestored = false; // Geri yükleme bitmeden kayıt yapılıp veri ezilmesin

// Ekrandaki görev satırlarını düz veri nesnelerine çevirir
function readTasksFromDom() {
  var list = [];
  document.querySelectorAll("#tasks-list-container .task-row").forEach(function(r) {
    var badges = r.querySelectorAll(".task-badges .mini-badge");
    var titleEl = r.querySelector(".task-title");
    var descEl = r.querySelector(".task-desc");
    list.push({
      title: titleEl ? titleEl.textContent.trim() : "",
      desc: descEl ? descEl.textContent.trim() : "",
      week: r.getAttribute("data-week") || "1",
      priority: r.getAttribute("data-priority") || "Orta",
      category: badges[1] ? badges[1].textContent.trim() : "Genel",
      status: r.getAttribute("data-status") === "completed" ? "completed" : "in-progress"
    });
  });
  return list;
}

function saveTasksToStorage() {
  if (!tasksRestored) return;
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(readTasksFromDom()));
  } catch (e) {
    // Kota dolu veya gizli pencere: uygulama çalışmaya devam eder, kullanıcı uyarılır
    console.error("Görevler kaydedilemedi:", e);
    // Diğer bildirimlerin ardından görünmesi için kısa gecikme
    setTimeout(function() {
      showPortalToast("⚠️ Görevler tarayıcıya kaydedilemedi. Değişiklikler yenilemede kaybolabilir.");
    }, 50);
  }
}

function loadTasksFromStorage() {
  try {
    var raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return null;
    var data = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    // Geçersiz kayıtları ayıkla
    return data.filter(function(t) { return t && typeof t.title === "string" && t.title.trim() !== ""; });
  } catch (e) {
    console.error("Kayıtlı görevler okunamadı, varsayılan görevler kullanılacak:", e);
    return null;
  }
}

// Tek bir görev satırı (DOM öğesi) oluşturur
function buildTaskRow(task) {
  var week = String(task.week || "2");
  var priority = task.priority || "Orta";
  var category = task.category || "Genel";
  var isDone = task.status === "completed";

  var row = document.createElement("div");
  row.className = "task-row" + (isDone ? " completed" : "");
  row.setAttribute("data-week", week);
  row.setAttribute("data-status", isDone ? "completed" : "in-progress");
  row.setAttribute("data-priority", priority);

  var pBadgeClass = priority === "Yüksek" ? "badge-p-high" : (priority === "Orta" ? "badge-p-mid" : "");

  row.innerHTML = `
    <input type="checkbox" class="task-checkbox-input" ${isDone ? "checked" : ""} onchange="toggleTaskStatus(this)" />
    <div class="task-body">
      <div class="task-badges">
        <span class="mini-badge">${escapeAiHtml(week)}. Hafta</span>
        <span class="mini-badge">${escapeAiHtml(category)}</span>
        <span class="mini-badge ${pBadgeClass}">${escapeAiHtml(priority)} Öncelik</span>
      </div>
      <div class="task-title">${escapeAiHtml(task.title)}</div>
      <div class="task-desc">${escapeAiHtml(task.desc || "")}</div>
    </div>
    <button class="btn-task-delete" onclick="deleteTaskRow(this)" title="Görevi Sil">🗑️</button>
  `;
  return row;
}

// Kayıtlı görev varsa listeyi onlarla yeniden kurar; yoksa HTML'deki varsayılan görevler kalır
function restoreTasksFromStorage() {
  var saved = loadTasksFromStorage();
  var container = document.getElementById("tasks-list-container");
  if (saved && container) {
    container.innerHTML = "";
    saved.forEach(function(t) { container.appendChild(buildTaskRow(t)); });
  }
  tasksRestored = true;
}

// YENİ GÖREV DOĞRUDAN EKLEME (UI & AI ÇAĞRISI)
function addNewTaskDirectly(title, desc, week, priority, category) {
  if (!title) return false;
  var container = document.getElementById("tasks-list-container");
  var newRow = buildTaskRow({
    title: title,
    desc: desc || "Öğrenci tarafından tanımlanan mini etkinlik.",
    week: week || "2",
    priority: priority || "Yüksek",
    category: category || "Geliştirme",
    status: "in-progress"
  });

  container.prepend(newRow);
  updateAllStats();
  renderTaskCards(currentCardsFilterWeek || "all");

  // Göreve kaydır ve parlat
  newRow.scrollIntoView({ behavior: "smooth", block: "center" });
  newRow.classList.add("task-focus-glow");
  setTimeout(function() { newRow.classList.remove("task-focus-glow"); }, 2400);

  showPortalToast("'" + title + "' görevi başarıyla eklendi! ✨");
  return true;
}

function updateAllStats() {
  var rows = document.querySelectorAll(".task-row");
  var total = rows.length;
  var done = 0;
  var pending = 0;
  var high = 0;

  rows.forEach(function(r) {
    var isDone = r.classList.contains("completed") || r.getAttribute("data-status") === "completed";
    if (isDone) done++;
    else pending++;

    if (r.getAttribute("data-priority") === "Yüksek" && !isDone) high++;
  });

  var pct = total > 0 ? Math.round((done / total) * 100) : 0;
  var fillEl = document.getElementById("portal-progress-fill");
  if (fillEl) fillEl.style.width = pct + "%";
  var valEl = document.getElementById("progress-val-text");
  if (valEl) valEl.textContent = "%" + pct;

  var elTotal = document.getElementById("stat-total-tasks");
  if (elTotal) elTotal.textContent = total;
  var elDone = document.getElementById("stat-done-tasks");
  if (elDone) elDone.textContent = done;
  var elPending = document.getElementById("stat-pending-tasks");
  if (elPending) elPending.textContent = pending;
  var elHigh = document.getElementById("stat-high-tasks");
  if (elHigh) elHigh.textContent = high;

  updateTaskCardsCounter();
  saveTasksToStorage();
}

var taskStatusFilter = "all";
function setTaskStatusFilter(status, btn) {
  taskStatusFilter = status;
  document.querySelectorAll(".filter-btn-group .btn-filter-tag").forEach(function(b) {
    b.classList.remove("active");
  });
  if (btn) btn.classList.add("active");
  filterTasks();
}

function filterByStatCard(type) {
  var btn = null;
  if (type === 'all') {
    btn = document.getElementById("btn-filter-all");
  } else if (type === 'completed') {
    btn = document.getElementById("btn-filter-completed");
  } else if (type === 'in-progress') {
    btn = document.getElementById("btn-filter-in-progress");
  } else if (type === 'high-priority') {
    btn = document.getElementById("btn-filter-high");
  }
  setTaskStatusFilter(type, btn);

  // Smooth scroll to tasks section
  var sec = document.getElementById("tasks-section");
  if (sec) {
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function filterTasks() {
  var qInput = document.getElementById("task-search-input");
  var q = (qInput ? qInput.value : "").toLowerCase();
  var wSelect = document.getElementById("filter-week-select");
  var w = wSelect ? wSelect.value : "all";

  var rows = document.querySelectorAll(".task-row");
  rows.forEach(function(r) {
    var rowWeek = r.getAttribute("data-week");
    var rowStatus = r.getAttribute("data-status");
    var rowPriority = r.getAttribute("data-priority");
    var text = r.textContent.toLowerCase();

    var matchW = (w === "all" || w === rowWeek);
    var matchS = true;
    if (taskStatusFilter === "all") {
      matchS = true;
    } else if (taskStatusFilter === "high-priority") {
      matchS = (rowPriority === "Yüksek");
    } else {
      matchS = (taskStatusFilter === rowStatus);
    }
    var matchQ = (q === "" || text.includes(q));

    r.style.display = (matchW && matchS && matchQ) ? "flex" : "none";
  });
}

function openCreateTaskModal() {
  var m = document.getElementById("modal-create-task");
  if (m) m.style.display = "flex";
}

function closeCreateTaskModal() {
  var m = document.getElementById("modal-create-task");
  if (m) m.style.display = "none";
}

function saveNewTask(e) {
  if (e) e.preventDefault();
  var titleInput = document.getElementById("modal-t-title");
  var title = titleInput ? titleInput.value.trim() : "";
  var descInput = document.getElementById("modal-t-desc");
  var desc = descInput ? descInput.value.trim() : "";
  var weekSelect = document.getElementById("modal-t-week");
  var week = weekSelect ? weekSelect.value : "2";
  var prioritySelect = document.getElementById("modal-t-priority");
  var priority = prioritySelect ? prioritySelect.value : "Orta";
  var catInput = document.getElementById("modal-t-cat");
  var cat = (catInput ? catInput.value.trim() : "") || "Genel";

  if (title) {
    var container = document.getElementById("tasks-list-container");
    var newRow = buildTaskRow({ title: title, desc: desc, week: week, priority: priority, category: cat, status: "in-progress" });

    container.prepend(newRow);
    closeCreateTaskModal();
    updateAllStats();
    filterTasks();
    renderTaskCards(currentCardsFilterWeek || "all");
    showPortalToast("Yeni görev başarıyla eklendi! ✨");

    // Clear modal form
    if (titleInput) titleInput.value = "";
    if (descInput) descInput.value = "";
  }
}

// 6. HAFTA DETAY MODALI
var WEEK_MODAL_DATA = {
  1: {
    title: "1. Hafta: Yazılım Yaşam Döngüsü & İhtiyaç Analizi",
    desc: "Proje gereksinimlerinin belirlenmesi, 17 FR ve 10 NFR kullanıcı hikâyelerinin çıkarılması.",
    topics: [
      "Yazılım geliştirme süreç modelleri (Agile, Scrum)",
      "İhtiyaç analizi ve fonksiyonel (17 FR) gereksinimler",
      "Fonksiyonel olmayan (10 NFR) kalite kriterleri",
      "Git & GitHub repo kurulumu ve rol paylaşımı"
    ]
  },
  2: {
    title: "2. Hafta: Arayüz Tasarımı & Temel İskelet",
    desc: "Akış şeması ve ER diyagramı doğrultusunda öğrenci paneli iskeletinin kurulması.",
    topics: [
      "Giriş & Kayıt akışı ve yetkilendirme simülasyonu",
      "Responsive mobil uyumlu grid ve kart mimarisi",
      "İlerleme çubuğu, sayaçlar ve dinamik görev durumu",
      "KTÜ not sistemi entegrasyonu ve ders programı takibi"
    ]
  },
  3: {
    title: "3. Hafta: İleri Etkileşim & KTÜ Not Entegrasyonu",
    desc: "Dinamik görev filtreleme, anlık metin araması, durum yönetimi ve görsel geri bildirimler.",
    topics: [
      "JavaScript dinamik filtreleme ve çoklu kriter süzme",
      "Anlık başlık ve açıklama arama motoru",
      "İnteraktif sınav ortalaması ve harf notu hesaplayıcı",
      "Birim test senaryolarının kodlanması ve doğrulanması"
    ]
  },
  4: {
    title: "4. Hafta: Kalite Güvencesi, Dokümantasyon ve Canlı Demo",
    desc: "Proje 1 kapsamındaki son kullanıcı testleri, kapsamlı dokümantasyon, sunum hazırlığı ve canlı demo.",
    topics: [
      "Çapraz tarayıcı (cross-browser) ve mobil uyumluluk testleri",
      "Test matrisi doğrulama raporu (%100 PASS)",
      "Proje teknik raporu ve kullanıcı dokümantasyonunun tamamlanması",
      "Canlı demo sunumu ve akran değerlendirmesi"
    ]
  }
};

var currentModalWeek = 1;
function showWeekModal(wNo) {
  currentModalWeek = wNo;
  var d = WEEK_MODAL_DATA[wNo];
  if (!d) return;
  document.getElementById("modal-week-title-text").textContent = d.title;
  document.getElementById("modal-week-desc-text").textContent = d.desc;
  
  var ul = document.getElementById("modal-week-topics-list");
  ul.innerHTML = "";
  d.topics.forEach(function(t) {
    var li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });

  var taskContainer = document.getElementById("modal-week-tasks-list");
  taskContainer.innerHTML = "";
  var weekRows = document.querySelectorAll('.task-row[data-week="' + wNo + '"]');
  weekRows.forEach(function(r) {
    var title = r.querySelector(".task-title").textContent;
    var isDone = r.classList.contains("completed");
    var priority = r.getAttribute("data-priority");
    var div = document.createElement("div");
    div.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--bg-hover); padding:0.45rem 0.75rem; border-radius:8px; font-size:0.83rem;";
    div.innerHTML = `
      <span>${isDone ? '✅' : '⏳'} <strong>${title}</strong></span>
      <span style="font-size:0.75rem; color:${priority === 'Yüksek' ? 'var(--danger)' : 'var(--text-muted)'}; font-weight:700;">${priority}</span>
    `;
    taskContainer.appendChild(div);
  });

  var filterBtn = document.getElementById("modal-week-filter-btn");
  if (filterBtn) {
    filterBtn.textContent = "🔍 " + wNo + ". Haftanın Görevlerini Filtrele ve Gör (" + weekRows.length + " Görev)";
  }

  document.getElementById("modal-week-view").style.display = "flex";
}

function filterWeekAndGo() {
  document.getElementById("filter-week-select").value = currentModalWeek;
  filterTasks();
  closeWeekModal();
  var sec = document.getElementById("tasks-section");
  if (sec) {
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  showPortalToast(currentModalWeek + ". Hafta görevleri listelendi! 📋");
}

function closeWeekModal() {
  document.getElementById("modal-week-view").style.display = "none";
}

// 7. KİŞİSEL NOTLAR
function submitPersonalNote(e) {
  e.preventDefault();
  var t = document.getElementById("p-note-title").value.trim();
  var c = document.getElementById("p-note-content").value.trim();

  if (t && c) {
    var cont = document.getElementById("personal-notes-container");
    var d = document.createElement("div");
    d.className = "side-card";
    d.style.padding = "0.75rem";
    d.style.background = "var(--bg-hover)";
    d.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.88rem;">
        <span>${t}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; cursor:pointer; color:var(--danger); font-size:1.1rem; line-height:1;">×</button>
      </div>
      <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">${c}</div>
    `;
    cont.prepend(d);
    document.getElementById("p-note-title").value = "";
    document.getElementById("p-note-content").value = "";
    showPortalToast("Not kaydedildi! 📝");
  }
}

// 8. TOAST BİLDİRİMİ
function showPortalToast(msg) {
  var t = document.getElementById("portal-toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(function() { t.style.display = "none"; }, 2400);
}

// BAŞLANGIÇ ÇALIŞTIRICISI
window.addEventListener("DOMContentLoaded", function() {
  initTheme();
  restoreTasksFromStorage();

  var session = localStorage.getItem("portal_session_user");
  if (session) {
    try {
      currentUser = JSON.parse(session);
      launchPortalApp();
    } catch(e) {
      currentUser = null;
      document.getElementById("auth-section").style.display = "flex";
      document.getElementById("student-portal-app").style.display = "none";
      // ai-widget stays visible in the corner
    }
  } else {
    currentUser = null;
    document.getElementById("auth-section").style.display = "flex";
    document.getElementById("student-portal-app").style.display = "none";
    var aiW = document.querySelector(".ai-widget-wrapper");
    if (aiW) aiW.style.display = "block";
    var speechBubble = document.getElementById("ai-speech-bubble");
    if (speechBubble) {
      var spanEl = speechBubble.querySelector("span:nth-child(2)");
      if (spanEl) spanEl.textContent = "👋 Giriş ve kayıt asistanı için tıkla!";
    }
  }
  renderTaskCards("all");
});


// =========================================================================

// =========================================================================
// AI AGENTIC AKSİYON FONKSİYONLARI (Ders Programı, AGNO, Notlar, Görevler)
// =========================================================================
function clearScheduleDirectly() {
  localStorage.setItem(SCH_KEY, JSON.stringify([]));
  renderScheduleUI();
  showPortalToast("Haftalık ders programı temizlendi 🧹");
  return true;
}

function quickDemoLogin() {
  currentUser = { name: "İsmail Korkmaz", email: "ismail@ktu.edu.tr", studentNo: "444082", dept: "Yazılım Mühendisliği" };
  localStorage.setItem("portal_session_user", JSON.stringify(currentUser));
  launchPortalApp();
  toggleAiDrawer(false);
  showPortalToast("Hızlı giriş yapıldı! Hoş geldin İsmail Korkmaz 🎉");
}

function addScheduleCourseDirectly(day, time, name, room) {
  day = day || "Pazartesi";
  time = time || "10:00 - 12:00";
  name = name || "Yeni Ders";
  room = room || "D101";

  var list = getSchedule();
  list.push({ day: day, time: time, name: name, room: room });
  localStorage.setItem(SCH_KEY, JSON.stringify(list));
  renderScheduleUI();
  showPortalToast("'" + name + "' dersi programa eklendi! 📅");
  return true;
}

function createDefaultScheduleDirectly() {
  var sample = [
    { day: "Pazartesi", time: "09:00 - 12:00", name: "Yazılım Mühendisliği", room: "D201" },
    { day: "Salı", time: "10:00 - 12:00", name: "Veritabanı Sistemleri", room: "LAB-2" },
    { day: "Çarşamba", time: "13:00 - 16:00", name: "Algoritma Analizi", room: "D104" },
    { day: "Perşembe", time: "09:00 - 11:00", name: "Web Programlama", room: "LAB-1" },
    { day: "Cuma", time: "14:00 - 16:00", name: "Yazılım Kalite & Test", room: "D303" }
  ];
  localStorage.setItem(SCH_KEY, JSON.stringify(sample));
  renderScheduleUI();
  showPortalToast("Örnek haftalık ders programı oluşturuldu! 📅✨");
  return true;
}

function deleteCourseByName(courseName) {
  var list = getSchedule();
  var origLen = list.length;
  list = list.filter(function(item) {
    return !item.name.toLowerCase().includes(courseName.toLowerCase());
  });
  if (list.length < origLen) {
    localStorage.setItem(SCH_KEY, JSON.stringify(list));
    renderScheduleUI();
    showPortalToast("'" + courseName + "' dersi programdan silindi! 🗑️");
    return true;
  }
  return false;
}

function addAgnoCourseDirectly(name, credit, avg, letter, point) {
  var list = getAgnoCourses();
  list.push({
    name: name,
    credit: credit,
    avg: avg,
    letter: letter,
    point: point
  });
  saveAgnoCourses(list);
  renderAgnoUI();
  showPortalToast("'" + name + "' (" + letter + ") AGNO tablosuna eklendi! 🎓");
  return true;
}

function addPersonalNoteDirectly(title, content) {
  var cont = document.getElementById("personal-notes-container");
  if (!cont) return false;
  var d = document.createElement("div");
  d.className = "side-card";
  d.style.padding = "0.75rem";
  d.style.background = "var(--bg-hover)";
  d.innerHTML = `
    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.88rem;">
      <span>${escapeAiHtml(title)}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; cursor:pointer; color:var(--danger); font-size:1.1rem; line-height:1;">×</button>
    </div>
    <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">${escapeAiHtml(content)}</div>
  `;
  cont.prepend(d);
  d.scrollIntoView({ behavior: "smooth", block: "center" });
  showPortalToast("'" + title + "' kişisel notlara kaydedildi! 📝");
  return true;
}

function markTaskCompletedDirectly(taskTitle, isDone) {
  isDone = (isDone !== false);
  var rows = document.querySelectorAll(".task-row");
  var found = false;
  rows.forEach(function(r) {
    var t = r.querySelector(".task-title");
    if (t && t.textContent.trim().toLowerCase().includes(taskTitle.toLowerCase())) {
      var chk = r.querySelector(".task-checkbox-input");
      if (chk) chk.checked = isDone;
      r.classList.toggle("completed", isDone);
      r.setAttribute("data-status", isDone ? "completed" : "in-progress");
      found = true;
    }
  });
  if (found) {
    updateAllStats();
    renderTaskCards(currentCardsFilterWeek || "all");
    showPortalToast(isDone ? "Görev tamamlandı! 🎉" : "Görev devam ediyor durumuna alındı.");
    return true;
  }
  return false;
}

// ZENITH AI ASSISTANT KONTROLÖRÜ & MOTORU
// =========================================================================
var aiDrawerOpen = false;

function toggleAiDrawer(forceOpen) {
  aiDrawerOpen = (typeof forceOpen === 'boolean') ? forceOpen : !aiDrawerOpen;
  var drawer = document.getElementById("ai-chat-drawer");
  var bubble = document.getElementById("ai-speech-bubble");
  
  if (aiDrawerOpen) {
    drawer.classList.add("open");
    if (bubble) bubble.style.display = "none";
    document.getElementById("ai-user-input").focus();
    
    var cont = document.getElementById("ai-messages-container");
    if (cont.children.length === 0) {
      sendInitialAiGreeting();
    }
  } else {
    drawer.classList.remove("open");
  }
}

function dismissAiBubble() {
  var bubble = document.getElementById("ai-speech-bubble");
  if (bubble) bubble.style.display = "none";
}

function sendInitialAiGreeting() {
  var isLogged = !!currentUser;
  var bubbleText = isLogged ? "👋 Sana nasıl yardımcı olabilirim?" : "👋 Giriş yardımcısı için tıkla!";
  var speechBubble = document.getElementById("ai-speech-bubble");
  if (speechBubble) {
    speechBubble.querySelector("span:nth-child(2)").textContent = bubbleText;
  }

  if (!isLogged) {
    // GİRİŞ EKRANINDAKİ ÖZEL KARŞILAMA VE REHBERLİK
    appendAiBotMessage({
      text: "👋 Merhaba! Ben **AkademiX Asistanı**. Şu anda giriş ekranındasın.\n\nÖğrenci paneline nasıl giriş yapabileceğin, kayıt olma veya sistem akışı hakkında merak ettiğin her şeyi bana sorabilirsin! İstersen tek tıkla test girişi de yapabilirsin:",
      actions: [
        { label: "🚀 Hızlı Demo Girişi (İsmail Korkmaz)", action: "quick_demo_login" },
        { label: "🔐 Nasıl Giriş Yapılır?", action: "quick_prompt", param: "nasıl giriş yapılır" },
        { label: "📝 Yeni Hesap Nasıl Açılır?", action: "quick_prompt", param: "nasıl kayıt olunur" },
        { label: "🎓 AkademiX & KTÜ Kuralları", action: "quick_prompt", param: "akademix nedir" }
      ]
    });
  } else {
    // PANEL İÇİNDEKİ AKTİF ÖĞRENCİ DANIŞMANI
    var userName = currentUser.name || "Öğrenci";
    var welcomeText = "Merhaba **" + userName + "**! Ben **AkademiX AI**, KTÜ öğrenci başarı ve ders danışmanınım. 🏔️✨\n\nEkranda gördüğün her şeyi benimle yönetebilirsin: Ders programı oluşturabilir, vize/final notunu hesaplayıp AGNO'ya ekleyebilir, görev veya kişisel not ekleyebilirsin!";
    appendAiBotMessage({
      text: welcomeText,
      actions: [
        { label: "📅 Örnek Ders Programı Oluştur", action: "quick_prompt", param: "bana ders programı oluştur" },
        { label: "🧮 Vize 70 Final 80 Notumu Hesapla", action: "quick_prompt", param: "vize 70 final 80 harf notum ne olur" },
        { label: "🎯 2. Hafta Görevlerim Neler?", action: "quick_prompt", param: "2. hafta görevlerim neler?" },
        { label: "📊 KTÜ 30 Kişi Kuralı Nedir?", action: "quick_prompt", param: "KTÜ 30 kişi kuralı nedir?" }
      ]
    });
  }
}

function resetAiChat() {
  var cont = document.getElementById("ai-messages-container");
  cont.innerHTML = "";
  sendInitialAiGreeting();
}

function sendAiQuickPrompt(promptText) {
  document.getElementById("ai-user-input").value = promptText;
  handleAiUserSubmit(new Event('submit'));
}


// =========================================================================
// GERÇEK YAPAY ZEKA API ENTEGRASYONU (GOOGLE GEMINI & OPENAI)
// =========================================================================
var AI_CONFIG_KEY_PROVIDER = "akx_ai_provider";
var AI_CONFIG_KEY_KEY = "akx_ai_key";
var AI_CONFIG_KEY_MODEL = "akx_ai_model";

function getAiProvider() {
  return localStorage.getItem(AI_CONFIG_KEY_PROVIDER) || "gemini";
}

var DEFAULT_AI_KEY = "";

function getAiApiKey() {
  var saved = localStorage.getItem(AI_CONFIG_KEY_KEY);
  if (saved !== null && saved !== undefined) return saved.trim();
  return DEFAULT_AI_KEY;
}

function getAiModel() {
  var p = getAiProvider();
  var def = p === "openai" ? "gpt-4o-mini" : "gemini-flash-latest";
  return localStorage.getItem(AI_CONFIG_KEY_MODEL) || def;
}

function updateAiProviderBadge() {
  var badge = document.getElementById("ai-provider-badge");
  if (!badge) return;

  var p = getAiProvider();
  var key = getAiApiKey();

  if (p !== "local" && key) {
    badge.className = "ai-provider-badge active-api";
    var label = p === "openai" ? "🌐 ChatGPT (Canlı)" : "🌐 Gemini AI (Canlı)";
    badge.innerHTML = `<span style="font-size:0.8rem;">●</span> ${label}`;
    badge.title = "Canlı Yapay Zeka API bağlı (" + getAiModel() + ") - Değiştirmek için tıkla";
  } else {
    badge.className = "ai-provider-badge";
    badge.innerHTML = `<span>⚡</span> Yerel Motor`;
    badge.title = "Dahili KTÜ kural motoru devrede - Gerçek API bağlamak için tıkla";
  }
}

function openAiApiSettingsModal() {
  var modal = document.getElementById("modal-ai-api-settings");
  if (!modal) return;

  var selP = document.getElementById("ai-settings-provider");
  var inpK = document.getElementById("ai-settings-key");
  var selM = document.getElementById("ai-settings-model");
  var fb = document.getElementById("ai-test-feedback");
  if (fb) fb.style.display = "none";

  if (selP) selP.value = getAiProvider();
  if (inpK) inpK.value = getAiApiKey();

  handleAiProviderChange();

  if (selM) selM.value = getAiModel();

  modal.style.display = "flex";
}

function closeAiApiSettingsModal() {
  var modal = document.getElementById("modal-ai-api-settings");
  if (modal) modal.style.display = "none";
}

function handleAiProviderChange() {
  var selP = document.getElementById("ai-settings-provider");
  var p = selP ? selP.value : "gemini";
  var keyGrp = document.getElementById("ai-key-group");
  var modelGrp = document.getElementById("ai-model-group");
  var selM = document.getElementById("ai-settings-model");
  var link = document.getElementById("ai-key-link");
  var inpK = document.getElementById("ai-settings-key");

  if (p === "local") {
    if (keyGrp) keyGrp.style.display = "none";
    if (modelGrp) modelGrp.style.display = "none";
  } else {
    if (keyGrp) keyGrp.style.display = "block";
    if (modelGrp) modelGrp.style.display = "block";

    if (p === "openai") {
      if (link) {
        link.href = "https://platform.openai.com/api-keys";
        link.textContent = "🔑 OpenAI API Key Al ↗";
      }
      if (inpK) inpK.placeholder = "sk-...";
      if (selM) {
        selM.innerHTML = `
          <option value="gpt-4o-mini">gpt-4o-mini (Hızlı & Ekonomik)</option>
          <option value="gpt-4o">gpt-4o (En Yetenekli)</option>
        `;
      }
    } else {
      // Gemini
      if (link) {
        link.href = "https://aistudio.google.com/app/apikey";
        link.textContent = "🔑 Ücretsiz Gemini API Key Al ↗";
      }
      if (inpK) inpK.placeholder = "AIzaSy...";
      if (selM) {
        selM.innerHTML = `
          <option value="gemini-flash-latest">gemini-flash-latest (En Güncel Flash - Önerilen)</option>
          <option value="gemini-pro-latest">gemini-pro-latest (En Güncel Pro Model)</option>
          <option value="gemini-1.5-flash">gemini-1.5-flash (Hızlı & Kararlı)</option>
          <option value="gemini-2.0-flash">gemini-2.0-flash (Yeni Nesil)</option>
        `;
      }
    }
  }
}

function toggleApiKeyVisibility() {
  var inp = document.getElementById("ai-settings-key");
  if (!inp) return;
  inp.type = inp.type === "password" ? "text" : "password";
}

function saveAiApiSettings() {
  var p = document.getElementById("ai-settings-provider").value;
  var k = document.getElementById("ai-settings-key").value.trim();
  var m = document.getElementById("ai-settings-model").value;

  localStorage.setItem(AI_CONFIG_KEY_PROVIDER, p);
  localStorage.setItem(AI_CONFIG_KEY_KEY, k);
  localStorage.setItem(AI_CONFIG_KEY_MODEL, m);

  updateAiProviderBadge();
  closeAiApiSettingsModal();

  if (p !== "local" && k) {
    showPortalToast("🎉 " + (p === "openai" ? "OpenAI" : "Google Gemini") + " API başarıyla bağlandı!");
  } else {
    showPortalToast("Dahili yerel yapay zeka motoru devrede ⚡");
  }
}

function clearAiApiKey() {
  localStorage.setItem(AI_CONFIG_KEY_PROVIDER, "local");
  localStorage.removeItem(AI_CONFIG_KEY_KEY);
  localStorage.removeItem(AI_CONFIG_KEY_MODEL);

  var inpK = document.getElementById("ai-settings-key");
  var selP = document.getElementById("ai-settings-provider");
  if (inpK) inpK.value = "";
  if (selP) selP.value = "local";
  handleAiProviderChange();

  updateAiProviderBadge();
  var fb = document.getElementById("ai-test-feedback");
  if (fb) {
    fb.style.display = "block";
    fb.style.background = "rgba(239,68,68,0.1)";
    fb.style.color = "var(--danger)";
    fb.style.border = "1px solid var(--danger)";
    fb.innerHTML = "🧹 API anahtarı temizlendi. Sistem yerel akıllı motora geçirildi.";
  }
  showPortalToast("API anahtarı sıfırlandı. Yerel mod devrede.");
}

async function testAiApiConnection() {
  var p = document.getElementById("ai-settings-provider").value;
  var k = document.getElementById("ai-settings-key").value.trim();
  var m = document.getElementById("ai-settings-model").value;
  var fb = document.getElementById("ai-test-feedback");
  if (!fb) return;

  if (p === "local") {
    fb.style.display = "block";
    fb.style.background = "rgba(99,102,241,0.1)";
    fb.style.color = "var(--primary)";
    fb.style.border = "1px solid var(--primary)";
    fb.innerHTML = "⚡ Yerel mod seçili: Herhangi bir API anahtarına gerek olmadan doğrudan çalışır!";
    return;
  }

  if (!k) {
    fb.style.display = "block";
    fb.style.background = "rgba(239,68,68,0.1)";
    fb.style.color = "var(--danger)";
    fb.style.border = "1px solid var(--danger)";
    fb.innerHTML = "❌ Lütfen önce bir API anahtarı giriniz!";
    return;
  }

  fb.style.display = "block";
  fb.style.background = "rgba(245,158,11,0.1)";
  fb.style.color = "var(--warning)";
  fb.style.border = "1px solid var(--warning)";
  fb.innerHTML = "⏳ Bağlantı test ediliyor, lütfen bekleyiniz...";

  try {
    var reply = "";
    if (p === "openai") {
      reply = await callOpenAiApi("Test bağlantısı, lütfen sadece 'OK' yaz.", k, m);
    } else {
      reply = await callGeminiApi("Test ping, cevap olarak sadece 'Hazırım' de.", k, m);
    }

    fb.style.background = "rgba(16,185,129,0.12)";
    fb.style.color = "#059669";
    fb.style.border = "1px solid #10b981";
    fb.innerHTML = `✅ <strong>Bağlantı Başarılı!</strong> (${p.toUpperCase()} - ${m})<br/><small style="opacity:0.85;">Model Yanıtı: "${escapeAiHtml(reply.slice(0, 80))}"</small>`;
  } catch(err) {
    fb.style.background = "rgba(239,68,68,0.12)";
    fb.style.color = "var(--danger)";
    fb.style.border = "1px solid var(--danger)";
    fb.innerHTML = `❌ <strong>Bağlantı Hatası:</strong> ${escapeAiHtml(err.message || "Bilinmeyen hata")}<br/><small style="opacity:0.8;">Lütfen API anahtarınızı ve internet bağlantınızı kontrol ediniz.</small>`;
  }
}

async function callGeminiApi(promptText, apiKey, model) {
  model = model || "gemini-flash-latest";
  var candidateModels = [model];
  if (model !== "gemini-flash-latest") candidateModels.push("gemini-flash-latest");
  if (model !== "gemini-pro-latest") candidateModels.push("gemini-pro-latest");
  if (model !== "gemini-1.5-flash") candidateModels.push("gemini-1.5-flash");

  var lastErr = null;
  for (var i = 0; i < candidateModels.length; i++) {
    var curModel = candidateModels[i];
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" + curModel + ":generateContent?key=" + apiKey;
    try {
      return await executeGeminiRequest(url, promptText);
    } catch(e) {
      lastErr = e;
      // If 404, try next candidate model
      if (String(e.message).indexOf("404") === -1 && String(e.message).indexOf("not found") === -1) {
        throw e;
      }
    }
  }
  throw lastErr || new Error("Gemini API yanıt vermedi.");
}

async function executeGeminiRequest(url, promptText) {

  var systemContext = "Sen Karadeniz Teknik Üniversitesi (KTÜ) Yazılım Mühendisliği Öğrenci Başarı ve Ders Paneli 'AkademiX'in sevimli, zeki yapay zeka danışmanısın. İsmail Korkmaz (444082), Nilay Sezin Yalçın, Oğuzhan İnce ve Onur Uzun (Grup 4) tarafından geliştirildin. Görevin öğrencilere ders içerikleri, haftalık görevler, KTÜ 30 kişi kuralı (30'dan azsa MDS mutlak harf notları, 30 ve üzeriyse BDS çan eğrisi; final barajı en az 50), ders programı ve sınav notu hesaplama konularında samimi, motive edici, nazik ve emojili Türkçe rehberlik etmektir. Yanıtlarını kısa, net, samimi ve markdown formatında ver.";

  var payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemContext + "\n\nÖğrenci: " + promptText }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800
    }
  };

  var resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    var errData = await resp.json().catch(function() { return {}; });
    var msg = (errData && errData.error && errData.error.message) ? errData.error.message : ("HTTP " + resp.status);
    throw new Error(msg);
  }

  var data = await resp.json();
  var text = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] ? data.candidates[0].content.parts[0].text : null;
  if (!text) throw new Error("Gemini API'den geçerli metin yanıtı alınamadı.");
  return text;
}

async function callOpenAiApi(promptText, apiKey, model) {
  model = model || "gpt-4o-mini";
  var url = "https://api.openai.com/v1/chat/completions";

  var systemPrompt = "Sen KTÜ Yazılım Mühendisliği AkademiX panelinin yapay zeka danışmanısın. İsmail Korkmaz ve Grup 4 tarafından geliştirildin. Öğrencilere KTÜ dersleri, 30 kişi kuralı, BDS çan eğrisi, ders programı ve not hesaplama konularında samimi, emojili ve yardımcı Türkçe cevaplar verirsin.";

  var payload = {
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: promptText }
    ],
    temperature: 0.7
  };

  var resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    var errData = await resp.json().catch(function() { return {}; });
    var msg = (errData && errData.error && errData.error.message) ? errData.error.message : ("HTTP " + resp.status);
    throw new Error(msg);
  }

  var data = await resp.json();
  return (data && data.choices && data.choices[0] && data.choices[0].message) ? data.choices[0].message.content : "Yanıt alınamadı.";
}

function detectExtraActionsForPrompt(query) {
  var raw = query.toLowerCase().trim();
  var actions = [];
  var cards = [];

  var vizeMatch = raw.match(/vize[a-z]*\s*[:=\s]?\s*(\d+)/);
  var finalMatch = raw.match(/final[a-z]*\s*[:=\s]?\s*(\d+)/);
  if (vizeMatch && finalMatch) {
    var vize = parseFloat(vizeMatch[1]);
    var fin = parseFloat(finalMatch[1]);
    var avg = Math.round(((vize * 0.4) + (fin * 0.6)) * 10) / 10;
    var letter = "FF";
    var point = 0.0;
    if (fin >= 50) {
      if (avg >= 90) { letter = "AA"; point = 4.0; }
      else if (avg >= 80) { letter = "BA"; point = 3.5; }
      else if (avg >= 75) { letter = "BB"; point = 3.0; }
      else if (avg >= 70) { letter = "CB"; point = 2.5; }
      else if (avg >= 60) { letter = "CC"; point = 2.0; }
      else if (avg >= 50) { letter = "DC"; point = 1.5; }
      else if (avg >= 40) { letter = "DD"; point = 1.0; }
    }
    var paramStr = "Yazılım Mühendisliği|4|" + avg + "|" + letter + "|" + point;
    actions.push({ label: "➕ Bu Notu AGNO Tabloma Ekle (" + letter + ")", action: "add_agno_course", param: paramStr });
    actions.push({ label: "📊 Not Panosuna Git", action: "goto_grades" });
  }

  if (raw.includes("ders program") || raw.includes("program")) {
    actions.push({ label: "📅 Ders Programına Git", action: "goto_schedule" });
    actions.push({ label: "🧹 Programı Sıfırla", action: "clear_schedule" });
  }

  if (raw.includes("görev") || raw.includes("ödev") || raw.includes("hafta")) {
    actions.push({ label: "📋 Tüm Görevleri Gör", action: "filter_all" });
  }

  return { actions: actions, cards: cards };
}

async function handleAiUserSubmit(e) {
  if (e) e.preventDefault();
  var input = document.getElementById("ai-user-input");
  var text = input.value.trim();
  if (!text) return;

  appendAiUserMessage(text);
  input.value = "";

  showAiTypingIndicator();

  var provider = getAiProvider();
  var apiKey = getAiApiKey();

  // Eğer kullanıcı doğrudan bir ders ekleme / silme / hesap komutu vermediyse ve API key varsa canlı API'ye sor
  var isDirectScheduleAdd = /pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma/i.test(text) && /\d{1,2}[:.]\d{2}/.test(text);

  if (provider !== "local" && apiKey && !isDirectScheduleAdd) {
    try {
      var model = getAiModel();
      var realText = "";
      if (provider === "openai") {
        realText = await callOpenAiApi(text, apiKey, model);
      } else {
        realText = await callGeminiApi(text, apiKey, model);
      }

      hideAiTypingIndicator();

      var extras = detectExtraActionsForPrompt(text);
      extras.actions.push({ label: "⚙️ API Ayarları", action: "open_ai_settings" });

      appendAiBotMessage({
        text: realText,
        actions: extras.actions,
        cards: extras.cards,
        tag: provider === "openai" ? "🌐 ChatGPT (Canlı)" : "🌐 Gemini AI (Canlı)"
      });
      return;
    } catch(apiErr) {
      console.warn("Canlı AI API hatası, yerel motora geçiliyor:", apiErr);
      showPortalToast("⚠️ API yanıt vermedi (" + (apiErr.message || "Hata") + "). Yerel motor yanıtlıyor.");
    }
  }

  // Dahili Yerel Akıllı Motor (Fallback)
  setTimeout(function() {
    hideAiTypingIndicator();
    var response = generateAiAssistantResponse(text);
    if (!response.actions) response.actions = [];
    if (!apiKey) {
      response.actions.push({ label: "⚙️ Gerçek AI API Bağla", action: "open_ai_settings" });
    }
    response.tag = "⚡ Yerel Motor";
    appendAiBotMessage(response);
  }, 350);
}

function appendAiUserMessage(text) {
  var cont = document.getElementById("ai-messages-container");
  var d = document.createElement("div");
  d.className = "ai-message user";
  d.innerHTML = '<div class="ai-msg-bubble">' + escapeAiHtml(text) + '</div>';
  cont.appendChild(d);
  cont.scrollTop = cont.scrollHeight;
}

function appendAiBotMessage(res) {
  var cont = document.getElementById("ai-messages-container");
  var d = document.createElement("div");
  d.className = "ai-message bot";

  var formattedText = formatAiMarkdown(res.text || "");
  var tagHtml = res.tag ? `<div class="ai-api-tag ${res.tag.includes('Canlı') ? 'real' : ''}">${escapeAiHtml(res.tag)}</div>` : '';
  var cardsHtml = "";
  if (res.cards && res.cards.length > 0) {
    cardsHtml += '<div class="ai-cards-stack">';
    res.cards.forEach(function(c) {
      if (c.type === "task_card") {
        cardsHtml += `
          <div class="ai-mini-card">
            <div class="ai-card-title">${escapeAiHtml(c.title)}</div>
            <div class="ai-card-footer">
              <span style="font-size:0.75rem; color:var(--text-muted);">${c.badge} • ${c.status}</span>
              <button class="ai-card-btn" onclick="executeAiAction('${c.actionType}', '${escapeAiQuotes(c.actionParam)}')">${c.actionLabel}</button>
            </div>
          </div>
        `;
      } else if (c.type === "week_card") {
        cardsHtml += `
          <div class="ai-mini-card" style="border-left: 3px solid var(--primary);">
            <div class="ai-card-title">${escapeAiHtml(c.title)}</div>
            <div class="ai-card-footer">
              <span style="font-size:0.75rem; color:var(--text-muted);">${c.stats}</span>
              <button class="ai-card-btn" onclick="executeAiAction('${c.actionType}', '${c.actionParam}')">${c.actionLabel}</button>
            </div>
          </div>
        `;
      } else if (c.type === "calculator_card") {
        cardsHtml += `
          <div class="ai-mini-card" style="border-left: 3px solid var(--primary); background:var(--primary-light);">
            <div class="ai-card-title">🧮 ${escapeAiHtml(c.title)}</div>
            <div style="font-size:0.76rem; color:var(--text-muted);">${c.subtitle}</div>
            <div class="ai-card-footer" style="justify-content:flex-end;">
              <button class="ai-card-btn" onclick="executeAiAction('${c.actionType}')">${c.actionLabel}</button>
            </div>
          </div>
        `;
      }
    });
    cardsHtml += '</div>';
  }

  var actionsHtml = "";
  if (res.actions && res.actions.length > 0) {
    actionsHtml += '<div class="ai-actions-stack">';
    res.actions.forEach(function(a) {
      actionsHtml += `<button class="ai-chip-btn" onclick="executeAiAction('${a.action}', '${escapeAiQuotes(a.param || '')}')">${a.label}</button>`;
    });
    actionsHtml += '</div>';
  }

  d.innerHTML = `
    <div class="ai-avatar" style="width:28px; height:28px; font-size:0.9rem; flex-shrink:0;">🤖</div>
    <div class="ai-msg-bubble">
      ${formattedText}
      ${cardsHtml}
      ${actionsHtml}
    </div>
  `;

  cont.appendChild(d);
  cont.scrollTop = cont.scrollHeight;
}

function showAiTypingIndicator() {
  var cont = document.getElementById("ai-messages-container");
  var d = document.createElement("div");
  d.id = "ai-typing-temp";
  d.className = "ai-message bot";
  d.innerHTML = `
    <div class="ai-avatar" style="width:28px; height:28px; font-size:0.9rem; flex-shrink:0;">🤖</div>
    <div class="ai-typing-indicator">
      <div class="ai-typing-dot"></div>
      <div class="ai-typing-dot"></div>
      <div class="ai-typing-dot"></div>
    </div>
  `;
  cont.appendChild(d);
  cont.scrollTop = cont.scrollHeight;
}

function hideAiTypingIndicator() {
  var el = document.getElementById("ai-typing-temp");
  if (el) el.remove();
}

function formatAiMarkdown(text) {
  var s = escapeAiHtml(text);
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
  s = s.replace(/^-\s+(.*$)/gm, '<li>$1</li>');
  s = s.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  s = s.replace(/\n/g, '<br/>');
  return s;
}

// AI AKSİYON YÖNLENDİRİCİSİ (ACTION DISPATCHER)
var aiConversationState = null; // 'building_schedule' | 'calculating_grade'
var aiPendingCourseName = null; // if user said course name first without day/time

function generateAiAssistantResponse(query) {
  var raw = query.toLowerCase().trim();
  var isLogged = !!currentUser;

  // -----------------------------------------------------------------------
  // 0. GİRİŞ EKRANINDA ÖZEL REHBERLİK (Giriş Yapmadan Önce)
  // -----------------------------------------------------------------------
  if (!isLogged) {
    if (raw.includes("nasıl") || raw.includes("giriş") || raw.includes("giris") || raw.includes("kayıt") ||
        raw.includes("kayit") || raw.includes("hesap") || raw.includes("şifre") || raw.includes("sifre") ||
        raw.includes("öğrenci no") || raw.includes("444082") || raw.includes("yardım") || raw.includes("giremiyorum")) {
      return {
        text: `**🔐 AkademiX Giriş & Kayıt Rehberi:**\n\n1. **Kayıtlı Hesabın Varsa:**\n   - Ortadaki formdan KTÜ e-postan (\`ismail@ktu.edu.tr\`) veya Öğrenci Numaran (\`444082\`) ve şifrenle giriş yapabilirsin.\n2. **Hesabın Yoksa:**\n   - **'Kayıt Ol'** sekmesine geçip Öğrenci No, Ad-Soyad, Bölüm, E-Posta ve Şifre girerek anında hesabını oluşturabilirsin.\n3. **Hızlı Giriş:**\n   - Sistemi hemen test etmek için aşağıdaki butona tıklayabilirsin:`,
        actions: [
          { label: "🚀 Hızlı Demo Girişi (İsmail Korkmaz)", action: "quick_demo_login" },
          { label: "🎓 AkademiX Nedir?", action: "quick_prompt", param: "akademix nedir" }
        ]
      };
    }

    if (raw.includes("akademix") || raw.includes("nedir") || raw.includes("ne işe yarar") || raw.includes("özellik") || raw.includes("bu ne")) {
      return {
        text: `**🏔️ AkademiX • KTÜ Öğrenci Başarı ve Ders Deneyimi Portalı**\n\nAkademiX; KTÜ Yazılım Mühendisliği öğrencileri için tasarlanmış bütünleşik bir akademik platformdur:\n- 4 haftalık modüler teknik müfredat ve görev kartları\n- KTÜ 30 kişi kuralı & BDS/MDS çan eğrisi not simülatörü\n- İnteraktif haftalık ders programı\n- Kişisel çalışma notları\n\nTüm özellikleri canlı deneyimlemek için hemen giriş yapabilirsin:`,
        actions: [
          { label: "🚀 Hızlı Giriş Yap ve İncele", action: "quick_demo_login" },
          { label: "🔐 Nasıl Giriş Yapılır?", action: "quick_prompt", param: "nasıl giriş yapılır" }
        ]
      };
    }

    // Genel karşılama veya diğer sorular
    return {
      text: `👋 Merhaba! Ben **AkademiX Asistanı**. Şu anda giriş ekranındasın.\n\nÖğrenci paneline giriş yapmak için **444082** öğrenci numarası veya KTÜ e-postan ile şifreni girebilir, ya da aşağıdaki butona basarak **İsmail Korkmaz** olarak tek tıkla test girişi yapabilirsin:`,
      actions: [
        { label: "🚀 Hızlı Demo Girişi (İsmail Korkmaz)", action: "quick_demo_login" },
        { label: "🔐 Nasıl Giriş Yapılır?", action: "quick_prompt", param: "nasıl giriş yapılır" },
        { label: "🎓 AkademiX Nedir?", action: "quick_prompt", param: "akademix nedir" }
      ]
    };
  }

  // =======================================================================
  // LOGGED IN USER HANDLERS (AKTİF ÖĞRENCİ ASİSTANI)
  // =======================================================================

  // -----------------------------------------------------------------------
  // 1. SAMİMİ VE ZEKİ SELAMLAMA / SOHBET
  // -----------------------------------------------------------------------
  if (/^(merhaba|selam|selamlar|günaydın|gunaydin|iyi günler|iyi gunler|iyi akşamlar|iyi aksamlar|naber|nasılsın|nasilsin|hey|naptın|napıyorsun)[\s!.]*$/i.test(raw) ||
      raw === "merhaba" || raw === "selam" || raw === "naber" || raw === "nasılsın" || raw === "hey") {
    var uName = currentUser ? currentUser.name : "İsmail";
    return {
      text: `Harika bir gün **${uName}**! 😊 Ben **AkademiX AI**, KTÜ öğrenci başarı ve ders danışmanınım.\n\nSeninle birlikte ders programını düzenleyebilir, vize/final notunu hesaplayıp AGNO'na ekleyebilir, görevlerini ve kişisel notlarını yönetebiliriz.\n\nBugün ne yapmak istersin?`,
      actions: [
        { label: "📅 Ders Programı Oluştur", action: "quick_prompt", param: "ders programı oluşturcaz" },
        { label: "🧮 Sınav Notu Hesapla", action: "quick_prompt", param: "sınav puanı hesaplıcaz" },
        { label: "🎯 2. Hafta Görevlerim", action: "quick_prompt", param: "2. hafta görevlerim neler?" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 2. KİMLİK & YETENEK SORULARI ("sen kimsin", "adın ne", "ne yapabilirsin")
  // -----------------------------------------------------------------------
  if (raw.includes("sen kimsin") || raw.includes("kimsin sen") || raw.includes("kimsin") ||
      raw.includes("adın ne") || raw.includes("ismin ne") || raw.includes("ne yapabilirsin") ||
      raw.includes("neler yapabilirsin") || raw.includes("ne yaparsın") || raw.includes("yeteneklerin")) {
    return {
      text: `🤖 Ben **AkademiX Akıllı Asistanı**! Göğsümdeki AkademiX logosuyla KTÜ Yazılım Mühendisliği platformunda sana rehberlik etmek için buradayım.\n\n**Ekranda gördüğün her şeyi benimle yapabilirsin:**\n- 📅 **Ders Programı:** Birlikte adım adım oluşturabilir veya ders ekleyip silebiliriz.\n- 🧮 **Sınav & AGNO:** Vize-final notunu girip harf notunu (KTÜ MDS/BDS ve 50 final barajı) anında hesaplatıp dönem notlarına ekleyebilirsin.\n- 🎯 **Görevler:** Görev ekleyebilir, silebilir veya tamamlandı olarak işaretleyebilirsin.\n- 📝 **Not Defteri:** Kişisel çalışma notlarına anında kayıt alabilirsin.`,
      actions: [
        { label: "📅 Ders Programı Oluştur", action: "quick_prompt", param: "ders programı oluşturcaz" },
        { label: "🧮 Vize 70 Final 80 Hesapla", action: "quick_prompt", param: "vize 70 final 80 harf notumu hesapla" },
        { label: "🎯 Görevlerimi Gör", action: "filter_all" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 3. KULLANICI DÜZELTMESİ: "sen kafana göre yapma", "ben söylicem", vb.
  // -----------------------------------------------------------------------
  if (raw.includes("kafana göre") || raw.includes("kafahan göre") || raw.includes("sen yapma") ||
      raw.includes("kendin yapma") || raw.includes("ben söylicem") || raw.includes("ben söyleyeceğim") ||
      raw.includes("ben dicem") || raw.includes("ben eklicem") || raw.includes("sen kafana") ||
      (raw.includes("dur") && raw.length < 10) || raw.includes("öyle değil") || raw.includes("ben söyleyim")) {
    aiConversationState = "building_schedule";
    aiPendingCourseName = null;
    return {
      text: `Haklısın, kusura bakma! 🙏 Kesinlikle kafama göre değil, **tamamen senin söyleyeceğin derslere göre** adım adım oluşturalım.\n\nİstersen mevcut tabloyu sıfırlayalım ve ilk dersinle başlayalım.\n\nİlk dersin nedir? (Örn: **'Pazartesi 09:00 Yazılım Mühendisliği D201'**):`,
      actions: [
        { label: "🧹 Tabloyu Temizle & Baştan Başla", action: "clear_schedule" },
        { label: "📅 Ders Programına Git", action: "goto_schedule" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 4. DERS PROGRAMI OLUŞTURMA BAŞLANGICI: "ders programı oluşturcaz", "yapalım"
  // -----------------------------------------------------------------------
  if ((raw.includes("ders programı") || raw.includes("program")) &&
      (raw.includes("oluşturcaz") || raw.includes("oluşturalım") || raw.includes("yapalım") ||
       raw.includes("yapcaz") || raw.includes("hazırlayalım") || raw.includes("oluştur") ||
       raw.includes("yap") || raw.includes("birlikte"))) {
    aiConversationState = "building_schedule";
    aiPendingCourseName = null;
    return {
      text: `Harika, birlikte oluşturalım! 📅 Hangi dersleri eklemek istersin?\n\nDerslerini gün, saat, ders adı ve varsa derslik belirterek bana yazabilirsin. Örneğin:\n👉 **'Pazartesi 09:00 Yazılım Mühendisliği D201'** veya\n👉 **'Salı 10:00 Veritabanı Sistemleri'**\n\nSeni dinliyorum, ilk dersin hangisi?`,
      actions: [
        { label: "🧹 Mevcut Programı Temizle", action: "clear_schedule" },
        { label: "✨ Otomatik Örnek Doldur", action: "create_sample_schedule" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 5. DERS PROGRAMINI TEMİZLE / SIFIRLA
  // -----------------------------------------------------------------------
  if ((raw.includes("temizle") || raw.includes("sıfırla") || raw.includes("sifirla") || raw.includes("sil")) &&
      (raw.includes("program") || raw.includes("bütün dersleri") || raw.includes("tüm dersleri") || raw.includes("tabloyu"))) {
    clearScheduleDirectly();
    aiConversationState = "building_schedule";
    aiPendingCourseName = null;
    return {
      text: `🧹 Haftalık ders programın sıfırlandı! Şimdi derslerini tek tek bana söyleyebilirsin (Örn: **'Pazartesi 09:00 Yazılım Mühendisliği D201'**):`,
      actions: [
        { label: "📅 Ders Programını Gör", action: "goto_schedule" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 6. TEK BİR DERSİ SİLME (Örn: "Yazılım Mühendisliği dersini sil")
  // -----------------------------------------------------------------------
  if (raw.includes("sil") && (raw.includes("ders") || raw.includes("programdan"))) {
    var cleanTarget = query.replace(/(?:lütfen\s+)?(?:şu\s+)?dersini\s+sil/gi, "")
                           .replace(/(?:lütfen\s+)?(?:şu\s+)?dersi\s+sil/gi, "")
                           .replace(/programdan\s+sil/gi, "")
                           .replace(/dersi|ders/gi, "")
                           .replace(/sil/gi, "").trim();
    if (cleanTarget.length > 2) {
      var okD = deleteCourseByName(cleanTarget);
      if (okD) {
        return {
          text: `🗑️ **'${cleanTarget}'** dersi programdan başarıyla silindi!`,
          actions: [
            { label: "📅 Ders Programını Gör", action: "goto_schedule" }
          ]
        };
      }
    }
  }

  // -----------------------------------------------------------------------
  // 7. DERS PROGRAMINI GÖSTER / AÇ
  // -----------------------------------------------------------------------
  if (raw.includes("ders program") || raw.includes("programı göster") || raw.includes("programa bak") ||
      raw.includes("programımı aç") || raw.includes("ders saatleri")) {
    return {
      text: `📅 İşte haftalık ders programın! Sağ paneldeki tablodan inceleyebilir veya istediğin an yeni ders söyleyebilirsin:`,
      actions: [
        { label: "📅 Ders Programına Git", action: "goto_schedule" },
        { label: "➕ Yeni Ders Ekle", action: "open_add_course" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 8. KULLANICININ DİKTE ETTİĞİ DERSİ EKLEME (GÜN / SAAT VE DERS ADI)
  // (Örn: "Pazartesi 09:00 Yazılım Mühendisliği D201" veya "Salı 10:00 Veritabanı")
  // -----------------------------------------------------------------------
  var hasDay = /pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma/i.test(raw);
  var hasTime = /\d{1,2}[:.]\d{2}/.test(raw);

  // Durum 8A: Gün belirtilmiş (ve saat veya ders modu açık)
  if (hasDay && (hasTime || raw.includes("ders") || aiConversationState === "building_schedule" || aiPendingCourseName)) {
    var daysMap = { "pazartesi": "Pazartesi", "salı": "Salı", "sali": "Salı", "çarşamba": "Çarşamba", "carsamba": "Çarşamba", "perşembe": "Perşembe", "persembe": "Perşembe", "cuma": "Cuma" };
    var detectedDay = "Pazartesi";
    for (var dKey in daysMap) {
      if (raw.includes(dKey)) { detectedDay = daysMap[dKey]; break; }
    }

    var timeM = raw.match(/(\d{1,2}[:.]\d{2})/);
    var detectedTime = "10:00 - 12:00";
    if (timeM) {
      var st = timeM[1].replace(".", ":");
      var sParts = st.split(":");
      var h = parseInt(sParts[0], 10);
      var m = sParts[1];
      var endH = Math.min(23, h + 2);
      detectedTime = (h < 10 ? "0" + h : h) + ":" + m + " - " + (endH < 10 ? "0" + endH : endH) + ":" + m;
    }

    var roomM = raw.match(/([dD]\s*\d+|[lL][aA][bB][-\s]*\d+|[aA][mM][fF][iİ][-\s]*\d+)/);
    var detectedRoom = roomM ? roomM[1].toUpperCase().replace(/\s+/g, "") : "D101";

    var cleanCourse = query.replace(/pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma/gi, "")
                           .replace(/\d{1,2}[:.]\d{2}/g, "")
                           .replace(/([dD]\s*\d+|[lL][aA][bB][-\s]*\d+|[aA][mM][fF][iİ][-\s]*\d+)/gi, "")
                           .replace(/\s+(saat|günü|gunu|derslik|dersliğinde|dersliginde|dersi|ders|ekle|koy)\s+/gi, "")
                           .replace(/^[\s,:\-]+|[\s,:\-]+$/g, "").trim();

    if (cleanCourse.length < 2 && aiPendingCourseName) {
      cleanCourse = aiPendingCourseName;
    } else if (cleanCourse.length < 2) {
      cleanCourse = "Yazılım Dersi";
    }
    // Baş harfleri büyüt
    cleanCourse = cleanCourse.charAt(0).toUpperCase() + cleanCourse.slice(1);
    aiPendingCourseName = null;

    addScheduleCourseDirectly(detectedDay, detectedTime, cleanCourse, detectedRoom);
    aiConversationState = "building_schedule";

    return {
      text: `✅ **'${cleanCourse}'** dersi programa başarıyla eklendi! 📅\n- **Gün:** ${detectedDay}\n- **Saat:** ${detectedTime}\n- **Derslik:** ${detectedRoom}\n\nSırada hangi ders var? (Bitirmek istersen **'bu kadar'** veya **'tamam'** diyebilirsin.)`,
      actions: [
        { label: "📅 Ders Programını İncele", action: "goto_schedule" },
        { label: "✅ Program Bitti / Tamamla", action: "finish_schedule" }
      ]
    };
  }

  // Durum 8B: Kullanıcı yalnızca ders adı yazdı ve ders programı modundayız
  if (aiConversationState === "building_schedule" && !hasDay && raw.length > 2 &&
      !raw.includes("vize") && !raw.includes("final") && !raw.includes("görev") && !raw.includes("not")) {
    var proposedCourse = query.trim();
    proposedCourse = proposedCourse.charAt(0).toUpperCase() + proposedCourse.slice(1);
    aiPendingCourseName = proposedCourse;
    return {
      text: `Harika, **${proposedCourse}** dersini hangi gün ve saatte ekleyelim?\n(Örn: **'Pazartesi 09:00'** veya **'Salı 14:00 D201'**):`,
      actions: [
        { label: "Pazartesi 09:00 D201", action: "quick_prompt", param: "Pazartesi 09:00 " + proposedCourse + " D201" },
        { label: "Salı 10:00 LAB-2", action: "quick_prompt", param: "Salı 10:00 " + proposedCourse + " LAB-2" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 9. BİTİRME / TAMAMLAMA ONAYI: "tamam", "bitti", "bu kadar"
  // -----------------------------------------------------------------------
  if (raw === "tamam" || raw === "bitti" || raw === "bu kadar" || raw === "yeterli" ||
      raw.includes("program bitti") || raw.includes("tamamdır") || raw.includes("tamamdir")) {
    aiConversationState = null;
    aiPendingCourseName = null;
    return {
      text: `Harika! 🎓 Ders programın başarıyla hazırlandı ve sisteme kaydedildi. Sağ paneldeki tablodan inceleyebilir veya istediğin an yeni dersler ekleyebilirsin.\n\nŞimdi sınav notu hesaplama veya haftalık görevler hakkında yardımcı olmamı ister misin?`,
      actions: [
        { label: "🧮 Sınav Notu Hesapla", action: "quick_prompt", param: "sınav puanı hesaplıcaz" },
        { label: "🎯 2. Hafta Görevleri", action: "quick_prompt", param: "2. hafta görevlerim neler?" },
        { label: "📅 Ders Programına Git", action: "goto_schedule" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 10. SINAV PUANI VE HARF NOTU HESAPLAMA (Örn: "vize 70 final 80")
  // -----------------------------------------------------------------------
  var vizeMatch = raw.match(/vize[a-z]*\s*[:=\s]?\s*(\d+)/);
  var finalMatch = raw.match(/final[a-z]*\s*[:=\s]?\s*(\d+)/);

  // Sayılar doğrudan verilmişse (Örn: "vize 70 final 80" veya "70 ve 80")
  if ((vizeMatch && finalMatch) || (aiConversationState === "calculating_grade" && /\b\d{1,3}\s+(?:ve\s+)?\d{1,3}\b/.test(raw))) {
    var vize = 0;
    var fin = 0;
    if (vizeMatch && finalMatch) {
      vize = parseFloat(vizeMatch[1]);
      fin = parseFloat(finalMatch[1]);
    } else {
      var nums = raw.match(/\d{1,3}/g);
      vize = parseFloat(nums[0]);
      fin = parseFloat(nums[1]);
    }

    var avg = Math.round(((vize * 0.4) + (fin * 0.6)) * 10) / 10;

    var cName = "Yazılım Mühendisliği";
    if (raw.includes("mimar")) cName = "Yazılım Mimarisi";
    else if (raw.includes("veri")) cName = "Veritabanı Sistemleri";
    else if (raw.includes("algo")) cName = "Algoritma Analizi";
    else if (raw.includes("web")) cName = "Web Programlama";
    else if (raw.includes("test") || raw.includes("kalite")) cName = "Yazılım Test & QA";

    var letter = "FF";
    var point = 0.0;
    var statusDesc = "";

    if (fin < 50) {
      letter = "FF";
      point = 0.0;
      statusDesc = "❌ Başarısız (KTÜ Final 50 Barajı Altı!)";
    } else {
      if (avg >= 90) { letter = "AA"; point = 4.0; statusDesc = "🌟 Mükemmel (Geçti)"; }
      else if (avg >= 80) { letter = "BA"; point = 3.5; statusDesc = "🎉 Çok İyi (Geçti)"; }
      else if (avg >= 75) { letter = "BB"; point = 3.0; statusDesc = "✅ İyi (Geçti)"; }
      else if (avg >= 70) { letter = "CB"; point = 2.5; statusDesc = "✅ Orta-İyi (Geçti)"; }
      else if (avg >= 60) { letter = "CC"; point = 2.0; statusDesc = "✅ Orta (Geçti)"; }
      else if (avg >= 50) { letter = "DC"; point = 1.5; statusDesc = "⚠️ Koşullu Geçer"; }
      else if (avg >= 40) { letter = "DD"; point = 1.0; statusDesc = "⚠️ Koşullu Geçer"; }
      else { letter = "FF"; point = 0.0; statusDesc = "❌ Başarısız (Kaldı)"; }
    }

    var agnoParam = cName + "|4|" + avg + "|" + letter + "|" + point;
    aiConversationState = null;

    return {
      text: `🧮 **KTÜ Sınav & Not Hesaplama Sonucu:**\n\n- **Ders:** ${cName}\n- **Vize (%40):** ${vize}\n- **Final (%60):** ${fin}\n- **Ağırlıklı Ortalama:** **${avg}**\n- **Harf Notu:** **${letter}** (${point.toFixed(2)})\n- **Durum:** ${statusDesc}\n\nBu notu dönem AGNO hesaplamana eklemek için aşağıdaki butona basabilirsin:`,
      cards: [
        {
          type: "calculator_card",
          title: `${cName}: ${letter} (${avg})`,
          subtitle: `4 Kredi • Katsayı: ${point.toFixed(2)} • ${statusDesc}`,
          actionLabel: "➕ AGNO Tabloma Ekle",
          actionType: "add_agno_course",
          actionParam: agnoParam
        }
      ],
      actions: [
        { label: "➕ Bu Notu AGNO'ya Ekle", action: "add_agno_course", param: agnoParam },
        { label: "📊 Panodaki Notlara Git", action: "goto_grades" }
      ]
    };
  }

  // Sayı verilmemişse kullanıcıya sor
  if ((raw.includes("not") || raw.includes("sınav") || raw.includes("sinav") || raw.includes("agno")) &&
      (raw.includes("hesapla") || raw.includes("hesaplıcaz") || raw.includes("hesaplayalım") || raw.includes("hesaplayalim"))) {
    aiConversationState = "calculating_grade";
    return {
      text: `Memnuniyetle! 🧮 Hangi dersin notunu hesaplayacağız?\n\nBana vize ve final notlarını söyleyebilirsin. Örneğin:\n👉 **'vize 70 final 80'** veya\n👉 **'Yazılım Mühendisliği vize 65 final 75'**`,
      actions: [
        { label: "🧮 Vize 70 Final 80 Örneği", action: "quick_prompt", param: "vize 70 final 80 harf notumu hesapla" },
        { label: "📊 AGNO Simülatörünü Aç", action: "open_grade_wizard" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 11. NOTLAR VE AGNO TABLOSUNA GİT
  // -----------------------------------------------------------------------
  if (raw.includes("notlarımı göster") || raw.includes("notlarıma bak") || raw.includes("agno") ||
      raw.includes("ortalamam") || raw.includes("harf notları")) {
    return {
      text: `📊 İşte dönem notların ve AGNO hesaplama tablon! Sağ panelden inceleyebilir veya simülatörü açabilirsin:`,
      actions: [
        { label: "📊 Panodaki Notlara Git", action: "goto_grades" },
        { label: "🧮 AGNO Simülatörünü Aç", action: "open_grade_wizard" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 12. KİŞİSEL NOT EKLEME & YÖNETİMİ
  // -----------------------------------------------------------------------
  if ((raw.includes("not") || raw.includes("notlar")) && (raw.includes("ekle") || raw.includes("yaz") || raw.includes("kaydet"))) {
    var cleanNote = query.replace(/(?:kişisel\s+)?not(?:lar(?:ım)?a)?\s*(?:ekle|yaz|kaydet)\s*[:\-]?\s*/i, "")
                         .replace(/notu?\s+ekle/i, "")
                         .replace(/ekle|yaz/i, "").trim();
    if (cleanNote && cleanNote.length > 2) {
      addPersonalNoteDirectly("Çalışma Notu", cleanNote);
      return {
        text: `📝 **'${cleanNote}'** kişisel çalışma notlarına kaydedildi!`,
        actions: [
          { label: "📝 Notlara Git", action: "goto_notes" }
        ]
      };
    }
  }

  // -----------------------------------------------------------------------
  // 13. GÖREV TAMAMLAMA
  // -----------------------------------------------------------------------
  if (raw.includes("görev") && (raw.includes("tamamla") || raw.includes("bitir") || raw.includes("onayla") || raw.includes("yaptım"))) {
    var cleanTaskT = query.replace(/(?:şu\s+)?görevi\s+(?:tamamla|bitir|onayla)\s*[:\-]?\s*/i, "")
                          .replace(/(?:görevini|görevi)\s+tamamla/i, "")
                          .replace(/tamamla|bitir/i, "").trim();
    if (cleanTaskT && cleanTaskT.length > 2) {
      var okT = markTaskCompletedDirectly(cleanTaskT, true);
      if (okT) {
        return {
          text: `🎉 Tebrikler! **'${cleanTaskT}'** görevi tamamlandı olarak işaretlendi!`,
          actions: [
            { label: "✅ Tamamlanan Görevler", action: "filter_completed" }
          ]
        };
      }
    }
  }

  // -----------------------------------------------------------------------
  // 14. GÖREV SİLME
  // -----------------------------------------------------------------------
  if (raw.includes("sil") && (raw.includes("görev") || raw.includes("task"))) {
    var cleanTitle = query.replace(/(?:şu\s+)?görevi\s+sil\s*[:\-]?\s*/i, "")
                          .replace(/(?:lütfen\s+)?(?:görevini|görevi)\s+sil/i, "")
                          .replace(/sil/i, "").trim();
    if (cleanTitle && cleanTitle.length > 2) {
      var ok = deleteTaskByTitle(cleanTitle);
      if (ok) {
        return {
          text: `🗑️ **'${cleanTitle}'** görevi başarıyla silindi ve sayaçlar güncellendi.`,
          actions: [
            { label: "📋 Kalan Görevleri Gör", action: "filter_all" }
          ]
        };
      }
    }
    return {
      text: `Hangi görevi silmek istiyorsun? Görevin adını yazabilir veya görev kartlarındaki çöp kutusu simgesine basabilirsin.`,
      actions: [
        { label: "📋 Görevler Tablosu", action: "filter_all" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 15. GÖREV EKLEME
  // -----------------------------------------------------------------------
  if (raw.includes("ekle") && (raw.includes("görev") || raw.includes("task"))) {
    var newTaskTitle = query.replace(/(?:şu\s+)?görev(?:i|ini)?\s+ekle\s*[:\-]?\s*/i, "")
                            .replace(/(?:lütfen\s+)?(?:görevini|görevi)\s+ekle/i, "")
                            .replace(/(?:yeni\s+)?görev\s+ekle/i, "")
                            .replace(/ekle/i, "").trim();

    var taskWeek = "2";
    var weekDetect = raw.match(/([1-4])\s*\.?\s*hafta/);
    if (weekDetect) taskWeek = weekDetect[1];

    if (newTaskTitle && newTaskTitle.length > 2) {
      addNewTaskDirectly(newTaskTitle, "AkademiX AI tarafından tanımlanan teknik görev.", taskWeek, "Yüksek", "Geliştirme");
      return {
        text: `✨ **'${newTaskTitle}'** görevi **${taskWeek}. Hafta** planına başarıyla eklendi!`,
        actions: [
          { label: `🔍 ${taskWeek}. Hafta Görevlerini Filtrele`, action: "filter_week", param: taskWeek },
          { label: "📋 Tüm Görevleri Gör", action: "filter_all" }
        ]
      };
    }
  }

  // -----------------------------------------------------------------------
  // 16. HAFTALIK MÜFREDAT KONTROLÜ
  // -----------------------------------------------------------------------
  var weekMatch = raw.match(/([1-4])\s*\.?\s*hafta/);
  if (weekMatch) {
    var wNo = weekMatch[1];
    var weekRows = document.querySelectorAll('.task-row[data-week="' + wNo + '"]');
    var doneRows = document.querySelectorAll('.task-row[data-week="' + wNo + '"].completed');
    return {
      text: `**${wNo}. Hafta** modülünde toplam **${weekRows.length} teknik görev** var (Tamamlanan: **${doneRows.length}**).\n\nAşağıdaki kart üzerinden haftanın hedeflerini açabilir veya görev listesini filtreleyebilirsin:`,
      cards: [
        {
          type: "week_card",
          title: wNo + ". Hafta Öğrenme Modülü",
          stats: doneRows.length + "/" + weekRows.length + " Görev Tamamlandı",
          actionLabel: "📖 Haftayı İncele",
          actionType: "open_week",
          actionParam: wNo
        }
      ],
      actions: [
        { label: `🔍 ${wNo}. Hafta Görevlerini Filtrele`, action: "filter_week", param: wNo }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 17. KTÜ 30 KİŞİ KURALI & ÇAN EĞRİSİ
  // -----------------------------------------------------------------------
  if (raw.includes("30 kişi") || raw.includes("30 kisi") || raw.includes("çan") || raw.includes("can") || raw.includes("bds") || raw.includes("mds")) {
    return {
      text: `**KTÜ Senatosu Not ve Değerlendirme Kuralları:**\n\n1. **30 Kişi Kuralı:**\n   - Sınıf mevcudu **30'dan azsa** Mutlak Değerlendirme Sistemi (MDS) uygulanır; harf notları sabittir (90=AA, 80=BA, 75=BB... 40=DD).\n   - Sınıf mevcudu **30 ve üzeriyse** Bağıl Değerlendirme Sistemi (BDS / Çan Eğrisi) devreye girer; harf notları sınıf ortalamasına (HBN) göre belirlenir.\n2. **Final Barajı:** Final sınavından **en az 50** alma zorunluluğu vardır. 50'nin altı doğrudan **FF** kalır.`,
      actions: [
        { label: "🧮 AGNO Simülatörünü Aç", action: "open_grade_wizard" },
        { label: "📊 Panodaki Notlara Git", action: "goto_grades" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 18. TEMA DEĞİŞTİRME
  // -----------------------------------------------------------------------
  if (raw.includes("karanlık") || raw.includes("aydınlık") || raw.includes("tema") || raw.includes("dark") || raw.includes("light")) {
    return {
      text: `AkademiX temasını değiştirebilirsin:`,
      actions: [
        { label: "🌙/☀️ Temayı Şimdi Değiştir", action: "toggle_theme" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 19. AKADEMİX REHBERİ
  // -----------------------------------------------------------------------
  if (raw.includes("akademix") || raw.includes("nasıl kullanılır") || raw.includes("rehber") || raw.includes("ne işe yarar")) {
    return {
      text: `**🏔️ AkademiX • KTÜ Öğrenci Başarı ve Ders Deneyimi Portalı**\n\nAkademiX akış şemasındaki tüm özellikleri benimle yönetebilirsin:\n- 📅 *"bana ders programı oluştur"* veya *"Pazartesi 09:00 Yazılım Mühendisliği D201 ekle"*\n- 🧮 *"vize 70 final 80 harf notumu hesapla"*\n- 🎯 *"2. haftaya testleri hazırla görevini ekle"*\n- 📝 *"kişisel notlarıma toplantı notu yaz"*`,
      actions: [
        { label: "📅 Ders Programı Oluştur", action: "quick_prompt", param: "ders programı oluşturcaz" },
        { label: "🧮 Sınav Notu Hesapla", action: "quick_prompt", param: "sınav puanı hesaplıcaz" },
        { label: "📋 Tüm Görevleri Gör", action: "filter_all" }
      ]
    };
  }

  // -----------------------------------------------------------------------
  // 20. FALLBACK
  // -----------------------------------------------------------------------
  var fallbackName = currentUser ? currentUser.name : "İsmail";
  return {
    text: `Merhaba **${fallbackName}**! Sana şu konularda yardımcı olabilirim:\n- 📅 *"ders programı oluşturcaz"* veya *"Salı 10:00 Veritabanı D101"*\n- 🧮 *"vize 70 final 80 harf notumu hesapla"*\n- 🎯 *"2. hafta görevlerimi göster"* veya *"görev ekle ..."*\n- 📝 *"kişisel notlarıma X yaz"*\n\nNe yapmak istersin?`,
    actions: [
      { label: "📅 Ders Programı Oluştur", action: "quick_prompt", param: "ders programı oluşturcaz" },
      { label: "🧮 Vize 70 Final 80 Hesapla", action: "quick_prompt", param: "vize 70 final 80 harf notumu hesapla" },
      { label: "🎯 2. Hafta Görevlerim", action: "quick_prompt", param: "2. hafta görevlerim neler?" }
    ]
  };
}

function executeAiAction(actionType, param) {
  if (actionType === "open_ai_settings") {
    openAiApiSettingsModal();
  } else if (actionType === "quick_demo_login") {
    quickDemoLogin();
  } else if (actionType === "filter_week") {
    document.getElementById("filter-week-select").value = param;
    filterTasks();
    document.getElementById("tasks-section").scrollIntoView({ behavior: "smooth", block: "start" });
    showPortalToast(param + ". Hafta görevleri listelendi! 📋");
  } else if (actionType === "filter_high_priority") {
    filterByStatCard('high-priority');
    showPortalToast("Yüksek öncelikli görevler filtrelendi! 🔥");
  } else if (actionType === "filter_completed") {
    filterByStatCard('completed');
    showPortalToast("Tamamlanan görevler listelendi! ✅");
  } else if (actionType === "filter_all") {
    filterByStatCard('all');
  } else if (actionType === "open_week") {
    showWeekModal(parseInt(param, 10));
  } else if (actionType === "open_grade_wizard") {
    openCourseGradeWizard();
  } else if (actionType === "add_agno_course") {
    var parts = String(param).split("|");
    var cName = parts[0] || "Yazılım Mühendisliği";
    var cCredit = parseFloat(parts[1]) || 4;
    var cAvg = parseFloat(parts[2]) || 70;
    var cLetter = parts[3] || "BB";
    var cPoint = parseFloat(parts[4]) || 3.0;
    addAgnoCourseDirectly(cName, cCredit, cAvg, cLetter, cPoint);
  } else if (actionType === "create_sample_schedule") {
    createDefaultScheduleDirectly();
  } else if (actionType === "clear_schedule") {
    clearScheduleDirectly();
    aiConversationState = "building_schedule";
    aiPendingCourseName = null;
    appendAiBotMessage({
      text: "🧹 Ders tablon sıfırlandı! Şimdi bana eklemek istediğin ilk dersini söyleyebilirsin (Örn: **'Pazartesi 09:00 Yazılım Mühendisliği D201'**):",
      actions: [
        { label: "📅 Panodaki Tabloyu Gör", action: "goto_schedule" }
      ]
    });
  } else if (actionType === "finish_schedule") {
    aiConversationState = null;
    aiPendingCourseName = null;
    showPortalToast("Ders programı başarıyla kaydedildi! 🎓");
  } else if (actionType === "goto_grades") {
    var el = document.querySelector(".side-stack");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (actionType === "goto_schedule") {
    var el = document.getElementById("schedule-card");
    if (!el) el = document.querySelector(".side-stack");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (actionType === "goto_notes") {
    var el = document.getElementById("personal-notes-container");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    var inp = document.getElementById("p-note-title");
    if (inp) inp.focus();
    showPortalToast("Kişisel Notlar alanına gidildi 📝");
  } else if (actionType === "open_add_course") {
    var el = document.querySelector(".side-stack");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    toggleAddCourseForm();
  } else if (actionType === "open_create_task") {
    openCreateTaskModal();
  } else if (actionType === "open_cards") {
    toggleTaskCardsPanel(true);
  } else if (actionType === "toggle_theme") {
    toggleTheme();
  } else if (actionType === "logout_action") {
    logoutStudent();
  } else if (actionType === "quick_prompt") {
    sendAiQuickPrompt(param);
  } else if (actionType === "focus_task") {
    var rows = document.querySelectorAll(".task-row");
    rows.forEach(function(r) {
      var title = r.querySelector(".task-title");
      if (title && title.textContent.trim().toLowerCase().includes(param.toLowerCase())) {
        r.style.display = "flex";
        r.scrollIntoView({ behavior: "smooth", block: "center" });
        r.classList.add("task-focus-glow");
        setTimeout(function() { r.classList.remove("task-focus-glow"); }, 2400);
      }
    });
  }
}
