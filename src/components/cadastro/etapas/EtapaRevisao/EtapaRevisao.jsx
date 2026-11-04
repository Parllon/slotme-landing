import { Mail, MessageCircle, Pencil } from "lucide-react";
import { whatsapp } from "../../../../data/content";
import {
  cadastroConfig, diasSemana, especialidades, origens, planos, revisaoTextos as T, temas, visualTextos,
} from "../../../../data/cadastro";
import { formatarDuracao, formatarPreco, mascaraTelefone, normalizarInstagram, precoParaNumero, slugify } from "../../../../lib/cadastro/formatos";
import { Campo } from "../../ui/Campo/Campo";
import { listarPessoas, pausaDaPessoa, pausaIndividual } from "../../../../lib/cadastro/estado";
import { Caixa } from "../../ui/Alternador/Alternador";
import "./EtapaRevisao.css";

const rotuloDe = (lista, valor) => (lista.find((x) => x.valor === valor) || {}).rotulo || "—";

function Secao({ titulo, etapa, irPara, children }) {
  return (
    <section className="revisao__secao">
      <header>
        <h2>{titulo}</h2>
        <button type="button" onClick={() => irPara(etapa)} aria-label={`${T.editar} ${titulo}`}>
          <Pencil size={14} aria-hidden="true" />{T.editar}
        </button>
      </header>
      {children}
    </section>
  );
}

function Linha({ rotulo, children }) {
  return <div className="revisao__linha"><dt>{rotulo}</dt><dd>{children || "—"}</dd></div>;
}

