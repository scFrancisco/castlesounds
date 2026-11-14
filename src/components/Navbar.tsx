"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const navLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Sound", href: "#sound", index: "02" },
  { label: "Dates", href: "#events", index: "03" },
  { label: "Gallery", href: "#gallery", index: "04" },
  { label: "Booking", href: "#booking", index: "05" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  // Live Lisbon clock — small editorial detail in the bar
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Lisbon",
      }).format(new Date());
    const tick = () => setTime(fmt());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-cream"
      >
        <div className="flex items-start justify-between px-4 py-4 md:px-8 md:py-6">
          <a href="#" className="font-display text-xl uppercase leading-none tracking-wide md:text-2xl">
            Castle<sup className="ml-0.5 font-mono text-[9px] tracking-normal">®</sup>
          </a>

          <ul className="hidden items-start gap-8 font-mono text-[11px] uppercase tracking-[0.18em] md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group flex gap-1.5 opacity-80 transition-opacity hover:opacity-100">
                  <span className="opacity-50">{l.index}</span>
                  <span className="relative">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] md:flex">
            <span className="opacity-60">LRA {time}</span>
            <a href="#booking" className="border-b border-current pb-0.5">
              Book ↗
            </a>
          </div>

          <button
            className="-mt-3 flex min-h-[44px] min-w-[44px] items-center justify-end font-mono text-[11px] uppercase tracking-[0.18em] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-signal px-4 py-4 text-ink md:hidden"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-xl uppercase leading-none">Castle</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-start justify-end font-mono text-[11px] uppercase tracking-[0.18em]"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <ul className="mt-auto mb-10 flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
                  className="border-t border-ink/20"
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between py-2"
                  >
                    <span className="font-display text-[15vw] uppercase leading-[0.95]">{l.label}</span>
                    <span className="font-mono text-xs">{l.index}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
