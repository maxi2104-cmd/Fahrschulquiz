// ===== Push-Nachrichten: Freitags-Erinnerung an- und abmelden =====
import { app, db } from "./config.js";
import { getMessaging, getToken, deleteToken, isSupported }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { doc, setDoc, deleteDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// öffentlicher Web-Push-Schlüssel (Firebase → Einstellungen → Cloud Messaging)
const VAPID = "BJXlFdktDPxdsaduYXw8q8_8a69uf390XScpdIWwjDhE0Z7clConU-_jgxKkQXVytpVX1I9h8B7247p417zhNbk";
const KEY = "ot_push_token";

const ua = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

// Zustand: "an", "aus", "blockiert", "homescreen" (iPhone ohne Homescreen-App) oder "nicht"
export async function pushStatus() {
  if (isIOS && !standalone) return "homescreen";
  if (!("Notification" in window) || !("serviceWorker" in navigator) || !(await isSupported().catch(() => false))) return "nicht";
  if (Notification.permission === "denied") return "blockiert";
  return Notification.permission === "granted" && localStorage.getItem(KEY) ? "an" : "aus";
}

export async function pushAn() {
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return perm === "denied" ? "blockiert" : "aus";
  const reg = await navigator.serviceWorker.ready;
  const token = await getToken(getMessaging(app), { vapidKey: VAPID, serviceWorkerRegistration: reg });
  if (!token) throw new Error("Kein Push-Token erhalten");
  await setDoc(doc(db, "push", token), {
    token, topic: "freitag", platform: isIOS ? "ios" : /Android/.test(ua) ? "android" : "desktop", created: serverTimestamp()
  });
  localStorage.setItem(KEY, token);
  return "an";
}

export async function pushAus() {
  const token = localStorage.getItem(KEY);
  try { if (token) await deleteDoc(doc(db, "push", token)); } catch (e) { console.warn(e); }
  try { await deleteToken(getMessaging(app)); } catch (e) { console.warn(e); }
  localStorage.removeItem(KEY);
  return "aus";
}

// Kasten „Freitags-Erinnerung“ in ein Element zeichnen
export async function mountPushCard(box) {
  const texte = {
    an: ["🔔 Erinnerung ist an", "Du bekommst jeden Freitag eine Nachricht, sobald das neue Quiz online ist.", "AUSSCHALTEN"],
    aus: ["🔔 Freitags-Erinnerung", "Lass dich benachrichtigen, sobald jeden Freitag das neue Quiz online ist.", "ERINNERUNG EINSCHALTEN"],
    blockiert: ["🔕 Benachrichtigungen blockiert", "Erlaube Benachrichtigungen für diese Seite in den Einstellungen deines Browsers bzw. Handys.", ""],
    homescreen: ["🔔 Freitags-Erinnerung", "Auf dem iPhone geht das nur mit der App auf dem Homescreen: Startseite → „Zum Homescreen hinzufügen“, dann die App von dort öffnen und hier einschalten.", ""]
  };
  async function zeichnen(st) {
    if (st === "nicht" || !texte[st]) { box.hidden = true; return; }
    const [t, p, b] = texte[st];
    box.hidden = false;
    box.className = "push-card" + (st === "an" ? " on" : "");
    box.innerHTML = `<b>${t}</b><p>${p}</p>${b ? `<button type="button" class="btn ${st === "an" ? "ghost" : ""}">${b}</button>` : ""}`;
    const btn = box.querySelector("button");
    if (btn) btn.onclick = async () => {
      btn.disabled = true; btn.textContent = "EINEN MOMENT …";
      try { zeichnen(st === "an" ? await pushAus() : await pushAn()); }
      catch (e) { console.warn(e); box.querySelector("p").textContent = "Das hat nicht geklappt. Versuch es später noch einmal."; btn.disabled = false; btn.textContent = b; }
    };
  }
  zeichnen(await pushStatus());
}

// Kachel auf der Startseite (nur in der Homescreen-App): Benachrichtigungen an/aus
export async function mountPushTile(btn, lbl) {
  const texte = {
    an: "BENACH&shy;RICHTI&shy;GUNGEN AN ✓",
    aus: "BENACH&shy;RICHTI&shy;GUNGEN EIN&shy;SCHALTEN",
    blockiert: "BENACH&shy;RICHTI&shy;GUNGEN BLOCKIERT"
  };
  let st = await pushStatus();
  if (!texte[st]) return false;
  const zeichnen = () => { lbl.innerHTML = texte[st]; btn.disabled = false; btn.classList.toggle("ghost", st === "an"); };
  zeichnen();
  btn.addEventListener("click", async () => {
    if (st === "blockiert") { alert("Benachrichtigungen sind für die App blockiert. Du kannst sie in den Einstellungen deines Handys bei „On Track“ wieder erlauben."); return; }
    if (st === "an" && !confirm("Benachrichtigungen ausschalten? Du bekommst dann keine Erinnerung an die Freitags Frage und keine News mehr.")) return;
    btn.disabled = true; lbl.textContent = "EINEN MOMENT …";
    try { st = st === "an" ? await pushAus() : await pushAn(); }
    catch (err) { console.warn(err); alert("Das hat nicht geklappt. Versuch es später noch einmal."); }
    zeichnen();
  });
  return true;
}
