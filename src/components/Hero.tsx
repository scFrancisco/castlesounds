"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Hero() {
  const { config } = useSiteConfig();
  const { artist, featuredTrack } = config;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Parallax ambient orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-[#9B1C1C]/12 top-[-150px] left-[-200px]" />
        <div className="orb w-[450px] h-[450px] bg-[#C9922A]/8 bottom-[-100px] right-[-180px]" />
        <div className="orb w-[300px] h-[300px] bg-[#4E8FA0]/8 top-[30%] left-[55%]" />
      </motion.div>

      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
        }}
      />

      {/* Castle arch watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[500px] h-[600px]">
          <path d="M200 20 L380 100 L380 480 L20 480 L20 100 Z" stroke="#C9922A" strokeWidth="1"/>
          <path d="M140 480 L140 280 Q200 200 260 280 L260 480" stroke="#C9922A" strokeWidth="1"/>
          <rect x="60" y="20" width="40" height="60" stroke="#C9922A" strokeWidth="1"/>
          <rect x="160" y="10" width="40" height="50" stroke="#C9922A" strokeWidth="1"/>
          <rect x="300" y="20" width="40" height="60" stroke="#C9922A" strokeWidth="1"/>
          <path d="M60 20 L80 20 L80 0 L100 20" stroke="#C9922A" strokeWidth="1"/>
          <path d="M160 10 L180 10 L180 -5 L200 10" stroke="#C9922A" strokeWidth="1"/>
          <path d="M300 20 L320 20 L320 0 L340 20" stroke="#C9922A" strokeWidth="1"/>
          <circle cx="200" cy="300" r="30" stroke="#C9922A" strokeWidth="1"/>
          <line x1="20" y1="150" x2="380" y2="150" stroke="#C9922A" strokeWidth="0.5" strokeDasharray="4 4"/>
        </svg>
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 border border-[#C9922A]/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9922A] animate-pulse" />
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.3em] text-[#C9922A]/80 uppercase">
            {artist.location}
          </span>
        </motion.div>

        {/* Title — letter stagger */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-black text-[clamp(3.5rem,13vw,10rem)] leading-none tracking-tight"
          >
            <span className="block glow-gold text-[#C9922A]">CASTLE</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-black text-[clamp(3.5rem,13vw,10rem)] leading-none tracking-tight text-[#EDE8DF]"
            style={{ WebkitTextStroke: "1px rgba(237,232,223,0.25)" }}
          >
            SOUNDS
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-['Space_Grotesk'] font-light text-[#5A5550] text-base uppercase mb-12"
        >
          {artist.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={featuredTrack.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-8 py-4 bg-[#C9922A] hover:bg-[#E4B55A] text-[#080806] font-['Space_Grotesk'] font-semibold text-sm tracking-[0.15em] transition-all duration-300 hover:shadow-gold rounded-sm"
          >
            <PlayIcon />
            LISTEN TO {featuredTrack.title}
          </motion.a>
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 glass border border-[#EDE8DF]/10 hover:border-[#C9922A]/40 font-['Space_Grotesk'] font-medium text-sm tracking-[0.15em] transition-all duration-300 hover:text-[#C9922A] rounded-sm"
          >
            BOOK AN EVENT
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.4em] text-[#5A5550]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-10 bg-gradient-to-b from-[#C9922A] to-transparent"
          />
        </motion.div>
      </motion.div>
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
