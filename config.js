// ===== Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { PAEDAGOGIK_QUESTIONS, VERKEHRSRECHT_QUESTIONS, FAHRERLAUBNISRECHT_QUESTIONS, FB_TECHNIK_QUESTIONS } from "./fortbildung-fragen.js";

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
  },
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Verkehrszeichen?", "answers": ["Halt! Vorfahrt gewähren nur nachts", "Vorfahrtstraße", "Vorfahrt gewähren", "Gefahrstelle"], "correct": 2, "explain": "Das auf der Spitze stehende Dreieck bedeutet: Vorfahrt gewähren.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><path d=\"M100 175 L12 22 H188 Z\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"18\" stroke-linejoin=\"round\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was musst du bei diesem Zeichen tun?", "answers": ["Nur bei Gegenverkehr anhalten", "Anhalten, auch wenn frei ist, und Vorfahrt gewähren", "Nur bremsbereit sein", "Schrittgeschwindigkeit fahren"], "correct": 1, "explain": "Beim STOP-Schild musst du immer anhalten, auch wenn die Kreuzung frei ist, und dann Vorfahrt gewähren.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><polygon points=\"178.5,132.5 132.5,178.5 67.5,178.5 21.5,132.5 21.5,67.5 67.5,21.5 132.5,21.5 178.5,67.5\" fill=\"#d32f2f\" stroke=\"#ffffff\" stroke-width=\"5\"/><text x=\"100\" y=\"118\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"50\" fill=\"#ffffff\">STOP</text></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Zeichen?", "answers": ["Vorfahrt an der nächsten Kreuzung", "Vorfahrt gewähren", "Ende der Vorfahrtstraße", "Vorfahrtstraße"], "correct": 3, "explain": "Die gelbe Raute zeigt die Vorfahrtstraße an. Sie gilt bis zum nächsten „Vorfahrt gewähren“, „STOP“ oder bis zum Ende-Zeichen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"38\" y=\"38\" width=\"124\" height=\"124\" transform=\"rotate(45 100 100)\" fill=\"#ffffff\" stroke=\"#1a1e27\" stroke-width=\"3\"/><rect x=\"58\" y=\"58\" width=\"84\" height=\"84\" transform=\"rotate(45 100 100)\" fill=\"#f9c623\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was zeigt dieses Zeichen an?", "answers": ["Ende der Vorfahrtstraße", "Vorfahrt gewähren", "Vorfahrtstraße beginnt", "Parkplatz"], "correct": 0, "explain": "Die durchgestrichene gelbe Raute bedeutet: Ende der Vorfahrtstraße.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"38\" y=\"38\" width=\"124\" height=\"124\" transform=\"rotate(45 100 100)\" fill=\"#ffffff\" stroke=\"#1a1e27\" stroke-width=\"3\"/><rect x=\"58\" y=\"58\" width=\"84\" height=\"84\" transform=\"rotate(45 100 100)\" fill=\"#f9c623\"/><line x1=\"40\" y1=\"160\" x2=\"160\" y2=\"40\" stroke=\"#1a1e27\" stroke-width=\"10\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Gefahrzeichen?", "answers": ["Vorfahrt an der nächsten Kreuzung oder Einmündung", "Kreuzung mit Vorfahrt von rechts", "Kirche", "Krankenhaus"], "correct": 0, "explain": "Das Gefahrzeichen mit dem breiten senkrechten Balken kündigt an: An der nächsten Kreuzung oder Einmündung hast du Vorfahrt.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><path d=\"M100 22 L188 175 H12 Z\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"16\" stroke-linejoin=\"round\"/><rect x=\"94\" y=\"72\" width=\"12\" height=\"80\" fill=\"#1a1e27\"/><rect x=\"64\" y=\"104\" width=\"72\" height=\"11\" fill=\"#1a1e27\"/><path d=\"M100 58 L114 80 H86 Z\" fill=\"#1a1e27\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was kündigt dieses Gefahrzeichen an?", "answers": ["Vorfahrtstraße", "Andreaskreuz", "Ende aller Verbote", "Kreuzung mit Vorfahrt von rechts"], "correct": 3, "explain": "Das schräge Kreuz im Dreieck weist auf eine Kreuzung hin, an der „rechts vor links“ gilt. Bremsbereit sein und Geschwindigkeit vermindern.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><path d=\"M100 22 L188 175 H12 Z\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"16\" stroke-linejoin=\"round\"/><path d=\"M64 140 L136 76 M64 76 L136 140\" stroke=\"#1a1e27\" stroke-width=\"12\"/></svg>"},
  {"title": "GEFAHRZEICHEN", "text": "Wie weit vor der Gefahrstelle stehen Gefahrzeichen außerorts meistens?", "answers": ["Etwa 10 bis 20 m", "Etwa 50 m", "Etwa 150 bis 250 m", "Etwa 1 km"], "correct": 2, "explain": "Außerorts stehen Gefahrzeichen wegen der höheren Geschwindigkeit meist etwa 150 bis 250 m vor der Gefahrstelle.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><path d=\"M100 22 L188 175 H12 Z\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"16\" stroke-linejoin=\"round\"/><rect x=\"92\" y=\"70\" width=\"16\" height=\"58\" rx=\"6\" fill=\"#1a1e27\"/><circle cx=\"100\" cy=\"146\" r=\"10\" fill=\"#1a1e27\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Zeichen?", "answers": ["Halteverbot", "Ende aller Streckenverbote", "Verbot für Fahrzeuge aller Art", "Verbot der Einfahrt"], "correct": 2, "explain": "Der weiße Kreis mit rotem Rand bedeutet: Verbot für Fahrzeuge aller Art.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"86\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"18\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Zeichen?", "answers": ["Verbot für Fahrzeuge aller Art", "Absolutes Haltverbot", "Sackgasse", "Verbot der Einfahrt"], "correct": 3, "explain": "Der rote Kreis mit weißem Balken bedeutet: Verbot der Einfahrt – typisch am Ende einer Einbahnstraße.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"90\" fill=\"#d32f2f\"/><rect x=\"34\" y=\"88\" width=\"132\" height=\"24\" fill=\"#ffffff\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was ist bei diesem Zeichen verboten?", "answers": ["Nichts, es ist ein Hinweis", "Halten und Parken", "Nur Parken", "Nur Halten bis 3 Minuten"], "correct": 1, "explain": "Absolutes Haltverbot: Hier darfst du weder halten noch parken.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"86\" fill=\"#1565c0\" stroke=\"#d32f2f\" stroke-width=\"18\"/><path d=\"M45 45 L155 155 M155 45 L45 155\" stroke=\"#d32f2f\" stroke-width=\"18\"/></svg>"},
  {"title": "WIE LANGE HALTEN?", "text": "Eingeschränktes Haltverbot: Wie lange darfst du hier höchstens halten?", "answers": ["Gar nicht", "Bis zu 3 Minuten", "Bis zu 1 Stunde", "Bis zu 10 Minuten"], "correct": 1, "explain": "Beim eingeschränkten Haltverbot ist Halten bis zu 3 Minuten erlaubt, Parken nicht.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"86\" fill=\"#1565c0\" stroke=\"#d32f2f\" stroke-width=\"18\"/><path d=\"M45 45 L155 155\" stroke=\"#d32f2f\" stroke-width=\"18\"/></svg>"},
  {"title": "HALTEN ODER PARKEN?", "text": "Ab wann wird aus Halten Parken?", "answers": ["Erst ab 10 Minuten", "Nur wenn du den Motor ausschaltest", "Wenn es länger als 3 Minuten dauert oder du dein Fahrzeug verlässt", "Ab 1 Minute"], "correct": 2, "explain": "Halten wird zum Parken, wenn es länger als 3 Minuten dauert oder der Fahrer sein Fahrzeug verlässt."},
  {"title": "ZEICHEN VERDECKT?", "text": "Wie viel Abstand musst du beim Halten zu einem STOP-Schild mindestens lassen, wenn dein Auto es sonst verdecken würde?", "answers": ["5 m", "3 m", "15 m", "10 m"], "correct": 3, "explain": "Würde dein Fahrzeug Ampeln, „Vorfahrt gewähren“, „STOP“ oder ein Andreaskreuz verdecken, gilt Haltverbot bis zu 10 m davor.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><polygon points=\"178.5,132.5 132.5,178.5 67.5,178.5 21.5,132.5 21.5,67.5 67.5,21.5 132.5,21.5 178.5,67.5\" fill=\"#d32f2f\" stroke=\"#ffffff\" stroke-width=\"5\"/><text x=\"100\" y=\"118\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"50\" fill=\"#ffffff\">STOP</text></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was bedeutet dieses Zeichen?", "answers": ["Vorfahrt gewähren", "Andreaskreuz: Bahnübergang, Züge haben Vorrang", "Gefahrstelle", "Kreuzung"], "correct": 1, "explain": "Das Andreaskreuz steht direkt vor einem Bahnübergang. Schienenfahrzeuge haben Vorrang.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><g transform=\"rotate(45 100 100)\"><rect x=\"88\" y=\"10\" width=\"24\" height=\"180\" fill=\"#d32f2f\" stroke=\"#1a1e27\" stroke-width=\"2\"/><rect x=\"10\" y=\"88\" width=\"180\" height=\"24\" fill=\"#d32f2f\" stroke=\"#1a1e27\" stroke-width=\"2\"/><rect x=\"92\" y=\"40\" width=\"16\" height=\"20\" fill=\"#ffffff\"/><rect x=\"92\" y=\"140\" width=\"16\" height=\"20\" fill=\"#ffffff\"/><rect x=\"40\" y=\"92\" width=\"20\" height=\"16\" fill=\"#ffffff\"/><rect x=\"140\" y=\"92\" width=\"20\" height=\"16\" fill=\"#ffffff\"/></g></svg>"},
  {"title": "ORTSTAFEL", "text": "Du passierst diese Ortstafel mit dem Pkw. Wie schnell darfst du ab hier ohne weitere Zeichen höchstens fahren?", "answers": ["100 km/h", "130 km/h", "70 km/h", "50 km/h"], "correct": 0, "explain": "Die durchgestrichene Ortstafel bedeutet: Ende der geschlossenen Ortschaft. Für Pkw gilt außerorts in der Regel 100 km/h.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\" role=\"img\"><rect x=\"10\" y=\"50\" width=\"280\" height=\"100\" rx=\"8\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"5\"/><text x=\"150\" y=\"115\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"38\" fill=\"#1a1e27\">OELSTORF</text><line x1=\"20\" y1=\"140\" x2=\"280\" y2=\"60\" stroke=\"#d32f2f\" stroke-width=\"12\"/></svg>"},
  {"title": "ZONE 30?", "text": "Wie schnell darfst du in diesem Bereich höchstens fahren?", "answers": ["Schrittgeschwindigkeit", "30 km/h, aber nur tagsüber", "30 km/h", "50 km/h"], "correct": 2, "explain": "In der Tempo-30-Zone gilt eine Höchstgeschwindigkeit von 30 km/h.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"20\" y=\"10\" width=\"160\" height=\"180\" rx=\"10\" fill=\"#ffffff\" stroke=\"#1a1e27\" stroke-width=\"4\"/><circle cx=\"100\" cy=\"82\" r=\"58\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"13\"/><text x=\"100\" y=\"104\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"58\" fill=\"#1a1e27\">30</text><text x=\"100\" y=\"172\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"36\" fill=\"#1a1e27\">ZONE</text></svg>"},
  {"title": "MINDESTTEMPO", "text": "Was schreibt dieses blaue Zeichen vor?", "answers": ["Mindestens 60 km/h, außer Verkehr, Wetter oder Sicht zwingen zu langsamer", "Nur Fahrzeuge über 60 km/h dürfen hier fahren", "Höchstens 60 km/h", "Empfohlen 60 km/h"], "correct": 0, "explain": "Das blaue runde Zeichen schreibt eine Mindestgeschwindigkeit vor. Bei dichtem Verkehr, Wetter oder schlechter Sicht musst du trotzdem langsamer fahren.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"90\" fill=\"#1565c0\"/><text x=\"100\" y=\"126\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"78\" fill=\"#ffffff\">60</text></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was schreibt dieses Zeichen vor?", "answers": ["Rechts vorbeifahren", "Einbahnstraße", "Rechts abbiegen", "Sackgasse"], "correct": 0, "explain": "Der blaue Kreis mit schrägem Pfeil nach rechts unten schreibt vor: rechts vorbeifahren.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><circle cx=\"100\" cy=\"100\" r=\"90\" fill=\"#1565c0\"/><path d=\"M70 60 L130 120\" stroke=\"#ffffff\" stroke-width=\"16\"/><path d=\"M146 136 L104 136 L146 94 Z\" fill=\"#ffffff\"/></svg>"},
  {"title": "ÜBERHOLVERBOT", "text": "Was bedeutet das Zusatzzeichen „200 m“ unter dem Überholverbot?", "answers": ["Das Überholverbot gilt nur 200 m", "Das Überholverbot beginnt in 200 m", "Das Überholverbot endet nach 200 m", "Überholen nur mit 200 m Abstand"], "correct": 1, "explain": "Eine einfache Entfernungsangabe bedeutet: Das Verbot beginnt nach dieser Strecke. Pfeile würden die Länge der Strecke angeben.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 270\" role=\"img\"><g><circle cx=\"100\" cy=\"100\" r=\"86\" fill=\"#ffffff\" stroke=\"#d32f2f\" stroke-width=\"18\"/><g transform=\"translate(76 100) scale(1.1)\"><rect x=\"-14\" y=\"-24\" width=\"28\" height=\"48\" rx=\"7\" fill=\"#d32f2f\"/><rect x=\"-10\" y=\"-14\" width=\"20\" height=\"10\" rx=\"2\" fill=\"#e6edf3\" opacity=\".9\"/></g><g transform=\"translate(124 100) scale(1.1)\"><rect x=\"-14\" y=\"-24\" width=\"28\" height=\"48\" rx=\"7\" fill=\"#1a1e27\"/><rect x=\"-10\" y=\"-14\" width=\"20\" height=\"10\" rx=\"2\" fill=\"#e6edf3\" opacity=\".9\"/></g></g><rect x=\"25\" y=\"205\" width=\"150\" height=\"58\" rx=\"6\" fill=\"#ffffff\" stroke=\"#1a1e27\" stroke-width=\"4\"/><text x=\"100\" y=\"246\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"34\" fill=\"#1a1e27\">200 m</text></svg>"},
  {"title": "SCHRITTTEMPO", "text": "Wie schnell ist Schrittgeschwindigkeit ungefähr?", "answers": ["20 km/h", "2 bis 3 km/h", "10 bis 15 km/h", "5 bis 8 km/h"], "correct": 3, "explain": "Schrittgeschwindigkeit bedeutet etwa 5 bis 8 km/h."},
  {"title": "BUS MIT WARNBLINKER", "text": "Ein Linienbus hält mit Warnblinklicht an der Haltestelle. Wie darfst du vorbeifahren?", "answers": ["Mit 30 km/h", "Normal, aber hupen", "Gar nicht", "Nur mit Schrittgeschwindigkeit und ausreichendem Abstand"], "correct": 3, "explain": "Hält ein Bus mit Warnblinklicht, darfst du nur mit Schrittgeschwindigkeit (5–8 km/h) und so großem Abstand vorbeifahren, dass Fahrgäste nicht gefährdet werden."},
  {"title": "GELBE AMPEL", "text": "Du fährst mit 50 km/h, die Ampel springt auf Gelb, du bist noch 40 bis 50 m von der Haltlinie entfernt. Was tust du?", "answers": ["Auf die Gegenfahrbahn ausweichen", "Hupen und weiterfahren", "Anhalten", "Gas geben"], "correct": 2, "explain": "Bei 40 bis 50 km/h und noch 40 bis 50 m bis zur Haltlinie musst du bei Gelb anhalten.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"65\" y=\"10\" width=\"70\" height=\"180\" rx=\"14\" fill=\"#1a1e27\"/><circle cx=\"100\" cy=\"45\" r=\"22\" fill=\"#3a3a3a\"/><circle cx=\"100\" cy=\"100\" r=\"22\" fill=\"#f5b301\"/><circle cx=\"100\" cy=\"155\" r=\"22\" fill=\"#3a3a3a\"/></svg>"},
  {"title": "RANGFOLGE", "text": "Was gilt an einer Kreuzung vor allen anderen Regelungen?", "answers": ["Verkehrszeichen", "Ampel", "Zeichen eines Polizeibeamten", "Rechts vor links"], "correct": 2, "explain": "Rangfolge: rechts vor links, dann Verkehrszeichen, dann Ampel. Zeichen der Polizei gehen allem vor."},
  {"title": "BREMSWEG", "text": "Du fährst doppelt so schnell. Was passiert mit dem Bremsweg?", "answers": ["Er bleibt gleich", "Er halbiert sich", "Er verdoppelt sich", "Er vervierfacht sich"], "correct": 3, "explain": "Der Bremsweg wächst mit dem Quadrat der Geschwindigkeit: 50 km/h ≈ 25 m, 100 km/h ≈ 100 m."},
  {"title": "REAKTIONSWEG", "text": "Du erhöhst von 50 auf 100 km/h. Was passiert mit dem Reaktionsweg?", "answers": ["Er halbiert sich", "Er verdoppelt sich von 15 m auf 30 m", "Er bleibt bei 15 m", "Er vervierfacht sich"], "correct": 1, "explain": "Als Reaktionsweg gilt der Weg in etwa 1 Sekunde. Doppelte Geschwindigkeit = doppelter Reaktionsweg."},
  {"title": "BLIND UNTERWEGS", "text": "Du schaust bei 100 km/h zwei Sekunden aufs Handy. Wie weit fährst du ungefähr blind?", "answers": ["Etwa 55 bis 60 m", "Etwa 10 m", "Etwa 150 m", "Etwa 30 m"], "correct": 0, "explain": "100 km/h sind knapp 28 m pro Sekunde. In zwei Sekunden fährst du also etwa 55 bis 60 m ohne hinzusehen."},
  {"title": "TEMPO 30 STATT 50", "text": "Wo ein Pkw aus 30 km/h zum Stehen kommt, was passiert bei 50 km/h an dieser Stelle?", "answers": ["Er ist schon 1 m weiter", "Er hat schon halb gebremst", "Er fängt gerade erst an zu bremsen", "Er steht auch schon"], "correct": 2, "explain": "Anhalteweg bei 30 km/h etwa 13 bis 15 m. Bei 50 km/h hat der Fahrer an dieser Stelle gerade erst mit dem Bremsen begonnen."},
  {"title": "ZEITGEWINN?", "text": "Du fährst 1 km mit 60 statt 80 km/h hinter einem Lkw. Wie viel Zeit verlierst du ungefähr?", "answers": ["Etwa 1 Sekunde", "Etwa 15 Sekunden", "Etwa 2 Minuten", "Etwa 5 Minuten"], "correct": 1, "explain": "Auf 1 km verlierst du bei 60 statt 80 km/h nur etwa 15 Sekunden. Riskantes Überholen lohnt sich meist nicht."},
  {"title": "ABSTAND IN DER STADT", "text": "Stadtverkehr, 50 km/h, trocken, gute Sicht: Welcher Sicherheitsabstand wird mindestens empfohlen?", "answers": ["25 m", "15 m, etwa 3 Pkw-Längen", "5 m", "50 m"], "correct": 1, "explain": "Im Stadtverkehr bei Tempo 50 werden mindestens 15 m empfohlen, also etwa 3 Pkw-Längen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 150\" role=\"img\"><rect x=\"0\" y=\"60\" width=\"320\" height=\"80\" fill=\"#4b5160\"/><path d=\"M0 100 H320\" stroke=\"#ffffff\" stroke-width=\"4\" stroke-dasharray=\"22 16\"/><rect x=\"40\" y=\"68\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#1565c0\"/><rect x=\"230\" y=\"68\" width=\"60\" height=\"28\" rx=\"8\" fill=\"#d32f2f\"/><path d=\"M102 40 H228\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M102 32 V48 M228 32 V48\" stroke=\"#1a1e27\" stroke-width=\"3\"/><text x=\"165\" y=\"28\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"20\" fill=\"#1a1e27\">? m</text></svg>"},
  {"title": "2-SEKUNDEN-REGEL", "text": "Wie prüfst du den 2-Sekunden-Abstand?", "answers": ["Ich zähle die Leitpfosten", "Ich messe die Pkw-Längen", "Ich zähle „einundzwanzig, zweiundzwanzig“, wenn der Vordermann einen Merkpunkt passiert", "Ich schaue auf den Tacho"], "correct": 2, "explain": "Der Vordermann passiert einen Merkpunkt, du zählst „einundzwanzig, zweiundzwanzig“. Erreichst du den Punkt erst danach, stimmt der Abstand."},
  {"title": "LKW-ABSTAND", "text": "Welchen Mindestabstand müssen Lkw über 3,5 t und Busse auf der Autobahn bei über 50 km/h einhalten?", "answers": ["50 m", "200 m", "100 m", "25 m"], "correct": 0, "explain": "Lkw über 3,5 t und Busse müssen bei über 50 km/h auf der Autobahn mindestens 50 m Abstand halten, das ist der Leitpfosten-Abstand."},
  {"title": "AQUAPLANING", "text": "Ab welcher Geschwindigkeit kann Aquaplaning auftreten?", "answers": ["Nur bei Sommerreifen", "Erst ab 130 km/h", "Nur über 100 km/h", "Schon unter 80 km/h"], "correct": 3, "explain": "Aquaplaning kann schon unter 80 km/h auftreten. Bei Nässe auch auf der Autobahn langsamer fahren."},
  {"title": "ÜBERHOLWEG", "text": "Du überholst mit 100 km/h einen Lkw mit 70 km/h. Wie lang ist dein Überholweg ungefähr?", "answers": ["Etwa 50 m", "Etwa 400 m", "Etwa 1 km", "Etwa 100 m"], "correct": 1, "explain": "Beim Überholen von 100 auf 70 km/h legst du etwa 400 m zurück, der Lkw in dieser Zeit etwa 250 m."},
  {"title": "SICHTWEITE", "text": "Wie weit muss eine unübersichtliche Kurve beim Überholbeginn (100 gegen 70 km/h) ungefähr entfernt sein?", "answers": ["Etwa 200 m", "Etwa 400 m", "Etwa 800 m", "Etwa 100 m"], "correct": 2, "explain": "Du brauchst etwa 400 m Überholweg, ein Entgegenkommender fährt in der Zeit auch etwa 400 m. Also rund 800 m."},
  {"title": "LANGER ZUG", "text": "Wie lang darf ein Lang-Lkw sein?", "answers": ["18,75 m", "30 m", "16,50 m", "25,25 m"], "correct": 3, "explain": "Sattelzug 16,50 m, Lkw mit Anhänger 18,75 m, Lang-Lkw 25,25 m. Längere Fahrzeuge brauchen längere Überholwege."},
  {"title": "AUTOBAHN-AUSFAHRT", "text": "Wann solltest du auf der Autobahn den Blinker für die Ausfahrt setzen?", "answers": ["Gar nicht, man fährt geradeaus ab", "2 km vorher", "Etwa ab der 300-m-Bake", "Erst auf dem Verzögerungsstreifen"], "correct": 2, "explain": "Rechtzeitig blinken: auf Autobahnen etwa ab der 300-m-Bake vor der Ausfahrt.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"56\" y=\"10\" width=\"88\" height=\"180\" fill=\"#ffffff\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M58 50 L142 28 V48 L58 70 Z\" fill=\"#d32f2f\"/><path d=\"M58 94 L142 72 V92 L58 114 Z\" fill=\"#d32f2f\"/><path d=\"M58 138 L142 116 V136 L58 158 Z\" fill=\"#d32f2f\"/></svg>"},
  {"title": "WAS BEDEUTET DAS?", "text": "Was zeigt dieses Zeichen an?", "answers": ["Autobahn", "Tunnel", "Kraftfahrstraße", "Brücke"], "correct": 0, "explain": "Das blaue Zeichen mit der stilisierten Brücke kennzeichnet die Autobahn.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" role=\"img\"><rect x=\"10\" y=\"10\" width=\"180\" height=\"180\" rx=\"14\" fill=\"#1565c0\"/><path d=\"M40 150 V120 Q100 70 160 120 V150 M30 100 H170\" stroke=\"#ffffff\" stroke-width=\"12\" fill=\"none\"/></svg>"},
  {"title": "E-SCOOTER", "text": "Ab welchem Alter darf man E-Scooter fahren, und wie schnell dürfen sie sein?", "answers": ["Ab 16, bis 45 km/h", "Ab 18, bis 30 km/h", "Ab 12, bis 25 km/h", "Ab 14, bis 20 km/h"], "correct": 3, "explain": "E-Scooter: ab 14 Jahren, bis 20 km/h, auf Radwegen und Radfahrstreifen, nicht auf Gehwegen."},
  {"title": "PEDELEC", "text": "Wie schnell kann ein „Pedelec 45“ (S-Pedelec) fahren?", "answers": ["45 km/h", "20 km/h", "60 km/h", "25 km/h"], "correct": 0, "explain": "Das Pedelec 25 unterstützt bis 25 km/h, das Pedelec 45 ist ein Elektrozweirad bis 45 km/h."},
  {"title": "ANHÄNGER PARKEN", "text": "Anhänger über 2 t: Wann dürfen sie in reinen Wohngebieten nicht regelmäßig abgestellt werden?", "answers": ["Nur im Winter", "Zwischen 22 und 6 Uhr sowie an Sonn- und Feiertagen", "Nie", "Nur werktags"], "correct": 1, "explain": "Anhänger über 2 t zGM dürfen in reinen Wohngebieten zwischen 22 und 6 Uhr sowie an Sonn- und Feiertagen nicht regelmäßig abgestellt werden."},
  {"title": "ABSCHLEPPEN", "text": "Wie weit dürfen beim Abschleppen mit Seil die Fahrzeuge höchstens auseinander sein?", "answers": ["5 m", "2 m", "10 m", "15 m"], "correct": 0, "explain": "Beim Abschleppen mit Seil darf der Abstand höchstens 5 m betragen."},
  {"title": "STARTHILFE", "text": "Wie schließt du das rote Starthilfekabel an?", "answers": ["Plus der leeren Batterie mit Plus der Spenderbatterie", "Minus an Minus", "Egal, Hauptsache fest", "Plus an Masse"], "correct": 0, "explain": "Rotes Kabel: Pluspole verbinden, zuerst an der leeren (Empfänger-)Batterie. Schwarzes Kabel: Minus der Spenderbatterie an Masse (Metall) des Empfängers.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 170\" role=\"img\"><rect x=\"20\" y=\"70\" width=\"100\" height=\"70\" rx=\"6\" fill=\"#3a3f4b\"/><rect x=\"32\" y=\"58\" width=\"18\" height=\"12\" fill=\"#d32f2f\"/><rect x=\"90\" y=\"58\" width=\"18\" height=\"12\" fill=\"#1a1e27\"/><text x=\"41\" y=\"100\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\" fill=\"#ffffff\" font-family=\"Arial\">+</text><text x=\"99\" y=\"100\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\" fill=\"#ffffff\" font-family=\"Arial\">–</text><text x=\"70\" y=\"160\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#1a1e27\" font-family=\"Arial\">Spender</text><rect x=\"200\" y=\"70\" width=\"100\" height=\"70\" rx=\"6\" fill=\"#3a3f4b\"/><rect x=\"212\" y=\"58\" width=\"18\" height=\"12\" fill=\"#d32f2f\"/><rect x=\"270\" y=\"58\" width=\"18\" height=\"12\" fill=\"#1a1e27\"/><text x=\"221\" y=\"100\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\" fill=\"#ffffff\" font-family=\"Arial\">+</text><text x=\"279\" y=\"100\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\" fill=\"#ffffff\" font-family=\"Arial\">–</text><text x=\"250\" y=\"160\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#1a1e27\" font-family=\"Arial\">Empfänger</text><path d=\"M41 58 C70 10 200 10 221 58\" stroke=\"#d32f2f\" stroke-width=\"6\" fill=\"none\"/><path d=\"M99 58 C130 25 250 25 279 58\" stroke=\"#1a1e27\" stroke-width=\"6\" fill=\"none\" stroke-dasharray=\"10 6\"/></svg>"},
  {"title": "TUNNEL", "text": "Du stehst im Tunnel im Stau. Was ist richtig?", "answers": ["Motor laufen lassen und dicht auffahren", "Warnblinklicht an und etwa 5 m Abstand halten", "Aussteigen und zu Fuß weiter", "Wenden, wenn Platz ist"], "correct": 1, "explain": "Bei Stau im Tunnel: Warnblinklicht einschalten und etwa 5 m Abstand halten. Wenden ist im Tunnel grundsätzlich verboten.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 190\" role=\"img\"><path d=\"M20 180 V90 Q150 -20 280 90 V180 Z\" fill=\"#2b313b\"/><path d=\"M50 180 V100 Q150 20 250 100 V180 Z\" fill=\"#11141a\"/><rect x=\"60\" y=\"150\" width=\"180\" height=\"30\" fill=\"#4b5160\"/><circle cx=\"110\" cy=\"80\" r=\"6\" fill=\"#f5b301\"/><circle cx=\"150\" cy=\"70\" r=\"6\" fill=\"#f5b301\"/><circle cx=\"190\" cy=\"80\" r=\"6\" fill=\"#f5b301\"/></svg>"},
  {"title": "NOTRUF", "text": "Welche Notrufnummer gilt in Deutschland, der EU und der Schweiz?", "answers": ["117", "0800", "110", "112"], "correct": 3, "explain": "Die 112 gilt in Deutschland, allen EU-Ländern und der Schweiz. 110 ist die Polizei in Deutschland."},
  {"title": "GEHWEGPARKEN", "text": "Bis zu welcher zulässigen Gesamtmasse dürfen Pkw und Anhänger auf entsprechend beschilderten Gehwegen parken?", "answers": ["2,8 t", "3,5 t", "2,0 t", "7,5 t"], "correct": 0, "explain": "Auf so beschilderten Gehwegen dürfen Pkw und Anhänger bis 2,8 t zGM parken, nicht aber über Schachtdeckeln."}
];

