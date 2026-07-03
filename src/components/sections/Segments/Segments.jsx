import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { Reveal } from "../../ui/Reveal/Reveal";
import { segmentsData } from "../../../data/content";
import "./Segments.css";

export function Segments() {
  return (
    <section className="section segments">
      <div className="container-x">
        <SectionHeader
          eyebrow="Feito pra quem trabalha com horário marcado"
          title="Salões e barbearias de"
          highlight="todo tipo de serviço"
        />
        <div className="segments__grid">
          {segmentsData.map(({ name, image }, i) => (
            <Reveal key={name} y={24} delay={(i % 3) * 0.07} className="segments__card">
              <img src={image} alt={name} loading="lazy" className="segments__photo" />
              <span className="segments__label">{name}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
