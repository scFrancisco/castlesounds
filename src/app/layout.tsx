import type { Metadata } from "next";
import "./globals.css";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

export const metadata: Metadata = {
  title: "Castle — DJ & Producer, Leiria",
  description: "House music DJ & Producer based in Leiria, Portugal. Bookings: info@castledj.com",
  openGraph: {
    title: "Castle — CastleSounds",
    description: "House music DJ & Producer based in Leiria, Portugal.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@1&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-cream font-body overflow-x-hidden">
        <SiteConfigProvider>{children}</SiteConfigProvider>
      </body>
    </html>
  );
}
