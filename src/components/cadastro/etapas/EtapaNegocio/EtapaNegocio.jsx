import { Link2 } from "lucide-react";
import { cadastroConfig, especialidades, negocioTextos as T } from "../../../../data/cadastro";
import { slugify } from "../../../../lib/cadastro/formatos";
import { Campo, ariaCampo } from "../../ui/Campo/Campo";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import "./EtapaNegocio.css";

export function EtapaNegocio({ estado, dispatch, erros }) {
  const { negocio } = estado;
  const set = (campo) => (valor) => dispatch({ tipo: "campo", secao: "negocio", campo, valor });
  const slug = slugify(negocio.nome);

  return (
    <div className="etapa-negocio">
      <Campo id="neg-nome" label={T.nome.label} erro={erros["negocio.nome"]}>
        <input
          className="cad-input" type="text" autoComplete="organization" autoCapitalize="words"
          placeholder={T.nome.placeholder} value={negocio.nome}
          onChange={(e) => set("nome")(e.target.value)}
          {...ariaCampo("neg-nome", erros["negocio.nome"])}
        />
        {slug && (
          <div className="etapa-negocio__link" aria-live="polite">
            <Link2 size={16} aria-hidden="true" />
            <span>
              {T.linkPreview} <strong>{slug}.{cadastroConfig.dominioPaginas}</strong>
              <small>{T.linkNota}</small>
            </span>
          </div>
        )}
      </Campo>

      <Opcoes
        nome="especialidade" legenda={T.especialidade.label} variante="cartao" colunas={2}
        opcoes={especialidades.map((e) => ({ valor: e.valor, rotulo: e.rotulo }))}
        valor={negocio.especialidade} onChange={set("especialidade")}
        erro={erros["negocio.especialidade"]} idErro="neg-especialidade-erro"
      />

      <div className="etapa-negocio__linha">
        <Campo id="neg-cidade" label={T.cidade.label} erro={erros["negocio.cidade"]}>
          <input
            className="cad-input" type="text" autoComplete="address-level2" autoCapitalize="words"
            placeholder={T.cidade.placeholder} value={negocio.cidade}
            onChange={(e) => set("cidade")(e.target.value)}
            {...ariaCampo("neg-cidade", erros["negocio.cidade"])}
          />
        </Campo>
        <Campo id="neg-bairro" label={T.bairro.label}>
          <input
            className="cad-input" type="text" autoComplete="address-level3" autoCapitalize="words"
            placeholder={T.bairro.placeholder} value={negocio.bairro}
            onChange={(e) => set("bairro")(e.target.value)} id="neg-bairro"
          />
        </Campo>
      </div>

      <Campo id="neg-instagram" label={T.instagram.label}>
        <input
          className="cad-input" type="text" autoCapitalize="none" spellCheck={false}
          placeholder={T.instagram.placeholder} value={negocio.instagram}
          onChange={(e) => set("instagram")(e.target.value)} id="neg-instagram"
        />
      </Campo>
    </div>
  );
}
