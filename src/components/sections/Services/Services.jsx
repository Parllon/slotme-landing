import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { Reveal } from "../../ui/Reveal/Reveal";
import { PhoneFrame } from "../../ui/PhoneFrame/PhoneFrame";
import { featureRows } from "../../../data/content";
import "./Services.css";

function FeatureVisual({ visual, image, imageAlt, chat, placeholder }) {
  if (visual === "phone") {
    return (
      <div className="feature-card__phone-wrap">
        <PhoneFrame src={image} alt={imageAlt} className="feature-card__phone" />
      </div>
    );
  }
  if (visual === "chat") {
    return (
      <div className="feature-card__chat">
        {chat.map(({ heading, body, time, side }) => (
          <div key={heading} className={`chat-bubble chat-bubble--${side}`}>
            <strong className="chat-bubble__heading">{heading}</strong>
            <p className="chat-bubble__body">
              {body.map((part, i) => (part.b ? <strong key={i}>{part.t}</strong> : part.t))}
            </p>
            <span className="chat-bubble__meta">{time} ✓✓</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="feature-card__placeholder" aria-hidden="true">
      <span>{placeholder}</span>
    </div>
  );
}

export function Services() {
  return (
    <section id="recursos" className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="O que você ganha"
          title="Tudo que o seu salão ou barbearia"
          highlight="precisa pra agendar melhor"
        />
        <div className="features">
          {featureRows.map(({ icon: Icon, tag, title, description, ...visualProps }, i) => (
            <Reveal key={tag} y={30} delay={(i % 2) * 0.08} className="feature-card">
              <div className="feature-card__head">
                <span className="feature-card__icon"><Icon size={20} /></span>
                <span className="feature-card__tag">{tag}</span>
              </div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{description}</p>
              <FeatureVisual {...visualProps} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
