"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    date: "NOV 22",
    year: "2025",
    venue: "Bunker Club",
    city: "Leiria",
    name: "UNDERGROUND SESSIONS #12",
    type: "RESIDENT SET",
    color: "#b06dff",
  },
  {
    date: "DEC 07",
    year: "2025",
    venue: "Lux Frágil",
    city: "Lisboa",
    name: "DARK MATTER NIGHT",
    type: "HEADLINER",
    color: "#00e5ff",
  },
  {
    date: "DEC 28",
    year: "2025",
    venue: "Plano B",
    city: "Porto",
    name: "NEW YEAR'S COUNTDOWN",
    type: "SPECIAL EVENT",
    color: "#ff2d78",
  },
  {
    date: "JAN 11",
    year: "2026",
    venue: "Industrialx",
    city: "Coimbra",
    name: "CONCRETE FREQUENCIES",
    type: "BACK-TO-BACK",
    color: "#b06dff",
  },
];

const galleryItems = [
  { label: "WAREHOUSE RAVE — LEIRIA 2024", aspect: "aspect-square" },
  { label: "OPEN AIR — FESTIVAL 2024", aspect: "aspect-video" },
  { label: "CLUB NIGHT — PORTO", aspect: "aspect-square" },
  { label: "STUDIO SESSION", aspect: "aspect-square" },
  { label: "AFTER HOURS — LISBOA", aspect: "aspect-video" },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="events" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[300px] h-[300px] bg-[#ff2d78]/8 top-10 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#ff2d78] uppercase mb-4 block">
            Live Dates & Gallery
          </span>
          <h2 className="font-['Orbitron'] font-bold text-4xl md:text-5xl text-white">
            UPCOMING <span className="text-[#ff2d78]" style={{ textShadow: "0 0 10px rgba(255,45,120,0.8), 0 0 40px rgba(255,45,120,0.4)" }}>EVENTS</span>
          </h2>
        </motion.div>

        {/* Event list */}
        <div className="grid gap-4 mb-20">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group glass border border-white/5 hover:border-white/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300"
              style={{ "--event-color": event.color } as React.CSSProperties}
            >
              {/* Date */}
              <div className="flex-shrink-0 text-center sm:w-20">
                <p className="font-['Orbitron'] font-bold text-2xl" style={{ color: event.color }}>{event.date}</p>
                <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">{event.year}</p>
              </div>

              <div className="w-px h-10 bg-white/10 hidden sm:block" />

              {/* Info */}
              <div className="flex-1">
                <p className="font-['Space_Grotesk'] font-semibold text-white text-sm">{event.name}</p>
                <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a] mt-1">
                  {event.venue} · {event.city}
                </p>
              </div>

              {/* Type badge */}
              <div
                className="self-start sm:self-center px-3 py-1 rounded-full border text-xs font-['Space_Grotesk'] tracking-widest"
                style={{ borderColor: `${event.color}40`, color: event.color }}
              >
                {event.type}
              </div>

              {/* Tickets btn */}
              <a
                href="#booking"
                className="self-start sm:self-center px-5 py-2 glass border border-white/10 hover:border-white/20 text-xs font-['Space_Grotesk'] tracking-[0.1em] transition-all duration-300 rounded-sm text-[#6b6b8a] hover:text-white"
              >
                INQUIRE
              </a>
            </motion.div>
          ))}
        </div>

        {/* Photo gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-6 text-center">
            PHOTO <span className="text-[#6b6b8a]">GALLERY</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className={`${item.aspect} glass border border-white/5 rounded-xl overflow-hidden relative group cursor-pointer ${i === 1 || i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#b06dff]/10 to-[#00e5ff]/5 group-hover:from-[#b06dff]/20 group-hover:to-[#00e5ff]/10 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto opacity-20 mb-2">
                      <rect x="4" y="8" width="32" height="24" rx="3" stroke="#b06dff" strokeWidth="1.5" />
                      <circle cx="14" cy="16" r="3" stroke="#b06dff" strokeWidth="1.5" />
                      <path d="M4 26L13 18L19 24L26 17L36 26" stroke="#b06dff" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <p className="font-['Space_Grotesk'] text-[9px] tracking-widest text-[#6b6b8a]">{item.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#b06dff]/30 rounded-xl" />
              </motion.div>
            ))}
          </div>
          <p className="text-center font-['Space_Grotesk'] text-xs text-[#6b6b8a] mt-4">
            📸 Add your photos — replace placeholders in <code className="text-[#b06dff]/70">/public/gallery/</code>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
