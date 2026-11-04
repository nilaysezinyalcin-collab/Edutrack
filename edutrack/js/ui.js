/**
 * Proje 1 - Etkileşimli Ders Deneyimi Panosu
 * Kullanıcı Arayüzü ve DOM Render Modülü (FR-04, FR-05, FR-06, FR-12)
 * Geliştirici: Nilay Sezin Yalçın (Lider + Geliştirici)
 */

export const UIManager = {
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
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  closeNewTaskModal() {
    const modal = document.getElementById("new-task-modal");
    if (!modal) return;
    modal.classList.remove("open");
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