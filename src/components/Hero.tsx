"use client";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Hero() {
  const { config } = useSiteConfig();
  const { artist, featuredTrack } = config;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Video background — static, no parallax for perf */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ willChange: "auto" }}
        >
          <source src="/castle-mask-loop.webm" type="video/webm" />
          <source src="/castle-mask-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/65 via-[#060608]/15 to-[#060608]/85" />
      </div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[500px] h-[500px] bg-[#C41E3A]/10 top-[-80px] right-[-120px]" />
        <div className="orb w-[300px] h-[300px] bg-[#00E5D0]/7 bottom-[-40px] left-[-80px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        {/* Location eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="w-1 h-1 rounded-full bg-[#C41E3A]/70" />
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#00E5D0]/70 uppercase">
            {artist.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C41E3A]/70" />
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Bebas_Neue'] text-[clamp(5rem,18vw,14rem)] leading-none tracking-widest glow-red text-[#C41E3A]"
          >
            CASTLE
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Bebas_Neue'] text-[clamp(5rem,18vw,14rem)] leading-none tracking-widest text-[#F0ECEA]"
          >
            SOUNDS
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="font-['Space_Grotesk'] font-light text-[#5A5460] text-sm tracking-[0.5em] uppercase mb-12"
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
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-[#C41E3A] hover:bg-[#E0304E] text-[#F0ECEA] font-['Space_Grotesk'] font-semibold text-xs tracking-[0.15em] transition-all duration-200 hover:shadow-red rounded-sm w-full sm:w-auto justify-center min-h-[44px]"
          >
            <PlayIcon />
            LISTEN TO {featuredTrack.title}
          </a>
          <a
            href="#booking"
            className="px-7 py-3.5 border border-[#F0ECEA]/10 hover:border-[#00E5D0]/40 hover:text-[#00E5D0] font-['Space_Grotesk'] font-medium text-xs tracking-[0.15em] text-[#5A5460] transition-all duration-200 rounded-sm w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center"
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
            className="w-px h-10 bg-gradient-to-b from-[#C41E3A]/50 to-transparent"
          />
        </motion.div>
      </div>
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
