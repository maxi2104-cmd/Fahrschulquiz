// ===== Rechner im Anhänger Quiz: Tempo 100 und Führerscheinklasse =====
// Rechtsstand: 9. Ausnahmeverordnung zur StVO (Tempo 100), FeV (Klassen B, B96, BE)

const fmt = (n) => Math.round(n).toLocaleString("de-DE");
const num = (el) => {
  const v = parseFloat(String(el.value).replace(/\./g, "").replace(",", "."));
  return isFinite(v) && v > 0 ? v : null;
};

let modal = null;

const HTML = `
<div class="lk-panel rc-panel" role="dialog" aria-modal="true" aria-label="Rechner">
  <div class="lk-head">
    <span class="lk-h">ANHÄNGERRECHNER</span>
    <button type="button" class="lk-close" aria-label="Schließen">✕</button>
  </div>
  <div class="rc-tabs" role="tablist">
    <button type="button" class="rc-tab on" data-t="klasse" role="tab">WELCHE KLASSE?</button>
    <button type="button" class="rc-tab" data-t="t100" role="tab">TEMPO 100?</button>
  </div>
  <div class="lk-list rc-body">

    <section class="rc-sec" data-s="klasse">
      <p class="rc-hint">Trag die <b>zulässigen Gesamtmassen</b> aus den Fahrzeugpapieren ein (Feld F.2), nicht das tatsächliche Gewicht.</p>
      <label class="rc-l">Zugfahrzeug: zulässige Gesamtmasse (kg)
        <input class="inp rc-i" id="k-zug" inputmode="numeric" placeholder="z. B. 2.200"></label>
      <label class="rc-l">Anhänger: zulässige Gesamtmasse (kg)
        <input class="inp rc-i" id="k-anh" inputmode="numeric" placeholder="leer lassen = ohne Anhänger"></label>
      <div class="rc-out" id="k-out" aria-live="polite"></div>
    </section>

    <section class="rc-sec" data-s="t100" hidden>
      <p class="rc-hint">Gilt für Pkw mit Anhänger auf Autobahnen und Kraftfahrstraßen.</p>
      <label class="rc-l">Zugfahrzeug: Leermasse (kg)
        <input class="inp rc-i" id="t-leer" inputmode="numeric" placeholder="z. B. 1.650"></label>
      <label class="rc-l">Zugfahrzeug: zulässige Gesamtmasse (kg)
        <input class="inp rc-i" id="t-zgm" inputmode="numeric" placeholder="z. B. 2.200"></label>
      <label class="rc-l">Zugfahrzeug: zulässige Anhängelast gebremst (kg)
        <input class="inp rc-i" id="t-last" inputmode="numeric" placeholder="aus dem Fahrzeugschein, Feld O.1"></label>
      <label class="rc-l">Anhänger: zulässige Gesamtmasse (kg)
        <input class="inp rc-i" id="t-anh" inputmode="numeric" placeholder="z. B. 1.300"></label>
      <label class="rc-l">Art des Anhängers
        <select class="inp rc-i" id="t-art">
          <option value="ub">Ungebremst</option>
          <option value="go">Gebremst, ohne hydraulische Stoßdämpfer</option>
          <option value="gd" selected>Gebremst, mit hydraulischen Stoßdämpfern</option>
          <option value="wd">Wohnanhänger, gebremst, mit hydraulischen Stoßdämpfern</option>
        </select></label>
      <label class="rc-c"><input type="checkbox" id="t-stab"> Stabilisierungseinrichtung (Anti-Schlinger-Kupplung nach ISO 11555-1) oder Anhänger-Stabilisierung am Zugfahrzeug</label>
      <label class="rc-c"><input type="checkbox" id="t-abs" checked> Zugfahrzeug hat ABS</label>
      <label class="rc-c"><input type="checkbox" id="t-plak"> Tempo-100-Plakette am Anhänger (gesiegelt, in den Papieren eingetragen)</label>
      <label class="rc-c"><input type="checkbox" id="t-reif"> Anhänger-Reifen jünger als 6 Jahre und mindestens Geschwindigkeitsindex L</label>
      <div class="rc-out" id="t-out" aria-live="polite"></div>
    </section>

    <p class="rc-foot">Ohne Gewähr. Maßgeblich sind die Fahrzeugpapiere und die geltenden Vorschriften. Im Zweifel: Frag deinen Fahrlehrer.</p>
  </div>
</div>`;

function box(kind, title, lines) {
  return `<div class="rc-res ${kind}"><b>${title}</b>${lines.map(l => `<p>${l}</p>`).join("")}</div>`;
}

