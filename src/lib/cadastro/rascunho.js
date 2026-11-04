// rascunho.js — salva o cadastro no próprio aparelho para a pessoa não perder
// o que digitou se sair da página (comum no celular). Fica só no navegador
// dela; nada vai para servidor até ela clicar em "Enviar cadastro".
import { VERSAO_ESTADO, estadoInicial } from "./estado";

const CHAVE = "slotme_cadastro_rascunho";
const VALIDADE_DIAS = 14;

export function lerRascunho() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE) || "null");
    if (!bruto || bruto.estado?.versao !== VERSAO_ESTADO) return null;
    if (Date.now() - bruto.salvoEm > VALIDADE_DIAS * 86400000) return null;
    const e = bruto.estado;
    return {
      ...e,
      // Rascunhos de antes da pausa por profissional não têm modo/porPessoa.
      horarios: { ...e.horarios, pausa: { ...estadoInicial().horarios.pausa, ...e.horarios.pausa } },
      // Aceites nunca vêm pré-marcados de um rascunho antigo.
      revisao: { ...e.revisao, aceiteTeste: false, aceiteLgpd: false, botcheck: false },
    };
  } catch {
    return null;
  }
}

export function salvarRascunho(estado) {
  try { localStorage.setItem(CHAVE, JSON.stringify({ salvoEm: Date.now(), estado })); } catch { /* sem espaço/aba anônima */ }
}

export function apagarRascunho() {
  try { localStorage.removeItem(CHAVE); } catch { /* idem */ }
}

// O rascunho tem algo além do estado inicial?
export function rascunhoTemConteudo(estado) {
  return Boolean(estado && (estado.voce.nome || estado.negocio.nome || estado.servicos.length));
}
