"use client";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades/slides children in once when they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const M = as === "li" ? motion.li : motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </M>
  );
}

/** Large headline whose line slides up from behind a mask.
    The visible outer span is observed; the inner span animates. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="block overflow-hidden"
    >
      <motion.span
        variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
        transition={{ duration: 1, delay, ease }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Section header: "(02) — Sound" style index + rule. */
export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
      <span className="text-signal">({index})</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-cream/10" />
    </div>
  );
}

/** Text whose letters roll up on hover of the closest `.roll-host`. */
export function RollText({ text }: { text: string }) {
  return (
    <span className="roll" aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden
          data-c={c === " " ? " " : c}
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}
