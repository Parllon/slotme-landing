import { motion } from "motion/react";
import "./Reveal.css";

/**
 * Envolve qualquer conteúdo com animação de entrada via Framer Motion.
 * trigger="view" anima ao entrar na viewport (whileInView); "load" anima no carregamento.
 */
export function Reveal({
  children, as = "div",
  x = 0, y = 28, scale,
  delay = 0, duration = 0.6,
  once = true, trigger = "view",
  className = "", ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  const initial = { opacity: 0, x, y, ...(scale !== undefined ? { scale } : {}) };
  const target = { opacity: 1, x: 0, y: 0, scale: 1 };
  const anim = trigger === "load"
    ? { animate: target }
    : { whileInView: target, viewport: { once } };

  return (
    <MotionTag className={className} initial={initial} transition={{ duration, delay }} {...anim} {...rest}>
      {children}
    </MotionTag>
  );
}
