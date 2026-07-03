import { motion } from "motion/react";
import { Calendar, Check, MessageCircle } from "lucide-react";
import { Button } from "../../ui/Button/Button";
import { FlowCarousel } from "../FlowCarousel/FlowCarousel";
import { hero, whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./Hero.css";

export function Hero() {
  const waUrl = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent("Oi! Quero testar o SlotMe")}`;

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container-x hero__grid">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="hero__eyebrow">
            <Calendar size={16} />
            {hero.eyebrow}
          </span>
          <h1 id="hero-title" className="hero__title">
            {hero.title} <span className="hero__title-accent">{hero.highlight}</span>{hero.titleEnd}
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <div className="hero__actions">
            <Button href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackLpEvent("lp_clicou_whatsapp")}>
              Quero testar
              <MessageCircle size={18} />
            </Button>
            <Button href="#como-funciona" variant="outline">Ver como funciona</Button>
          </div>
          <p className="hero__note">
            <Check size={18} />
            {hero.note}
          </p>
        </motion.div>

        <motion.div className="hero__carousel-col" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <FlowCarousel />
        </motion.div>
      </div>
    </section>
  );
}
