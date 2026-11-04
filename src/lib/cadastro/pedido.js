// pedido.js — transforma o estado da tela no "pedido" que sai do site.
//
// CONTRATO (versão 1): este é o formato que o sistema de agendamento vai
// receber quando a integração existir. Mudou algo aqui? Suba a "versao".
// paraDadosJson() mostra como o pedido vira o dados.json + .env do painel
// (mesmos nomes de campo de clientes/_template), para facilitar a integração.
import { cadastroConfig, diasSemana, especialidades, origens, planos, temas } from "../../data/cadastro";
import { horaParaMinutos, normalizarInstagram, precoParaNumero, slugify } from "./formatos";
import { pausaDaPessoa, pausaIndividual } from "./estado";

export const VERSAO_PEDIDO = 1;

export function montarPedido(estado, { protocolo, utm }) {
  const { voce, negocio, servicos, equipe, horarios, visual, revisao } = estado;
  const esp = especialidades.find((e) => e.valor === negocio.especialidade);
  const nomeServico = Object.fromEntries(servicos.map((s) => [s.id, s.nome.trim()]));
  const todosNomes = servicos.map((s) => s.nome.trim());
  const listaServicos = (p) => (p.todos ? todosNomes : p.servicos.map((id) => nomeServico[id]).filter(Boolean));
  // Pausa de cada pessoa: a geral, a individual, ou nenhuma.
  const individual = pausaIndividual(estado);
  const pausaDe = (id) => {
    if (!horarios.pausa.ativa) return null;
    const p = individual ? pausaDaPessoa(horarios.pausa, id) : horarios.pausa;
    return individual && !p.ativa ? null : { inicio: p.inicio, fim: p.fim };
  };

  const profissionais = [];
  if (equipe.donoAtende) {
    profissionais.push({
      nome: voce.nome.trim(),
      email: voce.email.trim().toLowerCase(),
      eh_dono: true,
      servicos: listaServicos(equipe.dono),
      horario_diferente: equipe.dono.horarioDiferente ? equipe.dono.horarioObs.trim() : null,
      pausa: pausaDe("dono"),
      // Foto de perfil já reduzida (data URL JPEG ~480px) ou null.
      foto: equipe.dono.foto || null,
    });
  }
  for (const p of equipe.profissionais) {
    profissionais.push({
      nome: p.nome.trim(),
      email: p.email.trim().toLowerCase() || null,
      eh_dono: false,
      servicos: listaServicos(p),
      horario_diferente: p.horarioDiferente ? p.horarioObs.trim() : null,
      pausa: pausaDe(p.id),
      foto: p.foto || null,
    });
  }

  return {
    versao: VERSAO_PEDIDO,
    protocolo,
    criado_em: new Date().toISOString(),
    origem: {
      como_conheceu: voce.origem,
      como_conheceu_outro: voce.origem === "outro" ? voce.origemOutro.trim() : null,
      utm,
    },
    contato: {
      nome: voce.nome.trim(),
      whatsapp: `55${voce.whatsapp}`,
      email_google: voce.email.trim().toLowerCase(),
    },
    negocio: {
      nome: negocio.nome.trim(),
      especialidade: negocio.especialidade,
      especialidade_rotulo: esp ? esp.rotulo : "",
      cidade: negocio.cidade.trim(),
      bairro: negocio.bairro.trim() || null,
      instagram: normalizarInstagram(negocio.instagram) || null,
      slug_sugerido: slugify(negocio.nome),
    },
    servicos: servicos.map((s) => ({ nome: s.nome.trim(), duracao_min: Number(s.duracao), valor: precoParaNumero(s.preco) })),
    profissionais,
    horarios: {
      semana: diasSemana.map(({ dia }) => {
        const d = horarios.dias[dia];
        return { dia, aberto: d.aberto, abre: d.aberto ? d.abre : null, fecha: d.aberto ? d.fecha : null };
      }),
      // Pausa igual para todos fica aqui; se for individual, fica em cada profissional.
      pausa: horarios.pausa.ativa && !individual ? { inicio: horarios.pausa.inicio, fim: horarios.pausa.fim } : null,
      pausa_por_profissional: individual,
    },
    visual: {
      tema: visual.tema || "auto",
      tema_sugerido: esp ? esp.tema : "tema_8",
      perfil: esp ? esp.perfil : "profissional",
      plano_interesse: visual.plano,
    },
    observacoes: revisao.observacoes.trim() || null,
    consentimentos: {
      termo_teste: revisao.aceiteTeste,
      lgpd: revisao.aceiteLgpd,
      versao_termo: cadastroConfig.versaoTermo,
      em: new Date().toISOString(),
    },
  };
}

