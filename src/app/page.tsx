import { Suspense } from "react";
import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sound from "@/components/Sound";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import MaskScene from "@/components/MaskScene";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Opening from "@/components/Opening";
import SideIndex from "@/components/SideIndex";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { readConfig } from "@/lib/store";

/* The content is whatever was last published from /admin, read per request. */
async function Site() {
  await connection();
  const config = await readConfig();
  return (
    <SiteConfigProvider config={config}>
      <Opening />
      <Navbar />
      <SideIndex />
      <Hero />
      <Marquee />
      <About />
      <MaskScene />
      <Sound />
      <Events />
      <Gallery />
      <Booking />
      <Footer />
    </SiteConfigProvider>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-[100svh] bg-ink" />}>
        <Site />
      </Suspense>
    </main>
  );
}
