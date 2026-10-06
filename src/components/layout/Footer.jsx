import { Box, Container, Typography, IconButton, Stack, Chip } from '@mui/material';
import { GitHub, LinkedIn, Email, KeyboardArrowUp } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'var(--bg-primary)', borderTop: '1px solid var(--card-border)', py: 6, position: 'relative', transition: 'background-color 0.3s ease, border-color 0.3s ease' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
          {/* Brand info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1.5, mb: 1 }}>
              <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: 'var(--primary-glow)', fontSize: '1.2rem' }}>
                {personalInfo.name}
              </Typography>
              <Chip
                label="MCA '26"
                size="small"
                sx={{
                  bgcolor: 'rgba(56, 189, 248, 0.1)',
                  color: 'var(--secondary-glow)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  height: 20
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
              Engineered with React.js, Framer Motion, and Material UI. Designed for modern developer workflows.
            </Typography>
          </Box>

          {/* Social icons */}
          <Stack direction="row" spacing={1.5}>
            <IconButton
              href={personalInfo.github}
              target="_blank"
              sx={{
                color: 'var(--text-secondary)',
                bgcolor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { color: 'var(--primary-glow)', borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0,242,254,0.1)' }
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              href={personalInfo.linkedin}
              target="_blank"
              sx={{
                color: 'var(--text-secondary)',
                bgcolor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { color: 'var(--primary-glow)', borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0,242,254,0.1)' }
              }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton
              href={`mailto:${personalInfo.email}`}
              sx={{
                color: 'var(--text-secondary)',
                bgcolor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { color: 'var(--primary-glow)', borderColor: 'var(--primary-glow)', bgcolor: 'rgba(0,242,254,0.1)' }
              }}
            >
              <Email fontSize="small" />
            </IconButton>
            <IconButton
              onClick={scrollToTop}
              sx={{
                color: 'var(--text-secondary)',
                bgcolor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { color: 'var(--text-primary)', borderColor: 'var(--primary-glow)', bgcolor: 'rgba(56,189,248,0.1)' }
              }}
            >
              <KeyboardArrowUp fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Bengaluru, Karnataka, India • {personalInfo.status}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
