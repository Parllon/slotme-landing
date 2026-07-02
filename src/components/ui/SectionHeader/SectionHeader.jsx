import { Reveal } from "../Reveal/Reveal";
import "./SectionHeader.css";

/** Título de seção: eyebrow + title com <span> highlight + subtitle. */
export function SectionHeader({ eyebrow, title, highlight, subtitle, align = "center" }) {
  return (
    <Reveal className={`section-header section-header--${align}`}>
      {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
      <h2 className="section-header__title">
        {title} {highlight && <span className="section-header__highlight">{highlight}</span>}
      </h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </Reveal>
  );
}
