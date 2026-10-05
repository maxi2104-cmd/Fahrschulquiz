// ===== Statistik: zählt Geräte, auf denen die App auf dem Homescreen liegt =====
// Wird nur ausgeführt, wenn die App vom Homescreen geöffnet wurde (Vollbild-Modus).
// Pro Gerät ein Eintrag in „installs“ (zufällige Geräte-ID, keine Namen), höchstens einmal am Tag aktualisiert.
import { db } from "./config.js";
import { doc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ID = "ot_geraet", TAG = "ot_geraet_tag";
const ua = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

(async () => {
  if (!standalone) return;
  try {
    const heute = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(TAG) === heute) return;
    let id = localStorage.getItem(ID);
    const neu = !id;
    if (neu) {
      id = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)).replace(/-/g, "");
      localStorage.setItem(ID, id);
    }
    await setDoc(doc(db, "installs", id), {
      platform: isIOS ? "ios" : /Android/.test(ua) ? "android" : "desktop",
      last: serverTimestamp(),
      ...(neu ? { first: serverTimestamp() } : {})
    }, { merge: true });
    localStorage.setItem(TAG, heute);
  } catch (e) { console.warn(e); }
})();
