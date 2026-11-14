"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const PHOTO = "/photos/mask-studio.jpg";
// where the eyes sit in the photograph — the zoom starts there
const FOCUS = "50% 43%";

/*
  A pinned scene: the screen starts on the mask's eyes and pulls back as you
  scroll, the window shrinking to a portrait card while the words slide in.
*/
export default function MaskScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const win = root.current!.querySelector<HTMLElement>("[data-win]")!;
        // how much the card must grow to just cover the screen — that's the starting zoom
        const cover = () =>
          Math.max(window.innerWidth / win.offsetWidth, window.innerHeight / win.offsetHeight) * 1.02;

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
          // transform-only (no width/height) so it stays on the GPU and glides
          .fromTo(win, { scale: cover }, { scale: 1, duration: 0.6, ease: "power2.inOut" }, 0)
          .fromTo("[data-shade]", { opacity: 0.3 }, { opacity: 0, duration: 0.4 }, 0)
          .fromTo("[data-word-l]", { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0.4)
          .fromTo("[data-word-r]", { xPercent: 40, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0.45)
          .fromTo("[data-cap]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.62)
          .to({}, { duration: 0.15 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="The mask" className="relative h-[100svh] overflow-hidden bg-ink">
      <div
        data-win
        className="absolute left-1/2 top-1/2 -ml-[24vh] -mt-[36vh] h-[72vh] w-[48vh] overflow-hidden will-change-transform max-md:-ml-[28vw] max-md:-mt-[42vw] max-md:h-[84vw] max-md:w-[56vw]"
        style={{ transformOrigin: FOCUS }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTO}
          alt="Castle wearing the castle mask"
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: FOCUS }}
        />
        <div data-shade className="absolute inset-0 bg-ink opacity-0" />
      </div>

      {/* words either side of the card (above / below it on phones) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-[14vh] md:flex-row md:px-8 md:py-0">
        <p data-word-l className="font-display text-[14vw] uppercase leading-[0.85] text-cream md:text-[8vw]">
          No face.
        </p>
        <p data-word-r className="accent pb-[0.1em] text-[14vw] leading-[0.85] md:text-[8vw]">
          Just sound.
        </p>
      </div>

      <p
        data-cap
        className="absolute inset-x-0 bottom-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-bone md:bottom-10 md:text-[11px]"
      >
        One mask · every set · Leiria, PT
      </p>
    </section>
  );
}
