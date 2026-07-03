import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { PhoneFrame } from "../../ui/PhoneFrame/PhoneFrame";
import { Reveal } from "../../ui/Reveal/Reveal";
import { themeComparison } from "../../../data/content";
import "./Personalization.css";

export function Personalization() {
  return (
    <section className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Landing page personalizada"
          title="Cada salão, com a"
          highlight="cara do salão"
          subtitle="No plano Completo, a sua página de agendamento não usa um layout genérico — as cores, fontes e fotos são pensadas pro seu negócio. Estas são páginas reais de clientes SlotMe."
        />
        <div className="personalization__grid">
          {themeComparison.map((t, i) => (
            <Reveal key={t.name} y={30} delay={i * 0.12} className="personalization__item">
              <PhoneFrame src={t.image} alt={`Página de agendamento personalizada de ${t.name}`} />
              <span className="personalization__name">{t.name}</span>
              <span className="personalization__vibe">{t.vibe}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
