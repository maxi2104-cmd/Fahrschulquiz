// ===== Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7YxS-sQ8_q4HcwMTmGHs-8-D9Kw_xsSo",
  authDomain: "fahrschulquiz-d3576.firebaseapp.com",
  projectId: "fahrschulquiz-d3576",
  storageBucket: "fahrschulquiz-d3576.firebasestorage.app",
  messagingSenderId: "161076093479",
  appId: "1:161076093479:web:8b374c316075b6de486402"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ===== Einstellungen =====
export const SECONDS_PER_QUESTION = 20;
export const QUESTIONS_PER_GAME = 10;         // pro Spiel zufällig aus allen Fragen
export const MAX_POINTS_PER_QUESTION = 100;   // 10 Fragen = 1.000 Punkte

// ===== Fragen =====
// correct = Index der richtigen Antwort (0 = A, 1 = B, 2 = C, 3 = D)
export const QUESTIONS = [
  {
    title: "WIEVIELE METER?",
    text: "Wie nah darfst du an einer normalen Kreuzung ohne Radweg parken?",
    answers: ["3 Meter", "5 Meter", "10 Meter", "Egal — Hauptsache die Lücke passt"],
    correct: 1,
    explain: "Vor und hinter Kreuzungen und Einmündungen gilt bis 5 m ab dem Schnittpunkt der Fahrbahnkanten Parkverbot."
  },
  {
    title: "PROMILLE?",
    text: "Wie viel Promille sind in der Probezeit erlaubt?",
    answers: ["0,0 Promille", "0,3 Promille", "0,5 Promille", "Ein Radler geht immer"],
    correct: 0,
    explain: "In der Probezeit und unter 21 Jahren gilt das absolute Alkoholverbot."
  },
  {
    title: "WIE SCHNELL?",
    text: "Wie schnell darfst du innerorts ohne Verkehrszeichen höchstens fahren?",
    answers: ["30 km/h", "50 km/h", "60 km/h", "So schnell wie der Vordermann"],
    correct: 1,
    explain: "Die zulässige Höchstgeschwindigkeit innerorts beträgt 50 km/h."
  },
  {
    title: "WIE TIEF?",
    text: "Wie tief muss das Reifenprofil mindestens sein?",
    answers: ["1 mm", "1,6 mm", "3 mm", "Hauptsache rund"],
    correct: 1,
    explain: "Gesetzlich vorgeschrieben sind mindestens 1,6 mm. Empfohlen werden im Sommer 3 mm, im Winter 4 mm."
  },
  {
    title: "WIE LANGE?",
    text: "Wie lange dauert die Probezeit normalerweise?",
    answers: ["6 Monate", "1 Jahr", "2 Jahre", "Bis zum ersten Blitzer"],
    correct: 2,
    explain: "Die Probezeit dauert 2 Jahre. Bei schweren Verstößen verlängert sie sich auf 4 Jahre."
  },
  {
    title: "WIEVIEL ABSTAND?",
    text: "Welchen Seitenabstand brauchst du innerorts mindestens beim Überholen von Radfahrern?",
    answers: ["1 Meter", "1,5 Meter", "2 Meter", "Eine Handbreit"],
    correct: 1,
    explain: "Innerorts mindestens 1,5 m, außerorts mindestens 2 m."
  },
  {
    title: "WO LANG?",
    text: "Stau auf der Autobahn mit drei Fahrstreifen. Wo bildest du die Rettungsgasse?",
    answers: ["Ganz rechts auf dem Standstreifen", "Zwischen dem linken und dem mittleren Fahrstreifen", "Zwischen dem mittleren und dem rechten Fahrstreifen", "Erst wenn das Blaulicht kommt"],
    correct: 1,
    explain: "Die Rettungsgasse wird immer zwischen dem äußerst linken und dem rechts daneben liegenden Fahrstreifen gebildet, und zwar sofort bei Schrittgeschwindigkeit."
  },
  {
    title: "WIE WEIT?",
    text: "Wie weit stellst du auf einer Landstraße das Warndreieck ungefähr auf?",
    answers: ["10 Meter", "50 Meter", "100 Meter", "Direkt hinters Auto"],
    correct: 2,
    explain: "Faustregel: innerorts ca. 50 m, außerorts ca. 100 m, Autobahn mindestens 200 m."
  },
  {
    title: "WIEVIELE METER?",
    text: "Wie weit vor und hinter einem Haltestellenschild für Busse darfst du nicht parken?",
    answers: ["5 Meter", "10 Meter", "15 Meter", "Nur wenn der Bus schon da ist"],
    correct: 2,
    explain: "Vor und hinter Haltestellenschildern gilt jeweils bis 15 m Parkverbot."
  },
  {
    title: "WER ZUERST?",
    text: "Kreuzung ohne Verkehrszeichen und ohne Ampel. Wer hat Vorfahrt?",
    answers: ["Wer zuerst da ist", "Der Größere", "Wer von rechts kommt", "Wer lauter hupt"],
    correct: 2,
    explain: "Ohne Regelung gilt rechts vor links."
  },
  {
    title: "WIE WEIT?",
    text: "Faustformel: Wie lang ist der Reaktionsweg bei 50 km/h ungefähr?",
    answers: ["5 Meter", "15 Meter", "25 Meter", "Reaktion? Ich bin sofort da"],
    correct: 1,
    explain: "Reaktionsweg = (Geschwindigkeit : 10) × 3. Bei 50 km/h also 5 × 3 = 15 m."
  },
  {
    title: "WIE WEIT?",
    text: "Faustformel: Wie lang ist der normale Bremsweg bei 50 km/h?",
    answers: ["10 Meter", "25 Meter", "50 Meter", "Kommt aufs Radio an"],
    correct: 1,
    explain: "Bremsweg = (Geschwindigkeit : 10) × (Geschwindigkeit : 10). Bei 50 km/h also 5 × 5 = 25 m."
  },
  {
    title: "WIE WEIT?",
    text: "Wie lang ist der Anhalteweg bei 50 km/h nach der Faustformel?",
    answers: ["25 Meter", "30 Meter", "40 Meter", "Ein Autoparkplatz"],
    correct: 2,
    explain: "Anhalteweg = Reaktionsweg + Bremsweg: 15 m + 25 m = 40 m."
  },
  {
    title: "VOLLBREMSUNG!",
    text: "Gefahrbremsung aus 100 km/h: Wie lang ist der Bremsweg nach der Faustformel?",
    answers: ["50 Meter", "100 Meter", "150 Meter", "Mit ABS gar keiner"],
    correct: 0,
    explain: "Bei einer Gefahrbremsung halbiert sich der normale Bremsweg: (10 × 10) : 2 = 50 m."
  },
  {
    title: "WIEVIEL ABSTAND?",
    text: "Faustregel \"halber Tacho\": Welchen Abstand hältst du bei 100 km/h zum Vordermann?",
    answers: ["25 Meter", "50 Meter", "100 Meter", "Bis ich sein Kennzeichen lesen kann"],
    correct: 1,
    explain: "Halber Tacho in Metern: bei 100 km/h also 50 m Abstand."
  },
  {
    title: "WIE SCHNELL?",
    text: "Wie schnell darfst du mit dem Pkw außerorts ohne Verkehrszeichen höchstens fahren?",
    answers: ["80 km/h", "100 km/h", "120 km/h", "Bis der Motor brummt"],
    correct: 1,
    explain: "Für Pkw gilt außerorts eine Höchstgeschwindigkeit von 100 km/h."
  },
  {
    title: "WIE SCHNELL?",
    text: "Wie hoch ist die Richtgeschwindigkeit auf der Autobahn?",
    answers: ["100 km/h", "120 km/h", "130 km/h", "Richtig schnell"],
    correct: 2,
    explain: "Die Richtgeschwindigkeit beträgt 130 km/h. Sie ist eine Empfehlung, kein Limit."
  },
  {
    title: "WIE SCHNELL?",
    text: "Nebel mit weniger als 50 m Sichtweite: Wie schnell darfst du höchstens fahren?",
    answers: ["30 km/h", "50 km/h", "70 km/h", "Nebelscheinwerfer an und Vollgas"],
    correct: 1,
    explain: "Bei Sichtweite unter 50 m durch Nebel, Schnee oder Regen: höchstens 50 km/h, auch auf der Autobahn."
  },
  {
    title: "WIE SCHNELL?",
    text: "Mit Schneeketten darfst du höchstens fahren:",
    answers: ["30 km/h", "50 km/h", "80 km/h", "Mit Ketten ist alles erlaubt"],
    correct: 1,
    explain: "Mit Schneeketten gilt eine Höchstgeschwindigkeit von 50 km/h."
  },
  {
    title: "WIE SCHNELL?",
    text: "Pkw mit Anhänger außerorts ohne besondere Zulassung: Wie schnell darfst du höchstens fahren?",
    answers: ["60 km/h", "80 km/h", "100 km/h", "So schnell wie ohne Anhänger"],
    correct: 1,
    explain: "Mit Anhänger gilt außerorts 80 km/h, auch auf der Autobahn. Mit Tempo-100-Zulassung darf es auf Autobahn und Kraftfahrstraße mehr sein."
  },
  {
    title: "WIE SCHNELL?",
    text: "Wie schnell muss ein Fahrzeug bauartbedingt mindestens fahren können, um auf die Autobahn zu dürfen?",
    answers: ["Mehr als 40 km/h", "Mehr als 60 km/h", "Mehr als 80 km/h", "Egal, Hauptsache Warnblinker"],
    correct: 1,
    explain: "Autobahnen sind nur für Kraftfahrzeuge mit einer bauartbedingten Höchstgeschwindigkeit von mehr als 60 km/h."
  },
  {
    title: "WIE WEIT?",
    text: "Ab welcher Sichtweite durch Nebel darfst du die Nebelschlussleuchte einschalten?",
    answers: ["Unter 50 m", "Unter 100 m", "Unter 150 m", "Sobald es grau ist"],
    correct: 0,
    explain: "Die Nebelschlussleuchte darf nur bei Sichtweite unter 50 m durch Nebel eingeschaltet werden."
  },
  {
    title: "WIEVIELE METER?",
    text: "Wie weit stehen die Leitpfosten am Straßenrand normalerweise auseinander?",
    answers: ["25 Meter", "50 Meter", "100 Meter", "Die zählt doch keiner"],
    correct: 1,
    explain: "Leitpfosten stehen in der Regel alle 50 m. So kannst du Sichtweite und Abstand gut einschätzen."
  },
  {
    title: "WIEVIELE METER?",
    text: "Wie weit vor einem Andreaskreuz darfst du außerorts nicht parken?",
    answers: ["5 Meter", "15 Meter", "50 Meter", "Bis der Zug kommt"],
    correct: 2,
    explain: "Parkverbot vor und hinter Andreaskreuzen: innerorts bis 5 m, außerorts bis 50 m."
  },
  {
    title: "WIEVIELE METER?",
    text: "Wie weit vor einem Fußgängerüberweg (Zebrastreifen) darfst du nicht halten?",
    answers: ["3 Meter", "5 Meter", "10 Meter", "Nur wenn jemand drüber will"],
    correct: 1,
    explain: "Auf Fußgängerüberwegen und bis 5 m davor ist das Halten verboten."
  },
  {
    title: "WIE WEIT?",
    text: "Bake mit drei Streifen vor einem Bahnübergang: Wie weit ist es bis zum Übergang ungefähr?",
    answers: ["80 Meter", "160 Meter", "240 Meter", "Gleich um die Ecke"],
    correct: 2,
    explain: "Dreistreifige Bake ca. 240 m, zweistreifige ca. 160 m, einstreifige ca. 80 m vor dem Bahnübergang."
  },
  {
    title: "WIEVIELE PUNKTE?",
    text: "Bei wie vielen Punkten in Flensburg wird die Fahrerlaubnis entzogen?",
    answers: ["6 Punkte", "8 Punkte", "10 Punkte", "Punkte gibt's nur beim Quiz"],
    correct: 1,
    explain: "Ab 8 Punkten im Fahreignungsregister wird die Fahrerlaubnis entzogen."
  },
  {
    title: "PROMILLE?",
    text: "Nach der Probezeit und ab 21: Ab wie viel Promille ist Fahren auch ohne Ausfallerscheinungen eine Ordnungswidrigkeit?",
    answers: ["0,3 Promille", "0,5 Promille", "0,8 Promille", "Erst wenn's schwankt"],
    correct: 1,
    explain: "Ab 0,5 Promille ist es eine Ordnungswidrigkeit. Schon ab 0,3 Promille drohen Strafen, wenn Ausfallerscheinungen oder ein Unfall dazukommen."
  },
  {
    title: "WIE ALT?",
    text: "Bis wann brauchen Kinder im Auto eine Kindersitz-Rückhalteeinrichtung?",
    answers: ["Bis 8 Jahre oder 135 cm", "Bis 12 Jahre oder 150 cm", "Bis 14 Jahre oder 160 cm", "Bis sie nicht mehr quengeln"],
    correct: 1,
    explain: "Kinder unter 12 Jahren, die kleiner als 150 cm sind, brauchen eine geeignete Kinderrückhalteeinrichtung."
  },
  {
    title: "WIE SCHWER?",
    text: "Welche zulässige Gesamtmasse darf ein Fahrzeug der Klasse B höchstens haben?",
    answers: ["2.800 kg", "3.500 kg", "4.250 kg", "Solange es anspringt"],
    correct: 1,
    explain: "Klasse B gilt für Kraftfahrzeuge bis 3.500 kg zulässige Gesamtmasse."
  },
  {
    title: "WIEVIEL ABSTAND?",
    text: "Welchen Seitenabstand brauchst du außerorts mindestens beim Überholen von Radfahrern?",
    answers: ["1 Meter", "1,5 Meter", "2 Meter", "Kurz hupen reicht"],
    correct: 2,
    explain: "Außerorts mindestens 2 m, innerorts mindestens 1,5 m."
  }
];
