/**
 * AkademiX AI - Akıllı Ders, Görev & Başarı Danışmanı Servisi (AiAssistantService)
 * PSR / Clean Code standartlarına uygun, modüler istemci tarafı NLP ve danışmanlık motoru.
 */

export class AiAssistantService {
  constructor() {
    this.stopwordsTr = new Set([
      "ve", "veya", "ile", "bir", "bu", "şu", "o", "ne", "nedir", "nasıl", "için", "mı", "mi", "mu", "mü",
      "olan", "var", "yok", "bana", "beni", "ben", "sen", "şey", "dair", "gibi", "kadar", "diye"
    ]);

    this.stopwordsEn = new Set([
      "and", "or", "with", "a", "an", "the", "this", "that", "what", "how", "for", "is", "are",
      "to", "in", "on", "at", "my", "me", "you", "show", "tell", "about"
    ]);
  }

  detectLanguage(text) {
    const enIndicators = ["what", "how", "task", "grade", "gpa", "schedule", "week", "exam", "show", "help", "list", "priority"];
    const lower = text.toLowerCase();
    const isEn = enIndicators.some(w => lower.split(/\s+/).includes(w));
    return isEn ? "en" : "tr";
  }

  cleanTokens(text, lang = "tr") {
    const stopwords = lang === "en" ? this.stopwordsEn : this.stopwordsTr;
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopwords.has(w));
  }

  detectIntent(cleanedTokens, rawText) {
    const raw = rawText.toLowerCase();

    const weekMatch = raw.match(/([1-4])\s*\.?\s*hafta/);
    if (weekMatch) {
      return { type: "week_query", weekNo: parseInt(weekMatch[1], 10) };
    }
    if (raw.includes("haftalık") || raw.includes("modül") || raw.includes("öğrenme kart")) {
      return { type: "week_overview" };
    }

    if (
      raw.includes("not") || raw.includes("sınav") || raw.includes("vize") || raw.includes("final") ||
      raw.includes("agno") || raw.includes("çan") || raw.includes("30 kişi") || raw.includes("bds") ||
      raw.includes("mds") || raw.includes("hesapla") || raw.includes("gpa") || raw.includes("grade")
    ) {
      return { type: "grade_query" };
    }

    if (
      raw.includes("program") || raw.includes("ders programı") || raw.includes("ders ekle") ||
      raw.includes("saat") || raw.includes("derslik") || raw.includes("schedule") || raw.includes("timetable")
    ) {
      return { type: "schedule_query" };
    }

    if (
      raw.includes("görev") || raw.includes("yapılacak") || raw.includes("öncelik") || raw.includes("tamamlanan") ||
      raw.includes("devam eden") || raw.includes("task") || raw.includes("todo") || raw.includes("ilerleme")
    ) {
      return { type: "tasks_query" };
    }

    if (raw.includes("karanlık") || raw.includes("aydınlık") || raw.includes("tema") || raw.includes("dark") || raw.includes("light")) {
      return { type: "theme_toggle" };
    }

    if (raw.includes("görev ekle") || raw.includes("yeni görev") || raw.includes("add task")) {
      return { type: "add_task_action" };
    }

    if (raw.includes("tavsiye") || raw.includes("çalış") || raw.includes("nasıl başar") || raw.includes("öneri") || raw.includes("plan")) {
      return { type: "study_advice" };
    }

    return { type: "general_faq" };
  }

  getSystemContext() {
    const tasks = [];
    document.querySelectorAll(".task-row").forEach((r, idx) => {
      const title = r.querySelector(".task-title") ? r.querySelector(".task-title").textContent.trim() : "";
      const week = r.getAttribute("data-week") || "1";
      const status = r.getAttribute("data-status") || "in-progress";
      const priority = r.getAttribute("data-priority") || "Orta";
      tasks.push({ id: "task-" + idx, title, week, status, priority, isDone: status === "completed" });
    });

    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.isDone).length;
    const pendingTasks = totalTasks - doneTasks;
    const highTasks = tasks.filter(t => t.priority === "Yüksek" && !t.isDone);

    return {
      tasks,
      totalTasks,
      doneTasks,
      pendingTasks,
      highTasks,
      progressPct: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0
    };
  }

  processMessage(userText) {
    const lang = this.detectLanguage(userText);
    const tokens = this.cleanTokens(userText, lang);
    const intent = this.detectIntent(tokens, userText);
    const context = this.getSystemContext();

    if (lang === "en") {
      return this.handleEnglishQuery(intent, userText, context);
    }
    return this.handleTurkishQuery(intent, userText, context);
  }

  handleTurkishQuery(intent, rawText, ctx) {
    const lower = rawText.toLowerCase();

    if (intent.type === "week_query") {
      const wNo = intent.weekNo;
      const weekTasks = ctx.tasks.filter(t => t.week === String(wNo));
      const doneCount = weekTasks.filter(t => t.isDone).length;

      return {
        text: `**${wNo}. Hafta** modülünde toplam **${weekTasks.length} görev** bulunuyor. Şu ana kadar **${doneCount} tanesini tamamladın.**\n\nAşağıdaki karttan haftanın kazanılacak hedeflerini ve görev listesini inceleyebilir veya doğrudan filtreleyebilirsin:`,
        cards: [
          {
            type: "week_card",
            weekNo: wNo,
            title: `${wNo}. Hafta Öğrenme Modülü`,
            stats: `${doneCount}/${weekTasks.length} Görev Tamamlandı`,
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

    if (intent.type === "tasks_query") {
      if (lower.includes("yüksek") || lower.includes("acil") || lower.includes("öncelik")) {
        const topHigh = ctx.highTasks.slice(0, 3);
        return {
          text: `Şu anda tamamlanmayı bekleyen **${ctx.highTasks.length} adet yüksek öncelikli** görevin var. En kritik olanlar:`,
          cards: topHigh.map(t => ({
            type: "task_card",
            title: t.title,
            badge: `${t.week}. Hafta • Yüksek Öncelik`,
            status: "⏳ Devam Ediyor",
            actionLabel: "👁️ Göreve Odaklan",
            actionType: "focus_task",
            actionParam: t.title
          })),
          actions: [
            { label: "🔥 Yüksek Öncelikli Görevleri Filtrele", action: "filter_high_priority" },
            { label: "➕ Yeni Görev Ekle", action: "open_create_task" }
          ]
        };
      }

      if (lower.includes("tamamlanan") || lower.includes("biten")) {
        const doneList = ctx.tasks.filter(t => t.isDone).slice(0, 3);
        return {
          text: `Harika gidiyorsun! Toplam **${ctx.doneTasks} görevi** başarıyla tamamladın (Genel İlerleme: **%${ctx.progressPct}**).`,
          cards: doneList.map(t => ({
            type: "task_card",
            title: t.title,
            badge: `${t.week}. Hafta`,
            status: "✅ Tamamlandı",
            actionLabel: "👁️ İncele",
            actionType: "focus_task",
            actionParam: t.title
          })),
          actions: [
            { label: "✅ Tamamlananları Filtrele", action: "filter_completed" }
          ]
        };
      }

      const pendingSlice = ctx.tasks.filter(t => !t.isDone).slice(0, 3);
      return {
        text: `Portaldaki genel durumun:\n- **Toplam Görev:** ${ctx.totalTasks}\n- **Tamamlanan:** ${ctx.doneTasks}\n- **Devam Eden:** ${ctx.pendingTasks}\n- **Genel İlerleme:** %${ctx.progressPct}\n\nÜzerinde çalışabileceğin sıradaki görevler:`,
        cards: pendingSlice.map(t => ({
          type: "task_card",
          title: t.title,
          badge: `${t.week}. Hafta • ${t.priority}`,
          status: "⏳ Devam Ediyor",
          actionLabel: "👁️ Odaklan",
          actionType: "focus_task",
          actionParam: t.title
        })),
        actions: [
          { label: "📋 Tüm Görevleri Gör", action: "filter_all" },
          { label: "➕ Yeni Görev Ekle", action: "open_create_task" }
        ]
      };
    }

    if (intent.type === "grade_query") {
      return {
        text: `**KTÜ Not & Değerlendirme Sistemi Esasları:**\n\n1. **30 Kişi Kuralı:**\n   - Sınıf mevcudu **30'dan azsa** Mutlak Değerlendirme Sistemi (MDS) uygulanır; harf notları sabittir (90=AA, 80=BA, 75=BB... 40=DD).\n   - Sınıf mevcudu **30 ve üzeriyse** Bağıl Değerlendirme Sistemi (BDS / Çan Eğrisi) devreye girer; harf notları sınıf ortalamasına (HBN) göre belirlenir.\n2. **Final Barajı:** Final sınavından **en az 50** alma zorunluluğu vardır. 50'nin altı doğrudan **FF** kalır.\n3. **Çoklu Değerlendirme:** Sadece Vize/Final değil; Quiz, Laboratuvar, Proje ve Ödev oranları da dahil edilebilir.`,
        cards: [
          {
            type: "calculator_card",
            title: "KTÜ AGNO & Not Simülatörü",
            subtitle: "30 kişi kuralı, çan eğrisi ve çoklu ders AGNO hesabı",
            actionLabel: "🧮 Simülatörü Aç",
            actionType: "open_grade_wizard"
          }
        ],
        actions: [
          { label: "🧮 Not Sihirbazını Başlat", action: "open_grade_wizard" },
          { label: "📊 Panodaki Notlara Git", action: "goto_grades" }
        ]
      };
    }

    if (intent.type === "schedule_query") {
      const scheduleRows = document.querySelectorAll("#schedule-table-body tr");
      const courseCount = scheduleRows ? scheduleRows.length : 0;

      return {
        text: `Haftalık ders programında şu anda **${courseCount} adet ders** kayıtlı.\n\nDers programını sağ sütundaki **'Ders Programım'** panelinden yönetebilir; gün, saat, ders ve derslik belirterek yeni dersler ekleyebilirsin:`,
        actions: [
          { label: "📅 Ders Programına Git", action: "goto_schedule" },
          { label: "+ Yeni Ders Ekle", action: "open_add_course" }
        ]
      };
    }

    if (intent.type === "theme_toggle") {
      return {
        text: `AkademiX temasını değiştirmek için aşağıdaki butona tıklayabilir veya üst barda yer alan **Karanlık / Aydınlık Mod** butonunu kullanabilirsin. Tercihin tarayıcı ayarlarında kalıcı olarak saklanır:`,
        actions: [
          { label: "🌙/☀️ Temayı Şimdi Değiştir", action: "toggle_theme" }
        ]
      };
    }

    if (intent.type === "study_advice") {
      return {
        text: `**🎓 Başarılı Bir Dönem İçin AkademiX Tavsiyeleri:**\n\n1. **Pomodoro Tekniği:** 25 dakika odaklanmış kodlama / analiz + 5 dakika mola.\n2. **Yüksek Öncelik Kuralı:** Güne her zaman 'Yüksek Öncelikli' görevlerden birini tamamlayarak başla.\n3. **KTÜ Final Barajı Stratejisi:** Vizeleri yüksek tutsan bile finalde 50 barajını geçmek için son 2 haftaya kritik konu özetlerini bırakma.\n4. **Kişisel Notlar:** Ders sırasında aklına gelen anlık fikirleri sağ alttaki 'Kişisel Notlar' paneline kaydet.`,
        actions: [
          { label: "🔥 Yüksek Öncelikli Görevlerime Bak", action: "filter_high_priority" },
          { label: "📝 Not Ekle", action: "goto_notes" }
        ]
      };
    }

    return {
      text: `Merhaba! Ben **AkademiX AI**, KTÜ öğrenci başarı ve ders danışmanınım. 🏔️✨\n\nSana şu konularda anında yardımcı olabilirim:\n- 🎯 **Görev Takibi:** Haftalık işlerin, tamamlananlar ve öncelikli görevler.\n- 📊 **KTÜ Not Kuralları:** 30 kişi kuralı, MDS vs BDS çan eğrisi, harf notları ve AGNO hesabı.\n- 📅 **Ders Programı:** Ders ekleme/silme ve derslik bilgileri.\n- 💡 **Çalışma Stratejisi:** Zaman yönetimi ve başarı hedefleri.\n\nAşağıdaki hızlı sorulardan birini seçebilir ya da merak ettiğin konuyu yazabilirsin:`,
      actions: [
        { label: "🎯 2. Hafta görevlerim neler?", action: "quick_prompt", param: "2. hafta görevlerim neler?" },
        { label: "📊 KTÜ 30 kişi kuralı nedir?", action: "quick_prompt", param: "KTÜ 30 kişi kuralı nedir?" },
        { label: "🔥 Yüksek öncelikli görevler", action: "quick_prompt", param: "Yüksek öncelikli görevlerim neler?" },
        { label: "📅 Ders programına nasıl ders eklenir?", action: "quick_prompt", param: "Ders programına nasıl ders eklenir?" }
      ]
    };
  }

  handleEnglishQuery(intent, rawText, ctx) {
    if (intent.type === "tasks_query") {
      return {
        text: `Here is your current progress in **AkademiX**:\n- **Total Tasks:** ${ctx.totalTasks}\n- **Completed:** ${ctx.doneTasks} (%${ctx.progressPct})\n- **Pending:** ${ctx.pendingTasks}\n- **High Priority Pending:** ${ctx.highTasks.length}\n\nWould you like to review your high-priority items?`,
        actions: [
          { label: "🔥 Show High-Priority Tasks", action: "filter_high_priority" },
          { label: "📋 Show All Tasks", action: "filter_all" }
        ]
      };
    }

    if (intent.type === "grade_query") {
      return {
        text: `**KTU Grading & Bell Curve Policy:**\n\n- **Class Size < 30:** Absolute Grading System (MDS) with fixed thresholds (AA ≥ 90, BA ≥ 80, BB ≥ 75, etc.).\n- **Class Size ≥ 30:** Relative Grading System (BDS / Bell Curve) centered around the class average (HBN).\n- **Final Threshold:** A minimum score of **50** in the final examination is mandatory; scoring below 50 results in an automatic **FF**.`,
        actions: [
          { label: "🧮 Open KTU GPA Calculator", action: "open_grade_wizard" }
        ]
      };
    }

    return {
      text: `Hello! I am **AkademiX AI**, your smart academic and course companion. 🏔️✨\n\nI can assist you with:\n- Weekly learning modules & task tracking\n- KTU 30-student bell curve & GPA simulations\n- Course schedule management\n- Study tips and productivity strategies`,
      actions: [
        { label: "🎯 Show high priority tasks", action: "quick_prompt", param: "high priority tasks" },
        { label: "📊 Explain KTU grading", action: "quick_prompt", param: "KTU grading rule" }
      ]
    };
  }
}
