import { Dialog, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const CertificateViewer = ({ certificate, open, onClose }) => {
  if (!certificate) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: {
          background: 'var(--card-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          color: 'var(--text-primary)',
          overflow: 'hidden'
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
          }
        }
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid var(--card-border)' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{certificate.title}</Typography>
                <Typography variant="caption" sx={{ color: 'var(--primary-glow)' }}>{certificate.organization} • {certificate.issueDate}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={onClose} sx={{ color: 'var(--text-primary)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Viewer Content */}
            <Box sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              {certificate.fullFile.endsWith('.pdf') ? (
                <iframe 
                  src={certificate.fullFile} 
                  title={certificate.title}
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', borderRadius: '8px' }}
                />
              ) : (
                <img 
                  src={certificate.fullFile} 
                  alt={certificate.title} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }} 
                />
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default CertificateViewer;
