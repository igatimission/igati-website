import Hero from "../components/home/Hero";
import ExploreEcosystem from "../components/home/ExploreEcosystem";
import About from "../components/home/About";
import InstitutionalEcosystem from "../components/home/InstitutionalEcosystem";
import Projects from "../components/home/Projects";
import Participants from "../components/home/Participants";
import Opportunities from "../components/home/Opportunities";
import Marketplace from "../components/home/Marketplace";
import Impact from "../components/home/Impact";
import StoriesKnowledge from "../components/home/StoriesKnowledge";
import CTA from "../components/home/CTA";
import Contact from "../components/home/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <ExploreEcosystem />
      <About />
      <InstitutionalEcosystem />
      <Projects />
      <Participants />
      <Opportunities />
      <Marketplace />
      <Impact />
      <StoriesKnowledge />
      <CTA />
      <Contact />
    </>
  );
};

export default Home;