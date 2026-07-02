// track.js — rastreamento de eventos de funil da landing page.
// As variáveis VITE_* são injetadas no build pelo Vite (de .env.local, não vão para o git).
const SLUG = import.meta.env.VITE_CLIENT_SLUG || '';
const TOKEN = import.meta.env.VITE_METRICS_TOKEN || '';
const COLLECTOR = 'https://cadastro.agendamentos.app.br/api/evento';

const SID = (() => {
  let s = sessionStorage.getItem('slotme_lp_sid');
  if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('slotme_lp_sid', s); }
  return s;
})();

export function trackLpEvent(tipo) {
  if (!SLUG || !TOKEN) return;
  const payload = JSON.stringify({ slug: SLUG, sessaoId: SID, tipo, _token: TOKEN });
  if (tipo === 'lp_vista') {
    fetch(COLLECTOR, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Metrics-Token': TOKEN },
      body: payload,
    }).catch(() => {});
  } else {
    navigator.sendBeacon(COLLECTOR, new Blob([payload], { type: 'application/json' }));
  }
}
