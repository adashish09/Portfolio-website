import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Container, Grid, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, GitHub, LinkedIn, Email, Code, Terminal, Storage, Memory } from '@mui/icons-material';
import { personalInfo } from '../data/socialLinks';

const roles = [
  "Full Stack Developer",
  "Android Developer",
  "AI/LLM Engineer",
  "Frontend Engineer",
  "Modern Software Engineer"
];

const TypewriterText = ({ words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeoutId;

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
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
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{ display: 'inline-block', width: '3px', backgroundColor: 'var(--primary-glow)', marginLeft: '6px', verticalAlign: 'text-bottom', height: '0.9em' }}
      />
    </span>
  );
};

const Hero = () => {


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center" justifyContent="space-between">

          {/* Left Column: Content */}
          <Grid item xs={12} md={7} lg={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h6" sx={{ color: 'var(--primary-glow)', mb: 2, fontWeight: 500, letterSpacing: 2 }}>
                  Hi, I'm
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' }, mb: 1, lineHeight: 1.1, fontWeight: 800 }}>
                  <span className="text-gradient">{personalInfo.name}</span>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ height: { xs: '40px', sm: '60px', md: '70px' }, mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, color: '#fff', fontWeight: 600 }}>
                    <TypewriterText words={roles} />
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary', mb: 5, maxWidth: '600px', lineHeight: 1.6 }}>
                  Building scalable web applications, AI-powered systems, Android apps, and futuristic developer experiences.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="#projects"
                    sx={{
                      bgcolor: 'rgba(0, 242, 254, 0.1)',
                      color: 'var(--primary-glow)',
                      border: '1px solid var(--primary-glow)',
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(0, 242, 254, 0.2)',
                        boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
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
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#fff',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Download Resume
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: <GitHub />, link: personalInfo.github },
                    { icon: <LinkedIn />, link: personalInfo.linkedin },
                    { icon: <Email />, link: `mailto:${personalInfo.email}` }
                  ].map((social, idx) => (
                    <IconButton
                      key={idx}
                      href={social.link}
                      target="_blank"
                      sx={{
                        color: 'text.secondary',
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'var(--primary-glow)',
                          borderColor: 'var(--primary-glow)',
                          bgcolor: 'rgba(0, 242, 254, 0.1)',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 5px 15px rgba(0, 242, 254, 0.2)'
                        }
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Column: Orbital Visuals */}
          <Grid item xs={12} md={5} lg={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', marginLeft: '150px', width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {/* Central Core */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 40px rgba(0, 242, 254, 0.2)',
                    '0 0 80px rgba(0, 242, 254, 0.5)',
                    '0 0 40px rgba(0, 242, 254, 0.2)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(5, 8, 22, 1) 100%)',
                  border: '2px solid rgba(0, 242, 254, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Memory sx={{ fontSize: 60, color: 'var(--primary-glow)' }} />
              </motion.div>

              {/* Inner Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  zIndex: 1
                }}
              >
                <Box sx={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', bgcolor: '#050816', p: 1, borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Code />
                </Box>
                <Box sx={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', bgcolor: '#050816', p: 1, borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Terminal />
                </Box>
              </motion.div>

              {/* Outer Orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 242, 254, 0.1)',
                  zIndex: 0
                }}
              >
                <Box sx={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', bgcolor: '#050816', p: 1, borderRadius: '50%', color: 'var(--primary-glow)', border: '1px solid rgba(0, 242, 254, 0.3)', boxShadow: '0 0 15px rgba(0,242,254,0.2)' }}>
                  <Storage />
                </Box>
              </motion.div>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
