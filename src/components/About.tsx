"use client";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useRef } from "react";
import { Reveal, MaskLine, SectionLabel } from "@/components/ui";
import CountUp from "@/components/CountUp";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function About() {
  const { config } = useSiteConfig();
  const { artist, stats } = config;
  const photo = artist.photo || "/photos/castle-mask.jpg";
  const root = useRef<HTMLElement>(null);

  // The photo opens from a narrow window and settles as you scroll past it
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-photo-win]",
          { clipPath: "inset(18% 22% 18% 22%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-photo-win]", start: "top 95%", end: "center 55%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          "[data-photo-win] img",
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-photo-win]", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative px-4 pb-24 pt-24 md:px-8 md:pb-40 md:pt-36">
      <SectionLabel index="01" label="About" />

      {/* Editorial statement */}
      <h2 className="mt-10 max-w-[18ch] font-display text-[13vw] uppercase leading-[0.9] md:mt-16 md:text-[7.5vw]">
        <MaskLine>Sound is my</MaskLine>
        <MaskLine delay={0.08} className="accent pb-[0.08em] pr-[0.1em]">architecture.</MaskLine>
      </h2>

      <div className="mt-16 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
        {/* Photo */}
        <div className="md:col-span-5">
          <figure data-photo-win className="duotone-wrap relative aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={artist.name} loading="lazy" className="duotone h-full w-full object-cover" />
            <figcaption className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/80">
              Castle — Leiria, PT
            </figcaption>
          </figure>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between md:col-span-6 md:col-start-7">
          <Reveal delay={0.1}>
            <p className="text-xl font-light leading-snug text-cream md:text-[1.75rem] md:leading-[1.3]">
              {artist.bio1}
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-bone">
              {artist.bio2.split(config.featuredTrack.title).map((part, i) =>
                i === 0 ? part : (
                  <span key={i}>
                    <a
                      href={config.featuredTrack.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-signal text-cream transition-colors hover:text-signal"
                    >
                      {config.featuredTrack.title}
                    </a>
                    {part}
                  </span>
                )
              )}
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 border-t border-cream/10">
            {stats.map((s, i) => (
              <Reveal key={s.id} delay={0.15 + i * 0.08} y={20}>
                <div className={`pt-5 ${i > 0 ? "border-l border-cream/10 pl-4 md:pl-6" : ""}`}>
                  <CountUp value={s.value} className="block font-display text-5xl leading-none text-cream md:text-7xl" />
                  <p className="mt-3 font-mono text-[10px] uppercase leading-snug tracking-[0.15em] text-bone">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
