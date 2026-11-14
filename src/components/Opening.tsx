"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markOpened } from "@/lib/opening";
import { useSiteConfig } from "@/context/SiteConfigContext";

const SEEN_KEY = "cs_opening_seen";
const BPM = 124;
const BEAT = 60 / BPM; // seconds per beat

const STATUS = [
  { at: 0, text: "Loading track" },
  { at: 30, text: "Reading the beatgrid" },
  { at: 62, text: "Setting the cue" },
  { at: 90, text: "Ready to drop" },
];

// a fixed, hand-shaped waveform (same on server and client)
const BARS = Array.from({ length: 72 }, (_, i) => {
  const h = 0.28 + 0.32 * Math.abs(Math.sin(i * 0.41)) + 0.25 * Math.abs(Math.sin(i * 0.13 + 1)) + (i % 9 === 0 ? 0.15 : 0);
  return Math.min(1, h);
});

function Waveform({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full items-center gap-[2px] ${className}`}>
      {BARS.map((h, i) => (
        <span key={i} className="block flex-1 rounded-full bg-current" style={{ height: `${h * 100}%` }} />
      ))}
    </div>
  );
}

/*
  Opening — "starting the track": a deck loads the featured release
  (spinning record, waveform filling, beatgrid / cue status), counts in
  3 · 2 · 1 on the beat, and on DROP the record bursts open into the site.
  Plays once per browser session; "Skip" cuts straight to the drop.
*/
export default function Opening() {
  const { config } = useSiteConfig();
  const track = config.featuredTrack.title;
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      let seen = false;
      try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
        document.documentElement.style.overflow = "";
        markOpened();
        setGone(true);
      };

      if (seen || reduce) {
        finish();
        return;
      }

      document.documentElement.style.overflow = "hidden";
      const q = gsap.utils.selector(root);
      const pct = q("[data-pct]")[0] as HTMLElement;
      const status = q("[data-status]")[0] as HTMLElement;
      const time = q("[data-time]")[0] as HTMLElement;
      const count = q("[data-count]")[0] as HTMLElement;

      const LOAD = 2.1;
      const load = { v: 0 };
      let lastStatus = "";

      const t = gsap.timeline({ onComplete: finish });
      tl.current = t;

      // 1 · the deck powers on
      t.from(q("[data-ui]"), { opacity: 0, y: 14, stagger: 0.05, duration: 0.6, ease: "power3.out" })
        .from(q("[data-disc]"), { scale: 0.6, opacity: 0, duration: 0.9, ease: "expo.out" }, 0)
        // the record spins up while the track loads
        .to(q("[data-disc-spin]"), { rotation: 900, duration: LOAD + 0.4, ease: "power1.in" }, 0.1)

        // 2 · loading: waveform fills, counter, status lines, remaining time
        .to(load, {
          v: 100,
          duration: LOAD,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(load.v);
            pct.textContent = String(v).padStart(3, "0");
            const s = [...STATUS].reverse().find((x) => v >= x.at)!.text;
            if (s !== lastStatus) {
              lastStatus = s;
              status.textContent = s;
              gsap.fromTo(status, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
            }
            const remain = Math.max(0, 4 * BEAT * (1 - v / 100) + 3 * BEAT);
            time.textContent = `-00:0${remain.toFixed(1)}`;
          },
        }, 0.2)
        .fromTo(q("[data-wave-lit]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: LOAD, ease: "power2.inOut" }, 0.2)
        .fromTo(q("[data-playhead]"), { left: "0%" }, { left: "100%", duration: LOAD, ease: "power2.inOut" }, 0.2);

      // 3 · count-in on the beat: 3 · 2 · 1
      const countStart = 0.2 + LOAD + 0.1;
      ["3", "2", "1"].forEach((n, i) => {
        const at = countStart + i * BEAT;
        t.call(() => { count.textContent = n; }, [], at)
          .fromTo(count, { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: BEAT * 0.6, ease: "expo.out" }, at)
          .fromTo(q("[data-flash]"), { opacity: 0.22 }, { opacity: 0, duration: BEAT * 0.9, ease: "power2.out" }, at)
          .fromTo(q("[data-disc]"), { scale: 1.06 }, { scale: 1, duration: BEAT * 0.8, ease: "power3.out" }, at)
          .fromTo(q("[data-beat]")[i], { backgroundColor: "#EDE3DA" }, { backgroundColor: "#B52226", duration: 0.1 }, at);
      });
      t.to(q("[data-title]"), { opacity: 0, duration: 0.2 }, countStart);

      // 4 · DROP — the record bursts into a red flood, then the curtain tears up into the site
      const drop = countStart + 3 * BEAT;
      t.addLabel("drop", drop)
        .call(() => { count.textContent = "Drop"; }, [], "drop")
        .fromTo(count, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(3)" }, "drop")
        .to(q("[data-ui]"), { opacity: 0, duration: 0.2 }, "drop")
        .to(q("[data-disc-spin]"), { opacity: 0, scale: 1.3, duration: 0.4, ease: "power2.in" }, "drop+=0.15")
        .fromTo(q("[data-flood]"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.55, ease: "expo.in" }, "drop+=0.1")
        .to(count, { scale: 3.2, opacity: 0, duration: 0.5, ease: "expo.in" }, "drop+=0.25")
        .add(() => markOpened(), "drop+=0.62")
        .to(root.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "drop+=0.62")
        .to(q("[data-flood]"), { skewY: -6, transformOrigin: "0% 100%", duration: 0.85, ease: "expo.inOut" }, "<");
    },
    { scope: root }
  );

  const skip = () => {
    const t = tl.current;
    if (!t) return;
    // jump to the drop rather than cutting abruptly
    if (t.time() < (t.labels.drop ?? 0)) t.seek("drop");
  };

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden bg-ink text-cream" aria-hidden>
      {/* beat flash */}
      <div data-flash className="pointer-events-none absolute inset-0 bg-signal opacity-0" />

      {/* the red flood the record bursts into on DROP (under the DROP word) */}
      <div data-flood className="pointer-events-none absolute inset-0 z-10 bg-signal" style={{ clipPath: "circle(0% at 50% 50%)" }} />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 py-4 font-mono text-[10px] uppercase tracking-[0.2em] md:px-8 md:py-6 md:text-[11px]">
        <p data-ui>
          <span className="text-signal">Deck A</span> · Castle Sounds
        </p>
        <div data-ui className="flex items-center gap-3">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} data-beat className="block h-1.5 w-1.5 rounded-full bg-cream/30" />
            ))}
          </span>
          {BPM} BPM
        </div>
      </div>

      {/* the record + title */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 pb-24">
        <div data-disc className="relative aspect-square w-[58vmin] max-w-[340px]">
          <div
            data-disc-spin
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, #120406 0 2px, #1c070a 2px 4px), radial-gradient(circle, #220709, #090203)",
              boxShadow: "0 0 0 1px rgba(237,227,218,0.08), 0 30px 80px rgba(181,34,38,0.25)",
            }}
          >
            {/* sheen so the spin reads */}
            <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0 20%, rgba(237,227,218,0.10) 25%, transparent 32% 70%, rgba(237,227,218,0.07) 75%, transparent 82%)" }} />
            {/* label */}
            <div className="absolute inset-[33%] flex items-center justify-center rounded-full bg-signal">
              <span className="font-display text-[5vmin] leading-none text-ink md:text-2xl">CS</span>
              <span className="absolute h-[9%] w-[9%] rounded-full bg-ink" />
            </div>
          </div>
          {/* count-in / DROP sits on the record */}
          <span
            data-count
            className="absolute inset-0 flex items-center justify-center font-display text-[22vmin] uppercase leading-none text-cream opacity-0"
            style={{ textShadow: "0 0 40px rgba(9,2,3,0.8)" }}
          />
        </div>

        <div data-title className="text-center">
          <p data-ui className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone md:text-[11px]">Now loading</p>
          <p data-ui className="mt-4 font-display text-5xl uppercase leading-[1.05] md:text-6xl">{track}</p>
          <p data-ui className="mt-2 font-serif text-xl italic text-signal md:text-2xl">Castle — original mix</p>
        </div>
      </div>

      {/* bottom: status, waveform, timecode */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:px-8 md:pb-8">
        <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] md:text-[11px]">
          <p data-ui className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            <span className="inline-block overflow-hidden">
              <span data-status className="inline-block">Loading track</span>
              <span className="text-cream/50">…</span>
            </span>
          </p>
          <p data-ui className="text-bone">
            <span data-pct>000</span>%
          </p>
        </div>

        <div data-ui className="relative mt-4 h-12 md:h-16">
          <Waveform className="text-cream/15" />
          <div data-wave-lit className="absolute inset-0 text-signal" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
            <Waveform />
          </div>
          <span data-playhead className="absolute -top-1 -bottom-1 w-px bg-cream" />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 md:text-[11px]">
          <span data-ui data-time>-00:04.8</span>
          <button data-ui onClick={skip} className="pointer-events-auto min-h-[44px] px-2 text-cream/70 hover:text-cream">
            Skip intro →
          </button>
        </div>
      </div>

    </div>
  );
}
