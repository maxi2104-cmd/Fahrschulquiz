#!/usr/bin/env python3
# Erzeugt ../schilder-daten.js aus den Bildern in diesem Ordner und lizenzen.csv.
# Nach dem Hinzufügen oder Löschen von Bildern einfach erneut ausführen:
#   python3 schilder-index-erstellen.py
import csv, json, os, re, unicodedata, urllib.parse

HIER = os.path.dirname(os.path.abspath(__file__))
ZIEL = os.path.join(HIER, "..", "schilder-daten.js")
WEGLASSEN = ("Collage", "RAL-Gütesiegel")
SONDER = ("Lichtzeichen", "Bild 2", "Bild 3", "Nichtamtliches", "Hinweiszeichen Wasserschutzgebiet")

nfc = lambda s: unicodedata.normalize("NFC", s)

# vollständige Originalnamen aus den Quell-Links (Dateinamen sind teils abgeschnitten)
voll = {}
with open(os.path.join(HIER, "lizenzen.csv"), encoding="utf-8") as fh:
    for datei, _lizenz, quelle in list(csv.reader(fh, delimiter=";"))[1:]:
        name = urllib.parse.unquote(quelle.split("/File:", 1)[1]).replace("_", " ")
        voll[nfc(datei)] = re.sub(r"\.svg$", "", name)

KOPF = re.compile(r"^(?:Zusatzzeichen|Zeichen)\s+(\d+(?:\.\d+)?)((?:-[\d,]+)?(?:\s*bis\s*\d+)?(?:\s+[ab](?=\s|$))?)\s*(.*)$")

def aufraeumen(rest):
    jahr = re.search(r"(?:StVO|BOStab|EBO|BStMI)\s+(\d{4})", rest)
    rest = re.sub(r"[,;]?\s*StVO\b.*$", "", rest)
    rest = re.sub(r"\(?\b\d{3,4}\s*x\s*[\d.,]+\)?", "", rest)
    rest = re.sub(r"^[\s\-–−,;:]+|[\s\-–−,;:]+$", "", rest)
    rest = re.sub(r"\s{2,}", " ", rest).replace("km-h", "km/h")
    return rest, (jahr.group(1) if jahr else "")

eintraege = []
for f in sorted(os.listdir(HIER)):
    if not f.lower().endswith(".png") or f.startswith(WEGLASSEN):
        continue
    f = nfc(f)
    original = voll.get(f, f[:-4])
    m = KOPF.match(original)
    if m:
        nr, var, rest = m.group(1), m.group(2).strip(), m.group(3)
        titel, jahr = aufraeumen(rest)
        sonder = ""
    elif f.startswith(SONDER):
        nr, var = "", ""
        titel, jahr = aufraeumen(original)
        titel = re.sub(r"^Bild \d+ - |^Nichtamtliches Hinweiszeichen - ", "", titel)
        titel = re.sub(r",\s*(?:(?:BOStab|EBO|BStMI)|Ausführung seit)\s+\d{4}$", "", titel)
        sonder =next(k for k in ("Lichtzeichen", "Nichtamtliches", "Hinweiszeichen Wasserschutzgebiet")
                      if k in original)
    else:
        print("übersprungen:", f)
        continue
    e = {"f": f, "n": nr, "v": var, "t": titel, "j": jahr}
    if sonder: e["s"] = sonder
    if original != f[:-4]: e["w"] = original   # Name auf Wikimedia Commons
    eintraege.append({k: v for k, v in e.items() if v})

def sortkey(e):
    nr = float(e.get("n", 9999))
    var = re.findall(r"\d+", e.get("v", ""))
    return (nr, [int(x) for x in var], e["f"])

eintraege.sort(key=sortkey)
with open(ZIEL, "w", encoding="utf-8") as out:
    out.write("// Automatisch erzeugt von Verkehrszeichen/schilder-index-erstellen.py – nicht von Hand bearbeiten.\n")
    out.write("// f = Datei, n = Nummer, v = Variante, t = Name, j = Ausführung (Jahr), w = Name auf Wikimedia Commons\n")
    out.write("export const SCHILDER = [\n")
    out.write(",\n".join(json.dumps(e, ensure_ascii=False, separators=(",", ":")) for e in eintraege))
    out.write("\n];\n")
print(len(eintraege), "Schilder ->", os.path.normpath(ZIEL))
