import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import About from "../components/About";
import Pillars from "../components/Pillars";
import SolutionCentre from "../components/SolutionCentre";
import Incubation from "../components/Incubation";
import CTA from "../components/CTA";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Pillars />
        <SolutionCentre />
        <Incubation />
        <CTA />
        <Contact />
        {/* Hero will go here */}
      </main>
    <Footer/>
    </div>
  );
};

export default Home;