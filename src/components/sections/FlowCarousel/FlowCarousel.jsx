import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "../../ui/PhoneFrame/PhoneFrame";
import { flowSteps } from "../../../data/content";
import "./FlowCarousel.css";

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const SWIPE_THRESHOLD = 50;
const AUTOPLAY_MS = 3800;

/** Carrossel do fluxo real de agendamento — screenshots mobile de um cliente SlotMe. */
export function FlowCarousel() {
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const paginate = useCallback(
    (dir) => setState(([i]) => [(i + dir + flowSteps.length) % flowSteps.length, dir]),
    []
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, paginate]);

  const current = flowSteps[index];

  return (
    <div
      className="flow-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flow-carousel__stage">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset, velocity }) => {
              const power = offset.x + velocity.x * 0.3;
              if (power < -SWIPE_THRESHOLD) paginate(1);
              else if (power > SWIPE_THRESHOLD) paginate(-1);
            }}
          >
            <PhoneFrame src={current.image} alt={`Passo ${index + 1} do agendamento: ${current.step}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flow-carousel__controls">
        <button className="flow-carousel__nav" aria-label="Passo anterior" onClick={() => paginate(-1)}>
          <ChevronLeft size={18} />
        </button>
        <div className="flow-carousel__dots">
          {flowSteps.map((s, i) => (
            <button
              key={s.step}
              className={`flow-carousel__dot ${i === index ? "is-active" : ""}`}
              aria-label={`Ir para o passo ${i + 1}`}
              onClick={() => setState([i, i > index ? 1 : -1])}
            />
          ))}
        </div>
        <button className="flow-carousel__nav" aria-label="Próximo passo" onClick={() => paginate(1)}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flow-carousel__caption">
        <span className="flow-carousel__step">{current.step}</span>
        <p className="flow-carousel__text">{current.caption}</p>
      </div>
    </div>
  );
}
