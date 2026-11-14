"use client";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { navLinks } from "@/components/Navbar";

const iconSvgs: Record<string, React.ReactNode> = {
  IG: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  SP: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  SC: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 15.14l.172 2.015c.013.06.045.094.104.094.059 0 .09-.034.103-.094l.197-2.015-.197-1.993c-.013-.057-.044-.094-.104-.094m11.9-7.44c-.122 0-.234.015-.345.039C12.577 2.595 10.63 1 8.282 1 7.73 1 7.19 1.123 6.74 1.345c-.173.08-.22.162-.225.235v13.37c.005.077.062.14.139.153h13.016c.428 0 .776-.347.776-.776 0-.428-.348-.776-.776-.776-.428 0-.776-.347-.776-.776V9.49c0-2.21-1.792-4-4-4"/>
    </svg>
  ),
  YT: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  ),
  TK: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
    </svg>
  ),
  FB: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  TW: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  BE: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.49-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.65.673 1.42.673 2.3 0 .74-.14 1.38-.425 1.93-.283.55-.673 1.0-1.17 1.37-.5.36-1.08.63-1.75.8-.67.17-1.38.26-2.13.26H0V4.51h6.938zm-.412 5.63c.56 0 1.02-.13 1.38-.4.36-.27.54-.69.54-1.26 0-.32-.06-.58-.18-.79-.12-.21-.28-.38-.48-.51-.2-.12-.43-.21-.69-.27-.26-.05-.52-.08-.8-.08H3.4V10.14h3.126zm.21 5.9c.31 0 .6-.03.87-.09s.5-.16.7-.3c.2-.14.36-.33.47-.57.11-.24.17-.54.17-.9 0-.72-.2-1.23-.6-1.54-.4-.31-.93-.46-1.59-.46H3.4v3.86h3.336zm11.598-8.37c1.07 0 1.95.26 2.64.77.69.52 1.03 1.37 1.03 2.56h-6.74c.04.75.26 1.32.68 1.72.42.4.98.59 1.68.59.5 0 .93-.11 1.28-.32.35-.21.58-.45.68-.71h2.24c-.36 1.1-.9 1.88-1.63 2.34-.73.46-1.62.69-2.65.69-.72 0-1.37-.11-1.94-.34-.57-.23-1.05-.56-1.44-.99-.39-.43-.69-.95-.9-1.56-.21-.6-.31-1.26-.31-1.98 0-.7.11-1.35.32-1.95.21-.6.52-1.12.92-1.56.4-.44.88-.78 1.44-1.03.56-.24 1.19-.36 1.9-.36zm-1.98-3.26h4.86v1.4h-4.86V4.4z"/>
    </svg>
  ),
  LI: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

export default function Footer() {
  const { config } = useSiteConfig();
  const { socials, artist } = config;
  const activeSocials = socials.filter((s) => s.active);

  return (
    <footer className="grain relative overflow-hidden bg-ink px-4 pt-20 md:px-8 md:pt-28">
      <div className="relative z-10 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">Follow</p>
          <ul className="mt-5 space-y-2">
            {activeSocials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-cream transition-colors hover:text-signal"
                >
                  <span className="text-bone transition-colors group-hover:text-signal">{iconSvgs[s.icon]}</span>
                  <span className="font-display text-3xl uppercase leading-none md:text-4xl">{s.label}</span>
                  <span className="text-sm opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">Index</p>
          <ul className="mt-5 space-y-2 font-mono text-xs uppercase tracking-[0.15em]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/80 transition-colors hover:text-signal">
                  <span className="mr-2 text-bone">{l.index}</span>{l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">Bookings</p>
          <a
            href={`mailto:${artist.bookingEmail}`}
            className="mt-5 block break-all text-lg text-cream transition-colors hover:text-signal"
          >
            {artist.bookingEmail}
          </a>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-bone">{artist.location}</p>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col justify-between gap-2 border-t border-cream/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone sm:flex-row">
        <span>© 2026 CastleSounds</span>
        <a href="#" className="hover:text-cream">Back to top ↑</a>
      </div>

      {/* Giant wordmark bleeding off the bottom edge */}
      <p
        aria-hidden
        className="relative z-0 -mb-[3vw] mt-6 select-none whitespace-nowrap text-center font-display text-[15.5vw] uppercase leading-none text-blood"
      >
        Castlesounds
      </p>
    </footer>
  );
}
