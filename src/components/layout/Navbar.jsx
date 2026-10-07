import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Tooltip } from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon, 
  Search, 
  Download, 
  Person,
  Bolt,
  Layers,
  Timeline,
  WorkspacePremium,
  GitHub as GitHubIcon,
  Email,
  ChevronRight,
  AutoAwesome
} from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeSelector from '../ui/ThemeSelector';

const navLinks = [
  { title: 'About', id: 'about', subtitle: 'Profile & Philosophy', icon: <Person sx={{ fontSize: 18 }} /> },
  { title: 'Skills', id: 'skills', subtitle: 'Tools & Architecture', icon: <Bolt sx={{ fontSize: 18 }} /> },
  { title: 'Projects', id: 'projects', subtitle: 'Production Systems', icon: <Layers sx={{ fontSize: 18 }} /> },
  { title: 'Journey', id: 'experience', subtitle: 'Education & Roles', icon: <Timeline sx={{ fontSize: 18 }} /> },
  { title: 'Certs', id: 'certifications', subtitle: 'Verified Credentials', icon: <WorkspacePremium sx={{ fontSize: 18 }} /> },
  { title: 'GitHub', id: 'github', subtitle: 'Repositories & Stats', icon: <GitHubIcon sx={{ fontSize: 18 }} /> },
  { title: 'Contact', id: 'contact', subtitle: 'Direct Communication', icon: <Email sx={{ fontSize: 18 }} /> },
];

