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
    <section id="events" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="orb w-[320px] h-[320px] bg-[#C41E3A]/7 top-10 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#C41E3A] uppercase mb-4 block"
          >
            Live Dates & Gallery
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 50 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Bebas_Neue'] text-[clamp(2rem,5vw,3.25rem)] text-[#F0ECEA]"
            >
              UPCOMING <span className="text-[#C41E3A] glow-red">EVENTS</span>
            </motion.h2>
          </div>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="glass border border-[#C41E3A]/10 rounded-2xl p-10 text-center mb-20"
          >
            <p className="font-['Space_Grotesk'] text-[#5A5460] text-sm">
              No upcoming events — add them in the Admin panel.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-3 mb-20">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.08, ease: "easeOut" }}
                className="group glass border border-[#F0ECEA]/5 hover:border-[#F0ECEA]/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200"
              >
                <div className="flex-shrink-0 text-center sm:w-20">
                  <p className="font-['Bebas_Neue'] text-2xl" style={{ color: event.color }}>{event.date}</p>
                  <p className="font-['Space_Grotesk'] text-xs text-[#5A5460]">{event.year}</p>
                </div>
                <div className="w-px h-10 bg-[#F0ECEA]/7 hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <p className="font-['Bebas_Neue'] text-[#F0ECEA] text-sm">{event.name}</p>
                  <p className="font-['Space_Grotesk'] text-xs text-[#5A5460] mt-1">
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
                  className="self-start sm:self-center px-5 py-2 glass border border-[#F0ECEA]/8 hover:border-[#C41E3A]/30 text-xs font-['Space_Grotesk'] tracking-[0.1em] transition-all duration-200 rounded-sm text-[#5A5460] hover:text-[#C41E3A] min-h-[40px] flex items-center"
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
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-['Bebas_Neue'] text-lg text-[#F0ECEA] mb-6 text-center tracking-wider">
            PHOTO <span className="text-[#5A5460]">GALLERY</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.06 }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${item.span === "wide" ? "col-span-2 md:col-span-1" : ""}`}
                style={{ aspectRatio: item.span === "wide" ? "16/9" : "1" }}
              >
                {item.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-3 left-3 font-['Space_Grotesk'] text-xs text-[#F0ECEA] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest">
                      {item.alt}
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full glass border border-[#C41E3A]/7 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/4 to-[#00E5D0]/4 group-hover:from-[#C41E3A]/10 group-hover:to-[#00E5D0]/8 transition-all duration-400" />
                    <div className="relative text-center px-4">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto opacity-15 mb-2">
                        <rect x="2" y="6" width="28" height="20" rx="3" stroke="#C41E3A" strokeWidth="1.5"/>
                        <circle cx="11" cy="13" r="2.5" stroke="#C41E3A" strokeWidth="1.5"/>
                        <path d="M2 22L10 15L15 20L22 13L30 22" stroke="#C41E3A" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                      <p className="font-['Space_Grotesk'] text-[9px] tracking-widest text-[#5A5460]">{item.alt}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-center font-['Space_Grotesk'] text-xs text-[#5A5460] mt-4">
            Manage photos and events in the{" "}
            <a href="/admin" className="text-[#C41E3A] hover:underline">Admin Panel</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
