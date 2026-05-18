import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/socialLinks';

const navLinks = [
  { title: 'About', id: 'about' },
  { title: 'Skills', id: 'skills' },
  { title: 'Projects', id: 'projects' },
  { title: 'Experience', id: 'experience' },
  { title: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      elevation={scrolled ? 4 : 0}
      sx={{
        background: scrolled ? 'rgba(5, 8, 22, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          sx={{ fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="text-gradient" style={{ fontSize: '1.5rem' }}>AK</span>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '1.2rem' }}>| {personalInfo.name}</Box>
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                color="inherit"
                onClick={() => scrollToSection(link.id)}
                sx={{
                  '&:hover': { color: 'var(--primary-glow)' },
                  textTransform: 'capitalize',
                  fontSize: '1rem'
                }}
              >
                {link.title}
              </Button>
            </motion.div>
          ))}
        </Box>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 250,
            background: 'rgba(5, 8, 22, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <List sx={{ mt: 5 }}>
          {navLinks.map((link) => (
            <ListItem button key={link.id} onClick={() => scrollToSection(link.id)}>
              <ListItemText 
                primary={link.title} 
                sx={{ textAlign: 'center', color: '#fff', '&:hover': { color: 'var(--primary-glow)' } }} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
