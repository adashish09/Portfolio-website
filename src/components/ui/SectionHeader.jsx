import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 1 }}>
          <span className="text-gradient">{title}</span>
        </Typography>
        {subtitle && (
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            {subtitle}
          </Typography>
        )}
        <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--primary-glow)', mt: 2, borderRadius: '2px' }} />
      </motion.div>
    </Box>
  );
};

export default SectionHeader;
