import { useState, useEffect } from "react";

const INITIAL_BETS = [
  { id: 1, date: "26.04", match: "Дортмунд — Фрайбург", league: "Бундеслига", bet: "Тотал 2.5+", betType: "total", odds: 1.53, stake: 5000, result: "win", score: "4-0", tags: ["Домашний"] },
  { id: 2, date: "26.04", match: "Осасуна — Севилья", league: "Ла Лига", bet: "1X", betType: "double", odds: 1.45, stake: 5000, result: "win", score: "2-1", tags: ["Домашний"] },
  { id: 3, date: "26.04", match: "Вильярреал — Сельта", league: "Ла Лига", bet: "Тотал 2.5+", betType: "total", odds: 1.80, stake: 3000, result: "win", score: "2-1", tags: [] },
  { id: 4, date: "26.04", match: "Штутгарт — Вердер", league: "Бундеслига", bet: "Победа Штутгарта", betType: "win", odds: 1.65, stake: 4000, result: "loss", score: "1-1", tags: ["Домашний"] },
  { id: 5, date: "28.04", match: "ПСЖ — Бавария", league: "ЛЧ", bet: "Тотал 2.5+", betType: "total", odds: 1.36, stake: 5000, result: "win", score: "5-4", tags: ["ЛЧ", "Топ матч"] },
  { id: 6, date: "29.04", match: "Атлетико — Арсенал", league: "ЛЧ", bet: "Тотал < 2.5", betType: "total", odds: 1.66, stake: 4000, result: "win", score: "1-1", tags: ["ЛЧ"] },
  { id: 7, date: "02.05", match: "Арсенал — Фулхэм", league: "АПЛ", bet: "Победа Арсенала", betType: "win", odds: 1.55, stake: 5000, result: "win", score: "3-0", tags: ["Домашний"] },
  { id: 8, date: "02.05", match: "Байер — Лейпциг", league: "Бундеслига", bet: "Тотал 2.5+", betType: "total", odds: 1.75, stake: 3000, result: "win", score: "4-1", tags: [] },
  { id: 9, date: "02.05", match: "Осасуна — Барса", league: "Ла Лига", bet: "Победа Барсы", betType: "win", odds: 1.75, stake: 3000, result: "win", score: "1-2", tags: [] },
  { id: 10, date: "03.05", match: "МЮ — Ливерпуль", league: "АПЛ", bet: "Тотал 2.5+", betType: "total", odds: 1.70, stake: 3000, result: "win", score: "3-2", tags: ["Дерби"] },
  { id: 11, date: "03.05", match: "Гладбах — Дортмунд", league: "Бундеслига", bet: "Победа БВБ", betType: "win", odds: 1.80, stake: 2500, result: "loss", score: "1-0", tags: [] },
  { id: 12, date: "04.05", match: "Эвертон — Ман Сити", league: "АПЛ", bet: "Победа Сити", betType: "win", odds: 1.35, stake: 5000, result: "loss", score: "3-3", tags: [] },
  { id: 13, date: "05.05", match: "Арсенал — Атлетико", league: "ЛЧ", bet: "Победа Арсенала", betType: "win", odds: 2.10, stake: 2500, result: "win", score: "1-0", tags: ["ЛЧ", "Полуфинал"] },
  { id: 14, date: "06.05", match: "Бавария — ПСЖ", league: "ЛЧ", bet: "Тотал 3.5+", betType: "total", odds: 2.20, stake: 5000, result: "loss", score: "1-1", tags: ["ЛЧ", "Полуфинал"] },
  { id: 15, date: "09.05", match: "Брайтон — Вулвз", league: "АПЛ", bet: "Победа Брайтона", betType: "win", odds: 1.40, stake: 5000, result: "win", score: "3-0", tags: ["Домашний"] },
  { id: 16, date: "09.05", match: "Ман Сити — Брентфорд", league: "АПЛ", bet: "Победа Сити", betType: "win", odds: 1.40, stake: 5000, result: "win", score: "3-0", tags: ["Домашний"] },
  { id: 17, date: "09.05", match: "Ливерпуль — Челси", league: "АПЛ", bet: "Победа Ливерпуля", betType: "win", odds: 1.65, stake: 4000, result: "loss", score: "1-1", tags: [] },
  { id: 18, date: "09.05", match: "Сандерленд — МЮ", league: "АПЛ", bet: "Победа МЮ", betType: "win", odds: 1.85, stake: 3000, result: "loss", score: "0-0", tags: [] },
  { id: 19, date: "10.05", match: "Барса — Реал (Эль-Класико)", league: "Ла Лига", bet: "Победа Барсы", betType: "win", odds: 2.00, stake: 5000, result: "win", score: "2-0", tags: ["Дерби", "Топ матч"] },
  { id: 20, date: "10.05", match: "Вест Хэм — Арсенал", league: "АПЛ", bet: "Победа Арсенала", betType: "win", odds: 1.55, stake: 5000, result: "win", score: "1-2", tags: [] },
  { id: 21, date: "13.05", match: "Ман Сити — Кристал Пэлас", league: "АПЛ", bet: "Победа Сити", betType: "win", odds: 1.30, stake: 5000, result: "win", score: "3-0", tags: ["Домашний"] },
  { id: 22, date: "15.05", match: "Астон Вилла — Ливерпуль", league: "АПЛ", bet: "Тотал 2.5+", betType: "total", odds: 1.65, stake: 5000, result: "win", score: "4-2", tags: ["Топ матч"] },
  { id: 23, date: "17.05", match: "МЮ — Ноттингем", league: "АПЛ", bet: "Победа МЮ", betType: "win", odds: 1.70, stake: 5000, result: "win", score: "3-2", tags: ["Домашний"] },
  { id: 24, date: "17.05", match: "Брентфорд — Кристал Пэлас", league: "АПЛ", bet: "Тотал 2.5+", betType: "total", odds: 1.65, stake: 3000, result: "win", score: "2-2", tags: [] },
  { id: 25, date: "17.05", match: "Ньюкасл — Вест Хэм", league: "АПЛ", bet: "Победа Ньюкасла", betType: "win", odds: 1.40, stake: 5000, result: "win", score: "3-1", tags: ["Домашний"] },
  { id: 26, date: "17.05", match: "Барса — Бетис", league: "Ла Лига", bet: "Победа Барсы", betType: "win", odds: 1.40, stake: 5000, result: "win", score: "3-1", tags: ["Домашний"] },
  { id: 27, date: "17.05", match: "Севилья — Реал Мадрид", league: "Ла Лига", bet: "Победа Реала", betType: "win", odds: 1.65, stake: 4000, result: "win", score: "0-1", tags: [] },
  { id: 28, date: "17.05", match: "Атлетико — Жирона", league: "Ла Лига", bet: "Победа Атлетико", betType: "win", odds: 1.45, stake: 5000, result: "win", score: "1-0", tags: ["Домашний"] },
  { id: 29, date: "18.05", match: "Арсенал — Бернли", league: "АПЛ", bet: "Победа Арсенала", betType: "win", odds: 1.20, stake: 5000, result: "win", score: "1-0", tags: ["Домашний"] },
];

