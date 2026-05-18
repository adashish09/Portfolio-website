import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import GithubStats from './sections/GithubStats';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import ParticleBackground from './components/3d/ParticleBackground';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <ParticleBackground />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <GithubStats />
        <Resume />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
