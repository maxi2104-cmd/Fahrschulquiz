import { app, db, QUIZZES } from "./config.js";
import { WOCHEN, freitagsStand } from "./freitag-wochen.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, onSnapshot, doc, setDoc, getDoc, getDocs, deleteDoc, query, orderBy, limit }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = getAuth(app);
const $ = (id) => document.getElementById(id);
let all = [], unsub = null, unsubPush = null;
let quiz = "freitag";
const currentRounds = {};            // aktive Runde je Quiz
const selectedRounds = {};           // gewählte Runde je Quiz
const quizOf = (r) => r.quiz || "freitag";
let freitagCfg = {};                 // config/current (für Automatik der Freitags Frage)

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
  if (unsubPush) { unsubPush(); unsubPush = null; }
  if (!user) return;
  loadStats();
  unsubPush = onSnapshot(query(collection(db, "pushsent"), orderBy("sentAt", "desc"), limit(20)),
    (snap) => renderPushLog(snap.docs.map(d => d.data())),
    (err) => { $("p-rows").innerHTML = '<tr><td colspan="5">Keine Berechtigung für „pushsent“ (Firestore-Regeln).</td></tr>'; console.warn(err); });
  for (const [id, qz] of Object.entries(QUIZZES)) {
    currentRounds[id] = "start";
    try {
      const c = await getDoc(doc(db, "config", qz.configDoc));
      if (c.exists() && c.data().round) currentRounds[id] = c.data().round;
      if (qz.weekly && c.exists()) freitagCfg = c.data();
    } catch (e) { console.warn(e); }
    if (qz.weekly) currentRounds[id] = freitagsStand(freitagCfg).round;   // bei Automatik nach Datum
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
  const auto = QUIZZES[quiz].weekly && freitagsStand(freitagCfg).mode === "auto";
  $("current-info").textContent = `Aktive Runde: ${currentRound}${auto ? " (Automatik)" : ""}. Neue Ergebnisse erscheinen live.`;

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
  const weekly = QUIZZES[quiz].weekly;
  const st = weekly ? freitagsStand(freitagCfg) : null;
  let id = d.toISOString().slice(0, 10);
  if (st && st.week) id = `Q${String(st.week.nr).padStart(2, "0")}-${id}`;   // Freitags Frage: Format Q<Nr>-<Datum>
  const currentRound = currentRounds[quiz];
  if (all.some(r => quizOf(r) === quiz && r.round === id) || id === currentRound) id += "-" + d.toTimeString().slice(0, 5).replace(":", "");
  const autoHint = st && st.mode === "auto" ? "\n\nDie Automatik der Freitags Frage wird dafür ausgeschaltet. Wieder einschalten kannst du sie in der Freitags-Steuerung." : "";
  if (!confirm(`${QUIZZES[quiz].label}: Neue Runde „${id}“ starten? Die Bestenliste für die Schüler startet dann wieder leer. Alte Ergebnisse bleiben hier sichtbar.${autoHint}`)) return;
  try {
    // Freitags Frage: Handbetrieb mit dem gerade aktiven Quiz, sonst würde die Automatik die Runde überschreiben
    const data = weekly ? { round: id, mode: "manual", ...(st.week ? { set: st.week.nr } : {}) } : { round: id };
    await setDoc(doc(db, "config", QUIZZES[quiz].configDoc), data, { merge: true });
    if (weekly) freitagCfg = { ...freitagCfg, ...data };
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

// ---------- App-Statistik (Sammlungen „installs“ und „push“) ----------
async function loadStats() {
  const tage = (n) => Date.now() - n * 864e5;
  try {
    const inst = (await getDocs(collection(db, "installs"))).docs.map(d => d.data());
    const ms = (t) => t?.toMillis ? t.toMillis() : 0;
    $("a-total").textContent = inst.length;
    $("a-30").textContent = inst.filter(i => ms(i.last) >= tage(30)).length;
    $("a-7").textContent = inst.filter(i => ms(i.first) >= tage(7)).length;
    const pf = { ios: 0, android: 0, desktop: 0 };
    inst.forEach(i => { pf[i.platform] = (pf[i.platform] || 0) + 1; });
    $("a-info").textContent = `iPhone/iPad: ${pf.ios} · Android: ${pf.android} · Computer: ${pf.desktop}. Gezählt wird jedes Gerät, das die App vom Homescreen öffnet.`;
  } catch (e) { $("a-info").textContent = "Keine Berechtigung für „installs“ (Firestore-Regeln)."; console.warn(e); }
  try { $("a-push").textContent = (await getDocs(collection(db, "push"))).size; }
  catch (e) { $("a-push").textContent = "?"; console.warn(e); }
}

// ---------- Push-Nachrichten senden (über die GitHub Action „Freitags-Push“) ----------
const GH_REPO = "maxi2104-cmd/Fahrschulquiz", GH_WORKFLOW = "freitag-push.yml", GH_KEY = "ot_gh_token";
const ART = { manuell: "An alle", freitag: "Freitag (auto)", test: "Test" };

function ghToken(neu) {
  let t = neu ? "" : localStorage.getItem(GH_KEY);
  if (!t) {
    t = (prompt("GitHub-Schlüssel (Fine-grained Token mit Recht „Actions: Read and write“ für das Fahrschulquiz-Repo). Wird nur auf diesem Gerät gespeichert.") || "").trim();
    if (t) localStorage.setItem(GH_KEY, t);
  }
  return t;
}
$("p-key").addEventListener("click", () => { if (ghToken(true)) msg("GitHub-Schlüssel gespeichert."); });
$("p-test").disabled = !localStorage.getItem("ot_push_token");
$("p-test").title = $("p-test").disabled ? "Erst auf diesem Gerät die Freitags-Erinnerung einschalten." : "";

function msg(t, err) { $("p-msg").textContent = t; $("p-msg").className = err ? "err" : "hint"; }

async function sendPush(test) {
  const titel = $("p-titel").value.trim(), text = $("p-text").value.trim(), link = $("p-link").value;
  if (!titel || !text) { msg("Bitte Titel und Text ausfüllen.", true); return; }
  const anz = $("a-push").textContent;
  if (!test && !confirm(`Push-Nachricht an alle ${anz} Geräte senden?\n\n${titel}\n${text}`)) return;
  const token = ghToken();
  if (!token) return;
  const inputs = { titel, text, link };
  if (test) inputs.nur_token = localStorage.getItem("ot_push_token");
  $("p-send").disabled = $("p-test").disabled = true;
  msg("Wird gesendet …");
  try {
    const res = await fetch(`https://api.github.com/repos/${GH_REPO}/actions/workflows/${GH_WORKFLOW}/dispatches`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ ref: "main", inputs })
    });
    if (res.status === 401 || res.status === 403) { localStorage.removeItem(GH_KEY); throw new Error("GitHub-Schlüssel ungültig oder ohne Recht „Actions“. Bitte neu eingeben."); }
    if (!res.ok) throw new Error("GitHub meldet Fehler " + res.status + ".");
    msg("Gestartet ✓ Die Nachricht kommt in ca. 1 Minute an und erscheint dann unten in der Liste.");
    if (!test) { $("p-titel").value = ""; $("p-text").value = ""; }
  } catch (e) { msg(e.message || "Senden fehlgeschlagen.", true); console.warn(e); }
  $("p-send").disabled = false; $("p-test").disabled = !localStorage.getItem("ot_push_token");
}
$("p-send").addEventListener("click", () => sendPush(false));
$("p-test").addEventListener("click", () => sendPush(true));

function renderPushLog(list) {
  const tb = $("p-rows"); tb.innerHTML = "";
  if (!list.length) { tb.innerHTML = '<tr><td colspan="5">Noch keine Nachrichten gesendet.</td></tr>'; return; }
  list.forEach(p => {
    const tr = document.createElement("tr");
    const when = p.sentAt?.toDate ? p.sentAt.toDate().toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "";
    [when, ART[p.art] || p.art, p.titel, p.text, `${p.ok}/${p.geraete}`].forEach(v => {
      const td = document.createElement("td"); td.textContent = v ?? ""; tr.appendChild(td);
    });
    tb.appendChild(tr);
  });
}
