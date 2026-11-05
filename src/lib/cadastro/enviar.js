// enviar.js — ÚNICO ponto que sabe para onde o cadastro vai.
//
// Com VITE_CADASTRO_ENDPOINT (.env.local) apontando para o painel
// (https://cadastro.agendamentos.app.br/api/pedidos), o pedido vai em JSON —
// fotos incluídas — e o cliente é criado SOZINHO no servidor. O e-mail do
// Web3Forms continua indo como cópia/aviso para o Parllon, com o link da página
// e das fotos já publicadas.
//
// Sem a variável, volta ao modo antigo: só e-mail (montagem manual).
import { ctaFinal } from "../../data/content";
import { paraDadosJson, resumoTexto } from "./pedido";
import { tamanhoKb } from "./imagem";

const ENDPOINT = import.meta.env.VITE_CADASTRO_ENDPOINT || "";

export class ErroEnvio extends Error {
  constructor(mensagem, codigo) { super(mensagem); this.codigo = codigo; } // "duplicado" | "limite" | "rede"
}

async function enviarParaSistema(pedido) {
  let r;
  try {
    r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(pedido),
    });
  } catch (e) {
    throw new ErroEnvio(e.message, "rede");
  }
  const json = await r.json().catch(() => ({}));
  if (r.status === 409) throw new ErroEnvio(json.erro || "duplicado", "duplicado");
  if (r.status === 429) throw new ErroEnvio(json.erro || "limite", "limite");
  if (!r.ok) throw new ErroEnvio(json.erro || `HTTP ${r.status}`, "rede");
  return json; // { ok, protocolo, slug, url, status }
}

// Consulta o andamento da criação da página (tela de sucesso).
// `chave` (devolvida no envio) libera o link da agenda do iPhone na resposta.
export async function consultarStatus(protocolo, chave) {
  if (!ENDPOINT) return null;
  const q = chave ? `?chave=${encodeURIComponent(chave)}` : "";
  const r = await fetch(`${ENDPOINT}/${encodeURIComponent(protocolo)}/status${q}`, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json(); // { status, url, agenda? }
}

async function enviarPorEmail(pedidoCompleto, { botcheck, sistema }) {
  // O plano grátis do Web3Forms não aceita anexos. Com a integração, as fotos
  // já foram para o servidor: o e-mail leva o LINK de cada uma. Sem integração,
  // só avisa quem enviou foto.
  const comFoto = pedidoCompleto.profissionais
    .map((p, i) => ({ ...p, id: i + 1 }))
    .filter((p) => p.foto);
  const pedido = { ...pedidoCompleto, profissionais: pedidoCompleto.profissionais.map((p) => ({ ...p, foto: p.foto ? "(ver campo fotos)" : null })) };
  const convertido = paraDadosJson(pedido);
  const fotos = !comFoto.length
    ? "nenhuma"
    : sistema
      ? comFoto.map((p) => `${p.nome}: ${sistema.url}/fotos/prof-${p.id}.jpg`).join("\n")
      : `${comFoto.map((p) => `${p.nome} (~${tamanhoKb(p.foto)} KB)`).join(", ")} — não vão no e-mail (plano grátis do Web3Forms não aceita anexo).`;

  const r = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: ctaFinal.web3formsKey,
      subject: sistema
        ? `Novo cliente criado automaticamente — ${pedido.negocio.nome} · ${pedido.protocolo}`
        : `Novo cadastro (teste grátis) — ${pedido.negocio.nome} · ${pedido.protocolo}`,
      from_name: "Cadastro SlotMe",
      replyto: pedido.contato.email_google,
      // Web3Forms descarta o envio se este campo vier marcado (armadilha de robô).
      botcheck,
      pagina: sistema ? `${sistema.url} (status: ${sistema.status}; acompanhe no painel)` : "criação manual",
      resumo: resumoTexto(pedido),
      avisos_para_o_sistema: convertido.avisos.join("\n") || "nenhum",
      fotos,
      // Sem integração: copie e cole no painel quando for criar o cliente.
      dados_json: JSON.stringify(convertido.dados, null, 2),
      env: Object.entries(convertido.env).map(([k, v]) => `${k}=${v}`).join("\n"),
      pedido_json: JSON.stringify(pedido),
    }),
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok || !json.success) throw new Error(json.message || `HTTP ${r.status}`);
  return json;
}

/**
 * Envia o pedido. Com integração: quem decide sucesso/erro é o SISTEMA; o
 * e-mail sai depois (já com o link da página) e uma falha nele só é logada.
 * Retorna { slug, url, status } com integração, ou null no modo só-e-mail.
 */
export async function enviarPedido(pedido, opcoes) {
  if (!ENDPOINT) {
    await enviarPorEmail(pedido, { ...opcoes, sistema: null });
    return null;
  }
  const sistema = await enviarParaSistema(pedido);
  enviarPorEmail(pedido, { ...opcoes, sistema }).catch((e) => console.warn("[cadastro] e-mail de cópia falhou:", e));
  return sistema;
}