const Navbar = ({ onOpenCommandPalette }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggleTheme, setThemeMode, themes, currentTheme, isDark } = useThemeMode();

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
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'var(--navbar-border)' : 'transparent',
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
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(168,85,247,0.15) 100%)' 
                : 'linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(124,58,237,0.12) 100%)',
              border: '1px solid',
              borderColor: 'var(--card-border-hover)',
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
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: 1 }}>
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
                fontWeight: 600,
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

        {/* Right Actions: Theme Toggle + Search + Resume */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {/* Multi-Universe 3D Theme Selector */}
          <ThemeSelector />

          {/* Command Palette Trigger */}
          <Button
            onClick={onOpenCommandPalette}
            variant="outlined"
            size="small"
            startIcon={<Search sx={{ fontSize: 16 }} />}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              borderColor: 'var(--card-border)',
              bgcolor: 'var(--subtle-chip-bg)',
              color: 'var(--text-secondary)',
              textTransform: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              py: 0.6,
              px: 1.5,
              borderRadius: '8px',
              '&:hover': {
                borderColor: 'var(--primary-glow)',
                color: 'var(--text-primary)',
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
              bgcolor: isDark ? 'rgba(0, 242, 254, 0.12)' : 'rgba(2, 132, 199, 0.12)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(0, 242, 254, 0.4)' : 'rgba(2, 132, 199, 0.4)',
              color: 'var(--primary-glow)',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: isDark ? 'rgba(0, 242, 254, 0.25)' : 'rgba(2, 132, 199, 0.25)',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.25)'
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
            sx={{ display: { md: 'none' }, color: 'var(--text-primary)' }}
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
            width: { xs: '100%', sm: 380 },
            maxWidth: '100vw',
            background: isDark ? 'rgba(7, 10, 22, 0.96)' : 'rgba(248, 250, 252, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderLeft: { sm: '1px solid var(--card-border)' },
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }
        }}
      >
        {/* Header HUD */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            px: 2.5, 
            py: 2, 
            borderBottom: '1px solid var(--card-border)',
            bgcolor: 'var(--navbar-bg)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                border: '1px solid var(--card-border-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px var(--theme-halo)'
              }}
            >
              <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: 'var(--primary-glow)', fontSize: '0.95rem' }}>
                AK
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 0.8 }}>
                {personalInfo.name}
                <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              </Typography>
              <Typography sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>
                Software Engineer • Portfolio
              </Typography>
            </Box>
          </Box>

          <IconButton 
            onClick={() => setMobileOpen(false)} 
            sx={{ 
              color: 'var(--text-primary)',
              bgcolor: 'var(--subtle-chip-bg)',
              border: '1px solid var(--card-border)',
              p: 0.8,
              '&:hover': {
                bgcolor: 'var(--theme-halo)',
                borderColor: 'var(--primary-glow)'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Scrollable Body */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          {/* 1. 3D Universe Theme Bar */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
              <AutoAwesome sx={{ color: 'var(--primary-glow)', fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                // 3D UNIVERSE THEME
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {themes.map((t) => {
                const isSelected = t.id === mode;
                return (
                  <Box
                    key={t.id}
                    onClick={(e) => {
                      setThemeMode(t.id, e);
                    }}
                    sx={{
                      cursor: 'pointer',
                      p: 1.2,
                      borderRadius: '10px',
                      bgcolor: isSelected ? 'var(--theme-halo)' : 'var(--subtle-chip-bg)',
                      border: '1.5px solid',
                      borderColor: isSelected ? t.primaryColor : 'var(--card-border)',
                      boxShadow: isSelected ? `0 0 16px ${t.primaryColor}30` : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        borderColor: t.primaryColor,
                        bgcolor: 'var(--theme-halo)'
                      }
                    }}
                  >
                    <Box sx={{ fontSize: '1.1rem', lineHeight: 1 }}>{t.icon}</Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.74rem',
                          fontWeight: isSelected ? 800 : 600,
                          color: isSelected ? t.primaryColor : 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2
                        }}
                      >
                        {t.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.3 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: t.primaryColor }} />
                        <Typography sx={{ fontSize: '0.62rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {isSelected ? 'ACTIVE' : 'SELECT'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* 2. Navigation Items (Card Tiles) */}
          <Box>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', mb: 1, letterSpacing: '0.06em' }}>
              // DIRECT NAVIGATION
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navLinks.map((link) => (
                <Box
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.2,
                    borderRadius: '12px',
                    bgcolor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(56, 189, 248, 0.08)',
                      borderColor: 'var(--primary-glow)',
                      transform: 'translateX(3px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '8px',
                        bgcolor: 'var(--subtle-chip-bg)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--primary-glow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {link.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.2 }}>
                        {link.title}
                      </Typography>
                      <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        {link.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  <ChevronRight sx={{ color: 'var(--text-muted)', fontSize: 18 }} />
                </Box>
              ))}
            </Box>
          </Box>

        </Box>

        {/* 3. Bottom Pinned Actions with Safe-Area Padding */}
        <Box 
          sx={{ 
            p: 2.5, 
            pt: 2, 
            pb: 'calc(24px + env(safe-area-inset-bottom))', 
            borderTop: '1px solid var(--card-border)', 
            bgcolor: 'var(--navbar-bg)',
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.2 
          }}
        >
          <Button
            fullWidth
            href="/assets/resume/Ashish_Kumar_Resume.pdf"
            download="Ashish_Kumar_Resume.pdf"
            variant="contained"
            startIcon={<Download />}
            sx={{
              bgcolor: 'var(--primary-glow)',
              color: isDark ? '#050814' : '#ffffff',
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.84rem',
              py: 1.2,
              borderRadius: '10px',
              textTransform: 'none',
              boxShadow: '0 0 20px var(--theme-halo)',
              '&:hover': {
                bgcolor: 'var(--secondary-glow)'
              }
            }}
          >
            Download Resume (PDF)
          </Button>

          <Button
            fullWidth
            onClick={() => {
              setMobileOpen(false);
              onOpenCommandPalette();
            }}
            variant="outlined"
            startIcon={<Search />}
            sx={{
              borderColor: 'var(--card-border)',
              bgcolor: 'var(--subtle-chip-bg)',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
              py: 1,
              borderRadius: '10px',
              textTransform: 'none',
              '&:hover': {
                borderColor: 'var(--primary-glow)',
                color: 'var(--primary-glow)'
              }
            }}
          >
            Command Palette <span className="kbd-badge" style={{ marginLeft: 8 }}>⌘K</span>
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
