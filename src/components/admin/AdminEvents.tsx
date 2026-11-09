"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Event } from "@/data/siteConfig";
import { Field, SaveBar, iClass } from "./AdminAbout";

const colorPresets = ["#C9922A", "#4E8FA0", "#9B1C1C", "#EDE8DF", "#6B6B4A"];

function newEvent(): Event {
  return {
    id: `e${Date.now()}`,
    date: "",
    year: new Date().getFullYear().toString(),
    venue: "",
    city: "",
    name: "",
    type: "RESIDENT SET",
    color: "#C9922A",
  };
}

export default function AdminEvents() {
  const { config, updateConfig } = useSiteConfig();
  const [events, setEvents] = useState<Event[]>([...config.events]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ events });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const add = () => setEvents([...events, newEvent()]);

  const remove = (id: string) => setEvents(events.filter((e) => e.id !== id));

  const update = (id: string, patch: Partial<Event>) =>
    setEvents(events.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <p className="font-['Space_Grotesk'] text-xs text-[#5A5550]">
          {events.length} event{events.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={add}
          className="px-4 py-2 glass border border-[#C9922A]/30 text-[#C9922A] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#C9922A]/10 transition-all rounded-sm"
        >
          + ADD EVENT
        </button>
      </div>

      {events.length === 0 && (
        <div className="glass border border-[#EDE8DF]/5 rounded-2xl p-10 text-center">
          <p className="font-['Space_Grotesk'] text-sm text-[#5A5550]">No events yet. Click Add Event to start.</p>
        </div>
      )}

      {events.map((event, i) => (
        <div key={event.id} className="glass border border-[#EDE8DF]/5 hover:border-[#C9922A]/15 rounded-2xl p-6 transition-all">
          <div className="flex items-center justify-between mb-5">
            <span className="font-['Cinzel'] text-xs text-[#C9922A] tracking-widest">EVENT {i + 1}</span>
            <button
              onClick={() => remove(event.id)}
              className="text-xs font-['Space_Grotesk'] text-[#9B1C1C] hover:text-[#ff4444] transition-colors"
            >
              REMOVE
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="NAME">
              <input value={event.name} onChange={(e) => update(event.id, { name: e.target.value })} placeholder="UNDERGROUND SESSIONS #12" className={iClass} />
            </Field>
            <Field label="TYPE">
              <input value={event.type} onChange={(e) => update(event.id, { type: e.target.value })} placeholder="RESIDENT SET" className={iClass} />
            </Field>
            <Field label="DATE (e.g. NOV 22)">
              <input value={event.date} onChange={(e) => update(event.id, { date: e.target.value })} placeholder="NOV 22" className={iClass} />
            </Field>
            <Field label="YEAR">
              <input value={event.year} onChange={(e) => update(event.id, { year: e.target.value })} placeholder="2025" className={iClass} />
            </Field>
            <Field label="VENUE">
              <input value={event.venue} onChange={(e) => update(event.id, { venue: e.target.value })} placeholder="Bunker Club" className={iClass} />
            </Field>
            <Field label="CITY">
              <input value={event.city} onChange={(e) => update(event.id, { city: e.target.value })} placeholder="Leiria" className={iClass} />
            </Field>
          </div>
          <div className="mt-4">
            <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#5A5550] block mb-2">ACCENT COLOR</label>
            <div className="flex items-center gap-3">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => update(event.id, { color: c })}
                  className="w-7 h-7 rounded-full border-2 transition-all"
                  style={{
                    background: c,
                    borderColor: event.color === c ? "#EDE8DF" : "transparent",
                  }}
                  title={c}
                />
              ))}
              <input
                type="color"
                value={event.color}
                onChange={(e) => update(event.id, { color: e.target.value })}
                className="w-8 h-8 rounded-full border border-[#EDE8DF]/20 cursor-pointer bg-transparent"
              />
              <span className="font-['Space_Grotesk'] text-xs text-[#5A5550]">{event.color}</span>
            </div>
          </div>
        </div>
      ))}

      <SaveBar saved={saved} onSave={save} />
    </div>
  );
}
