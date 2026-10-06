import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, IconButton } from '@mui/material';
import { Download, Description, Visibility, Close, CheckCircle } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';

const Resume = () => {
  const [open, setOpen] = useState(false);
  const resumePath = "/assets/resume/Ashish_Kumar_Resume.pdf";

  const keyPoints = [
    "Master of Computer Applications (MCA) – Chandigarh University (8.24 CGPA)",
    "Engineered AI Resume Interviewer with custom RAG & local Ollama (Llama 3.1) inference",
    "Developed NetSentinel Linux network intrusion detection suite with live packet capture",
    "Built and published native Android & cross-platform Flutter mobile applications",
    "Strong core foundations in Data Structures, Algorithms, OOP, and Relational DBMS"
  ];

  return (
    <section id="resume" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="DOCUMENTATION"
          title="Curriculum Vitae"
          subtitle="Official credentials, academic record, engineering experience, and technical achievements."
        />

        <Grid container spacing={5} alignItems="center">
          {/* Left Column: Summary */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box className="glass-container" sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: '16px', border: '1px solid var(--card-border)', bgcolor: 'var(--card-bg)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--text-primary)' }}>
                  Technical Summary
                </Typography>

                <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 3, lineHeight: 1.8, fontSize: '1rem' }}>
                  Software Engineer and MCA graduate with practical experience in building full-stack web platforms, cross-platform mobile apps, and AI-integrated systems using local LLMs (Ollama) and RAG. Strong grounding in computer science fundamentals and disciplined engineering practices.
                </Typography>

                <Typography variant="subtitle2" sx={{ color: 'var(--primary-glow)', fontWeight: 700, mb: 2, fontFamily: 'JetBrains Mono, monospace' }}>
                  // Key Highlights
                </Typography>

                <Box component="ul" sx={{ pl: 0, listStyle: 'none', mb: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {keyPoints.map((pt, idx) => (
                    <Box component="li" key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                      <CheckCircle sx={{ color: 'var(--secondary-glow)', fontSize: 18, mt: 0.3, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.9rem' }}>
                        {pt}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setOpen(true)}
                    startIcon={<Visibility />}
                    sx={{
                      bgcolor: 'var(--primary-glow)',
                      color: '#050814',
                      fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      py: 1.3,
                      px: 3,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: 'var(--secondary-glow)' }
                    }}
                  >
                    View Interactive PDF
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    href={resumePath}
                    download="Ashish_Kumar_Resume.pdf"
                    startIcon={<Download />}
                    sx={{
                      borderColor: 'var(--card-border)',
                      color: 'var(--text-primary)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      py: 1.3,
                      px: 3,
                      borderRadius: '8px',
                      '&:hover': { borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0, 242, 254, 0.08)' }
                    }}
                  >
                    Download PDF
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column: Interactive Paper Preview Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box
                className="glass-container card-hover-lift"
                onClick={() => setOpen(true)}
                sx={{
                  p: 4,
                  minHeight: '420px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '20px',
                  border: '1px solid var(--card-border)',
                  bgcolor: 'var(--card-bg)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid var(--primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    boxShadow: '0 0 30px rgba(0, 242, 254, 0.25)'
                  }}
                >
                  <Description sx={{ fontSize: 44, color: 'var(--primary-glow)' }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>
                  Ashish_Kumar_Resume.pdf
                </Typography>

                <Typography variant="caption" sx={{ color: 'var(--secondary-glow)', fontFamily: 'JetBrains Mono, monospace', mb: 2 }}>
                  Last Updated: 2026 • Verified PDF Document
                </Typography>

                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', maxWidth: '80%', mb: 3, lineHeight: 1.6 }}>
                  Click to launch the fullscreen PDF reader with full academic records, project metrics, and contact details.
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Visibility />}
                  sx={{
                    color: 'var(--primary-glow)',
                    borderColor: 'var(--primary-glow)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    borderRadius: '8px'
                  }}
                >
                  Preview Document
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Fullscreen PDF Modal Overlay */}
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
              bgcolor: 'rgba(3, 7, 18, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                width: '92vw',
                height: '92vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  bgcolor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, px: 3, borderBottom: '1px solid var(--card-border)', bgcolor: 'var(--subtle-chip-bg)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Description sx={{ color: 'var(--primary-glow)', fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                      Ashish Kumar – Curriculum Vitae (PDF)
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download />}
                      href={resumePath}
                      download="Ashish_Kumar_Resume.pdf"
                      sx={{
                        color: 'var(--primary-glow)',
                        borderColor: 'var(--primary-glow)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.78rem',
                        textTransform: 'none'
                      }}
                    >
                      Download PDF
                    </Button>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: 'var(--text-primary)' }}>
                      <Close />
                    </IconButton>
                  </Box>
                </Box>

                {/* PDF Viewer frame */}
                <Box sx={{ flexGrow: 1, width: '100%', bgcolor: '#fff', overflow: 'hidden' }}>
                  <iframe
                    src={`${resumePath}#view=FitH`}
                    title="Ashish Kumar Resume"
                    style={{ width: '100%', height: '100%', border: 'none' }}
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
