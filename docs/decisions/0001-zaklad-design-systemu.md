# ADR 0001 – Základ design systému SFZ

- **Stav:** prijaté
- **Dátum:** 2026-10-21
- **Rozhodol:** Ján Letko

## Kontext

Webové aplikácie SFZ (ISSF, sportnet.online, ClubUp, futbalnet) aj prezentácie používali farby a logá nejednotne. SFZ Design Manual 2024‑01 definuje logá a farby, ale nie rozhranie aplikácií. Predvolený stack SFZ je Next.js (App Router), MongoDB Atlas a Vercel, testy vo Vitest.

## Rozhodnutie

1. **Značka z manuálu, rozhranie z Apple HIG.** Farby a logá preberáme presne z SFZ Design Manualu 2024‑01. Typografiu, mriežku, rádiusy a navigačné vzory z Apple Human Interface Guidelines. Používame systémové písmo (SF Pro, Segoe UI, Roboto), žiadne webfonty.
2. **Tokeny ako jediný zdroj hodnôt.** `tokens/tokens.json` v zoznamovom formáte artefaktu SFZ Design System. CSS sa generuje skriptom, komponenty používajú len CSS premenné.
3. **React komponenty bez závislostí** (okrem Reactu 18/19), distribuované ako TypeScript zdroj. Next.js ich prekompiluje cez `transpilePackages`. Žiadny build krok v repozitári.
4. **Mobile first a prístupnosť ako testovaná požiadavka.** Kontrast farieb v oboch témach kontroluje test; render a správanie komponentov testuje Vitest s jsdom.
5. **Repozitár je zdroj pravdy pre kód, artefakt na claude.ai je prehliadateľný brand book.** Zmeny idú cez pull request sem a pri vydaní sa prenesú do artefaktu.
6. **Nové devDependencies:** `vitest`, `jsdom`, `@testing-library/react`, `typescript`, `@types/react*`. Runtime závislosti žiadne.

## Dôsledky

- Projekty inštalujú balík z GitHubu (alebo neskôr z GitHub Packages) a potrebujú `transpilePackages`.
- Odchýlka od manuálu v UI farbách (napr. tmavšia červená pre plné tlačidlo) vyžaduje rozhodnutie a nový ADR.
- Artefakt a repozitár sa automaticky nesynchronizujú. Ich súlad je úloha pri vydaní.
