import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Zoom in={isVisible}>
      <motion.div
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 242, 254, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          borderRadius: '50%'
        }}
      >
        <Fab 
          aria-label="scroll back to top" 
          onClick={scrollToTop}
          sx={{
            background: 'rgba(5, 8, 22, 0.8)',
            border: '1px solid rgba(0, 242, 254, 0.5)',
            color: 'var(--primary-glow)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              background: 'rgba(0, 242, 254, 0.2)',
            }
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </motion.div>
    </Zoom>
  );
};

export default ScrollToTop;
