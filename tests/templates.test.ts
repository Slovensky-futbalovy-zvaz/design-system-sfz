import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const dir = join(process.cwd(), "templates/prezentacie");
const files = readdirSync(dir).filter((f) => f.endsWith(".html"));

describe("šablóny slajdov", () => {
  it("obsahujú 9 šablón a prehľad", () => {
    expect(files.filter((f) => /^\d\d-/.test(f))).toHaveLength(9);
    expect(files).toContain("index.html");
  });
  for (const f of files) {
    it(`${f}: všetky odkazy na CSS, logá a náhľady existujú`, () => {
      const html = readFileSync(join(dir, f), "utf8");
      const refs = [...html.matchAll(/(?:href|src)="([^"#:]+)"/g)].map((m) => m[1]);
      expect(refs.length).toBeGreaterThan(0);
      for (const r of refs) expect(existsSync(resolve(dirname(join(dir, f)), r)), r).toBe(true);
    });
    it(`${f}: má lang="sk" a nepoužíva pevné farby`, () => {
      const html = readFileSync(join(dir, f), "utf8");
      expect(html).toContain('lang="sk"');
      expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}\b(?![^<]*>)/);
    });
  }
  it("slide.css používa len premenné z tokenov", () => {
    const css = readFileSync(join(dir, "slide.css"), "utf8");
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
