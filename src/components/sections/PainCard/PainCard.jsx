import { Reveal } from "../../ui/Reveal/Reveal";
import { Card } from "../../ui/Card/Card";
import "./PainCard.css";

export function PainCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <Reveal y={30} delay={delay}>
      <Card className="pain-card">
        <span className="pain-card__icon"><Icon size={24} /></span>
        <h3 className="pain-card__title">{title}</h3>
        <p className="pain-card__desc">{description}</p>
      </Card>
    </Reveal>
  );
}
