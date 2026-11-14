import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sound from "@/components/Sound";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
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
