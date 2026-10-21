/*
 * SFZ QR – generátor QR kódu v štýle SFZ (od v1.4.0).
 * Okrúhle body, zaoblené rohové značky, v strede logo SFZ (variant A) na bielom kruhu.
 * Tvar „kruh“: QR kód v kruhu s dekoratívnym vzorom bodov a obrysom, tvar „stvorec“: klasický štvorec.
 *
 * Klasický skript bez závislostí okrem knižnice qrcode-generator 1.4.4, MIT (tools/qr/vendor/, globál `qrcode`) a loga (globál `SFZ_QR_LOGO`).
 * Funguje v prehliadači (tools/qr/index.html) aj v Node cez vm (scripts/qr.mjs).
 * Použitie: SFZQR.svg("https://futbalsfz.sk", { tvar: "kruh", farba: "#1450df", velkost: 1024 }) → reťazec SVG.
 *
 * Farby sú zámerne zadané hodnotou: výsledné SVG je samostatný súbor bez tokens.css.
 * Predvolená farba = brand-blue (#1450df), alternatíva = ink (#0c0f16). Pozadie vždy biele.
 */
(function (g) {
  "use strict";

  var FARBY = { modra: "#1450df", cierna: "#0c0f16" };

  // Deterministický generátor náhodných čísel (mulberry32) – rovnaký odkaz = rovnaký vzor.
  function rng(seedText) {
    var h = 2166136261;
    for (var i = 0; i < seedText.length; i++) { h ^= seedText.charCodeAt(i); h = Math.imul(h, 16777619); }
    var a = h >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function r2(x) { return Math.round(x * 100) / 100; }

  function matica(text) {
    var qrcode = g.qrcode;
    if (!qrcode) throw new Error("Chýba knižnica qrcode-generator (globál qrcode).");
    qrcode.stringToBytes = qrcode.stringToBytesFuncs ? qrcode.stringToBytesFuncs["UTF-8"] : qrcode.stringToBytes;
    var qr = qrcode(0, "H"); // úroveň H (30 %) – logo v strede prekryje časť bodov
    qr.addData(text, "Byte");
    qr.make();
    var n = qr.getModuleCount();
    var m = [];
    for (var r = 0; r < n; r++) { m.push([]); for (var c = 0; c < n; c++) m[r].push(qr.isDark(r, c)); }
    return m;
  }

  function vFinderi(r, c, n) {
    return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  }

  /**
   * @param {string} text odkaz alebo text
   * @param {{tvar?: "kruh"|"stvorec", farba?: string, velkost?: number, logo?: boolean}} [o]
   */
  function svg(text, o) {
    o = o || {};
    if (!text || !String(text).trim()) throw new Error("Zadajte odkaz.");
    var tvar = o.tvar === "stvorec" ? "stvorec" : "kruh";
    var farba = FARBY[o.farba] || o.farba || FARBY.modra;
    var velkost = o.velkost || 1024;
    var sLogom = o.logo !== false;
    var mat = matica(String(text).trim());
    var n = mat.length;
    var M = 10; // veľkosť modulu v jednotkách viewBoxu
    var stred = n / 2;
    var rLogo = sLogom ? Math.max(3.2, n * 0.15) : 0; // polomer bieleho kruhu pre logo (v moduloch)

    var tichaZona = tvar === "kruh" ? 2 : 4;
    var polStrany = n / 2 + tichaZona; // polovica strany štvorca s tichou zónou (v moduloch)
    var R = tvar === "kruh" ? Math.SQRT2 * polStrany + 1.5 : 0; // polomer kruhu (v moduloch)
    var polRozmer = tvar === "kruh" ? R + 1.2 : polStrany;
    var sirka = 2 * polRozmer * M;
    var ox = (polRozmer - n / 2) * M; // posun matice v rámci viewBoxu
    var cx = sirka / 2;

    var out = [];
    out.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + velkost + '" height="' + velkost + '" viewBox="0 0 ' + r2(sirka) + " " + r2(sirka) + '" role="img" aria-label="QR kód: ' + String(text).replace(/[<>&"]/g, "") + '">');
    if (tvar === "kruh") {
      out.push('<circle cx="' + r2(cx) + '" cy="' + r2(cx) + '" r="' + r2((R + 1.2) * M) + '" fill="#ffffff"/>');
      // dekoratívne body mimo QR kódu, na rovnakej mriežke, svetlejšie (nečíta ich skener)
      var rand = rng(String(text));
      var deko = [];
      var dosah = Math.ceil(R);
      for (var i = -dosah; i < n + dosah; i++) {
        for (var j = -dosah; j < n + dosah; j++) {
          var dx = j + 0.5 - stred, dy = i + 0.5 - stred;
          var vnutri = Math.abs(dx) < polStrany && Math.abs(dy) < polStrany;
          if (vnutri) continue;
          if (Math.sqrt(dx * dx + dy * dy) > R - 0.9) continue;
          if (rand() < 0.5) deko.push('<circle cx="' + r2(ox + (j + 0.5) * M) + '" cy="' + r2(ox + (i + 0.5) * M) + '" r="' + r2(0.38 * M) + '"/>');
        }
      }
      out.push('<g fill="' + farba + '" opacity="0.28">' + deko.join("") + "</g>");
      out.push('<circle cx="' + r2(cx) + '" cy="' + r2(cx) + '" r="' + r2(R * M) + '" fill="none" stroke="' + farba + '" stroke-width="' + r2(0.6 * M) + '"/>');
    } else {
      out.push('<rect width="' + r2(sirka) + '" height="' + r2(sirka) + '" fill="#ffffff"/>');
    }

    // dátové body
    var body = [];
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!mat[r][c] || vFinderi(r, c, n)) continue;
        var vx = c + 0.5 - stred, vy = r + 0.5 - stred;
        if (sLogom && Math.sqrt(vx * vx + vy * vy) < rLogo + 0.5) continue;
        body.push('<circle cx="' + r2(ox + (c + 0.5) * M) + '" cy="' + r2(ox + (r + 0.5) * M) + '" r="' + r2(0.46 * M) + '"/>');
      }
    }
    out.push('<g fill="' + farba + '">' + body.join("") + "</g>");

    // rohové značky: zaoblený štvorec 7×7 a vnútorný 3×3
    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
      var x = ox + p[1] * M, y = ox + p[0] * M;
      out.push('<rect x="' + r2(x + 0.5 * M) + '" y="' + r2(y + 0.5 * M) + '" width="' + r2(6 * M) + '" height="' + r2(6 * M) + '" rx="' + r2(1.8 * M) + '" fill="none" stroke="' + farba + '" stroke-width="' + r2(M) + '"/>');
      out.push('<rect x="' + r2(x + 2 * M) + '" y="' + r2(y + 2 * M) + '" width="' + r2(3 * M) + '" height="' + r2(3 * M) + '" rx="' + r2(0.9 * M) + '" fill="' + farba + '"/>');
    });

    // logo SFZ v strede – súbor sa vkladá bez úprav (nikdy neprefarbovať ani neprekresľovať)
    if (sLogom) {
      var logo = g.SFZ_QR_LOGO;
      if (!logo) throw new Error("Chýba logo (globál SFZ_QR_LOGO).");
      var lx = ox + stred * M;
      out.push('<circle cx="' + r2(lx) + '" cy="' + r2(lx) + '" r="' + r2(rLogo * M) + '" fill="#ffffff"/>');
      var lr = (rLogo - 0.6) * M;
      out.push('<image href="' + logo + '" x="' + r2(lx - lr) + '" y="' + r2(lx - lr) + '" width="' + r2(2 * lr) + '" height="' + r2(2 * lr) + '" preserveAspectRatio="xMidYMid meet"/>');
    }
    out.push("</svg>");
    return out.join("");
  }

  g.SFZQR = { svg: svg, farby: FARBY };
})(typeof globalThis !== "undefined" ? globalThis : this);
