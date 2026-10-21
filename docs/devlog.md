# Devlog

Pracovný denník repozitára. Najnovší záznam hore. E‑maily, tokeny a ID sú v zápisoch maskované.

## 2026-10-21 (večer) – v1.4.0

**Čo sa urobilo**
- Generátor QR kódu SFZ (`tools/qr/`): jeden renderer `sfz-qr.js` pre prehliadač aj Node (cez `vm`), logo A vkladané bez úprav z `brand/` (`npm run build:qr-logo`), tvar kruh/štvorec, modrá/čierna.
- Vzory z prezentácie UKF Nitra: zvislá časová os, čísla s rozpisom, karta „Lekcia“, záver s QR kódom; šablóny 08 a 09.
- Pravidlo nedeliteľnej medzery do brand booku a skillu.

**Čo treba vedieť**
- Čitateľnosť QR overená dekóderom ZXing (zxing-cpp) pri 150 – 1024 px; dlhé odkazy (~100 znakov) pri malej veľkosti a natočení zlyhávajú občas → v dokumentácii odporúčanie skracovať odkazy, min. 280 px na slajde / 3 cm v tlači. OpenCV QRCodeDetector okrúhle body nečíta (nie je cieľový dekodér).
- Webový nástroj načítava `qrcode-generator` z cdnjs (pinovaná 1.4.4); bez internetu funguje len `npm run qr`.

**Čo nefungovalo a prečo**
- Úložisko assetov artefaktu odstránilo z nahraného SVG vložené logo (sanitizácia `href` s data URI); v artefakte je preto náhľad QR ako PNG a dokumentácia odporúča PNG pre takéto systémy.
- Pri polomere bodu 0,43 modulu zlyhávali dlhé odkazy častejšie; zväčšené na 0,46.

## 2026-10-21

**Čo sa urobilo**
- v1.0.0 – v1.2.0: tokeny, React komponenty, logá, šablóny slajdov, skill `sfz-prezentacia`, zdroje artefaktu a návod na prenos do firemného konta.
- v1.3.0: modrý pás v hlavičke obsahového slajdu a vzor `LinkList` (zoznam s linkou namiesto klasických odrážok) podľa spätnej väzby na prezentáciu „Digitalizácia slovenského futbalu“ (UKF Nitra, 22. 10. 2026). Nové tokeny `slide-band`, `slide-list-title`, `slide-list-text`, `slide-band-height`.
- Repozitár prepnutý na public; pridané podmienky použitia `LICENSE.md` (zamestnanci a zmluvní partneri SFZ, ostatní len so súhlasom; kontakt o***@futbalsfz.sk).
- Tagy v1.0.0 – v1.3.0 vytvorené cez GitHub Releases a overené proti commitom.

**Čo treba vedieť**
- Artefakt SFZ Design System na claude.ai je synchronizovaný s v1.3.0 (LinkList, SlideContent s pásom, tokeny). Podmienky použitia sa artefaktu netýkajú.
- Push tagov z prostredia Claude cez proxy neprechádza; tagy sa robia cez Releases.

**Čo nefungovalo a prečo**
- `import.meta.url` v testoch pod jsdom – nahradené `process.cwd()`.
- Biela na `brand-red` má 4,41 : 1, nie 4,6 : 1, ako uvádzal pôvodný text; otvorené rozhodnutie `danger-solid` v `NEXT.md`.
