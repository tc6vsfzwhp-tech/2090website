import Hero from "../sections/Hero";
import Manifesto from "../sections/Manifesto";
import FeaturedGame from "../sections/FeaturedGame";
import Navbar from "../sections/Navbar";
import Game from "@/sections/Game";
import About from "@/sections/About";
import Footer from "@/sections/Footer";
import How from "@/sections/How";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth">
      <div id="home" className="snap-start">
        <Navbar />
        <Hero />
      </div>

      <div id="about" className="snap-start">
        <Manifesto />
      </div>

      <div id="games">
        <Game />
      </div>

      <div>
        <FeaturedGame />
      </div>
      <div id="how" className="snap-start">
        <How />
      </div>

      <div id="team" className="snap-start">
        <About />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
