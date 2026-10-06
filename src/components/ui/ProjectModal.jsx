import { useState } from 'react';
import { Dialog, Box, Typography, IconButton, Chip, Button, Tooltip, Grid } from '@mui/material';
import { Close, GitHub, OpenInNew, ContentCopy, Check, Memory, Layers, Code, BugReport, Handyman, CheckCircle } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';

const ProjectModal = ({ project, open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useThemeMode();

  if (!project) return null;

  const handleCopyClone = () => {
    if (project.cloneCmd) {
      navigator.clipboard.writeText(project.cloneCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: isDark ? '#070c1a' : '#ffffff',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          color: 'var(--text-primary)',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(0,242,254,0.18)'
            : '0 25px 60px rgba(15, 23, 42, 0.25), 0 0 35px rgba(2, 132, 199, 0.12)'
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark ? 'rgba(3, 7, 18, 0.85)' : 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)'
          }
        }
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header Image with Gradient */}
            <Box sx={{ width: '100%', height: { xs: '200px', sm: '270px' }, position: 'relative', overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,12,26,0.2) 0%, rgba(7,12,26,0.95) 100%)' }} />

              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  '&:hover': { bgcolor: 'rgba(0,242,254,0.3)', color: 'var(--primary-glow)' }
                }}
              >
                <Close />
              </IconButton>

              <Box sx={{ position: 'absolute', bottom: 16, left: { xs: 20, md: 32 }, right: 20 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  {project.resumeFlagship && (
                    <Chip
                      label="⭐ Resume Flagship System"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.2)',
                        border: '1px solid #10b981',
                        color: '#34d399',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    />
                  )}
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(0,242,254,0.15)',
                      border: '1px solid var(--primary-glow)',
                      color: 'var(--primary-glow)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {project.timeline}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', fontSize: { xs: '1.4rem', sm: '1.9rem' } }}>
                  {project.title}
                </Typography>
              </Box>
            </Box>

            {/* Content Body */}
            <Box sx={{ p: { xs: 2.5, sm: 4 }, pt: 2, maxHeight: '65vh', overflowY: 'auto' }}>
              {/* Headline */}
              <Typography variant="subtitle1" sx={{ color: 'var(--secondary-glow)', fontWeight: 600, mb: 2 }}>
                {project.headline}
              </Typography>

              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', lineHeight: 1.8, mb: 3 }}>
                {project.description}
              </Typography>

              {/* Action Buttons & Clone Command */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3.5 }}>
                {project.github && project.github !== '#' && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHub />}
                    href={project.github}
                    target="_blank"
                    sx={{
                      color: 'var(--text-primary)',
                      borderColor: 'var(--card-border)',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.85rem',
                      '&:hover': { borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0,242,254,0.1)' }
                    }}
                  >
                    GitHub Repository
                  </Button>
                )}
                {project.demo && project.demo !== '#' && (
                  <Button
                    variant="contained"
                    startIcon={<OpenInNew />}
                    href={project.demo}
                    target="_blank"
                    sx={{
                      bgcolor: 'var(--primary-glow)',
                      color: isDark ? '#050814' : '#ffffff',
                      fontWeight: 700,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.85rem',
                      '&:hover': { bgcolor: 'var(--secondary-glow)' }
                    }}
                  >
                    Live Demo
                  </Button>
                )}

                {project.cloneCmd && (
                  <Tooltip title={copied ? "Copied to clipboard!" : "Click to copy clone command"}>
                    <Button
                      onClick={handleCopyClone}
                      variant="outlined"
                      startIcon={copied ? <Check sx={{ color: '#10b981' }} /> : <ContentCopy />}
                      sx={{
                        borderColor: copied ? '#10b981' : 'rgba(56, 189, 248, 0.25)',
                        bgcolor: isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.06)',
                        color: copied ? '#10b981' : (isDark ? 'var(--secondary-glow)' : '#0284c7'),
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.78rem',
                        textTransform: 'none',
                        borderRadius: '8px'
                      }}
                    >
                      {copied ? "Command Copied" : "Copy Clone Command"}
                    </Button>
                  </Tooltip>
                )}
              </Box>

              {/* Workaround Highlight (How I Worked Around Things) */}
              {project.workaroundHighlight && (
                <Box sx={{
                  mb: 3.5,
                  p: 2.5,
                  bgcolor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)',
                  border: isDark ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(5, 150, 105, 0.35)',
                  borderRadius: '12px'
                }}>
                  <Typography variant="subtitle2" sx={{ color: isDark ? '#34d399' : '#059669', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Handyman sx={{ fontSize: 18 }} /> The Engineering Workaround / How I Solved It
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.9rem', fontWeight: 500 }}>
                    {project.workaroundHighlight}
                  </Typography>
                </Box>
              )}

              {/* Resume Bullet Points */}
              {project.bulletPoints && (
                <Box sx={{ mb: 3.5, p: 2.5, bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ color: 'var(--primary-glow)', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 18 }} /> Official Resume Achievements
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, color: 'var(--text-secondary)', '& li': { mb: 1, fontSize: '0.88rem', lineHeight: 1.6 } }}>
                    {project.bulletPoints.map((bp, idx) => (
                      <li key={idx}>{bp}</li>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Architecture & Decisions */}
              {project.architecture && (
                <Box sx={{ mb: 3.5, p: 2.5, bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ color: 'var(--secondary-glow)', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Layers sx={{ fontSize: 18 }} /> System Architecture
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.architecture}
                  </Typography>
                </Box>
              )}

              {/* Key Features */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Code sx={{ fontSize: 18, color: 'var(--primary-glow)' }} /> Key Features & Capabilities
                </Typography>
                <Grid container spacing={1.2}>
                  {project.features.map((feature, idx) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1, borderRadius: '8px', bgcolor: 'var(--subtle-chip-bg)' }}>
                        <Check sx={{ color: 'var(--primary-glow)', fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                          {feature}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Complete Tech Stack */}
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Memory sx={{ fontSize: 18, color: 'var(--accent-purple)' }} /> Complete Tech Stack
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.techStack.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'var(--subtle-chip-bg)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.78rem'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ProjectModal;
