"use client";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal, MaskLine, SectionLabel } from "@/components/ui";

function spotifyEmbed(href: string): string | null {
  const m = href.match(/open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0` : null;
}

export default function Sound() {
  const { config } = useSiteConfig();
  const { featuredTrack, tracks } = config;
  const embed = spotifyEmbed(featuredTrack.href);

  return (
    <section id="sound" className="relative bg-oxblood px-4 py-24 md:px-8 md:py-36">
      <SectionLabel index="02" label="Sound" />

      <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 className="font-display text-[18vw] uppercase leading-[0.85] md:text-[9vw]">
            <MaskLine>Latest</MaskLine>
            <MaskLine delay={0.08} className="text-signal">{featuredTrack.title}</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-sm text-bone">
              The debut original from Castle. Out now on {featuredTrack.platform}.
            </p>
            <a
              href={featuredTrack.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-signal px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Listen on {featuredTrack.platform} ↗
            </a>
          </Reveal>
        </div>

        {embed && (
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:self-end">
            <iframe
              title={`${featuredTrack.title} on Spotify`}
              src={embed}
              width="100%"
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block rounded-xl"
            />
          </Reveal>
        )}
      </div>

      {/* Track list — large editorial rows */}
      <ul className="mt-20 border-t border-cream/15 md:mt-28">
        {tracks.map((track, i) => {
          const Row = track.href ? "a" : "div";
          return (
            <Reveal as="li" key={track.id} delay={i * 0.05} y={20} className="border-b border-cream/15">
                <Row
                  {...(track.href ? { href: track.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5 transition-colors md:grid-cols-[4rem_1fr_14rem_6rem_2rem] md:gap-6 md:py-7"
                >
                  <span className="font-mono text-xs text-bone">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate font-display text-3xl uppercase leading-none transition-all duration-300 group-hover:translate-x-2 group-hover:text-signal md:text-6xl">
                    {track.title}
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-bone md:block">
                    {track.genre}
                  </span>
                  <span className="font-mono text-xs text-bone md:text-right">{track.duration}</span>
                  <span className="hidden text-right text-xl text-signal opacity-0 transition-opacity group-hover:opacity-100 md:block">
                    {track.href ? "↗" : "▶"}
                  </span>
                </Row>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
