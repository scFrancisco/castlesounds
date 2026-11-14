"use client";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { MaskLine, SectionLabel } from "@/components/ui";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
  Desktop: the section pins and the vertical scroll drives the strip sideways,
  each photo drifting inside its frame (parallax) with a progress rule below.
  Phone: a native swipe strip with snap points.
*/
export default function Gallery() {
  const { config } = useSiteConfig();
  const items = config.gallery.filter((g) => g.src);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.3}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance() }, 0)
          .fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo("[data-par]", { xPercent: -8 }, { xPercent: 8 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [items.length] }
  );

  if (items.length === 0) return null;

  return (
    <section ref={root} id="gallery" className="relative overflow-hidden py-24 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0">
      <div className="px-4 md:px-8">
        <SectionLabel index="04" label="Gallery" />
        <h2 className="mt-10 font-display text-[18vw] uppercase leading-[0.85] md:mt-8 md:text-[6.5vw]">
          <MaskLine>In the</MaskLine>
          <MaskLine delay={0.08} className="accent pb-[0.1em] pr-[0.1em]">booth.</MaskLine>
        </h2>
      </div>

      <div
        data-track
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mt-10 md:w-max md:snap-none md:gap-5 md:overflow-visible md:px-8"
      >
        {items.map((item, i) => (
          <figure
            key={item.id}
            className="duotone-wrap group relative aspect-[9/16] w-[70vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] md:aspect-auto md:h-[52vh] md:w-[29.25vh]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-par
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="duotone h-full w-full object-cover md:w-[120%] md:max-w-none md:-translate-x-[8%]"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
              <span>{item.alt}</span>
              <span className="text-cream/60">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
        {/* closing card */}
        <div className="hidden h-[52vh] w-[40vh] shrink-0 flex-col justify-end border-l border-cream/15 pl-6 md:flex">
          <p className="font-display text-5xl uppercase leading-[0.9]">
            More<br /><span className="accent">soon.</span>
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">New photos every season</p>
        </div>
      </div>

      <div className="mx-8 mt-8 hidden h-px bg-cream/10 md:block">
        <div data-progress className="h-full origin-left scale-x-0 bg-signal" />
      </div>
    </section>
  );
}
