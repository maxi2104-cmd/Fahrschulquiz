// ===== Faustformel-Rechner: Reaktionsweg, Bremsweg, Anhalteweg, Abstand =====
// Faustformeln aus dem Theorieunterricht (Werte in Metern, gerundet).
import { badgeEvent } from "./abzeichen.js";

const fmt = (n) => (Math.round(n * 10) / 10).toLocaleString("de-DE");
let modal = null;

const HTML = `
<div class="lk-panel ff-panel" role="dialog" aria-modal="true" aria-label="Anhalteweg-Rechner">
  <div class="lk-head">
    <span class="lk-h">ANHALTEWEG-RECHNER</span>
    <button type="button" class="lk-close" aria-label="Schließen">✕</button>
  </div>
  <div class="lk-list">
    <div class="ff-speed"><b id="ff-v">50</b><span>km/h</span></div>
    <input id="ff-range" class="ff-range" type="range" min="10" max="200" step="5" value="50" aria-label="Geschwindigkeit in km/h">
    <div class="ff-quick">${[30, 50, 70, 100, 130].map(v => `<button type="button" data-v="${v}">${v}</button>`).join("")}</div>

    <div class="ff-bars" aria-hidden="true">
      <p class="ff-bl">NORMALE BREMSUNG</p>
      <div class="ff-bar"><i class="rw" id="ff-b1r"></i><i class="bw" id="ff-b1b"></i></div>
      <p class="ff-bl">GEFAHRBREMSUNG</p>
      <div class="ff-bar"><i class="rw" id="ff-b2r"></i><i class="bw" id="ff-b2b"></i></div>
      <p class="ff-leg"><span class="rw"></span>Reaktionsweg <span class="bw"></span>Bremsweg</p>
    </div>

    <div class="ff-grid">
      <div class="ff-card"><small>REAKTIONSWEG</small><b id="ff-rw"></b><em id="ff-rw-f"></em></div>
      <div class="ff-card"><small>BREMSWEG NORMAL</small><b id="ff-bw"></b><em id="ff-bw-f"></em></div>
      <div class="ff-card"><small>BREMSWEG GEFAHR</small><b id="ff-gw"></b><em>normaler Bremsweg : 2</em></div>
      <div class="ff-card hi"><small>ANHALTEWEG NORMAL</small><b id="ff-aw"></b><em>Reaktionsweg + Bremsweg</em></div>
      <div class="ff-card hi"><small>ANHALTEWEG GEFAHR</small><b id="ff-ag"></b><em>Reaktionsweg + halber Bremsweg</em></div>
      <div class="ff-card"><small>ABSTAND „HALBER TACHO“</small><b id="ff-ab"></b><em id="ff-ab-f"></em></div>
    </div>
    <p class="ff-tip" id="ff-tip"></p>
    <p class="rc-foot">Faustformeln aus der Fahrschule. In Wirklichkeit hängt der Anhalteweg auch von Reifen, Bremsen, Straße, Wetter und Beladung ab – bei Nässe oder Glätte wird er deutlich länger.</p>
  </div>
</div>`;

function rechne() {
  const q = (id) => modal.querySelector(id);
  const v = +q("#ff-range").value, z = v / 10;
  const rw = z * 3, bw = z * z, gw = bw / 2, aw = rw + bw, ag = rw + gw, ab = v / 2;
  q("#ff-v").textContent = v;
  q("#ff-rw").textContent = fmt(rw) + " m"; q("#ff-rw-f").textContent = `(${v} : 10) × 3`;
  q("#ff-bw").textContent = fmt(bw) + " m"; q("#ff-bw-f").textContent = `(${v} : 10) × (${v} : 10)`;
  q("#ff-gw").textContent = fmt(gw) + " m";
  q("#ff-aw").textContent = fmt(aw) + " m";
  q("#ff-ag").textContent = fmt(ag) + " m";
  q("#ff-ab").textContent = fmt(ab) + " m"; q("#ff-ab-f").textContent = `${v} : 2 – außerorts`;
  const max = 200 / 10 * 3 + 400;   // längster Anhalteweg (200 km/h), damit die Balken vergleichbar bleiben
  q("#ff-b1r").style.width = rw / max * 100 + "%"; q("#ff-b1b").style.width = bw / max * 100 + "%";
  q("#ff-b2r").style.width = rw / max * 100 + "%"; q("#ff-b2b").style.width = gw / max * 100 + "%";
  q("#ff-range").style.setProperty("--p", (v - 10) / 190 * 100 + "%");
  const fussball = aw / 105;
  q("#ff-tip").innerHTML = v === 50
    ? "Gefahrbremsung: Aus <b>30 km/h</b> steht ein Auto nach etwa 13,5 m. Wer mit 50 km/h kommt, hat an dieser Stelle noch nicht einmal angefangen zu bremsen – sein Reaktionsweg ist 15 m."
    : fussball >= 1
      ? `Der normale Anhalteweg ist so lang wie <b>${fmt(fussball)} Fußballfelder</b>.`
      : `Doppelte Geschwindigkeit = <b>vierfacher Bremsweg</b>. Bei ${v * 2} km/h wären es schon ${fmt((v / 5) ** 2)} m.`;
  modal.querySelectorAll(".ff-quick button").forEach(b => b.classList.toggle("on", +b.dataset.v === v));
}

function build() {
  modal = document.createElement("div");
  modal.className = "lk-overlay"; modal.hidden = true; modal.innerHTML = HTML;
  document.body.appendChild(modal);
  const close = () => { modal.hidden = true; document.body.classList.remove("lk-open"); };
  modal.querySelector(".lk-close").onclick = close;
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
  modal.querySelector("#ff-range").addEventListener("input", rechne);
  modal.querySelector(".ff-quick").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    modal.querySelector("#ff-range").value = b.dataset.v; rechne();
  });
  rechne();
}

export function openFaustformel() {
  if (!modal) build();
  modal.hidden = false; document.body.classList.add("lk-open");
  badgeEvent("rechner");
}
