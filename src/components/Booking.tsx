"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal, MaskLine, RollText } from "@/components/ui";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please provide a date"),
  venue: z.string().min(2, "Please describe the venue"),
  capacity: z.string().min(1, "Please select expected capacity"),
  message: z.string().min(10, "Tell me more about the event (min 10 chars)"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "sending" | "success" | "error";

const eventTypes = ["Club Night", "Private Party", "Festival", "Corporate Event", "Wedding", "Open Air", "Live Stream", "Other"];
const capacities = ["< 100", "100–300", "300–600", "600–1000", "1000+"];

const topics = [
  { title: "Clubs & festivals", desc: "Residencies, club nights, open airs and festival slots.", subject: "Booking — club / festival" },
  { title: "Private events", desc: "Weddings, brand launches, rooftops and private parties.", subject: "Booking — private event" },
  { title: "Press & collabs", desc: "Interviews, remixes, mixes and brand partnerships.", subject: "Press / collaboration" },
];

export default function Booking() {
  const { config } = useSiteConfig();
  const [status, setStatus] = useState<Status>("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="booking" className="relative bg-signal px-4 py-24 text-ink md:px-8 md:py-36">
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span>(05)</span>
        <span>Booking</span>
        <span className="h-px flex-1 bg-ink/25" />
      </div>

      <h2 className="mt-10 font-display text-[22vw] uppercase leading-[0.82] md:mt-16 md:text-[13vw]">
        <MaskLine>Let&apos;s</MaskLine>
        <MaskLine delay={0.08} className="accent pb-[0.1em] pr-[0.1em] !text-cream">talk.</MaskLine>
      </h2>

      <ul className="mt-14 border-t border-ink/25 md:mt-20">
        {topics.map((t, i) => (
          <Reveal as="li" key={t.title} delay={i * 0.06} y={20} className="border-b border-ink/25">
            <a
              href={`mailto:${config.artist.bookingEmail}?subject=${encodeURIComponent(t.subject)}`}
              className="roll-host group grid grid-cols-[1fr_auto] items-center gap-4 py-5 md:grid-cols-[1fr_1fr_auto] md:py-7"
            >
              <span className="font-display text-4xl uppercase leading-none md:text-6xl">
                <RollText text={t.title} />
              </span>
              <span className="hidden text-base md:block">{t.desc}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/40 text-lg transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-cream md:h-14 md:w-14">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <BoothRadio />
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Direct</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${config.artist.bookingEmail}`}
              className="break-all border-b-2 border-ink font-display text-3xl uppercase leading-tight transition-colors hover:border-cream hover:text-cream md:text-4xl"
            >
              {config.artist.bookingEmail}
            </a>
            <CopyButton text={config.artist.bookingEmail} />
          </div>
          <p className="mt-8 max-w-xs text-base leading-relaxed">
            Or fill out the form and expect a reply within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          {status === "success" ? (
            <div className="border-t-2 border-ink py-16">
              <p className="font-display text-5xl uppercase leading-none md:text-7xl">Message sent.</p>
              <p className="mt-6 max-w-sm">Thanks for reaching out — Castle will get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-10 border-b-2 border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-cream hover:text-cream"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              <Field label="Name *" error={errors.name?.message}>
                <input {...register("name")} placeholder="João Silva" className={inputClass} />
              </Field>
              <Field label="Email *" error={errors.email?.message}>
                <input {...register("email")} type="email" placeholder="you@email.com" className={inputClass} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} placeholder="+351 9xx xxx xxx" className={inputClass} />
              </Field>
              <Field label="Event date *" error={errors.eventDate?.message}>
                <input {...register("eventDate")} type="date" className={inputClass} />
              </Field>
              <Field label="Event type *" error={errors.eventType?.message}>
                <select {...register("eventType")} className={inputClass} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Capacity *" error={errors.capacity?.message}>
                <select {...register("capacity")} className={inputClass} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {capacities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Venue / location *" error={errors.venue?.message}>
                  <input {...register("venue")} placeholder="Bunker Club, Leiria" className={inputClass} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="About the event *" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Expected crowd, set length, technical setup…"
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>

              {status === "error" && (
                <p className="font-mono text-xs uppercase tracking-[0.15em] sm:col-span-2">
                  Something went wrong — email {config.artist.bookingEmail} directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center justify-between bg-ink px-6 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-60 sm:col-span-2"
              >
                {status === "sending" ? "Sending…" : "Send booking request"}
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{label}</span>
      {children}
      {error && <span className="font-mono text-[11px] text-cream">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full appearance-none rounded-none border-0 border-b border-ink/40 bg-transparent px-0 py-2 text-lg text-ink placeholder-ink/40 transition-colors focus:border-ink focus:outline-none [color-scheme:light]";

/** "Booth radio:" line typed out once it scrolls into view, with a blinking caret. */
function BoothRadio() {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const text = "One more track.";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = text;
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let i = 0;
      const type = () => {
        node.textContent = text.slice(0, ++i);
        if (i < text.length) timer = setTimeout(type, 70 + Math.random() * 60);
      };
      timer = setTimeout(type, 400);
    });
    io.observe(node);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">— Booth radio</p>
      <p className="mt-2 font-mono text-lg">
        <span ref={el} />
        <span className="caret ml-1" />
      </p>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className="rounded-full border border-ink/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-cream"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
