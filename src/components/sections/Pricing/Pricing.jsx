import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { PricingCard } from "../PricingCard/PricingCard";
import { plans, pricingNote } from "../../../data/content";
import "./Pricing.css";

export function Pricing() {
  return (
    <section id="planos" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Planos e preços"
          title="Escolha o plano"
          highlight="do seu jeito"
          subtitle="Preço simples, sem letra miúda."
        />
        <div className="pricing__grid">
          {plans.map((plan, i) => <PricingCard key={plan.name} {...plan} delay={i * 0.1} />)}
        </div>
        <div className="pricing__note">
          <p><strong>{pricingNote.addOn.highlight}</strong> {pricingNote.addOn.text}</p>
          <p><strong>{pricingNote.loyalty.highlight}</strong> {pricingNote.loyalty.text}</p>
        </div>
      </div>
    </section>
  );
}
