import CustomCursor       from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";
import Navbar             from "./components/Navbar";
import Hero               from "./components/Hero";
import { About }          from "./components/AboutContact";
import Skills             from "./components/Skills";
import Projects           from "./components/Projects";
import { Contact }        from "./components/AboutContact";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <CustomCursor />
      <div className="aurora">
        <div className="aurora-band ab1"/>
        <div className="aurora-band ab2"/>
        <div className="aurora-band ab3"/>
      </div>
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}