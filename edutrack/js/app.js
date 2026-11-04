
// ============================================
// EDUTRACK - ANA UYGULAMA DOSYASI
// ============================================

// Görevleri kayıtlı verilerden yükle
let currentTasks = loadTasks(tasks);

// HTML elemanlarını seç
const coursesContainer = document.getElementById("coursesContainer");
const tasksContainer = document.getElementById("tasksContainer");

const totalCoursesElement = document.getElementById("totalCourses");
const completedTasksElement = document.getElementById("completedTasks");
const totalTasksElement = document.getElementById("totalTasks");

const progressPercentage = document.getElementById("progressPercentage");
const progressFill = document.getElementById("progressFill");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const weekFilter = document.getElementById("weekFilter");
const themeToggle = document.getElementById("themeToggle");


// ============================================
// 1. DERS KARTLARINI GÖSTER
// ============================================

function renderCourses() {
    coursesContainer.innerHTML = "";

    courses.forEach(course => {
        const card = document.createElement("article");
        card.className = "course-card";

        const title = document.createElement("h3");
        title.textContent = `${course.week}. Hafta - ${course.title}`;

        const description = document.createElement("p");
        description.textContent = course.description;

        const objectivesTitle = document.createElement("strong");
        objectivesTitle.textContent = "Öğrenme Hedefleri";

        const objectivesList = document.createElement("ul");

        course.objectives.forEach(objective => {
            const item = document.createElement("li");
            item.textContent = objective;
            objectivesList.appendChild(item);
        });

        card.append(title, description, objectivesTitle, objectivesList);
        coursesContainer.appendChild(card);
    });
}


// ============================================
// 2. HAFTA FİLTRESİNİ OLUŞTUR
// ============================================

function renderWeekFilter() {
    const weeks = [...new Set(currentTasks.map(task => task.week))];

    weeks.sort((a, b) => a - b);

    weekFilter.innerHTML = '<option value="all">Tüm Haftalar</option>';

    weeks.forEach(week => {
        const option = document.createElement("option");
        option.value = week;
        option.textContent = `${week}. Hafta`;

        weekFilter.appendChild(option);
    });
}


// ============================================
// 3. GÖREVLERİ GÖSTER
// ============================================

function renderTasks() {
    const keyword = searchInput.value.trim().toLocaleLowerCase("tr-TR");
    const selectedStatus = statusFilter.value;
    const selectedWeek = weekFilter.value;

    const filteredTasks = currentTasks.filter(task => {

        const matchesSearch =
            task.title.toLocaleLowerCase("tr-TR").includes(keyword) ||
            task.description.toLocaleLowerCase("tr-TR").includes(keyword);

        const matchesStatus =
            selectedStatus === "all" ||
            task.status === selectedStatus;

        const matchesWeek =
            selectedWeek === "all" ||
            task.week === Number(selectedWeek);

        return matchesSearch && matchesStatus && matchesWeek;
    });

    tasksContainer.innerHTML = "";

  if (filteredTasks.length === 0) {
    tasksContainer.textContent = "Aramanızla eşleşen görev bulunamadı.";
    tasksContainer.className = "tasks-list empty-message";
    return;
}

    tasksContainer.className = "tasks-list";

    filteredTasks.forEach(task => {

        const card = document.createElement("article");
        card.className = "task-card";

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = `${task.week}. Hafta - ${task.description}`;

        info.append(title, description);

        const status = document.createElement("span");
        status.className = `task-status status-${task.status}`;

        const statusNames = {
            "pending": "Bekliyor",
            "in-progress": "Devam Ediyor",
            "completed": "Tamamlandı"
        };

        status.textContent = statusNames[task.status] || "Bilinmiyor";

        const button = document.createElement("button");
        button.className = "task-button";
        button.textContent = task.status === "completed"
            ? "Geri Al"
            : "Tamamla";

        button.addEventListener("click", () => {
            toggleTaskStatus(task.id);
        });

        card.append(info, status, button);
        tasksContainer.appendChild(card);
    });
}


// ============================================
// 4. GÖREV DURUMUNU DEĞİŞTİR
// ============================================

function toggleTaskStatus(taskId) {
    const task = currentTasks.find(item => item.id === taskId);
    if (!task) return;

    const statusOrder = [
        "pending",
        "in-progress",
        "completed"
    ];

    if (!statusOrder.includes(task.status)) {
        console.error("Geçersiz görev durumu:", task.status);
        return;
    }

    const currentIndex = statusOrder.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;

    task.status = statusOrder[nextIndex];

    saveTasks(currentTasks);
    updateDashboard();
    renderTasks();
}
// ============================================
// 5. İLERLEME GÖSTERGESİ
// ============================================

function updateDashboard() {

    const total = currentTasks.length;

    const completed = currentTasks.filter(
        task => task.status === "completed"
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalCoursesElement.textContent = courses.length;
    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;

    progressPercentage.textContent = `%${percentage}`;
    progressFill.style.width = `${percentage}%`;
}


// ============================================
// 6. TEMA DEĞİŞTİRME
// ============================================

function applyTheme(theme) {

    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );

    themeToggle.textContent = theme === "dark"
        ? "☀️ Aydınlık Tema"
        : "🌙 Karanlık Tema";
}

function toggleTheme() {

    const currentTheme = loadTheme();

    const newTheme = currentTheme === "dark"
        ? "light"
        : "dark";

    saveTheme(newTheme);
    applyTheme(newTheme);
}


// ============================================
// 7. OLAYLARI BAĞLA
// ============================================

searchInput.addEventListener("input", renderTasks);

statusFilter.addEventListener("change", renderTasks);

weekFilter.addEventListener("change", renderTasks);

themeToggle.addEventListener("click", toggleTheme);


// ============================================
// 8. UYGULAMAYI BAŞLAT
// ============================================

function initializeApp() {

    applyTheme(loadTheme());

    renderCourses();
    renderWeekFilter();
    renderTasks();
    updateDashboard();
}

initializeApp();
