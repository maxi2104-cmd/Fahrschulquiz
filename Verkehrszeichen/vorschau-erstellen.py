#!/usr/bin/env python3
# Erzeugt kleine Vorschaubilder (max. 220 px) in Verkehrszeichen/vorschau/ für Übersicht und Variantenleiste.
# Nach dem Hinzufügen neuer Bilder erneut ausführen:  python3 vorschau-erstellen.py   (benötigt Pillow)
import os
from PIL import Image
HIER = os.path.dirname(os.path.abspath(__file__)); ZIEL = os.path.join(HIER, "vorschau"); os.makedirs(ZIEL, exist_ok=True)
n = 0
for f in sorted(os.listdir(HIER)):
    if not f.lower().endswith(".png"): continue
    out = os.path.join(ZIEL, f)
    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(os.path.join(HIER, f)): continue
    im = Image.open(os.path.join(HIER, f)).convert("RGBA"); im.thumbnail((220, 220), Image.LANCZOS)
    im.quantize(colors=128, method=Image.FASTOCTREE).save(out, optimize=True); n += 1   # 128 Farben reichen für Schilder
print(n, "Vorschaubilder erstellt in", ZIEL)
