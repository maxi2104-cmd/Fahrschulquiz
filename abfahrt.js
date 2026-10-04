// ===== Abfahrtkontrolle als Checkliste (Stand wird auf dem Gerät gemerkt) =====
import { badgeEvent } from "./abzeichen.js";

// [Abschnitt, [[Punkt, Worauf achten?], …]]
const AUTO = [
  ["🚶 Rundgang ums Auto", [
    ["Reifen: Profil", "Mindestens 1,6 mm – empfohlen sind 3 mm (Sommer) bzw. 4 mm (Winter). Die Querstege im Profil zeigen die Grenze."],
    ["Reifen: Zustand & Druck", "Keine Beulen, Risse oder Fremdkörper. Den Druck regelmäßig bei kalten Reifen prüfen – die Werte stehen auf einem Aufkleber im Fahrzeug (z. B. an der Türsäule oder in der Klappe) und in der Betriebsanleitung."],
    ["Beleuchtung", "Abblendlicht, Fernlicht, Blinker vorn/hinten/seitlich, Brems-, Schluss- und Rückfahrlicht, Kennzeichenbeleuchtung. Bremslicht am besten mit einer zweiten Person oder an einer Spiegelung prüfen."],
    ["Scheiben, Spiegel & Kennzeichen", "Sauber und frei – im Winter komplett frei von Eis und Schnee, auch das Dach. Kennzeichen lesbar."],
    ["Unter dem Auto", "Keine Flüssigkeitsflecken auf dem Boden."],
    ["Ladekabel", "Abgesteckt und verstaut – nicht mit angestecktem Kabel losfahren."]
  ]],
  ["🔧 Unter der Fronthaube", [
    ["Scheibenwaschwasser", "Ausreichend gefüllt, im Winter mit Frostschutz."],
    ["Bremsflüssigkeit", "Stand zwischen MIN und MAX. Sinkt er, sofort in die Werkstatt."],
    ["Kühlmittel", "Auch ein E-Auto hat Kühlkreisläufe für Antrieb und Akku. Stand laut Betriebsanleitung prüfen, nur bei kaltem Fahrzeug öffnen."],
    ["Haube richtig zu", "Hörbar eingerastet."]
  ]],
  ["🪑 Im Auto", [
    ["Sitz, Lenkrad, Kopfstütze", "Pedale voll durchtreten können, Arme leicht angewinkelt am Lenkrad, Oberkante der Kopfstütze etwa auf Höhe des Kopfes."],
    ["Spiegel einstellen", "Innenspiegel: ganze Heckscheibe. Außenspiegel: eigenes Auto nur am Rand sichtbar."],
    ["Gurt anlegen", "Fest, ohne Verdrehung, Beckengurt tief über dem Becken – auch alle Mitfahrenden."],
    ["Kontrollleuchten nach dem Start", "Rote Leuchten müssen ausgehen. Leuchtet Rot weiter: nicht losfahren. Gelb: bald prüfen lassen."],
    ["Akkustand & Reichweite", "Reicht die Ladung für die Strecke – auch mit Heizung oder Klimaanlage?"],
    ["Bremse prüfen", "Pedal fest, nicht durchtretbar. Nach dem Losfahren kurz bei langsamer Fahrt bremsen."],
    ["Warnweste, Warndreieck, Verbandkasten", "Alles an Bord. Die Warnweste griffbereit im Fahrgastraum, Verbandkasten nicht abgelaufen."]
  ]]
];

const GESPANN = [
  ["🔗 Ankuppeln", [
    ["Kupplung eingerastet", "Kupplung sitzt fest auf dem Kugelkopf, Sicherung bzw. Anzeige zeigt „grün“ – zum Test leicht anheben."],
    ["Abreißseil", "Am Zugfahrzeug eingehängt (bei gebremsten Anhängern) und nicht zu straff."],
    ["Stecker", "Elektrischer Stecker fest eingesteckt, Kabel hängt nicht auf der Straße."],
    ["Stützrad & Stützen", "Stützrad ganz hochgekurbelt und gesichert, Stützen hochgeklappt."],
    ["Feststellbremse & Keile", "Handbremse am Anhänger gelöst, Unterlegkeile verstaut."]
  ]],
  ["💡 Licht & Anhänger", [
    ["Beleuchtung des Anhängers", "Schluss-, Brems- und Kennzeichenlicht, beide Blinker, Nebelschlussleuchte."],
    ["Reifen am Anhänger", "Profil und Druck – nach langer Standzeit oft zu wenig Luft."],
    ["Ladung", "Gleichmäßig verteilt, schwere Teile über der Achse, gut gesichert, nicht hecklastig."],
    ["Stützlast", "Zulässige Stützlast von Auto und Kupplung beachten (steht in den Papieren bzw. an der Kupplung)."],
    ["Planen, Klappen, Deckel", "Alles geschlossen und gesichert, nichts flattert."]
  ]],
  ["🚗 Am Zugfahrzeug", [
    ["Außenspiegel", "Du musst neben dem Anhänger nach hinten sehen können – sonst Zusatzspiegel."],
    ["Anhängelast", "Anhänger nicht schwerer als die zulässige Anhängelast des Autos."],
    ["Bremsprobe", "Kurz anfahren und bei Schrittgeschwindigkeit bremsen."]
  ]]
];

const KEY = "ot_abfahrt_v1";
let liste = "auto";
let haken = {};
try { haken = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { haken = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(haken)); } catch (e) {} };
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function render() {
  const data = liste === "auto" ? AUTO : GESPANN;
  let id = 0;
  $("ak-list").innerHTML = data.map(([titel, punkte]) => `
    <h2 class="lbl lb-title">${esc(titel)}</h2>
    <div class="ak-group">${punkte.map(([p, info]) => {
      const key = liste + ":" + (id++);
      return `<details class="ak-item${haken[key] ? " ok" : ""}">
        <summary><label class="ak-check" data-k="${key}"><input type="checkbox" ${haken[key] ? "checked" : ""} aria-label="${esc(p)} erledigt"><span></span></label><b>${esc(p)}</b><i aria-hidden="true">›</i></summary>
        <p>${esc(info)}</p>
      </details>`;
    }).join("")}</div>`).join("");
  fortschritt();
}

function fortschritt() {
  const data = liste === "auto" ? AUTO : GESPANN;
  const n = data.reduce((s, [, p]) => s + p.length, 0);
  const k = Object.keys(haken).filter(x => x.startsWith(liste + ":") && haken[x]).length;
  $("ak-count").textContent = `${k} von ${n}`;
  $("ak-bar").style.width = k / n * 100 + "%";
  $("ak-done").hidden = k < n;
  if (k === n) badgeEvent("abfahrt");
}

$("ak-list").addEventListener("click", (e) => {
  const lab = e.target.closest(".ak-check");
  if (!lab) return;
  e.preventDefault();   // Haken setzen, ohne die Erklärung auf- und zuzuklappen
  const key = lab.dataset.k; haken[key] = !haken[key]; save();
  lab.querySelector("input").checked = haken[key];
  lab.closest(".ak-item").classList.toggle("ok", haken[key]);
  fortschritt();
});
document.querySelector(".ak-tabs").addEventListener("click", (e) => {
  const b = e.target.closest(".rc-tab"); if (!b) return;
  liste = b.dataset.l;
  document.querySelectorAll(".ak-tabs .rc-tab").forEach(t => t.classList.toggle("on", t === b));
  render();
});
$("ak-reset").addEventListener("click", () => {
  Object.keys(haken).filter(x => x.startsWith(liste + ":")).forEach(x => delete haken[x]);
  save(); render();
});
render();