const UPCOMING_MATCHES = [
  { date: "19.05", time: "18:30", match: "Борнмут — Ман Сити", league: "АПЛ", bet: "Победа Сити", odds: 1.65, conf: 4, sport: "football" },
  { date: "19.05", time: "19:15", match: "Челси — Тоттенхэм", league: "АПЛ", bet: "Победа Челси", odds: 1.85, conf: 3, sport: "football" },
  { date: "20.05", time: "19:00", match: "🏆 Астон Вилла — Фрайбург (ЛЕ ФИНАЛ)", league: "ЛЕ", bet: "Победа Виллы", odds: 1.80, conf: 4, sport: "football" },
  { date: "21.05", time: "00:00", match: "🏒 Колорадо — Вегас (Игра 1)", league: "НХЛ ФИНАЛ ЗАПАДА", bet: "Победа Колорадо", odds: 1.60, conf: 4, sport: "hockey" },
  { date: "22.05", time: "00:00", match: "🏒 Каролина — Монреаль (Игра 1)", league: "НХЛ ФИНАЛ ВОСТОКА", bet: "Победа Каролины", odds: 1.55, conf: 5, sport: "hockey" },
  { date: "23.05", time: "19:00", match: "Реал — Атлетик Бильбао", league: "Ла Лига", bet: "Тотал 2.5+", odds: 1.70, conf: 4, sport: "football" },
  { date: "23.05", time: "00:00", match: "🏒 Колорадо — Вегас (Игра 2)", league: "НХЛ ФИНАЛ ЗАПАДА", bet: "Тотал 5.5+", odds: 1.85, conf: 4, sport: "hockey" },
  { date: "24.05", time: "00:00", match: "🏒 Каролина — Монреаль (Игра 2)", league: "НХЛ ФИНАЛ ВОСТОКА", bet: "Победа Каролины", odds: 1.55, conf: 5, sport: "hockey" },
  { date: "24.05", time: "15:00", match: "Кристал Пэлас — Арсенал", league: "АПЛ", bet: "Победа Арсенала", odds: 1.75, conf: 4, sport: "football" },
  { date: "24.05", time: "15:00", match: "Ман Сити — Астон Вилла", league: "АПЛ", bet: "Победа Сити", odds: 1.50, conf: 5, sport: "football" },
  { date: "24.05", time: "15:00", match: "Ливерпуль — Брентфорд", league: "АПЛ", bet: "Победа Ливерпуля", odds: 1.60, conf: 3, sport: "football" },
  { date: "24.05", time: "19:00", match: "Валенсия — Барса", league: "Ла Лига", bet: "Победа Барсы", odds: 1.85, conf: 3, sport: "football" },
  { date: "30.05", time: "19:00", match: "🏆 ПСЖ — Арсенал (ЛЧ ФИНАЛ)", league: "ЛЧ ФИНАЛ", bet: "Тотал 2.5+", odds: 1.50, conf: 5, sport: "football" },
];

const NEWS = [
  { id: 1, date: "10.05", match: "Барса — Реал", type: "stat", priority: "high", title: "🏆 БАРСА — ЧЕМПИОН ИСПАНИИ!", text: "Барселона выиграла Эль-Класико 2-0 (Рэшфорд + Феррáн Торрес) и обеспечила 29-й титул за 3 тура до конца. Реал в хаосе.", impact: "Барса может играть с ротацией в оставшихся матчах" },
  { id: 2, date: "18.05", match: "Реал Мадрид", type: "team", priority: "high", title: "💔 Реал Мадрид в кризисе", text: "Конфликты в раздевалке, петиция продать Мбаппе. Вальверде получил травму головы в драке с Чуамени на тренировке.", impact: "❌ НЕ ставить на победы Реала — нестабильны" },
  { id: 3, date: "18.05", match: "Гонка за титул АПЛ", type: "stat", priority: "high", title: "Арсенал в 2 очках от чемпионства", text: "Арсенал ведёт +2 над Сити. Осталось 2 матча: Бернли (д) и Пэлас (г). При победе над Бернли почти гарантирован титул.", impact: "+ для побед Арсенала в оставшихся матчах" },
  { id: 4, date: "18.05", match: "Ман Сити", type: "injury", priority: "high", title: "Сити: Родри под вопросом, проиграл FA Cup", text: "Родри (пах) под сомнением. Сити проиграл финал FA Cup Челси. Гонка за титул почти потеряна.", impact: "Психологический удар, но Холланд и Доку в форме" },
  { id: 5, date: "17.05", match: "Ливерпуль", type: "injury", priority: "high", title: "🚨 Ливерпуль: атака разрушена", text: "Алиссон, Wata, Эндо, Фримпонг — все вне игры. Айзак под вопросом. Проиграли Вилле 4-2.", impact: "❌ Избегать больших ставок на Ливерпуль" },
  { id: 6, date: "17.05", match: "Астон Вилла", type: "form", priority: "high", title: "🔥 Астон Вилла на пике", text: "Разгромили Ливерпуль 4-2. 20 мая — финал Лиги Европы против Фрайбурга. Уже в ЛЧ через лигу.", impact: "+ для победы в финале ЛЕ, но осторожно с матчем против Сити (ротация)" },
  { id: 7, date: "18.05", match: "МЮ", type: "form", priority: "med", title: "МЮ выиграли 4 матча подряд", text: "Кэррик борется за постоянный контракт. Бруно Фернандеш в одном ассисте от рекорда АПЛ за сезон (нужен 20-й).", impact: "+ для побед МЮ дома" },
  { id: 8, date: "18.05", match: "Барса", type: "injury", priority: "med", title: "Ямаль выбыл до конца сезона", text: "Подколенное сухожилие. К ЧМ должен восстановиться. Барса справится — Рэшфорд и Феррáн Торрес в форме.", impact: "Атака Барсы ослаблена, но всё ещё сильнее многих" },
  { id: 9, date: "19.05", match: "🏆 ЛЧ ФИНАЛ ПСЖ — Арсенал", type: "stat", priority: "high", title: "Главное событие сезона — 30 мая в Будапеште", text: "ПСЖ фаворит 41.6% vs Арсенал 30.2%. ПСЖ забивает много (свыше 38 голов в ЛЧ). Арсенал — единственная не битая команда турнира.", impact: "+ для тотала 2.5+, обе забьют" },
  { id: 10, date: "19.05", match: "🏒 НХЛ Финал Востока", type: "stat", priority: "high", title: "🏒 Каролина — Монреаль: финал Востока!", text: "Каролина прошла Оттаву и Филадельфию двойным свипом (8-0). Монреаль — сенсация: прошёл Тампу и Баффало через 2 серии до 7 матчей. Усталые но героические.", impact: "+ для победы Каролины — свежие силы + доминанты" },
  { id: 11, date: "19.05", match: "🏒 НХЛ Финал Запада", type: "stat", priority: "high", title: "🏒 Колорадо — Вегас: финал Запада!", text: "Колорадо: свип ЛАК (4-0) + Миннесота (4-1). Вегас прошёл Юту и Анахайм через 6 матчей. МакКиннон и Маккар в форме, шансы Колорадо 62.7%.", impact: "+ для победы Колорадо в первой игре" },
  { id: 12, date: "19.05", match: "🏒 НХЛ — общая инфо", type: "form", priority: "med", title: "🏒 НХЛ: высокие тоталы в плей-офф", text: "Средний тотал в этих сериях НХЛ — 5.5+ голов за матч. Каролина забила 7 за серию против Филы. Вегас и Колорадо — атакующие команды.", impact: "+ для тоталов 5.5+ в финалах конференций" },
  { id: 13, date: "19.05", match: "🇷🇺 КХЛ", type: "stat", priority: "low", title: "КХЛ: сезон завершён", text: "Локомотив Ярославль — чемпион Кубка Гагарина 2026. Следующий сезон стартует в сентябре 2026.", impact: "Сейчас по КХЛ ставок нет" },
];

