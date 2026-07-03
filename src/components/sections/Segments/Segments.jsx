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
        <Reveal delay={0.1} className="segments__chips">
          {segmentsData.map((name) => (
            <span key={name} className="segments__chip">
              <span className="segments__dot" aria-hidden="true" />
              {name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
