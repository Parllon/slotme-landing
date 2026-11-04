// formatos.js — máscaras, conversões e utilitários puros do cadastro.

// IDs locais. Não usa crypto.randomUUID: ele não existe em páginas servidas por
// HTTP (já derrubou o painel uma vez).
export function gerarId() {
  return Math.random().toString(36).slice(2, 10);
}

// Protocolo curto e legível para o cliente citar no WhatsApp: SLT-7F3K2Q
export function gerarProtocolo() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O e 1/I
  let s = "";
  for (let i = 0; i < 6; i++) s += letras[Math.floor(Math.random() * letras.length)];
  return `SLT-${s}`;
}

export function apenasDigitos(v) {
  return String(v || "").replace(/\D/g, "");
}

// (21) 98888-7777 enquanto digita. Guarda só os dígitos no estado.
export function mascaraTelefone(digitos) {
  const d = apenasDigitos(digitos).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Celular brasileiro com DDD: 11 dígitos, DDD de 11 a 99 e começando com 9.
export function celularValido(digitos) {
  const d = apenasDigitos(digitos);
  return d.length === 11 && Number(d.slice(0, 2)) >= 11 && d[2] === "9";
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

// "35", "35,5", "35,50", "R$ 1.200,00" -> número. Retorna null se inválido.
export function precoParaNumero(texto) {
  let t = String(texto || "").replace(/[R$\s]/g, "");
  if (!t) return null;
  if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  const n = Number(t);
  return Number.isFinite(n) && n > 0 && n < 100000 ? Math.round(n * 100) / 100 : null;
}

export function formatarPreco(n) {
  return n == null ? "—" : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarDuracao(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

// Opções de horário de 30 em 30 minutos, de 05:00 a 23:30.
export const opcoesHorario = (() => {
  const lista = [];
  for (let h = 5; h <= 23; h++) for (const m of [0, 30]) lista.push(`${String(h).padStart(2, "0")}:${m ? "30" : "00"}`);
  return lista;
})();

export function horaParaMinutos(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

// Mesmo formato de slug do painel: minúsculas, números, ponto, hífen e _.
export function slugify(texto) {
  return String(texto || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 30);
}

export function normalizarInstagram(v) {
  const t = String(v || "").trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[/?].*$/, "")
    .replace(/^@+/, "");
  return t ? `@${t}` : "";
}

/* ---- Sugestão de correção de e-mail (gmial.com -> gmail.com) ---- */
const DOMINIOS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "yahoo.com", "icloud.com", "live.com", "bol.com.br", "uol.com.br"];

function distancia(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

export function sugestaoEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  const arroba = e.lastIndexOf("@");
  if (arroba < 1) return null;
  const usuario = e.slice(0, arroba);
  const dominio = e.slice(arroba + 1);
  if (!dominio || DOMINIOS.includes(dominio)) return null;
  let melhor = null;
  let menor = 3;
  for (const d of DOMINIOS) {
    const dist = distancia(dominio, d);
    if (dist < menor) { menor = dist; melhor = d; }
  }
  return melhor ? `${usuario}@${melhor}` : null;
}

export function ehGmail(email) {
  return /@(gmail|googlemail)\.com$/i.test(String(email || "").trim());
}
