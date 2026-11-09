"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function AdminAbout() {
  const { config, updateConfig } = useSiteConfig();
  const [form, setForm] = useState({ ...config.artist });
  const [stats, setStats] = useState([...config.stats]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ artist: form, stats });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-10">
      <Section title="Artist Info">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="ARTIST NAME">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={iClass} />
          </Field>
          <Field label="TAGLINE">
            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={iClass} />
          </Field>
          <Field label="LOCATION">
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={iClass} />
          </Field>
          <Field label="BOOKING EMAIL">
            <input value={form.bookingEmail} onChange={(e) => setForm({ ...form, bookingEmail: e.target.value })} className={iClass} />
          </Field>
        </div>
      </Section>

      <Section title="Artist Photo">
        <p className="font-['Space_Grotesk'] text-xs text-[#5A5550] mb-3">
          Paste an image URL, or use a base64 data URI for uploaded images.
        </p>
        <Field label="PHOTO URL">
          <input
            value={form.photo}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
            placeholder="https://… or /photos/mask-closeup.png"
            className={iClass}
          />
        </Field>
        {form.photo && (
          <div className="mt-3 w-32 h-36 rounded-xl overflow-hidden border border-[#C9922A]/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.photo} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="mt-3">
          <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#5A5550] block mb-2">
            OR UPLOAD FROM COMPUTER
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                if (ev.target?.result) setForm({ ...form, photo: ev.target.result as string });
              };
              reader.readAsDataURL(file);
            }}
            className="font-['Space_Grotesk'] text-xs text-[#5A5550] file:mr-3 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:bg-[#C9922A]/20 file:text-[#C9922A] file:font-['Space_Grotesk'] file:text-xs file:tracking-widest hover:file:bg-[#C9922A]/30 file:cursor-pointer"
          />
        </div>
      </Section>

      <Section title="Bio Text">
        <Field label="PARAGRAPH 1">
          <textarea value={form.bio1} onChange={(e) => setForm({ ...form, bio1: e.target.value })} rows={3} className={`${iClass} resize-none`} />
        </Field>
        <Field label="PARAGRAPH 2">
          <textarea value={form.bio2} onChange={(e) => setForm({ ...form, bio2: e.target.value })} rows={3} className={`${iClass} resize-none`} />
        </Field>
      </Section>

      <Section title="Stats">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={s.id} className="glass border border-[#EDE8DF]/5 rounded-xl p-4 space-y-3">
              <Field label="VALUE">
                <input
                  value={s.value}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i] = { ...next[i], value: e.target.value };
                    setStats(next);
                  }}
                  className={iClass}
                />
              </Field>
              <Field label="LABEL">
                <input
                  value={s.label}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i] = { ...next[i], label: e.target.value };
                    setStats(next);
                  }}
                  className={iClass}
                />
              </Field>
            </div>
          ))}
        </div>
      </Section>

      <SaveBar saved={saved} onSave={save} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-['Cinzel'] font-semibold text-[#C9922A] text-sm tracking-widest mb-4 pb-2 border-b border-[#C9922A]/15">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#5A5550]">{label}</label>
      {children}
    </div>
  );
}

export function SaveBar({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-[#EDE8DF]/5">
      {saved && (
        <span className="font-['Space_Grotesk'] text-xs text-[#4E8FA0]">✓ Saved to browser storage</span>
      )}
      <div className="ml-auto">
        <button
          onClick={onSave}
          className="px-8 py-3 bg-[#C9922A] hover:bg-[#E4B55A] text-[#080806] font-['Space_Grotesk'] font-semibold text-sm tracking-[0.15em] transition-all rounded-sm"
        >
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
}

export const iClass =
  "bg-[#EDE8DF]/[0.03] border border-[#EDE8DF]/8 hover:border-[#EDE8DF]/15 focus:border-[#C9922A]/50 focus:outline-none focus:ring-1 focus:ring-[#C9922A]/20 rounded-lg px-4 py-2.5 text-sm font-['Space_Grotesk'] text-[#EDE8DF] placeholder-[#5A5550] transition-all w-full";
