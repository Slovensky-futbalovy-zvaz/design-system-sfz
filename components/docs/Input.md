# Input

Jednoriadkový textový vstup s popiskom, pomocným textom a chybou. Dodáte `label`, `type`, `placeholder`; pre vyhľadávanie `icon="search"`.

- Popisok vždy nad vstupom (`label`), placeholder nie je náhrada popisku.
- Chyba (`error`) sa zobrazuje pod vstupom s ikonou a `role="alert"`; vstup dostane `aria-invalid`.
- Čísla (registračné číslo, suma) nastavte `inputMode="numeric"`; e‑mail `type="email"` kvôli klávesnici na mobile.
- Výška 44 px, text 17 px (iOS tak nezoomuje stránku pri fokuse).
