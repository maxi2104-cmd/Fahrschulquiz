import { db, CONTACT, QUIZZES, QUESTIONS_PER_GAME, SECONDS_PER_QUESTION, MAX_POINTS_PER_QUESTION } from "./config.js";
import {
  doc, getDoc, collection, query, where, getDocs, writeBatch, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { mountLookup } from "./lookup.js";
import { mountRechner } from "./rechner.js";
import { freitagsStand, naechstesQuiz, startText } from "./freitag-wochen.js";
import { renderBanner, flyRank, shareResult } from "./freitag-extras.js";
import { recordGame } from "./abzeichen.js";

const QUIZ = document.body.dataset.quiz || "freitag";
const $ = (id) => document.getElementById(id);
const QZ = QUIZZES[QUIZ];
if (!QZ) {
  $("screen-start").innerHTML = '<h1 class="title">BALD<br>VERFÜGBAR.</h1><p class="lead">Dieses Quiz ist noch in Vorbereitung.</p>';
  throw new Error("Quiz noch ohne Fragen: " + QUIZ);
}
let QUESTIONS = QZ.questions;
let WEEK = null;   // aktives Wochen-Quiz (nur Freitags Frage)
let CFG = {};      // config-Dokument der Freitags Frage (für die Automatik)
const TIMED = QZ.timer !== false;
const PER_GAME = QZ.perGame || QUESTIONS_PER_GAME;
const show = (id) => ["screen-start", "screen-q", "screen-end"].forEach(s => $(s).hidden = s !== id);

let round = "start";
let player = { first: "", last: "" };
let idx = 0, points = 0, correctCount = 0, log = [];
let game = []; // Indizes der Fragen dieses Spiels
let practice = false;   // Freitags Frage: Wiederholung = Übungsrunde, zählt nicht fürs Ranking
const FIRST_ONLY = !!QZ.weekly;
const playedKey = () => "played_" + QUIZ + "_" + round;   // speichert die Ranking-ID des ersten Versuchs

// Fragenauswahl: Auf jedem Gerät kommen zuerst alle noch nicht gesehenen Fragen dran.
// Erst wenn der ganze Fragenpool durch ist, beginnt ein neuer Durchgang.
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pickQuestions() {
  if (QZ.weekly) return QUESTIONS.map((_, i) => i);   // Wochen-Quiz: immer dieselben 10 Fragen
  const n = Math.min(PER_GAME, QUESTIONS.length);
  const key = "seen_" + QUIZ + "_" + QUESTIONS.length;
  let seen = [];
  try { seen = JSON.parse(localStorage.getItem(key) || "[]").filter(i => i < QUESTIONS.length); } catch (e) { seen = []; }
  const seenSet = new Set(seen);
  const fresh = shuffle(QUESTIONS.map((_, i) => i).filter(i => !seenSet.has(i)));
  let picked;
  if (fresh.length >= n) {
    picked = fresh.slice(0, n);
    seen = seen.concat(picked);
  } else {
    // Rest des Durchgangs + Auffüllen mit Fragen, die am längsten her sind
    const fill = seen.slice(0, n - fresh.length);
    picked = shuffle(fresh.concat(fill));
    seen = picked.slice();          // neuer Durchgang beginnt
  }
  try { localStorage.setItem(key, JSON.stringify(seen)); } catch (e) {}
  return picked;
}
let timer = null, startedAt = 0, locked = false;

// ---------- Runde & Bestenliste ----------
async function loadRound() {
  try {
    const snap = await getDoc(doc(db, "config", QUIZZES[QUIZ].configDoc));
    CFG = snap.exists() ? snap.data() : {};
    if (CFG.round) round = CFG.round;
  } catch (e) { console.warn(e); }
  if (QZ.weekly) applyWeek();
}

// Freitags Frage: aktives Quiz und Ranking-Runde aus Datum bzw. Handsteuerung bestimmen.
// Gibt true zurück, wenn sich die Runde seit dem letzten Aufruf geändert hat.
function applyWeek() {
  const st = freitagsStand(CFG);
  const changed = st.round !== round || st.week !== WEEK;
  WEEK = st.week; round = st.round;
  showWeek();
  return changed;
}

// Wochen-Quiz auf der Startseite anzeigen
function showWeek() {
  const start = $("screen-start");
  let box = $("week-info");
  if (!box) {
    box = document.createElement("div"); box.id = "week-info"; box.className = "week-info";
    const lead = start.querySelector(".lead");
    lead.parentNode.insertBefore(box, lead);
  }
  if (WEEK) {
    QUESTIONS = WEEK.fragen;
    const d = new Date(WEEK.datum + "T12:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    box.innerHTML = `<span class="wk-tag">FREITAGS FRAGE #${String(WEEK.nr).padStart(2, "0")}</span><b>${WEEK.thema}</b><small>Quiz vom ${d} · Ranking läuft bis nächsten Freitag</small>`;
    $("btn-start").disabled = false;
  } else {
    const nx = CFG.mode === "manual" ? null : naechstesQuiz();   // im Handbetrieb gibt es keinen festen Termin
    box.innerHTML = nx
      ? `<span class="wk-tag">FREITAGS FRAGE</span><b>Das nächste Quiz startet am ${startText(nx)}.</b><small>Schau dann wieder vorbei!</small>`
      : `<span class="wk-tag">FREITAGS FRAGE</span><b>Das nächste Quiz startet am Freitag.</b><small>Schau dann wieder vorbei!</small>`;
    $("btn-start").disabled = true;
  }
}

async function loadBoard(targetId, highlightId) {
  const el = $(targetId);
  try {
    const q = query(collection(db, "leaderboard"), where("round", "==", round), where("quiz", "==", QUIZ));
    const all = (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => b.points - a.points);
    const rows = all.slice(0, 10);
    const meIdx = highlightId ? all.findIndex(r => r.id === highlightId) : -1;
    if (meIdx >= 10) rows.push(all[meIdx]);   // eigener Platz auch außerhalb der Top 10
    el.innerHTML = "";
    if (!rows.length) { el.innerHTML = '<li class="empty">Noch keine Einträge – sei der/die Erste!</li>'; return all; }
    rows.forEach((r) => {
      const i = all.indexOf(r);
      const li = document.createElement("li");
      if (r.id === highlightId) li.className = "me";
      const a = document.createElement("span"); a.className = "rank"; a.textContent = (i + 1) + ".";
      const b = document.createElement("span"); b.className = "nm"; b.textContent = r.name;
      const c = document.createElement("span"); c.className = "pt"; c.textContent = r.points.toLocaleString("de-DE");
      li.append(a, b, c); el.appendChild(li);
    });
    return all;
  } catch (e) {
    console.warn(e);
    el.innerHTML = '<li class="empty">Bestenliste gerade nicht erreichbar.</li>';
    return null;
  }
}

// Startseite: Bestenliste + Ranking-Banner (Freitags Frage)
let bannerData = null;
async function refreshStart() {
  const myId = FIRST_ONLY ? localStorage.getItem(playedKey()) : null;
  const all = await loadBoard("board", myId && myId !== "1" ? myId : null);
  if (!QZ.weekly) return;
  let box = $("rank-banner");
  if (!box) {
    box = document.createElement("div"); box.id = "rank-banner"; box.className = "rank-banner";
    $("week-info").after(box);
  }
  bannerData = { week: WEEK, rows: all || [], myId, auto: CFG.mode !== "manual" };
  renderBanner(box, bannerData);
  // Freitags-Erinnerung (Push) – einmalig unter dem Banner
  if (!$("push-card")) {
    const pc = document.createElement("div"); pc.id = "push-card"; pc.hidden = true; box.after(pc);
    import("./push.js").then(m => m.mountPushCard(pc)).catch(e => console.warn(e));
  }
  // Hinweis, wenn auf diesem Gerät schon gespielt wurde
  let hint = $("first-hint");
  if (!hint) { hint = document.createElement("p"); hint.id = "first-hint"; hint.className = "hint first-hint"; $("btn-start").after(hint); }
  const played = WEEK && localStorage.getItem(playedKey());
  hint.hidden = !played;
  hint.innerHTML = "Du hast diese Woche schon gespielt. <b>Nur dein erster Versuch zählt</b> – weitere Runden sind Übung.";
  $("btn-start").textContent = played ? "ÜBUNGSRUNDE STARTEN" : "QUIZ STARTEN";
}

// ---------- Start ----------
$("btn-start").addEventListener("click", () => {
  const first = $("first").value.trim(), last = $("last").value.trim();
  const err = $("start-err");
  if (!first || !last) { err.textContent = "Bitte Vor- und Nachnamen eingeben."; err.hidden = false; return; }
  // Seite stand über Freitag 06:00 Uhr offen? Dann erst das neue Quiz anzeigen.
  if (QZ.weekly && applyWeek()) {
    refreshStart();
    err.textContent = "Inzwischen ist ein neues Quiz online – schau kurz drüber und starte dann.";
    err.hidden = false;
    return;
  }
  if (!QZ.repeat && localStorage.getItem("played_" + QUIZ + "_" + round)) {
    err.textContent = `Du hast „${QZ.label}“ in dieser Runde auf diesem Gerät schon gespielt.`; err.hidden = false; return;
  }
  err.hidden = true;
  practice = FIRST_ONLY && !!localStorage.getItem(playedKey());
  player = { first, last };
  idx = 0; points = 0; correctCount = 0; log = [];
  game = pickQuestions();
  $("q-total").textContent = game.length;
  show("screen-q");
  renderQuestion();
});

// ---------- Fragen ----------
function renderQuestion() {
  const q = QUESTIONS[game[idx]];
  locked = false;
  $("q-num").textContent = idx + 1;
  $("q-points").textContent = points.toLocaleString("de-DE");
  $("q-progress").style.width = (idx / game.length * 100) + "%";
  $("q-title").textContent = q.title;
  $("q-text").textContent = q.text;
  // optionales Bild zur Frage (SVG, direkt in den Fragen hinterlegt)
  let pic = document.getElementById("q-pic");
  if (!pic) { pic = document.createElement("div"); pic.id = "q-pic"; pic.className = "q-pic"; $("q-text").before(pic); }
  pic.innerHTML = q.img ? `<img src="${q.img}" alt="Bild zur Frage">` : (q.svg || "");
  pic.hidden = !(q.svg || q.img);
  $("q-explain").hidden = true;
  const box = $("q-answers"); box.innerHTML = "";
  q.answers.forEach((txt, i) => {
    const b = document.createElement("button");
    b.className = "ans";
    const l = document.createElement("span"); l.className = "l"; l.textContent = "ABCDE"[i];
    const t = document.createElement("span"); t.textContent = txt;
    b.append(l, t);
    b.addEventListener("click", () => answer(i));
    box.appendChild(b);
  });
  if (TIMED) startTimer();
  else { startedAt = performance.now(); const t = document.querySelector(".timer"); if (t) t.style.display = "none"; }
  if ($("btn-next")) $("btn-next").hidden = true;
}

function startTimer() {
  clearInterval(timer);
  startedAt = performance.now();
  const fill = $("t-fill"), sec = $("t-sec");
  fill.classList.remove("low");
  timer = setInterval(() => {
    const left = Math.max(0, SECONDS_PER_QUESTION - (performance.now() - startedAt) / 1000);
    fill.style.width = (left / SECONDS_PER_QUESTION * 100) + "%";
    fill.classList.toggle("low", left <= 5);
    sec.textContent = Math.ceil(left) + "s";
    if (left <= 0) answer(-1);
  }, 100);
}

function answer(choice) {
  if (locked) return;
  locked = true;
  clearInterval(timer);
  const q = QUESTIONS[game[idx]];
  const secs = (performance.now() - startedAt) / 1000;
  const used = TIMED ? Math.min(SECONDS_PER_QUESTION, secs) : Math.min(secs, 3600);
  const ok = choice === q.correct;
  confetti(ok);
  let gained = 0;
  if (ok) {
    gained = TIMED
      ? Math.round(MAX_POINTS_PER_QUESTION * (0.5 + 0.5 * (1 - used / SECONDS_PER_QUESTION)))
      : (QZ.pointsPerCorrect || MAX_POINTS_PER_QUESTION);
    points += gained; correctCount++;
  }
  log.push({ q: game[idx] + 1, chosen: choice, correct: ok, seconds: Math.round(used * 10) / 10, points: gained });

  const btns = [...$("q-answers").children];
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("ok");
    else if (i === choice) b.classList.add("bad");
  });
  $("q-points").textContent = points.toLocaleString("de-DE");
  if (q.explain) { $("q-explain").textContent = (choice === -1 ? "Zeit abgelaufen. " : "") + q.explain; $("q-explain").hidden = false; }

  const next = () => { idx++; if (!TIMED) window.scrollTo(0, 0); if (idx < game.length) renderQuestion(); else finish(); };
  if (!TIMED && $("btn-next")) {
    $("btn-next").textContent = idx + 1 < game.length ? "WEITER" : "ERGEBNIS ANZEIGEN";
    $("btn-next").hidden = false;
    $("btn-next").onclick = next;
    return;
  }
  setTimeout(next, q.explain ? 2600 : 1300);
}

