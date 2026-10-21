# Table

Jednoduchá tabuľka bez stavu. `columns` (`{key, header, align?, render?, sortable?, hideOnMobile?}`), `rows`, `rowKey`, voliteľne `onRowClick`, `density`, `sort`/`onSort`.

- Na mobile sa riadky skladajú do kariet „popisok: hodnota“ (`stackOnMobile`); stĺpce s `hideOnMobile` sa skryjú.
- Čísla zarovnávajte vpravo (`align="right"`), tabular‑nums sa pridajú automaticky.
- `caption` je povinný pre čítačky (vizuálne skrytý).
- Pre viac ako ~20 riadkov použite DataTable.
