"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="font-['Cinzel'] font-bold text-2xl text-[#C8A050]"
    >
      {value}
    </motion.span>
  );
}

export default function About() {
  const { config } = useSiteConfig();
  const { artist, stats } = config;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="orb w-[400px] h-[400px] bg-[#C8A050]/7 top-0 right-[-120px]" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="relative flex justify-center"
        >
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-[-10px] rounded-2xl border border-[#C8A050]/12" />
            <div
              className="relative rounded-2xl overflow-hidden border border-[#C8A050]/18"
              style={{ aspectRatio: "480/520" }}
            >
              {artist.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#C8A050]/6 to-[#5698AA]/4">
                  <svg viewBox="0 0 120 140" fill="none" className="w-32 h-36 opacity-25 mb-4">
                    <path d="M60 10 L110 35 L110 130 L10 130 L10 35 Z" stroke="#C8A050" strokeWidth="1.5"/>
                    <path d="M38 130 L38 80 Q60 55 82 80 L82 130" stroke="#C8A050" strokeWidth="1.5"/>
                    <rect x="18" y="8" width="14" height="20" stroke="#C8A050" strokeWidth="1.2"/>
                    <rect x="53" y="4" width="14" height="16" stroke="#C8A050" strokeWidth="1.2"/>
                    <rect x="88" y="8" width="14" height="20" stroke="#C8A050" strokeWidth="1.2"/>
                    <circle cx="60" cy="90" r="10" stroke="#C8A050" strokeWidth="1.2"/>
                    <line x1="10" y1="50" x2="110" y2="50" stroke="#C8A050" strokeWidth="0.5" strokeDasharray="3 3"/>
                  </svg>
                  <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.3em] text-[#726E6A] text-center px-4">
                    ADD PHOTO IN ADMIN
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -right-4 glass border border-[#C8A050]/25 px-5 py-3 rounded-xl shadow-gold">
              <p className="font-['Cinzel'] text-[10px] text-[#C8A050] tracking-widest">DJ & PRODUCER</p>
              <p className="font-['Cinzel'] font-bold text-[#EEE8DF] text-sm">CASTLE</p>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#C8A050] uppercase mb-4 block">
            About the Artist
          </span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 50 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Cinzel'] font-bold text-[clamp(2rem,5vw,3.25rem)] text-[#EEE8DF] mb-6 leading-tight"
            >
              Sound Is My
              <span className="block text-[#C8A050] glow-gold">Architecture</span>
            </motion.h2>
          </div>

          <p className="font-['Space_Grotesk'] text-[#726E6A] leading-relaxed mb-5 text-[0.9rem]">
            {artist.bio1}
          </p>
          <p className="font-['Space_Grotesk'] text-[#726E6A] leading-relaxed mb-10 text-[0.9rem]">
            {artist.bio2.split("NÔMA").map((part, i) =>
              i === 0 ? part : (
                <span key={i}>
                  <span className="text-[#C8A050] font-medium">NÔMA</span>
                  {part}
                </span>
              )
            )}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass border border-[#C8A050]/10 rounded-xl p-4 text-center"
              >
                <AnimatedCounter value={s.value} />
                <p className="font-['Space_Grotesk'] text-[10px] text-[#726E6A] tracking-wider mt-1 leading-tight">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
