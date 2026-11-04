// estado.js — formato do estado do cadastro + reducer.
// O estado fica todo num objeto só, para poder ser salvo como rascunho.
import { gerarId } from "./formatos";

export const VERSAO_ESTADO = 1;

const diaPadrao = (aberto) => ({ aberto, abre: "09:00", fecha: "19:00" });

export function estadoInicial() {
  return {
    versao: VERSAO_ESTADO,
    etapa: 0,
    voce: { nome: "", whatsapp: "", email: "", emailConfirma: "", origem: "", origemOutro: "" },
    negocio: { nome: "", especialidade: "", cidade: "", bairro: "", instagram: "" },
    servicos: [],
    equipe: {
      donoAtende: true,
      dono: { todos: true, servicos: [], horarioDiferente: false, horarioObs: "", foto: "" },
      profissionais: [],
    },
    horarios: {
      // chave = dia da semana (0 = domingo), igual ao FOLGAS do sistema
      dias: { 0: diaPadrao(false), 1: diaPadrao(true), 2: diaPadrao(true), 3: diaPadrao(true), 4: diaPadrao(true), 5: diaPadrao(true), 6: diaPadrao(true) },
      // modo "todos" = mesma pausa para todo mundo; "individual" = cada
      // profissional tem a sua (porPessoa[id]; "dono" é você).
      pausa: { ativa: false, inicio: "12:00", fim: "13:00", modo: "todos", porPessoa: {} },
    },
    visual: { tema: "", plano: "nao_sei" },
    revisao: { observacoes: "", aceiteTeste: false, aceiteLgpd: false, botcheck: false },
  };
}

// Quem atende, na ordem da tela: você (se atende) e depois a equipe.
export function listarPessoas(estado) {
  const { equipe, voce } = estado;
  return [
    ...(equipe.donoAtende ? [{ ...equipe.dono, id: "dono", nome: voce.nome, email: voce.email, ehDono: true }] : []),
    ...equipe.profissionais.map((p) => ({ ...p, ehDono: false })),
  ];
}

// Pausa de uma pessoa no modo individual. Quem ainda não foi ajustado herda o
// horário geral, já ligado (o mais comum é todo mundo almoçar).
export function pausaDaPessoa(pausa, id) {
  return (pausa.porPessoa || {})[id] || { ativa: true, inicio: pausa.inicio, fim: pausa.fim };
}

// A pausa é individual de verdade? Só se houver mais de uma pessoa.
export function pausaIndividual(estado) {
  const { pausa } = estado.horarios;
  return pausa.ativa && pausa.modo === "individual" && listarPessoas(estado).length > 1;
}

export function novoServico(dados = {}) {
  return { id: gerarId(), nome: "", duracao: 60, preco: "", ...dados };
}

export function novoProfissional() {
  // foto = data URL da foto de perfil já reduzida (opcional, "" = sem foto)
  return { id: gerarId(), nome: "", email: "", todos: true, servicos: [], horarioDiferente: false, horarioObs: "", foto: "" };
}

export function reducer(estado, acao) {
  switch (acao.tipo) {
    case "carregar":
      return acao.estado;
    case "reiniciar":
      return estadoInicial();
    case "irPara":
      return { ...estado, etapa: acao.etapa };
    // Atualiza um campo de uma seção simples: { secao: "voce", campo: "nome", valor }
    case "campo":
      return { ...estado, [acao.secao]: { ...estado[acao.secao], [acao.campo]: acao.valor } };

    case "servicoAdicionar":
      return { ...estado, servicos: [...estado.servicos, novoServico(acao.dados)] };
    case "servicoAlterar":
      return { ...estado, servicos: estado.servicos.map((s) => (s.id === acao.id ? { ...s, [acao.campo]: acao.valor } : s)) };
    case "servicoRemover": {
      // Tira o serviço também da lista de quem faz o quê.
      const semServico = (p) => ({ ...p, servicos: p.servicos.filter((id) => id !== acao.id) });
      return {
        ...estado,
        servicos: estado.servicos.filter((s) => s.id !== acao.id),
        equipe: {
          ...estado.equipe,
          dono: semServico(estado.equipe.dono),
          profissionais: estado.equipe.profissionais.map(semServico),
        },
      };
    }

    case "equipeDonoAtende":
      return { ...estado, equipe: { ...estado.equipe, donoAtende: acao.valor } };
    case "equipeDonoAlterar":
      return { ...estado, equipe: { ...estado.equipe, dono: { ...estado.equipe.dono, [acao.campo]: acao.valor } } };
    case "profAdicionar":
      return { ...estado, equipe: { ...estado.equipe, profissionais: [...estado.equipe.profissionais, novoProfissional()] } };
    case "profAlterar":
      return {
        ...estado,
        equipe: {
          ...estado.equipe,
          profissionais: estado.equipe.profissionais.map((p) => (p.id === acao.id ? { ...p, [acao.campo]: acao.valor } : p)),
        },
      };
    case "profRemover":
      return { ...estado, equipe: { ...estado.equipe, profissionais: estado.equipe.profissionais.filter((p) => p.id !== acao.id) } };

    case "diaAlterar":
      return {
        ...estado,
        horarios: { ...estado.horarios, dias: { ...estado.horarios.dias, [acao.dia]: { ...estado.horarios.dias[acao.dia], [acao.campo]: acao.valor } } },
      };
    case "diasCopiarSegunda": {
      const seg = estado.horarios.dias[1];
      const dias = { ...estado.horarios.dias };
      for (const k of Object.keys(dias)) if (dias[k].aberto) dias[k] = { ...dias[k], abre: seg.abre, fecha: seg.fecha };
      return { ...estado, horarios: { ...estado.horarios, dias } };
    }
    case "pausaAlterar":
      return { ...estado, horarios: { ...estado.horarios, pausa: { ...estado.horarios.pausa, [acao.campo]: acao.valor } } };
    case "pausaPessoaAlterar": {
      const pausa = estado.horarios.pausa;
      const atual = pausaDaPessoa(pausa, acao.id);
      return {
        ...estado,
        horarios: { ...estado.horarios, pausa: { ...pausa, porPessoa: { ...pausa.porPessoa, [acao.id]: { ...atual, [acao.campo]: acao.valor } } } },
      };
    }

    default:
      return estado;
  }
}
