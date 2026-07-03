import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Reveal } from "../../ui/Reveal/Reveal";
import { ctaFinal, whatsapp } from "../../../data/content";
import { trackLpEvent } from "../../../lib/track";
import "./Contact.css";

const INITIAL = { nome: "", salao: "", telefone: "" };

export function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const waUrl = `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ctaFinal.web3formsKey,
          subject: `Novo lead do site SlotMe — ${form.nome} (${form.salao})`,
          from_name: "Site SlotMe",
          nome: form.nome,
          salao: form.salao,
          telefone: form.telefone,
        }),
      });
      const data = await response.json();

      if (data.success) {
        trackLpEvent("lp_enviou_formulario");
        setStatus("success");
        setForm(INITIAL);
      } else {
        throw new Error(data.message || "Falha no envio");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section cta-final">
      <div className="cta-final__bg" aria-hidden="true" />
      <Reveal className="cta-final__inner">
        <h2 className="cta-final__title">{ctaFinal.title}</h2>
        <p className="cta-final__subtitle">{ctaFinal.subtitle}</p>

        <form className="cta-final__form" onSubmit={handleSubmit}>
          <input
            type="text" name="nome" value={form.nome} onChange={handleChange}
            placeholder="Seu nome" aria-label="Seu nome" className="cta-final__input" required
          />
          <input
            type="text" name="salao" value={form.salao} onChange={handleChange}
            placeholder="Nome do salão ou barbearia" aria-label="Nome do salão ou barbearia" className="cta-final__input" required
          />
          <input
            type="tel" name="telefone" value={form.telefone} onChange={handleChange}
            placeholder="Telefone — (21) 9XXXX-XXXX" aria-label="Telefone" className="cta-final__input" required
          />
          <button type="submit" className="cta-final__btn" disabled={submitting}>
            {submitting ? "Enviando..." : "Quero receber contato"}
            <Send size={18} />
          </button>
        </form>

        {status === "success" && (
          <p className="cta-final__status cta-final__status--success" role="status">
            {ctaFinal.formSuccess}
          </p>
        )}
        {status === "error" && (
          <p className="cta-final__status cta-final__status--error" role="alert">
            {ctaFinal.formError}
          </p>
        )}

        <p className="cta-final__note">{ctaFinal.formNote}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-final__wa-link"
          onClick={() => trackLpEvent("lp_clicou_whatsapp")}
        >
          <MessageCircle size={16} />
          ou fale direto comigo no WhatsApp →
        </a>
      </Reveal>
    </section>
  );
}
