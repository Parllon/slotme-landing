import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { PainCard } from "../PainCard/PainCard";
import { painPoints } from "../../../data/content";
import "./PainPoints.css";

export function PainPoints() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Você se identifica?"
          title="Se algum desses problemas te soa familiar,"
          highlight="o SlotMe foi feito pra você"
        />
        <div className="pain-points__grid">
          {painPoints.map((p, i) => <PainCard key={p.title} {...p} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}
