// track.js — rastreamento de eventos de funil da landing page e do cadastro.
// As variáveis VITE_* são injetadas no build pelo Vite (de .env.local, não vão para o git).
//
// Envio em text/plain (com JSON dentro) e token no corpo: é um pedido "simples"
// de CORS, sem preflight (OPTIONS) — e é o único tipo que o navigator.sendBeacon
// consegue mandar para outro domínio. Com application/json o navegador barrava
// o beacon e os cliques nunca chegavam ao painel.
//
// Cada evento leva a origem da visita (utm_source/medium/campaign), lida da
// sessão por lib/cadastro/origem.js — capturarOrigem() roda antes do 1º evento.
import { lerOrigem } from "./cadastro/origem";

const SLUG = import.meta.env.VITE_CLIENT_SLUG || '';
const TOKEN = import.meta.env.VITE_METRICS_TOKEN || '';
const COLLECTOR = 'https://cadastro.agendamentos.app.br/api/evento';

const SID = (() => {
  try {
    let s = sessionStorage.getItem('slotme_lp_sid');
    if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('slotme_lp_sid', s); }
    return s;
  } catch {
    // aba anônima / armazenamento bloqueado: id só desta página
    return crypto.randomUUID();
  }
})();

function utm() {
  const o = lerOrigem();
  const out = {};
  for (const c of ['utm_source', 'utm_medium', 'utm_campaign']) if (o[c]) out[c] = o[c];
  return out;
}

export function trackLpEvent(tipo) {
  if (!SLUG || !TOKEN) return;
  const payload = JSON.stringify({ slug: SLUG, sessaoId: SID, tipo, _token: TOKEN, ...utm() });
  // sendBeacon sobrevive à troca de página (clique que abre o WhatsApp, envio do
  // cadastro). Se não existir ou recusar, fetch com keepalive faz o mesmo papel.
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(COLLECTOR, new Blob([payload], { type: 'text/plain' }))) return;
  } catch { /* cai no fetch */ }
  fetch(COLLECTOR, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
