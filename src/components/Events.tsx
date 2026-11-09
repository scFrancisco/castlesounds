"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Events() {
  const { config } = useSiteConfig();
  const { events, gallery } = config;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="events" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[350px] h-[350px] bg-[#9B1C1C]/10 top-10 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#9B1C1C] uppercase mb-4 block"
          >
            Live Dates & Gallery
          </motion.span>
          <motion.h2
            initial={{ y: 60 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] font-bold text-4xl md:text-5xl text-[#EDE8DF]"
          >
            UPCOMING{" "}
            <span className="text-[#9B1C1C]" style={{ textShadow: "0 0 12px rgba(155,28,28,0.9), 0 0 50px rgba(155,28,28,0.4)" }}>
              EVENTS
            </span>
          </motion.h2>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="glass border border-[#C9922A]/10 rounded-2xl p-10 text-center mb-20"
          >
            <p className="font-['Space_Grotesk'] text-[#5A5550] text-sm">
              No upcoming events — add them in the Admin panel.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4 mb-20">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, ease: "easeOut" }}
                whileHover={{ x: 4 }}
                className="group glass border border-[#EDE8DF]/5 hover:border-[#EDE8DF]/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300"
              >
                <div className="flex-shrink-0 text-center sm:w-20">
                  <p className="font-['Cinzel'] font-bold text-2xl" style={{ color: event.color }}>{event.date}</p>
                  <p className="font-['Space_Grotesk'] text-xs text-[#5A5550]">{event.year}</p>
                </div>
                <div className="w-px h-10 bg-[#EDE8DF]/8 hidden sm:block" />
                <div className="flex-1">
                  <p className="font-['Cinzel'] font-semibold text-[#EDE8DF] text-sm">{event.name}</p>
                  <p className="font-['Space_Grotesk'] text-xs text-[#5A5550] mt-1">
                    {event.venue} · {event.city}
                  </p>
                </div>
                <div
                  className="self-start sm:self-center px-3 py-1 rounded-full border text-xs font-['Space_Grotesk'] tracking-widest"
                  style={{ borderColor: `${event.color}40`, color: event.color }}
                >
                  {event.type}
                </div>
                <a
                  href="#booking"
                  className="self-start sm:self-center px-5 py-2 glass border border-[#EDE8DF]/10 hover:border-[#C9922A]/30 text-xs font-['Space_Grotesk'] tracking-[0.1em] transition-all duration-300 rounded-sm text-[#5A5550] hover:text-[#C9922A]"
                >
                  INQUIRE
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-['Cinzel'] font-bold text-xl text-[#EDE8DF] mb-6 text-center tracking-wider">
            PHOTO <span className="text-[#5A5550]">GALLERY</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 150 }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${item.span === "wide" ? "col-span-2 md:col-span-1" : ""}`}
                style={{ aspectRatio: item.span === "wide" ? "16/9" : "1" }}
              >
                {item.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-3 left-3 font-['Space_Grotesk'] text-xs text-[#EDE8DF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest">
                      {item.alt}
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full glass border border-[#C9922A]/8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9922A]/5 to-[#4E8FA0]/5 group-hover:from-[#C9922A]/12 group-hover:to-[#4E8FA0]/10 transition-all duration-500" />
                    <div className="relative text-center px-4">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="mx-auto opacity-20 mb-2">
                        <rect x="3" y="7" width="30" height="22" rx="3" stroke="#C9922A" strokeWidth="1.5"/>
                        <circle cx="12" cy="14" r="3" stroke="#C9922A" strokeWidth="1.5"/>
                        <path d="M3 24L11 16L17 22L24 15L33 24" stroke="#C9922A" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                      <p className="font-['Space_Grotesk'] text-[9px] tracking-widest text-[#5A5550]">{item.alt}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-center font-['Space_Grotesk'] text-xs text-[#5A5550] mt-4">
            Manage photos and events in the{" "}
            <a href="/admin" className="text-[#C9922A] hover:underline">Admin Panel</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
