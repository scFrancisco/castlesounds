"use client";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import AdminEvents from "./AdminEvents";
import AdminGallery from "./AdminGallery";
import AdminLinks from "./AdminLinks";
import AdminAbout from "./AdminAbout";
import AdminSound from "./AdminSound";

const ADMIN_PASSWORD = "castle2025";

const tabs = [
  { id: "about", label: "About & Bio" },
  { id: "sound", label: "Sound" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "links", label: "Social Links" },
];

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const { exportConfig, resetConfig } = useSiteConfig();

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#080806] grid-bg flex items-center justify-center px-4">
        <div className="glass border border-[#C9922A]/20 rounded-2xl p-10 w-full max-w-sm">
          <p className="font-['Cinzel'] font-bold text-2xl text-[#C9922A] glow-gold text-center mb-2">CASTLESOUNDS</p>
          <p className="font-['Space_Grotesk'] text-xs text-[#5A5550] tracking-[0.3em] text-center mb-8">ADMIN PANEL</p>

          <label className="font-['Space_Grotesk'] text-[10px] tracking-[0.25em] text-[#5A5550] block mb-2">
            PASSWORD
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (pw === ADMIN_PASSWORD) setAuthed(true);
                else setPwError(true);
              }
            }}
            placeholder="Enter password"
            className={`w-full bg-[#EDE8DF]/[0.03] border ${pwError ? "border-[#9B1C1C]/60" : "border-[#EDE8DF]/8"} focus:border-[#C9922A]/50 focus:outline-none focus:ring-1 focus:ring-[#C9922A]/20 rounded-lg px-4 py-3 text-sm font-['Space_Grotesk'] text-[#EDE8DF] placeholder-[#5A5550] transition-all mb-2`}
          />
          {pwError && <p className="font-['Space_Grotesk'] text-xs text-[#9B1C1C] mb-4">Wrong password</p>}

          <button
            onClick={() => {
              if (pw === ADMIN_PASSWORD) setAuthed(true);
              else setPwError(true);
            }}
            className="w-full mt-4 py-3 bg-[#C9922A] hover:bg-[#E4B55A] text-[#080806] font-['Space_Grotesk'] font-semibold text-sm tracking-[0.2em] transition-all rounded-sm"
          >
            ENTER
          </button>

          <a href="/" className="block text-center mt-6 font-['Space_Grotesk'] text-xs text-[#5A5550] hover:text-[#C9922A] transition-colors">
            ← Back to site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080806] text-[#EDE8DF]">
      {/* Admin header */}
      <header className="glass border-b border-[#C9922A]/10 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-['Cinzel'] font-black text-lg text-[#C9922A] glow-gold">
              CASTLESOUNDS
            </a>
            <span className="font-['Space_Grotesk'] text-[10px] tracking-[0.3em] text-[#5A5550]">/ ADMIN</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportConfig}
              className="px-4 py-2 glass border border-[#4E8FA0]/30 text-[#4E8FA0] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#4E8FA0]/10 transition-all rounded-sm"
            >
              EXPORT JSON
            </button>
            <button
              onClick={() => { if (confirm("Reset all changes to defaults?")) resetConfig(); }}
              className="px-4 py-2 glass border border-[#9B1C1C]/30 text-[#9B1C1C] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#9B1C1C]/10 transition-all rounded-sm"
            >
              RESET
            </button>
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 glass border border-[#C9922A]/30 text-[#C9922A] text-xs font-['Space_Grotesk'] tracking-[0.1em] hover:bg-[#C9922A]/10 transition-all rounded-sm"
            >
              VIEW SITE ↗
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 mb-10 glass border border-[#C9922A]/10 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-xs font-['Space_Grotesk'] tracking-[0.1em] transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#C9922A] text-[#080806] font-semibold"
                  : "text-[#5A5550] hover:text-[#EDE8DF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "about" && <AdminAbout />}
        {activeTab === "sound" && <AdminSound />}
        {activeTab === "events" && <AdminEvents />}
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "links" && <AdminLinks />}
      </div>
    </div>
  );
}
