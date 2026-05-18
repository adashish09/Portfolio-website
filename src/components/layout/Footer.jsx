import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';

const Footer = () => {
  return (
    <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton href={personalInfo.github} target="_blank" color="inherit" sx={{ '&:hover': { color: 'var(--primary-glow)' } }}>
          <GitHub />
        </IconButton>
        <IconButton href={personalInfo.linkedin} target="_blank" color="inherit" sx={{ '&:hover': { color: 'var(--primary-glow)' } }}>
          <LinkedIn />
        </IconButton>
        <IconButton href={`mailto:${personalInfo.email}`} color="inherit" sx={{ '&:hover': { color: 'var(--primary-glow)' } }}>
          <Email />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
