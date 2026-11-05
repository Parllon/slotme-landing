import { AlertTriangle, Check, Palette, Sparkles, X } from "lucide-react";
import { especialidades, perfis, planos, temas, visualTextos as T } from "../../../../data/cadastro";
import { contrasteBaixo, temaParaMiniatura } from "../../../../lib/cadastro/temaCustom";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import { Campo } from "../../ui/Campo/Campo";
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

/** Painel da "Minha cor": cor principal, detalhe opcional e fundo claro/escuro. */
function PainelCor({ cor, dispatch, erros }) {
  const C = T.custom;
  const set = (campo) => (valor) => dispatch({ tipo: "corAlterar", campo, valor });
  const baixo = contrasteBaixo(cor);

  return (
    <div className="etapa-visual__cor">
      <p className="etapa-visual__cor-titulo"><Palette size={18} aria-hidden="true" />{C.titulo}</p>

      <Campo id="cor-principal" label={C.principal} hint={C.principalHint} erro={erros["visual.cor.primaria"]}>
        <div className="seletor-cor">
          <input
            id="cor-principal" type="color" value={cor.primaria}
            onChange={(e) => set("primaria")(e.target.value.toUpperCase())}
            aria-describedby="cor-principal-dica"
          />
          <code>{cor.primaria.toUpperCase()}</code>
        </div>
      </Campo>
      <div className="etapa-visual__amostras" role="group" aria-label={C.sugestoes}>
        {T.coresSugeridas.map((hex) => (
          <button
            key={hex} type="button" className="etapa-visual__amostra" style={{ background: hex }}
            aria-label={hex} aria-pressed={cor.primaria.toUpperCase() === hex}
            onClick={() => set("primaria")(hex)}
          >
            {cor.primaria.toUpperCase() === hex && <Check size={14} strokeWidth={3} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <Opcoes
        nome="cor-fundo" legenda={C.fundo} opcoes={C.fundoOpcoes}
        valor={cor.modo} onChange={set("modo")}
      />

      {baixo && (
        <p className="etapa-visual__contraste" role="status"><AlertTriangle size={16} aria-hidden="true" />{C.contraste}</p>
      )}

      <Campo id="cor-detalhe" label={C.detalhe} hint={C.detalheHint} erro={erros["visual.cor.destaque"]}>
        {cor.destaque ? (
          <div className="seletor-cor">
            <input id="cor-detalhe" type="color" value={cor.destaque} onChange={(e) => set("destaque")(e.target.value.toUpperCase())} />
            <code>{cor.destaque.toUpperCase()}</code>
            <button type="button" className="seletor-cor__limpar" onClick={() => set("destaque")("")}>
              <X size={14} aria-hidden="true" />{C.detalheLimpar}
            </button>
          </div>
        ) : (
          <button id="cor-detalhe" type="button" className="seletor-cor__usar" onClick={() => set("destaque")("#C6A04A")}>
            <span className="seletor-cor__bolinha" style={{ background: "#C6A04A" }} aria-hidden="true" />{C.detalheUsar}
          </button>
        )}
      </Campo>
    </div>
  );
}

export function EtapaVisual({ estado, dispatch, erros }) {
  const { visual, negocio } = estado;
  const esp = especialidades.find((e) => e.valor === negocio.especialidade);
  const sugerido = esp ? esp.tema : null;
  const nomeNegocio = negocio.nome.trim() || T.previewNegocio;
  // Sugerido primeiro na lista.
  const lista = [...temas].sort((a, b) => (b.id === sugerido) - (a.id === sugerido));
  const escolher = (tema) => dispatch({ tipo: "campo", secao: "visual", campo: "tema", valor: tema });
  const custom = visual.tema === "custom";

  // Perfil: "" = automático (o da especialidade). Mostramos o automático já marcado.
  const perfilAuto = esp ? esp.perfil : "profissional";
  const perfilAtual = visual.perfil || perfilAuto;
  const opcoesPerfil = perfis.map((p) => (p.valor === perfilAuto ? { ...p, rotulo: `${p.rotulo} · ${T.perfilAuto}` } : p));

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

        <label className={`etapa-visual__tema ${custom ? "etapa-visual__tema--ativo" : ""}`}>
          <input type="radio" name="tema" value="custom" checked={custom} onChange={() => escolher("custom")} />
          <Miniatura tema={temaParaMiniatura(visual.cor)} nomeNegocio={nomeNegocio} />
          <span className="etapa-visual__rotulo">
            <span><strong>{T.custom.rotulo}</strong><small>{T.custom.descricao}</small></span>
            {custom ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : <Palette size={18} aria-hidden="true" />}
          </span>
        </label>

        <label className={`etapa-visual__tema etapa-visual__auto ${!visual.tema ? "etapa-visual__tema--ativo" : ""}`}>
          <input type="radio" name="tema" value="" checked={!visual.tema} onChange={() => escolher("")} />
          <Sparkles size={22} aria-hidden="true" />
          <span className="etapa-visual__rotulo">
            <span><strong>{T.automatico.rotulo}</strong><small>{T.automatico.descricao}</small></span>
          </span>
        </label>
      </fieldset>

      {custom && <PainelCor cor={visual.cor} dispatch={dispatch} erros={erros} />}

      <div className="etapa-visual__perfil">
        <Opcoes
          nome="perfil" legenda={T.perfilTitulo} opcoes={opcoesPerfil} valor={perfilAtual}
          onChange={(valor) => dispatch({ tipo: "campo", secao: "visual", campo: "perfil", valor: valor === perfilAuto ? "" : valor })}
        />
        <p className="campo__dica">{T.perfilHint}</p>
      </div>

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
