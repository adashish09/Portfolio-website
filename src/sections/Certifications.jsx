import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { WorkspacePremium, Visibility } from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import CertificateViewer from '../components/ui/CertificateViewer';
import { certificationsData } from '../data/certificates';

const CertificateCard = ({ cert, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Card 
        className="glass-container"
        onClick={onView}
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '380px',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 10px 30px -10px rgba(0, 242, 254, 0.4)',
            borderColor: 'rgba(0, 242, 254, 0.4)'
          }
        }}
      >
        {/* Enforce strict height and aspect ratio */}
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '220px', flexShrink: 0, borderRadius: 'inherit' }}>
          <CardMedia
            component="img"
            image={cert.thumbnail}
            alt={cert.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
          <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(5, 8, 22, 0.8)', color: 'var(--primary-glow)', p: 1, borderRadius: '50%', display: 'flex', zIndex: 2 }}>
            <WorkspacePremium fontSize="small" />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold', letterSpacing: 1 }}>
            {cert.organization} • {cert.issueDate}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#fff', lineHeight: 1.3, height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {cert.title}
          </Typography>
          
          {/* Push button to bottom */}
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button 
              onClick={(e) => { e.stopPropagation(); onView(); }}
              startIcon={<Visibility />}
              fullWidth
              sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.1)' } }}
            >
              View Certificate
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
    <section id="certifications" style={{ padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Certifications" subtitle="Professional Qualifications" />
        
        {/* Responsive CSS Grid Layout */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 360px))',
            justifyContent: 'center',
            gap: '32px',
            width: '100%', 
            maxWidth: '1400px', 
            margin: '0 auto', 
            padding: '2rem' 
          }}
        >
          {certificationsData.map((cert, index) => (
            <CertificateCard key={index} cert={cert} onView={() => setSelectedCert(cert)} />
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
