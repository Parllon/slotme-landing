import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import "./FaqItem.css";

export function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button className="faq-item__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-item__q">{question}</span>
        <ChevronDown className="faq-item__icon" size={20} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="faq-item__a">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
