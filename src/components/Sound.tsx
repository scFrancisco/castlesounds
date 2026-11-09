"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Sound() {
  const { config } = useSiteConfig();
  const { featuredTrack, tracks } = config;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sound" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="orb w-[350px] h-[350px] bg-[#5698AA]/6 bottom-0 left-[-100px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#5698AA] uppercase mb-4 block"
          >
            Discography & Mixes
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 50 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Cinzel'] font-bold text-[clamp(2rem,5vw,3.25rem)] text-[#EEE8DF]"
            >
              THE <span className="text-[#5698AA]" style={{ textShadow: "0 0 40px rgba(86,152,170,0.4)" }}>SOUND</span>
            </motion.h2>
          </div>
        </div>

        {/* Featured release */}
        <motion.a
          href={featuredTrack.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass border border-[#5698AA]/15 hover:border-[#5698AA]/35 rounded-2xl p-6 mb-8 overflow-hidden block transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-full bg-[#5698AA]/15 border border-[#5698AA]/30 flex items-center justify-center group-hover:bg-[#5698AA]/25 transition-colors flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#5698AA">
                <path d="M2 1.5L10.5 6L2 10.5V1.5Z" />
              </svg>
            </div>
            <div>
              <p className="font-['Cinzel'] font-semibold text-[#EEE8DF] text-sm tracking-wider">
                {featuredTrack.title}
              </p>
              <p className="font-['Space_Grotesk'] text-xs text-[#726E6A] mt-0.5">
                Castle · Out Now on {featuredTrack.platform}
              </p>
            </div>
            <div className="ml-auto glass px-3 py-1.5 rounded-full border border-[#5698AA]/20">
              <span className="font-['Space_Grotesk'] text-xs text-[#5698AA] tracking-widest">
                ▶ {featuredTrack.platform.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Waveform — 60 bars */}
          <div className="flex items-end gap-0.5 h-12 mb-4" suppressHydrationWarning>
            {Array.from({ length: 60 }).map((_, i) => {
              const h = Math.round(20 + Math.sin(i * 0.5) * 15 + Math.sin(i * 0.18) * 18 + (i % 7 === 0 ? 14 : 0));
              const active = i < 24;
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.005, duration: 0.25 }}
                  style={{ transformOrigin: "bottom" }}
                  className="flex-1 rounded-full"
                >
                  <div
                    className="w-full rounded-full"
                    style={{
                      height: `${h}%`,
                      minHeight: "3px",
                      background: active
                        ? `rgba(86,152,170,${(0.4 + (h / 50) * 0.55).toFixed(2)})`
                        : `rgba(114,110,106,${(0.12 + (h / 80) * 0.2).toFixed(2)})`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-['Space_Grotesk'] text-xs text-[#5698AA]">1:24</span>
            <div className="flex-1 mx-4 h-px bg-[#EEE8DF]/5 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[28%] bg-[#5698AA]/50 rounded-full" />
            </div>
            <span className="font-['Space_Grotesk'] text-xs text-[#726E6A]">—:——</span>
          </div>
        </motion.a>

        {/* Track list */}
        <div className="grid gap-2">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07, ease: "easeOut" }}
              className="group glass border border-[#EEE8DF]/5 hover:border-[#C8A050]/20 rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-200 cursor-pointer"
            >
              <span className="font-['Cinzel'] text-xs text-[#726E6A] w-5 text-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-8 rounded-full border border-[#EEE8DF]/8 group-hover:border-[#C8A050]/35 flex items-center justify-center transition-all">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="#726E6A" className="group-hover:fill-[#C8A050] transition-colors">
                  <path d="M1.5 1.5L7.5 4.5L1.5 7.5V1.5Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Cinzel'] font-semibold text-[#EEE8DF] text-sm group-hover:text-[#C8A050] transition-colors truncate">
                  {track.title}
                </p>
                <p className="font-['Space_Grotesk'] text-xs text-[#726E6A] mt-0.5">{track.genre}</p>
              </div>
              <span className="font-['Space_Grotesk'] text-xs text-[#726E6A] hidden sm:block">{track.bpm}</span>
              <span className="font-['Space_Grotesk'] text-xs text-[#726E6A]">{track.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
