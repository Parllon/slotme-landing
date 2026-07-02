import { Reveal } from "../../ui/Reveal/Reveal";
import "./StepCard.css";

export function StepCard({ number, title, description, delay = 0 }) {
  return (
    <Reveal y={30} delay={delay} className="step-card">
      <span className="step-card__number">{number}</span>
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__desc">{description}</p>
    </Reveal>
  );
}
