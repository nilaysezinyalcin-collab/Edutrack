
// =====================================
// EDUTRACK - VERİ SAKLAMA SİSTEMİ
// =====================================

// Görevleri kaydet
function saveTasks(tasks) {
    localStorage.setItem(
        "edutrack_tasks",
        JSON.stringify(tasks)
    );
}

// Kayıtlı görevleri getir
function loadTasks(defaultTasks) {
    const savedTasks = localStorage.getItem(
        "edutrack_tasks"
    );

    if (savedTasks) {
        try {
            const parsedTasks = JSON.parse(savedTasks);

            if (Array.isArray(parsedTasks)) {
                return parsedTasks;
            }
        } catch (error) {
            console.error("Görev verileri okunamadı:", error);
        }
    }

    return defaultTasks;
}

// Temayı kaydet
function saveTheme(theme) {
    localStorage.setItem("edutrack_theme", theme);
}

// Kayıtlı temayı getir
function loadTheme() {
    return localStorage.getItem("edutrack_theme") || "light";
}
