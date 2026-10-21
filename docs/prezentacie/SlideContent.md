# SlideContent

Bežný svetlý slajd s modrým pásom hore: pás `surface-brand` na celú šírku, výška `slide-band-height` (104 px), v ňom text `slide-band` v `on-brand` (blok · téma, verzálky, od ľavého okraja 128 px). Pod pásom nadpis (`slide-h1`, max. dva riadky) a obsah v mriežke 7+5, 6+6 alebo 4+4+4 s medzerou `space-7`. Päta: názov prezentácie a číslo slajdu vľavo (`slide-caption`, `ink-muted`), logo D farebné vpravo (56 px).

- Obsah začína 80 px pod pásom (horný odstup slajdu 184 px), okraje 128 px zľava a sprava, päta 64 px od spodku.
- Pás majú všetky biele obsahové slajdy; titul, predel bloku a záver sú celé modré a pás nemajú.
- Zoznamy vždy ako `LinkList` (zvislá linka, tučný začiatok, vysvetlenie), nie klasické odrážky. Max. 5 položiek.
- Pravý stĺpec je voliteľný: `StatTile`, obrázok (`radius-lg`) alebo `Card`.
- Lekcia alebo pointa slajdu: karta `brand-blue-tint` s tučným modrým začiatkom („Lekcia pre manažment:“).
