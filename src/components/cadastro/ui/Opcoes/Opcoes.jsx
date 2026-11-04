import { Check } from "lucide-react";
import "./Opcoes.css";

/**
 * Grupo de escolha com inputs reais (radio ou checkbox) — funciona no teclado
 * e em leitor de tela. variante: "chip" (pílulas) | "cartao" (cartões com detalhe).
 * multiplo: true = checkbox (valor é array); false = radio (valor é string).
 */
export function Opcoes({ nome, legenda, opcoes, valor, onChange, multiplo = false, variante = "chip", erro, idErro, colunas }) {
  const marcado = (v) => (multiplo ? valor.includes(v) : valor === v);
  const alternar = (v) => {
    if (!multiplo) return onChange(v);
    onChange(marcado(v) ? valor.filter((x) => x !== v) : [...valor, v]);
  };

  return (
    <fieldset
      className={`opcoes opcoes--${variante}`}
      aria-invalid={erro ? "true" : undefined}
      aria-describedby={erro ? idErro : undefined}
    >
      {legenda && <legend className="opcoes__legenda">{legenda}</legend>}
      <div className="opcoes__lista" style={colunas ? { "--colunas": colunas } : undefined}>
        {opcoes.map((op) => (
          <label key={op.valor} className={`opcoes__item ${marcado(op.valor) ? "opcoes__item--ativo" : ""}`}>
            <input
              type={multiplo ? "checkbox" : "radio"}
              name={nome}
              value={op.valor}
              checked={marcado(op.valor)}
              onChange={() => alternar(op.valor)}
            />
            {variante === "cartao" && <span className="opcoes__marca" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>}
            <span className="opcoes__texto">
              <span className="opcoes__rotulo">{op.rotulo}</span>
              {op.detalhe && <span className="opcoes__detalhe">{op.detalhe}</span>}
            </span>
            {op.selo && <span className="opcoes__selo">{op.selo}</span>}
          </label>
        ))}
      </div>
      {erro && <p className="campo__erro" id={idErro} role="alert">{erro}</p>}
    </fieldset>
  );
}