// ---------- Ende ----------
async function finish() {
  show("screen-end");
  $("end-name").textContent = player.first.toUpperCase();
  $("end-points").textContent = points.toLocaleString("de-DE");
  $("end-correct").textContent = `${correctCount} von ${game.length} Fragen richtig.`;
  $("end-status").textContent = "Ergebnis wird gespeichert …";
  renderContact();
  renderReview();
  if (!QZ.repeat) localStorage.setItem("played_" + QUIZ + "_" + round, "1");
  renderShare();

  if (practice) {
    // Übungsrunde: nichts speichern, aber zeigen, wo man damit stünde
    const all = await loadBoard("board2", localStorage.getItem(playedKey()));
    const would = all ? all.filter(r => r.points > points).length + 1 : null;
    $("end-status").innerHTML = "<b>Übungsrunde</b> – nur dein erster Versuch zählt fürs Ranking." +
      (would ? ` Mit diesem Ergebnis wärst du auf Platz ${would}.` : "");
    recordGame({ quiz: QUIZ, round, points, correct: correctCount, total: game.length });
    return;
  }

  let lbId = null, saved = false;
  try {
    const batch = writeBatch(db);
    const resRef = doc(collection(db, "results"));
    const lbRef = doc(collection(db, "leaderboard"));
    lbId = lbRef.id;
    batch.set(resRef, {
      quiz: QUIZ, round, first: player.first, last: player.last,
      points, correct: correctCount, total: game.length,
      answers: log, lbId, createdAt: serverTimestamp()
    });
    batch.set(lbRef, {
      quiz: QUIZ, round, name: `${player.first} ${player.last.charAt(0).toUpperCase()}.`,
      points, createdAt: serverTimestamp()
    });
    await batch.commit();
    saved = true;
    if (FIRST_ONLY) localStorage.setItem(playedKey(), lbId);
    $("end-status").textContent = "Dein Ergebnis wurde gespeichert.";
  } catch (e) {
    console.warn(e);
    $("end-status").textContent = "Speichern hat nicht geklappt. Bitte gib der Fahrschule kurz Bescheid.";
  }
  const all = await loadBoard("board2", lbId);
  if (QZ.weekly && saved && all) {
    const rank = all.findIndex(r => r.id === lbId) + 1;
    if (rank > 0) {
      lastRank = { rank, count: all.length };
      $("end-status").innerHTML = `Dein Ergebnis wurde gespeichert – du bist auf <b>Platz ${rank}</b> von ${all.length}.`;
      flyRank(rank, all.length, document.querySelector("#board2 li.me"));
    }
  }
  // Abzeichen erst nach der Platzierungs-Animation einblenden
  setTimeout(() => recordGame({ quiz: QUIZ, round, points, correct: correctCount, total: game.length, rank: lastRank && lastRank.rank }), lastRank ? 3200 : 600);
}

