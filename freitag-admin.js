import { app, db } from "./config.js";
import { WOCHEN } from "./freitag-wochen.js";
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
}

function nextWeek() {
  const hist = cfg.history || {};
  return WOCHEN.find(w => w.fragen.length && !hist[w.nr] && w.nr !== cfg.set) || null;
}

async function goOnline(w) {
  if (!w.fragen.length) return;
  if (!confirm(`Freitags Frage #${pad(w.nr)} „${w.thema}“ jetzt online stellen?\n\nDas aktuelle Quiz wird ersetzt und das Ranking startet neu.`)) return;
  const today = new Date().toISOString().slice(0, 10);
  const round = `Q${pad(w.nr)}-${today}`;
  try {
    await setDoc(doc(db, "config", "current"), { round, set: w.nr, history: { [w.nr]: today } }, { merge: true });
    toast(`#${pad(w.nr)} ist online ✓`);
    await load();
  } catch (e) { alert("Fehler beim Speichern: " + e.message); }
}

function render() {
  const hist = cfg.history || {};
  const act = WOCHEN.find(w => w.nr === cfg.set);
  $("now-txt").textContent = act ? `#${pad(act.nr)} · ${act.thema}` : "Noch kein Quiz online";
  const nx = nextWeek();
  $("btn-next").disabled = !nx;
  $("btn-next").textContent = nx ? `#${pad(nx.nr)} ONLINE STELLEN` : "KEIN WEITERES QUIZ BEREIT";
  $("next-txt").textContent = nx ? `Als Nächstes: „${nx.thema}“ (geplant für ${de(nx.datum)})` : "";
  $("btn-next").onclick = () => nx && goOnline(nx);

  const list = $("list"); list.innerHTML = "";
  [...WOCHEN].sort((a, b) => a.nr - b.nr).forEach(w => {
    const ready = w.fragen.length > 0;
    let badge;
    if (w.nr === cfg.set) badge = '<span class="badge b-act">AKTIV</span>';
    else if (hist[w.nr]) badge = `<span class="badge b-done">ONLINE AM ${new Date(hist[w.nr] + "T12:00:00").toLocaleDateString("de-DE")}</span>`;
    else if (ready) badge = '<span class="badge b-plan">BEREIT</span>';
    else badge = '<span class="badge b-prep">IN VORBEREITUNG</span>';
    const card = document.createElement("div");
    card.className = "wk" + (w.nr === cfg.set ? " act" : "");
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
