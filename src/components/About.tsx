"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="font-['Cinzel'] font-bold text-2xl text-[#C9922A] glow-gold"
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const decorX = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <motion.div style={{ x: decorX }} className="orb w-[400px] h-[400px] bg-[#C9922A]/8 top-0 right-[-120px]" />
      <div className="orb w-[300px] h-[300px] bg-[#9B1C1C]/8 bottom-0 left-[-80px]" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Visual placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-[-12px] rounded-2xl border border-[#C9922A]/15" />
            <div className="absolute inset-[-24px] rounded-2xl border border-[#C9922A]/07" />

            <div
              className="relative rounded-2xl overflow-hidden border border-[#C9922A]/20"
              style={{ aspectRatio: "480/520" }}
            >
              {artist.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={artist.photo}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#C9922A]/8 to-[#4E8FA0]/5">
                  {/* Castle mask SVG placeholder */}
                  <svg viewBox="0 0 120 140" fill="none" className="w-32 h-36 opacity-30 mb-4">
                    <path d="M60 10 L110 35 L110 130 L10 130 L10 35 Z" stroke="#C9922A" strokeWidth="1.5"/>
                    <path d="M38 130 L38 80 Q60 55 82 80 L82 130" stroke="#C9922A" strokeWidth="1.5"/>
                    <rect x="18" y="8" width="14" height="20" stroke="#C9922A" strokeWidth="1.2"/>
                    <rect x="53" y="4" width="14" height="16" stroke="#C9922A" strokeWidth="1.2"/>
                    <rect x="88" y="8" width="14" height="20" stroke="#C9922A" strokeWidth="1.2"/>
                    <circle cx="60" cy="90" r="10" stroke="#C9922A" strokeWidth="1.2"/>
                    <line x1="10" y1="50" x2="110" y2="50" stroke="#C9922A" strokeWidth="0.5" strokeDasharray="3 3"/>
                  </svg>
                  <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.3em] text-[#5A5550] text-center px-4">
                    ADD PHOTO IN ADMIN
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/60 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-5 glass border border-[#C9922A]/30 px-5 py-3 rounded-xl shadow-gold"
            >
              <p className="font-['Cinzel'] text-[10px] text-[#C9922A] tracking-widest">DJ & PRODUCER</p>
              <p className="font-['Cinzel'] font-bold text-[#EDE8DF] text-sm">CASTLE</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#C9922A] uppercase mb-4 block"
          >
            About the Artist
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Cinzel'] font-bold text-4xl md:text-5xl text-[#EDE8DF] mb-6 leading-tight"
            >
              Sound Is My
              <span className="block glow-gold text-[#C9922A]">Architecture</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="font-['Space_Grotesk'] text-[#5A5550] leading-relaxed mb-5"
          >
            {artist.bio1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="font-['Space_Grotesk'] text-[#5A5550] leading-relaxed mb-10"
          >
            {artist.bio2.split("NÔMA").map((part, i) =>
              i === 0 ? part : (
                <span key={i}>
                  <span className="text-[#C9922A] font-medium">NÔMA</span>
                  {part}
                </span>
              )
            )}
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                className="glass border border-[#C9922A]/10 rounded-xl p-4 text-center"
              >
                <AnimatedCounter value={s.value} />
                <p className="font-['Space_Grotesk'] text-[10px] text-[#5A5550] tracking-wider mt-1 leading-tight">
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
