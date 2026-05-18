import React, { useRef, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Snackbar, Alert, Card, CircularProgress } from '@mui/material';
import { Send, LocationOn, Email, LinkedIn, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';

const ContactInfo = ({ icon, title, value, link }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
    <Box sx={{
      p: 2,
      borderRadius: '16px',
      background: 'rgba(0, 242, 254, 0.1)',
      color: 'var(--primary-glow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(0, 242, 254, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 242, 254, 0.1)'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>{title}</Typography>
      {link ? (
        <Typography
          component="a"
          href={link}
          target="_blank"
          sx={{ display: 'block', color: '#fff', fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none', '&:hover': { color: 'var(--primary-glow)' }, transition: 'color 0.2s' }}
        >
          {value}
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500 }}>{value}</Typography>
      )}
    </Box>
  </Box>
);

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState({ open: false, type: 'success', message: '' });
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        setStatus({ open: true, type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        form.current.reset();
        setLoading(false);
      }, (error) => {
        setStatus({ open: true, type: 'error', message: 'Please configure EmailJS keys in .env to send messages.' });
        setLoading(false);
      });
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.02)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(0, 242, 254, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--primary-glow)' }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.5)',
      '&.Mui-focused': { color: 'var(--primary-glow)' }
    }
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Get In Touch" subtitle="Let's build something amazing together" />

        <Grid container spacing={8} alignItems="center">
          {/* Left Column: Contact Info */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                Let's <span className="text-gradient">Connect</span>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, lineHeight: 1.8, fontSize: '1.1rem' }}>
                I am currently open for full-time opportunities in software engineering, AI systems, and full-stack development. Whether you have a project in mind, a question, or just want to connect, my inbox is always open!
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 5,
                }}
              >
              <ContactInfo icon={<Email fontSize="medium" />} title="Email" value={personalInfo.email} link={`mailto:${personalInfo.email}`} />
              <ContactInfo icon={<LinkedIn fontSize="medium" />} title="LinkedIn" value="Connect on LinkedIn" link={personalInfo.linkedin} />
              <ContactInfo icon={<GitHub fontSize="medium" />} title="GitHub" value="View GitHub Profile" link={personalInfo.github} />
              <ContactInfo icon={<LocationOn fontSize="medium" />} title="Location" value={personalInfo.location} />
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column: Modern Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-container" sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: '#fff' }}>
                  Send me a message
                </Typography>

                <form ref={form} onSubmit={sendEmail}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth name="name" label="Your Name" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth type="email" name="email" label="Your Email" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField required fullWidth name="title" label="Subject" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth multiline rows={5} name="message" label="Message" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        fullWidth
                        endIcon={loading ? null : <Send />}
                        sx={{
                          mt: 2,
                          bgcolor: 'rgba(0, 242, 254, 0.1)',
                          border: '1px solid var(--primary-glow)',
                          color: 'var(--primary-glow)',
                          fontWeight: 'bold',
                          py: 2,
                          fontSize: '1.1rem',
                          borderRadius: '12px',
                          textTransform: 'none',
                          boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.2)', boxShadow: '0 0 30px rgba(0, 242, 254, 0.4)' },
                          '&:disabled': { bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        {loading ? <CircularProgress size={24} sx={{ color: 'var(--primary-glow)' }} /> : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={status.open}
        autoHideDuration={6000}
        onClose={() => setStatus({ ...status, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setStatus({ ...status, open: false })}
          severity={status.type}
          variant="filled"
          sx={{ width: '100%', borderRadius: '12px', fontWeight: 'bold' }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;
