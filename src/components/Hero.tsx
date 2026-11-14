"use client";
import { motion } from "framer-motion";
import { useSiteConfig } from "@/context/SiteConfigContext";

const ease = [0.16, 1, 0.3, 1] as const;

function Video({ className }: { className: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/castle-poster.jpg"
      className={className}
    >
      <source src="/castle-mask-loop.webm" type="video/webm" />
      <source src="/castle-mask-loop.mp4" type="video/mp4" />
    </video>
  );
}

export default function Hero() {
  const { config } = useSiteConfig();
  const { artist, featuredTrack } = config;

  return (
    <section className="grain relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      {/* Atmosphere layer: full-bleed video. Sharp on mobile (the clip is portrait),
          blurred + darkened on wide screens where it would be upscaled. */}
      <div className="absolute inset-0">
        <Video className="h-full w-full object-cover md:scale-110 md:blur-2xl md:brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        <div className="absolute inset-0 bg-blood/20 mix-blend-multiply" />
      </div>

      {/* Sharp portrait frame — desktop only */}
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.4, delay: 0.2, ease }}
        className="absolute left-1/2 top-[11vh] hidden aspect-[9/16] h-[72vh] -translate-x-1/2 overflow-hidden md:block"
      >
        <Video className="h-full w-full object-cover" />
        <div className="absolute inset-0 ring-1 ring-inset ring-cream/10" />
      </motion.div>

      {/* Corner meta */}
      <div className="pointer-events-none absolute inset-x-4 top-20 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 md:inset-x-8 md:top-28 md:text-[11px]">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {artist.tagline.split("·").map((t) => (
            <span key={t} className="block">{t.trim()}</span>
          ))}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-right"
        >
          <span className="block">{artist.location}</span>
          <span className="block text-cream/40">39.74°N 8.80°W</span>
        </motion.p>
      </div>

      {/* Giant wordmark */}
      <div className="absolute inset-x-0 bottom-0 px-3 md:px-6">
        <div className="mb-3 flex items-end justify-between gap-4 px-1 md:mb-4 md:px-2">
          <motion.a
            href={featuredTrack.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="group flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-cream transition-transform duration-300 group-hover:scale-110 md:h-11 md:w-11">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5L10.5 6L2 10.5V1.5Z" /></svg>
            </span>
            <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-cream md:text-[11px]">
              <span className="block text-bone">New release</span>
              {featuredTrack.title} — out now
            </span>
          </motion.a>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 md:text-[11px]"
          >
            Scroll ↓
          </motion.span>
        </div>

        <h1 className="sr-only">Castle — {artist.tagline}</h1>
        <div aria-hidden className="flex overflow-hidden pb-[1.5vw] font-display uppercase leading-[0.86] text-cream mix-blend-difference">
          {"CASTLE".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.35 + i * 0.06, ease }}
              className="block flex-1 text-center text-[31vw] md:text-[21vw]"
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
