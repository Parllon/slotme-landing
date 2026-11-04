import { Check, Sparkles } from "lucide-react";
import { especialidades, planos, temas, visualTextos as T } from "../../../../data/cadastro";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import "./EtapaVisual.css";

/** Miniatura de como a página de agendamento fica com aquele tema. */
function Miniatura({ tema, nomeNegocio }) {
  return (
    <span
      className="miniatura"
      aria-hidden="true"
      style={{
        "--m-fundo": tema.fundo, "--m-primaria": tema.primaria, "--m-cartao": tema.cartao,
        "--m-texto2": tema.texto2, "--m-borda": tema.borda,
        "--m-fonte": tema.serifa ? "Georgia, 'Times New Roman', serif" : "'Inter', system-ui, sans-serif",
      }}
    >
      <span className="miniatura__titulo">{nomeNegocio}</span>
      <span className="miniatura__linha" />
      <span className="miniatura__cartao"><span /><span /></span>
      <span className="miniatura__cartao"><span /><span /></span>
      <span className="miniatura__botao">{T.previewBotao}</span>
    </span>
  );
}

export function EtapaVisual({ estado, dispatch }) {
  const { visual, negocio } = estado;
  const esp = especialidades.find((e) => e.valor === negocio.especialidade);
  const sugerido = esp ? esp.tema : null;
  const nomeNegocio = negocio.nome.trim() || T.previewNegocio;
  // Sugerido primeiro na lista.
  const lista = [...temas].sort((a, b) => (b.id === sugerido) - (a.id === sugerido));
  const escolher = (tema) => dispatch({ tipo: "campo", secao: "visual", campo: "tema", valor: tema });

  return (
    <div className="etapa-visual">
      <fieldset className="etapa-visual__temas">
        <legend className="sr-only">{T.legenda}</legend>
        {lista.map((t) => (
          <label key={t.id} className={`etapa-visual__tema ${visual.tema === t.id ? "etapa-visual__tema--ativo" : ""}`}>
            <input type="radio" name="tema" value={t.id} checked={visual.tema === t.id} onChange={() => escolher(t.id)} />
            <Miniatura tema={t} nomeNegocio={nomeNegocio} />
            <span className="etapa-visual__rotulo">
              <span><strong>{t.nome}</strong><small>{t.vibe}</small></span>
              {visual.tema === t.id && <Check size={18} strokeWidth={3} aria-hidden="true" />}
            </span>
            {t.id === sugerido && <span className="etapa-visual__selo">{T.sugerido}</span>}
          </label>
        ))}
        <label className={`etapa-visual__tema etapa-visual__auto ${!visual.tema ? "etapa-visual__tema--ativo" : ""}`}>
          <input type="radio" name="tema" value="" checked={!visual.tema} onChange={() => escolher("")} />
          <Sparkles size={22} aria-hidden="true" />
          <span className="etapa-visual__rotulo">
            <span><strong>{T.automatico.rotulo}</strong><small>{T.automatico.descricao}</small></span>
          </span>
        </label>
      </fieldset>

      <div className="etapa-visual__plano">
        <Opcoes
          nome="plano" legenda={T.planoTitulo} variante="cartao"
          opcoes={planos} valor={visual.plano}
          onChange={(valor) => dispatch({ tipo: "campo", secao: "visual", campo: "plano", valor })}
        />
        <p className="campo__dica">{T.planoHint}</p>
      </div>
    </div>
  );
}
