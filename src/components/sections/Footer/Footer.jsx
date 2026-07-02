import { Logo } from "../../ui/Logo/Logo";
import { navLinks, brand, whatsapp, footerData } from "../../../data/content";
import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();
  const waUrl = `https://wa.me/${whatsapp.phone}`;

  return (
    <footer className="footer">
      <div className="container-x footer__grid">
        <div className="footer__brand">
          <Logo />
          <p className="footer__about">{footerData.about}</p>
        </div>

        <nav className="footer__col" aria-label="Links rápidos">
          <h4 className="footer__heading">Navegação</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h4 className="footer__heading">Contato</h4>
          <ul>
            <li><a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp comercial</a></li>
            <li><a href={`https://${brand.domain}/`} target="_blank" rel="noopener noreferrer">{brand.domain}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x footer__bottom">
        <span>&copy; {year} {brand.name}. Todos os direitos reservados.</span>
        <span>{footerData.cnpj}</span>
      </div>
    </footer>
  );
}
