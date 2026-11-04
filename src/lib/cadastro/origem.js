// origem.js — guarda de onde a pessoa veio (UTM do anúncio, fbclid, referrer).
// Lido na primeira página que a pessoa abre e mantido na sessão, porque ela
// costuma entrar pela home (com a UTM) e só depois clicar em "Teste grátis".
const CHAVE = "slotme_origem";
const CAMPOS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

function lerSessao() {
  try { return JSON.parse(sessionStorage.getItem(CHAVE) || "null"); } catch { return null; }
}

// Chame no carregamento de qualquer página do site.
export function capturarOrigem() {
  const params = new URLSearchParams(window.location.search);
  const daUrl = {};
  for (const c of CAMPOS) if (params.get(c)) daUrl[c] = params.get(c).slice(0, 200);
  const atual = lerSessao();
  // A primeira origem com UTM vence; uma visita sem UTM não apaga a anterior.
  if (Object.keys(daUrl).length && !(atual && Object.keys(atual).some((k) => k.startsWith("utm_")))) {
    const novo = { ...daUrl };
    if (document.referrer && !document.referrer.includes(window.location.host)) novo.referrer = document.referrer.slice(0, 300);
    novo.pagina_entrada = window.location.pathname;
    try { sessionStorage.setItem(CHAVE, JSON.stringify(novo)); } catch { /* aba anônima: segue sem guardar */ }
    return novo;
  }
  if (!atual && document.referrer && !document.referrer.includes(window.location.host)) {
    const novo = { referrer: document.referrer.slice(0, 300), pagina_entrada: window.location.pathname };
    try { sessionStorage.setItem(CHAVE, JSON.stringify(novo)); } catch { /* idem */ }
    return novo;
  }
  return atual || {};
}

export function lerOrigem() {
  return lerSessao() || {};
}
