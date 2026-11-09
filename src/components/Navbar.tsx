"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "ABOUT", href: "#about" },
  { label: "SOUND", href: "#sound" },
  { label: "EVENTS", href: "#events" },
  { label: "BOOKING", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav border-b border-[#C8A050]/8 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-['Cinzel'] font-black text-lg tracking-[0.12em] text-[#C8A050]">
          CASTLE<span className="text-[#EEE8DF]/90">SOUNDS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-['Space_Grotesk'] text-xs tracking-[0.2em] text-[#726E6A] hover:text-[#EEE8DF] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-4 px-5 py-2 text-xs tracking-[0.12em] font-['Space_Grotesk'] font-medium border border-[#C8A050]/40 text-[#C8A050] hover:bg-[#C8A050]/10 transition-all duration-200 rounded-sm"
          >
            BOOK NOW
          </a>
        </div>

        <button
          className="md:hidden p-3 -mr-2 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#EEE8DF] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#EEE8DF] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#EEE8DF] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-nav border-t border-[#EEE8DF]/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-['Space_Grotesk'] text-sm tracking-[0.15em] text-[#726E6A] hover:text-[#EEE8DF] transition-colors min-h-[44px] flex items-center"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="font-['Space_Grotesk'] text-sm tracking-[0.12em] text-[#C8A050] border-t border-[#EEE8DF]/5 pt-5 min-h-[44px] flex items-center"
              >
                BOOK NOW →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
