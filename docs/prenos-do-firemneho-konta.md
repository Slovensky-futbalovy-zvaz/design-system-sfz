# Prenos SFZ Design Systemu do iného konta Claude

Artefakty na claude.ai patria kontu, v ktorom vznikli. Zdrojom pravdy je preto tento repozitár: obsahuje tokeny, komponenty, logá, brand book, náhľady, šablóny slajdov aj skill. Z neho sa dá design systém postaviť v akomkoľvek konte.

## 1. Pripojte GitHub

Repozitár je verejný, takže na čítanie stačí jeho adresa. Vo firemnom konte Claude pripojte GitHub s prístupom k organizácii **Slovensky-futbalovy-zvaz** a k repozitáru `design-system-sfz` len vtedy, ak má Claude do repozitára aj zapisovať (ak je aplikácia Claude povolená len pre vybrané repozitáre, pridajte ho v nastaveniach organizácie: Settings → GitHub Apps → Claude → Repository access). Použitie obsahu sa riadi [`LICENSE.md`](../LICENSE.md).

## 2. Vytvorte artefakt design systému

Napíšte Claude:

> Vytvor Design System artefakt „SFZ Design System“ z repozitára Slovensky-futbalovy-zvaz/design-system-sfz. Postupuj podľa docs/artefakt/README.md: brand book z docs/brand-book.md, tokeny z tokens/tokens.json, komponenty a náhľady z components/ a docs/artefakt/components/, logá zo všetkých skupín v brand/logos/ nahraj ako assety.

Výsledok skontrolujte: farby a logá v sekcii Assets, náhľady komponentov vo svetlej aj tmavej téme.

## 3. Uložte skill pre prezentácie

Skill je v [`docs/skills/sfz-prezentacia/SKILL.md`](skills/sfz-prezentacia/SKILL.md). Vo firemnom konte napíšte Claude:

> Ulož ako skill obsah súboru docs/skills/sfz-prezentacia/SKILL.md z repozitára Slovensky-futbalovy-zvaz/design-system-sfz.

Claude ukáže kartu so skillom, ktorú potvrdíte. Skill hľadá design systém podľa názvu „SFZ Design System“, preto funguje v každom konte, kde tento artefakt existuje.

## 4. Zdieľajte s tímom

- Artefakt: na stránke systému menu **Share** → pridajte kolegov alebo organizáciu (prístup na čítanie stačí na používanie v prezentáciách).
- Repozitár: prístup pre vývojárov v GitHub organizácii.
- Ak to váš plán umožňuje, nastavte SFZ Design System ako predvolený pre organizáciu – Claude ho potom použije automaticky.

## 5. Existujúce prezentácie

Prezentácie z pôvodného konta stiahnite cez Share → Export ako PPTX alebo PDF, prípadne ich zdieľajte odkazom. Pri prepracovaní vo firemnom konte stačí Claude poslať PDF a požiadať o novú verziu so SFZ Design Systemom.
