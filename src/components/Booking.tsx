"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const eventTypes = [
  "Club Night",
  "Private Party",
  "Festival",
  "Corporate Event",
  "Wedding",
  "Open Air",
  "Live Stream",
  "Other",
];

const capacities = ["< 100", "100–300", "300–600", "600–1000", "1000+"];

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
    <section id="booking" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="orb w-[500px] h-[500px] bg-[#b06dff]/10 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-['Space_Grotesk'] text-xs tracking-[0.4em] text-[#b06dff] uppercase mb-4 block">
            Book CastleSounds
          </span>
          <h2 className="font-['Orbitron'] font-bold text-4xl md:text-5xl text-white mb-4">
            LET&apos;S <span className="neon-text text-[#b06dff]">CREATE</span>
          </h2>
          <p className="font-['Space_Grotesk'] text-[#6b6b8a] max-w-sm mx-auto">
            Fill out the form below and expect a reply within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass border border-white/7 rounded-2xl p-8 md:p-10"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#b06dff] flex items-center justify-center mx-auto mb-6 shadow-neon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14L11 20L23 8" stroke="#b06dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-['Orbitron'] font-bold text-2xl text-white mb-3">Message Sent!</h3>
              <p className="font-['Space_Grotesk'] text-[#6b6b8a] mb-8">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-3 glass border border-[#b06dff]/30 text-[#b06dff] text-sm font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#b06dff]/10 transition-all rounded-sm"
              >
                SEND ANOTHER
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="YOUR NAME *" error={errors.name?.message}>
                  <input {...register("name")} placeholder="e.g. João Silva" className={inputClass} />
                </Field>
                <Field label="EMAIL ADDRESS *" error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="you@email.com" className={inputClass} />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="PHONE (OPTIONAL)" error={errors.phone?.message}>
                  <input {...register("phone")} placeholder="+351 9xx xxx xxx" className={inputClass} />
                </Field>
                <Field label="EVENT DATE *" error={errors.eventDate?.message}>
                  <input {...register("eventDate")} type="date" className={`${inputClass} [color-scheme:dark]`} />
                </Field>
              </div>

              {/* Row 3 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="EVENT TYPE *" error={errors.eventType?.message}>
                  <select {...register("eventType")} className={selectClass} defaultValue="">
                    <option value="" disabled>Select type…</option>
                    {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="EXPECTED CAPACITY *" error={errors.capacity?.message}>
                  <select {...register("capacity")} className={selectClass} defaultValue="">
                    <option value="" disabled>Select range…</option>
                    {capacities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              {/* Venue */}
              <Field label="VENUE / LOCATION *" error={errors.venue?.message}>
                <input {...register("venue")} placeholder="e.g. Warehouse Leiria, R. das Fábricas" className={inputClass} />
              </Field>

              {/* Message */}
              <Field label="TELL ME ABOUT YOUR EVENT *" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Describe the event, expected crowd, any specific requirements, budget range…"
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Error banner */}
              {status === "error" && (
                <p className="text-sm font-['Space_Grotesk'] text-[#ff2d78] text-center">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-[#b06dff] hover:bg-[#c490ff] disabled:bg-[#b06dff]/40 text-black font-['Space_Grotesk'] font-semibold text-sm tracking-[0.2em] transition-all duration-300 hover:shadow-neon rounded-sm flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING…
                  </>
                ) : "SEND BOOKING REQUEST"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Direct contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="font-['Space_Grotesk'] text-xs text-[#6b6b8a]">
            Prefer direct contact? Email{" "}
            <a href="mailto:booking@castlesounds.pt" className="text-[#b06dff] hover:underline">
              booking@castlesounds.pt
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#6b6b8a]">{label}</label>
      {children}
      {error && <span className="font-['Space_Grotesk'] text-xs text-[#ff2d78]">{error}</span>}
    </div>
  );
}

const inputClass =
  "bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#b06dff]/50 focus:outline-none focus:ring-1 focus:ring-[#b06dff]/20 rounded-lg px-4 py-3 text-sm font-['Space_Grotesk'] text-white placeholder-[#6b6b8a] transition-all duration-200 w-full";

const selectClass =
  "bg-[#0d0d1a] border border-white/8 hover:border-white/15 focus:border-[#b06dff]/50 focus:outline-none focus:ring-1 focus:ring-[#b06dff]/20 rounded-lg px-4 py-3 text-sm font-['Space_Grotesk'] text-white transition-all duration-200 w-full";
