import { useState } from 'react';
import { Dialog, Box, Typography, IconButton, Chip, Button, Tooltip } from '@mui/material';
import { Close, GitHub, OpenInNew, ContentCopy, Check, Memory, Layers, Code, BugReport } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, open, onClose }) => {
  const [copied, setCopied] = useState(false);

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
          background: '#080d1a',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '20px',
          color: '#fff',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,242,254,0.15)'
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(3, 7, 18, 0.8)',
            backdropFilter: 'blur(8px)'
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
            <Box sx={{ width: '100%', height: { xs: '200px', sm: '280px' }, position: 'relative', overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,13,26,0.2) 0%, rgba(8,13,26,0.95) 100%)' }} />

              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  '&:hover': { bgcolor: 'rgba(0,242,254,0.3)', color: 'var(--primary-glow)' }
                }}
              >
                <Close />
              </IconButton>

              <Box sx={{ position: 'absolute', bottom: 16, left: { xs: 20, md: 32 }, right: 20 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(0,242,254,0.15)',
                      border: '1px solid var(--primary-glow)',
                      color: 'var(--primary-glow)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {project.timeline}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 4 }}>
                {project.github && project.github !== '#' && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHub />}
                    href={project.github}
                    target="_blank"
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.85rem',
                      '&:hover': { borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0,242,254,0.1)' }
                    }}
                  >
                    View Source
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
                      color: '#050814',
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
                  <Tooltip title={copied ? "Copied!" : "Click to copy clone command"}>
                    <Button
                      onClick={handleCopyClone}
                      variant="outlined"
                      startIcon={copied ? <Check sx={{ color: '#10b981' }} /> : <ContentCopy />}
                      sx={{
                        borderColor: copied ? '#10b981' : 'rgba(56, 189, 248, 0.25)',
                        bgcolor: 'rgba(56, 189, 248, 0.05)',
                        color: copied ? '#10b981' : 'var(--secondary-glow)',
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

              {/* Architecture & Engineering Decisions */}
              {project.architecture && (
                <Box sx={{ mb: 3.5, p: 2.5, bgcolor: 'rgba(12, 18, 34, 0.6)', border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ color: 'var(--primary-glow)', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Layers sx={{ fontSize: 18 }} /> Architecture & Technical Decisions
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.architecture}
                  </Typography>
                </Box>
              )}

              {/* Problem Solved */}
              {project.problemSolved && (
                <Box sx={{ mb: 3.5, p: 2.5, bgcolor: 'rgba(12, 18, 34, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#f59e0b', fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BugReport sx={{ fontSize: 18 }} /> Problem Statement & Engineering Impact
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.problemSolved}
                  </Typography>
                </Box>
              )}

              {/* Key Features */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Code sx={{ fontSize: 18, color: 'var(--primary-glow)' }} /> Key Features & Capabilities
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, color: 'var(--text-secondary)', '& li': { mb: 0.8, fontSize: '0.9rem' } }}>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </Box>
              </Box>

              {/* Tech Stack Chips */}
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Memory sx={{ fontSize: 18, color: 'var(--accent-purple)' }} /> Complete Tech Stack
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.techStack.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
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
