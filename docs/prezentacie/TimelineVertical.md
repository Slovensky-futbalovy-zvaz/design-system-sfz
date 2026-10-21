# TimelineVertical

Zvislá časová os pre dlhšie obdobie (6 – 10 udalostí na jednom slajde): krúžok vľavo (`brand-blue` s 8 px okrajom `brand-blue-tint`), spojovacia linka 2 px, rok (`brand-blue-ink`, 30 px, tabular‑nums) a text v jednom riadku: čo pribudlo tučnejšie, za bodkou „pre koho“ v `ink-muted`.

- Najviac jeden bod je zlom alebo pointa (`.is-key`): krúžok `brand-red` s okrajom `brand-red-tint`, rok aj text červeným tučným písmom. Môže namiesto roka niesť slovo („Zlom“).
- Rovnaké rozostupy bez ohľadu na reálny časový odstup; os je poradie, nie mierka.
- Text na riadok max. ~95 znakov pri 26 px; dlhší text skráťte, nezalamujte.
- Na 4 – 6 udalostí s popisom použite vodorovnú `Timeline`.

Šablóna: `templates/prezentacie/08-casova-os-zvisla.html`, trieda `.vtimeline`.
