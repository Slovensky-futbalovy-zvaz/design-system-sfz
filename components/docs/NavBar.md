# NavBar

Horná navigácia aplikácie alebo webu. `brand` (logo D z assetov: farebné na `light`, biele na `brand`), `items`, `actions`, `onMenu`.

- Pod 768 px sa odkazy skryjú a zobrazí sa hamburger (`onMenu` otvorí Drawer); mobilnú hlavnú navigáciu rieši TabBar.
- `tone="brand"` pre verejné weby SFZ, `light` pre pracovné aplikácie (ISSF‑like).
- Sticky s `safe-area-inset-top`; výška 56 px mobil, 64 px desktop.
