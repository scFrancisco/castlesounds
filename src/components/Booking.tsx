"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal, MaskLine } from "@/components/ui";

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
        <MaskLine delay={0.08} className="text-cream">talk</MaskLine>
      </h2>

      <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Direct</p>
          <a
            href={`mailto:${config.artist.bookingEmail}`}
            className="mt-3 inline-block break-all border-b-2 border-ink font-display text-3xl uppercase leading-tight transition-colors hover:border-cream hover:text-cream md:text-4xl"
          >
            {config.artist.bookingEmail}
          </a>
          <p className="mt-8 max-w-xs text-base leading-relaxed">
            Clubs, festivals, private events. Fill out the form and expect a reply within 24 hours.
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
