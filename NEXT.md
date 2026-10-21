# NEXT – otvorené body

Stav k 21. 10. 2026 (v1.4.0). Pred tvrdením, že bod je otvorený, overte `git log`.

## Rozhodnúť
- [ ] **Plné červené tlačidlo (`Button variant="danger"`)**: biela na `#ec1c24` má 4,41 : 1 a pri 17 px texte nesplní WCAG AA (4,5 : 1). Návrh: nový token `danger-solid` `#dc1a21` (4,98 : 1) len pre plné červené plochy s textom; logá a značka ostávajú `#ec1c24` podľa manuálu. Vyžaduje súhlas (odchýlka od manuálu v UI).
- [ ] **Podmienky použitia (`LICENSE.md`)**: dať na kontrolu právnemu oddeleniu SFZ, najmä vymedzenie „zmluvného partnera“.

## Doplniť
- [ ] Ročníkové varianty log (Futbalista roka, Grassroots Gala) pre aktuálny rok z nového manuálu.
- [ ] Čierne a biele verzie ročníkových variantov (manuál ich neuvádza).
- [ ] Náhľad komponentov v repozitári (napr. Storybook alebo jednoduchá Next.js stránka `/ukazky`), aby vývojári nemuseli otvárať artefakt.
- [ ] Publikovanie balíka do GitHub Packages (`@sfz/design-system`) namiesto inštalácie z gitu.
- [ ] CI (GitHub Actions): `npm run check` na každý pull request. Vyžaduje súhlas (zmena CI).
- [ ] QR kód: vlastná kópia knižnice `qrcode-generator` v `tools/qr/` pre úplne offline použitie (dnes webový nástroj načítava knižnicu z cdnjs).
- [ ] ESLint s pravidlami pre React a prístupnosť (`eslint-plugin-jsx-a11y`); dnes `npm run lint` = typová kontrola.

## Synchronizácia s artefaktom
- [ ] Zmeny tokenov a komponentov robiť tu; do artefaktu SFZ Design System ich prenášať pri vydaní novej verzie.
