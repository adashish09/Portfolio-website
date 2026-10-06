import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, Verified } from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import CertificateViewer from '../components/ui/CertificateViewer';
import { certificationsData } from '../data/certificates';
import { useThemeMode } from '../context/ThemeContext';

const CertificateCard = ({ cert, onView }) => {
  const { isDark } = useThemeMode();
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      style={{ height: '100%' }}
    >
      <Card
        className="glass-container card-hover-lift"
        onClick={onView}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid var(--card-border)',
          bgcolor: 'var(--card-bg)',
          position: 'relative',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        {/* Certificate Image Frame */}
        <Box sx={{ position: 'relative', height: '190px', overflow: 'hidden', flexShrink: 0, bgcolor: '#020617' }}>
          <CardMedia
            component="img"
            image={cert.thumbnail}
            alt={cert.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${isDark ? 'rgba(9, 14, 28, 0.95)' : 'rgba(255, 255, 255, 0.95)'} 100%)` }} />

          {/* Top category badge */}
          <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
            <Chip
              label={cert.category}
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(7, 10, 19, 0.85)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: isDark ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid rgba(2, 132, 199, 0.3)',
                color: 'var(--primary-glow)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                fontWeight: 600
              }}
            />
          </Box>

          <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: isDark ? 'rgba(7, 10, 19, 0.85)' : 'rgba(255, 255, 255, 0.92)', color: 'var(--primary-glow)', p: 0.8, borderRadius: '50%', display: 'flex' }}>
            <Verified fontSize="small" />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 2 }}>
          <Typography variant="overline" sx={{ color: 'var(--secondary-glow)', fontWeight: 700, letterSpacing: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            {cert.organization} • {cert.issueDate}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: 'var(--text-primary)', lineHeight: 1.35, minHeight: '48px' }}>
            {cert.title}
          </Typography>

          {/* Skills tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
            {cert.skills.map((skill, idx) => (
              <span key={idx} className="code-badge" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                {skill}
              </span>
            ))}
          </Box>

          {/* View Button */}
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid var(--card-border)' }}>
            <Button
              onClick={(e) => { e.stopPropagation(); onView(); }}
              startIcon={<Visibility sx={{ fontSize: 16 }} />}
              fullWidth
              sx={{
                color: 'var(--primary-glow)',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.08)' }
              }}
            >
              Verify Certificate
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="CREDENTIALS"
          title="Certifications & Training"
          subtitle="Verified coursework and professional certificates in AI, Prompt Engineering, React, Android, and Core Java."
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3.5,
            width: '100%'
          }}
        >
          {certificationsData.map((cert) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              onView={() => setSelectedCert(cert)}
            />
          ))}
        </Box>
      </Container>

      <CertificateViewer
        certificate={selectedCert}
        open={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

export default Certifications;
