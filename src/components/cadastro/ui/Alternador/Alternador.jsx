import "./Alternador.css";

/** Liga/desliga com checkbox real por baixo (o toggle do painel antigo não era acessível). */
export function Alternador({ id, label, hint, checked, onChange, compacto = false }) {
  return (
    <label className={`alternador ${compacto ? "alternador--compacto" : ""}`} htmlFor={id}>
      <span className="alternador__texto">
        <span className="alternador__label">{label}</span>
        {hint && <span className="alternador__dica">{hint}</span>}
      </span>
      <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="alternador__trilho" aria-hidden="true"><span className="alternador__bola" /></span>
    </label>
  );
}

/** Caixa de marcação com texto longo (aceites). */
export function Caixa({ id, checked, onChange, erro, children }) {
  return (
    <div className={`caixa ${erro ? "caixa--erro" : ""}`}>
      <label className="caixa__linha" htmlFor={id}>
        <input
          id={id} type="checkbox" checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={erro ? "true" : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
        />
        <span className="caixa__texto">{children}</span>
      </label>
      {erro && <p className="campo__erro" id={`${id}-erro`} role="alert">{erro}</p>}
    </div>
  );
}
