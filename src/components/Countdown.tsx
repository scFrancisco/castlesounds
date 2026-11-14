"use client";
import { useEffect, useState } from "react";
import type { Event } from "@/data/siteConfig";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "NOV 28" + "2026" → that night at 23:00 local time. */
function eventTime(e: Event): number | null {
  const [mon, day] = e.date.trim().toUpperCase().split(/\s+/);
  const m = MONTHS.indexOf(mon?.slice(0, 3));
  const d = parseInt(day, 10);
  const y = parseInt(e.year, 10);
  if (m < 0 || !d || !y) return null;
  return new Date(y, m, d, 23, 0, 0).getTime();
}

function Unit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <span className="flex overflow-hidden font-display text-[19vw] leading-[0.9] tabular-nums md:text-[11vw]">
        {v.split("").map((c, i) => (
          <span key={`${i}-${c}`} className="inline-block animate-[indexIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">{c}</span>
        ))}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone md:text-[11px]">{label}</span>
    </div>
  );
}

/** Big countdown to the next date on the calendar — renders nothing if none is upcoming. */
export default function Countdown({ events }: { events: Event[] }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);

  if (now === null) return null;
  const next = events
    .map((e) => ({ e, t: eventTime(e) }))
    .filter((x): x is { e: Event; t: number } => x.t !== null && x.t > now)
    .sort((a, b) => a.t - b.t)[0];
  if (!next) return null;

  let s = Math.floor((next.t - now) / 1000);
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;

  return (
    <div className="border-y border-cream/15 py-10 md:py-16">
      <div className="flex items-start justify-center gap-[2vw]">
        <Unit value={d} label="Days" />
        <span className="font-display text-[12vw] leading-[0.9] text-signal md:text-[7vw]">:</span>
        <Unit value={h} label="Hours" />
        <span className="font-display text-[12vw] leading-[0.9] text-signal md:text-[7vw]">:</span>
        <Unit value={m} label="Min" />
        <span className="font-display text-[12vw] leading-[0.9] text-signal md:text-[7vw]">:</span>
        <Unit value={s} label="Sec" />
      </div>
      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70 md:text-[11px]">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal align-middle" />
        Next set · {next.e.name} · {next.e.venue}, {next.e.city}
      </p>
    </div>
  );
}