// ===== Anhänger Quiz (BE) am Enyaq-Gespann =====
export const TECHNIK_QUESTIONS = [
  {
    title: "WAS ZUERST?",
    text: "Das Zugfahrzeug steht vor dem Anhänger. Was ist dein nächster Schritt?",
    answers: ["Elektroanschluss herstellen", "Feststellbremse am Anhänger lösen", "Stützrad einfahren", "Einsteigen und losfahren"],
    correct: 1,
    explain: "Reihenfolge: Zugfahrzeug heranfahren, Feststellbremse am Anhänger lösen, dann ankuppeln."
  },
  {
    title: "WAS GEHÖRT DAZU?",
    text: "Was gehört NICHT zu den Aufgaben direkt nach dem Ankuppeln?",
    answers: ["Abreißseil einhängen", "Stützrad einfahren und sichern", "Unterlegkeile verstauen", "Scheibenwischwasser nachfüllen"],
    correct: 3,
    explain: "Nach dem Ankuppeln: Abreißseil einhängen, Kupplungssicherung prüfen, Stützrad einfahren und sichern, Unterlegkeile verstauen, Elektroanschluss herstellen."
  },
  {
    title: "REIHENFOLGE?",
    text: "Abreißseil, Kupplungssicherung, Stützrad, Unterlegkeile, Stecker: Musst du diese Punkte in fester Reihenfolge erledigen?",
    answers: ["Ja, genau in dieser Reihenfolge", "Nein, die Reihenfolge ist hier beliebig", "Nur der Stecker muss zuerst", "Der Prüfer würfelt"],
    correct: 1,
    explain: "Innerhalb dieses Schritts ist die Reihenfolge beliebig. Vollständig erledigt sein muss aber alles."
  },
  {
    title: "SICHER?",
    text: "Was musst du nach dem Aufsetzen der Kupplung auf den Kugelkopf prüfen?",
    answers: ["Die Sicherung der Kupplung", "Den Reifendruck am Enyaq", "Den Ladestand der Batterie", "Ob der Anhänger schön glänzt"],
    correct: 0,
    explain: "Die Sicherung der Kupplung wird geprüft, damit der Anhänger nicht vom Kugelkopf springen kann."
  },
  {
    title: "LICHT AN!",
    text: "Was prüfst du bei der Beleuchtung des Anhängers zusätzlich zu den Lampen?",
    answers: ["Nur die Blinker", "Rückstrahler und Masseschluss", "Die Innenbeleuchtung", "Ob die Lampen warm werden"],
    correct: 1,
    explain: "Geprüft werden alle Beleuchtungseinrichtungen, dazu die Rückstrahler und eine Masseschlussprüfung."
  },
  {
    title: "BREMSE?",
    text: "Wie prüfst du die Bremsanlage des Anhängers vor der Fahrt?",
    answers: ["Mit einem Messgerät", "Sichtkontrolle von Bremsstange und Seilen unter dem Anhänger", "Gar nicht, die bremst automatisch", "Kräftig gegen den Reifen treten"],
    correct: 1,
    explain: "Sichtkontrolle unter dem Anhänger: Bremsstange und Bremsseile."
  },
  {
    title: "WIE SCHNELL?",
    text: "Bei welcher Geschwindigkeit machst du die Bremsprobe vor Fahrtantritt?",
    answers: ["Schrittgeschwindigkeit, ca. 5 km/h", "Ca. 20 km/h", "Ca. 30 km/h", "Im Stand"],
    correct: 0,
    explain: "Die Bremsprobe erfolgt nach kurzem Anfahren bei Schrittgeschwindigkeit, ca. 5 km/h."
  },
  {
    title: "FUNKTIONIERT'S?",
    text: "Woran erkennt man bei der Bremsprobe, dass die Auflaufbremse arbeitet?",
    answers: ["Die Manschette an der Zugeinrichtung staucht sich", "Das Stützrad fährt aus", "Die Anhängerbeleuchtung blinkt", "Der Anhänger hupt"],
    correct: 0,
    explain: "Beim Bremsen schiebt der Anhänger auf, dabei staucht sich die Manschette. Das zeigt, dass die Auflaufbremse arbeitet."
  },
  {
    title: "WO?",
    text: "Wo prüfst du bei der Abfahrtkontrolle die Verschleißanzeige?",
    answers: ["Am Stützrad", "Am Zugmaul", "An der Heckklappe", "Am Abreißseil"],
    correct: 1,
    explain: "Die Verschleißanzeige sitzt am Zugmaul, also an der Kupplung des Anhängers."
  },
  {
    title: "WIE TIEF?",
    text: "Wie viel Profiltiefe müssen die Reifen des Anhängers mindestens haben?",
    answers: ["1 mm", "1,6 mm", "3 mm", "Anhänger brauchen kein Profil"],
    correct: 1,
    explain: "Auch am Anhänger gilt: mindestens 1,6 mm Profiltiefe. Außerdem Reifen auf Beschädigungen prüfen."
  },
  {
    title: "ZU?",
    text: "Womit sind die Verschlüsse der Heckklappe am Anhänger gesichert?",
    answers: ["Mit einem Sicherungssplint", "Mit Kabelbindern", "Mit einem Vorhängeschloss", "Mit Hoffnung"],
    correct: 0,
    explain: "Bei der Abfahrtkontrolle prüfst du die Verschlüsse der Heckklappe samt Sicherungssplint."
  },
  {
    title: "HÄLT'S?",
    text: "Welche Hilfsmittel nutzt du zur Ladungssicherung im Anhänger?",
    answers: ["Gurte, Antirutschmatten, Netze", "Klebeband und Schnur", "Gar keine, der Anhänger ist ja zu", "Einfach langsam fahren"],
    correct: 0,
    explain: "Typische Hilfsmittel sind Zurrgurte, Antirutschmatten und Netze."
  },
  {
    title: "WIE SCHWER?",
    text: "Wo findest du die zulässige Stützlast von Auto und Anhänger?",
    answers: ["Im Fahrzeugschein oder auf der Plakette", "Auf dem Reifen", "Im Navi", "Die schätzt man"],
    correct: 0,
    explain: "Die Stützlast steht im Fahrzeugschein oder auf der Plakette und darf bei beiden Fahrzeugen nicht überschritten werden."
  },
  {
    title: "WER HILFT?",
    text: "Was musst du vor jedem Rückwärtsfahren mit dem Gespann tun?",
    answers: ["Hupen", "Eine geeignete Person als Sicherungsposten anweisen", "Warnblinker einschalten", "Fenster runter und hoffen"],
    correct: 1,
    explain: "Vor jeder Rückwärtsfahrt weist du eine geeignete Person an, dich vor Verkehr oder Hindernissen außerhalb deines Blickfelds zu warnen."
  },
  {
    title: "DARF ER DAS?",
    text: "Darf dein Sicherungsposten dir beim Rückwärtsbogen sagen, wie du lenken sollst?",
    answers: ["Ja, dafür ist er da", "Nein, er darf nur warnen", "Nur bei der Prüfung", "Nur wenn er selbst BE hat"],
    correct: 1,
    explain: "Lenk- oder Bedienungsanweisungen sind nicht zulässig. Der Sicherungsposten warnt nur vor Verkehr und Hindernissen."
  },
  {
    title: "SICHT WEG!",
    text: "Du verlierst beim Rückwärtsfahren den Sichtkontakt zum Sicherungsposten. Was tust du?",
    answers: ["Langsamer weiterfahren", "Sofort anhalten", "Hupen und weiterfahren", "Über Handy weiter telefonieren"],
    correct: 1,
    explain: "Reißt der Sichtkontakt ab, musst du die Fahrt sofort unterbrechen."
  },
  {
    title: "BLINKER?",
    text: "Musst du beim Rückwärtsbogen zu Beginn der Fahrt blinken?",
    answers: ["Nein, rückwärts blinkt man nie", "Ja, zu Beginn der Fahrt blinken", "Nur wenn Verkehr kommt", "Nur am Ende"],
    correct: 1,
    explain: "Auch bei der Grundfahraufgabe gilt die StVO: Zu Beginn der Fahrt wird geblinkt und der Verkehr beobachtet."
  },
  {
    title: "WIE NAH?",
    text: "Wie weit darf das Gespann nach dem Rückwärtsbogen höchstens vom Bordstein entfernt stehen?",
    answers: ["0,5 Meter", "1 Meter", "2 Meter", "Hauptsache um die Ecke"],
    correct: 1,
    explain: "Das Gespann muss am Ende annähernd parallel und höchstens 1 m vom Bordstein entfernt stehen."
  },
  {
    title: "WIE OFT?",
    text: "Wie viele Korrekturzüge sind beim Rückwärtsbogen höchstens erlaubt?",
    answers: ["1", "3", "5", "Unbegrenzt, Hauptsache am Ende gerade"],
    correct: 1,
    explain: "Mehr als 3 Korrekturzüge gelten als Fehler."
  },
  {
    title: "BORDSTEIN?",
    text: "Was passiert, wenn du beim Rückwärtsbogen auf den Bordstein fährst?",
    answers: ["Nichts, solange es nur kurz ist", "Das wird als Fehler gewertet", "Nur ein Hinweis vom Prüfer", "Punkt für Mut"],
    correct: 1,
    explain: "Auffahren auf den Bordstein oder Überfahren der Fahrbahnbegrenzung wird als Fehler gewertet."
  },
  {
    title: "LICHT AN!",
    text: "Welche Leuchte gehört NICHT zur Beleuchtung, die du am Anhänger prüfst?",
    answers: ["Bremsleuchten", "Kennzeichenbeleuchtung", "Fernlicht", "Nebelschlussleuchte"],
    correct: 2,
    explain: "Ein Anhänger hat kein Fernlicht. Geprüft werden u. a. Schluss-, Brems-, Nebelschlussleuchte, Blinker und Kennzeichenbeleuchtung."
  },
  {
    title: "WELCHE FORM?",
    text: "Wie sehen die Rückstrahler hinten am Anhänger aus?",
    answers: ["Rot und dreieckig", "Gelb und rund", "Weiß und eckig", "Rot und rund"],
    correct: 0,
    explain: "Hinten am Anhänger sitzen rote, dreieckige Rückstrahler. Vorne sind die Rückstrahler weiß."
  },
  {
    title: "WIE PRÜFEN?",
    text: "Wie prüfst du die Rückstrahler am Anhänger?",
    answers: ["Einschalten und leuchten lassen", "Sichtprüfung auf Sauberkeit und Beschädigung", "Mit der Taschenlampe messen", "Gar nicht, die halten ewig"],
    correct: 1,
    explain: "Rückstrahler leuchten nicht selbst. Sie werden per Sichtprüfung kontrolliert: sauber, vollständig und unbeschädigt."
  },
  {
    title: "MASSESCHLUSS?",
    text: "Licht, Blinker und Bremse sind gleichzeitig an. Woran erkennst du einen Masseschluss?",
    answers: ["Alle Leuchten sind gleich hell", "Leuchten flackern, werden schwächer oder leuchten mit", "Der Blinker ist schneller als sonst", "Das Radio rauscht"],
    correct: 1,
    explain: "Flackern, schwächer werden oder das Mitleuchten anderer Lampen deutet auf eine schlechte Masseverbindung hin, meist am Stecker oder an einer Fassung."
  },
  {
    title: "WELCHE FARBE?",
    text: "Welche Farbe haben die Rückstrahler vorne am Anhänger?",
    answers: ["Rot", "Gelb", "Weiß", "Blau"],
    correct: 2,
    explain: "Vorne weiß, seitlich gelb, hinten rot und dreieckig."
  },
  {"title": "WIE VIELE?", "text": "Wie viele Anhänger darf ein Pkw ziehen?", "answers": ["Einen", "Beliebig viele bis 3,5 t", "Drei", "Zwei"], "correct": 0, "explain": "Pkw und Lkw dürfen nur einen Anhänger ziehen, Zugmaschinen zwei.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/></svg>"},
  {"title": "KUPPLUNG", "text": "Welches Teil am Anhänger umschließt den Kugelkopf des Zugfahrzeugs?", "answers": ["Die Steckdose", "Das Stützrad", "Die Kupplungsklaue mit Sicherungshebel", "Das Abreißseil"], "correct": 2, "explain": "Am Zugfahrzeug sitzen Kugelkopf und Steckdose, am Anhänger die Kupplungsklaue mit Sicherungshebel.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 135\" role=\"img\"><rect x=\"0\" y=\"120\" width=\"300\" height=\"10\" fill=\"#c9ced6\"/><path d=\"M20 100 H120 V86\" stroke=\"#1a1e27\" stroke-width=\"10\" fill=\"none\"/><circle cx=\"120\" cy=\"70\" r=\"16\" fill=\"#6b7280\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M98 64 Q120 34 142 64 V72 H152 V54 Q120 18 88 54 V60 Z\" fill=\"#8fb03a\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M150 58 H280\" stroke=\"#1a1e27\" stroke-width=\"10\"/><path d=\"M150 46 L190 30\" stroke=\"#d32f2f\" stroke-width=\"6\" stroke-linecap=\"round\"/><text x=\"120\" y=\"112\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Kugelkopf</text><text x=\"196\" y=\"24\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Sicherungshebel</text><text x=\"170\" y=\"84\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Kupplungsklaue</text></svg>"},
  {"title": "SICHER EINGERASTET?", "text": "Worauf achtest du beim Ankuppeln besonders?", "answers": ["Dass der Anhänger frisch gewaschen ist", "Dass der Tank voll ist", "Dass die Kupplungsklaue den Kugelkopf sicher umschließt und die Sicherung einrastet", "Dass das Stützrad ganz unten ist"], "correct": 2, "explain": "Die Kupplungsklaue muss den Kupplungskopf sicher umschließen, die Sicherung muss einrasten.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 135\" role=\"img\"><rect x=\"0\" y=\"120\" width=\"300\" height=\"10\" fill=\"#c9ced6\"/><path d=\"M20 100 H120 V86\" stroke=\"#1a1e27\" stroke-width=\"10\" fill=\"none\"/><circle cx=\"120\" cy=\"70\" r=\"16\" fill=\"#6b7280\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M98 64 Q120 34 142 64 V72 H152 V54 Q120 18 88 54 V60 Z\" fill=\"#8fb03a\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M150 58 H280\" stroke=\"#1a1e27\" stroke-width=\"10\"/><path d=\"M150 46 L190 30\" stroke=\"#d32f2f\" stroke-width=\"6\" stroke-linecap=\"round\"/><text x=\"120\" y=\"112\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Kugelkopf</text><text x=\"196\" y=\"24\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Sicherungshebel</text><text x=\"170\" y=\"84\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"14\" fill=\"#1a1e27\">Kupplungsklaue</text></svg>"},
  {"title": "SEITLICHE RÜCKSTRAHLER", "text": "Welche Farbe haben die Rückstrahler an den Längsseiten des Anhängers?", "answers": ["Blau", "Weiß", "Gelb", "Rot"], "correct": 2, "explain": "Hinten sitzen rote dreieckige Rückstrahler, an den Längsseiten gelbe.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"320\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M10 96 L60 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"60\" y=\"62\" width=\"230\" height=\"44\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"175\" cy=\"120\" r=\"16\" fill=\"#1a1e27\"/><circle cx=\"175\" cy=\"120\" r=\"7.2\" fill=\"#9aa1ad\"/><rect x=\"80\" y=\"92\" width=\"16\" height=\"9\" rx=\"2\" fill=\"#f5b301\"/><rect x=\"250\" y=\"92\" width=\"16\" height=\"9\" rx=\"2\" fill=\"#f5b301\"/><path d=\"M290 90 l14 8 l-14 8 Z\" fill=\"#d32f2f\"/></svg>"},
  {"title": "BREITER ANHÄNGER", "text": "Wann braucht ein Anhänger vorne eigene Begrenzungsleuchten?", "answers": ["Wenn er mehr als 40 cm über die Begrenzungsleuchten des Zugfahrzeugs hinausragt", "Nur nachts", "Immer", "Nur ab 3,5 t"], "correct": 0, "explain": "Vordere Begrenzungsleuchten sind nötig, wenn der Anhänger mehr als 40 cm über die Begrenzungsleuchten des Zugfahrzeugs hinausragt."},
  {"title": "ANHÄNGELAST?", "text": "Was ist die Anhängelast?", "answers": ["Die Last auf dem Kugelkopf", "Nur das Leergewicht des Anhängers", "Die tatsächlich gezogene Last: Leergewicht des Anhängers plus Ladung", "Das Gewicht des Zugfahrzeugs"], "correct": 2, "explain": "Anhängelast = tatsächlich gezogene Last, also Leergewicht des Anhängers plus Ladung.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/></svg>"},
  {"title": "WO EINGETRAGEN?", "text": "Wo findest du die zulässige Anhängelast deines Autos?", "answers": ["Auf dem Reifen", "In der Betriebsanleitung und in der Zulassungsbescheinigung Teil I", "Nur im Internet", "Im Führerschein"], "correct": 1, "explain": "Die zulässige Anhängelast steht in der Betriebsanleitung und in der Zulassungsbescheinigung Teil I. Sie darf nicht überschritten werden."},
  {"title": "UNGEBREMST", "text": "Wie schwer darf ein Anhänger ohne eigene Bremse höchstens sein?", "answers": ["So schwer wie der Pkw", "Immer 1.000 kg", "Halbe Leermasse des Pkw plus 75 kg, aber höchstens 750 kg", "3.500 kg"], "correct": 2, "explain": "Allgemein gilt für ungebremste Anhänger: (Leermasse Pkw + 75 kg) : 2, aber höchstens 750 kg."},
  {"title": "GEBREMST", "text": "Wie schwer darf ein Anhänger mit eigener Bremse allgemein höchstens sein?", "answers": ["Höchstens 750 kg", "Ohne Grenze", "Doppelt so schwer wie der Pkw", "Nicht schwerer als die zulässige Gesamtmasse des Pkw"], "correct": 3, "explain": "Allgemein gilt für Anhänger mit eigener Bremse: nicht höher als die zulässige Gesamtmasse des Zugfahrzeugs, sofern in den Papieren nichts Niedrigeres steht."},
  {"title": "STÜTZLAST", "text": "Wie hoch muss die Stützlast mindestens sein?", "answers": ["1 % der Anhängermasse", "4 % der tatsächlichen Anhängermasse, aber nicht mehr als 25 kg nötig", "10 % der Anhängermasse", "Immer 75 kg"], "correct": 1, "explain": "Mindeststützlast: 4 % der tatsächlichen Masse des Anhängers. Mehr als 25 kg müssen es dafür aber nicht sein.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><path d=\"M190 20 V78\" stroke=\"#d32f2f\" stroke-width=\"5\"/><path d=\"M180 70 L190 88 L200 70 Z\" fill=\"#d32f2f\"/><text x=\"200\" y=\"30\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#d32f2f\">Stützlast</text></svg>"},
  {"title": "RECHNEN!", "text": "Der Anhänger wiegt mit Ladung 600 kg. Wie hoch muss die Stützlast mindestens sein?", "answers": ["6 kg", "24 kg", "100 kg", "60 kg"], "correct": 1, "explain": "4 % von 600 kg = 24 kg.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><path d=\"M190 20 V78\" stroke=\"#d32f2f\" stroke-width=\"5\"/><path d=\"M180 70 L190 88 L200 70 Z\" fill=\"#d32f2f\"/><text x=\"200\" y=\"30\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#d32f2f\">Stützlast</text></svg>"},
  {"title": "HECKLASTIG?", "text": "Warum darfst du einen Anhänger nie hecklastig beladen?", "answers": ["Weil Schleudergefahr besteht, es fehlt Stützlast", "Weil die Beleuchtung verdeckt wird", "Weil er dann schneller verschleißt", "Das ist erlaubt"], "correct": 0, "explain": "Hecklastig beladen fehlt die Stützlast, das Gespann kann ins Schleudern geraten.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><path d=\"M190 20 V78\" stroke=\"#d32f2f\" stroke-width=\"5\"/><path d=\"M180 70 L190 88 L200 70 Z\" fill=\"#d32f2f\"/><text x=\"200\" y=\"30\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#d32f2f\">Stützlast</text></svg>"},
  {"title": "ÜBERSTEHENDE LADUNG", "text": "Ab wann musst du Ladung kennzeichnen, die hinten übersteht?", "answers": ["Ab 3 m", "Ab 10 cm", "Nie", "Wenn sie mehr als 1 m über die Rückstrahler hinausragt"], "correct": 3, "explain": "Teile, die mehr als 1 m über die Rückstrahler hinausragen, müssen gekennzeichnet werden."},
  {"title": "ABKUPPELN", "text": "Was machst du beim Abkuppeln als Erstes?", "answers": ["Das Abreißseil aushängen", "Die Deichsel hochkurbeln", "Elektroanschluss trennen", "Das Zugfahrzeug sichern"], "correct": 3, "explain": "Reihenfolge beim Abkuppeln: 1. Zugfahrzeug sichern, 2. Anhänger sichern (Feststellbremse, Unterlegkeile), 3. Stützrad ausfahren, 4. Elektrik, Abreißseil, Kupplung öffnen, Deichsel hochkurbeln."},
  {"title": "ABKUPPELN", "text": "Was kommt beim Abkuppeln direkt nach dem Sichern des Zugfahrzeugs?", "answers": ["Anhänger sichern: Feststellbremse und Unterlegkeile", "Kupplung öffnen", "Wegfahren", "Stecker ziehen"], "correct": 0, "explain": "Nach dem Zugfahrzeug sicherst du den Anhänger mit Feststellbremse und Unterlegkeilen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 165\" role=\"img\"><rect x=\"0\" y=\"150\" width=\"300\" height=\"8\" fill=\"#c9ced6\"/><circle cx=\"150\" cy=\"108\" r=\"42\" fill=\"#1a1e27\"/><circle cx=\"150\" cy=\"108\" r=\"18.9\" fill=\"#9aa1ad\"/><path d=\"M78 150 L108 150 L108 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M222 150 L192 150 L192 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/></svg>"},
  {"title": "UNTERLEGKEILE", "text": "Wann sicherst du den Anhänger vor dem Abkuppeln gegen Wegrollen?", "answers": ["Nur im Gefälle", "Grundsätzlich immer", "Nur bei Regen", "Nur über 3,5 t"], "correct": 1, "explain": "Vor dem Abkuppeln den Anhänger grundsätzlich gegen Wegrollen sichern, nicht nur im Gefälle.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 165\" role=\"img\"><rect x=\"0\" y=\"150\" width=\"300\" height=\"8\" fill=\"#c9ced6\"/><circle cx=\"150\" cy=\"108\" r=\"42\" fill=\"#1a1e27\"/><circle cx=\"150\" cy=\"108\" r=\"18.9\" fill=\"#9aa1ad\"/><path d=\"M78 150 L108 150 L108 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M222 150 L192 150 L192 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/></svg>"},
  {"title": "WIE VIELE KEILE?", "text": "Wie viele Unterlegkeile sind für einen Einachsanhänger über 750 kg vorgeschrieben?", "answers": ["Keiner", "Zwei", "Einer", "Vier"], "correct": 1, "explain": "Für Einachsanhänger über 750 kg sind zwei Unterlegkeile vorgeschrieben.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 165\" role=\"img\"><rect x=\"0\" y=\"150\" width=\"300\" height=\"8\" fill=\"#c9ced6\"/><circle cx=\"150\" cy=\"108\" r=\"42\" fill=\"#1a1e27\"/><circle cx=\"150\" cy=\"108\" r=\"18.9\" fill=\"#9aa1ad\"/><path d=\"M78 150 L108 150 L108 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M222 150 L192 150 L192 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/></svg>"},
  {"title": "AUFLAUFBREMSE", "text": "Wie funktioniert die Auflaufbremse?", "answers": ["Druckluft aus dem Pkw bremst den Anhänger", "Der Fahrer zieht einen Hebel", "Ein Elektromotor bremst den Anhänger", "Bremst das Zugfahrzeug, läuft der Anhänger auf und dieser Druck betätigt die Anhängerbremse"], "correct": 3, "explain": "Bremst das Zugfahrzeug, läuft der Anhänger auf. Über Zugstange, Hebel, Gestänge und Seilzug wird dieser Druck auf die Radbremsen übertragen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/></svg>"},
  {"title": "ABREISSSEIL", "text": "Wozu dient das Abreißseil?", "answers": ["Es löst eine Notbremsung aus, falls sich der Anhänger losreißt", "Es sichert die Plane", "Es hält das Stromkabel fest", "Zum Abschleppen"], "correct": 0, "explain": "Reißt der Anhänger los, zieht das mit dem Zugfahrzeug verbundene Abreißseil die Feststellbremse an.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 152\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><path d=\"M226 100 Q205 122 182 108\" stroke=\"#d32f2f\" stroke-width=\"3.5\" fill=\"none\" stroke-dasharray=\"5 3\"/><circle cx=\"182\" cy=\"108\" r=\"4\" fill=\"#d32f2f\"/><text x=\"236\" y=\"146\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"16\" fill=\"#d32f2f\">Abreißseil</text></svg>"},
  {"title": "RÜCKFAHRSPERRE", "text": "Was macht die sogenannte „Rückfahrsperre“ am Anhänger?", "answers": ["Sie sperrt die Auflaufbremse, damit der Anhänger beim Rückwärtsfahren nicht bremst", "Sie verhindert das Rückwärtsfahren", "Sie bremst beim Abstellen", "Sie ist eine Diebstahlsicherung"], "correct": 0, "explain": "Die Rückfahreinrichtung sperrt nicht das Rückwärtsfahren, sondern die Funktion der Auflaufbremse beim Rückwärtsfahren."},
  {"title": "IM GEFÄLLE ABSTELLEN", "text": "Du stellst deinen Anhänger mit Auflaufbremse im Gefälle ab. Was ist FALSCH?", "answers": ["Unterlegkeile vor die Räder legen", "Feststellbremse anziehen", "Den Anhänger gegen Wegrollen sichern", "Die Rückfahrsperre verriegeln"], "correct": 3, "explain": "Die Rückfahrsperre zu verriegeln wäre falsch: Sie bremst nicht, sondern verhindert das Bremsen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 165\" role=\"img\"><rect x=\"0\" y=\"150\" width=\"300\" height=\"8\" fill=\"#c9ced6\"/><circle cx=\"150\" cy=\"108\" r=\"42\" fill=\"#1a1e27\"/><circle cx=\"150\" cy=\"108\" r=\"18.9\" fill=\"#9aa1ad\"/><path d=\"M78 150 L108 150 L108 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/><path d=\"M222 150 L192 150 L192 118 Z\" fill=\"#f9c623\" stroke=\"#1a1e27\" stroke-width=\"3\"/></svg>"},
  {"title": "PLANEN", "text": "Warum musst du vor der Fahrt die Befestigung der Plane prüfen?", "answers": ["Damit der Anhänger leiser ist", "Planen sind vorgeschrieben", "Wegen der Optik", "Flatternde Planen können die Sicht in den Außenspiegeln behindern"], "correct": 3, "explain": "Flatternde Planen können die Sicht durch die Außenspiegel behindern.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"58\" width=\"130\" height=\"46\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/></svg>"},
  {"title": "LANGE GESTANDEN", "text": "Der Anhänger stand lange. Womit musst du rechnen?", "answers": ["Mit abgelaufenem TÜV", "Mit nichts Besonderem", "Mit leerer Batterie im Anhänger", "Mit zu niedrigem Reifendruck, eingerosteten Bremsen und beschädigten Kabeln"], "correct": 3, "explain": "Nach längerer Standzeit: zu niedriger Reifendruck, eingerostete Bremsen, beschädigte Kabelverbindungen."},
  {"title": "ZUSÄTZLICHE SPIEGEL", "text": "Wann brauchst du zusätzliche Außenspiegel für den Anhänger?", "answers": ["Wenn der Anhänger höher als 1 m ist", "Bei jedem Wohnanhänger", "Wenn du nicht alle wesentlichen Verkehrsvorgänge in den vorhandenen Spiegeln beobachten kannst", "Nie"], "correct": 2, "explain": "Entscheidend ist, ob du den rückwärtigen Verkehr sehen kannst, nicht der Typ des Anhängers."},
  {"title": "EINSTELLUNGEN", "text": "Was passt du am Zugfahrzeug an die Anhängerlast an?", "answers": ["Nichts", "Sitz und Lenkrad", "Reifendruck und Leuchtweitenregulierung", "Radio und Klima"], "correct": 2, "explain": "Reifendruck und Leuchtweitenregulierung musst du der geänderten Belastung anpassen."},
  {"title": "RÜCKWÄRTS", "text": "Wie drehst du beim Rückwärtsfahren mit Anhänger anfangs das Lenkrad?", "answers": ["Immer nach links", "Entgegengesetzt zur gewünschten Richtung des Anhängers", "Gar nicht", "In die Richtung, in die der Anhänger soll"], "correct": 1, "explain": "Beim Rückwärtsfahren mit Zug das Lenkrad anfangs entgegengesetzt zur gewünschten Fahrtrichtung des Anhängers drehen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 265\" role=\"img\"><rect x=\"120\" y=\"20\" width=\"60\" height=\"100\" rx=\"14\" fill=\"#1565c0\"/><rect x=\"128\" y=\"34\" width=\"44\" height=\"22\" rx=\"4\" fill=\"#dbe7f3\"/><g transform=\"rotate(-20 150 132)\"><path d=\"M150 120 V140\" stroke=\"#1a1e27\" stroke-width=\"5\"/><rect x=\"118\" y=\"140\" width=\"64\" height=\"80\" rx=\"4\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/></g><path d=\"M100 225 Q60 215 48 180\" stroke=\"#d32f2f\" stroke-width=\"5\" fill=\"none\"/><path d=\"M38 186 L48 168 L60 184 Z\" fill=\"#d32f2f\"/><text x=\"20\" y=\"255\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"15\" fill=\"#d32f2f\">Anhänger soll nach links</text><circle cx=\"250\" cy=\"70\" r=\"30\" fill=\"none\" stroke=\"#1a1e27\" stroke-width=\"7\"/><path d=\"M220 70 H280 M250 70 V100\" stroke=\"#1a1e27\" stroke-width=\"5\"/><path d=\"M276 40 Q290 50 288 64\" stroke=\"#8fb03a\" stroke-width=\"5\" fill=\"none\"/><path d=\"M280 62 L290 72 L296 58 Z\" fill=\"#8fb03a\"/><text x=\"228\" y=\"130\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"15\" fill=\"#1a1e27\">Lenkrad</text><text x=\"214\" y=\"148\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"15\" fill=\"#1a1e27\">nach rechts</text></svg>"},
  {"title": "PARKEN OHNE AUTO", "text": "Wie lange darf ein Anhänger ohne Zugfahrzeug auf öffentlichen Straßen höchstens geparkt werden?", "answers": ["Zwei Wochen", "Einen Monat", "Unbegrenzt", "24 Stunden"], "correct": 0, "explain": "Anhänger ohne Zugfahrzeug höchstens zwei Wochen, länger nur auf entsprechend gekennzeichneten Parkplätzen."},
  {"title": "BREMSWEG", "text": "Wann wird der Bremsweg mit Anhänger besonders lang?", "answers": ["Bei beladenem Anhänger ohne eigene Bremse", "Bei Sonnenschein", "Bei leerem Anhänger mit Bremse", "Nie, er bleibt gleich"], "correct": 0, "explain": "Mit Anhänger kann der Bremsweg länger werden, besonders mit einem beladenen Anhänger ohne eigene Bremse."},
  {"title": "SCHLINGERN", "text": "Der Anhänger beginnt zu schlingern. Was tust du?", "answers": ["Stark gegenlenken", "Warnblinker an und weiterfahren", "Gas geben, um den Zug zu strecken", "Langsamer werden und hastige Lenkbewegungen vermeiden"], "correct": 3, "explain": "Bei schlingerndem Anhänger langsamer werden und nicht beschleunigen. Hastige Lenkbewegungen vermeiden."},
  {"title": "GEFÄLLE", "text": "Worauf stellst du dich vor einem Gefälle mit ungebremstem Anhänger ein?", "answers": ["Der Anhänger bremst mit", "Einfach im Leerlauf rollen", "Nur die Handbremse benutzen", "Der Anhänger schiebt: Tempo runter, früh runterschalten, bremsbereit sein"], "correct": 3, "explain": "Ein ungebremster Anhänger schiebt. Geschwindigkeit verringern, rechtzeitig einen niedrigeren Gang wählen und bremsbereit sein."},
  {"title": "SEITENWIND", "text": "Warum ist Seitenwind mit einem Planenanhänger gefährlich?", "answers": ["Planen bieten viel Angriffsfläche: Kippgefahr", "Der Verbrauch sinkt", "Die Plane wird nass", "Gar nicht"], "correct": 0, "explain": "Planenanhänger bieten viel Angriffsfläche, es droht Kippgefahr. Bei Sturm den Anhänger möglichst stehen lassen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"58\" width=\"130\" height=\"46\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/></svg>"},
  {"title": "LINKSKURVE", "text": "Wie fährst du mit dem Gespann durch eine Linkskurve?", "answers": ["In der Mitte des Fahrstreifens bleiben und erst im Scheitelpunkt wieder leicht Gas geben", "Kurve schneiden", "Ganz rechts fahren und stark bremsen", "Vor der Kurve beschleunigen"], "correct": 0, "explain": "Linkskurven nicht schneiden, in der Mitte des Fahrstreifens bleiben, Tempo früh vor der Kurve vermindern und erst im Scheitelpunkt wieder leicht Gas geben."},
  {"title": "KLASSE B", "text": "Mit Klasse B ziehst du einen Anhänger über 750 kg. Wie schwer darf die Kombination höchstens sein?", "answers": ["750 kg", "3.500 kg", "4.250 kg", "7.000 kg"], "correct": 1, "explain": "Mit Klasse B: Anhänger über 750 kg nur, wenn die zulässige Gesamtmasse der Kombination 3.500 kg nicht übersteigt.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><text x=\"90\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">Pkw</text><text x=\"285\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">über 750 kg</text></svg>"},
  {"title": "KLASSE B", "text": "Mit Klasse B ziehst du einen Anhänger bis 750 kg. Was gilt für das Zugfahrzeug?", "answers": ["Bis 7.500 kg", "Beliebig", "Bis 3.500 kg zulässige Gesamtmasse", "Bis 2.000 kg"], "correct": 2, "explain": "Anhänger bis 750 kg darfst du mit Klasse B hinter jedem Zugfahrzeug bis 3.500 kg zGM ziehen.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><text x=\"90\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">bis 3.500 kg</text><text x=\"285\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">bis 750 kg</text></svg>"},
  {"title": "B96", "text": "Bis zu welcher zulässigen Gesamtmasse der Kombination darfst du mit B96 fahren?", "answers": ["12.000 kg", "4.250 kg", "3.500 kg", "7.000 kg"], "correct": 1, "explain": "Mit der Schlüsselzahl 96 sind Kombinationen über 3.500 kg bis 4.250 kg zGM erlaubt. Dafür ist eine Fahrerschulung ohne Prüfung vorgeschrieben."},
  {"title": "KLASSE BE", "text": "Wie schwer darf der Anhänger mit Klasse BE höchstens sein?", "answers": ["750 kg", "3.500 kg", "7.500 kg", "2.000 kg"], "correct": 1, "explain": "Mit BE darf der Anhänger bis 3.500 kg zGM haben, das Zugfahrzeug ebenfalls bis 3.500 kg. BE erwirbt man durch eine praktische Prüfung.", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" role=\"img\"><rect x=\"0\" y=\"136\" width=\"380\" height=\"6\" fill=\"#c9ced6\"/><path d=\"M8 118 V96 Q8 86 20 84 L48 80 L74 58 Q80 54 90 54 H136 Q146 54 152 62 L164 82 Q174 84 174 96 V118 Z\" fill=\"#1565c0\"/><path d=\"M58 82 L78 62 H108 V82 Z M114 62 H140 L152 82 H114 Z\" fill=\"#dbe7f3\"/><circle cx=\"46\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"46\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><circle cx=\"140\" cy=\"120\" r=\"17\" fill=\"#1a1e27\"/><circle cx=\"140\" cy=\"120\" r=\"7.7\" fill=\"#9aa1ad\"/><path d=\"M174 106 H188 V100\" stroke=\"#1a1e27\" stroke-width=\"5\" fill=\"none\"/><circle cx=\"188\" cy=\"96\" r=\"6\" fill=\"#1a1e27\"/><path d=\"M190 96 L230 100\" stroke=\"#1a1e27\" stroke-width=\"6\"/><rect x=\"230\" y=\"78\" width=\"130\" height=\"26\" rx=\"3\" fill=\"#9aa1ad\" stroke=\"#1a1e27\" stroke-width=\"2\"/><circle cx=\"295\" cy=\"120\" r=\"15\" fill=\"#1a1e27\"/><circle cx=\"295\" cy=\"120\" r=\"6.8\" fill=\"#9aa1ad\"/><rect x=\"354\" y=\"92\" width=\"6\" height=\"8\" fill=\"#d32f2f\"/><text x=\"90\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">bis 3.500 kg</text><text x=\"285\" y=\"34\" text-anchor=\"middle\" font-family=\"Arial,Helvetica,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1e27\">bis 3.500 kg</text></svg>"},
  {"title": "RECHNUNG", "text": "Wie wird die zulässige Gesamtmasse einer Kombination berechnet?", "answers": ["Nur die zGM des Zugfahrzeugs zählt", "zGM Anhänger minus Stützlast", "Summe der zGM von Zugfahrzeug und Anhänger, ohne Stützlast", "Leergewichte addiert"], "correct": 2, "explain": "Die zGM der Kombination ist die Summe der zGM der Einzelfahrzeuge, ohne Berücksichtigung der Stützlast."}
];

// ===== Technikquiz für die B-Prüfung (Enyaq) =====
export const TECHNIKB_QUESTIONS = [
  {
    title: "WARNBLINKER?",
    text: "In welcher Situation schaltest du das Warnblinklicht NICHT ein?",
    answers: ["Am Stauende", "Bei einer Panne", "Beim Abschleppen", "Kurz in zweiter Reihe zum Bäcker"],
    correct: 3,
    explain: "Merkwort SUPAA: Stau, Unfall, Panne, Abschleppen, Abgeschleppt werden. Zum Falschparken ist der Warnblinker nicht da."
  },
  {
    title: "SUPAA?",
    text: "Merkwort SUPAA für das Warnblinklicht: Wofür steht das P?",
    answers: ["Parken", "Panne", "Polizei", "Pause"],
    correct: 1,
    explain: "S = Stau, U = Unfall, P = Panne, A = Abschleppen, A = Abgeschleppt werden."
  },
  {
    title: "SUPAA?",
    text: "Wofür stehen die beiden A in SUPAA?",
    answers: ["Autobahn und Ampel", "Abschleppen und Abgeschleppt werden", "Anhalten und Aussteigen", "Achtung und Abstand"],
    correct: 1,
    explain: "Warnblinklicht auch beim Abschleppen und wenn du selbst abgeschleppt wirst."
  },
  {
    title: "PARKLICHT?",
    text: "Was macht das Parklicht links bzw. rechts?",
    answers: ["Es beleuchtet nur eine Seite des Fahrzeugs", "Es beleuchtet beide Seiten", "Es schaltet das Fernlicht ein", "Es blinkt dauerhaft"],
    correct: 0,
    explain: "Das Parklicht beleuchtet beim Parken nur die gewählte Seite, vorne weiß und hinten rot."
  },
  {
    title: "STANDLICHT?",
    text: "Welche Farben zeigt das Standlicht?",
    answers: ["Vorne gelb, hinten rot", "Vorne weiß, hinten rot", "Vorne und hinten weiß", "Vorne rot, hinten weiß"],
    correct: 1,
    explain: "Standlicht beleuchtet beim Parken beide Seiten: vorne weiß, hinten rot."
  },
  {
    title: "FERNLICHT?",
    text: "Wann nutzt du das Fernlicht?",
    answers: ["Immer bei Regen", "Im Dunkeln außerorts, wenn niemand geblendet wird", "Innerorts bei Dunkelheit", "Bei Nebel"],
    correct: 1,
    explain: "Fernlicht leuchtet die Straße außerorts im Dunkeln weit aus, aber nur, wenn niemand geblendet wird."
  },
  {
    title: "ABBLENDLICHT?",
    text: "Wofür ist das Abblendlicht da?",
    answers: ["Nur für Tunnel", "Bei Dunkelheit, Scheinwerferkegel nach vorne", "Nur zum Parken", "Nur bei Nebel"],
    correct: 1,
    explain: "Abblendlicht nutzt du bei Dunkelheit. Es leuchtet weiß nach vorne, ohne andere zu blenden."
  },
  {
    title: "NEBEL!",
    text: "Wann darfst du die Nebelschlussleuchte einschalten?",
    answers: ["Bei jedem Regen", "Nur bei Nebel mit weniger als 50 m Sicht", "Bei Dunkelheit", "Wenn jemand dicht auffährt"],
    correct: 1,
    explain: "Nur bei Nebel und Sichtweite unter 50 m. Dann gilt höchstens 50 km/h."
  },
  {
    title: "WIE SCHNELL?",
    text: "Nebelschlussleuchte ist an. Wie schnell darfst du höchstens fahren?",
    answers: ["30 km/h", "50 km/h", "80 km/h", "100 km/h"],
    correct: 1,
    explain: "Mit eingeschalteter Nebelschlussleuchte, also Sicht unter 50 m, gilt maximal 50 km/h."
  },
  {
    title: "WELCHE FARBE?",
    text: "Welche Farbe hat die Nebelschlussleuchte?",
    answers: ["Weiß", "Gelb", "Rot", "Orange"],
    correct: 2,
    explain: "Die Nebelschlussleuchte leuchtet rot nach hinten, damit du im Nebel gesehen wirst."
  },
  {
    title: "ALLWETTERLICHT?",
    text: "Wie heißt die Funktion am Enyaq, die früher Nebellicht (vorne) hieß?",
    answers: ["Tagfahrlicht", "Allwetterlicht", "Kurvenlicht", "Parklicht"],
    correct: 1,
    explain: "Am Lichtschalter heißt sie Allwetterlicht. Sie leuchtet bei starker Sichtbehinderung wie Nebel oder Schnee die Straße aus."
  },
  {
    title: "RÜCKSTRAHLER?",
    text: "Wozu dienen die roten Rückstrahler hinten am Auto?",
    answers: ["Als Bremslicht", "Damit das Fahrzeug auch ohne Beleuchtung erkennbar ist", "Als Ersatz für die Blinker", "Nur zur Deko"],
    correct: 1,
    explain: "Rückstrahler kennzeichnen das Fahrzeug, auch wenn die Beleuchtung aus ist."
  },
  {
    title: "235/45 R21",
    text: "Reifen 235/45 R21: Was bedeutet die 235?",
    answers: ["Reifenbreite in mm", "Felgendurchmesser in mm", "Höchstgeschwindigkeit", "Tragfähigkeit in kg"],
    correct: 0,
    explain: "235 ist die Reifenbreite in Millimetern."
  },
  {
    title: "235/45 R21",
    text: "Reifen 235/45 R21: Was bedeutet die 45?",
    answers: ["45 mm Profil", "Flankenhöhe = 45 % der Reifenbreite", "45 km/h Mindestgeschwindigkeit", "45 Wochen alt"],
    correct: 1,
    explain: "Die 45 ist das Querschnittsverhältnis: Die Flankenhöhe beträgt 45 % der Breite."
  },
  {
    title: "235/45 R21",
    text: "Reifen 235/45 R21: Wofür stehen R und 21?",
    answers: ["Regenreifen, 21 bar", "Radialreifen, 21 Zoll Felgendurchmesser", "Reserverad, 21 kg", "Rennreifen, 21 mm Profil"],
    correct: 1,
    explain: "R steht für Radialreifen, 21 für den Felgendurchmesser in Zoll."
  },
  {
    title: "WIE ALT?",
    text: "Auf dem Reifen steht beim Herstellungsdatum \"0223\". Was heißt das?",
    answers: ["2. Februar 2023", "2. Woche 2023", "Februar 2002", "23. Februar"],
    correct: 1,
    explain: "Die ersten zwei Ziffern sind die Woche, die letzten zwei das Jahr: 2. Woche 2023."
  },
  {
    title: "WINTER?",
    text: "Woran erkennst du einen Winterreifen?",
    answers: ["Am Alpinsymbol (Berg mit Schneeflocke)", "An der Farbe", "Am Buchstaben W", "An der Reifenbreite"],
    correct: 0,
    explain: "Maßgeblich ist das Alpinsymbol, ein Berg mit Schneeflocke."
  },
  {
    title: "WO STEHT'S?",
    text: "Wo findest du die Angaben zum Reifendruck?",
    answers: ["Im Handschuhfach auf dem Fahrzeugschein", "In der Fahrertür oder im Tankdeckel", "Auf dem Lenkrad", "Auf der Windschutzscheibe"],
    correct: 1,
    explain: "Die Reifendrucktabelle klebt in der Fahrertür oder im Tankdeckel."
  },
  {
    title: "WOVON ABHÄNGIG?",
    text: "Wovon hängt der richtige Reifendruck ab?",
    answers: ["Von Außentemperatur und Uhrzeit", "Von Gewicht bzw. Beladung und Reifengröße", "Nur von der Marke", "Vom Ladestand der Batterie"],
    correct: 1,
    explain: "Der Reifendruck richtet sich nach Beladung und Reifengröße. Das zeigt die Tabelle."
  },
  {
    title: "WIE VIEL BAR?",
    text: "Enyaq mit normaler Beladung: Welcher Reifendruck steht in der Tabelle für Vorder- und Hinterachse?",
    answers: ["2,2 bar", "2,7 bar", "3,1 bar", "3,5 bar"],
    correct: 1,
    explain: "Normal beladen: vorne und hinten 2,7 bar, bei allen Reifengrößen R19 bis R21."
  },
  {
    title: "VOLL BELADEN!",
    text: "Enyaq voll beladen: Welcher Druck gilt an der Hinterachse?",
    answers: ["2,7 bar", "3,0 bar", "3,2 bar", "4,0 bar"],
    correct: 2,
    explain: "Voll beladen: vorne 3,1 bar, hinten 3,2 bar."
  },
  {
    title: "PRÜFPLAKETTE?",
    text: "Wie liest du die Prüfplakette auf dem hinteren Kennzeichen?",
    answers: ["Monat oben, Jahr in der Mitte", "Jahr oben, Monat in der Mitte", "Monat unten, Jahr oben", "Nur das Jahr zählt"],
    correct: 0,
    explain: "Der Monat steht oben, das Jahr in der Mitte der Plakette."
  },
  {
    title: "STEMPEL?",
    text: "Was zeigt der Zulassungsstempel auf dem Kennzeichen?",
    answers: ["Wann die nächste HU fällig ist", "Wo das Fahrzeug zugelassen ist und dass Steuern und Versicherung bezahlt sind", "Die Schadstoffklasse", "Das Baujahr"],
    correct: 1,
    explain: "Der Zulassungsstempel zeigt die Zulassungsbehörde und bestätigt, dass Steuer und Versicherung bezahlt sind."
  },
  {
    title: "BREMSE!",
    text: "Bremsflüssigkeit ist unter Minimum. Was tust du?",
    answers: ["Einfach Wasser nachfüllen", "Sofort anhalten und prüfen lassen", "Weiterfahren bis zum nächsten Service", "Scheibenwaschwasser nachfüllen"],
    correct: 1,
    explain: "Fehlt Bremsflüssigkeit, kann eine Undichtigkeit vorliegen: sofort anhalten und prüfen lassen."
  },
  {
    title: "KÜHLWASSER?",
    text: "Was ist im Kühlwasser enthalten?",
    answers: ["Nur Wasser", "Wasser und Frostschutz", "Öl und Wasser", "Bremsflüssigkeit"],
    correct: 1,
    explain: "Kühlwasser enthält Wasser und Frostschutz. Der Stand muss zwischen min und max liegen."
  },
  {
    title: "WIE VOLL?",
    text: "Wo muss der Flüssigkeitsstand im Motorraum (Kühlwasser, Bremsflüssigkeit, Waschwasser) liegen?",
    answers: ["Über max", "Zwischen min und max", "Unter min", "Egal, Hauptsache etwas drin"],
    correct: 1,
    explain: "Bei allen Behältern gilt: zwischen der min- und der max-Markierung."
  },
  {
    title: "WASCHWASSER?",
    text: "Was gehört ins Scheibenwaschwasser?",
    answers: ["Wasser, Reiniger, ggf. Frostschutz", "Kühlwasser", "Nur Leitungswasser mit Spülmittel", "Bremsflüssigkeit"],
    correct: 0,
    explain: "Scheibenwaschwasser enthält Wasser, Reiniger und im Winter Frostschutz."
  },
  {
    title: "WIE TIEF?",
    text: "Wie viel Profiltiefe müssen die Reifen am Pkw mindestens haben?",
    answers: ["1 mm", "1,6 mm", "2,5 mm", "4 mm"],
    correct: 1,
    explain: "Gesetzlich vorgeschrieben sind mindestens 1,6 mm Profiltiefe."
  },
  {
    title: "LICHTSCHALTER?",
    text: "Welche Stellung findest du NICHT am Lichtdrehschalter des Enyaq?",
    answers: ["Standlicht", "Abblendlicht", "Fernlicht", "Licht aus"],
    correct: 2,
    explain: "Am Drehschalter: Licht aus, Tagfahrlicht bzw. AUTO, Standlicht, Abblendlicht. Das Fernlicht schaltest du nicht dort."
  },
  {
    title: "WELCHE FARBE?",
    text: "Welche Farbe hat das Allwetterlicht (früher Nebellicht) vorne?",
    answers: ["Gelb", "Weiß", "Rot", "Blau"],
    correct: 1,
    explain: "Das Nebel- bzw. Allwetterlicht vorne leuchtet weiß."
  },
  {
    title: "KÜHLWASSER?",
    text: "Der Kühlwasserstand ist unter min. Was tust du?",
    answers: ["Nichts, Elektroautos brauchen das nicht", "Auffüllen und ggf. prüfen lassen", "Bremsflüssigkeit nachfüllen", "Scheibenwaschwasser einfüllen"],
    correct: 1,
    explain: "Fehlt Kühlwasser, füllst du es auf und lässt es gegebenenfalls prüfen."
  },
  {
    title: "EV-REIFEN?",
    text: "Was bedeutet ein Aufdruck wie \"e-Performance\" auf dem Reifen des Enyaq?",
    answers: ["Winterreifen", "Reifen speziell für Elektroautos", "Notrad", "Rennreifen"],
    correct: 1,
    explain: "Das ist ein EV-Reifen, abgestimmt auf Elektroautos."
  },
  {
    title: "STAU!",
    text: "Du kommst auf der Autobahn an ein Stauende. Was schaltest du ein?",
    answers: ["Fernlicht", "Nebelschlussleuchte", "Warnblinklicht", "Nur das Radio"],
    correct: 2,
    explain: "Das S in SUPAA: Am Stauende sicherst du mit dem Warnblinklicht nach hinten ab."
  },
  {
    title: "TAGFAHRLICHT?",
    text: "Reicht das Tagfahrlicht bei Dunkelheit aus?",
    answers: ["Ja, immer", "Nein, bei Dunkelheit brauchst du Abblendlicht", "Nur innerorts", "Nur mit Warnblinker"],
    correct: 1,
    explain: "Tagfahrlicht ersetzt bei Dunkelheit nicht das Abblendlicht."
  },
  {
    title: "GEGENVERKEHR!",
    text: "Du fährst nachts mit Fernlicht, und es kommt dir ein Auto entgegen. Was tust du?",
    answers: ["Fernlicht anlassen", "Rechtzeitig abblenden", "Lichthupe geben", "Nebelschlussleuchte an"],
    correct: 1,
    explain: "Fernlicht nur, wenn niemand geblendet wird. Bei Gegenverkehr rechtzeitig abblenden."
  },
  {
    title: "WINTER?",
    text: "Reicht heute nur die Kennzeichnung M+S für einen Winterreifen?",
    answers: ["Ja, M+S reicht immer", "Nein, entscheidend ist das Alpinsymbol", "Nur bei Elektroautos", "Nur bei Sommerreifen"],
    correct: 1,
    explain: "Als Winterreifen gilt heute nur ein Reifen mit Alpinsymbol, also Berg mit Schneeflocke."
  },
  {
    title: "WANN PRÜFEN?",
    text: "Wann prüfst du den Reifendruck am besten?",
    answers: ["Direkt nach einer langen Autobahnfahrt", "Bei kalten Reifen", "Nur im Sommer", "Nie, das macht die Werkstatt"],
    correct: 1,
    explain: "Die Werte in der Tabelle gelten für kalte Reifen. Warme Reifen zeigen einen höheren Druck."
  },
  {
    title: "HU?",
    text: "Wann muss ein neuer Pkw zum ersten Mal zur Hauptuntersuchung?",
    answers: ["Nach 1 Jahr", "Nach 2 Jahren", "Nach 3 Jahren", "Nach 5 Jahren"],
    correct: 2,
    explain: "Neue Pkw müssen nach 3 Jahren zur ersten HU, danach alle 2 Jahre."
  },
  {
    title: "FROST!",
    text: "Warum gehört im Winter Frostschutz ins Scheibenwaschwasser?",
    answers: ["Damit es besser riecht", "Damit es nicht einfriert", "Damit die Scheibe schneller trocknet", "Das ist nur Deko"],
    correct: 1,
    explain: "Ohne Frostschutz friert das Waschwasser ein, und du hast keine freie Sicht mehr."
  },
  {
    title: "LANE ASSIST?",
    text: "Wie schaltest du beim Enyaq den Lane Assist (Spurhalteassistent) aus?",
    answers: ["Den Warnblinkschalter 3 Sekunden gedrückt halten", "Den Blinkerhebel nach vorne drücken", "Den Shortcut auf dem Display herunterziehen und das Symbol Lane Assist drücken", "Den Hebel unter dem Blinkerhebel zu dir heranziehen", "Die Taste am Lichtdrehschalter drücken"],
    correct: 2,
    explain: "Beim Enyaq ziehst du die Shortcut-Leiste auf dem Display herunter und tippst auf das Symbol Lane Assist."
  },
  {
    title: "ACC EINSCHALTEN?",
    text: "Wie aktivierst du beim Enyaq den adaptiven Geschwindigkeitsregelautomaten (ACC)?",
    answers: ["Den Blinkerhebel zu dir heranziehen", "Den Hebel unter dem Blinkerhebel zu dir heranziehen", "Den Shortcut auf dem Display herunterziehen", "Den Lichtdrehschalter auf AUTO stellen"],
    correct: 1,
    explain: "Den Hebel unter dem Blinkerhebel zu dir heranziehen. Den Blinkerhebel heranzuziehen wäre die Lichthupe."
  },
  {
    title: "ACC-TEMPO?",
    text: "Wie stellst du beim ACC die gewünschte Geschwindigkeit ein?",
    answers: ["Hebel nach unten = schneller, nach oben = langsamer", "Hebel nach vorne = schneller, nach hinten = langsamer", "Nur mit dem Gaspedal, der Hebel kann das nicht", "Hebel nach oben = schneller, nach unten = langsamer"],
    correct: 3,
    explain: "Hebel nach oben drücken: schneller. Hebel nach unten drücken: langsamer."
  },
  {
    title: "ACC-ABSTAND?",
    text: "Wofür ist der kleine Schalter oben auf dem ACC-Hebel?",
    answers: ["Abstand: nach links weniger Abstand, nach rechts mehr Abstand", "Abstand: nach links mehr Abstand, nach rechts weniger Abstand", "Er schaltet den Lane Assist ein und aus", "Er stellt die Geschwindigkeit in 10er-Schritten ein"],
    correct: 0,
    explain: "Mit dem kleinen Schalter oben auf dem Hebel stellst du den Abstand zum Vorausfahrenden ein: nach links weniger, nach rechts mehr Abstand."
  }
];

// ===== Quiz-Übersicht =====
// Fortbildung: kein Zeitlimit, 20 Fragen pro Spiel, 50 Punkte pro richtiger Antwort (max. 1.000)
// repeat: true = beliebig oft spielbar (keine Sperre pro Runde)
const FB = { timer: false, perGame: 20, pointsPerCorrect: 50, repeat: true, back: "fortbildung.html", backLabel: "Fortbildung" };

const ALL_QUIZZES = {
  freitag: { label: "Freitags Frage", configDoc: "current", questions: QUESTIONS },
  technik: { label: "Anhänger Quiz", configDoc: "technik", questions: TECHNIK_QUESTIONS },
  technikb: { label: "Technikquiz B-Prüfung", configDoc: "technikb", questions: TECHNIKB_QUESTIONS },
  fbpaed: { label: "Fortbildung · Pädagogik", configDoc: "fbpaed", questions: PAEDAGOGIK_QUESTIONS, ...FB },
  fbrecht: { label: "Fortbildung · Verkehrsrecht", configDoc: "fbrecht", questions: VERKEHRSRECHT_QUESTIONS, ...FB },
  fbfe: { label: "Fortbildung · Fahrerlaubnisrecht", configDoc: "fbfe", questions: FAHRERLAUBNISRECHT_QUESTIONS, ...FB },
  fbtechnik: { label: "Fortbildung · Technik", configDoc: "fbtechnik", questions: FB_TECHNIK_QUESTIONS, ...FB }
};

// Nur Quizze mit Fragen sind aktiv
export const QUIZZES = Object.fromEntries(Object.entries(ALL_QUIZZES).filter(([, q]) => q.questions.length > 0));
