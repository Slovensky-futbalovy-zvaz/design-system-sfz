# Vzory slajdov

HTML vzory pre prezentácie 16:9 (1920×1080 px). Nie sú to React komponenty. Používajú triedy a premenné z `tokens/tokens.css` (`slide-display`, `slide-h1`, `slide-body`, `slide-stat`, `slide-caption`, `slide-eyebrow`).

| Vzor | Kedy |
| --- | --- |
| [SlideTitle](SlideTitle.md) | titulný slajd, raz na prezentáciu |
| [SlideSection](SlideSection.md) | modrý predel medzi blokmi |
| [SlideContent](SlideContent.md) | bežný obsahový slajd s modrým pásom hore |
| [LinkList](LinkList.md) | zoznam s linkou namiesto klasických odrážok |
| [StatTile](StatTile.md) | dlaždice s číslami (max. 3) |
| [Timeline](Timeline.md) | vodorovná časová os |
| [TimelineVertical](TimelineVertical.md) | zvislá časová os pre 6 – 10 udalostí |
| [LessonCard](LessonCard.md) | karta „Lekcia“ – pointa slajdu |
| [StatBreakdown](StatBreakdown.md) | čísla s rozpisom (napr. náklady) |
| [QrCode](QrCode.md) | QR kód SFZ s logom v strede, generátor v `tools/qr/` |
| [LogoLockup](LogoLockup.md) | správne použitie loga na svetlom a modrom |

Hotové HTML šablóny sú v [`templates/prezentacie/`](../../templates/prezentacie/) (prehľad `index.html`). Živé náhľady sú aj v artefakte SFZ Design System na claude.ai. Prezentácie sa najrýchlejšie tvoria v Claude Slides s nainštalovaným SFZ Design Systemom.
