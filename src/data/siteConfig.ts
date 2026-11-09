export type SocialIcon = "IG" | "SP" | "SC" | "YT" | "TK" | "FB" | "TW" | "BE" | "LI";

export interface SocialLink {
  id: string;
  label: string;
  icon: SocialIcon;
  href: string;
  active: boolean;
}

export interface Event {
  id: string;
  date: string;
  year: string;
  venue: string;
  city: string;
  name: string;
  type: string;
  color: string;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  bpm: string;
  genre: string;
  href: string | null;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  span: "normal" | "wide";
}

export interface SiteConfig {
  artist: {
    name: string;
    tagline: string;
    bio1: string;
    bio2: string;
    location: string;
    bookingEmail: string;
    photo: string;
  };
  stats: Array<{ id: string; value: string; label: string }>;
  featuredTrack: {
    title: string;
    href: string;
    platform: string;
  };
  tracks: Track[];
  events: Event[];
  gallery: GalleryItem[];
  socials: SocialLink[];
}

export const defaultConfig: SiteConfig = {
  artist: {
    name: "Castle",
    tagline: "DJ · Producer · House Music",
    bio1:
      "Born and raised in Leiria, Castle has been shaping the electronic music scene with a sound rooted in deep house, melodic grooves and an unmistakable masked identity. Every set is a carefully crafted journey — from the first beat to the last.",
    bio2:
      "His debut track NÔMA is out now on Spotify — a declaration of intent from an artist building his own castle, one record at a time.",
    location: "Leiria, Portugal",
    bookingEmail: "info@castledj.com",
    photo: "",
  },
  stats: [
    { id: "s1", value: "5+", label: "Years Behind the Decks" },
    { id: "s2", value: "100+", label: "Events Played" },
    { id: "s3", value: "1", label: "Original Track Out Now" },
  ],
  featuredTrack: {
    title: "NÔMA",
    href: "https://open.spotify.com/track/5mubbf1hzDOQwDHbXS5OAw",
    platform: "Spotify",
  },
  tracks: [
    { id: "t1", title: "NÔMA", duration: "—", bpm: "—", genre: "ORIGINAL TRACK", href: "https://open.spotify.com/track/5mubbf1hzDOQwDHbXS5OAw" },
    { id: "t2", title: "Castle Walls (Live Set)", duration: "60:00", bpm: "MIXED", genre: "HOUSE DJ MIX", href: null },
    { id: "t3", title: "Deep in Leiria Vol.1", duration: "45:00", bpm: "MIXED", genre: "HOUSE DJ MIX", href: null },
    { id: "t4", title: "Late Night Session", duration: "52:00", bpm: "MIXED", genre: "DEEP HOUSE", href: null },
  ],
  events: [
    { id: "e1", date: "NOV 22", year: "2025", venue: "Bunker Club", city: "Leiria", name: "UNDERGROUND SESSIONS #12", type: "RESIDENT SET", color: "#C8A050" },
    { id: "e2", date: "DEC 07", year: "2025", venue: "Lux Frágil", city: "Lisboa", name: "DARK MATTER NIGHT", type: "HEADLINER", color: "#5698AA" },
    { id: "e3", date: "DEC 28", year: "2025", venue: "Plano B", city: "Porto", name: "NEW YEAR'S COUNTDOWN", type: "SPECIAL EVENT", color: "#C8A050" },
    { id: "e4", date: "JAN 11", year: "2026", venue: "Industrialx", city: "Coimbra", name: "CASTLE B2B NIGHT", type: "BACK-TO-BACK", color: "#C8A050" },
  ],
  gallery: [
    { id: "g1", src: "", alt: "Live Set", span: "normal" },
    { id: "g2", src: "", alt: "Club Night", span: "wide" },
    { id: "g3", src: "", alt: "Open Air", span: "normal" },
    { id: "g4", src: "", alt: "Studio Session", span: "normal" },
    { id: "g5", src: "", alt: "Festival", span: "normal" },
  ],
  socials: [
    { id: "l1", label: "Instagram", icon: "IG", href: "https://instagram.com/castlesounds", active: true },
    { id: "l2", label: "Spotify", icon: "SP", href: "https://open.spotify.com/track/5mubbf1hzDOQwDHbXS5OAw", active: true },
    { id: "l3", label: "SoundCloud", icon: "SC", href: "#", active: true },
    { id: "l4", label: "YouTube", icon: "YT", href: "#", active: false },
    { id: "l5", label: "TikTok", icon: "TK", href: "#", active: false },
  ],
};
