# TabBar

Spodná navigácia pre mobil (<768 px), vzor iOS Tab Bar. `items` (max. 5: `{id,label,icon,badge?}`), `value`, `onChange`.

- Od 768 px je skrytý; rovnaké položky dajte do NavBaru.
- Obsah stránky potrebuje spodný odstup `calc(var(--tabbar-height) + env(safe-area-inset-bottom))`.
- Badge len pre počty, ktoré vyžadujú pozornosť (neprečítané, čakajúce podania).
