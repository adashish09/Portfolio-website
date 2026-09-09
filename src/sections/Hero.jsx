import { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Container, Grid, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Download, GitHub, LinkedIn, Email, ArrowForward, Search } from '@mui/icons-material';
import { personalInfo } from '../data/socialLinks';
import DeveloperConsole from '../components/ui/DeveloperConsole';

const TypewriterText = ({ words, typingSpeed = 70, deletingSpeed = 35, pauseTime = 1800 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeoutId;

    if (isDeleting) {
      if (currentText.length === 0) {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (currentText.length === word.length) {
        timeoutId = setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {currentText}
      <span className="terminal-cursor" />
    </span>
  );
};

const Hero = ({ onOpenCommandPalette }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '60px', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 6 }} alignItems="center" justifyContent="space-between">
          
          {/* Left Column: Developer Intro */}
          <Grid item xs={12} lg={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status Pill */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, px: 2, py: 0.8, borderRadius: '9999px', bgcolor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', mb: 3 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                  <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: 'var(--secondary-glow)', fontWeight: 600 }}>
                    {personalInfo.status}
                  </Typography>
                </Box>
              </motion.div>

              {/* Developer Greeting & Name */}
              <motion.div variants={itemVariants}>
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontSize: '1.05rem', fontWeight: 600, mb: 1 }}>
                  &gt; console.log("Hello, World!");
                </Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem' }, fontWeight: 800, lineHeight: 1.1, mb: 2, letterSpacing: '-0.02em' }}>
                  I'm <span className="text-gradient">{personalInfo.name}</span>
                </Typography>
              </motion.div>

              {/* Typewriter Role */}
              <motion.div variants={itemVariants}>
                <Box sx={{ minHeight: '44px', display: 'flex', alignItems: 'center', mb: 2.5 }}>
                  <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.85rem' }, color: '#f8fafc', fontWeight: 700 }}>
                    <TypewriterText words={personalInfo.roles} />
                  </Typography>
                </Box>
              </motion.div>

              {/* Bio & Education highlight */}
              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ fontSize: { xs: '0.98rem', md: '1.12rem' }, color: 'var(--text-secondary)', mb: 2, maxWidth: '580px', lineHeight: 1.7 }}>
                  {personalInfo.subtitle}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  <Chip
                    label="MCA '26 (Chandigarh Univ, 8.24 CGPA)"
                    size="small"
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label="Bengaluru, India"
                    size="small"
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label="RAG & Local LLMs"
                    size="small"
                    sx={{ bgcolor: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                </Box>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4, width: { xs: '100%', sm: 'auto' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="#projects"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: 'var(--primary-glow)',
                      color: '#050814',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.4,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.92rem',
                      boxShadow: '0 0 25px rgba(0, 242, 254, 0.35)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        bgcolor: 'var(--secondary-glow)',
                        boxShadow: '0 0 35px rgba(0, 242, 254, 0.5)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    View Projects
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    href="/assets/resume/Ashish_Kumar_Resume.pdf"
                    download="Ashish_Kumar_Resume.pdf"
                    startIcon={<Download />}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      px: 3.5,
                      py: 1.4,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.92rem',
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: 'var(--primary-glow)',
                        bgcolor: 'rgba(0, 242, 254, 0.08)',
                        color: 'var(--primary-glow)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Download CV
                  </Button>

                  {onOpenCommandPalette && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={onOpenCommandPalette}
                      startIcon={<Search />}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        color: 'var(--text-secondary)',
                        px: 2.5,
                        py: 1.4,
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.92rem',
                        display: { xs: 'none', md: 'inline-flex' },
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: '#fff'
                        }
                      }}
                    >
                      ⌘K
                    </Button>
                  )}
                </Stack>
              </motion.div>

              {/* Social Links & Terminal Hint */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Stack direction="row" spacing={1.5}>
                    {[
                      { icon: <GitHub fontSize="small" />, link: personalInfo.github, label: 'GitHub' },
                      { icon: <LinkedIn fontSize="small" />, link: personalInfo.linkedin, label: 'LinkedIn' },
                      { icon: <Email fontSize="small" />, link: `mailto:${personalInfo.email}`, label: 'Email' }
                    ].map((item, idx) => (
                      <IconButton
                        key={idx}
                        href={item.link}
                        target="_blank"
                        sx={{
                          color: 'var(--text-secondary)',
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          p: 1.2,
                          borderRadius: '10px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: 'var(--primary-glow)',
                            borderColor: 'var(--primary-glow)',
                            bgcolor: 'rgba(0, 242, 254, 0.1)',
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    ))}
                  </Stack>

                  <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', display: { xs: 'none', sm: 'block' } }}>
                    // Tip: run <span style={{ color: 'var(--primary-glow)' }}>help</span> in console →
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Column: Interactive Developer Console */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DeveloperConsole />
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
