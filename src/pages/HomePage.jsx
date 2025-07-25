import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RandomDua from "../components/RandomDua";
import PopularDhikir from "../components/PopularDhikir";
import MostRecent from "../components/MostRecent";
import About from "../components/About";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularDhikir/>
      <RandomDua/>
      <About/>
      <MostRecent/>
    </>
  );
}
