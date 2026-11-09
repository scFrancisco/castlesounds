import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CASTLESOUNDS — DJ Leiria, Portugal",
  description: "Underground electronic music, events & bookings. Based in Leiria, Portugal.",
  openGraph: {
    title: "CASTLESOUNDS",
    description: "Underground electronic music, events & bookings. Based in Leiria, Portugal.",
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
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080810] text-[#e0e0f0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
