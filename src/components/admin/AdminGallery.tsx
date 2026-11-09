"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { GalleryItem } from "@/data/siteConfig";
import { Field, SaveBar, iClass } from "./AdminAbout";

function newItem(): GalleryItem {
  return { id: `g${Date.now()}`, src: "", alt: "", span: "normal" };
}

export default function AdminGallery() {
  const { config, updateConfig } = useSiteConfig();
  const [gallery, setGallery] = useState<GalleryItem[]>([...config.gallery]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ gallery });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, patch: Partial<GalleryItem>) =>
    setGallery(gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const remove = (id: string) => setGallery(gallery.filter((g) => g.id !== id));

  const uploadFile = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) update(id, { src: ev.target.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <p className="font-['Space_Grotesk'] text-xs text-[#726E6A]">{gallery.length} photos</p>
        <button
          onClick={() => setGallery([...gallery, newItem()])}
          className="px-4 py-2 glass border border-[#C8A050]/30 text-[#C8A050] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#C8A050]/10 transition-all rounded-sm"
        >
          + ADD PHOTO
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="glass border border-[#EEE8DF]/5 hover:border-[#C8A050]/15 rounded-xl p-5 transition-all space-y-3">
            {/* Preview */}
            <div
              className="relative rounded-lg overflow-hidden border border-[#EEE8DF]/5 flex items-center justify-center bg-[#EEE8DF]/[0.02]"
              style={{ aspectRatio: item.span === "wide" ? "16/9" : "1" }}
            >
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="mx-auto opacity-20 mb-1">
                    <rect x="2" y="6" width="26" height="18" rx="2" stroke="#C8A050" strokeWidth="1.5"/>
                    <circle cx="10" cy="12" r="2.5" stroke="#C8A050" strokeWidth="1.5"/>
                    <path d="M2 20L9 14L14 19L21 13L28 20" stroke="#C8A050" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-['Space_Grotesk'] text-[9px] text-[#726E6A]">No image</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <Field label="IMAGE URL">
              <input
                value={item.src}
                onChange={(e) => update(item.id, { src: e.target.value })}
                placeholder="https://… or upload below"
                className={iClass}
              />
            </Field>

            <div>
              <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#726E6A] block mb-1">UPLOAD FILE</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(item.id, f); }}
                className="font-['Space_Grotesk'] text-xs text-[#726E6A] file:mr-2 file:py-1 file:px-3 file:rounded-sm file:border-0 file:bg-[#C8A050]/20 file:text-[#C8A050] file:font-['Space_Grotesk'] file:text-xs hover:file:bg-[#C8A050]/30 file:cursor-pointer"
              />
            </div>

            <Field label="ALT TEXT / CAPTION">
              <input value={item.alt} onChange={(e) => update(item.id, { alt: e.target.value })} placeholder="Live Set at Bunker Club" className={iClass} />
            </Field>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#726E6A] block mb-1">SPAN</label>
                <div className="flex gap-2">
                  {(["normal", "wide"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => update(item.id, { span: s })}
                      className={`px-3 py-1 rounded-sm text-xs font-['Space_Grotesk'] tracking-widest transition-all ${item.span === s ? "bg-[#C8A050] text-[#09090B]" : "glass border border-[#EEE8DF]/10 text-[#726E6A]"}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-xs font-['Space_Grotesk'] text-[#C8A050] hover:text-[#ff4444] transition-colors"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      <SaveBar saved={saved} onSave={save} />
    </div>
  );
}
