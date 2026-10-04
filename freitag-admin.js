import { app, db } from "./config.js";
import { WOCHEN, freitagsStand, startZeit, naechstesQuiz, naechsterTermin, startText } from "./freitag-wochen.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = (id) => document.getElementById(id);
const auth = getAuth(app);
const APP_URL = "https://maxi2104-cmd.github.io/Fahrschulquiz/freitag.html";
const pad = (n) => String(n).padStart(2, "0");
const de = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
let cfg = {};

function toast(t) { const el = $("toast"); el.textContent = t; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 1800); }

function caption(w) {
  return `🚦 FREITAGS FRAGE #${pad(w.nr)}: ${w.thema.toUpperCase()} 🚦

10 neue Fragen – wie viele schaffst du? 🤔
Je schneller du richtig antwortest, desto mehr Punkte. Das Ranking läuft eine Woche – wer holt sich Platz 1? 🏆

👉 Jetzt mitspielen in der On Track App – Link in der Bio!

#freitagsfrage #fahrschule #ontrack #führerschein #theorie #quiz #salzhausen #winsenluhe #nextgenerationfahrschule`;
}

$("btn-login").addEventListener("click", async () => {
  $("login-err").hidden = true;
  try { await signInWithEmailAndPassword(auth, $("email").value.trim(), $("pw").value); }
  catch (e) { $("login-err").textContent = "Anmeldung fehlgeschlagen."; $("login-err").hidden = false; }
});
$("pw").addEventListener("keydown", (e) => { if (e.key === "Enter") $("btn-login").click(); });
$("btn-logout").addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  $("login").hidden = !!user; $("dash").hidden = !user;
  if (user) await load();
});

async function load() {
  try { const s = await getDoc(doc(db, "config", "current")); cfg = s.exists() ? s.data() : {}; } catch (e) { cfg = {}; }
  render();
  loadTicker();
}

// ---------- Laufband (config/ticker) ----------
const TICKER_DEFAULT = "+++ Breaking News: Theoriekurs startet am 16. November, nur noch wenige Plätze frei. +++ Jetzt schnell einen Platz sichern!";
let ticker = { text: TICKER_DEFAULT, on: true };
async function loadTicker() {
  try { const s = await getDoc(doc(db, "config", "ticker")); if (s.exists()) ticker = { ...ticker, ...s.data() }; } catch (e) {}
  $("tk-text").value = ticker.text || "";
  showTicker();
}
function showTicker() {
  $("tk-on").setAttribute("aria-checked", String(ticker.on !== false));
  $("tk-mode").textContent = ticker.on !== false ? "AN" : "AUS";
  $("tk-prev").textContent = $("tk-text").value || "(leer)";
  $("tk-info").textContent = ticker.updated ? `Zuletzt gespeichert: ${new Date(ticker.updated).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })}` : "";
}
async function saveTicker(changes, msg) {
  const data = { ...changes, updated: new Date().toISOString() };
  try { await setDoc(doc(db, "config", "ticker"), data, { merge: true }); ticker = { ...ticker, ...data }; showTicker(); toast(msg); }
  catch (e) { alert("Fehler beim Speichern: " + e.message); }
}
$("tk-text").addEventListener("input", () => { $("tk-prev").textContent = $("tk-text").value || "(leer)"; });
$("tk-save").addEventListener("click", () => saveTicker({ text: $("tk-text").value.trim() }, "Laufband gespeichert ✓"));
$("tk-on").addEventListener("click", () => {
  const on = ticker.on === false;
  saveTicker({ on, text: $("tk-text").value.trim() }, on ? "Laufband ist an" : "Laufband ist aus");
});

const kurz = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("de-DE");
const titel = (w) => `#${pad(w.nr)} · ${w.thema}`;
const nachDatum = [...WOCHEN].sort((a, b) => a.datum.localeCompare(b.datum) || a.nr - b.nr);

// Nächstes Quiz für den Handbetrieb: das erste fertige Quiz nach dem gerade aktiven
function nextWeek() {
  const hist = cfg.history || {};
  const cur = freitagsStand(cfg).week;
  return nachDatum.find(w => w.fragen.length && w !== cur && (cur ? w.datum > cur.datum : !hist[w.nr])) || null;
}

// Automatik an/aus
async function setMode(auto) {
  const st = freitagsStand(cfg);
  if (auto) {
    const a = freitagsStand({ ...cfg, mode: "auto" });
    const was = a.week ? `Dann ist sofort ${titel(a.week)} aktiv (Ranking-Runde ${a.round}).` : "Dann ist bis zum ersten Termin kein Quiz aktiv.";
    if (!confirm(`Automatik einschalten?\n\n${was}\nAb dann wechselt das Quiz jeden Freitag um 06:00 Uhr von selbst.`)) return render();
    await save({ mode: "auto" }, "Automatik ist an ✓");
  } else {
    if (!confirm("Automatik ausschalten?\n\nDas aktuelle Quiz bleibt online, bis du von Hand ein anderes online stellst.")) return render();
    await save({ mode: "manual", round: st.round, set: st.week ? st.week.nr : null }, "Automatik ist aus");
  }
}

async function save(data, msg) {
  try {
    await setDoc(doc(db, "config", "current"), data, { merge: true });
    toast(msg);
    await load();
  } catch (e) { alert("Fehler beim Speichern: " + e.message); render(); }
}

