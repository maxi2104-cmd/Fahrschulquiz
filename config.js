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
  }
];
