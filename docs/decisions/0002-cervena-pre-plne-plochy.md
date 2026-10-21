# ADR 0002 – Červená pre plné plochy s textom (`danger-solid`)

- **Stav:** prijaté
- **Dátum:** 2026-10-22
- **Rozhodol:** Ján Letko

## Kontext

Červená SFZ z manuálu `#ec1c24` má s bielym textom kontrast 4,41 : 1. WCAG 2.2 AA vyžaduje pre bežný text 4,5 : 1, takže plné červené tlačidlo (`Button variant="danger"`, 17 px) a odznak v `TabBar` (10 px) normu nesplnili.

## Rozhodnutie

Nový token `danger-solid` = `#dc1a21` (biela na ňom 4,98 : 1) len pre plné červené plochy, na ktorých je text. Logá, značka a akcenty (čísla, značky na časovej osi, ikony, okraje) ostávajú `brand-red` `#ec1c24` presne podľa manuálu. Kontrast `on-brand` na `danger-solid` ≥ 4,5 : 1 stráži test.

## Dôsledky

- Odchýlka od manuálu je obmedzená na UI prvky s textom a voľným okom je takmer nepostrehnuteľná.
- Nové komponenty s plnou červenou plochou a textom musia použiť `danger-solid`, nie `danger` ani `brand-red`.
