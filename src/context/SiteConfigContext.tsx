"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SiteConfig, defaultConfig } from "@/data/siteConfig";

const STORAGE_KEY = "castlesounds_config";

interface SiteConfigCtx {
  config: SiteConfig;
  updateConfig: (patch: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigCtx>({
  config: defaultConfig,
  updateConfig: () => {},
  resetConfig: () => {},
  exportConfig: () => {},
});

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SiteConfig>;
        setConfig((prev) => deepMerge(prev, parsed));
      }
    } catch {}
  }, []);

  const updateConfig = useCallback((patch: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const next = deepMerge(prev, patch);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetConfig = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setConfig(defaultConfig);
  }, []);

  const exportConfig = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "castlesounds-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig, exportConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export const useSiteConfig = () => useContext(SiteConfigContext);

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const val = override[key];
    if (val !== undefined) {
      if (Array.isArray(val)) {
        (result[key] as unknown) = val;
      } else if (typeof val === "object" && val !== null && typeof base[key] === "object" && base[key] !== null) {
        (result[key] as unknown) = deepMerge(base[key] as object, val as object);
      } else {
        result[key] = val as T[keyof T];
      }
    }
  }
  return result;
}
