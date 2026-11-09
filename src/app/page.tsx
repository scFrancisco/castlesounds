import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Sound from "@/components/Sound";
import Events from "@/components/Events";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Sound />
      <Events />
      <Booking />
      <Footer />
    </main>
  );
}
