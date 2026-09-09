import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Search, Download } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';

const navLinks = [
  { title: 'About', id: 'about' },
  { title: 'Skills', id: 'skills' },
  { title: 'Projects', id: 'projects' },
  { title: 'Journey', id: 'experience' },
  { title: 'Certs', id: 'certifications' },
  { title: 'GitHub', id: 'github' },
  { title: 'Contact', id: 'contact' },
];

const Navbar = ({ onOpenCommandPalette }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled ? 'rgba(7, 10, 19, 0.88)' : 'rgba(7, 10, 19, 0.4)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 1100
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 0.8, px: { xs: 2, md: 4 } }}>
        {/* Brand Left */}
        <Box 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(168,85,247,0.15) 100%)',
              border: '1px solid rgba(0,242,254,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,242,254,0.15)'
            }}
          >
            <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: 'var(--primary-glow)', fontSize: '1rem' }}>
              AK
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: 1 }}>
              {personalInfo.name}
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' }, width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', display: { xs: 'none', sm: 'block' } }}>
              git:(main) • Available for Hire
            </Typography>
          </Box>
        </Box>

        {/* Center Nav Links (Desktop) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {navLinks.map((link) => (
            <Button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 1.6,
                py: 0.6,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'var(--primary-glow)',
                  background: 'rgba(56, 189, 248, 0.08)'
                }
              }}
            >
              {link.title}
            </Button>
          ))}
        </Box>

        {/* Right Actions: Command Palette Trigger + Resume */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Command Palette Trigger */}
          <Button
            onClick={onOpenCommandPalette}
            variant="outlined"
            size="small"
            startIcon={<Search sx={{ fontSize: 16 }} />}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              borderColor: 'rgba(255, 255, 255, 0.12)',
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-secondary)',
              textTransform: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              py: 0.6,
              px: 1.5,
              borderRadius: '8px',
              '&:hover': {
                borderColor: 'var(--primary-glow)',
                color: '#fff',
                bgcolor: 'rgba(0, 242, 254, 0.08)'
              }
            }}
          >
            Search <span className="kbd-badge" style={{ marginLeft: 6 }}>⌘K</span>
          </Button>

          {/* Quick Resume Link */}
          <Button
            href="/assets/resume/Ashish_Kumar_Resume.pdf"
            download="Ashish_Kumar_Resume.pdf"
            variant="contained"
            size="small"
            startIcon={<Download sx={{ fontSize: 16 }} />}
            sx={{
              display: { xs: 'none', lg: 'inline-flex' },
              bgcolor: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              color: 'var(--primary-glow)',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: 'rgba(0, 242, 254, 0.25)',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)'
              }
            }}
          >
            Resume
          </Button>

          {/* Mobile Search button */}
          <IconButton
            onClick={onOpenCommandPalette}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: 'var(--primary-glow)' }}
          >
            <Search />
          </IconButton>

          {/* Mobile Hamburger Drawer toggle */}
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: 'none' }, color: '#fff' }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 270,
            background: 'rgba(7, 10, 19, 0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
            p: 2.5
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--primary-glow)' }}>
            Navigation
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => scrollToSection(link.id)}
                sx={{
                  borderRadius: '8px',
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.1)' }
                }}
              >
                <ListItemText
                  primary={link.title}
                  primaryTypographyProps={{
                    sx: { color: '#f1f5f9', fontWeight: 500, fontSize: '1rem' }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            fullWidth
            href="/assets/resume/Ashish_Kumar_Resume.pdf"
            download="Ashish_Kumar_Resume.pdf"
            variant="outlined"
            startIcon={<Download />}
            sx={{
              borderColor: 'var(--primary-glow)',
              color: 'var(--primary-glow)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem'
            }}
          >
            Download Resume
          </Button>

          <Button
            fullWidth
            onClick={() => {
              setMobileOpen(false);
              onOpenCommandPalette();
            }}
            variant="contained"
            startIcon={<Search />}
            sx={{
              bgcolor: 'rgba(56, 189, 248, 0.2)',
              color: '#fff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem'
            }}
          >
            Command Palette
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
