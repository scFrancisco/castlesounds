"use client";
import { createContext, useContext, useEffect } from "react";
import { SiteConfig, defaultConfig } from "@/data/siteConfig";

// key used by the old browser-only admin; cleared so stale local edits can't override the site
const LEGACY_KEY = "castlesounds_config";

const SiteConfigContext = createContext<{ config: SiteConfig }>({ config: defaultConfig });

/** Provides the published site content (read on the server) to client components. */
export function SiteConfigProvider({ config, children }: { config: SiteConfig; children: React.ReactNode }) {
  useEffect(() => {
    try { localStorage.removeItem(LEGACY_KEY); } catch {}
  }, []);
  return <SiteConfigContext.Provider value={{ config }}>{children}</SiteConfigContext.Provider>;
}

export const useSiteConfig = () => useContext(SiteConfigContext);
