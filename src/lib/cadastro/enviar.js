// enviar.js — ÚNICO ponto que sabe para onde o cadastro vai.
//
// Hoje: Web3Forms (chega no seu e-mail, mesma chave do formulário da home).
// Depois: quando o sistema tiver a rota de pedidos, preencha
//   VITE_CADASTRO_ENDPOINT=https://.../api/pedidos   (no .env.local)
// e o pedido passa a ir em JSON para lá, sem mexer em nenhuma tela.
import { ctaFinal } from "../../data/content";
import { paraDadosJson, resumoTexto } from "./pedido";
import { tamanhoKb } from "./imagem";

const ENDPOINT = import.meta.env.VITE_CADASTRO_ENDPOINT || "";

async function enviarParaSistema(pedido) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(pedido),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json().catch(() => ({}));
}

async function enviarPorEmail(pedidoCompleto, { botcheck }) {
  // O plano grátis do Web3Forms não aceita anexos: as fotos ficam de fora do
  // e-mail (o resumo diz quem enviou). Pelo VITE_CADASTRO_ENDPOINT elas vão junto.
  const comFoto = pedidoCompleto.profissionais.filter((p) => p.foto);
  const pedido = { ...pedidoCompleto, profissionais: pedidoCompleto.profissionais.map((p) => ({ ...p, foto: p.foto ? "(não enviada por e-mail)" : null })) };
  const convertido = paraDadosJson(pedido);
  const r = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: ctaFinal.web3formsKey,
      subject: `Novo cadastro (teste grátis) — ${pedido.negocio.nome} · ${pedido.protocolo}`,
      from_name: "Cadastro SlotMe",
      replyto: pedido.contato.email_google,
      // Web3Forms descarta o envio se este campo vier marcado (armadilha de robô).
      botcheck,
      resumo: resumoTexto(pedido),
      avisos_para_o_sistema: convertido.avisos.join("\n") || "nenhum",
      fotos: comFoto.length
        ? `${comFoto.map((p) => `${p.nome} (~${tamanhoKb(p.foto)} KB)`).join(", ")} — não vão no e-mail (plano grátis do Web3Forms não aceita anexo).`
        : "nenhuma",
      // Copie e cole no painel quando for criar o cliente:
      dados_json: JSON.stringify(convertido.dados, null, 2),
      env: Object.entries(convertido.env).map(([k, v]) => `${k}=${v}`).join("\n"),
      pedido_json: JSON.stringify(pedido),
    }),
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok || !json.success) throw new Error(json.message || `HTTP ${r.status}`);
  return json;
}

export function enviarPedido(pedido, opcoes) {
  return ENDPOINT ? enviarParaSistema(pedido) : enviarPorEmail(pedido, opcoes);
}
