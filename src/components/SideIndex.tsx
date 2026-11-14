"use client";
import { useEffect, useState } from "react";
import { navLinks } from "@/components/Navbar";

/*
  Fixed vertical index on the right edge (desktop): "02 / 05 · Sound".
  The label cross-fades as each section takes the middle of the screen.
*/
export default function SideIndex() {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const targets = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(targets.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    targets.forEach((t) => io.observe(t));

    // back above the first section → home
    const onScroll = () => {
      if (targets[0] && targets[0].getBoundingClientRect().top > window.innerHeight / 2) setCurrent(-1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const total = String(navLinks.length).padStart(2, "0");
  const label = current < 0 ? "Home" : navLinks[current].label;
  const index = current < 0 ? "00" : navLinks[current].index;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference md:block"
    >
      <div className="flex origin-center rotate-90 items-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70">
        <span className="relative inline-block h-[1.2em] w-[2ch] overflow-hidden">
          <span key={index} className="absolute inset-0 animate-[indexIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">{index}</span>
        </span>
        <span className="text-cream/40">/ {total}</span>
        <span className="h-px w-6 bg-cream/40" />
        <span className="relative inline-block h-[1.2em] w-[9ch] overflow-hidden">
          <span key={label} className="absolute inset-0 animate-[indexIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">{label}</span>
        </span>
      </div>
    </div>
  );
}
