import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sound from "@/components/Sound";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Opening from "@/components/Opening";
import SideIndex from "@/components/SideIndex";

export default function Home() {
  return (
    <main>
      <Opening />
      <Navbar />
      <SideIndex />
      <Hero />
      <Marquee />
      <About />
      <Sound />
      <Events />
      <Gallery />
      <Booking />
      <Footer />
    </main>
  );
}
