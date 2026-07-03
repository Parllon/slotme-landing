import { Calendar, Check } from "lucide-react";
import { Reveal } from "../../ui/Reveal/Reveal";
import { differential } from "../../../data/content";
import "./Differential.css";

export function Differential() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="differential">
          <Reveal>
            <span className="differential__eyebrow">{differential.eyebrow}</span>
            <h2 className="differential__title">{differential.title}</h2>
            <p className="differential__subtitle">{differential.subtitle}</p>
            <ul className="differential__bullets">
              {differential.bullets.map((b) => (
                <li key={b}>
                  <span className="differential__check"><Check size={14} /></span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="differential__visual">
            <div className="differential__panel" aria-hidden="true">
              <div className="differential__panel-header">
                <Calendar size={18} className="differential__panel-icon" />
                {differential.panel.title}
                <span className="differential__panel-dot" />
              </div>
              {differential.panel.events.map((ev) => (
                <div key={ev.title} className="differential__event">
                  <span className={`differential__event-bar differential__event-bar--${ev.tone}`} />
                  <div>
                    <div className="differential__event-title">{ev.title}</div>
                    <div className="differential__event-sub">{ev.sub}</div>
                  </div>
                </div>
              ))}
              <p className="differential__panel-note">
                <span className="differential__panel-note-dot" />
                {differential.panel.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
