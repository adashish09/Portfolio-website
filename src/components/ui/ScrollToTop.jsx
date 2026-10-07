import { useState, useEffect } from 'react';
import { Box, Fab, Zoom, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useThemeMode();

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
      <Box
        component={motion.div}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        sx={{
          position: 'fixed',
          bottom: { xs: '1.25rem', sm: '2rem' },
          right: { xs: '1.25rem', sm: '2rem' },
          zIndex: 1000,
          borderRadius: '50%'
        }}
      >
        <Tooltip title="Back to top" placement="left">
          <Fab 
            size="medium"
            aria-label="scroll back to top" 
            onClick={scrollToTop}
            sx={{
              width: { xs: 42, sm: 48 },
              height: { xs: 42, sm: 48 },
              minHeight: { xs: 42, sm: 48 },
              background: isDark ? 'rgba(9, 14, 28, 0.88)' : 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid',
              borderColor: isDark ? 'rgba(0, 242, 254, 0.45)' : 'rgba(2, 132, 199, 0.45)',
              color: isDark ? 'var(--primary-glow)' : '#0284c7',
              backdropFilter: 'blur(12px)',
              boxShadow: isDark
                ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 242, 254, 0.2)'
                : '0 8px 24px rgba(15, 23, 42, 0.12), 0 0 15px rgba(2, 132, 199, 0.12)',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: isDark ? 'rgba(0, 242, 254, 0.2)' : 'rgba(2, 132, 199, 0.12)',
                borderColor: 'var(--primary-glow)',
                boxShadow: isDark
                  ? '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 242, 254, 0.4)'
                  : '0 10px 28px rgba(15, 23, 42, 0.16), 0 0 20px rgba(2, 132, 199, 0.25)'
              }
            }}
          >
            <KeyboardArrowUp sx={{ fontSize: { xs: 22, sm: 26 } }} />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
