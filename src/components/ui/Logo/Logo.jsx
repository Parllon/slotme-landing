import { brand } from "../../../data/content";
import "./Logo.css";

/** Marca do SlotMe: emblema "agenda confirmada" (bloco de calendário + check) + nome.
    A cor dos pinos vem de --logo-pin (navy no header claro, clara no footer navy). */
export function Logo({ showText = true, onClick }) {
  return (
    <div className={`logo ${onClick ? "logo--clickable" : ""}`} onClick={onClick} role={onClick ? "button" : undefined}>
      <svg className="logo__mark" viewBox="0 0 52 52" width="34" height="34" aria-hidden="true">
        <rect x="2" y="6" width="48" height="44" rx="12" fill="#f2717f" />
        <rect className="logo__pin" x="12" y="2" width="4" height="10" rx="2" />
        <rect className="logo__pin" x="36" y="2" width="4" height="10" rx="2" />
        <path d="M16 28 l7 7 l14 -14" fill="none" stroke="#f5f7fb" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showText && <span className="logo__name">{brand.name}</span>}
    </div>
  );
}