export function EtapaRevisao({ estado, dispatch, erros, irPara, indice, erroEnvio }) {
  const { voce, negocio, servicos, equipe, horarios, visual, revisao } = estado;
  const R = T.rotulos;
  const set = (campo) => (valor) => dispatch({ tipo: "campo", secao: "revisao", campo, valor });
  const tema = temas.find((t) => t.id === visual.tema);
  const nomeServico = Object.fromEntries(servicos.map((s) => [s.id, s.nome]));
  const servicosDe = (p) => (p.todos ? R.todos : p.servicos.map((id) => nomeServico[id]).join(", "));
  const pessoas = listarPessoas(estado);
  const individual = pausaIndividual(estado);
  const linkWhats = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(`Oi! Tive um problema para enviar o cadastro do teste grátis (${negocio.nome}).`)}`;

  return (
    <div className="revisao">
      <div className="revisao__convite">
        <Mail size={22} aria-hidden="true" />
        <div>
          <p>{T.convite.titulo}</p>
          <strong>{voce.email}</strong>
          <small>{T.convite.texto}</small>
        </div>
      </div>

      <Secao titulo={T.secoes.voce} etapa={indice.voce} irPara={irPara}>
        <dl>
          <Linha rotulo={R.nome}>{voce.nome}</Linha>
          <Linha rotulo={R.whatsapp}>{mascaraTelefone(voce.whatsapp)}</Linha>
          <Linha rotulo={R.email}>{voce.email}</Linha>
          <Linha rotulo={R.origem}>{voce.origem === "outro" ? voce.origemOutro : rotuloDe(origens, voce.origem)}</Linha>
        </dl>
      </Secao>

      <Secao titulo={T.secoes.negocio} etapa={indice.negocio} irPara={irPara}>
        <dl>
          <Linha rotulo={R.negocio}>{negocio.nome}</Linha>
          <Linha rotulo={R.especialidade}>{rotuloDe(especialidades, negocio.especialidade)}</Linha>
          <Linha rotulo={R.local}>{[negocio.bairro, negocio.cidade].filter(Boolean).join(", ")}</Linha>
          <Linha rotulo={R.instagram}>{normalizarInstagram(negocio.instagram)}</Linha>
          <Linha rotulo={R.link}>{`${slugify(negocio.nome)}.${cadastroConfig.dominioPaginas}`}</Linha>
        </dl>
      </Secao>

      <Secao titulo={`${T.secoes.servicos} (${servicos.length})`} etapa={indice.servicos} irPara={irPara}>
        <ul className="revisao__lista">
          {servicos.map((s) => (
            <li key={s.id}><span>{s.nome}</span><span>{formatarDuracao(s.duracao)} · {formatarPreco(precoParaNumero(s.preco))}</span></li>
          ))}
        </ul>
      </Secao>

      <Secao titulo={`${T.secoes.equipe} (${pessoas.length})`} etapa={indice.equipe} irPara={irPara}>
        <ul className="revisao__lista revisao__lista--empilhada">
          {pessoas.map((p) => (
            <li key={p.id} className="revisao__pessoa">
              <span className="revisao__pessoa-nome">
                {p.foto ? <img src={p.foto} alt="" className="revisao__foto" /> : <span className="revisao__foto revisao__foto--vazia" aria-hidden="true">{(p.nome || "?").trim()[0]?.toUpperCase()}</span>}
                <strong>{p.nome}</strong>
              </span>
              <span>{[p.email, servicosDe(p), p.horarioDiferente ? p.horarioObs : null].filter(Boolean).join(" · ")}</span>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao titulo={T.secoes.horarios} etapa={indice.horarios} irPara={irPara}>
        <dl>
          {diasSemana.map(({ dia, nome }) => {
            const d = horarios.dias[dia];
            return <Linha key={dia} rotulo={nome}>{d.aberto ? `${d.abre} – ${d.fecha}` : R.fechado}</Linha>;
          })}
          {horarios.pausa.ativa && !individual && (
            <Linha rotulo={R.pausa}>{`${horarios.pausa.inicio} – ${horarios.pausa.fim} ${pessoas.length > 1 ? R.pausaTodos : ""}`.trim()}</Linha>
          )}
          {individual && pessoas.map((p) => {
            const pp = pausaDaPessoa(horarios.pausa, p.id);
            return <Linha key={p.id} rotulo={R.pausaDe(p.nome)}>{pp.ativa ? `${pp.inicio} – ${pp.fim}` : R.semPausa}</Linha>;
          })}
        </dl>
      </Secao>

      <Secao titulo={T.secoes.visual} etapa={indice.visual} irPara={irPara}>
        <dl>
          <Linha rotulo={R.tema}>{tema ? tema.nome : visualTextos.automatico.rotulo}</Linha>
          <Linha rotulo={R.plano}>{rotuloDe(planos, visual.plano)}</Linha>
        </dl>
      </Secao>

      <Campo id="rev-obs" label={T.observacoes.label}>
        <textarea
          id="rev-obs" className="cad-textarea" rows={3} maxLength={1000}
          placeholder={T.observacoes.placeholder} value={revisao.observacoes}
          onChange={(e) => set("observacoes")(e.target.value)}
        />
      </Campo>

      {/* Armadilha para robôs: invisível para pessoas, robôs costumam marcar. */}
      <div className="revisao__armadilha" aria-hidden="true">
        <label htmlFor="rev-botcheck">Não marque</label>
        <input id="rev-botcheck" type="checkbox" tabIndex={-1} autoComplete="off" checked={revisao.botcheck} onChange={(e) => set("botcheck")(e.target.checked)} />
      </div>

      <div className="revisao__aceites">
        <Caixa id="rev-aceite-teste" checked={revisao.aceiteTeste} onChange={set("aceiteTeste")} erro={erros["revisao.aceiteTeste"]}>
          {T.aceiteTeste(cadastroConfig.diasTeste)}
        </Caixa>
        <Caixa id="rev-aceite-lgpd" checked={revisao.aceiteLgpd} onChange={set("aceiteLgpd")} erro={erros["revisao.aceiteLgpd"]}>
          {T.aceiteLgpd.antes}
          <a href={cadastroConfig.politicaUrl} target="_blank" rel="noopener noreferrer">{T.aceiteLgpd.link}</a>
          {T.aceiteLgpd.depois}
        </Caixa>
      </div>

      {erroEnvio && (
        <div className="revisao__erro-envio" role="alert">
          <p>{T.erroEnvio}</p>
          <a href={linkWhats} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />{T.whatsappErro}</a>
        </div>
      )}
    </div>
  );
}
