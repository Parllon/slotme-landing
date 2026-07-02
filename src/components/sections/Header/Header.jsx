import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "../../ui/Logo/Logo";
import { Button } from "../../ui/Button/Button";
import { navLinks, whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./Header.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const waUrl = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container-x header__inner">
        <Logo onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }} />

        <nav className="header__nav" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="header__link">{l.label}</a>
          ))}
        </nav>

        <div className="header__cta">
          <Button href={waUrl} target="_blank" rel="noopener noreferrer" variant="outline" onClick={() => trackLpEvent("lp_clicou_whatsapp")}>
            Fale comigo
            <MessageCircle size={18} />
          </Button>
        </div>

        <button
          className="header__burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="header__mobile" aria-label="Navegação mobile">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="header__link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Button href={waUrl} target="_blank" rel="noopener noreferrer" block onClick={() => trackLpEvent("lp_clicou_whatsapp")}>
            Fale comigo no WhatsApp
          </Button>
        </nav>
      )}
    </header>
  );
}
