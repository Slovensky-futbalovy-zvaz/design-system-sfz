# Button

Hlavné tlačidlo akcie. Dodáte text (sloveso v neurčitku alebo rozkaze: „Uložiť“, „Odoslať podanie“), voliteľne `icon`, `variant`, `size`, `loading`, `block`.

- Jedno `primary` na obrazovku (hlavná akcia); ostatné `secondary` alebo `tertiary`. `danger` len pre nevratné kroky (zmazať, zrušiť registráciu).
- Výška `md` = 44 px (touch target); `sm` iba v tabuľkách a toolbaroch.
- Na mobile pod 640 px používajte `block` pre akcie formulára; v Modal päte sa tlačidlá skladajú automaticky.
- `loading` zablokuje tlačidlo a ukáže spinner; text zmeňte na priebehový („Ukladám“).
- Nikdy nepoužívajte tlačidlo ako odkaz na inú stránku – na to je `<a>` so štýlom `sfz-btn`.
