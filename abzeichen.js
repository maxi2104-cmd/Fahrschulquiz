// ===== Abzeichen & Serien – werden nur auf diesem Gerät gespeichert (localStorage), ohne Konto =====
const KEY = "ot_abzeichen_v1";

function laden() {
  try { return { games: [], weeks: [], signs: [], events: {}, earned: {}, top3: false, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch (e) { return { games: [], weeks: [], signs: [], events: {}, earned: {}, top3: false }; }
}
function speichern(st) { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

// längste Serie aufeinanderfolgender Freitags-Quizze (nach Quiz-Nummer)
function serie(weeks) {
  const s = [...new Set(weeks)].sort((a, b) => a - b); let best = 0, cur = 0, prev = null;
  for (const n of s) { cur = prev !== null && n === prev + 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = n; }
  return best;
}
const summe = (st) => st.games.reduce((s, g) => s + (g.points || 0), 0);
const gespielt = (st, quiz) => st.games.some(g => g.quiz === quiz);

// [aktueller Stand, Ziel] – erreicht, wenn Stand >= Ziel
export const ABZEICHEN = [
  { id: "start", icon: "🎯", name: "Erste Runde", desc: "Spiel dein erstes Quiz.", p: (st) => [st.games.length, 1] },
  { id: "freitag", icon: "🚦", name: "Freitags-Fan", desc: "Mach bei einer Freitags Frage mit.", p: (st) => [st.weeks.length ? 1 : 0, 1] },
  { id: "serie3", icon: "🔥", name: "Dranbleiber", desc: "3 Freitags Fragen in Folge.", p: (st) => [serie(st.weeks), 3] },
  { id: "serie5", icon: "🔥", name: "Serientäter", desc: "5 Freitags Fragen in Folge.", p: (st) => [serie(st.weeks), 5] },
  { id: "serie10", icon: "🏅", name: "Unaufhaltsam", desc: "10 Freitags Fragen in Folge.", p: (st) => [serie(st.weeks), 10] },
  { id: "perfekt", icon: "💯", name: "Alles richtig", desc: "Beantworte in einem Quiz alle Fragen richtig.", p: (st) => [st.games.some(g => g.total >= 10 && g.correct === g.total) ? 1 : 0, 1] },
  { id: "blitz", icon: "⚡", name: "Blitzmerker", desc: "Hol mindestens 900 Punkte in einer Freitags Frage.", p: (st) => [st.games.some(g => g.quiz === "freitag" && g.points >= 900) ? 1 : 0, 1] },
  { id: "podium", icon: "🥇", name: "Podium", desc: "Lande im Wochen-Ranking unter den Top 3.", p: (st) => [st.top3 ? 1 : 0, 1] },
  { id: "punkte", icon: "💰", name: "Punktesammler", desc: "Sammle insgesamt 5.000 Punkte.", p: (st) => [summe(st), 5000] },
  { id: "alle30", icon: "🏆", name: "Komplett", desc: "Spiel alle 30 Freitags Fragen.", p: (st) => [new Set(st.weeks).size, 30] },
  { id: "technik", icon: "🔧", name: "Technik-Profi", desc: "Spiel das Technikquiz B und das Anhänger Quiz.", p: (st) => [(gespielt(st, "technikb") ? 1 : 0) + (gespielt(st, "technik") ? 1 : 0), 2] },
  { id: "schild50", icon: "🪧", name: "Schilderkenner", desc: "Sieh dir 50 verschiedene Verkehrszeichen an.", p: (st) => [st.signs.length, 50] },
  { id: "schild200", icon: "🧭", name: "Schilder-Profi", desc: "Sieh dir 200 verschiedene Verkehrszeichen an.", p: (st) => [st.signs.length, 200] },
  { id: "rechner", icon: "🧮", name: "Rechenkünstler", desc: "Probier den Anhalteweg-Rechner aus.", p: (st) => [st.events.rechner ? 1 : 0, 1] },
  { id: "abfahrt", icon: "✅", name: "Startklar", desc: "Geh die Abfahrtkontrolle einmal komplett durch.", p: (st) => [st.events.abfahrt ? 1 : 0, 1] }
];

// neu erreichte Abzeichen eintragen und anzeigen
function pruefen(st) {
  const neu = ABZEICHEN.filter(a => !st.earned[a.id] && (([c, z]) => c >= z)(a.p(st)));
  neu.forEach(a => { st.earned[a.id] = new Date().toISOString(); });
  speichern(st);
  if (neu.length) zeigen(neu);
  return neu;
}

export function recordGame({ quiz, round, points, correct, total, rank }) {
  const st = laden();
  st.games.push({ quiz, round, points, correct, total, d: Date.now() });
  if (st.games.length > 300) st.games = st.games.slice(-300);
  const m = quiz === "freitag" && /^Q(\d+)-/.exec(round || "");
  if (m && !st.weeks.includes(+m[1])) st.weeks.push(+m[1]);
  if (quiz === "freitag" && rank && rank <= 3) st.top3 = true;
  return pruefen(st);
}

export function recordSign(id) {
  const st = laden();
  if (!st.signs.includes(id)) { st.signs.push(id); return pruefen(st); }
  return [];
}

export function badgeEvent(name) {
  const st = laden();
  if (!st.events[name]) { st.events[name] = true; return pruefen(st); }
  return [];
}

export function stand() {
  const st = laden();
  return ABZEICHEN.map(a => { const [c, z] = a.p(st); return { ...a, cur: Math.min(c, z), goal: z, earned: st.earned[a.id] || null }; });
}

// kleine Einblendung „Neues Abzeichen“
function zeigen(liste) {
  liste.forEach((a, i) => setTimeout(() => {
    const el = document.createElement("a");
    el.className = "badge-toast"; el.href = "abzeichen.html";
    el.innerHTML = `<span class="bt-i">${a.icon}</span><span><small>NEUES ABZEICHEN</small><b>${a.name}</b></span>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("on"));
    setTimeout(() => { el.classList.remove("on"); setTimeout(() => el.remove(), 400); }, 3800);
  }, i * 4200));
}
