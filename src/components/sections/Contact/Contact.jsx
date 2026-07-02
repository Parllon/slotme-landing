import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "../../ui/Button/Button";
import { Reveal } from "../../ui/Reveal/Reveal";
import { ctaFinal, whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./Contact.css";

export function Contact() {
  const [form, setForm] = useState({ nome: "", salao: "", telefone: "" });
  const waUrl = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const mensagem =
      `Oi! Meu nome é ${form.nome}, tenho o salão/barbearia ${form.salao}` +
      ` e quero saber mais sobre o SlotMe. Meu telefone: ${form.telefone}`;
    trackLpEvent("lp_enviou_formulario");
    window.open(`https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
  }

  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="cta-final">
          <div className="cta-final__grid">
            <div>
              <h2>{ctaFinal.title}</h2>
              <p className="cta-final__lead">{ctaFinal.subtitle}</p>
              <Button href={waUrl} target="_blank" rel="noopener noreferrer" variant="outline" onClick={() => trackLpEvent("lp_clicou_whatsapp")}>
                Fale comigo no WhatsApp
                <MessageCircle size={18} />
              </Button>
            </div>

            <form className="cta-final__form" onSubmit={handleSubmit}>
              <label>
                Seu nome
                <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Como podemos te chamar" required />
              </label>
              <label>
                Nome do salão ou barbearia
                <input type="text" name="salao" value={form.salao} onChange={handleChange} placeholder="Nome do seu negócio" required />
              </label>
              <label>
                Telefone
                <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(21) 9XXXX-XXXX" required />
              </label>
              <Button type="submit" block>Quero receber contato</Button>
              <p className="cta-final__form-note">{ctaFinal.formNote}</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
