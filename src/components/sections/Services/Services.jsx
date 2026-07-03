import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { Reveal } from "../../ui/Reveal/Reveal";
import { featureRows } from "../../../data/content";
import "./Services.css";

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
          {featureRows.map(({ icon: Icon, tag, title, description, image, imageAlt, placeholder }, i) => (
            <Reveal key={tag} y={30} className={`feature-row ${i % 2 === 1 ? "feature-row--reverse" : ""}`}>
              <div className="feature-row__text">
                <span className="feature-row__tag">
                  <Icon size={15} />
                  {tag}
                </span>
                <h3 className="feature-row__title">{title}</h3>
                <p className="feature-row__desc">{description}</p>
              </div>
              <div className="feature-row__visual">
                {image ? (
                  <div className="feature-row__shot">
                    <img src={image} alt={imageAlt} loading="lazy" />
                  </div>
                ) : (
                  <div className="feature-row__placeholder" aria-hidden="true">
                    <span>{placeholder}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
