"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markOpened } from "@/lib/opening";

const SEEN_KEY = "cs_opening_seen";

/*
  Opening curtain: the mark on black, a 0→100 counter, then the curtain
  lifts. Plays once per browser session; "Skip" cuts straight to the site.
*/
export default function Opening() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      let seen = false;
      try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
        document.documentElement.style.overflow = "";
        markOpened();
        setGone(true);
      };

      if (seen || reduce) {
        finish();
        return;
      }

      document.documentElement.style.overflow = "hidden";
      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-count]")!;

      tl.current = gsap
        .timeline({ onComplete: finish })
        .from("[data-mark] > span", { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "expo.out" })
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
        }, 0.2)
        .to("[data-bar]", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.2)
        .to("[data-mark] > span", { yPercent: -110, duration: 0.6, stagger: 0.04, ease: "expo.in" }, ">-0.05")
        .add(() => markOpened(), ">-0.2")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "<");
    },
    { scope: root }
  );

  const skip = () => {
    if (!tl.current) return;
    tl.current.progress(1);
  };

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col bg-ink text-cream"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="flex flex-1 items-center justify-center">
        <div data-mark className="flex overflow-hidden font-display text-5xl uppercase leading-none md:text-7xl">
          {"CASTLE".split("").map((c, i) => (
            <span key={i} className="inline-block">{c}</span>
          ))}
          <span className="ml-3 inline-block border-l border-cream/30 pl-3 text-signal">CS</span>
        </div>
      </div>
      <div className="flex items-end justify-between px-4 pb-5 font-mono text-[11px] uppercase tracking-[0.2em] md:px-8 md:pb-8">
        <span className="text-bone">
          <span data-count>000</span> / 100
        </span>
        <button onClick={skip} className="min-h-[44px] px-2 text-cream/70 hover:text-cream">
          Skip →
        </button>
      </div>
      <span data-bar className="block h-px origin-left scale-x-0 bg-signal" />
    </div>
  );
}