// ---------- Welche Führerscheinklasse? ----------
function klasse() {
  const zug = num(modal.querySelector("#k-zug"));
  const anh = num(modal.querySelector("#k-anh"));
  const out = modal.querySelector("#k-out");
  if (!zug) { out.innerHTML = ""; return; }

  if (zug > 3500) {
    out.innerHTML = box("bad", "Klasse B reicht nicht", [
      `Das Zugfahrzeug hat ${fmt(zug)} kg zulässige Gesamtmasse – mehr als 3.500 kg.`,
      "Dafür brauchst du mindestens Klasse C1 (bis 7.500 kg), mit Anhänger über 750 kg C1E."]);
    return;
  }
  if (!anh || anh <= 750) {
    out.innerHTML = box("ok", "Klasse B", [
      anh ? `Anhänger bis 750 kg (${fmt(anh)} kg) darfst du mit Klasse B immer ziehen.` : "Ohne Anhänger: Klasse B.",
      "Die Anhängelast laut Fahrzeugschein muss trotzdem eingehalten werden."]);
    return;
  }
  const sum = zug + anh;
  const calc = `${fmt(zug)} kg + ${fmt(anh)} kg = <b>${fmt(sum)} kg</b>`;
  if (sum <= 3500) {
    out.innerHTML = box("ok", "Klasse B", [calc, "Die Kombination bleibt bei höchstens 3.500 kg – dafür reicht Klasse B."]);
  } else if (sum <= 4250) {
    out.innerHTML = box("mid", "Klasse B96", [calc,
      "Über 3.500 kg, aber höchstens 4.250 kg: Dafür brauchst du die Schlüsselzahl 96.",
      "B96 gibt es mit Schulung in der Fahrschule, ohne Prüfung. Alternativ geht auch BE."]);
  } else if (anh <= 3500) {
    out.innerHTML = box("mid", "Klasse BE", [calc,
      "Über 4.250 kg: Mit B oder B96 geht das nicht mehr.",
      `Der Anhänger hat ${fmt(anh)} kg – mit Klasse BE darfst du Anhänger bis 3.500 kg ziehen.`]);
  } else {
    out.innerHTML = box("bad", "BE reicht nicht", [calc,
      `Der Anhänger hat ${fmt(anh)} kg – mehr als 3.500 kg.`,
      "Dafür brauchst du Klasse C1E (Kombination bis 12.000 kg)."]);
  }
}

// ---------- Tempo 100 mit Anhänger? ----------
function tempo100() {
  const q = (id) => modal.querySelector(id);
  const leer = num(q("#t-leer")), zgm = num(q("#t-zgm")), last = num(q("#t-last")), anh = num(q("#t-anh"));
  const art = q("#t-art").value, stab = q("#t-stab").checked;
  const out = q("#t-out");
  q("#t-stab").disabled = (art === "ub" || art === "go");
  if (!leer || !anh) { out.innerHTML = ""; return; }

  let x;
  if (art === "ub" || art === "go") x = 0.3;
  else if (art === "wd") x = stab ? 1.0 : 0.8;
  else x = stab ? 1.2 : 1.1;

  const max = leer * x;
  const minLeer = anh / x;
  const fehler = [], ok = [];

  if (anh <= max) ok.push(`Masseverhältnis: ${fmt(anh)} kg ≤ ${x.toLocaleString("de-DE")} × ${fmt(leer)} kg = ${fmt(max)} kg ✓`);
  else fehler.push(`Masseverhältnis: Der Anhänger darf höchstens ${x.toLocaleString("de-DE")} × ${fmt(leer)} kg = <b>${fmt(max)} kg</b> haben, hat aber ${fmt(anh)} kg. Das Zugfahrzeug müsste mindestens <b>${fmt(Math.ceil(minLeer))} kg</b> Leermasse haben.`);

  if (zgm && zgm > 3500) fehler.push("Das Zugfahrzeug darf höchstens 3.500 kg zulässige Gesamtmasse haben.");
  if (last && anh > last) fehler.push(`Der Anhänger ist schwerer als die zulässige Anhängelast (${fmt(last)} kg) – so darfst du gar nicht fahren.`);
  if (!q("#t-abs").checked) fehler.push("Das Zugfahrzeug braucht ABS.");
  if (!q("#t-plak").checked) fehler.push("Am Anhänger fehlt die gesiegelte Tempo-100-Plakette.");
  if (!q("#t-reif").checked) fehler.push("Die Reifen des Anhängers müssen jünger als 6 Jahre sein und mindestens Index L (120 km/h) haben.");
  if (!zgm) ok.push("Tipp: Trag auch die zulässige Gesamtmasse des Zugfahrzeugs ein, dann prüfe ich alles.");

  if (!fehler.length) {
    out.innerHTML = box("ok", "Ja – 100 km/h erlaubt", [...ok, "Gilt auf Autobahnen und Kraftfahrstraßen, wenn Verkehr, Wetter und Sicht es zulassen."]);
  } else {
    const ueber = last && anh > last;
    out.innerHTML = box("bad", ueber ? "Nein – Anhängelast überschritten" : "Nein – höchstens 80 km/h", [...fehler, ...ok.filter(t => t.endsWith("✓"))]);
  }
}

function build() {
  modal = document.createElement("div");
  modal.className = "lk-overlay";
  modal.hidden = true;
  modal.innerHTML = HTML;
  document.body.appendChild(modal);

  const close = () => { modal.hidden = true; document.body.classList.remove("lk-open"); };
  modal.querySelector(".lk-close").onclick = close;
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  modal.querySelectorAll(".rc-tab").forEach(t => t.addEventListener("click", () => {
    modal.querySelectorAll(".rc-tab").forEach(o => o.classList.toggle("on", o === t));
    modal.querySelectorAll(".rc-sec").forEach(s => s.hidden = s.dataset.s !== t.dataset.t);
  }));
  modal.querySelectorAll('[data-s="klasse"] input').forEach(i => i.addEventListener("input", klasse));
  modal.querySelectorAll('[data-s="t100"] input, [data-s="t100"] select').forEach(i => {
    i.addEventListener("input", tempo100); i.addEventListener("change", tempo100);
  });
  tempo100();

  modal._open = (tab) => {
    if (tab) modal.querySelector(`.rc-tab[data-t="${tab}"]`).click();
    modal.hidden = false; document.body.classList.add("lk-open");
  };
}

export function mountRechner(hosts) {
  if (!modal) build();
  hosts.forEach(({ el, before }) => {
    if (!el) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn ghost lk-btn";
    b.textContent = "🧮  RECHNER: KLASSE & TEMPO 100";
    b.addEventListener("click", () => modal._open());
    if (before) el.insertBefore(b, before); else el.appendChild(b);
  });
}

export function openRechner(tab) {
  if (!modal) build();
  modal._open(tab);
}
