import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildCss, valueFor } from "../scripts/build-tokens.mjs";

const tokens = JSON.parse(readFileSync(join(process.cwd(), "tokens/tokens.json"), "utf8"));
const themes: string[] = tokens.color.themes.map((t: { id: string }) => t.id);
const colors = new Map<string, any>(tokens.color.tokens.map((t: any) => [t.name, t]));

/** Vyrieši farbu pre tému vrátane aliasov {meno}. */
function resolve(name: string, theme: string, depth = 0): string {
  if (depth > 16) throw new Error(`Cyklus aliasov: ${name}`);
  const t = colors.get(name);
  if (!t) throw new Error(`Neznámy token: ${name}`);
  const v = valueFor(t, theme, themes[0]);
  const m = /^\{(.+)\}$/.exec(v);
  return m ? resolve(m[1], theme, depth + 1) : v;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const f = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a: string, b: string): number {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

describe("tokens.json", () => {
  it("má unikátne názvy tokenov naprieč rodinami", () => {
    const names: string[] = [];
    for (const [k, v] of Object.entries<any>(tokens)) if (v && Array.isArray(v.tokens)) names.push(...v.tokens.map((t: any) => t.name));
    expect(new Set(names).size).toBe(names.length);
  });

  it("každý farebný alias odkazuje na existujúci token v každej téme", () => {
    for (const name of colors.keys()) for (const th of themes) expect(() => resolve(name, th)).not.toThrow();
  });

  it("brand farby zodpovedajú SFZ Design Manual 2024-01", () => {
    expect(resolve("brand-blue", "light")).toBe("#1450df");
    expect(resolve("brand-red", "light")).toBe("#ec1c24");
  });

  // [text, pozadie, minimálny kontrast]
  const pairs: Array<[string, string, number]> = [
    ["ink", "surface", 4.5],
    ["ink", "surface-raised", 4.5],
    ["ink-muted", "surface", 4.5],
    ["ink-muted", "surface-raised", 4.5],
    ["on-brand", "brand-blue", 4.5],
    // Červená SFZ z manuálu (#ec1c24) má s bielou 4.41:1 – vyhovuje len pre veľký/tučný text (≥ 3:1).
    // Otvorený bod v NEXT.md: token pre plné červené tlačidlo (danger-solid).
    ["on-brand", "brand-red", 3],
    ["brand-blue-ink", "surface", 4.5],
    ["brand-blue-ink", "surface-raised", 4.5],
    ["brand-blue-ink", "brand-blue-tint", 4.5],
    ["success-ink", "success-tint", 4.5],
    ["warning-ink", "warning-tint", 4.5],
    ["danger-ink", "danger-tint", 4.5],
    ["info-ink", "info-tint", 4.5],
    ["border-strong", "surface", 3],
    ["border-strong", "surface-raised", 3],
    ["focus", "surface", 3],
  ];
  for (const th of ["light", "dark"]) {
    for (const [fg, bg, min] of pairs) {
      it(`kontrast ${fg} na ${bg} (${th}) ≥ ${min}:1`, () => {
        expect(contrast(resolve(fg, th), resolve(bg, th))).toBeGreaterThanOrEqual(min);
      });
    }
  }
});

describe("build-tokens", () => {
  const css = buildCss(tokens);
  it("vygeneruje premennú pre každý farebný token", () => {
    for (const name of colors.keys()) expect(css).toContain(`--${name}:`);
  });
  it("obsahuje tmavú tému cez atribút aj cez prefers-color-scheme", () => {
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain("@media (prefers-color-scheme: dark)");
  });
  it("tokens.css v repozitári je aktuálny (spustite npm run build:tokens)", () => {
    const committed = readFileSync(join(process.cwd(), "tokens/tokens.css"), "utf8");
    expect(committed).toBe(css);
  });
});
