"use client";
import { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useOpened } from "@/lib/opening";

function Video({ className }: { className: string }) {
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster="/castle-poster.jpg" className={className}>
      <source src="/castle-mask-loop.webm" type="video/webm" />
      <source src="/castle-mask-loop.mp4" type="video/mp4" />
    </video>
  );
}

/* One run of the name strip: solid / dash / outline / dash */
function StripRun() {
  return (
    <>
      <span>Castle</span>
      <span className="px-[0.18em] text-signal">—</span>
      <span className="text-outline">Sounds</span>
      <span className="px-[0.18em] text-signal">—</span>
    </>
  );
}

/*
  The hero is pinned while you scroll through it:
  1. the wordmark and meta lift away,
  2. the video "visor" closes into a capsule at mid-height, centred on the mask,
  3. the name runs past behind the capsule.
*/
export default function Hero() {
  const { config } = useSiteConfig();
  const { artist, featuredTrack } = config;
  const root = useRef<HTMLElement>(null);
  const opened = useOpened();

  // Entrance — plays once the opening curtain is up
  useGSAP(
    () => {
      if (!opened) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const d = reduce ? 0 : 1;
      gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 * d } })
        .to("[data-frame-in]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 * d }, 0)
        // inline translateY(100%) is read by GSAP as a px `y`, so reset both
        .to("[data-letter-in]", { y: 0, yPercent: 0, stagger: 0.06 * d }, 0.15 * d)
        .to("[data-fade-in]", { opacity: 1, stagger: 0.08 * d, duration: 0.8 * d }, 0.6 * d);
    },
    { scope: root, dependencies: [opened] }
  );

  // Scroll scene
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: `(min-width: 768px) and ${MOTION_OK}`, mobile: `(max-width: 767px) and ${MOTION_OK}` },
        (ctx) => {
          const desktop = !!ctx.conditions?.desktop;

          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
            .to("[data-letter-out]", { yPercent: -120, opacity: 0, stagger: 0.02, duration: 0.3, ease: "power2.in" }, 0)
            .to("[data-meta]", { opacity: 0, y: -30, duration: 0.2 }, 0)
            .to("[data-bg]", { opacity: 0, duration: 0.35 }, 0)
            .to(
              "[data-frame]",
              {
                width: () => window.innerWidth * (desktop ? 0.3 : 0.74),
                height: () => window.innerWidth * (desktop ? 0.095 : 0.24),
                borderRadius: 9999,
                duration: 0.4,
                ease: "power2.inOut",
              },
              0.05
            )
            // the visor closes on the mask, about a third of the way down the clip
            .to("[data-frame] video", { objectPosition: "50% 28%", duration: 0.4 }, 0.05)
            .fromTo("[data-strip]", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.3)
            .fromTo("[data-strip]", { xPercent: 0 }, { xPercent: -50, duration: 0.7 }, 0.3);
        }
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} data-section="Home" className="grain relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      {/* Atmosphere: blurred full-bleed copy, desktop only (the clip is portrait) */}
      <div data-bg className="absolute inset-0 hidden md:block">
        <Video className="h-full w-full scale-110 object-cover blur-2xl brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        <div className="absolute inset-0 bg-blood/20 mix-blend-multiply" />
      </div>

      {/* The name strip that runs behind the capsule */}
      <div
        data-strip
        aria-hidden
        className="absolute left-0 top-1/2 flex -translate-y-1/2 whitespace-nowrap pl-[60vw] font-display text-[34vw] uppercase leading-none text-cream opacity-0 md:text-[13vw]"
      >
        <StripRun /><StripRun /><StripRun /><StripRun />
      </div>

      {/* The visor: full-bleed on phones, a portrait window on desktop; closes into a capsule */}
      <div
        data-frame
        className="absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-[72vh] md:w-[40.5vh]"
      >
        <div data-frame-in className="h-full w-full" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
          <Video className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60 md:hidden" />
        </div>
      </div>

      {/* Corner meta */}
      <div
        data-meta
        className="pointer-events-none absolute inset-x-4 top-20 z-20 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 md:inset-x-8 md:top-28 md:text-[11px]"
      >
        <p data-fade-in style={{ opacity: 0 }}>
          {artist.tagline.split("·").map((t) => (
            <span key={t} className="block">{t.trim()}</span>
          ))}
        </p>
        <p data-fade-in className="text-right" style={{ opacity: 0 }}>
          <span className="block">{artist.location}</span>
          <span className="block text-cream/40">39.74°N 8.80°W</span>
        </p>
      </div>

      {/* Giant wordmark + release */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3 md:px-6">
        <div data-meta className="mb-3 flex items-end justify-between gap-4 px-1 md:mb-4 md:px-2">
          <a
            data-fade-in
            href={featuredTrack.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            style={{ opacity: 0 }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-cream transition-transform duration-300 group-hover:scale-110 md:h-11 md:w-11">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5L10.5 6L2 10.5V1.5Z" /></svg>
            </span>
            <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-cream md:text-[11px]">
              <span className="block text-bone">New release</span>
              {featuredTrack.title} — out now
            </span>
          </a>
          <span data-fade-in className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 md:text-[11px]" style={{ opacity: 0 }}>
            Scroll ↓
          </span>
        </div>

        <h1 className="sr-only">Castle — {artist.tagline}</h1>
        <div aria-hidden className="flex pb-[1.5vw] font-display uppercase leading-[0.86] text-cream">
          {"CASTLE".split("").map((ch, i) => (
            <span key={i} data-letter-out className="block flex-1 overflow-hidden text-center text-[31vw] md:text-[21vw]">
              <span data-letter-in className="block" style={{ transform: "translateY(100%)" }}>
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
