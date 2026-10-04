// ===== Freitags Frage: Ranking-Banner, fliegende Platzierung und Teilen-Bild =====
import { naechstesQuiz, startZeit, startText } from "./freitag-wochen.js";

const pad = (n) => String(n).padStart(2, "0");
const APP_URL = "maxi2104-cmd.github.io/Fahrschulquiz";

// Restzeit bis zum nächsten Quiz, z. B. „3 Tage 4 Std.“
function restzeit(bis) {
  const min = Math.max(0, Math.round((bis - new Date()) / 60000));
  const t = Math.floor(min / 1440), h = Math.floor((min % 1440) / 60), m = min % 60;
  if (t) return `${t} ${t === 1 ? "Tag" : "Tage"} ${h} Std.`;
  if (h) return `${h} Std. ${m} Min.`;
  return `${m} Min.`;
}

// ---------- Ranking-Banner auf der Startseite ----------
// rows: alle Einträge der Runde (absteigend sortiert), myId: eigener Eintrag (oder null)
export function renderBanner(box, { week, rows, myId, auto }) {
  if (!week) { box.hidden = true; return; }
  box.hidden = false;
  const next = auto ? naechstesQuiz() : null;
  const ende = next
    ? `Ranking endet ${startText(next).replace(", 06:00 Uhr", " um 06:00 Uhr")} · noch <b>${restzeit(startZeit(next))}</b>`
    : "Ranking läuft, bis das nächste Quiz startet";
  const leader = rows[0];
  const meIdx = myId ? rows.findIndex(r => r.id === myId) : -1;
  box.innerHTML = `
    <div class="rb-top"><span class="rb-cup" aria-hidden="true">🏆</span><b>WOCHEN-RANKING #${pad(week.nr)}</b></div>
    <p class="rb-line">${ende}</p>
    <div class="rb-stats">
      <span><b>${rows.length}</b> ${rows.length === 1 ? "Teilnehmer" : "Teilnehmer"}</span>
      <span>${leader ? `Platz 1: <b>${esc(leader.name)}</b> · ${leader.points.toLocaleString("de-DE")}` : "Noch frei: <b>Platz 1</b>"}</span>
    </div>
    ${meIdx >= 0 ? `<p class="rb-me">Dein Platz: <b>${meIdx + 1}</b> von ${rows.length}</p>` : ""}`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---------- Fliegende Platzierung ----------
// Zeigt „PLATZ 3“ groß in der Mitte und lässt es in die eigene Zeile der Bestenliste fliegen.
export function flyRank(rank, total, target) {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.createElement("div");
  el.className = "fly-rank";
  el.innerHTML = `<small>DEIN PLATZ</small><b>${rank}</b><small>VON ${total}</small>`;
  document.body.appendChild(el);
  if (reduce) { setTimeout(() => el.remove(), 1800); return; }
  el.animate([
    { transform: "translate(-50%,-50%) scale(.2) rotate(-12deg)", opacity: 0 },
    { transform: "translate(-50%,-50%) scale(1.15) rotate(3deg)", opacity: 1, offset: .6 },
    { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 }
  ], { duration: 700, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" });
  setTimeout(() => {
    let to = { transform: "translate(-50%,-50%) scale(.2)", opacity: 0 };
    if (target) {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    setTimeout(() => {
      if (target) {
        const r = target.getBoundingClientRect();
        const dx = r.left + 30 - window.innerWidth / 2, dy = r.top + r.height / 2 - window.innerHeight / 2;
        to = { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.18)`, opacity: .2 };
      }
      const a = el.animate([{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 }, to],
        { duration: 750, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" });
      a.onfinish = () => {
        el.remove();
        if (target) { target.classList.add("pop"); setTimeout(() => target.classList.remove("pop"), 900); }
      };
    }, target ? 450 : 0);
  }, 1500);
}

// ---------- Teilen-Bild (1080 × 1920, Instagram-Story) ----------
function loadImg(src) {
  return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}

function fitText(ctx, text, maxW, size, weight = 900) {
  let s = size;
  do { ctx.font = `${weight} ${s}px -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif`; s -= 4; }
  while (ctx.measureText(text).width > maxW && s > 20);
}

function spaced(ctx, text, x, y, spacing, align = "left") {
  const w = [...text].reduce((s, c) => s + ctx.measureText(c).width, 0) + spacing * (text.length - 1);
  let cx = align === "center" ? x - w / 2 : x;
  for (const c of text) { ctx.fillText(c, cx, y); cx += ctx.measureText(c).width + spacing; }
}

export async function makeShareImage({ week, points, correct, total, rank, count, practice }) {
  const W = 1080, H = 1920, LIME = "#c2e54d", BG = "#12151c";
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d");
  x.fillStyle = BG; x.fillRect(0, 0, W, H);
  const g = x.createRadialGradient(W * .8, 0, 50, W * .8, 0, 1100);
  g.addColorStop(0, "#2a3226"); g.addColorStop(1, "rgba(18,21,28,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  // Diagonalen wie auf den Posting-Bildern
  x.strokeStyle = LIME; x.lineWidth = 12; x.beginPath(); x.moveTo(-10, 640); x.lineTo(W + 10, 520); x.stroke();
  x.strokeStyle = "#8fb03a"; x.lineWidth = 5; x.beginPath(); x.moveTo(-10, 678); x.lineTo(W + 10, 558); x.stroke();

  const logo = await loadImg("logo.svg");
  if (logo) x.drawImage(logo, 72, 110, 220, 212);
  x.textBaseline = "top";
  if (week) {   // Nummer oben rechts wie auf den Posting-Bildern
    x.font = "900 40px -apple-system, Helvetica, Arial, sans-serif";
    const t = `#${pad(week.nr)}`, tw = x.measureText(t).width + 50;
    x.fillStyle = "#14171a"; x.beginPath(); x.roundRect(W - 92 - tw, 166, tw, 70, 35); x.fill();
    x.fillStyle = "#f4f6f8"; x.fillText(t, W - 92 - tw + 25, 180);
  }

  // Pille
  x.font = "900 52px -apple-system, Helvetica, Arial, sans-serif";
  const pill = week ? `FREITAGS FRAGE #${pad(week.nr)}` : "FREITAGS FRAGE";
  const pw = [...pill].reduce((s, ch) => s + x.measureText(ch).width, 0) + 8 * (pill.length - 1) + 68;
  x.fillStyle = LIME; x.beginPath(); x.roundRect(72, 730, pw, 92, 46); x.fill();
  x.fillStyle = "#11140a"; spaced(x, pill, 106, 748, 8);
  if (week) { x.fillStyle = "#f4f6f8"; fitText(x, week.thema, W - 144, 72); x.fillText(week.thema, 72, 850); }

  // Ergebnis
  x.fillStyle = "#9aa1ad"; x.font = "900 44px -apple-system, Helvetica, Arial, sans-serif"; spaced(x, "MEIN ERGEBNIS", 72, 990, 6);
  x.fillStyle = LIME; fitText(x, points.toLocaleString("de-DE"), W - 144, 300); x.fillText(points.toLocaleString("de-DE"), 64, 1040);
  x.fillStyle = "#f4f6f8"; x.font = "900 52px -apple-system, Helvetica, Arial, sans-serif";
  x.fillText(`PUNKTE · ${correct} von ${total} richtig`, 72, 1360);
  if (rank && !practice) {
    x.fillStyle = "#f4f6f8"; x.font = "900 64px -apple-system, Helvetica, Arial, sans-serif";
    x.fillText("🏆 Platz ", 72, 1450);
    const w1 = x.measureText("🏆 Platz ").width;
    x.fillStyle = LIME; x.fillText(String(rank), 72 + w1, 1450);
    const w2 = x.measureText(String(rank)).width;
    x.fillStyle = "#f4f6f8"; x.fillText(` von ${count}`, 72 + w1 + w2, 1450);
  }
  // Button
  x.fillStyle = LIME; x.beginPath(); x.roundRect(72, 1582, W - 144, 118, 36); x.fill();
  x.fillStyle = "#11140a"; x.font = "900 50px -apple-system, Helvetica, Arial, sans-serif";
  spaced(x, "SCHAFFST DU MEHR? →", W / 2, 1616, 8, "center");
  x.fillStyle = "#9aa1ad"; x.font = "700 34px -apple-system, Helvetica, Arial, sans-serif";
  x.textAlign = "center"; x.fillText(APP_URL, W / 2, 1745); x.textAlign = "left";
  return new Promise(res => c.toBlob(res, "image/png"));
}

export async function shareResult(data, btn) {
  const old = btn.textContent; btn.disabled = true; btn.textContent = "BILD WIRD ERSTELLT …";
  try {
    const blob = await makeShareImage(data);
    const file = new File([blob], `freitagsfrage-${data.week ? pad(data.week.nr) : "ergebnis"}.png`, { type: "image/png" });
    const text = `Ich habe ${data.points.toLocaleString("de-DE")} Punkte bei der Freitags Frage von On Track geholt – schaffst du mehr? https://${APP_URL}/freitag.html`;
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text });
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }
  } catch (e) {
    if (e && e.name !== "AbortError") console.warn(e);
  } finally { btn.disabled = false; btn.textContent = old; }
}
