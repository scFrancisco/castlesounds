"use client";
import { motion } from "framer-motion";

const socials = [
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "SoundCloud", href: "#", icon: "SC" },
  { label: "Spotify", href: "#", icon: "SP" },
  { label: "YouTube", href: "#", icon: "YT" },
];

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5 overflow-hidden">
      <div className="orb w-[300px] h-[200px] bg-[#b06dff]/5 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <p className="font-['Orbitron'] font-black text-2xl tracking-widest neon-text text-[#b06dff]">
              CASTLE<span className="text-white">SOUNDS</span>
            </p>
            <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a] mt-1 tracking-widest">
              LEIRIA, PORTUGAL
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-8">
            {["ABOUT", "SOUND", "EVENTS", "BOOKING"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-['Space_Grotesk'] text-[10px] tracking-[0.2em] text-[#6b6b8a] hover:text-[#b06dff] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={s.label}
                className="w-9 h-9 glass border border-white/10 hover:border-[#b06dff]/40 rounded-lg flex items-center justify-center font-['Orbitron'] text-[9px] text-[#6b6b8a] hover:text-[#b06dff] transition-all duration-200"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">
            © {new Date().getFullYear()} CastleSounds. All rights reserved.
          </p>
          <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">
            <a href="mailto:booking@castlesounds.pt" className="hover:text-[#b06dff] transition-colors">
              booking@castlesounds.pt
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
