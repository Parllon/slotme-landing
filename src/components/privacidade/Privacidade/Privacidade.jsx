import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "../../ui/Logo/Logo";
import { whatsapp } from "../../../data/content";
import { contatoTextos as C, privacidade as P, secoes } from "../../../data/privacidade";
import "./Privacidade.css";

function Secao({ s }) {
  return (
    <section id={s.id} className="priv__secao" aria-labelledby={`${s.id}-titulo`}>
      <h2 id={`${s.id}-titulo`}>{s.titulo}</h2>
      {(s.paragrafos || []).map((t) => <p key={t}>{t}</p>)}
      {s.lista && <ul>{s.lista.map((t) => <li key={t}>{t}</li>)}</ul>}
      {(s.paragrafosDepois || []).map((t) => <p key={t}>{t}</p>)}
    </section>
  );
}

export function Privacidade() {
  const { controlador } = P;
  const linkWhats = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(C.whatsappMensagem)}`;
  const contato = [
    controlador.responsavel && [C.responsavel, `${controlador.responsavel} (${controlador.nome})`],
    controlador.cnpj && [C.cnpj, controlador.cnpj],
    controlador.email && [C.email, <a key="e" href={`mailto:${controlador.email}`}>{controlador.email}</a>],
    [C.whatsapp, <a key="w" href={linkWhats} target="_blank" rel="noopener noreferrer">{`+${whatsapp.phone}`}</a>],
  ].filter(Boolean);
  const todas = [...secoes, { id: C.id, titulo: C.titulo }];

  return (
    <div className="priv">
      <header className="priv__topo">
        <div className="priv__topo-interno">
          <a href="/" className="priv__logo"><Logo /></a>
          <a href={P.voltar.href} className="priv__voltar"><ArrowLeft size={16} aria-hidden="true" />{P.voltar.rotulo}</a>
        </div>
      </header>

      <main className="priv__corpo">
        <h1>{P.titulo}</h1>
        <p className="priv__data">{P.ultimaAtualizacao} {P.atualizadoEm}</p>

        <div className="priv__resumo">
          <h2><ShieldCheck size={20} aria-hidden="true" />{P.resumo.titulo}</h2>
          <ul>{P.resumo.itens.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>

        <nav className="priv__sumario" aria-label={P.sumarioTitulo}>
          <p>{P.sumarioTitulo}</p>
          <ol>{todas.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.titulo.replace(/^\d+\.\s*/, "")}</a></li>)}</ol>
        </nav>

        {secoes.map((s) => <Secao key={s.id} s={s} />)}

        <section id={C.id} className="priv__secao" aria-labelledby={`${C.id}-titulo`}>
          <h2 id={`${C.id}-titulo`}>{C.titulo}</h2>
          <p>{C.texto}</p>
          <dl className="priv__contato">
            {contato.map(([rotulo, valor]) => (
              <div key={rotulo}><dt>{rotulo}</dt><dd>{valor}</dd></div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
