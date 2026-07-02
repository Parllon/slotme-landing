import { ExternalLink } from "lucide-react";
import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { PhoneFrame } from "../../ui/PhoneFrame/PhoneFrame";
import { Reveal } from "../../ui/Reveal/Reveal";
import { clients } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./Clients.css";

export function Clients() {
  return (
    <section className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Clientes reais"
          title="Salões e barbearias que já"
          highlight="usam o SlotMe"
          subtitle="Negócios reais, com página de agendamento no ar hoje. Clique na tela pra visitar."
        />
        <div className="clients__grid">
          {clients.map((c, i) => (
            <Reveal key={c.name} y={30} delay={i * 0.1} className="clients__item">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="clients__shot"
                onClick={() => trackLpEvent("lp_clicou_cliente")}
              >
                <PhoneFrame src={c.image} alt={`Página de agendamento de ${c.name}`} />
              </a>
              <span className="clients__service">{c.service}</span>
              <h3 className="clients__name">{c.name}</h3>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="clients__link"
                onClick={() => trackLpEvent("lp_clicou_cliente")}
              >
                Ver página de agendamento
                <ExternalLink size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
