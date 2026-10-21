// QR kód SFZ z príkazového riadka (od v1.4.0).
// Použitie: npm run qr -- "https://www.linkedin.com/in/meno/" [--tvar kruh|stvorec] [--farba modra|cierna] [--bez-loga] [-o subor.svg]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

/** Načíta knižnicu qrcode-generator, logo a renderer do izolovaného kontextu a vráti SFZQR. */
export function nacitajSfzQr(root = process.cwd()) {
  const ctx = vm.createContext({ Math });
  for (const f of ["node_modules/qrcode-generator/qrcode.js", "tools/qr/logo-sfz-a.js", "tools/qr/sfz-qr.js"]) {
    vm.runInContext(readFileSync(join(root, f), "utf8"), ctx, { filename: f });
  }
  return ctx.SFZQR;
}

function main(argv) {
  const args = [...argv];
  const opt = { tvar: "kruh", farba: "modra", logo: true };
  let text = "";
  let out = "";
  while (args.length) {
    const a = args.shift();
    if (a === "--tvar") opt.tvar = args.shift();
    else if (a === "--farba") opt.farba = args.shift();
    else if (a === "--bez-loga") opt.logo = false;
    else if (a === "-o" || a === "--out") out = args.shift();
    else text = a;
  }
  if (!text) {
    console.error('Použitie: npm run qr -- "https://…" [--tvar kruh|stvorec] [--farba modra|cierna] [--bez-loga] [-o subor.svg]');
    process.exit(1);
  }
  const svg = nacitajSfzQr().svg(text, opt);
  const file = out || `qr-${opt.tvar}.svg`;
  writeFileSync(file, svg);
  console.log(`${file} vygenerovaný (${text})`);
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv.slice(2));
