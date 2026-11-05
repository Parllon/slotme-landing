import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CalendarPlus, CheckCircle2, ExternalLink, Loader2, Mail, MessageCircle, Smartphone } from "lucide-react";
import { whatsapp } from "../../../data/content";
import { cadastroConfig, sucessoTextos as T } from "../../../data/cadastro";
import { consultarStatus } from "../../../lib/cadastro/enviar";
import { tipoEmail } from "../../../lib/cadastro/formatos";
import "./Sucesso.css";

const INTERVALO_MS = 10000;
const MAX_TENTATIVAS = 30; // ~5 minutos

/**
 * Acompanha a criação da página no servidor (GET /api/pedidos/:protocolo/status).
 * Retorna { estado: criando|pronto|demorando|erro, agenda: link da agenda do iPhone | null }.
 */
function usarStatusPagina(protocolo, pagina) {
  const [res, setRes] = useState({ estado: "criando", agenda: null });
  useEffect(() => {
    if (!pagina) return undefined;
    let tentativas = 0;
    let fim = false;
    let id = null;
    const consultar = async () => {
      tentativas += 1;
      try {
        const r = await consultarStatus(protocolo, pagina.chave);
        if (fim || !r) return;
        if (r.status === "pronto") {
          setRes({ estado: "pronto", agenda: r.agenda || null });
          fim = true; clearInterval(id);
          return;
        }
        if (r.status === "erro") { setRes({ estado: "erro", agenda: null }); fim = true; clearInterval(id); return; }
      } catch { /* túnel reiniciando depois do DNS: tenta de novo no próximo ciclo */ }
      if (tentativas >= MAX_TENTATIVAS) {
        setRes((x) => (x.estado === "criando" ? { ...x, estado: "demorando" } : x));
        fim = true; clearInterval(id);
      }
    };
    consultar();
    id = setInterval(consultar, INTERVALO_MS);
    return () => { fim = true; clearInterval(id); };
  }, [protocolo, pagina]);
  return res;
}

function CartaoPagina({ pagina, estado }) {
  const P = T.pagina;
  const icone = {
    criando: <Loader2 size={20} className="sucesso__girando" aria-hidden="true" />,
    pronto: <CheckCircle2 size={20} aria-hidden="true" />,
    demorando: <AlertTriangle size={20} aria-hidden="true" />,
    erro: <AlertTriangle size={20} aria-hidden="true" />,
  }[estado];
  const texto = { criando: P.criando, pronto: P.pronta, demorando: P.demorando, erro: P.erro }[estado];

  return (
    <div className={`sucesso__pagina sucesso__pagina--${estado}`} role="status" aria-live="polite">
      <p className="sucesso__pagina-titulo">{P.titulo}</p>
      <strong className="sucesso__pagina-url">{pagina.url.replace("https://", "")}</strong>
      <p className="sucesso__pagina-estado">{icone}{texto}</p>
      {estado === "pronto" && (
        <a className="btn btn--outline btn--block" href={pagina.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} aria-hidden="true" />{P.abrir}
        </a>
      )}
    </div>
  );
}

/** Cartão do passo obrigatório: aceitar a agenda no Gmail OU ativar no iPhone. */
function PassoAgenda({ tipo, email, agenda, estado }) {
  const icloud = tipo === "icloud";
  const X = icloud ? T.agendaIphone : T.conviteGmail;
  return (
    <section className="sucesso__obrigatorio" aria-labelledby="passo-agenda">
      <span className="sucesso__selo">{X.selo}</span>
      <h2 id="passo-agenda">
        {icloud ? <Smartphone size={22} aria-hidden="true" /> : <Mail size={22} aria-hidden="true" />}
        {X.titulo}
      </h2>
      <p>{icloud ? X.texto : X.texto(email)}</p>
      <ol>{X.passos.map((p) => <li key={p}>{p}</li>)}</ol>
      {icloud ? (
        agenda ? (
          <a className="btn btn--primary btn--block" href={agenda} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={18} aria-hidden="true" />{X.botao}
          </a>
        ) : (
          <p className="sucesso__aguardando">
            {estado === "criando" && <Loader2 size={16} className="sucesso__girando" aria-hidden="true" />}{X.aguardando}
          </p>
        )
      ) : (
        <a className="btn btn--primary btn--block" href={X.link} target="_blank" rel="noopener noreferrer">
          <Mail size={18} aria-hidden="true" />{X.botao}
        </a>
      )}
      {icloud && <small>{X.ignorarGoogle}</small>}
    </section>
  );
}

export function Sucesso({ protocolo, nome, email, negocio, fotos = [], pagina = null }) {
  const titulo = useRef(null);
  useEffect(() => { titulo.current?.focus(); window.scrollTo(0, 0); }, []);
  const { estado, agenda } = usarStatusPagina(protocolo, pagina);
  const tipo = tipoEmail(email);
  const primeiroNome = (nome || "").trim().split(/\s+/)[0];
  const linkWhats = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(T.whatsappMensagem(protocolo, negocio))}`;
  const linkAtivar = `https://wa.me/${cadastroConfig.whatsappCentral}?text=${encodeURIComponent(T.ativarAvisosMensagem(protocolo))}`;
  const passos = pagina ? T.proximosAuto() : T.proximos(email, cadastroConfig.prazoRetorno);

  return (
    <div className="sucesso">
      <CheckCircle2 className="sucesso__icone" size={56} strokeWidth={1.75} aria-hidden="true" />
      <h1 ref={titulo} tabIndex={-1}>{T.titulo(primeiroNome)}</h1>
      <p className="sucesso__protocolo">{T.protocolo} <strong>{protocolo}</strong></p>

      {pagina && <CartaoPagina pagina={pagina} estado={estado} />}
      {pagina && <PassoAgenda tipo={tipo} email={email} agenda={agenda} estado={estado} />}

      <h2>{T.proximosTitulo}</h2>
      <ol className="sucesso__passos">
        {passos.map((p, i) => (
          <li key={p.titulo}>
            <span className="sucesso__num" aria-hidden="true">{i + 1}</span>
            <span>
              <strong>{p.titulo}</strong>{p.texto}
              {p.acao === "ativarAvisos" && (
                <a className="btn btn--whatsapp sucesso__acao" href={linkAtivar} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" />{T.ativarAvisosBotao}
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>

      {fotos.length > 0 && (
        <div className="sucesso__fotos">
          <h2>{T.fotosTitulo}</h2>
          <ul>
            {fotos.map((f) => (
              <li key={f.nome}><img src={f.foto} alt="" width="56" height="56" /><span>{f.nome}</span></li>
            ))}
          </ul>
        </div>
      )}

      <a className="btn btn--outline btn--block" href={linkWhats} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} aria-hidden="true" />{T.whatsappBotao}
      </a>
      <a className="sucesso__voltar" href="/">{T.voltarSite}</a>
    </div>
  );
}
