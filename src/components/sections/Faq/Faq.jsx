import { useState } from "react";
import { SectionHeader } from "../../ui/SectionHeader/SectionHeader";
import { FaqItem } from "../FaqItem/FaqItem";
import { faqData } from "../../../data/content";
import "./Faq.css";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="section section--surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Dúvidas frequentes"
          title="Perguntas que a gente"
          highlight="mais recebe"
        />
        <div className="faq__list">
          {faqData.map((item, i) => (
            <FaqItem
              key={item.question}
              {...item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
