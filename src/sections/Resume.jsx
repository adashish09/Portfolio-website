import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Dialog, IconButton } from '@mui/material';
import { Download, Description, Visibility, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';

const Resume = () => {
  const [open, setOpen] = useState(false);
  const resumePath = "/assets/resume/Ashish_Kumar_Resume.pdf"; // From user instruction

  return (
    <section id="resume" style={{ padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Resume" subtitle="Professional Overview" />
        
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Technical Summary
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Highly adaptable Full Stack and Android Developer with expertise in modern web technologies, AI integrations, and cross-platform mobile development. Proven track record of building scalable architectures, implementing RAG pipelines, and delivering production-ready applications. Strong foundation in Linux system administration and network security concepts.
              </Typography>

              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'var(--primary-glow)' }}>
                Key Highlights
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: 'text.secondary', mb: 4, '& li': { mb: 1 } }}>
                <li>Engineered AI-driven platforms using RAG and Vector Databases.</li>
                <li>Developed cross-platform mobile applications with offline-first synchronization.</li>
                <li>Architected network monitoring solutions on Linux using Python.</li>
                <li>Designed responsive, highly interactive web interfaces using React and Framer Motion.</li>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                  startIcon={<Visibility />}
                  sx={{
                    bgcolor: 'var(--primary-glow)',
                    color: '#050816',
                    fontWeight: 'bold',
                    py: 1.5,
                    px: 4,
                    '&:hover': { bgcolor: 'var(--secondary-glow)' }
                  }}
                >
                  View Resume
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                className="glass-container" 
                onClick={() => setOpen(true)}
                sx={{ 
                  p: 4, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  minHeight: '400px',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 40px rgba(0, 242, 254, 0.3)'
                  }
                }}
              >
                <Box sx={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05, transform: 'scale(3)' }}>
                   <Description sx={{ fontSize: 200, color: 'var(--primary-glow)' }} />
                </Box>
                <Description sx={{ fontSize: 80, color: 'var(--primary-glow)', mb: 2, zIndex: 1 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', zIndex: 1, color: '#fff' }}>
                  Interactive Preview
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '80%', zIndex: 1 }}>
                  Click here to view the complete PDF version including detailed project metrics, professional experience, and educational background.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Fullscreen Custom Resume Overlay */}
      <AnimatePresence>
        {open && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              backdropFilter: 'blur(20px)',
              bgcolor: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  width: { xs: '98vw', sm: '94vw', md: '90vw' },
                  height: { xs: '96vh', sm: '94vh', md: '92vh' },
                  bgcolor: 'rgba(5, 8, 22, 0.95)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Ashish Kumar Resume</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<Download />}
                      href={resumePath}
                      download="Ashish_Kumar_Resume.pdf"
                      sx={{ color: 'var(--primary-glow)', borderColor: 'var(--primary-glow)', '&:hover': { bgcolor: 'rgba(0,242,254,0.1)' }, display: { xs: 'none', sm: 'flex' } }}
                    >
                      Download PDF
                    </Button>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                      <Close />
                    </IconButton>
                  </Box>
                </Box>

                {/* PDF Viewer */}
                <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff', overflow: 'hidden' }}>
                  <iframe 
                    src={`${resumePath}#view=FitH`}
                    title="Resume"
                    style={{ width: '100%', height: '100%', border: 'none', flexGrow: 1 }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
