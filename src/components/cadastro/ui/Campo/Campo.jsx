import "./Campo.css";

/** Ids padronizados para ligar rótulo, dica e erro ao campo (acessibilidade). */
export function ariaCampo(id, erro, hint) {
  const desc = [hint ? `${id}-dica` : null, erro ? `${id}-erro` : null].filter(Boolean).join(" ");
  return { id, "aria-invalid": erro ? "true" : undefined, "aria-describedby": desc || undefined };
}

/** Rótulo + campo + dica + mensagem de erro (embaixo do campo, nunca em alert). */
export function Campo({ id, label, hint, erro, children, className = "" }) {
  return (
    <div className={`campo ${erro ? "campo--erro" : ""} ${className}`}>
      {label && <label className="campo__label" htmlFor={id}>{label}</label>}
      {children}
      {hint && <p className="campo__dica" id={`${id}-dica`}>{hint}</p>}
      {erro && <p className="campo__erro" id={`${id}-erro`} role="alert">{erro}</p>}
    </div>
  );
}

/** Mensagem de erro solta (para grupos: "adicione pelo menos um serviço"). */
export function ErroGrupo({ id, children }) {
  if (!children) return null;
  return <p className="campo__erro campo__erro--grupo" id={id} role="alert">{children}</p>;
}
