import Hero from "../components/Hero";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import CaseStudies from "../components/CaseStudies";
import Process from "../components/Process";
import Hobbies from "../components/Hobbies";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <CaseStudies />
      </section>
      <Process />
      <Hobbies />
      <Footer />
    </>
  );
}
