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
  }
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
  }
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
