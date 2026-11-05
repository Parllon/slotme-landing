// track.js — rastreamento de eventos de funil da landing page e do cadastro.
// As variáveis VITE_* são injetadas no build pelo Vite (de .env.local, não vão para o git).
//
// Todos os eventos vão por fetch com keepalive (sobrevive à troca de página,
// como o clique que abre o WhatsApp), em text/plain com JSON dentro e o token
// no campo _token do corpo: é um pedido "simples" de CORS, sem preflight
// (OPTIONS). Sem sendBeacon e sem cabeçalho X-Metrics-Token.
//
// Cada evento leva a origem da visita (utm_source/medium/campaign), lida da
// sessão por lib/cadastro/origem.js — capturarOrigem() roda antes do 1º evento.
import { lerOrigem } from "./cadastro/origem";

const SLUG = import.meta.env.VITE_CLIENT_SLUG || '';
const TOKEN = import.meta.env.VITE_METRICS_TOKEN || '';
const COLLECTOR = 'https://cadastro.agendamentos.app.br/api/evento';

// crypto.randomUUID só existe em navegadores recentes e em HTTPS. Fallback:
// tempo + aleatório (só [a-z0-9-], formato aceito pelo coletor).
function novoId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch { /* cai no fallback */ }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;
}

const SID = (() => {
  try {
    let s = sessionStorage.getItem('slotme_lp_sid');
    if (!s) { s = novoId(); sessionStorage.setItem('slotme_lp_sid', s); }
    return s;
  } catch {
    // aba anônima / armazenamento bloqueado: id só desta página
    return novoId();
  }
})();

function utm() {
  const out = {};
  try {
    const o = lerOrigem();
    for (const c of ['utm_source', 'utm_medium', 'utm_campaign']) if (o[c]) out[c] = o[c];
  } catch { /* sem origem: segue sem UTM */ }
  return out;
}

export function trackLpEvent(tipo) {
  if (!SLUG || !TOKEN) return;
  // Métrica nunca pode quebrar a página: qualquer falha é ignorada em silêncio.
  try {
    const body = JSON.stringify({ slug: SLUG, sessaoId: SID, tipo, _token: TOKEN, ...utm() });
    fetch(COLLECTOR, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain' },
      body,
    }).catch(() => {});
  } catch { /* fetch indisponível ou erro síncrono: ignora */ }
}
