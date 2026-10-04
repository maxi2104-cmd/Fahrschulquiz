// ===== Schildersammlung: Suche, Filter und Erklärung =====
import { SCHILDER } from "./schilder-daten.js";
import { INFO, SONDER, KATEGORIEN, kategorie } from "./schilder-info.js";

const ORDNER = "Verkehrszeichen/";
const STUFE = 90; // so viele Kacheln werden auf einmal gezeichnet

const norm = (s) => String(s || "").toLowerCase()
  .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[„“"‚‘'()–−]/g, " ");
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const katName = Object.fromEntries(KATEGORIEN.map(k => [k.id, k]));

// ---------- Daten aufbereiten ----------
const ALLE = SCHILDER.map((s, i) => {
  const info = s.n ? INFO[s.n] : SONDER[s.s];
  const art = !s.n ? "" : parseFloat(s.n) >= 1000 ? "Zusatzzeichen" : "Zeichen";
  const nummer = s.n ? `${art} ${s.n}${s.v ? (/^[ab]$/.test(s.v) ? " " : "") + s.v.replace(/\s*bis\s*/, " bis ") : ""}` : "";
  const kat = s.n ? kategorie(s.n) : "sonst";
  const titel = s.t || (info && info.t) || nummer;
  const commons = (s.w || s.f.replace(/\.png$/, "")).replace(/ /g, "_") + ".svg";
  return {
    i, f: s.f, n: s.n || "", nummer, kat, titel, info, jahr: s.j || "",
    src: ORDNER + encodeURIComponent(s.f),
    quelle: "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(commons),
    gruppe: s.n ? "n" + s.n : "s" + s.s,   // Varianten desselben Grundzeichens bilden einen Stapel
    nrKey: norm((s.n || "") + (s.v || "")).replace(/\s+/g, ""),
    titelKey: norm(titel + " " + (info ? info.t : "")),
    hay: norm([nummer, titel, info && info.t, info && info.e, katName[kat].name].join(" "))
  };
});

// ---------- Elemente ----------
const $ = (id) => document.getElementById(id);
const inp = $("sd-q"), grid = $("sd-grid"), info = $("sd-info"), chips = $("sd-chips"), more = $("sd-more");
let filter = "alle", treffer = ALLE, gezeigt = 0;

// Kategorie-Chips
// Stapel: Grundzeichen → alle Varianten
const GRUPPEN = ALLE.reduce((m, s) => ((m[s.gruppe] = m[s.gruppe] || []).push(s), m), {});
const anzahl = Object.values(GRUPPEN).reduce((m, g) => (m[g[0].kat] = (m[g[0].kat] || 0) + 1, m), {});
chips.innerHTML = [`<button type="button" class="sd-chip on" data-k="alle">ALLE</button>`]
  .concat(KATEGORIEN.filter(k => anzahl[k.id]).map(k => `<button type="button" class="sd-chip" data-k="${k.id}">${k.kurz} <small>${anzahl[k.id]}</small></button>`))
  .join("");
chips.addEventListener("click", (e) => {
  const b = e.target.closest(".sd-chip");
  if (!b) return;
  filter = b.dataset.k;
  chips.querySelectorAll(".sd-chip").forEach(c => c.classList.toggle("on", c === b));
  suchen();
});

// ---------- Suche ----------
function suchen() {
  const roh = inp.value.trim();
  const worte = norm(roh).split(/\s+/).filter(Boolean);
  const nrSuche = norm(roh).replace(/^(zusatz)?zeichen\s*/, "").replace(/\s+/g, "");
  const istNr = /^\d/.test(nrSuche);
  let liste = filter === "alle" ? ALLE : ALLE.filter(s => s.kat === filter);

  if (worte.length) {
    liste = liste.map(s => {
      let p = 0;
      if (istNr && s.nrKey.startsWith(nrSuche)) p = s.nrKey === nrSuche || s.n === nrSuche ? 4 : 3;
      else if (worte.every(w => s.titelKey.includes(w))) p = 2;
      else if (worte.every(w => s.hay.includes(w))) p = 1;
      return { s, p };
    }).filter(x => x.p).sort((a, b) => b.p - a.p || a.s.i - b.s.i).map(x => x.s);
  }
  // nach Grundzeichen zusammenfassen – der beste Treffer liegt oben auf dem Stapel
  const gesehen = new Set();
  treffer = liste.filter(x => !gesehen.has(x.gruppe) && gesehen.add(x.gruppe));
  const anzSchilder = liste.length;
  grid.innerHTML = "";
  gezeigt = 0;
  const de = (n) => n.toLocaleString("de-DE");
  info.textContent = !worte.length
    ? `${de(treffer.length)} Zeichen mit ${de(anzSchilder)} Varianten${filter === "alle" ? "" : " – " + katName[filter].name}`
    : treffer.length
      ? `${de(treffer.length)} ${treffer.length === 1 ? "Zeichen" : "Zeichen"} für „${roh}“ (${de(anzSchilder)} Varianten)`
      : `Keine Treffer für „${roh}“. Versuch ein anderes oder kürzeres Wort.`;
  weiter();
}

function kachel(s) {
  const n = GRUPPEN[s.gruppe].length;
  const kurz = (t) => t.replace(/^Zusatzzeichen/, "Zusatz").replace(/^Zeichen /, "");
  const nr = n > 1 && s.n ? kurz((parseFloat(s.n) >= 1000 ? "Zusatzzeichen " : "Zeichen ") + s.n) : kurz(s.nummer);
  const titel = n > 1 && s.info ? s.info.t : s.titel;
  return `<button type="button" class="sd-tile${n > 1 ? " stack" : ""}" data-i="${s.i}">
    <span class="sd-img"><img src="${s.src}" alt="" loading="lazy" decoding="async">${n > 1 ? `<span class="sd-count" title="${n} Varianten">${n} ×</span>` : ""}</span>
    <span class="sd-nr">${esc(nr || "–")}</span>
    <span class="sd-t">${esc(titel)}</span>
  </button>`;
}

function weiter() {
  if (gezeigt >= treffer.length) return;
  grid.insertAdjacentHTML("beforeend", treffer.slice(gezeigt, gezeigt + STUFE).map(kachel).join(""));
  gezeigt += STUFE;
}
new IntersectionObserver((e) => { if (e[0].isIntersecting) weiter(); }, { rootMargin: "600px" }).observe(more);

let t = null;
inp.addEventListener("input", () => { clearTimeout(t); t = setTimeout(suchen, 150); });
grid.addEventListener("click", (e) => {
  const b = e.target.closest(".sd-tile");
  if (b) oeffnen(ALLE[+b.dataset.i]);
});

// ---------- Erklärung ----------
const modal = document.createElement("div");
modal.className = "lk-overlay";
modal.hidden = true;
modal.innerHTML = `
  <div class="lk-panel sd-panel" role="dialog" aria-modal="true" aria-label="Verkehrszeichen">
    <div class="lk-head">
      <span class="lk-h">VERKEHRSZEICHEN</span>
      <button type="button" class="lk-close" aria-label="Schließen">✕</button>
    </div>
    <div class="lk-list sd-body"></div>
  </div>`;
document.body.appendChild(modal);
const body = modal.querySelector(".sd-body");

function oeffnen(s, ersetzen) {
  const k = katName[s.kat];
  const varianten = GRUPPEN[s.gruppe];
  const gehoert = s.info && s.n && s.titel !== s.info.t;
  body.innerHTML = `
    <div class="sd-big"><img src="${s.src}" alt="${esc(s.titel)}"></div>
    ${varianten.length > 1 ? `<p class="sd-var-h">${varianten.length} VARIANTEN – <span>${varianten.indexOf(s) + 1} von ${varianten.length}</span></p>
      <div class="sd-var">${varianten.map(o => `<button type="button" class="sd-vt${o === s ? " on" : ""}" data-i="${o.i}" aria-label="${esc(o.nummer + " " + o.titel)}"><img src="${o.src}" alt="" loading="lazy"><small>${esc((o.nummer.match(/[-\s][^\s]*$|\sbis.*$/) || [""])[0].trim().replace(/^-/, "") || "Grund")}</small></button>`).join("")}</div>` : ""}
    <span class="lk-set">${esc(k.name.toUpperCase())}</span>
    <h2 class="sd-h">${esc(s.titel)}</h2>
    <p class="sd-meta">${esc([s.nummer, s.jahr && "Ausführung " + s.jahr].filter(Boolean).join(" · "))}</p>
    ${s.info ? `<div class="sd-box"><span class="rv-tag">WAS BEDEUTET DAS?</span>
      ${gehoert ? `<p class="sd-gruppe">${esc(s.info.t)}</p>` : ""}
      <p>${esc(s.info.e)}</p></div>` : ""}
    <div class="sd-box sd-kat"><span class="rv-tag">GUT ZU WISSEN: ${esc(k.name.toUpperCase())}</span><p>${esc(k.e)}</p></div>
    <p class="rc-foot">Bild: <a href="${s.quelle}" target="_blank" rel="noopener">Wikimedia Commons</a>, gemeinfrei.</p>`;
  body.scrollTop = 0;
  const on = body.querySelector(".sd-vt.on");   // gewählte Variante in den sichtbaren Bereich holen
  if (on && !ersetzen) on.parentNode.scrollLeft = on.offsetLeft - 100;
  if (modal.hidden) {
    modal.hidden = false;
    document.body.classList.add("lk-open");
    if (!ersetzen) history.pushState({ sd: 1 }, "");
  }
}

body.addEventListener("click", (e) => {
  const b = e.target.closest(".sd-vt");
  if (b) { const x = body.querySelector(".sd-var").scrollLeft; oeffnen(ALLE[+b.dataset.i], true); const v = body.querySelector(".sd-var"); if (v) v.scrollLeft = x; }
});
const zu = () => { modal.hidden = true; document.body.classList.remove("lk-open"); };
// Schließen über die Zurück-Geste des Handys
window.addEventListener("popstate", () => { if (!modal.hidden) zu(); });
const schliessen = () => { if (history.state && history.state.sd) history.back(); else zu(); };
modal.querySelector(".lk-close").addEventListener("click", schliessen);
modal.addEventListener("click", (e) => { if (e.target === modal) schliessen(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) schliessen(); });

// Suchbegriff aus der Adresse übernehmen, z. B. schilder.html?q=274
const q = new URLSearchParams(location.search).get("q");
if (q) inp.value = q;
suchen();
