"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** "100+" counts from 0 to 100 (keeping the "+") when it scrolls into view. */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);

  useGSAP(
    () => {
      if (!m || !el.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = parseFloat(m[2].replace(",", "."));
      const decimals = (m[2].split(/[.,]/)[1] ?? "").length;
      const o = { v: 0 };
      gsap.to(o, {
        v: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el.current, start: "top 90%", once: true },
        onUpdate: () => {
          if (el.current) el.current.textContent = `${m[1]}${o.v.toFixed(decimals)}${m[3]}`;
        },
      });
    },
    { dependencies: [value] }
  );

  return <span ref={el} className={className}>{value}</span>;
}
