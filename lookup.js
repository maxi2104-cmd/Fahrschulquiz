// ===== Nachschlagen: Suche in Fragen, Antworten und Erklärungen =====
const norm = (s) => String(s || "").toLowerCase()
  .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .replace(/[„“"‚‘'()]/g, " ");

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// markiert Suchwörter im Text (Groß-/Kleinschreibung egal)
function mark(text, words) {
  let out = esc(text);
  words.filter(w => w.length > 1).forEach(w => {
    const pat = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/ae/g, "(?:ae|ä)").replace(/oe/g, "(?:oe|ö)").replace(/ue/g, "(?:ue|ü)").replace(/ss/g, "(?:ss|ß)");
    out = out.replace(new RegExp("(" + pat + ")(?![^<]*>)", "gi"), "<mark>$1</mark>");
  });
  return out;
}

let modal = null;

function build(sets) {
  const index = [];
  sets.forEach(set => set.questions.forEach(q => {
    const right = q.answers[q.correct];
    index.push({
      set: set.name, q, right,
      hay: norm([q.title, q.text, right, q.explain, q.detail].join(" "))
    });
  }));

  modal = document.createElement("div");
  modal.className = "lk-overlay";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="lk-panel" role="dialog" aria-modal="true" aria-label="Nachschlagen">
      <div class="lk-head">
        <span class="lk-h">NACHSCHLAGEN</span>
        <button type="button" class="lk-close" aria-label="Schließen">✕</button>
      </div>
      <input class="inp lk-inp" type="search" placeholder="Suchbegriff, z. B. Kabotage" autocomplete="off" enterkeyhint="search">
      <p class="lk-info"></p>
      <div class="lk-list"></div>
    </div>`;
  document.body.appendChild(modal);

  const inp = modal.querySelector(".lk-inp");
  const list = modal.querySelector(".lk-list");
  const info = modal.querySelector(".lk-info");
  const total = index.length;
  const multi = sets.length > 1;

  function run() {
    const raw = inp.value.trim();
    const words = norm(raw).split(/\s+/).filter(Boolean);
    list.innerHTML = "";
    if (!words.length) {
      info.textContent = `Durchsucht ${total} Fragen mit Antworten und Erklärungen. Gib einen Begriff ein.`;
      return;
    }
    const hits = index
      .map(it => ({ it, score: words.reduce((s, w) => s + (it.hay.includes(w) ? 1 : 0), 0) }))
      .filter(h => h.score === words.length)
      .slice(0, 60);
    info.textContent = hits.length
      ? `${hits.length === 60 ? "Mindestens 60" : hits.length} Treffer für „${raw}“`
      : `Keine Treffer für „${raw}“. Versuch ein anderes oder kürzeres Wort.`;
    hits.forEach(({ it }) => {
      const card = document.createElement("article");
      card.className = "lk-card";
      card.innerHTML =
        (multi ? `<span class="lk-set">${esc(it.set)}</span>` : "") +
        `<p class="lk-q">${mark(it.q.text, words)}</p>` +
        `<p class="lk-a"><span class="rv-tag">ANTWORT</span><span>${mark(it.right, words)}</span></p>` +
        (it.q.detail || it.q.explain ? `<p class="lk-e">${mark(it.q.detail || it.q.explain, words)}</p>` : "");
      list.appendChild(card);
    });
  }

  let t = null;
  inp.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 150); });
  const close = () => { modal.hidden = true; document.body.classList.remove("lk-open"); };
  modal.querySelector(".lk-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
  modal._open = () => {
    modal.hidden = false; document.body.classList.add("lk-open");
    run(); setTimeout(() => inp.focus(), 50);
  };
}

// sets: [{ name, questions }]; hosts: Elemente, vor deren Ende der Button kommt
export function mountLookup(sets, hosts) {
  if (!modal) build(sets);
  hosts.forEach(({ el, before }) => {
    if (!el) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn ghost lk-btn";
    b.textContent = "🔍  NACHSCHLAGEN";
    b.addEventListener("click", () => modal._open());
    if (before) el.insertBefore(b, before); else el.appendChild(b);
  });
}
