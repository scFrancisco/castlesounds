"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Hero() {
  const { config } = useSiteConfig();
  const { artist, featuredTrack } = config;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Two ambient orbs — reduced from 3 */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="orb w-[560px] h-[560px] bg-[#C8A050]/9 top-[-120px] right-[-160px]" />
        <div className="orb w-[380px] h-[380px] bg-[#C8A050]/6 bottom-[-80px] left-[-100px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        {/* Location eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="w-1 h-1 rounded-full bg-[#C8A050]/60" />
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#C8A050]/65 uppercase">
            {artist.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C8A050]/60" />
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-black text-[clamp(4rem,14vw,11rem)] leading-none tracking-tight glow-gold text-[#C8A050]"
          >
            CASTLE
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-black text-[clamp(4rem,14vw,11rem)] leading-none tracking-tight text-[#EEE8DF]"
          >
            SOUNDS
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="font-['Space_Grotesk'] font-light text-[#726E6A] text-sm tracking-[0.5em] uppercase mb-12"
        >
          {artist.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={featuredTrack.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-[#C8A050] hover:bg-[#DDB96A] text-[#09090B] font-['Space_Grotesk'] font-semibold text-xs tracking-[0.15em] transition-all duration-200 hover:shadow-gold rounded-sm w-full sm:w-auto justify-center min-h-[44px]"
          >
            <PlayIcon />
            LISTEN TO {featuredTrack.title}
          </a>
          <a
            href="#booking"
            className="px-7 py-3.5 border border-[#EEE8DF]/10 hover:border-[#C8A050]/40 hover:text-[#C8A050] font-['Space_Grotesk'] font-medium text-xs tracking-[0.15em] text-[#726E6A] transition-all duration-200 rounded-sm w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center"
          >
            BOOK AN EVENT
          </a>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#C8A050]/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2 1.5L10.5 6L2 10.5V1.5Z" />
    </svg>
  );
}