// Teilen-Button (nur Freitags Frage)
let lastRank = null;
function renderShare() {
  const old = $("share-btn"); if (old) old.remove();
  if (!QZ.weekly) return;
  lastRank = null;
  const b = el("button", "btn share-btn", "📲  ERGEBNIS TEILEN"); b.id = "share-btn"; b.type = "button";
  b.addEventListener("click", () => shareResult({
    week: WEEK, points, correct: correctCount, total: game.length,
    rank: lastRank && lastRank.rank, count: lastRank && lastRank.count, practice
  }, b));
  const res = document.querySelector("#screen-end .result");
  res.after(b);
}

// ---------- Logo-Konfetti: grün bei richtig, rot bei falsch ----------
function confetti(ok) {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  const box = document.createElement("div");
  box.className = "confetti";
  const count = ok ? 204 : 156;
  const img = ok ? "url(logo-emblem-green.svg)" : "url(logo-emblem-red.svg)";
  const rnd = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < count; i++) {
    const p = document.createElement("i");
    p.style.cssText =
      `--x:${rnd(-2, 98)}vw;--s:${rnd(22, 42)}px;--d:${rnd(3, 4.4)}s;--delay:${rnd(0, .7)}s;` +
      `--sw:${rnd(12, 34)}px;--sd:${rnd(.9, 1.6)}s;` +
      `--r:${Math.random() < .5 ? -360 : 360}deg;--rd:${rnd(2.2, 4.5)}s`;
    const b = document.createElement("b");
    b.style.backgroundImage = img;
    p.appendChild(b);
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5600);
}

