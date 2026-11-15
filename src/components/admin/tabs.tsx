"use client";
import { useRef, useState } from "react";
import type { SiteConfig, Event, GalleryItem, SocialIcon } from "@/data/siteConfig";
import { Field, Text, Area, Btn, Card, SectionHead, uid, move, inputCls } from "./ui";
import { uploadImage } from "./upload";

type Props = { draft: SiteConfig; set: (fn: (c: SiteConfig) => SiteConfig) => void; notify: (msg: string, bad?: boolean) => void };

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "NOV 28" + "2026" ⇄ "2026-11-28" for the date picker */
function toIso(e: Pick<Event, "date" | "year">) {
  const [mon, day] = e.date.split(" ");
  const m = MONTHS.indexOf(mon);
  if (m < 0 || !day || !/^\d{4}$/.test(e.year)) return "";
  return `${e.year}-${String(m + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
}
function fromIso(iso: string): Pick<Event, "date" | "year"> | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return { date: `${MONTHS[Number(m[2]) - 1]} ${m[3]}`, year: m[1] };
}
export function sortEvents(events: Event[]) {
  return [...events].sort((a, b) => toIso(a).localeCompare(toIso(b)));
}

/* ───────────────────────── Events ───────────────────────── */

const EVENT_TYPES = ["Resident set", "Headliner", "Special event", "Back-to-back", "Festival", "Private event", "Open air"];

export function EventsTab({ draft, set }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const update = (id: string, patch: Partial<Event>) =>
    set((c) => ({ ...c, events: c.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  const remove = (id: string) => set((c) => ({ ...c, events: c.events.filter((e) => e.id !== id) }));
  const add = () => {
    const d = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
    set((c) => ({
      ...c,
      events: [
        { id: uid(), ...fromIso(d)!, venue: "", city: "", name: "", type: "Resident set", color: "#B52226" },
        ...c.events,
      ],
    }));
  };

  return (
    <div>
      <SectionHead
        title="Events"
        desc="Shown in “On tour” and used for the countdown (next upcoming date). Sorted by date when you publish."
        action={<Btn variant="solid" onClick={add}>+ Add event</Btn>}
      />
      <datalist id="event-types">{EVENT_TYPES.map((t) => <option key={t} value={t} />)}</datalist>
      {draft.events.length === 0 && <p className="text-sm text-cream/50">No events — the site will say “New dates announced soon”.</p>}
      <div className="grid gap-3">
        {draft.events.map((e) => {
          const iso = toIso(e);
          const past = iso !== "" && iso < today;
          return (
            <Card key={e.id}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-display text-2xl uppercase leading-none">
                  {e.date} <span className="text-cream/40">{e.year}</span>
                  {past && <span className="ml-3 align-middle font-mono text-[10px] tracking-[0.2em] text-bone">PAST</span>}
                </p>
                <Btn variant="danger" onClick={() => confirm(`Delete “${e.name || "this event"}”?`) && remove(e.id)}>Delete</Btn>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
                <Field label="Event name">
                  <Text value={e.name} onChange={(v) => update(e.id, { name: v })} placeholder="Underground Sessions #13" />
                </Field>
                <Field label="Date">
                  <Text type="date" value={iso} onChange={(v) => { const d = fromIso(v); if (d) update(e.id, d); }} />
                </Field>
                <Field label="Venue">
                  <Text value={e.venue} onChange={(v) => update(e.id, { venue: v })} placeholder="Bunker Club" />
                </Field>
                <Field label="City">
                  <Text value={e.city} onChange={(v) => update(e.id, { city: v })} placeholder="Leiria" />
                </Field>
                <Field label="Type">
                  <input list="event-types" value={e.type} onChange={(ev) => update(e.id, { type: ev.target.value })} className={inputCls} />
                </Field>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Photos ───────────────────────── */

function UploadButton({ label, multiple, onFiles, busy }: { label: string; multiple?: boolean; onFiles: (f: File[]) => void; busy: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        multiple={multiple}
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
      <Btn variant="solid" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? "Uploading…" : label}
      </Btn>
    </>
  );
}

export function PhotosTab({ draft, set, notify }: Props) {
  const [busy, setBusy] = useState(false);

  const uploadMany = async (files: File[]) => {
    setBusy(true);
    const added: GalleryItem[] = [];
    for (const f of files) {
      try {
        const url = await uploadImage(f);
        added.push({ id: uid(), src: url, alt: f.name.replace(/\.[^.]+$/, "").slice(0, 60), span: "normal" });
      } catch (err) {
        notify(`${f.name}: ${(err as Error).message}`, true);
      }
    }
    if (added.length) {
      set((c) => ({ ...c, gallery: [...added, ...c.gallery] }));
      notify(`${added.length} photo${added.length > 1 ? "s" : ""} added — press Publish to show them on the site`);
    }
    setBusy(false);
  };

  const uploadAbout = async (files: File[]) => {
    setBusy(true);
    try {
      const url = await uploadImage(files[0]);
      set((c) => ({ ...c, artist: { ...c.artist, photo: url } }));
      notify("About photo replaced — press Publish to show it");
    } catch (err) {
      notify((err as Error).message, true);
    }
    setBusy(false);
  };

  const g = draft.gallery;
  const setGallery = (gallery: GalleryItem[]) => set((c) => ({ ...c, gallery }));
  const aboutPhoto = draft.artist.photo || "/photos/mask-studio.jpg";

  return (
    <div className="grid gap-14">
      <div>
        <SectionHead
          title="Gallery"
          desc="“In the booth” strip. First photo shows first. Upload straight from your phone — big photos are resized automatically."
          action={<UploadButton label="+ Upload photos" multiple busy={busy} onFiles={uploadMany} />}
        />
        {g.length === 0 && <p className="text-sm text-cream/50">No photos — the gallery section is hidden.</p>}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {g.map((item, i) => (
            <div key={item.id} className="flex flex-col border border-cream/10 bg-oxblood/30">
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-2 top-2 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-cream">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <input
                  value={item.alt}
                  onChange={(e) => setGallery(g.map((x) => (x.id === item.id ? { ...x, alt: e.target.value } : x)))}
                  placeholder="Caption"
                  className={`${inputCls} py-1.5 text-sm`}
                />
                <div className="grid grid-cols-3 gap-1">
                  <button title="Move left" onClick={() => setGallery(move(g, i, -1))} disabled={i === 0} className="min-h-[36px] border border-cream/15 text-sm disabled:opacity-30">←</button>
                  <button title="Move right" onClick={() => setGallery(move(g, i, 1))} disabled={i === g.length - 1} className="min-h-[36px] border border-cream/15 text-sm disabled:opacity-30">→</button>
                  <button title="Remove" onClick={() => confirm("Remove this photo from the gallery?") && setGallery(g.filter((x) => x.id !== item.id))} className="min-h-[36px] border border-signal/40 text-sm text-signal">✕</button>
                </div>
                <button
                  onClick={() => { set((c) => ({ ...c, artist: { ...c.artist, photo: item.src } })); notify("Set as About photo — press Publish"); }}
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone hover:text-cream"
                >
                  Use as About photo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHead title="About photo" desc="The portrait next to the bio." />
        <div className="flex flex-wrap items-end gap-5">
          <div className="aspect-[2/3] w-40 overflow-hidden border border-cream/10 bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={aboutPhoto} alt="About" className="h-full w-full object-cover object-top" />
          </div>
          <div className="flex flex-wrap gap-2">
            <UploadButton label="Upload new" busy={busy} onFiles={uploadAbout} />
            {draft.artist.photo && <Btn onClick={() => set((c) => ({ ...c, artist: { ...c.artist, photo: "" } }))}>Use default</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Release & tracks ───────────────────────── */

export function MusicTab({ draft, set }: Props) {
  const ft = draft.featuredTrack;
  const setFt = (patch: Partial<SiteConfig["featuredTrack"]>) => set((c) => ({ ...c, featuredTrack: { ...c.featuredTrack, ...patch } }));
  const t = draft.tracks;
  const setTracks = (tracks: SiteConfig["tracks"]) => set((c) => ({ ...c, tracks }));
  const upd = (id: string, patch: Partial<SiteConfig["tracks"][number]>) => setTracks(t.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  return (
    <div className="grid gap-14">
      <div>
        <SectionHead title="Latest release" desc="Used in the hero, the opening, the marquee and the Sound section. A Spotify link shows the player." />
        <Card>
          <div className="grid gap-3 sm:grid-cols-[1fr_2fr_1fr]">
            <Field label="Title"><Text value={ft.title} onChange={(v) => setFt({ title: v })} /></Field>
            <Field label="Link"><Text value={ft.href} onChange={(v) => setFt({ href: v })} placeholder="https://open.spotify.com/track/…" /></Field>
            <Field label="Platform"><Text value={ft.platform} onChange={(v) => setFt({ platform: v })} placeholder="Spotify" /></Field>
          </div>
        </Card>
      </div>

      <div>
        <SectionHead
          title="Track list"
          action={<Btn variant="solid" onClick={() => setTracks([...t, { id: uid(), title: "", duration: "", bpm: "", genre: "", href: null }])}>+ Add track</Btn>}
        />
        <div className="grid gap-3">
          {t.map((tr, i) => (
            <Card key={tr.id}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.6fr_1.6fr_auto]">
                <Field label="Title"><Text value={tr.title} onChange={(v) => upd(tr.id, { title: v })} /></Field>
                <Field label="Style"><Text value={tr.genre} onChange={(v) => upd(tr.id, { genre: v })} placeholder="Deep house" /></Field>
                <Field label="Length"><Text value={tr.duration} onChange={(v) => upd(tr.id, { duration: v })} placeholder="52:00" /></Field>
                <Field label="Link (optional)"><Text value={tr.href ?? ""} onChange={(v) => upd(tr.id, { href: v || null })} placeholder="https://…" /></Field>
                <div className="flex items-end gap-1">
                  <button onClick={() => setTracks(move(t, i, -1))} disabled={i === 0} className="min-h-[44px] min-w-[40px] border border-cream/15 disabled:opacity-30" title="Move up">↑</button>
                  <button onClick={() => setTracks(move(t, i, 1))} disabled={i === t.length - 1} className="min-h-[44px] min-w-[40px] border border-cream/15 disabled:opacity-30" title="Move down">↓</button>
                  <button onClick={() => confirm("Delete this track?") && setTracks(t.filter((x) => x.id !== tr.id))} className="min-h-[44px] min-w-[40px] border border-signal/40 text-signal" title="Delete">✕</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── About & contact ───────────────────────── */

export function AboutTab({ draft, set }: Props) {
  const a = draft.artist;
  const setA = (patch: Partial<SiteConfig["artist"]>) => set((c) => ({ ...c, artist: { ...c.artist, ...patch } }));
  const setStat = (id: string, patch: Partial<SiteConfig["stats"][number]>) =>
    set((c) => ({ ...c, stats: c.stats.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));

  return (
    <div className="grid gap-14">
      <div>
        <SectionHead title="About & contact" />
        <Card>
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Tagline" hint="Use · between words"><Text value={a.tagline} onChange={(v) => setA({ tagline: v })} /></Field>
              <Field label="Location"><Text value={a.location} onChange={(v) => setA({ location: v })} /></Field>
              <Field label="Booking email"><Text type="email" value={a.bookingEmail} onChange={(v) => setA({ bookingEmail: v })} /></Field>
            </div>
            <Field label="Bio — main paragraph"><Area value={a.bio1} onChange={(v) => setA({ bio1: v })} /></Field>
            <Field label="Bio — second paragraph" hint="The release title becomes a link automatically"><Area value={a.bio2} onChange={(v) => setA({ bio2: v })} rows={3} /></Field>
          </div>
        </Card>
      </div>
      <div>
        <SectionHead title="Numbers" desc="The three big counters under the bio." />
        <div className="grid gap-3 sm:grid-cols-3">
          {draft.stats.map((s) => (
            <Card key={s.id}>
              <div className="grid gap-3">
                <Field label="Number"><Text value={s.value} onChange={(v) => setStat(s.id, { value: v })} placeholder="100+" /></Field>
                <Field label="Label"><Text value={s.label} onChange={(v) => setStat(s.id, { label: v })} /></Field>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Social links ───────────────────────── */

const ICONS: { v: SocialIcon; l: string }[] = [
  { v: "IG", l: "Instagram" }, { v: "SP", l: "Spotify" }, { v: "SC", l: "SoundCloud" }, { v: "YT", l: "YouTube" },
  { v: "TK", l: "TikTok" }, { v: "FB", l: "Facebook" }, { v: "TW", l: "X / Twitter" }, { v: "LI", l: "LinkedIn" }, { v: "BE", l: "Behance" },
];

export function LinksTab({ draft, set }: Props) {
  const s = draft.socials;
  const setS = (socials: SiteConfig["socials"]) => set((c) => ({ ...c, socials }));
  const upd = (id: string, patch: Partial<SiteConfig["socials"][number]>) => setS(s.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  return (
    <div>
      <SectionHead
        title="Social links"
        desc="Shown in the footer. Turn one off to hide it without deleting."
        action={<Btn variant="solid" onClick={() => setS([...s, { id: uid(), label: "Instagram", icon: "IG", href: "https://", active: true }])}>+ Add link</Btn>}
      />
      <div className="grid gap-3">
        {s.map((l) => (
          <Card key={l.id}>
            <div className="grid items-end gap-3 sm:grid-cols-[1fr_2fr_auto_auto]">
              <Field label="Network">
                <select
                  value={l.icon}
                  onChange={(e) => {
                    const icon = e.target.value as SocialIcon;
                    upd(l.id, { icon, label: ICONS.find((x) => x.v === icon)?.l ?? l.label });
                  }}
                  className={inputCls}
                >
                  {ICONS.map((x) => <option key={x.v} value={x.v}>{x.l}</option>)}
                </select>
              </Field>
              <Field label="Link"><Text value={l.href} onChange={(v) => upd(l.id, { href: v })} placeholder="https://instagram.com/…" /></Field>
              <label className="flex min-h-[44px] cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
                <input type="checkbox" checked={l.active} onChange={(e) => upd(l.id, { active: e.target.checked })} className="h-4 w-4 accent-[#B52226]" />
                Visible
              </label>
              <Btn variant="danger" onClick={() => confirm(`Delete ${l.label}?`) && setS(s.filter((x) => x.id !== l.id))}>Delete</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