// Converte o pedido no formato do sistema (dados.json + variáveis do .env).
// O sistema hoje só entende UM horário para todos os dias e folgas inteiras,
// então horários diferentes por dia, meia hora e pausa viram avisos para
// ajuste manual em vez de serem perdidos em silêncio.
export function paraDadosJson(pedido) {
  const abertos = pedido.horarios.semana.filter((d) => d.aberto);
  const inicio = Math.min(...abertos.map((d) => horaParaMinutos(d.abre)));
  const fim = Math.max(...abertos.map((d) => horaParaMinutos(d.fecha)));
  const avisos = [];
  if (new Set(abertos.map((d) => `${d.abre}-${d.fecha}`)).size > 1) avisos.push("Horários diferentes por dia da semana — o sistema usa um só horário.");
  if (abertos.some((d) => d.abre.endsWith(":30") || d.fecha.endsWith(":30"))) avisos.push("Horário com meia hora — o sistema arredonda para hora cheia.");
  if (pedido.horarios.pausa) avisos.push(`Pausa diária ${pedido.horarios.pausa.inicio}–${pedido.horarios.pausa.fim} (todos) — bloquear na agenda Google.`);
  if (pedido.horarios.pausa_por_profissional) {
    for (const p of pedido.profissionais) {
      avisos.push(p.pausa ? `${p.nome}: pausa ${p.pausa.inicio}–${p.pausa.fim} — bloquear na agenda dela(e).` : `${p.nome}: sem pausa.`);
    }
  }
  for (const p of pedido.profissionais) if (p.horario_diferente) avisos.push(`${p.nome}: horário diferente (${p.horario_diferente}).`);
  for (const p of pedido.profissionais) if (p.foto) avisos.push(`${p.nome}: enviou foto de perfil — salvar em fotos/ e preencher foto_url.`);

  const valorDe = Object.fromEntries(pedido.servicos.map((s) => [s.nome, s]));
  return {
    dados: {
      negocio: {
        nome: pedido.negocio.nome,
        subtitulo: pedido.negocio.especialidade_rotulo,
        cidade: pedido.negocio.cidade,
        rede_social: pedido.negocio.instagram || "",
        telefone: pedido.contato.whatsapp,
        email_dono: pedido.contato.email_google,
      },
      profissionais: pedido.profissionais.map((p, i) => ({
        id: i + 1,
        nome: p.nome,
        calendar_id: "",
        email: p.email || "",
        servicos: p.servicos.map((nome) => ({ nome, duracao_min: valorDe[nome].duracao_min, valor: valorDe[nome].valor })),
      })),
    },
    env: {
      TEMA: pedido.visual.tema === "auto" ? pedido.visual.tema_sugerido : pedido.visual.tema,
      PERFIL_PROFISSIONAL: pedido.visual.perfil,
      EXPEDIENTE_INICIO: String(Math.floor(inicio / 60)),
      EXPEDIENTE_FIM: String(Math.ceil(fim / 60)),
      FOLGAS: pedido.horarios.semana.filter((d) => !d.aberto).map((d) => d.dia).join(","),
    },
    avisos,
  };
}

// Texto legível para o e-mail (enquanto não há integração).
export function resumoTexto(pedido) {
  const rot = (lista, v) => (lista.find((x) => x.valor === v) || {}).rotulo || v;
  const tema = temas.find((t) => t.id === pedido.visual.tema);
  const nomeDia = Object.fromEntries(diasSemana.map((d) => [d.dia, d.nome]));
  const linhas = [
    `PROTOCOLO: ${pedido.protocolo}`,
    "",
    "== CONTATO ==",
    `Nome: ${pedido.contato.nome}`,
    `WhatsApp: ${pedido.contato.whatsapp}`,
    `E-mail Google: ${pedido.contato.email_google}`,
    `Conheceu por: ${rot(origens, pedido.origem.como_conheceu)}${pedido.origem.como_conheceu_outro ? ` (${pedido.origem.como_conheceu_outro})` : ""}`,
    `UTM: ${Object.entries(pedido.origem.utm || {}).map(([k, v]) => `${k}=${v}`).join(" ") || "—"}`,
    "",
    "== NEGÓCIO ==",
    `${pedido.negocio.nome} — ${pedido.negocio.especialidade_rotulo}`,
    `${pedido.negocio.cidade}${pedido.negocio.bairro ? ` / ${pedido.negocio.bairro}` : ""}`,
    `Instagram: ${pedido.negocio.instagram || "—"}`,
    `Slug sugerido: ${pedido.negocio.slug_sugerido}`,
    "",
    "== SERVIÇOS ==",
    ...pedido.servicos.map((s) => `- ${s.nome} · ${s.duracao_min} min · R$ ${s.valor.toFixed(2).replace(".", ",")}`),
    "",
    "== EQUIPE ==",
    ...pedido.profissionais.map((p) => `- ${p.nome}${p.eh_dono ? " (dono)" : ""} · ${p.email || "sem e-mail"} · ${p.servicos.join(", ")}${p.horario_diferente ? ` · HORÁRIO: ${p.horario_diferente}` : ""}${pedido.horarios.pausa_por_profissional ? ` · PAUSA: ${p.pausa ? `${p.pausa.inicio}–${p.pausa.fim}` : "não"}` : ""}${p.foto ? " · FOTO: sim" : ""}`),
    "",
    "== HORÁRIOS ==",
    ...pedido.horarios.semana.map((d) => `${nomeDia[d.dia]}: ${d.aberto ? `${d.abre}–${d.fecha}` : "fechado"}`),
    `Pausa: ${pedido.horarios.pausa_por_profissional ? "cada profissional tem a sua (ver EQUIPE)" : pedido.horarios.pausa ? `${pedido.horarios.pausa.inicio}–${pedido.horarios.pausa.fim} (todos)` : "não"}`,
    "",
    "== VISUAL ==",
    `Tema: ${tema ? `${tema.nome} (${tema.id})` : `escolher por mim (sugerido ${pedido.visual.tema_sugerido})`}`,
    `Plano de interesse: ${rot(planos, pedido.visual.plano_interesse)}`,
    "",
    `Observações: ${pedido.observacoes || "—"}`,
  ];
  return linhas.join("\n");
}