const COACH_TIP = {
  date: "19.05",
  title: "Совет дня от Claude",
  text: "Сезон футбола заканчивается, а в НХЛ — финалы конференций! Каролина и Колорадо — топовые ставки на хоккей. Из футбола: финал ЛЕ 20 мая (Астон Вилла), последний тур АПЛ 24 мая, ФИНАЛ ЛЧ 30 мая. Распределяй банк: не больше 5% на ставку. КХЛ закончилась — Локомотив чемпион.",
  highlight: "🏒 Каролина дома против Монреаля — лучшая ставка на хоккей этой недели"
};

const STORAGE_KEY = "kaper-stat-v5";
const SETTINGS_KEY = "kaper-settings-v5";

const themes = {
  green: { bg: "#0a0e13", card: "#141a22", cardLight: "#1c2530", border: "#243140", text: "#e8eef5", muted: "#7a8896", accent: "#00d97e", accent2: "#00b366", red: "#ff4757", yellow: "#ffa502", blue: "#3742fa" },
  blue: { bg: "#0a0f1a", card: "#13192a", cardLight: "#1c2540", border: "#243150", text: "#e8eef5", muted: "#7a8896", accent: "#3b82f6", accent2: "#2563eb", red: "#ff4757", yellow: "#ffa502", blue: "#3b82f6" },
  light: { bg: "#f5f7fa", card: "#ffffff", cardLight: "#f0f3f7", border: "#e2e8f0", text: "#1a202c", muted: "#718096", accent: "#10b981", accent2: "#059669", red: "#dc2626", yellow: "#d97706", blue: "#2563eb" },
};

export default function App() {
  const [bets, setBets] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : INITIAL_BETS; }
    catch { return INITIAL_BETS; }
  });

  const [settings, setSettings] = useState(() => {
    try { const s = localStorage.getItem(SETTINGS_KEY); return s ? JSON.parse(s) : { bank: 50000, goal: 100000, theme: "green", strategy: "flat" }; }
    catch { return { bank: 50000, goal: 100000, theme: "green", strategy: "flat" }; }
  });

  const [tab, setTab] = useState("home");
  const c = themes[settings.theme];

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bets)); } catch {} }, [bets]);
  useEffect(() => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {} }, [settings]);

  const calcProfit = (b) => b.result === "win" ? Math.round(b.stake * b.odds - b.stake) : b.result === "loss" ? -b.stake : 0;

  const stats = bets.reduce((acc, b) => {
    if (b.result === "win") acc.wins++;
    else if (b.result === "loss") acc.losses++;
    if (b.result !== "pending") { acc.profit += calcProfit(b); acc.invested += b.stake; }
    return acc;
  }, { wins: 0, losses: 0, profit: 0, invested: 0 });

  const winRate = stats.wins + stats.losses > 0 ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100) : 0;

  // Streaks
  const completedBets = bets.filter(b => b.result !== "pending").reverse();
  let currentStreak = 0;
  let streakType = null;
  for (const b of completedBets) {
    if (streakType === null) { streakType = b.result; currentStreak = 1; }
    else if (b.result === streakType) currentStreak++;
    else break;
  }

  let bestWinStreak = 0, worstLossStreak = 0, w = 0, l = 0;
  for (const b of bets.filter(x => x.result !== "pending")) {
    if (b.result === "win") { w++; l = 0; if (w > bestWinStreak) bestWinStreak = w; }
    else { l++; w = 0; if (l > worstLossStreak) worstLossStreak = l; }
  }

  const props = { bets, setBets, stats, winRate, calcProfit, settings, setSettings, c, currentStreak, streakType, bestWinStreak, worstLossStreak };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, fontFamily: "system-ui, sans-serif", color: c.text, paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(135deg, ${c.accent}20, ${c.bg})`, borderBottom: `1px solid ${c.border}`, padding: "14px 18px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>⚽</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>КАПЕР<span style={{ color: c.accent }}>СТАТ</span></div>
            <div style={{ fontSize: 9, color: c.muted, letterSpacing: "0.1em", marginTop: 1 }}>{tabTitles[tab]}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 10, color: c.muted }}>БАНК</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: stats.profit >= 0 ? c.accent : c.red }}>
              {(settings.bank + stats.profit).toLocaleString()} ₽
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 12px" }}>
        {tab === "home" && <HomeTab {...props} setTab={setTab} />}
        {tab === "bets" && <BetsTab {...props} />}
        {tab === "stats" && <StatsTab {...props} />}
        {tab === "matches" && <MatchesTab {...props} />}
        {tab === "news" && <NewsTab {...props} />}
        {tab === "calc" && <CalcTab {...props} />}
        {tab === "bank" && <BankTab {...props} />}
        {tab === "express" && <ExpressTab {...props} />}
        {tab === "achieve" && <AchieveTab {...props} />}
        {tab === "settings" && <SettingsTab {...props} />}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: c.card, borderTop: `1px solid ${c.border}`, display: "flex", overflowX: "auto", padding: "6px 4px", zIndex: 100 }}>
        {[
          ["home", "🏠"], ["bets", "📋"], ["matches", "⚽"], ["news", "📰"],
          ["stats", "📊"], ["bank", "💰"], ["calc", "🧮"], ["express", "🎯"],
          ["achieve", "🏆"], ["settings", "⚙️"],
        ].map(([key, icon]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: tab === key ? c.accent + "20" : "transparent", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 1, padding: "6px 4px", color: tab === key ? c.accent : c.muted, cursor: "pointer",
            fontSize: 8, fontWeight: tab === key ? 700 : 500, flex: "1 0 auto", minWidth: 38, borderRadius: 6,
          }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 8, letterSpacing: "0.05em" }}>{tabLabels[key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const tabTitles = {
  home: "ГЛАВНАЯ ПАНЕЛЬ", bets: "ИСТОРИЯ СТАВОК", stats: "СТАТИСТИКА", matches: "БЛИЖАЙШИЕ МАТЧИ",
  news: "НОВОСТИ И ИНСАЙТЫ", calc: "КАЛЬКУЛЯТОР", bank: "БАНК И РОСТ", express: "ЭКСПРЕССЫ",
  achieve: "ДОСТИЖЕНИЯ", settings: "НАСТРОЙКИ",
};

const tabLabels = {
  home: "Главн", bets: "Ставки", matches: "Матчи", news: "Новости",
  stats: "Статы", bank: "Банк", calc: "Расчёт", express: "Экспр",
  achieve: "Кубки", settings: "Настр",
};

// ============== HOME ==============
function HomeTab({ stats, winRate, bets, setTab, c, settings, currentStreak, streakType }) {
  const recent = [...bets].reverse().slice(0, 3);
  const pending = bets.filter(b => b.result === "pending").length;
  const goalProgress = Math.min(100, Math.round(((settings.bank + stats.profit) / settings.goal) * 100));

  return (
    <div>
      {/* Goal progress */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: c.muted, letterSpacing: "0.1em" }}>🎯 ЦЕЛЬ МЕСЯЦА</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: c.accent }}>{goalProgress}%</span>
        </div>
        <div style={{ height: 8, background: c.cardLight, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${goalProgress}%`, background: `linear-gradient(90deg, ${c.accent}, ${c.accent2})`, borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: c.muted }}>
          <span>{(settings.bank + stats.profit).toLocaleString()} ₽</span>
          <span>{settings.goal.toLocaleString()} ₽</span>
        </div>
      </div>

      {/* Coach tip */}
      <div style={{ background: `linear-gradient(135deg, ${c.accent}15, ${c.card})`, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 18 }}>🤖</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: c.accent, letterSpacing: "0.1em" }}>СОВЕТ ДНЯ ОТ CLAUDE</span>
        </div>
        <div style={{ fontSize: 12, color: c.text, lineHeight: 1.5, marginBottom: 8 }}>{COACH_TIP.text}</div>
        <div style={{ background: c.cardLight, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: c.accent, fontWeight: 600 }}>{COACH_TIP.highlight}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <Stat title="ПРОХОДИМОСТЬ" value={`${winRate}%`} sub={`${stats.wins}W / ${stats.losses}L`} color={winRate >= 70 ? c.accent : c.yellow} c={c} />
        <Stat title="ROI" value={stats.invested > 0 ? `${((stats.profit / stats.invested) * 100).toFixed(0)}%` : "—"} sub={`${stats.invested.toLocaleString()} ₽`} color={stats.profit >= 0 ? c.accent : c.red} c={c} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
        <MiniStat label="ВЫИГР" value={stats.wins} color={c.accent} c={c} />
        <MiniStat label="ПРОИГР" value={stats.losses} color={c.red} c={c} />
        <MiniStat label="ОЖИД" value={pending} color={c.yellow} c={c} />
      </div>

      {/* Streak */}
      {currentStreak > 0 && (
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: c.muted }}>🔥 ТЕКУЩАЯ СЕРИЯ</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: streakType === "win" ? c.accent : c.red }}>
            {currentStreak} {streakType === "win" ? "побед" : "поражений"}
          </span>
        </div>
      )}

      <SectionTitle c={c}>ПОСЛЕДНИЕ СТАВКИ</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {recent.map(b => <BetRow key={b.id} bet={b} c={c} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <ActionBtn icon="⚽" label="Матчи" onClick={() => setTab("matches")} c={c} />
        <ActionBtn icon="📰" label="Новости" onClick={() => setTab("news")} c={c} />
        <ActionBtn icon="🧮" label="Расчёт" onClick={() => setTab("calc")} c={c} />
        <ActionBtn icon="🏆" label="Достижения" onClick={() => setTab("achieve")} c={c} />
      </div>
    </div>
  );
}

