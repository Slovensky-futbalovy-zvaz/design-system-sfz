import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
// @ts-expect-error – .mjs skript bez typov
import { nacitajUkazky, vytvorStranku } from "../scripts/build-ukazky.mjs";

const root = process.cwd();

describe("ukážky komponentov (docs/ukazky)", () => {
  it("stránka je aktuálna (npm run build:ukazky)", () => {
    expect(readFileSync(join(root, "docs/ukazky/index.html"), "utf8")).toBe(vytvorStranku(nacitajUkazky()));
  });
  it("obsahuje každý webový komponent z components/docs", () => {
    const comps = nacitajUkazky().map((u: { comp: string }) => u.comp);
    for (const c of ["Button", "Input", "DataTable", "Modal", "TabBar", "Calendar", "LogoLockup"]) expect(comps).toContain(c);
    expect(comps).not.toContain("SlideContent");
  });
  it("lokálne kópie Reactu existujú (funguje bez internetu)", () => {
    for (const f of ["react-18.3.1.production.min.js", "react-dom-18.3.1.production.min.js"]) {
      expect(existsSync(join(root, "docs/ukazky/vendor", f)), f).toBe(true);
    }
  });
});
