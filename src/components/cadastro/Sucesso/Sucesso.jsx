import { useEffect, useRef } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { whatsapp } from "../../../data/content";
import { cadastroConfig, sucessoTextos as T } from "../../../data/cadastro";
import "./Sucesso.css";

export function Sucesso({ protocolo, nome, email, negocio }) {
  const titulo = useRef(null);
  useEffect(() => { titulo.current?.focus(); window.scrollTo(0, 0); }, []);
  const primeiroNome = (nome || "").trim().split(/\s+/)[0];
  const linkWhats = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(T.whatsappMensagem(protocolo, negocio))}`;

  return (
    <div className="sucesso">
      <CheckCircle2 className="sucesso__icone" size={56} strokeWidth={1.75} aria-hidden="true" />
      <h1 ref={titulo} tabIndex={-1}>{T.titulo(primeiroNome)}</h1>
      <p className="sucesso__protocolo">{T.protocolo} <strong>{protocolo}</strong></p>

      <h2>{T.proximosTitulo}</h2>
      <ol className="sucesso__passos">
        {T.proximos(email, cadastroConfig.prazoRetorno).map((p, i) => (
          <li key={p.titulo}>
            <span className="sucesso__num" aria-hidden="true">{i + 1}</span>
            <span><strong>{p.titulo}</strong>{p.texto}</span>
          </li>
        ))}
      </ol>

      <a className="btn btn--whatsapp btn--block" href={linkWhats} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} aria-hidden="true" />{T.whatsappBotao}
      </a>
      <a className="sucesso__voltar" href="/">{T.voltarSite}</a>
    </div>
  );
}
