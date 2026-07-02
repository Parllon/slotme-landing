import { Check } from "lucide-react";
import { Reveal } from "../../ui/Reveal/Reveal";
import { differential } from "../../../data/content";
import "./Differential.css";

export function Differential() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="differential">
          <div>
            <span className="differential__eyebrow">{differential.eyebrow}</span>
            <h2 className="differential__title">{differential.title}</h2>
            <p className="differential__subtitle">{differential.subtitle}</p>
            <ul className="differential__bullets">
              {differential.bullets.map((b) => (
                <li key={b}><Check size={20} /> {b}</li>
              ))}
            </ul>
          </div>

          <div className="differential__card">
            {differential.card.map(({ icon: Icon, ok, title, text }) => (
              <div key={title} className="differential__row">
                <Icon size={20} className={ok ? "is-ok" : "is-not"} />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
