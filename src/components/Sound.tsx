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
    <section id="sound" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[400px] h-[400px] bg-[#4E8FA0]/8 bottom-0 left-[-120px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#4E8FA0] uppercase mb-4 block"
          >
            Discography & Mixes
          </motion.span>
          <motion.h2
            initial={{ y: 60 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-bold text-4xl md:text-5xl text-[#EDE8DF]"
          >
            THE <span className="glow-teal text-[#4E8FA0]">SOUND</span>
          </motion.h2>
        </div>

        {/* Featured release */}
        <motion.a
          href={featuredTrack.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ borderColor: "rgba(78,143,160,0.4)" }}
          className="glass border border-[#4E8FA0]/15 rounded-2xl p-6 mb-10 overflow-hidden block transition-all duration-300 group"
        >
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-[#4E8FA0]/20 border border-[#4E8FA0]/40 flex items-center justify-center group-hover:bg-[#4E8FA0]/30 transition-colors flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#4E8FA0">
                <path d="M2.5 1.5L11.5 7L2.5 12.5V1.5Z" />
              </svg>
            </motion.div>
            <div>
              <p className="font-['Cinzel'] font-semibold text-[#EDE8DF] text-base tracking-wider">
                {featuredTrack.title}
              </p>
              <p className="font-['Space_Grotesk'] text-xs text-[#5A5550] mt-0.5">
                Castle · Out Now on {featuredTrack.platform}
              </p>
            </div>
            <div className="ml-auto glass px-3 py-1.5 rounded-full border border-[#4E8FA0]/20">
              <span className="font-['Space_Grotesk'] text-xs text-[#4E8FA0] tracking-widest">
                ▶ PLAY ON {featuredTrack.platform.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-0.5 h-14 mb-4" suppressHydrationWarning>
            {Array.from({ length: 80 }).map((_, i) => {
              const h = Math.round(20 + Math.sin(i * 0.4) * 15 + Math.sin(i * 0.15) * 20 + (i % 7 === 0 ? 15 : 0));
              const active = i < 32;
              return (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.004, duration: 0.3 }}
                  style={{ transformOrigin: "bottom" }}
                  className="flex-1 rounded-full"
                >
                  <div
                    className="w-full rounded-full"
                    style={{
                      height: `${h}%`,
                      minHeight: "3px",
                      background: active
                        ? `rgba(78,143,160,${(0.4 + (h / 50) * 0.6).toFixed(2)})`
                        : `rgba(90,85,80,${(0.15 + (h / 80) * 0.25).toFixed(2)})`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-['Space_Grotesk'] text-xs text-[#4E8FA0]">1:24</span>
            <div className="flex-1 mx-4 h-px bg-[#EDE8DF]/5 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[28%] bg-[#4E8FA0]/60 rounded-full" />
            </div>
            <span className="font-['Space_Grotesk'] text-xs text-[#5A5550]">—:——</span>
          </div>
        </motion.a>

        {/* Track list */}
        <div className="grid gap-3">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, ease: "easeOut" }}
              className="group glass border border-[#EDE8DF]/5 hover:border-[#C9922A]/20 rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-300 cursor-pointer"
            >
              <span className="font-['Cinzel'] text-xs text-[#5A5550] w-5 text-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-8 rounded-full glass border border-[#EDE8DF]/10 group-hover:border-[#C9922A]/40 flex items-center justify-center transition-all">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#5A5550" className="group-hover:fill-[#C9922A] transition-colors">
                  <path d="M1.5 1.5L8.5 5L1.5 8.5V1.5Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-['Cinzel'] font-semibold text-[#EDE8DF] text-sm group-hover:text-[#C9922A] transition-colors">
                  {track.title}
                </p>
                <p className="font-['Space_Grotesk'] text-xs text-[#5A5550] mt-0.5">{track.genre}</p>
              </div>
              <span className="font-['Space_Grotesk'] text-xs text-[#5A5550]">{track.bpm}</span>
              <span className="font-['Space_Grotesk'] text-xs text-[#5A5550]">{track.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
