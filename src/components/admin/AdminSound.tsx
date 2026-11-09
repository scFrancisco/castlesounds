"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Track } from "@/data/siteConfig";
import { Field, SaveBar, iClass } from "./AdminAbout";

function newTrack(): Track {
  return { id: `t${Date.now()}`, title: "", duration: "—", bpm: "—", genre: "", href: null };
}

export default function AdminSound() {
  const { config, updateConfig } = useSiteConfig();
  const [featured, setFeatured] = useState({ ...config.featuredTrack });
  const [tracks, setTracks] = useState<Track[]>([...config.tracks]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ featuredTrack: featured, tracks });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateTrack = (id: string, patch: Partial<Track>) =>
    setTracks(tracks.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const removeTrack = (id: string) => setTracks(tracks.filter((t) => t.id !== id));

  return (
    <div className="space-y-10">
      {/* Featured track */}
      <div>
        <h3 className="font-['Cinzel'] font-semibold text-[#C9922A] text-sm tracking-widest mb-4 pb-2 border-b border-[#C9922A]/15">
          Featured Release
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="TRACK TITLE">
            <input value={featured.title} onChange={(e) => setFeatured({ ...featured, title: e.target.value })} className={iClass} />
          </Field>
          <Field label="PLATFORM">
            <input value={featured.platform} onChange={(e) => setFeatured({ ...featured, platform: e.target.value })} placeholder="Spotify" className={iClass} />
          </Field>
          <Field label="LINK URL">
            <input value={featured.href} onChange={(e) => setFeatured({ ...featured, href: e.target.value })} placeholder="https://open.spotify.com/…" className={iClass} />
          </Field>
        </div>
      </div>

      {/* Track list */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C9922A]/15">
          <h3 className="font-['Cinzel'] font-semibold text-[#C9922A] text-sm tracking-widest">Track List</h3>
          <button
            onClick={() => setTracks([...tracks, newTrack()])}
            className="px-4 py-2 glass border border-[#C9922A]/30 text-[#C9922A] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#C9922A]/10 transition-all rounded-sm"
          >
            + ADD TRACK
          </button>
        </div>
        <div className="space-y-4">
          {tracks.map((track, i) => (
            <div key={track.id} className="glass border border-[#EDE8DF]/5 hover:border-[#C9922A]/15 rounded-xl p-5 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Cinzel'] text-xs text-[#C9922A] tracking-widest">TRACK {i + 1}</span>
                <button onClick={() => removeTrack(track.id)} className="text-xs font-['Space_Grotesk'] text-[#9B1C1C] hover:text-[#ff4444]">
                  REMOVE
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="TITLE">
                  <input value={track.title} onChange={(e) => updateTrack(track.id, { title: e.target.value })} className={iClass} />
                </Field>
                <Field label="GENRE">
                  <input value={track.genre} onChange={(e) => updateTrack(track.id, { genre: e.target.value })} placeholder="HOUSE DJ MIX" className={iClass} />
                </Field>
                <Field label="DURATION">
                  <input value={track.duration} onChange={(e) => updateTrack(track.id, { duration: e.target.value })} placeholder="45:00" className={iClass} />
                </Field>
                <Field label="BPM">
                  <input value={track.bpm} onChange={(e) => updateTrack(track.id, { bpm: e.target.value })} placeholder="128 BPM or MIXED" className={iClass} />
                </Field>
                <Field label="LINK (optional)">
                  <input
                    value={track.href ?? ""}
                    onChange={(e) => updateTrack(track.id, { href: e.target.value || null })}
                    placeholder="https://open.spotify.com/…"
                    className={`${iClass} sm:col-span-2`}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar saved={saved} onSave={save} />
    </div>
  );
}
