import { Reveal } from "../../ui/Reveal/Reveal";
import "./StepCard.css";

export function StepCard({ number, title, description, isLast = false, delay = 0 }) {
  return (
    <Reveal y={30} delay={delay} className="step-card">
      <div className="step-card__rail">
        <span className="step-card__number">{number}</span>
        {!isLast && <span className="step-card__connector" aria-hidden="true" />}
      </div>
      <div className="step-card__body">
        <h3 className="step-card__title">{title}</h3>
        <p className="step-card__desc">{description}</p>
      </div>
    </Reveal>
  );
}
