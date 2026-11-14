"use client";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal, MaskLine, SectionLabel } from "@/components/ui";
import Countdown from "@/components/Countdown";

export default function Events() {
  const { config } = useSiteConfig();
  const { events } = config;

  return (
    <section id="events" className="relative px-4 py-24 md:px-8 md:py-36">
      <SectionLabel index="03" label="Dates" />

      <div className="mt-10 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
        <h2 className="font-display text-[18vw] uppercase leading-[0.85] md:text-[9vw]">
          <MaskLine>On</MaskLine>
          <MaskLine delay={0.08} className="accent pb-[0.1em] pr-[0.1em]">tour.</MaskLine>
        </h2>
        <Reveal y={10}>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-bone">
            Upcoming shows across Portugal. For private events and clubs, see booking.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 md:mt-20">
        <Countdown events={events} />
      </div>

      {events.length === 0 ? (
        <p className="mt-16 border-y border-cream/15 py-10 font-mono text-xs uppercase tracking-[0.2em] text-bone">
          New dates announced soon.
        </p>
      ) : (
        <ul className="mt-14 border-t border-cream/15 md:mt-20">
          {events.map((event, i) => (
            <Reveal as="li" key={event.id} delay={i * 0.06} y={20} className="group relative border-b border-cream/15">
                {/* Red wipe on hover */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <a
                  href="#booking"
                  className="relative grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 py-6 md:grid-cols-[10rem_1fr_16rem_12rem_7rem] md:items-center md:gap-6 md:px-3 md:py-8"
                >
                  <span className="row-span-2 font-display text-3xl uppercase leading-none md:row-span-1 md:text-5xl">
                    {event.date}
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-bone group-hover:text-cream/80 md:mt-1">
                      {event.year}
                    </span>
                  </span>
                  <span className="font-display text-2xl uppercase leading-tight md:text-4xl">{event.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-bone group-hover:text-cream">
                    {event.venue} — {event.city}
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-bone group-hover:text-cream md:block">
                    {event.type}
                  </span>
                  <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.15em] md:block">
                    Inquire →
                  </span>
                </a>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
