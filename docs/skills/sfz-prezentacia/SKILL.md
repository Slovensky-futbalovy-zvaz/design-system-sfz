---
name: sfz-prezentacia
description: Prezentácia, slajdy alebo deck pre Slovenský futbalový zväz (SFZ) – vždy v Claude Slides so SFZ Design Systemom, po slovensky a podľa vzorov slajdov SFZ.
---

# SFZ prezentácia

Používaj vždy, keď používateľ chce prezentáciu, slajdy, deck alebo podklady na vystúpenie za SFZ (zväz, ISSF, sportnet.online, futbalnet, ClubUp, programy ako Dajme spolu gól, Grassroots, Futbalista roka…).

## 1. Pred začatím

Opýtaj sa naraz (ak to už nie je jasné zo zadania):
- dĺžka vystúpenia v minútach a publikum,
- formát: Claude Slides (predvolené) alebo súbor .pptx,
- či sú k dispozícii novšie čísla, než ktoré sú v podkladoch.
Potom navrhni osnovu (bloky, minutáž, počet slajdov) a počkaj na schválenie. Až potom tvor slajdy.

## 2. Design systém

- Prezentáciu vytvor z typu **Slides**.
- Ako design systém použi artefakt **„SFZ Design System“** (nájdi ho v zozname Design System artefaktov podľa názvu) a nainštaluj ho do decku podľa pokynov typu Slides. Nikdy si nevymýšľaj vlastnú paletu.
- Ak v konte SFZ Design System nie je: povedz to a ponúkni jeho vytvorenie z GitHub repozitára `Slovensky-futbalovy-zvaz/sfz-design-system` (tokens/tokens.json, brand/logos/, docs/brand-book.md, templates/prezentacie/).
- Logá ber len zo systému alebo z repozitára (`brand/logos/`); nikdy ich nekresli ani neprefarbuj. Na modrej ploche biely variant, na bielej farebný. Logo D v päte každého slajdu (56 px), logo A na titulnom a záverečnom slajde.

## 3. Skladba prezentácie (vzory SFZ)

1. **Titul** – modrá plocha, eyebrow s miestom a dátumom, názov, podtitul, meno v päte.
2. **Predel bloku** – modrá plocha, „Blok N · obdobie · minúty“, názov bloku, jedna veta; každý blok začína predelom.
3. **Obsahový slajd** – biela plocha, hore modrý pás na celú šírku (104 px, `surface-brand`) s bielym textom „Blok N · téma“ verzálkami, pod ním nadpis s jednou myšlienkou (max. 2 riadky), zoznam max. 5 položiek, voliteľne karta s číslom vpravo (mriežka 7+5).
   - **Žiadne klasické odrážky.** Zoznam je vždy vzor `LinkList`: zvislá linka 6 px vľavo (`brand-blue-ink`, neutrálny stĺpec `grey-9`), tučný začiatok (`slide-list-title`, 28 px) a pod ním vysvetlenie (`slide-list-text`, 24 px, `ink-muted`). Dôležité fakty (miesto, počet, historka) patria do vysvetlenia na slajde, nie len do poznámok.
   - Lekcia alebo pointa: vzor `LessonCard` – karta `brand-blue-tint` s tučným modrým začiatkom („Lekcia pre manažment: …“), najviac jedna na slajde, dole.
4. **Kľúčové čísla** – max. 3 dlaždice; najviac jedno číslo červené, jedna dlaždica zvýraznená modrým tintom. Pri nákladoch alebo rozpočte vzor **Čísla s rozpisom** (`StatBreakdown`): tri dlaždice vľavo, rozpis so sumami v `LinkList` vpravo; súčty prepočítaj, obdobie (mesačne, ročne) vždy uveď.
5. **Časová os** – vodorovná max. 6 bodov; pre 6 – 10 udalostí zvislá os s krúžkami (`TimelineVertical`), rok a text v jednom riadku. Pointa (zlom) červená, najviac jedna.
6. **Citát a karty** – tvrdenie + citát v slovenských úvodzovkách „ “.
7. **Záver** – „Ďakujem. Otázky?“, kontakt (e‑mail, LinkedIn), weby SFZ a QR kód v bielej karte vpravo. QR kód vytvor generátorom SFZ (`tools/qr/` v repozitári, `npm run qr -- "odkaz"`): okrúhle body, logo SFZ v strede, tvar kruh. Odkaz daj ten, ktorý zadá používateľ; nikdy si ho nevymýšľaj. Kód pred použitím over dekóderom. Do prezentácie nahraj PNG (úložisko assetov zo SVG odstráni vložené logo).

Päta každého slajdu: vľavo názov prezentácie a číslo slajdu, vpravo logo SFZ. Vzory sú v repozitári v `templates/prezentacie/`.

## 4. Pravidlá obsahu

- Slovenčina. 1. osoba množného čísla za SFZ („zaviedli sme“), publikum v 2. osobe.
- Žiadny žargón: nie „implementácia“, „fulltime“, „rollout“ – ale „zaviedli“, „naplno“, „spustili“.
- Čísla s medzerou ako oddeľovačom tisícov a desatinnou čiarkou (47 957 400 €, 1,76 mil. €), dátumy 21. 10. 2026. Medzi číslom a jednotkou (10 399 €, 78 %, 9,57 TB), v skupinách tisícov (44 000) a v dátumoch (1. 7. 2012) je nedeliteľná medzera (U+00A0, `&nbsp;`), aby sa nerozdelili na konci riadku.
- Každé číslo má zdroj a rok v päte alebo v poznámke; nikdy si čísla ani citáty nevymýšľaj – chýbajúce daj do [hranatých zátvoriek] a vypíš ich používateľovi.
- Modrá je identita, červená len signál (max. raz na slajd). Žiadne emoji, žiadne gradienty.
- Ku každému slajdu napíš poznámky pre rečníka (historky, mená na poďakovanie, otázky do publika).

## 5. Doplnok na vytlačenie

Ak ide o vystúpenie, ponúkni aj jednostranovú A4 osnovu (PDF): minutáž po blokoch, kľúčové čísla a „Nezabudni“ body.

## 6. Kontrola pred odovzdaním

- Počet slajdov zodpovedá dĺžke (cca 1 slajd na 2 minúty).
- Každý blok má predel, každý slajd pätu s logom, každý biely obsahový slajd modrý pás hore.
- Na žiadnom slajde nie sú klasické odrážky (`<ul>` s bodkami); zoznamy sú `LinkList`.
- Všetky čísla majú zdroj; neznáme hodnoty sú označené a vypísané v odpovedi.
