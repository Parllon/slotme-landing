import { Check, Star, MessageCircle } from "lucide-react";
import { Reveal } from "../../ui/Reveal/Reveal";
import { Button } from "../../ui/Button/Button";
import { whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./PricingCard.css";

export function PricingCard({ name, price, features, popular = false, delay = 0 }) {
  const waUrl = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(`Oi! Quero contratar o plano ${name} do SlotMe`)}`;

  return (
    <Reveal y={30} delay={delay}>
      <div className={`pricing-card ${popular ? "pricing-card--featured" : ""}`}>
        {popular && (
          <span className="pricing-card__ribbon">
            <Star size={14} /> Recomendado
          </span>
        )}
        <h3 className="pricing-card__name">{name}</h3>
        <div className="pricing-card__price">
          <span className="pricing-card__value">{price}</span>
          <span className="pricing-card__cycle">/mês</span>
        </div>
        <ul className="pricing-card__list">
          {features.map((f) => (
            <li key={f}><Check size={18} /> {f}</li>
          ))}
        </ul>
        <Button
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant={popular ? "primary" : "outline"}
          block
          onClick={() => trackLpEvent("lp_clicou_whatsapp")}
        >
          Quero o {name}
          <MessageCircle size={18} />
        </Button>
      </div>
    </Reveal>
  );
}
