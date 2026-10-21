# ADR 0003 – Balík v GitHub Packages a CI

- **Stav:** prijaté
- **Dátum:** 2026-10-22
- **Rozhodol:** Ján Letko

## Kontext

Projekty inštalovali design systém priamo z gitu (`github:…#vX.Y.Z`). Chýbala automatická kontrola zmien a verzovaný balík v registri.

## Rozhodnutie

1. Balík sa publikuje do GitHub Packages pri každom zverejnenom releasi (`.github/workflows/publish.yml`). GitHub Packages vyžaduje meno so scope organizácie, preto `@slovensky-futbalovy-zvaz/design-system`. Projekty môžu ponechať importy `@sfz/design-system` cez npm alias.
2. Každý pull request a push do `main` kontroluje CI (`.github/workflows/ci.yml`): tokeny, TypeScript, ESLint, testy.
3. Inštalácia z gitu ostáva ako záložná možnosť bez tokenu.

## Dôsledky

- Spotrebitelia potrebujú token s `read:packages` (aj pri verejnom balíku).
- Verzia v `package.json` musí pred releasom sedieť s tagom, inak publikovanie zlyhá.
