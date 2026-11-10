"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { SocialLink, SocialIcon } from "@/data/siteConfig";
import { Field, SaveBar, iClass } from "./AdminAbout";

const allIcons: { icon: SocialIcon; label: string }[] = [
  { icon: "IG", label: "Instagram" },
  { icon: "SP", label: "Spotify" },
  { icon: "SC", label: "SoundCloud" },
  { icon: "YT", label: "YouTube" },
  { icon: "TK", label: "TikTok" },
  { icon: "FB", label: "Facebook" },
  { icon: "TW", label: "X / Twitter" },
  { icon: "BE", label: "Behance" },
  { icon: "LI", label: "LinkedIn" },
];

function newLink(): SocialLink {
  return { id: `l${Date.now()}`, label: "", icon: "IG", href: "", active: true };
}

export default function AdminLinks() {
  const { config, updateConfig } = useSiteConfig();
  const [socials, setSocials] = useState<SocialLink[]>([...config.socials]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ socials });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (id: string, patch: Partial<SocialLink>) =>
    setSocials(socials.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const remove = (id: string) => setSocials(socials.filter((s) => s.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <p className="font-['Space_Grotesk'] text-xs text-[#5A5460]">{socials.length} links</p>
        <button
          onClick={() => setSocials([...socials, newLink()])}
          className="px-4 py-2 glass border border-[#C41E3A]/30 text-[#C41E3A] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#C41E3A]/10 transition-all rounded-sm"
        >
          + ADD LINK
        </button>
      </div>

      {socials.map((link, i) => (
        <div key={link.id} className="glass border border-[#F0ECEA]/5 hover:border-[#C41E3A]/15 rounded-xl p-5 space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-['Bebas_Neue'] text-xs text-[#C41E3A] tracking-widest">LINK {i + 1}</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => update(link.id, { active: !link.active })}
                  className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${link.active ? "bg-[#C41E3A]" : "bg-[#5A5460]/30"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${link.active ? "left-5" : "left-0.5"}`}
                  />
                </div>
                <span className="font-['Space_Grotesk'] text-xs text-[#5A5460]">{link.active ? "Visible" : "Hidden"}</span>
              </label>
              <button onClick={() => remove(link.id)} className="text-xs font-['Space_Grotesk'] text-[#C41E3A] hover:text-[#ff4444]">
                REMOVE
              </button>
            </div>
          </div>

          {/* Icon picker */}
          <div>
            <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#5A5460] block mb-2">ICON</label>
            <div className="flex flex-wrap gap-2">
              {allIcons.map(({ icon, label }) => (
                <button
                  key={icon}
                  onClick={() => update(link.id, { icon, label })}
                  title={label}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center font-['Bebas_Neue'] text-xs transition-all ${
                    link.icon === icon
                      ? "border-[#C41E3A] bg-[#C41E3A]/15 text-[#C41E3A]"
                      : "border-[#F0ECEA]/10 text-[#5A5460] hover:border-[#C41E3A]/30 hover:text-[#F0ECEA]"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="LABEL">
              <input value={link.label} onChange={(e) => update(link.id, { label: e.target.value })} placeholder="Instagram" className={iClass} />
            </Field>
            <Field label="URL">
              <input value={link.href} onChange={(e) => update(link.id, { href: e.target.value })} placeholder="https://…" className={iClass} />
            </Field>
          </div>
        </div>
      ))}

      <SaveBar saved={saved} onSave={save} />
    </div>
  );
}
