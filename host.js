import { app, db, QUIZZES } from "./config.js";
import { WOCHEN } from "./freitag-wochen.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, onSnapshot, doc, setDoc, getDoc, deleteDoc }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = getAuth(app);
const $ = (id) => document.getElementById(id);
let all = [], unsub = null;
let quiz = "freitag";
const currentRounds = {};            // aktive Runde je Quiz
const selectedRounds = {};           // gewählte Runde je Quiz
const quizOf = (r) => r.quiz || "freitag";

// ---------- Login ----------
$("btn-login").addEventListener("click", async () => {
  $("login-err").hidden = true;
  try {
    await signInWithEmailAndPassword(auth, $("email").value.trim(), $("pw").value);
  } catch (e) {
    $("login-err").textContent = "Anmeldung fehlgeschlagen. E-Mail oder Passwort prüfen.";
    $("login-err").hidden = false;
  }
});
$("pw").addEventListener("keydown", e => { if (e.key === "Enter") $("btn-login").click(); });
$("btn-logout").addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  $("login").hidden = !!user;
  $("dash").hidden = !user;
  if (unsub) { unsub(); unsub = null; }
  if (!user) return;
  for (const [id, qz] of Object.entries(QUIZZES)) {
    currentRounds[id] = "start";
    try {
      const c = await getDoc(doc(db, "config", qz.configDoc));
      if (c.exists() && c.data().round) currentRounds[id] = c.data().round;
    } catch (e) { console.warn(e); }
    selectedRounds[id] = currentRounds[id];
  }
  unsub = onSnapshot(collection(db, "results"), (snap) => {
    all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    render();
  }, (err) => {
    $("rows").innerHTML = '<tr><td colspan="7">Keine Berechtigung. Ist dieses Konto als Host in den Regeln eingetragen?</td></tr>';
    console.warn(err);
  });
});

// ---------- Anzeige ----------
function render() {
  const qs = $("quiz-select");
  if (!qs.options.length) {
    Object.entries(QUIZZES).forEach(([id, qz]) => {
      const o = document.createElement("option"); o.value = id; o.textContent = qz.label; qs.appendChild(o);
    });
  }
  qs.value = quiz;
  const currentRound = currentRounds[quiz];
  const selected = selectedRounds[quiz];
  const wk = quiz === "freitag" && /^Q(\d+)-/.exec(selected || "");
  const QUESTIONS = wk ? ((WOCHEN.find(w => w.nr === +wk[1]) || { fragen: [] }).fragen) : QUIZZES[quiz].questions;
  const mine = all.filter(r => quizOf(r) === quiz);
  const rounds = [...new Set([currentRound, ...mine.map(r => r.round)])].sort().reverse();
  const sel = $("round-select");
  sel.innerHTML = "";
  rounds.forEach(r => {
    const o = document.createElement("option");
    o.value = r; o.textContent = r + (r === currentRound ? " (aktiv)" : "");
    sel.appendChild(o);
  });
  sel.value = selected;
  $("current-info").textContent = `Aktive Runde: ${currentRound}. Neue Ergebnisse erscheinen live.`;

  const rows = mine.filter(r => r.round === selected).sort((a, b) => b.points - a.points);
  $("s-count").textContent = rows.length;
  $("s-avg").textContent = rows.length ? Math.round(rows.reduce((s, r) => s + r.points, 0) / rows.length) : 0;
  $("s-best").textContent = rows[0] ? rows[0].points : "–";

  const wrongCount = {};
  rows.forEach(r => (r.answers || []).forEach(a => { if (!a.correct) wrongCount[a.q] = (wrongCount[a.q] || 0) + 1; }));
  const hardest = Object.entries(wrongCount).sort((a, b) => b[1] - a[1])[0];
  $("s-hard").textContent = hardest ? "Nr. " + hardest[0] : "–";
  $("s-hard").title = hardest && QUESTIONS[hardest[0] - 1] ? QUESTIONS[hardest[0] - 1].text : "";

  const tb = $("rows"); tb.innerHTML = "";
  if (!rows.length) { tb.innerHTML = '<tr><td colspan="7">Noch keine Ergebnisse in dieser Runde.</td></tr>'; return; }
  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    const wrong = (r.answers || []).filter(a => !a.correct).map(a => a.q).join(", ") || "–";
    const when = r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "";
    [i + 1, `${r.first} ${r.last}`, r.points, `${r.correct}/${r.total}`, wrong, when].forEach((v, k) => {
      const td = document.createElement("td"); td.textContent = v;
      if (k === 4 && wrong !== "–") td.className = "wrong";
      tr.appendChild(td);
    });
    const td = document.createElement("td");
    const del = document.createElement("button");
    del.className = "btn ghost"; del.style.cssText = "min-height:36px;width:auto;padding:0 12px;font-size:12px;letter-spacing:.08em";
    del.textContent = "LÖSCHEN";
    del.addEventListener("click", () => removeResult(r));
    td.appendChild(del); tr.appendChild(td);
    tb.appendChild(tr);
  });
}

$("round-select").addEventListener("change", e => { selectedRounds[quiz] = e.target.value; render(); });
$("quiz-select").addEventListener("change", e => { quiz = e.target.value; render(); });

// ---------- Aktionen ----------
async function removeResult(r) {
  if (!confirm(`Ergebnis von ${r.first} ${r.last} löschen?`)) return;
  try {
    await deleteDoc(doc(db, "results", r.id));
    if (r.lbId) await deleteDoc(doc(db, "leaderboard", r.lbId));
  } catch (e) { alert("Löschen fehlgeschlagen."); console.warn(e); }
}

$("btn-new").addEventListener("click", async () => {
  const d = new Date();
  let id = d.toISOString().slice(0, 10);
  const currentRound = currentRounds[quiz];
  if (all.some(r => quizOf(r) === quiz && r.round === id) || id === currentRound) id += "-" + d.toTimeString().slice(0, 5).replace(":", "");
  if (!confirm(`${QUIZZES[quiz].label}: Neue Runde „${id}“ starten? Die Bestenliste für die Schüler startet dann wieder leer. Alte Ergebnisse bleiben hier sichtbar.`)) return;
  try {
    await setDoc(doc(db, "config", QUIZZES[quiz].configDoc), { round: id }, { merge: true });
    currentRounds[quiz] = id; selectedRounds[quiz] = id; render();
  } catch (e) { alert("Konnte keine neue Runde starten."); console.warn(e); }
});

$("btn-csv").addEventListener("click", () => {
  const selected = selectedRounds[quiz];
  const rows = all.filter(r => quizOf(r) === quiz && r.round === selected).sort((a, b) => b.points - a.points);
  const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Platz", "Vorname", "Nachname", "Punkte", "Richtig", "Falsch bei Frage", "Datum"];
  const lines = [head.map(esc).join(";")];
  rows.forEach((r, i) => {
    const wrong = (r.answers || []).filter(a => !a.correct).map(a => a.q).join(", ");
    const when = r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString("de-DE") : "";
    lines.push([i + 1, r.first, r.last, r.points, `${r.correct}/${r.total}`, wrong, when].map(esc).join(";"));
  });
  const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${quiz}-ergebnisse-${selected}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
});
