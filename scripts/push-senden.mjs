// Versendet die Freitags-Push-Nachricht an alle angemeldeten Geräte (Firestore-Sammlung „push“).
// Läuft als GitHub Action (.github/workflows/freitag-push.yml):
//   – automatisch freitags: nur wenn heute ein neues Quiz automatisch gestartet ist und noch nicht verschickt wurde
//   – von Hand (workflow_dispatch): mit eigenem Titel/Text an alle
import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!sa) { console.error("Secret FIREBASE_SERVICE_ACCOUNT fehlt."); process.exit(1); }
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(sa)) });
const db = admin.firestore();

// gleiche Logik wie in der App: welches Quiz ist aktiv?
const src = readFileSync(new URL("../freitag-wochen.js", import.meta.url), "utf8");
const { freitagsStand } = await import("data:text/javascript;charset=utf-8," + encodeURIComponent(src));

const pad = (n) => String(n).padStart(2, "0");
const heuteBerlin = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });
const manuellTitel = (process.env.TITEL || "").trim(), manuellText = (process.env.TEXT || "").trim();

let titel, text, link = "freitag.html", runde = null;
if (manuellTitel || manuellText) {
  titel = manuellTitel || "On Track"; text = manuellText;
  link = (process.env.LINK || "").trim() || "index.html";
} else {
  const cfg = (await db.doc("config/current").get()).data() || {};
  const st = freitagsStand(cfg, new Date());
  if (st.mode !== "auto") { console.log("Handbetrieb – kein automatischer Versand."); process.exit(0); }
  if (!st.week || st.week.datum !== heuteBerlin) { console.log("Heute ist kein neues Quiz gestartet:", st.week && st.week.datum, heuteBerlin); process.exit(0); }
  const log = (await db.doc("config/pushlog").get()).data() || {};
  if (log.lastRound === st.round) { console.log("Für", st.round, "wurde schon verschickt."); process.exit(0); }
  runde = st.round;
  titel = `🚦 Freitags Frage #${pad(st.week.nr)} ist online!`;
  text = `${st.week.thema} – 10 Fragen, neues Wochen-Ranking. Holst du dir Platz 1?`;
}

const snap = await db.collection("push").get();
const tokens = snap.docs.map(d => d.id);
console.log(`${tokens.length} Geräte, Nachricht: ${titel} – ${text}`);
let ok = 0, weg = 0;
for (let i = 0; i < tokens.length; i += 500) {
  const teil = tokens.slice(i, i + 500);
  const res = await admin.messaging().sendEachForMulticast({
    tokens: teil,
    data: { title: titel, body: text, link, tag: runde || "ontrack" },
    webpush: { fcmOptions: { link: "https://maxi2104-cmd.github.io/Fahrschulquiz/" + link }, headers: { Urgency: "high", TTL: "86400" } }
  });
  ok += res.successCount;
  // abgemeldete oder ungültige Geräte aufräumen
  await Promise.all(res.responses.map((r, k) => {
    const code = r.error && r.error.code;
    if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token" || code === "messaging/invalid-argument") {
      weg++; return db.doc("push/" + teil[k]).delete();
    }
  }));
}
console.log(`Zugestellt: ${ok}, entfernt: ${weg}`);
if (runde) await db.doc("config/pushlog").set({ lastRound: runde, sentAt: new Date().toISOString(), count: ok });
