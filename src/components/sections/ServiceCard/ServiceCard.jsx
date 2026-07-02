import { Reveal } from "../../ui/Reveal/Reveal";
import { Card } from "../../ui/Card/Card";
import "./ServiceCard.css";

export function ServiceCard({ icon: Icon, title, description, bonus = false, delay = 0 }) {
  return (
    <Reveal y={30} delay={delay}>
      <Card className="service-card">
        {bonus && <span className="service-card__badge">Bônus</span>}
        <span className="service-card__icon"><Icon size={24} /></span>
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{description}</p>
      </Card>
    </Reveal>
  );
}
