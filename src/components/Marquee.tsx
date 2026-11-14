"use client";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Marquee() {
  const { config } = useSiteConfig();
  const items = [
    "Castle Sounds",
    "House Music",
    config.artist.location,
    `${config.featuredTrack.title} out now`,
    "Bookings open",
  ];
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink bg-signal py-3 text-ink md:py-4" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-2xl uppercase md:text-4xl">
                <span className="px-5 md:px-8">{t}</span>
                <span className="text-sm md:text-base">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
