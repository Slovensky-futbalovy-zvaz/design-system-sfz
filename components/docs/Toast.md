# Toast

Dočasné správy nad obsahom. Dodáte `items` (`{id, message, tone?, actionLabel?, onAction?}`) a `onDismiss`; stav držte v aplikácii (napr. kontext).

- Na mobile sa zobrazuje nad TabBarom, na desktope dole v strede.
- Max. 3 naraz, text do jednej vety; automaticky zatvárajte po 5 s, pri akcii po 8 s.
- Nikdy nepoužívajte Toast na chyby formulára.
