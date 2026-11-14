"use client";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal, MaskLine, SectionLabel } from "@/components/ui";

export default function Gallery() {
  const { config } = useSiteConfig();
  const items = config.gallery.filter((g) => g.src);
  const strip = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="relative py-24 md:py-36">
      <div className="px-4 md:px-8">
        <SectionLabel index="04" label="Gallery" />
        <div className="mt-10 flex items-end justify-between gap-6 md:mt-16">
          <h2 className="font-display text-[18vw] uppercase leading-[0.85] md:text-[9vw]">
            <MaskLine>In the</MaskLine>
            <MaskLine delay={0.08} className="text-signal">booth</MaskLine>
          </h2>
          <div className="hidden gap-2 md:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => scrollBy(d)}
                aria-label={d < 0 ? "Previous photos" : "Next photos"}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/20 text-xl transition-colors hover:border-signal hover:bg-signal"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Reveal y={60}>
        <div
          ref={strip}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mt-20 md:gap-4 md:px-8"
        >
          {items.map((item, i) => (
            <figure
              key={item.id}
              className="duotone-wrap group relative aspect-[9/16] w-[70vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] md:w-[26vw] lg:w-[21vw]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} loading="lazy" className="duotone h-full w-full object-cover" />
              <figcaption className="absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                <span>{item.alt}</span>
                <span className="text-cream/60">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
