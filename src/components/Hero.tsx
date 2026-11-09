"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient orbs */}
      <div className="orb w-[500px] h-[500px] bg-[#b06dff]/15 top-[-100px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-[#00e5ff]/10 bottom-[-100px] right-[-150px]" />
      <div className="orb w-[300px] h-[300px] bg-[#ff2d78]/8 top-[40%] left-[60%]" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 border border-[#b06dff]/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b06dff] animate-pulse-slow" />
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.3em] text-[#b06dff]/80">LEIRIA, PORTUGAL</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-['Orbitron'] font-black text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight mb-6"
        >
          <span className="block neon-text text-[#b06dff]">CASTLE</span>
          <span className="block text-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
            SOUNDS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-['Space_Grotesk'] font-light text-[#6b6b8a] text-lg tracking-widest uppercase mb-12"
        >
          Techno · House · Electronic · Dark
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#sound"
            className="group flex items-center gap-3 px-8 py-4 bg-[#b06dff] hover:bg-[#c490ff] text-black font-['Space_Grotesk'] font-semibold text-sm tracking-[0.15em] transition-all duration-300 hover:shadow-neon rounded-sm"
          >
            <PlayIcon />
            LISTEN NOW
          </a>
          <a
            href="#booking"
            className="px-8 py-4 glass border border-white/10 hover:border-[#b06dff]/50 font-['Space_Grotesk'] font-medium text-sm tracking-[0.15em] transition-all duration-300 hover:text-[#b06dff] rounded-sm"
          >
            BOOK AN EVENT
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.4em] text-[#6b6b8a]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-10 bg-gradient-to-b from-[#b06dff] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M2.5 1.5L12 7L2.5 12.5V1.5Z" />
    </svg>
  );
}
