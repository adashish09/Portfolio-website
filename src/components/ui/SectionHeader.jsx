import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const SectionHeader = ({ tag, title, subtitle, align = 'center' }) => {
  return (
    <Box sx={{ mb: { xs: 5, md: 8 }, textAlign: align }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {tag && (
          <Typography
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              color: 'var(--primary-glow)',
              mb: 1.2,
              letterSpacing: 1.5,
              fontWeight: 600,
              textTransform: 'uppercase'
            }}
          >
            // {tag}
          </Typography>
        )}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
            fontWeight: 800,
            mb: 1.5,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}
        >
          <span className="text-gradient">{title}</span>
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: '680px',
              margin: align === 'center' ? '0 auto' : 0,
              lineHeight: 1.6
            }}
          >
            {subtitle}
          </Typography>
        )}
        <Box
          sx={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, var(--primary-glow), var(--secondary-glow))',
            mt: 2.5,
            borderRadius: '2px',
            margin: align === 'center' ? '20px auto 0' : '20px 0 0'
          }}
        />
      </motion.div>
    </Box>
  );
};

export default SectionHeader;
