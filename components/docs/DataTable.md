# DataTable

Tabuľka s vyhľadávaním, výberovými filtrami, zoradením a stránkovaním, celé na strane klienta. Props ako Table plus `searchable`, `filters` (`{key,label,options}`), `pageSize`, `toolbar`.

- Pre dáta nad ~2 000 riadkov riešte filtrovanie a stránkovanie na serveri a použite `Table` s vlastným stavom.
- Stĺpce so `sortable` dostanú tlačidlo v hlavičke s `aria-sort`.
- Toolbar (export, nový záznam) je vpravo na desktope, pod filtrami na mobile.
