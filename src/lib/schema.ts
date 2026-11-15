import { z } from "zod";

/*
  Server-side validation for everything the admin can publish.
  Limits are generous but bounded so a bad request can't bloat the store.
*/
const str = (max: number) => z.string().trim().max(max);
const url = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v === "#" || /^https?:\/\//i.test(v) || v.startsWith("/"), "Must be a link (https://…)");
const imageSrc = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || v.startsWith("/photos/") || v.startsWith("/media/"), "Unknown image");

export const siteConfigSchema = z.object({
  artist: z.object({
    name: str(60),
    tagline: str(120),
    bio1: str(1200),
    bio2: str(1200),
    location: str(80),
    bookingEmail: z.string().trim().email().max(120),
    photo: imageSrc,
  }),
  stats: z.array(z.object({ id: str(40), value: str(12), label: str(60) })).max(6),
  featuredTrack: z.object({ title: str(60), href: url, platform: str(30) }),
  tracks: z
    .array(
      z.object({
        id: str(40),
        title: str(80),
        duration: str(12),
        bpm: str(12),
        genre: str(40),
        href: url.nullable(),
      })
    )
    .max(30),
  events: z
    .array(
      z.object({
        id: str(40),
        date: z.string().trim().regex(/^[A-Z]{3} \d{2}$/, "Date must look like NOV 28"),
        year: z.string().trim().regex(/^\d{4}$/),
        venue: str(80),
        city: str(60),
        name: str(100),
        type: str(40),
        color: str(20),
      })
    )
    .max(60),
  gallery: z
    .array(z.object({ id: str(40), src: imageSrc, alt: str(80), span: z.enum(["normal", "wide"]) }))
    .max(40),
  socials: z
    .array(
      z.object({
        id: str(40),
        label: str(30),
        icon: z.enum(["IG", "SP", "SC", "YT", "TK", "FB", "TW", "BE", "LI"]),
        href: url,
        active: z.boolean(),
      })
    )
    .max(12),
});
