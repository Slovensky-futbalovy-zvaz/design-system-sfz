// Vygeneruje tools/qr/logo-sfz-a.js z brand/logos/Loga-SFZ/sfz-A-farebne.svg (logo sa vkladá bez úprav).
// Spustenie: npm run build:qr-logo
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const svg = readFileSync(join(root, "brand/logos/Loga-SFZ/sfz-A-farebne.svg"));
const uri = "data:image/svg+xml;base64," + svg.toString("base64");
const out = `/* Logo SFZ A (farebné) pre generátor QR – vygenerované z brand/logos/Loga-SFZ/sfz-A-farebne.svg (npm run build:qr-logo). Needitujte ručne. */
(function (g) { g.SFZ_QR_LOGO = "${uri}"; })(typeof globalThis !== "undefined" ? globalThis : this);
`;
writeFileSync(join(root, "tools/qr/logo-sfz-a.js"), out);
console.log("tools/qr/logo-sfz-a.js vygenerovaný");
