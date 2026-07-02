import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { StepCard } from "../StepCard/StepCard";
import { howItWorks } from "../../../data/content";
import "./HowItWorks.css";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Como funciona"
          title="Três passos, do agendamento"
          highlight="ao lembrete"
          subtitle="Simples pra você e simples pro seu cliente — sem ninguém precisar aprender nada."
        />
        <div className="how-it-works__grid">
          {howItWorks.map((step, i) => <StepCard key={step.title} {...step} number={i + 1} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}
