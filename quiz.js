import { db, QUIZZES, QUESTIONS_PER_GAME, SECONDS_PER_QUESTION, MAX_POINTS_PER_QUESTION } from "./config.js";
import {
  doc, getDoc, collection, query, where, getDocs, writeBatch, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const QUIZ = document.body.dataset.quiz || "freitag";
const $ = (id) => document.getElementById(id);
const QZ = QUIZZES[QUIZ];
if (!QZ) {
  $("screen-start").innerHTML = '<h1 class="title">BALD<br>VERFÜGBAR.</h1><p class="lead">Dieses Quiz ist noch in Vorbereitung.</p>';
  throw new Error("Quiz noch ohne Fragen: " + QUIZ);
}
const QUESTIONS = QZ.questions;
const TIMED = QZ.timer !== false;
const PER_GAME = QZ.perGame || QUESTIONS_PER_GAME;
const show = (id) => ["screen-start", "screen-q", "screen-end"].forEach(s => $(s).hidden = s !== id);

let round = "start";
let player = { first: "", last: "" };
let idx = 0, points = 0, correctCount = 0, log = [];
let game = []; // Indizes der Fragen dieses Spiels

function pickQuestions() {
  const ids = QUESTIONS.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  return ids.slice(0, Math.min(PER_GAME, ids.length));
}
let timer = null, startedAt = 0, locked = false;

// ---------- Runde & Bestenliste ----------
async function loadRound() {
  try {
    const snap = await getDoc(doc(db, "config", QUIZZES[QUIZ].configDoc));
    if (snap.exists() && snap.data().round) round = snap.data().round;
  } catch (e) { console.warn(e); }
}

async function loadBoard(targetId, highlightId) {
  const el = $(targetId);
  try {
    const q = query(collection(db, "leaderboard"), where("round", "==", round), where("quiz", "==", QUIZ));
    const rows = (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => b.points - a.points).slice(0, 10);
    el.innerHTML = "";
    if (!rows.length) { el.innerHTML = '<li class="empty">Noch keine Einträge – sei der/die Erste!</li>'; return; }
    rows.forEach((r, i) => {
      const li = document.createElement("li");
      if (r.id === highlightId) li.className = "me";
      const a = document.createElement("span"); a.className = "rank"; a.textContent = (i + 1) + ".";
      const b = document.createElement("span"); b.className = "nm"; b.textContent = r.name;
      const c = document.createElement("span"); c.className = "pt"; c.textContent = r.points.toLocaleString("de-DE");
      li.append(a, b, c); el.appendChild(li);
    });
  } catch (e) {
    console.warn(e);
    el.innerHTML = '<li class="empty">Bestenliste gerade nicht erreichbar.</li>';
  }
}

// ---------- Start ----------
$("btn-start").addEventListener("click", () => {
  const first = $("first").value.trim(), last = $("last").value.trim();
  const err = $("start-err");
  if (!first || !last) { err.textContent = "Bitte Vor- und Nachnamen eingeben."; err.hidden = false; return; }
  if (localStorage.getItem("played_" + QUIZ + "_" + round)) {
    err.textContent = `Du hast „${QZ.label}“ in dieser Runde auf diesem Gerät schon gespielt.`; err.hidden = false; return;
  }
  err.hidden = true;
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
  $("q-explain").hidden = true;
  const box = $("q-answers"); box.innerHTML = "";
  q.answers.forEach((txt, i) => {
    const b = document.createElement("button");
    b.className = "ans";
    const l = document.createElement("span"); l.className = "l"; l.textContent = "ABCD"[i];
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
  localStorage.setItem("played_" + QUIZ + "_" + round, "1");

  let lbId = null;
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
    $("end-status").textContent = "Dein Ergebnis wurde gespeichert.";
  } catch (e) {
    console.warn(e);
    $("end-status").textContent = "Speichern hat nicht geklappt. Bitte gib der Fahrschule kurz Bescheid.";
  }
  loadBoard("board2", lbId);
}

// ---------- Init ----------
(async () => {
  await loadRound();
  loadBoard("board");
})();