// ---------- Kontakt: "Frag den Fahrlehrer" ----------
function renderContact() {
  const old = $("contact"); if (old) old.remove();
  if (QZ.contact === false || !CONTACT || (!CONTACT.whatsapp && !CONTACT.email)) return;
  const box = el("div", "contact"); box.id = "contact";
  const text = `Hallo! Ich habe gerade das Quiz „${QZ.label}“ gespielt (${points.toLocaleString("de-DE")} Punkte, ${correctCount} von ${game.length} richtig) und habe eine Frage: `;
  if (CONTACT.whatsapp) {
    const wa = el("a", "btn wa-btn");
    wa.href = "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(text);
    wa.target = "_blank"; wa.rel = "noopener";
    wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3Z"/></svg><span>FRAG DEN FAHRLEHRER</span>';
    box.appendChild(wa);
  }
  if (CONTACT.email) {
    const m = el("a", "btn ghost mail-btn");
    m.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Frage zum Quiz „" + QZ.label + "“") + "&body=" + encodeURIComponent(text);
    m.textContent = "PER E-MAIL SCHREIBEN";
    box.appendChild(m);
  }
  const res = document.querySelector("#screen-end .result");
  res.parentNode.insertBefore(box, res.nextSibling);
}

// ---------- Auswertung: falsch beantwortete Fragen ----------
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function renderReview() {
  const old = $("review"); if (old) old.remove();
  const wrong = log.filter(a => !a.correct);
  const box = el("section", "review"); box.id = "review";
  box.appendChild(el("h2", "lbl lb-title", wrong.length ? `DEINE FEHLER (${wrong.length})` : "DEINE FEHLER"));
  if (!wrong.length) {
    box.appendChild(el("p", "rv-none", "Alles richtig – keine Fehler! Stark."));
  } else {
    box.appendChild(el("p", "hint", "Hier siehst du jede falsch beantwortete Frage mit der richtigen Antwort und der Erklärung."));
    wrong.forEach((a, n) => {
      const q = QUESTIONS[a.q - 1];
      const card = el("article", "rv-card");
      const top = el("div", "rv-top");
      top.append(el("span", "rv-no", String(n + 1)), el("span", "rv-title", q.title));
      const body = el("div", "rv-body");
      if (q.svg || q.img) { const pv = el("div", "q-pic rv-pic"); pv.innerHTML = q.img ? `<img src="${q.img}" alt="Bild zur Frage">` : q.svg; body.appendChild(pv); }
      body.appendChild(el("p", "rv-q", q.text));
      const mine = el("div", "rv-ans rv-bad");
      mine.append(el("span", "rv-tag", "DEINE ANTWORT"),
        el("span", "", a.chosen === -1 ? "Keine Antwort (Zeit abgelaufen)" : "ABCDE"[a.chosen] + " · " + q.answers[a.chosen]));
      const right = el("div", "rv-ans rv-ok");
      right.append(el("span", "rv-tag", "RICHTIG"), el("span", "", "ABCDE"[q.correct] + " · " + q.answers[q.correct]));
      body.append(mine, right);
      const text = q.detail || q.explain;
      if (text) {
        const ex = el("div", "rv-explain");
        ex.append(el("span", "rv-tag", "ERKLÄRUNG"), el("p", "", text));
        body.appendChild(ex);
      }
      card.append(top, body);
      box.appendChild(card);
    });
  }
  const anchor = document.querySelector("#screen-end .lk-btn") || document.querySelector("#screen-end .lb-title");
  anchor.parentNode.insertBefore(box, anchor);
}

// ---------- Nachschlagen (nur auf Start- und Ergebnisseite, nicht während der Fragen) ----------
mountLookup([{ name: QZ.label, questions: QUESTIONS }], [
  { el: $("screen-start"), before: document.querySelector("#screen-start .lb-title") },
  { el: $("screen-end"), before: document.querySelector("#screen-end .lb-title") }
]);

// ---------- Rechner (nur im Anhänger Quiz) ----------
if (QUIZ === "technik") mountRechner([
  { el: $("screen-start"), before: document.querySelector("#screen-start .lb-title") },
  { el: $("screen-end"), before: document.querySelector("#screen-end .lb-title") }
]);

// ---------- Init ----------
(async () => {
  await loadRound();
  await refreshStart();
  // Freitags Frage: Startseite jede Minute prüfen, damit der Wechsel um 06:00 Uhr auch bei offener Seite ankommt
  if (QZ.weekly) setInterval(() => {
    if ($("screen-start").hidden) return;
    if (applyWeek()) refreshStart();                                      // neues Quiz ist online
    else if (bannerData && $("rank-banner")) renderBanner($("rank-banner"), bannerData);   // nur Countdown
  }, 60000);
})();
