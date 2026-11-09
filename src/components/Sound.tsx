"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const tracks = [
  { title: "Subterranean Frequencies", duration: "7:42", bpm: "140 BPM", genre: "DARK TECHNO" },
  { title: "Castle Walls (Original Mix)", duration: "9:15", bpm: "128 BPM", genre: "HYPNOTIC HOUSE" },
  { title: "Leiria Underground Vol.3", duration: "58:00", bpm: "MIXED", genre: "DJ MIX" },
  { title: "Concrete Dreams", duration: "6:30", bpm: "135 BPM", genre: "INDUSTRIAL" },
];

export default function Sound() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sound" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[400px] h-[400px] bg-[#00e5ff]/8 bottom-0 left-[-150px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#00e5ff] uppercase mb-4 block">
            Discography & Mixes
          </span>
          <h2 className="font-['Orbitron'] font-bold text-4xl md:text-5xl text-white">
            THE <span className="neon-text-cyan text-[#00e5ff]">SOUND</span>
          </h2>
        </motion.div>

        {/* SoundCloud / streaming embed placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass border border-[#00e5ff]/15 rounded-2xl p-6 mb-10 overflow-hidden"
        >
          {/* Fake waveform visualization */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 border border-[#00e5ff]/40 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#00e5ff">
                <path d="M2 2L10 6L2 10V2Z" />
              </svg>
            </div>
            <div>
              <p className="font-['Space_Grotesk'] font-semibold text-white text-sm">Castle Walls — Live Set @ Warehouse Leiria</p>
              <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">2024 · 2.1K plays</p>
            </div>
            <div className="ml-auto glass px-3 py-1 rounded-full border border-[#00e5ff]/20">
              <span className="font-['Space_Grotesk'] text-xs text-[#00e5ff]">SOUNDCLOUD</span>
            </div>
          </div>

          {/* Animated waveform */}
          <div className="flex items-end gap-0.5 h-16 mb-4">
            {Array.from({ length: 80 }).map((_, i) => {
              const h = 20 + Math.sin(i * 0.4) * 15 + Math.sin(i * 0.15) * 20 + (i % 7 === 0 ? 15 : 0);
              const active = i < 32;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${h}%`,
                    minHeight: "4px",
                    background: active
                      ? `rgba(0,229,255,${0.5 + (h / 50) * 0.5})`
                      : `rgba(107,107,138,${0.2 + (h / 80) * 0.3})`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-['Space_Grotesk'] text-xs text-[#00e5ff]">22:14</span>
            <div className="flex-1 mx-4 h-0.5 bg-white/5 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[38%] bg-[#00e5ff]/60 rounded-full" />
            </div>
            <span className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">58:00</span>
          </div>

          <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a] mt-4 text-center">
            🎵 Connect your SoundCloud or Spotify — embed goes here
          </p>
        </motion.div>

        {/* Track list */}
        <div className="grid gap-3">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="group glass border border-white/5 hover:border-[#00e5ff]/20 rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-300 cursor-pointer hover:shadow-neon-cyan"
            >
              <span className="font-['Orbitron'] text-xs text-[#6b6b8a] w-5 text-center">{String(i + 1).padStart(2, "0")}</span>
              <div className="w-8 h-8 rounded-full glass border border-white/10 group-hover:border-[#00e5ff]/40 flex items-center justify-center transition-all">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#6b6b8a" className="group-hover:fill-[#00e5ff] transition-colors">
                  <path d="M1.5 1.5L8.5 5L1.5 8.5V1.5Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-['Space_Grotesk'] font-medium text-white text-sm group-hover:text-[#00e5ff] transition-colors">{track.title}</p>
                <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a] mt-0.5">{track.genre}</p>
              </div>
              <span className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">{track.bpm}</span>
              <span className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">{track.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
