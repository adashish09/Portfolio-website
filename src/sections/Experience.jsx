import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import { timelineData } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" style={{ minHeight: '100vh', padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="md">
        <SectionHeader title="My Journey" subtitle="Experience & Education Timeline" />
        
        <Box sx={{ position: 'relative', mt: 4 }}>
          {/* Vertical Line */}
          <Box sx={{
            position: 'absolute',
            left: { xs: '20px', md: '50%' },
            transform: { xs: 'none', md: 'translateX(-50%)' },
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: 'rgba(255,255,255,0.1)'
          }} />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <Box key={index} sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                mb: 6,
                position: 'relative'
              }}>
                {/* Dot */}
                <Box sx={{
                  position: 'absolute',
                  left: { xs: '20px', md: '50%' },
                  transform: 'translate(-50%, -50%)',
                  top: { xs: '24px', md: '50%' },
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  bgcolor: 'var(--bg-color)',
                  border: '4px solid var(--primary-glow)',
                  zIndex: 2,
                  boxShadow: '0 0 10px var(--primary-glow)'
                }} />

                {/* Content Box */}
                <Box sx={{
                  width: { xs: 'calc(100% - 60px)', md: '45%' },
                  ml: { xs: '60px', md: 0 },
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start'
                }}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ width: '100%' }}
                  >
                    <Box 
                      className="glass-container" 
                      sx={{ 
                        p: 4, 
                        borderRadius: '16px', 
                        textAlign: { xs: 'left', md: isLeft ? 'right' : 'left' },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0, 242, 254, 0.1)'
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ color: 'var(--primary-glow)', mb: 1, fontWeight: 'bold' }}>
                        {item.year}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </section>
  );
};

export default Experience;
