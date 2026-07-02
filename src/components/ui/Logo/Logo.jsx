import { brand } from "../../../data/content";
import "./Logo.css";

/** Marca do SlotMe: emblema (S) + nome. */
export function Logo({ showText = true, onClick }) {
  return (
    <div className={`logo ${onClick ? "logo--clickable" : ""}`} onClick={onClick} role={onClick ? "button" : undefined}>
      <span className="logo__mark" aria-hidden="true">S</span>
      {showText && <span className="logo__name">{brand.name}</span>}
    </div>
  );
}
