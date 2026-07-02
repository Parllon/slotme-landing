import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { services } from "../../../data/content";
import "./Services.css";

export function Services() {
  return (
    <section id="recursos" className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Recursos"
          title="Tudo que o seu salão ou barbearia"
          highlight="precisa pra agendar melhor"
        />
        <div className="services__grid">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}
