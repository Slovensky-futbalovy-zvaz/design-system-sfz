# Changelog

Formát podľa [Keep a Changelog](https://keepachangelog.com/sk/1.1.0/), verzie podľa [SemVer](https://semver.org/lang/sk/).

## [Nevydané]

### Zmenené
- Repozitár je verejný. Nové podmienky použitia v `LICENSE.md`: zamestnanci a zmluvní partneri SFZ môžu obsah používať na prácu pre SFZ, ostatní len s predchádzajúcim písomným súhlasom SFZ; logá ostávajú ochrannými známkami. README, `package.json` a návod na prenos upravené.

## [1.3.0] – 2026-10-21

### Pridané
- Vzor slajdu `LinkList` – zoznam s linkou namiesto klasických odrážok: zvislá linka, tučný začiatok a vysvetlenie (`docs/prezentacie/LinkList.md`, náhľad v `docs/artefakt/components/LinkList/`, trieda `.linklist` v šablónach).
- Tokeny `slide-band`, `slide-list-title`, `slide-list-text` (typografia) a `slide-band-height` (104 px).

### Zmenené
- Obsahový slajd má hore modrý pás na celú šírku s bielym textom „Blok · téma“ namiesto modrého eyebrow (`SlideContent`, šablóny 03 – 06, trieda `.slide--content` a `.band`); náhľady šablón pregenerované.
- Brand book a skill `sfz-prezentacia`: pravidlá pre modrý pás a zákaz klasických odrážok.

### Zastarané
- `ul.bullets` v `slide.css` – používajte `.linklist`.

## [1.2.0] – 2026-10-21

### Pridané
- Skill pre Claude `docs/skills/sfz-prezentacia/SKILL.md`: prezentácie SFZ v Claude Slides so SFZ Design Systemom.
- Zdroje artefaktu `docs/artefakt/`: 32 živých náhľadov komponentov a obálky (odkazy na logá prepísané na `brand/logos/`) a mapovanie súborov na artefakt.
- Návod `docs/prenos-do-firemneho-konta.md`: obnova artefaktu a skillu v inom konte Claude z tohto repozitára.
- Test zdrojov artefaktu (úplnosť náhľadov, platné odkazy na logá, hlavička skillu).

## [1.1.0] – 2026-10-21

### Pridané
- Šablóny slajdov 1920×1080 v `templates/prezentacie/`: titul, predel bloku, obsahový slajd, kľúčové čísla, časová os, citát a karty, záver. Používajú `tokens.css` a logá z `brand/logos/`, zmenšujú sa podľa okna a tlačia sa do PDF v plnej veľkosti.
- Prehľad šablón `templates/prezentacie/index.html` (mobile first) a náhľady PNG.
- Test, že šablóny odkazujú len na existujúce súbory a nepoužívajú pevné farby.

## [1.0.0] – 2026-10-21

### Pridané
- Tokeny (`tokens/tokens.json`): farby SFZ z Design Manualu 2024‑01, svetlá a tmavá téma, stavové farby, typografia Apple HIG (prezentácia, dokument/web, komponenty), medzery, rádiusy, tiene, breakpointy, z‑index, animácie.
- Generátor `scripts/build-tokens.mjs` → `tokens/tokens.css` vrátane `prefers-color-scheme`.
- 25 React komponentov (`components/src/`), štýly `components/bundle.css`, typy `components/index.d.ts`, UMD bundle `components/bundle.js`.
- Dokumentácia komponentov (`components/docs/`), brand book (`docs/brand-book.md`), vzory slajdov (`docs/prezentacie/`).
- Logá 16 značiek z manuálu (SFZ A–D, Národný tím, 30 rokov NT, Slovakia Cup U18, Regionálny turnaj, Školský pohár, Dajme spolu gól, Grassroots program, Vzdelávanie trénerov, Asociácia rozhodcov, Nadácia SFZ, Futbalista roka + ročník, Grassroots Gala + ročníky, Sieň slávy, Konferencia SFZ, Konferencia Šport a spoločnosť A/B) vo farebnej, čiernej a bielej verzii, SVG + PNG.
- Testy (Vitest): integrita a kontrast tokenov v oboch témach, aktuálnosť `tokens.css`, render a správanie komponentov.

### Opravené (oproti verzii v artefakte z 21. 10. 2026 16:52)
- Tmavá téma: modrý text a ikony používajú nový token `brand-blue-ink` (kontrast 5,6–7,2 : 1 namiesto 2,3–3,0 : 1).
- `border-strong` zvýšený na ≥ 3 : 1 v oboch témach; okraj vstupných polí používa `border-strong`.
- Nedeľa v kalendári používa `danger-ink`.
- Brand book: opravený údaj o kontraste bielej na červenej SFZ (4,4 : 1, nie 4,6 : 1).
