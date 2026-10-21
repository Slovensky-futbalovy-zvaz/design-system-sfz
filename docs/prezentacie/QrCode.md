# QrCode

QR kód SFZ: okrúhle body, zaoblené rohové značky, v strede logo SFZ (variant A, farebné) na bielom kruhu. Tvar **kruh** (QR v kruhu s jemným dekoratívnym vzorom bodov a obrysom) alebo **štvorec**. Farba `brand-blue` (predvolená) alebo `ink`, pozadie vždy biele. Odkaz si každý zadá vlastný.

- Vytvorenie: `tools/qr/index.html` (v prehliadači, stiahnutie SVG a PNG 2048 px) alebo `npm run qr -- "https://…" [--tvar kruh|stvorec] [--farba modra|cierna] [--bez-loga] [-o subor.svg]`.
- Úroveň korekcie chýb H (30 %), logo zakrýva približne 7 % plochy kódu. Overené dekóderom ZXing pri 150 – 1024 px.
- Čím kratší odkaz, tým menej bodov a tým spoľahlivejšie čítanie; dlhé odkazy skráťte. Na slajde aspoň 280 px, v tlači aspoň 3 cm.
- Na modrom slajde vždy v bielej karte (`.qr-card` v šablóne `07-zaver.html`), pod kódom krátky popis, kam vedie.
- Logo sa vkladá zo súboru `brand/logos/Loga-SFZ/sfz-A-farebne.svg` bez úprav; neprefarbovať, neorezávať. Pred použitím kód vždy naskenujte telefónom.