// ============== BETS ==============
function BetsTab({ bets, setBets, calcProfit, c }) {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ date: "", match: "", league: "", bet: "", betType: "win", odds: "", stake: 3000, result: "pending", score: "", tags: [] });

  const submit = () => {
    if (!form.match || !form.odds) return;
    const newBet = { ...form, odds: parseFloat(form.odds), stake: parseInt(form.stake), id: editId || Date.now() };
    if (editId) setBets(p => p.map(b => b.id === editId ? newBet : b));
    else setBets(p => [...p, newBet]);
    setForm({ date: "", match: "", league: "", bet: "", betType: "win", odds: "", stake: 3000, result: "pending", score: "", tags: [] });
    setEditId(null); setShow(false);
  };

  const edit = (b) => { setForm({ ...b, odds: String(b.odds), tags: b.tags || [] }); setEditId(b.id); setShow(true); };
  const filtered = [...bets].filter(b => filter === "all" || b.result === filter).reverse();

  return (
    <div>
      <button onClick={() => { setShow(!show); setEditId(null); }} style={{ width: "100%", background: show ? c.cardLight : `linear-gradient(135deg, ${c.accent}, ${c.accent2})`, color: show ? c.muted : "#000", border: "none", borderRadius: 10, padding: 13, fontWeight: 800, fontSize: 14, cursor: "pointer", marginBottom: 12 }}>
        {show ? "✕ ОТМЕНА" : "+ ДОБАВИТЬ СТАВКУ"}
      </button>

      {show && (
        <div style={{ background: c.card, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <Row><Field label="ДАТА" value={form.date} onChange={v => setForm(p => ({ ...p, date: v }))} placeholder="06.05" c={c} /><Field label="СЧЁТ" value={form.score} onChange={v => setForm(p => ({ ...p, score: v }))} placeholder="2-1" c={c} /></Row>
          <Field label="МАТЧ" value={form.match} onChange={v => setForm(p => ({ ...p, match: v }))} placeholder="Команда А — Б" full c={c} />
          <Field label="ЛИГА" value={form.league} onChange={v => setForm(p => ({ ...p, league: v }))} placeholder="АПЛ / Ла Лига / ЛЧ" full c={c} />
          <Field label="СТАВКА" value={form.bet} onChange={v => setForm(p => ({ ...p, bet: v }))} placeholder="Тотал 2.5+" full c={c} />
          <div style={{ marginBottom: 8 }}>
            <Label c={c}>ТИП СТАВКИ</Label>
            <select value={form.betType} onChange={e => setForm(p => ({ ...p, betType: e.target.value }))} style={selectStyle(c)}>
              <option value="win">Победа</option><option value="total">Тотал</option>
              <option value="double">Двойной шанс</option><option value="both">Обе забьют</option><option value="other">Другое</option>
            </select>
          </div>
          <Row>
            <Field label="КФ" value={form.odds} onChange={v => setForm(p => ({ ...p, odds: v }))} placeholder="1.75" type="number" c={c} />
            <Field label="СУММА" value={form.stake} onChange={v => setForm(p => ({ ...p, stake: v }))} placeholder="3000" type="number" c={c} />
          </Row>
          <div>
            <Label c={c}>РЕЗУЛЬТАТ</Label>
            <select value={form.result} onChange={e => setForm(p => ({ ...p, result: e.target.value }))} style={selectStyle(c)}>
              <option value="pending">⏳ Ожидание</option><option value="win">✅ Зашло</option><option value="loss">❌ Не зашло</option>
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <Label c={c}>ТЕГИ</Label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Дерби", "Домашний", "ЛЧ", "Топ матч", "После травмы"].map(t => (
                <button key={t} onClick={() => setForm(p => ({ ...p, tags: p.tags.includes(t) ? p.tags.filter(x => x !== t) : [...p.tags, t] }))} style={{
                  background: form.tags.includes(t) ? c.accent : c.cardLight, color: form.tags.includes(t) ? "#000" : c.muted,
                  border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                }}>{t}</button>
              ))}
            </div>
          </div>
          <button onClick={submit} style={{ width: "100%", marginTop: 12, background: c.accent, color: "#000", border: "none", borderRadius: 8, padding: 12, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>{editId ? "СОХРАНИТЬ" : "ДОБАВИТЬ"}</button>
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {[["all", "ВСЕ"], ["win", "✅"], ["loss", "❌"], ["pending", "⏳"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{ background: filter === v ? c.accent : c.cardLight, color: filter === v ? "#000" : c.muted, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map(b => <BetRow key={b.id} bet={b} onEdit={() => edit(b)} onDelete={() => setBets(p => p.filter(x => x.id !== b.id))} c={c} />)}
        {filtered.length === 0 && <Empty msg="Ставок нет" c={c} />}
      </div>
    </div>
  );
}

// ============== STATS ==============
function StatsTab({ stats, winRate, bets, calcProfit, c }) {
  const wins = bets.filter(b => b.result === "win");
  const losses = bets.filter(b => b.result === "loss");

  const byLeague = bets.reduce((acc, b) => {
    if (b.result === "pending" || !b.league) return acc;
    if (!acc[b.league]) acc[b.league] = { w: 0, l: 0, profit: 0 };
    if (b.result === "win") acc[b.league].w++; else acc[b.league].l++;
    acc[b.league].profit += calcProfit(b);
    return acc;
  }, {});

  const byBetType = bets.reduce((acc, b) => {
    if (b.result === "pending") return acc;
    const type = b.betType || (b.bet.includes("Тотал") ? "total" : "win");
    const labels = { win: "Победы", total: "Тоталы", double: "Двойной шанс", both: "Обе забьют", other: "Другое" };
    const key = labels[type] || "Другое";
    if (!acc[key]) acc[key] = { w: 0, l: 0, profit: 0 };
    if (b.result === "win") acc[key].w++; else acc[key].l++;
    acc[key].profit += calcProfit(b);
    return acc;
  }, {});

  const biggestWin = wins.reduce((m, b) => calcProfit(b) > calcProfit(m || { stake: 0, odds: 0 }) ? b : m, null);
  const biggestLoss = losses.reduce((m, b) => b.stake > (m?.stake || 0) ? b : m, null);
  const avgWinOdds = wins.length > 0 ? (wins.reduce((s, b) => s + b.odds, 0) / wins.length).toFixed(2) : "—";

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <Stat title="ПРОХОДИМОСТЬ" value={`${winRate}%`} sub={`${stats.wins} побед`} color={c.accent} c={c} />
        <Stat title="ПРИБЫЛЬ" value={`${stats.profit >= 0 ? "+" : ""}${stats.profit.toLocaleString()}`} sub="рублей" color={stats.profit >= 0 ? c.accent : c.red} c={c} />
      </div>

      <SectionTitle c={c}>ПО ЛИГАМ</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
        {Object.entries(byLeague).map(([league, d], i, arr) => {
          const tot = d.w + d.l, rate = tot > 0 ? Math.round((d.w / tot) * 100) : 0;
          return (
            <div key={league} style={{ marginBottom: i === arr.length - 1 ? 0 : 10, paddingBottom: i === arr.length - 1 ? 0 : 10, borderBottom: i === arr.length - 1 ? "none" : `1px solid ${c.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{league}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: d.profit >= 0 ? c.accent : c.red }}>{d.profit >= 0 ? "+" : ""}{d.profit.toLocaleString()} ₽</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: c.muted }}>{rate}% ({d.w}/{tot})</span>
              </div>
              <div style={{ height: 5, background: c.cardLight, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${rate}%`, background: rate >= 70 ? c.accent : c.yellow, borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </div>

      <SectionTitle c={c}>ПО ТИПУ СТАВОК</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
        {Object.entries(byBetType).map(([type, d], i, arr) => {
          const tot = d.w + d.l, rate = tot > 0 ? Math.round((d.w / tot) * 100) : 0;
          return (
            <div key={type} style={{ marginBottom: i === arr.length - 1 ? 0 : 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{type}</span>
                <span style={{ fontSize: 12, color: rate >= 70 ? c.accent : c.yellow, fontWeight: 700 }}>{rate}% ({d.w}/{tot})</span>
              </div>
              <div style={{ height: 5, background: c.cardLight, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${rate}%`, background: rate >= 70 ? c.accent : c.yellow, borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </div>

      <SectionTitle c={c}>РЕКОРДЫ</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
        {biggestWin && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 3 }}>🏆 ЛУЧШАЯ СТАВКА</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{biggestWin.match}</div>
            <div style={{ fontSize: 11, color: c.muted }}>{biggestWin.bet} · КФ {biggestWin.odds}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: c.accent, marginTop: 3 }}>+{calcProfit(biggestWin).toLocaleString()} ₽</div>
          </div>
        )}
        {biggestLoss && (
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 10 }}>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 3 }}>💀 ХУДШАЯ СТАВКА</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{biggestLoss.match}</div>
            <div style={{ fontSize: 11, color: c.muted }}>{biggestLoss.bet} · КФ {biggestLoss.odds}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: c.red, marginTop: 3 }}>-{biggestLoss.stake.toLocaleString()} ₽</div>
          </div>
        )}
      </div>

      <SectionTitle c={c}>ДЕТАЛИ</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12 }}>
        <DetailRow label="Всего ставок" value={stats.wins + stats.losses} c={c} />
        <DetailRow label="✅ Зашло" value={stats.wins} color={c.accent} c={c} />
        <DetailRow label="❌ Не зашло" value={stats.losses} color={c.red} c={c} />
        <DetailRow label="Инвестировано" value={`${stats.invested.toLocaleString()} ₽`} c={c} />
        <DetailRow label="Возврат" value={`${(stats.invested + stats.profit).toLocaleString()} ₽`} c={c} />
        <DetailRow label="Средний КФ побед" value={avgWinOdds} c={c} />
        <DetailRow label="ROI" value={stats.invested > 0 ? `${((stats.profit / stats.invested) * 100).toFixed(1)}%` : "—"} color={stats.profit >= 0 ? c.accent : c.red} c={c} last />
      </div>
    </div>
  );
}

// ============== MATCHES ==============
function MatchesTab({ c }) {
  const [sportFilter, setSportFilter] = useState("all");
  const filtered = UPCOMING_MATCHES.filter(m => sportFilter === "all" || m.sport === sportFilter);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[["all", "ВСЕ", "🎯"], ["football", "ФУТБОЛ", "⚽"], ["hockey", "ХОККЕЙ", "🏒"]].map(([v, l, icon]) => (
          <button key={v} onClick={() => setSportFilter(v)} style={{
            flex: 1, background: sportFilter === v ? c.accent : c.cardLight, color: sportFilter === v ? "#000" : c.muted,
            border: "none", borderRadius: 8, padding: "10px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>{icon} {l}</button>
        ))}
      </div>

      <SectionTitle c={c}>БЛИЖАЙШИЕ ИГРЫ ({filtered.length})</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((m, i) => (
          <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderLeft: `3px solid ${m.sport === "hockey" ? c.blue : c.accent}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{m.sport === "hockey" ? "🏒" : "⚽"}</span>
                <span style={{ background: c.cardLight, padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, color: m.sport === "hockey" ? c.blue : c.accent }}>{m.league}</span>
                <span style={{ fontSize: 11, color: c.muted }}>{m.date} · {m.time}</span>
              </div>
              <span style={{ fontSize: 11, color: c.yellow }}>{"⭐".repeat(m.conf)}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{m.match}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: c.muted }}>📌 {m.bet}</span>
              {m.odds > 0 && <span style={{ fontSize: 13, fontWeight: 800, color: m.sport === "hockey" ? c.blue : c.accent }}>КФ {m.odds}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== NEWS ==============
function NewsTab({ c }) {
  const [filterMatch, setFilterMatch] = useState("all");
  const matches = ["all", ...new Set(NEWS.map(n => n.match))];
  const filtered = filterMatch === "all" ? NEWS : NEWS.filter(n => n.match === filterMatch);
  const typeIcons = { injury: "🏥", team: "👥", form: "📈", stat: "📊" };
  const typeLabels = { injury: "ТРАВМА", team: "СОСТАВ", form: "ФОРМА", stat: "СТАТА" };
  const priorityColors = { high: c.red, med: c.yellow, low: c.muted };

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${c.accent}15, ${c.card})`, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 26 }}>📰</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: c.accent }}>СВЕЖИЕ ИНСАЙТЫ</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>Обновлено: 7 мая · {NEWS.length} новостей</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {matches.map(m => (
          <button key={m} onClick={() => setFilterMatch(m)} style={{ background: filterMatch === m ? c.accent : c.cardLight, color: filterMatch === m ? "#000" : c.muted, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{m === "all" ? "ВСЕ" : m}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(news => (
          <div key={news.id} style={{ background: c.card, border: `1px solid ${c.border}`, borderLeft: `3px solid ${priorityColors[news.priority]}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{typeIcons[news.type]}</span>
              <span style={{ fontSize: 9, background: priorityColors[news.priority] + "30", color: priorityColors[news.priority], padding: "2px 6px", borderRadius: 4, fontWeight: 800, letterSpacing: "0.1em" }}>{typeLabels[news.type]}</span>
              <span style={{ fontSize: 10, color: c.muted, marginLeft: "auto" }}>{news.date}</span>
            </div>
            <div style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginBottom: 4 }}>⚽ {news.match}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{news.title}</div>
            <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.5, marginBottom: 8 }}>{news.text}</div>
            <div style={{ background: c.cardLight, borderRadius: 6, padding: "6px 10px", fontSize: 11, color: c.accent, fontWeight: 600 }}>💡 {news.impact}</div>
          </div>
        ))}
      </div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12, marginTop: 12 }}>
        <div style={{ fontSize: 11, color: c.yellow, marginBottom: 6 }}>🔄 КАК ОБНОВИТЬ</div>
        <div style={{ fontSize: 11, color: c.text, lineHeight: 1.5 }}>Напиши в чат: <span style={{ color: c.accent, fontWeight: 700 }}>"Обнови новости"</span> — я выдам свежий список.</div>
      </div>
    </div>
  );
}

// ============== CALC ==============
function CalcTab({ settings, c }) {
  const [odds, setOdds] = useState("1.75");
  const [confidence, setConfidence] = useState(4);
  const [strategy, setStrategy] = useState(settings.strategy || "flat");

  const baseStake = strategy === "flat" ? (2000 + (confidence - 1) * 750)
    : strategy === "percent" ? Math.round(settings.bank * (confidence / 100))
    : 2000 + (confidence - 1) * 750;

  const numOdds = parseFloat(odds) || 0;
  const profit = Math.round(baseStake * numOdds - baseStake);
  const total = Math.round(baseStake * numOdds);
  const bankPercent = ((baseStake / settings.bank) * 100).toFixed(1);
  const warning = bankPercent > 10;

  return (
    <div>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <Label c={c}>СТРАТЕГИЯ</Label>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {[["flat", "Флэт"], ["percent", "% от банка"], ["confidence", "По уверенности"]].map(([v, l]) => (
            <button key={v} onClick={() => setStrategy(v)} style={{ flex: 1, padding: 10, background: strategy === v ? c.accent : c.cardLight, color: strategy === v ? "#000" : c.text, border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <Label c={c}>УВЕРЕННОСТЬ</Label>
        <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setConfidence(n)} style={{ flex: 1, padding: "10px 0", background: confidence === n ? c.accent : c.cardLight, color: confidence === n ? "#000" : c.text, border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer", fontWeight: 700 }}>{"⭐".repeat(n)}</button>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Label c={c}>КОЭФФИЦИЕНТ</Label>
          <input type="number" step="0.01" value={odds} onChange={e => setOdds(e.target.value)} style={inputStyle(c)} />
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${c.accent}20, ${c.card})`, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 16 }}>
        <ResultRow label="Сумма ставки" value={`${baseStake.toLocaleString()} ₽`} c={c} />
        <ResultRow label="% от банка" value={`${bankPercent}%`} color={warning ? c.red : c.accent} c={c} />
        <ResultRow label="Коэффициент" value={odds} c={c} />
        <div style={{ borderTop: `1px solid ${c.border}`, margin: "12px 0" }} />
        <ResultRow label="Возврат" value={`${total.toLocaleString()} ₽`} big c={c} />
        <ResultRow label="Чистая прибыль" value={`+${profit.toLocaleString()} ₽`} color={c.accent} big c={c} />
      </div>

      {warning && (
        <div style={{ background: c.red + "20", border: `1px solid ${c.red}`, borderRadius: 10, padding: 12, marginTop: 12 }}>
          <div style={{ fontSize: 11, color: c.red, fontWeight: 800, marginBottom: 4 }}>⚠️ ВНИМАНИЕ</div>
          <div style={{ fontSize: 12, color: c.text }}>Ставка больше 10% от банка. Это рискованно — снижай уверенность или сумму.</div>
        </div>
      )}
    </div>
  );
}

// ============== BANK ==============
function BankTab({ bets, calcProfit, stats, settings, setSettings, c }) {
  const completed = bets.filter(b => b.result !== "pending");
  let running = settings.bank;
  const points = completed.map(b => { running += calcProfit(b); return { date: b.date, value: running, profit: calcProfit(b), match: b.match }; });

  const max = Math.max(...points.map(p => p.value), settings.bank);
  const min = Math.min(...points.map(p => p.value), settings.bank);
  const range = max - min || 1;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <Stat title="ТЕКУЩИЙ БАНК" value={`${(settings.bank + stats.profit).toLocaleString()} ₽`} sub={`старт: ${settings.bank.toLocaleString()}`} color={c.accent} c={c} />
        <Stat title="ИЗМЕНЕНИЕ" value={`${stats.profit >= 0 ? "+" : ""}${stats.profit.toLocaleString()}`} sub={`${stats.invested > 0 ? ((stats.profit / settings.bank) * 100).toFixed(1) : 0}% от старта`} color={stats.profit >= 0 ? c.accent : c.red} c={c} />
      </div>

      <SectionTitle c={c}>ГРАФИК РОСТА</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <svg viewBox="0 0 320 160" style={{ width: "100%", height: 180 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={c.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {points.length > 1 && (
            <>
              <line x1="0" y1={160 - ((settings.bank - min) / range) * 160} x2="320" y2={160 - ((settings.bank - min) / range) * 160} stroke={c.border} strokeDasharray="4" />
              <path d={`M 0,160 ${points.map((p, i) => `L ${(i / (points.length - 1)) * 320},${160 - ((p.value - min) / range) * 160}`).join(" ")} L 320,160 Z`} fill="url(#grad)" />
              <polyline points={points.map((p, i) => `${(i / (points.length - 1)) * 320},${160 - ((p.value - min) / range) * 160}`).join(" ")} fill="none" stroke={c.accent} strokeWidth="2.5" />
              {points.map((p, i) => <circle key={i} cx={(i / (points.length - 1)) * 320} cy={160 - ((p.value - min) / range) * 160} r="3" fill={p.profit >= 0 ? c.accent : c.red} />)}
            </>
          )}
        </svg>
      </div>

      <SectionTitle c={c}>ИСТОРИЯ ИЗМЕНЕНИЙ</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 10 }}>
        {[...points].reverse().slice(0, 15).map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < points.length - 1 && i < 14 ? `1px solid ${c.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{p.match}</div>
              <div style={{ fontSize: 10, color: c.muted }}>{p.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: p.profit >= 0 ? c.accent : c.red }}>{p.profit >= 0 ? "+" : ""}{p.profit.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: c.muted }}>Банк: {p.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== EXPRESS ==============
function ExpressTab({ c }) {
  const top3 = UPCOMING_MATCHES.filter(m => m.conf >= 4 && m.odds > 0).slice(0, 3);
  const top4 = UPCOMING_MATCHES.filter(m => m.conf >= 4 && m.odds > 0).slice(0, 4);
  const calcOdds = (m) => m.reduce((a, x) => a * x.odds, 1);

  return (
    <div>
      <ExpressCard title="ТРОЙНИК" subtitle="Надёжный" matches={top3} stake={3000} totalOdds={calcOdds(top3)} c={c} />
      <ExpressCard title="ЧЕТВЕРНОЙ" subtitle="Рискованный" matches={top4} stake={2000} totalOdds={calcOdds(top4)} c={c} />
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 12, marginTop: 12 }}>
        <div style={{ fontSize: 11, color: c.yellow, marginBottom: 6 }}>⚠️ ПРАВИЛА ЭКСПРЕССА</div>
        <div style={{ fontSize: 12, lineHeight: 1.6 }}>
          • Только матчи с уверенностью 4-5⭐<br/>• Чем больше плеч, тем выше риск<br/>• Не основная стратегия — только бонус
        </div>
      </div>
    </div>
  );
}

function ExpressCard({ title, subtitle, matches, stake, totalOdds, c }) {
  const winnings = Math.round(stake * totalOdds - stake);
  return (
    <div style={{ background: c.card, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div><div style={{ fontSize: 13, fontWeight: 800, color: c.accent }}>{title}</div><div style={{ fontSize: 10, color: c.muted }}>{subtitle}</div></div>
        <span style={{ fontSize: 14, fontWeight: 800 }}>КФ {totalOdds.toFixed(2)}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {matches.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < matches.length - 1 ? `1px solid ${c.border}` : "none" }}>
            <div><div style={{ fontSize: 12, fontWeight: 600 }}>{m.match}</div><div style={{ fontSize: 10, color: c.muted }}>{m.bet}</div></div>
            <span style={{ fontSize: 12, color: c.accent, alignSelf: "center", fontWeight: 700 }}>{m.odds}</span>
          </div>
        ))}
      </div>
      <div style={{ background: c.cardLight, borderRadius: 8, padding: 12, display: "flex", justifyContent: "space-between" }}>
        <div><div style={{ fontSize: 10, color: c.muted }}>СТАВКА</div><div style={{ fontSize: 14, fontWeight: 800 }}>{stake.toLocaleString()} ₽</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: c.muted }}>ВЫИГРЫШ</div><div style={{ fontSize: 14, fontWeight: 800, color: c.accent }}>+{winnings.toLocaleString()} ₽</div></div>
      </div>
    </div>
  );
}

// ============== ACHIEVEMENTS ==============
function AchieveTab({ stats, winRate, bets, calcProfit, bestWinStreak, c }) {
  const totalBets = stats.wins + stats.losses;

  const achievements = [
    { id: 1, icon: "🥇", title: "Первая победа", desc: "Выиграй свою первую ставку", done: stats.wins >= 1 },
    { id: 2, icon: "🔥", title: "5 побед подряд", desc: "Серия из 5 выигранных ставок", done: bestWinStreak >= 5 },
    { id: 3, icon: "💰", title: "+10 000 ₽", desc: "Заработай первые 10 000", done: stats.profit >= 10000 },
    { id: 4, icon: "💎", title: "+50 000 ₽", desc: "Большая прибыль", done: stats.profit >= 50000 },
    { id: 5, icon: "🎯", title: "10 ставок", desc: "Сделай первые 10 ставок", done: totalBets >= 10 },
    { id: 6, icon: "🏆", title: "50 ставок", desc: "Полтинник позади", done: totalBets >= 50 },
    { id: 7, icon: "⚡", title: "Точность 70%", desc: "Достигни проходимости 70%+", done: winRate >= 70 && totalBets >= 10 },
    { id: 8, icon: "🚀", title: "Точность 80%", desc: "Достигни проходимости 80%+", done: winRate >= 80 && totalBets >= 10 },
    { id: 9, icon: "🎲", title: "10 побед подряд", desc: "Невероятная серия", done: bestWinStreak >= 10 },
    { id: 10, icon: "👑", title: "100 ставок", desc: "Капер уровня PRO", done: totalBets >= 100 },
  ];

  const unlocked = achievements.filter(a => a.done).length;
  const rank = totalBets < 10 ? "Новичок" : totalBets < 50 ? "Любитель" : totalBets < 100 ? "Капер" : totalBets < 200 ? "Профи" : "Легенда";

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${c.accent}20, ${c.card})`, border: `1px solid ${c.accent}`, borderRadius: 12, padding: 18, marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>👑</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{rank}</div>
        <div style={{ fontSize: 12, color: c.muted }}>Открыто: {unlocked} из {achievements.length} достижений</div>
        <div style={{ height: 8, background: c.cardLight, borderRadius: 4, marginTop: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(unlocked / achievements.length) * 100}%`, background: c.accent, borderRadius: 4 }} />
        </div>
      </div>

      <SectionTitle c={c}>ДОСТИЖЕНИЯ</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {achievements.map(a => (
          <div key={a.id} style={{
            background: c.card, border: `1px solid ${a.done ? c.accent : c.border}`, borderRadius: 10, padding: 12,
            opacity: a.done ? 1 : 0.5, textAlign: "center",
          }}>
            <div style={{ fontSize: 26, marginBottom: 6, filter: a.done ? "none" : "grayscale(1)" }}>{a.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{a.title}</div>
            <div style={{ fontSize: 10, color: c.muted, lineHeight: 1.3 }}>{a.desc}</div>
            {a.done && <div style={{ fontSize: 9, color: c.accent, fontWeight: 700, marginTop: 4 }}>✓ ОТКРЫТО</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== SETTINGS ==============
function SettingsTab({ settings, setSettings, bets, setBets, c }) {
  const [bank, setBank] = useState(settings.bank);
  const [goal, setGoal] = useState(settings.goal);
  const save = () => setSettings(p => ({ ...p, bank: parseInt(bank), goal: parseInt(goal) }));

  const reset = () => {
    if (confirm("Удалить ВСЕ ставки? Это действие нельзя отменить.")) {
      setBets([]);
    }
  };

  return (
    <div>
      <SectionTitle c={c}>БАНК И ЦЕЛИ</SectionTitle>
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <Label c={c}>СТАРТОВЫЙ БАНК (₽)</Label>
        <input type="number" value={bank} onChange={e => setBank(e.target.value)} style={inputStyle(c)} />
        <div style={{ marginTop: 12 }}>
          <Label c={c}>ЦЕЛЬ (₽)</Label>
          <input type="number" value={goal} onChange={e => setGoal(e.target.value)} style={inputStyle(c)} />
        </div>
        <button onClick={save} style={{ width: "100%", marginTop: 12, background: c.accent, color: "#000", border: "none", borderRadius: 8, padding: 12, fontWeight: 800, cursor: "pointer" }}>СОХРАНИТЬ</button>
      </div>

      <SectionTitle c={c}>ТЕМА</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[["green", "🟢 Зелёная"], ["blue", "🔵 Синяя"], ["light", "☀️ Светлая"]].map(([k, l]) => (
          <button key={k} onClick={() => setSettings(p => ({ ...p, theme: k }))} style={{
            background: settings.theme === k ? c.accent : c.card, color: settings.theme === k ? "#000" : c.text,
            border: `1px solid ${settings.theme === k ? c.accent : c.border}`, borderRadius: 10, padding: 12,
            fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>{l}</button>
        ))}
      </div>

      <SectionTitle c={c}>ОПАСНАЯ ЗОНА</SectionTitle>
      <button onClick={reset} style={{ width: "100%", background: c.red + "20", color: c.red, border: `1px solid ${c.red}`, borderRadius: 10, padding: 12, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
        🗑 УДАЛИТЬ ВСЕ СТАВКИ
      </button>

      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: 12, marginTop: 16 }}>
        <div style={{ fontSize: 11, color: c.muted, marginBottom: 6 }}>📊 ИНФОРМАЦИЯ</div>
        <div style={{ fontSize: 11, color: c.text, lineHeight: 1.5 }}>
          <b>КаперСтат v4</b> · Все данные хранятся в браузере. Не синхронизируется между устройствами.
        </div>
      </div>
    </div>
  );
}

// ============== HELPERS ==============
function Stat({ title, value, sub, color, c }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "12px 10px" }}>
      <div style={{ fontSize: 9, color: c.muted, letterSpacing: "0.1em", marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9, color: c.muted, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, color, c }) {
  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 8, color: c.muted, letterSpacing: "0.1em", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function BetRow({ bet, onEdit, onDelete, c }) {
  const profit = bet.result === "win" ? Math.round(bet.stake * bet.odds - bet.stake) : bet.result === "loss" ? -bet.stake : 0;
  const colorMap = { win: c.accent, loss: c.red, pending: c.yellow };
  const labelMap = { win: "✅", loss: "❌", pending: "⏳" };

  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderLeft: `3px solid ${colorMap[bet.result]}`, borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: c.muted }}>{bet.date}</span>
            {bet.league && <span style={{ fontSize: 9, background: c.cardLight, padding: "1px 5px", borderRadius: 3, color: c.accent }}>{bet.league}</span>}
            {bet.score && <span style={{ fontSize: 10, background: c.cardLight, padding: "1px 6px", borderRadius: 4 }}>{bet.score}</span>}
            <span style={{ fontSize: 11 }}>{labelMap[bet.result]}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{bet.match}</div>
          <div style={{ fontSize: 11, color: c.muted }}>{bet.bet}</div>
          {bet.tags && bet.tags.length > 0 && (
            <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
              {bet.tags.map(t => <span key={t} style={{ fontSize: 9, background: c.cardLight, padding: "1px 5px", borderRadius: 3, color: c.muted }}>#{t}</span>)}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 5, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: c.blue, fontWeight: 600 }}>КФ {bet.odds}</span>
            <span style={{ fontSize: 11, color: c.muted }}>{bet.stake.toLocaleString()} ₽</span>
            {bet.result !== "pending" && <span style={{ fontSize: 12, fontWeight: 800, color: profit >= 0 ? c.accent : c.red }}>{profit >= 0 ? "+" : ""}{profit.toLocaleString()} ₽</span>}
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {onEdit && <button onClick={onEdit} style={iconBtn(c)}>✏️</button>}
            {onDelete && <button onClick={onDelete} style={{ ...iconBtn(c), color: c.red }}>🗑</button>}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, c }) {
  return (
    <button onClick={onClick} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 12px", color: c.text, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}>
      <span style={{ fontSize: 22 }}>{icon}</span>{label}
    </button>
  );
}

function SectionTitle({ children, c }) {
  return <div style={{ fontSize: 11, color: c.muted, letterSpacing: "0.15em", marginBottom: 8, marginTop: 4, fontWeight: 700 }}>{children}</div>;
}

function DetailRow({ label, value, color, last, c }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: last ? "none" : `1px solid ${c.border}` }}>
      <span style={{ fontSize: 12, color: c.muted }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: color || c.text }}>{value}</span>
    </div>
  );
}

function ResultRow({ label, value, color, big, c }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
      <span style={{ fontSize: big ? 13 : 12, color: c.muted }}>{label}</span>
      <span style={{ fontSize: big ? 18 : 14, fontWeight: 800, color: color || c.text }}>{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", full, c }) {
  return (
    <div style={{ flex: 1, marginBottom: 8, width: full ? "100%" : "auto" }}>
      <Label c={c}>{label}</Label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle(c)} />
    </div>
  );
}

function Label({ children, c }) {
  return <div style={{ fontSize: 10, color: c.muted, letterSpacing: "0.1em", marginBottom: 4 }}>{children}</div>;
}

function Row({ children }) {
  return <div style={{ display: "flex", gap: 10 }}>{children}</div>;
}

function Empty({ msg, c }) {
  return <div style={{ textAlign: "center", padding: "40px 0", color: c.muted }}>{msg}</div>;
}

const inputStyle = (c) => ({ background: c.cardLight, border: `1px solid ${c.border}`, borderRadius: 7, padding: "10px 12px", color: c.text, fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit" });
const selectStyle = (c) => ({ ...inputStyle(c), cursor: "pointer" });
const iconBtn = (c) => ({ background: c.cardLight, border: `1px solid ${c.border}`, borderRadius: 5, padding: "4px 8px", fontSize: 11, cursor: "pointer", color: c.muted });
