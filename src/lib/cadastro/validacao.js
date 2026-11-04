// validacao.js — regras de cada etapa. Funções puras: recebem o estado e
// devolvem { chaveDoCampo: "mensagem" }. Objeto vazio = etapa válida.
import { erros } from "../../data/cadastro";
import { celularValido, emailValido, horaParaMinutos, precoParaNumero } from "./formatos";
import { listarPessoas, pausaDaPessoa, pausaIndividual } from "./estado";

const vazio = (v) => !String(v ?? "").trim();

function validarVoce({ voce }) {
  const e = {};
  if (vazio(voce.nome)) e["voce.nome"] = erros.obrigatorio;
  else if (voce.nome.trim().length < 2) e["voce.nome"] = erros.nomeCurto;
  if (!celularValido(voce.whatsapp)) e["voce.whatsapp"] = vazio(voce.whatsapp) ? erros.obrigatorio : erros.whatsapp;
  if (vazio(voce.email)) e["voce.email"] = erros.obrigatorio;
  else if (!emailValido(voce.email)) e["voce.email"] = erros.email;
  if (!e["voce.email"] && voce.email.trim().toLowerCase() !== voce.emailConfirma.trim().toLowerCase()) {
    e["voce.emailConfirma"] = vazio(voce.emailConfirma) ? erros.obrigatorio : erros.emailConfirma;
  }
  if (!voce.origem) e["voce.origem"] = erros.origem;
  if (voce.origem === "outro" && vazio(voce.origemOutro)) e["voce.origemOutro"] = erros.obrigatorio;
  return e;
}

function validarNegocio({ negocio }) {
  const e = {};
  if (vazio(negocio.nome)) e["negocio.nome"] = erros.obrigatorio;
  if (!negocio.especialidade) e["negocio.especialidade"] = erros.especialidade;
  if (vazio(negocio.cidade)) e["negocio.cidade"] = erros.obrigatorio;
  return e;
}

function validarServicos({ servicos }) {
  const e = {};
  if (!servicos.length) e.servicos = erros.servicosVazio;
  const vistos = new Set();
  for (const s of servicos) {
    const nome = s.nome.trim().toLowerCase();
    if (!nome) e[`servico.${s.id}.nome`] = erros.obrigatorio;
    else if (vistos.has(nome)) e[`servico.${s.id}.nome`] = erros.servicoDuplicado;
    vistos.add(nome);
    if (precoParaNumero(s.preco) == null) e[`servico.${s.id}.preco`] = vazio(s.preco) ? erros.obrigatorio : erros.preco;
  }
  return e;
}

function validarEquipe({ equipe }) {
  const e = {};
  if (!equipe.donoAtende && !equipe.profissionais.length) e.equipe = erros.equipeVazia;
  if (equipe.donoAtende) {
    if (!equipe.dono.todos && !equipe.dono.servicos.length) e["dono.servicos"] = erros.servicosDoProfissional;
    if (equipe.dono.horarioDiferente && vazio(equipe.dono.horarioObs)) e["dono.horarioObs"] = erros.horarioObs;
  }
  for (const p of equipe.profissionais) {
    if (vazio(p.nome)) e[`prof.${p.id}.nome`] = erros.obrigatorio;
    if (!vazio(p.email) && !emailValido(p.email)) e[`prof.${p.id}.email`] = erros.email;
    if (!p.todos && !p.servicos.length) e[`prof.${p.id}.servicos`] = erros.servicosDoProfissional;
    if (p.horarioDiferente && vazio(p.horarioObs)) e[`prof.${p.id}.horarioObs`] = erros.horarioObs;
  }
  return e;
}

function validarHorarios(estado) {
  const { horarios } = estado;
  const e = {};
  const abertos = Object.entries(horarios.dias).filter(([, d]) => d.aberto);
  if (!abertos.length) e.horarios = erros.semDiaAberto;
  for (const [dia, d] of abertos) {
    if (horaParaMinutos(d.fecha) <= horaParaMinutos(d.abre)) e[`dia.${dia}`] = erros.fechaAntes;
  }
  const { pausa } = horarios;
  const invertida = (p) => horaParaMinutos(p.fim) <= horaParaMinutos(p.inicio);
  if (pausaIndividual(estado)) {
    const pessoas = listarPessoas(estado);
    const pausas = pessoas.map((p) => [p.id, pausaDaPessoa(pausa, p.id)]);
    for (const [id, p] of pausas) if (p.ativa && invertida(p)) e[`pausa.${id}`] = erros.pausaInvalida;
    if (!pausas.some(([, p]) => p.ativa)) e.pausa = erros.pausaNenhuma;
  } else if (pausa.ativa && invertida(pausa)) {
    e.pausa = erros.pausaInvalida;
  }
  return e;
}

function validarRevisao({ revisao }) {
  const e = {};
  if (!revisao.aceiteTeste) e["revisao.aceiteTeste"] = erros.aceiteTeste;
  if (!revisao.aceiteLgpd) e["revisao.aceiteLgpd"] = erros.aceiteLgpd;
  return e;
}

// Mesma ordem de data/cadastro.js -> etapas
const porEtapa = {
  voce: validarVoce,
  negocio: validarNegocio,
  servicos: validarServicos,
  equipe: validarEquipe,
  horarios: validarHorarios,
  visual: () => ({}),
  revisao: validarRevisao,
};

export function validarEtapa(idEtapa, estado) {
  return (porEtapa[idEtapa] || (() => ({})))(estado);
}

// Primeira etapa (índice) com erro, considerando todas antes da revisão.
// Usado no envio para não deixar passar nada se o rascunho veio incompleto.
export function primeiraEtapaComErro(ids, estado) {
  return ids.findIndex((id) => Object.keys(validarEtapa(id, estado)).length > 0);
}
