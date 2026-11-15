"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/data/siteConfig";
import { Btn } from "./ui";
import { EventsTab, PhotosTab, MusicTab, AboutTab, LinksTab, sortEvents } from "./tabs";

type Session = { authed: boolean; enabled: boolean } | null;
type Toast = { msg: string; bad?: boolean; id: number } | null;

const TABS = [
  { id: "events", label: "Events" },
  { id: "photos", label: "Photos" },
  { id: "music", label: "Release" },
  { id: "about", label: "About" },
  { id: "links", label: "Links" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function AdminApp() {
  const [session, setSession] = useState<Session>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/session", { cache: "no-store" });
      setSession(await r.json());
    } catch {
      setSession({ authed: false, enabled: true });
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(refresh, 0);
    return () => clearTimeout(t);
  }, [refresh]);

  if (!session) return <Shell><p className="font-mono text-xs uppercase tracking-[0.2em] text-bone">Loading…</p></Shell>;
  if (!session.authed) return <Login enabled={session.enabled} onDone={refresh} />;
  return <Panel onLogout={refresh} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[100svh] items-center justify-center bg-ink px-4 text-cream">{children}</div>;
}

/* ───────────── Login ───────────── */

function Login({ enabled, onDone }: { enabled: boolean; onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) return onDone();
      setErr((await r.json().catch(() => ({}))).error || "Login failed");
    } catch {
      setErr("Network error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell>
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="font-display text-5xl uppercase leading-none">Castle</p>
        <p className="accent mt-1 text-3xl">backstage.</p>
        {!enabled ? (
          <p className="mt-10 border-l-2 border-signal pl-3 text-sm text-cream/70">
            Admin is switched off: set the <code className="font-mono">ADMIN_PASSWORD</code> variable on the server.
          </p>
        ) : (
          <>
            <label className="mt-10 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone" htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(""); }}
              className="mt-2 w-full border-0 border-b border-cream/30 bg-transparent px-0 py-2 text-lg text-cream focus:border-signal focus:outline-none"
            />
            {err && <p role="alert" className="mt-3 text-sm text-signal">{err}</p>}
            <button
              type="submit"
              disabled={busy || !pw}
              className="mt-8 flex w-full items-center justify-between bg-signal px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-50"
            >
              {busy ? "Checking…" : "Enter"} <span>→</span>
            </button>
          </>
        )}
      </form>
    </Shell>
  );
}

/* ───────────── Panel ───────────── */

function Panel({ onLogout }: { onLogout: () => void }) {
  const [saved, setSaved] = useState<SiteConfig | null>(null);
  const [draft, setDraft] = useState<SiteConfig | null>(null);
  const [tab, setTab] = useState<TabId>("events");
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [loadError, setLoadError] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((msg: string, bad?: boolean) => {
    setToast({ msg, bad, id: Date.now() });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), bad ? 7000 : 3500);
  }, []);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/config", { cache: "no-store" })
      .then(async (r) => {
        if (r.status === 401) return onLogout();
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const c = (await r.json()) as SiteConfig;
        if (alive) { setSaved(c); setDraft(c); }
      })
      .catch((e) => alive && setLoadError(String(e.message || e)));
    return () => { alive = false; };
  }, [onLogout]);

  const dirty = !!draft && !!saved && JSON.stringify(draft) !== JSON.stringify(saved);

  // warn before leaving with unpublished changes
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const set = useCallback((fn: (c: SiteConfig) => SiteConfig) => setDraft((d) => (d ? fn(d) : d)), []);

  const publish = async () => {
    if (!draft) return;
    setPublishing(true);
    const next = { ...draft, events: sortEvents(draft.events) };
    try {
      const r = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await r.json().catch(() => ({}));
      if (r.status === 401) { notify("Session expired — log in again", true); onLogout(); return; }
      if (!r.ok) { notify(data.error || `Could not publish (${r.status})`, true); return; }
      setSaved(next);
      setDraft(next);
      notify("Published — the site is updated");
    } catch {
      notify("Network error — nothing was published", true);
    } finally {
      setPublishing(false);
    }
  };

  const logout = async () => {
    if (dirty && !confirm("You have unpublished changes. Log out anyway?")) return;
    await fetch("/api/admin/logout", { method: "POST" });
    onLogout();
  };

  if (loadError) return <Shell><p className="text-signal">Could not load content: {loadError}</p></Shell>;
  if (!draft) return <Shell><p className="font-mono text-xs uppercase tracking-[0.2em] text-bone">Loading content…</p></Shell>;

  const props = { draft, set, notify };

  return (
    <div className="min-h-[100svh] bg-ink pb-32 text-cream">
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <p className="font-display text-xl uppercase leading-none">
            Castle <span className="accent text-lg">backstage</span>
          </p>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener" className="hidden min-h-[40px] items-center border border-cream/20 px-4 font-mono text-[11px] uppercase tracking-[0.15em] hover:border-cream/60 sm:inline-flex">
              View site ↗
            </a>
            <Btn onClick={logout}>Log out</Btn>
          </div>
        </div>
        <nav className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`min-h-[44px] shrink-0 border-b-2 px-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === t.id ? "border-signal text-cream" : "border-transparent text-cream/50 hover:text-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {tab === "events" && <EventsTab {...props} />}
        {tab === "photos" && <PhotosTab {...props} />}
        {tab === "music" && <MusicTab {...props} />}
        {tab === "about" && <AboutTab {...props} />}
        {tab === "links" && <LinksTab {...props} />}
      </main>

      {/* publish bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-cream/10 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone md:text-[11px]">
            {dirty ? <><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />Unpublished changes</> : "Everything is live"}
          </p>
          <div className="flex gap-2">
            {dirty && <Btn onClick={() => confirm("Discard all unpublished changes?") && setDraft(saved)}>Discard</Btn>}
            <Btn variant="solid" disabled={!dirty || publishing} onClick={publish}>
              {publishing ? "Publishing…" : "Publish"}
            </Btn>
          </div>
        </div>
      </div>

      {toast && (
        <div
          key={toast.id}
          role="status"
          className={`fixed inset-x-4 bottom-20 z-40 mx-auto max-w-md px-4 py-3 text-sm shadow-lg md:inset-x-auto md:right-8 ${
            toast.bad ? "bg-signal text-cream" : "bg-cream text-ink"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
