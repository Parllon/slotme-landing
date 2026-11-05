// temaCustom.js — paleta da "Minha cor" para a miniatura do cadastro.
//
// PORTE FIEL de gerarTemaCustomizado() do motor (Agenda_de_Servicos/app/temas.js).
// Mesmas fórmulas, para o dono ver no cadastro exatamente as cores que a página
// dele vai ter. Mudou lá? Mude aqui também.

const GOLD_PADRAO = "#C6A04A";

function hexParaRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbParaHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0, s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslParaRgb({ h, s, l }) {
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const canal = (v) => Math.round((v + m) * 255);
  return { r: canal(r), g: canal(g), b: canal(b) };
}

const css = ({ r, g, b }) => `rgb(${r} ${g} ${b})`;
const clarear = (l, k) => l + (100 - l) * k;
const escurecer = (l, k) => l * (1 - k);

export const HEX_COR = /^#[0-9a-f]{6}$/i;

/** Papéis de cor do motor (ivory, wine, card, clay, blush, gold) como objetos RGB. */
export function paletaCustom({ primaria, destaque, modo }) {
  const escuro = modo === "escuro";
  const { h, s, l } = rgbParaHsl(hexParaRgb(primaria));
  return {
    ivory: escuro ? hslParaRgb({ h, s: 10, l: 6 }) : hslParaRgb({ h, s: 20, l: 97 }),
    wine: hexParaRgb(primaria),
    card: escuro ? hslParaRgb({ h, s: 8, l: 12 }) : { r: 255, g: 255, b: 255 },
    clay: hslParaRgb({ h, s: s * 0.45, l: 57 }),
    blush: hslParaRgb({ h, s: s * 0.7, l: escuro ? escurecer(l, 0.54) : clarear(l, 0.65) }),
    gold: hexParaRgb(destaque && HEX_COR.test(destaque) ? destaque : GOLD_PADRAO),
  };
}

/** No formato dos `temas` de data/cadastro.js, para a <Miniatura>. */
export function temaParaMiniatura(cor) {
  const p = paletaCustom(cor);
  return {
    fundo: css(p.ivory), primaria: css(p.wine), cartao: css(p.card),
    texto2: css(p.clay), borda: css(p.blush), serifa: false, // motor usa a fonte do tema_8 (sans)
  };
}

// Contraste WCAG entre a cor principal e o fundo. Abaixo de 3:1 o nome do salão
// e os botões ficam difíceis de ler — mostramos um aviso (não bloqueia).
function luminancia({ r, g, b }) {
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrasteBaixo(cor) {
  if (!HEX_COR.test(cor.primaria || "")) return false;
  const p = paletaCustom(cor);
  const [a, b] = [luminancia(p.wine), luminancia(p.ivory)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05) < 3;
}
