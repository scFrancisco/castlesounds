"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "8+", label: "Years Behind the Decks" },
  { value: "150+", label: "Events Played" },
  { value: "4", label: "Resident Clubs" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[350px] h-[350px] bg-[#b06dff]/10 top-10 right-[-100px]" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-sm mx-auto">
            {/* Neon frame rings */}
            <div className="absolute inset-0 rounded-full border border-[#b06dff]/20 animate-pulse-slow scale-110" />
            <div className="absolute inset-0 rounded-full border border-[#00e5ff]/10 scale-125" />

            {/* Avatar placeholder */}
            <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center overflow-hidden border border-[#b06dff]/20">
              <div className="relative w-full h-full bg-gradient-to-br from-[#b06dff]/20 to-[#00e5ff]/10 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-30">
                  <circle cx="40" cy="30" r="18" stroke="#b06dff" strokeWidth="2" />
                  <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#b06dff" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="absolute bottom-6 font-['Orbitron'] text-xs tracking-widest text-[#b06dff]/60">PHOTO COMING SOON</span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass border border-[#b06dff]/30 px-4 py-3 rounded-xl shadow-neon"
            >
              <p className="font-['Orbitron'] text-xs text-[#b06dff] tracking-widest">DJ</p>
              <p className="font-['Space_Grotesk'] font-semibold text-white text-sm">CASTLESOUNDS</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#b06dff] uppercase mb-4 block">
            About the Artist
          </span>
          <h2 className="font-['Orbitron'] font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
            Sound Is My
            <span className="block neon-text text-[#b06dff]">Architecture</span>
          </h2>
          <p className="font-['Space_Grotesk'] text-[#6b6b8a] leading-relaxed mb-5">
            Born and raised in Leiria, CastleSounds has been shaping the underground electronic scene across Portugal for over a decade. With a sound that bridges industrial techno, hypnotic house, and dark electronic textures, every set is a carefully crafted journey.
          </p>
          <p className="font-['Space_Grotesk'] text-[#6b6b8a] leading-relaxed mb-10">
            From warehouse raves in Porto to rooftop sessions in Lisbon, the mission remains constant — create experiences that dissolve boundaries between body and sound.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass border border-white/5 rounded-xl p-4 text-center"
              >
                <p className="font-['Orbitron'] font-bold text-2xl text-[#b06dff] neon-text">{s.value}</p>
                <p className="font-['Space_Grotesk'] text-[10px] text-[#6b6b8a] tracking-wider mt-1 leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
