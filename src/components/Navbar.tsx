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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-['Orbitron'] font-black text-xl tracking-widest neon-text text-[#b06dff]">
          CASTLE<span className="text-white">SOUNDS</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-['Space_Grotesk'] text-xs tracking-[0.2em] text-[#6b6b8a] hover:text-[#b06dff] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-4 px-5 py-2 text-xs tracking-[0.15em] font-['Space_Grotesk'] font-medium border border-[#b06dff]/60 text-[#b06dff] hover:bg-[#b06dff]/10 hover:shadow-neon transition-all duration-300 rounded-sm"
          >
            BOOK NOW
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#b06dff] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-[#b06dff] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#b06dff] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-['Space_Grotesk'] text-sm tracking-[0.2em] text-[#6b6b8a] hover:text-[#b06dff] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
