import { useState, useEffect } from 'react';
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
import CommandPalette from './components/ui/CommandPalette';

function App() {
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  // Ensure portfolio always starts at the top (0, 0) on initial load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Global keyboard shortcut for Command Palette: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProjectFromPalette = (project) => {
    setSelectedProjectModal(project);
  };

  return (
    <Router>
      <div style={{ position: 'relative', zIndex: 0, minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
        <ParticleBackground />
        
        <Navbar onOpenCommandPalette={() => setCmdPaletteOpen(true)} />
        
        <main>
          <Hero onOpenCommandPalette={() => setCmdPaletteOpen(true)} />
          <About />
          <Skills />
          <Projects 
            selectedProjectModal={selectedProjectModal}
            onSelectProjectModal={setSelectedProjectModal}
            onCloseProjectModal={() => setSelectedProjectModal(null)}
          />
          <Experience />
          <Certifications />
          <GithubStats />
          <Resume />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />

        {/* Global Command Palette */}
        <CommandPalette
          open={cmdPaletteOpen}
          onClose={() => setCmdPaletteOpen(false)}
          onSelectProject={handleSelectProjectFromPalette}
        />
      </div>
    </Router>
  );
}

export default App;
