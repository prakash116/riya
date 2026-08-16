"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise as the block scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 34,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as as "div"] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden slot and
 * slides up, which reads far more "editorial" than a plain fade.
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  play = "inView",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  play?: "inView" | "mount";
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const animateProps =
    play === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <motion.span
      className={`text-reveal ${className}`}
      initial="hidden"
      {...animateProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span className="text-reveal__slot" key={`${word}-${index}`} aria-hidden>
          <motion.span
            className="text-reveal__word"
            variants={{
              hidden: { y: "108%" },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.78, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Button/element that leans toward the cursor. No-ops on touch devices. */
export function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const active = enabled && !reduceMotion;

  function handleMove(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={active ? ({ x, y } as MotionStyle) : undefined}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Seamless horizontal marquee. Children are rendered twice for the loop. */
export function Marquee({
  children,
  speed = 26,
  className = "",
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const from = reverse ? "-50%" : "0%";
  const to = reverse ? "0%" : "-50%";

  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee__track"
        animate={reduceMotion ? undefined : { x: [from, to] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
