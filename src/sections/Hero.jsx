import { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Container, Grid, IconButton, Chip, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Download, GitHub, LinkedIn, Email, ArrowForward, Search, ContentCopy, Check, Terminal, Bolt, AutoAwesome } from '@mui/icons-material';
import { personalInfo } from '../data/socialLinks';
import DeveloperConsole from '../components/ui/DeveloperConsole';
import { useThemeMode } from '../context/ThemeContext';

const TypewriterText = ({ words, typingSpeed = 65, deletingSpeed = 30, pauseTime = 1600 }) => {
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
        }, 120);
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
  const { isDark } = useThemeMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: '60px', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 5 }} alignItems="center" justifyContent="space-between">
          
          {/* Left Column: Developer Intro */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status Pill & Trajectory Tag */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.7, borderRadius: '9999px', bgcolor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                      {personalInfo.status}
                    </Typography>
                  </Box>

                  <Box sx={{ display: { xs: 'none', sm: 'inline-flex' }, alignItems: 'center', gap: 0.8, px: 1.8, py: 0.7, borderRadius: '9999px', bgcolor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <Bolt sx={{ color: 'var(--primary-glow)', fontSize: 16 }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.76rem', color: 'var(--secondary-glow)' }}>
                      4 Stacks in 12 Mos • Quick Learner
                    </Typography>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'inline-flex' }, alignItems: 'center', gap: 0.8, px: 1.8, py: 0.7, borderRadius: '9999px', bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)' }}>
                    <AutoAwesome sx={{ color: 'var(--primary-glow)', fontSize: 15 }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      Interactive 3D Hologram & Multi-Universe
                    </Typography>
                  </Box>
                </Box>
              </motion.div>

              {/* Developer Greeting & Name */}
              <motion.div variants={itemVariants}>
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontSize: { xs: '0.8rem', sm: '0.92rem', md: '1rem' }, fontWeight: 600, mb: 1, letterSpacing: '0.04em', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  &gt; const engineer = new AdaptiveDeveloper();
                </Typography>
                <Typography variant="h1" sx={{ color: 'var(--text-primary)', fontSize: { xs: '2.15rem', sm: '3.2rem', md: '4.5rem' }, fontWeight: 800, lineHeight: 1.1, mb: 2, letterSpacing: '-0.025em', wordBreak: 'break-word' }}>
                  I'm <span className="text-gradient">{personalInfo.name}</span>
                </Typography>
              </motion.div>

              {/* Typewriter Role */}
              <motion.div variants={itemVariants}>
                <Box sx={{ minHeight: '44px', display: 'flex', alignItems: 'center', mb: 2.5 }}>
                  <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: { xs: '1.05rem', sm: '1.35rem', md: '1.8rem' }, color: 'var(--text-primary)', fontWeight: 700 }}>
                    <TypewriterText words={personalInfo.roles} />
                  </Typography>
                </Box>
              </motion.div>

              {/* Bio & Education highlight */}
              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ fontSize: { xs: '0.92rem', md: '1.08rem' }, color: 'var(--text-secondary)', mb: 2.5, maxWidth: '580px', lineHeight: 1.75 }}>
                  {personalInfo.summary}
                </Typography>

                {/* Metric Badges */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3.5 }}>
                  <Chip
                    label="MCA '26 (Chandigarh Univ • 8.24 CGPA)"
                    size="small"
                    sx={{ bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label="Bengaluru, Karnataka, India"
                    size="small"
                    sx={{ bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                  <Chip
                    label="Local LLMs (Ollama) & RAG"
                    size="small"
                    sx={{ bgcolor: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.35)', color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600 }}
                  />
                  <Chip
                    label="Mobile: Flutter & Android SDK"
                    size="small"
                    sx={{ bgcolor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.35)', color: 'var(--accent-purple)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
                  />
                </Box>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3.5, width: { xs: '100%', sm: 'auto' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="#projects"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: 'var(--primary-glow)',
                      color: isDark ? '#050814' : '#ffffff',
                      fontWeight: 700,
                      px: 3.5,
                      py: 1.4,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.92rem',
                      boxShadow: '0 0 25px rgba(0, 242, 254, 0.35)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        bgcolor: 'var(--secondary-glow)',
                        boxShadow: '0 0 35px rgba(0, 242, 254, 0.55)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Explore Projects
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    href="/assets/resume/Ashish_Kumar_Resume.pdf"
                    download="Ashish_Kumar_Resume.pdf"
                    startIcon={<Download />}
                    sx={{
                      borderColor: 'var(--card-border)',
                      color: 'var(--text-primary)',
                      px: 3.5,
                      py: 1.4,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.92rem',
                      bgcolor: 'var(--subtle-chip-bg)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: 'var(--primary-glow)',
                        bgcolor: 'rgba(0, 242, 254, 0.08)',
                        color: 'var(--primary-glow)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Resume (PDF)
                  </Button>

                  {onOpenCommandPalette && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={onOpenCommandPalette}
                      startIcon={<Search />}
                      sx={{
                        borderColor: 'var(--card-border)',
                        color: 'var(--text-secondary)',
                        px: 2.2,
                        py: 1.4,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.88rem',
                        display: { xs: 'none', md: 'inline-flex' },
                        '&:hover': {
                          borderColor: 'var(--primary-glow)',
                          color: 'var(--primary-glow)'
                        }
                      }}
                    >
                      ⌘K Palette
                    </Button>
                  )}
                </Stack>
              </motion.div>

              {/* Developer Quick-Clone / Contact Pill */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={1.2}>
                    {[
                      { icon: <GitHub fontSize="small" />, link: personalInfo.github, label: 'GitHub Profile' },
                      { icon: <LinkedIn fontSize="small" />, link: personalInfo.linkedin, label: 'LinkedIn Profile' },
                      { icon: <Email fontSize="small" />, link: `mailto:${personalInfo.email}`, label: 'Direct Email' }
                    ].map((item, idx) => (
                      <Tooltip key={idx} title={item.label}>
                        <IconButton
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
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
                      </Tooltip>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Column: Interactive Developer Console */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
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
