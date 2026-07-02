import { MessageCircle } from "lucide-react";
import { whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./FloatingWhatsApp.css";

export function FloatingWhatsApp() {
  const url = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="floating-wpp" aria-label="Falar no WhatsApp" onClick={() => trackLpEvent("lp_clicou_whatsapp")}>
      <MessageCircle className="floating-wpp__icon" />
      <span className="floating-wpp__tooltip">Fale comigo no WhatsApp</span>
    </a>
  );
}