async function goOnline(w) {
  if (!w.fragen.length) return;
  const autoHint = freitagsStand(cfg).mode === "auto" ? "\n\nDie Automatik wird dafür ausgeschaltet. Du kannst sie oben jederzeit wieder einschalten." : "";
  if (!confirm(`Freitags Frage #${pad(w.nr)} „${w.thema}“ jetzt online stellen?\n\nDas aktuelle Quiz wird ersetzt und das Ranking startet neu.${autoHint}`)) return;
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });   // JJJJ-MM-TT
  const round = `Q${pad(w.nr)}-${today}`;
  await save({ mode: "manual", round, set: w.nr, history: { [w.nr]: today } }, `#${pad(w.nr)} ist online ✓`);
}

function render() {
  const hist = cfg.history || {};
  const now = new Date();
  const st = freitagsStand(cfg, now);
  const auto = st.mode === "auto";
  const act = st.week;

  $("btn-mode").setAttribute("aria-checked", String(auto));
  $("btn-mode").onclick = () => setMode(!auto);
  $("mode-txt").textContent = auto ? "AN" : "AUS";
  $("now-txt").textContent = act ? titel(act) : "Noch kein Quiz online";
  $("now-sub").textContent = act
    ? `Ranking-Runde ${st.round}` + (auto ? ` · automatisch seit ${startText(act)}` : " · von Hand online gestellt")
    : (auto ? "Die Automatik startet das erste Quiz zum geplanten Termin." : "");
  if (!auto) {
    const a = freitagsStand({ ...cfg, mode: "auto" }, now).week;
    if (a && a !== act) $("now-sub").textContent += ` · Mit Automatik wäre jetzt ${titel(a)} aktiv.`;
  }

  const nxt = $("next-txt");
  nxt.classList.remove("warn-txt");
  if (auto) {
    $("btn-next").hidden = true;
    const nx = naechstesQuiz(now), termin = naechsterTermin(now);
    let t = nx ? `Als Nächstes: ${titel(nx)} – startet automatisch am ${startText(nx)}.` : "Es ist kein weiteres Quiz mit Fragen geplant.";
    if (termin && termin !== nx && !termin.fragen.length) {
      t = `Achtung: Für ${titel(termin)} (${startText(termin)}) fehlen noch die Fragen – bis sie da sind, bleibt ${act ? titel(act) : "das bisherige Quiz"} aktiv.` + (nx ? " " + t : "");
      nxt.classList.add("warn-txt");
    }
    nxt.textContent = t;
  } else {
    const nx = nextWeek();
    $("btn-next").hidden = false;
    $("btn-next").disabled = !nx;
    $("btn-next").textContent = nx ? `#${pad(nx.nr)} ONLINE STELLEN` : "KEIN WEITERES QUIZ BEREIT";
    $("btn-next").onclick = () => nx && goOnline(nx);
    nxt.textContent = (nx ? `Als Nächstes: „${nx.thema}“ (geplant für ${de(nx.datum)}). ` : "") + "Handbetrieb: Das Quiz wechselt erst, wenn du es online stellst oder die Automatik einschaltest.";
  }

  const list = $("list"); list.innerHTML = "";
  [...WOCHEN].sort((a, b) => a.nr - b.nr).forEach(w => {
    const ready = w.fragen.length > 0;
    let badge;
    const started = startZeit(w) <= now;
    if (w === act) badge = `<span class="badge b-act">AKTIV${auto ? " · AUTOMATIK" : ""}</span>`;
    else if (hist[w.nr]) badge = `<span class="badge b-done">ONLINE AM ${kurz(hist[w.nr])}</span>`;
    else if (ready && auto && started) badge = `<span class="badge b-done">GELAUFEN AB ${kurz(w.datum)}</span>`;
    else if (ready && auto) badge = `<span class="badge b-plan">STARTET AUTOMATISCH ${kurz(w.datum)}, 06:00</span>`;
    else if (ready) badge = '<span class="badge b-plan">BEREIT</span>';
    else badge = '<span class="badge b-prep">IN VORBEREITUNG</span>';
    const card = document.createElement("div");
    card.className = "wk" + (w === act ? " act" : "");
    card.innerHTML = `
      <div class="wk-top"><div class="wk-nr">${pad(w.nr)}</div>
        <div class="wk-t"><b>${w.thema}</b><small>Geplant: ${de(w.datum)}</small>${badge}</div></div>
      <div class="wk-btns">
        <button class="btn" data-a="on" ${ready ? "" : "disabled"}>ONLINE STELLEN</button>
        <a class="btn ghost" data-a="img" href="posting-q${pad(w.nr)}.jpg" target="_blank" rel="noopener" ${ready ? "" : 'style="pointer-events:none;opacity:.4"'}>POSTING-BILD</a>
        <button class="btn ghost" data-a="txt" ${ready ? "" : "disabled"}>TEXT KOPIEREN</button>
        <button class="btn ghost" data-a="q" ${ready ? "" : "disabled"}>FRAGEN ANSEHEN</button>
      </div>`;
    card.querySelector('[data-a="on"]').onclick = () => goOnline(w);
    card.querySelector('[data-a="txt"]').onclick = async () => {
      try { await navigator.clipboard.writeText(caption(w)); toast("Text kopiert ✓"); }
      catch (e) { prompt("Text kopieren:", caption(w)); }
    };
    card.querySelector('[data-a="q"]').onclick = () => {
      let ol = card.querySelector(".wk-q");
      if (ol) { ol.remove(); return; }
      ol = document.createElement("ol"); ol.className = "wk-q";
      ol.innerHTML = w.fragen.map(q => `<li>${q.text}<br><em>✓ ${q.answers[q.correct]}</em></li>`).join("");
      card.appendChild(ol);
    };
    list.appendChild(card);
  });
}
