import React from 'react';
import { Dialog, Box, Typography, IconButton, Chip, Button } from '@mui/material';
import { Close, GitHub, OpenInNew } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, open, onClose }) => {
  if (!project) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(5, 8, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '24px',
          color: '#fff',
          overflow: 'hidden'
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
          }
        }
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header Image */}
            <Box sx={{ width: '100%', height: '300px', position: 'relative' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <IconButton 
                onClick={onClose}
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  bgcolor: 'rgba(0,0,0,0.5)', 
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0,242,254,0.5)' }
                }}
              >
                <Close />
              </IconButton>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(transparent, rgba(5,8,22,1))', height: '100px' }} />
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 3, md: 5 }, pt: 0 }}>
              <Typography variant="overline" sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', letterSpacing: 1 }}>
                {project.timeline}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textShadow: '0 0 10px rgba(0,242,254,0.3)' }}>
                {project.title}
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                {project.description}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                {project.github !== '#' && (
                  <Button 
                    variant="outlined" 
                    startIcon={<GitHub />} 
                    href={project.github} 
                    target="_blank"
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'var(--primary-glow)', color: 'var(--primary-glow)' } }}
                  >
                    Source Code
                  </Button>
                )}
                {project.demo !== '#' && (
                  <Button 
                    variant="contained" 
                    startIcon={<OpenInNew />} 
                    href={project.demo} 
                    target="_blank"
                    sx={{ bgcolor: 'rgba(0,242,254,0.1)', color: 'var(--primary-glow)', border: '1px solid var(--primary-glow)', '&:hover': { bgcolor: 'rgba(0,242,254,0.2)' } }}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary-glow)' }}>
                Key Features
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: 'text.secondary', mb: 4, '& li': { mb: 1 } }}>
                {project.features.map((feature, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{feature}</Typography>
                  </li>
                ))}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary-glow)' }}>
                Tech Stack
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.techStack.map((tech, idx) => (
                  <Chip 
                    key={idx} 
                    label={tech} 
                    sx={{ 
                      bgcolor: 'rgba(0,242,254,0.1)', 
                      color: '#fff',
                      border: '1px solid rgba(0,242,254,0.3)'
                    }} 
                  />
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ProjectModal;
