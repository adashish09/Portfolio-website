import { useRef, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Snackbar, Alert, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Send, LocationOn, Email, LinkedIn, GitHub, Phone, ContentCopy, Check } from '@mui/icons-material';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';

const ContactCard = ({ icon, title, value, link, copyValue }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: '12px',
        bgcolor: 'rgba(12, 18, 34, 0.6)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        mb: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(0, 242, 254, 0.4)',
          bgcolor: 'rgba(56, 189, 248, 0.05)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            p: 1.2,
            borderRadius: '10px',
            bgcolor: 'rgba(0, 242, 254, 0.1)',
            color: 'var(--primary-glow)',
            display: 'flex'
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            {title}
          </Typography>
          {link ? (
            <Typography
              component="a"
              href={link}
              target="_blank"
              sx={{
                display: 'block',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { color: 'var(--primary-glow)' }
              }}
            >
              {value}
            </Typography>
          ) : (
            <Typography sx={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
              {value}
            </Typography>
          )}
        </Box>
      </Box>

      {copyValue && (
        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? '#10b981' : 'var(--text-secondary)' }}>
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

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
      .then(() => {
        setStatus({ open: true, type: 'success', message: 'Message sent successfully! Ashish will reply soon.' });
        form.current.reset();
        setLoading(false);
      }, () => {
        setStatus({ open: true, type: 'error', message: 'Email service requires API keys in .env. You can also email ashishkumar.dev16@gmail.com directly!' });
        setLoading(false);
      });
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      background: 'rgba(4, 8, 20, 0.6)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.9rem',
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(56, 189, 248, 0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(0, 242, 254, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--primary-glow)' }
    },
    '& .MuiInputLabel-root': {
      color: 'var(--text-muted)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.85rem',
      '&.Mui-focused': { color: 'var(--primary-glow)' }
    }
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="COMMUNICATION"
          title="Get In Touch"
          subtitle="Open for full-time engineering roles, high-impact projects, or tech discussions."
        />

        <Grid container spacing={5} alignItems="flex-start">
          {/* Left Column: Contact Cards */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box className="glass-container" sx={{ p: { xs: 3, sm: 4 }, borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: '#fff' }}>
                  Let's <span className="text-gradient">Connect</span>
                </Typography>

                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3.5, lineHeight: 1.7 }}>
                  I am actively seeking software engineering roles in full-stack web, AI/LLM integration, or Android/mobile systems. Feel free to copy my direct contact details or drop a note below.
                </Typography>

                <ContactCard
                  icon={<Email fontSize="small" />}
                  title="Direct Email"
                  value={personalInfo.email}
                  link={`mailto:${personalInfo.email}`}
                  copyValue={personalInfo.email}
                />
                <ContactCard
                  icon={<Phone fontSize="small" />}
                  title="Phone / WhatsApp"
                  value={personalInfo.phone}
                  link={`tel:${personalInfo.phone}`}
                  copyValue={personalInfo.phone}
                />
                <ContactCard
                  icon={<LinkedIn fontSize="small" />}
                  title="LinkedIn"
                  value="linkedin.com/in/ashish-kumar-ad0016"
                  link={personalInfo.linkedin}
                />
                <ContactCard
                  icon={<GitHub fontSize="small" />}
                  title="GitHub"
                  value="github.com/adashish09"
                  link={personalInfo.github}
                />
                <ContactCard
                  icon={<LocationOn fontSize="small" />}
                  title="Location"
                  value={personalInfo.location}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column: Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box className="glass-container" sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
                  Send a Message
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', display: 'block', mb: 3 }}>
                  // Response time: usually under 24 hours
                </Typography>

                <form ref={form} onSubmit={sendEmail}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth name="name" label="Your Name" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth type="email" name="email" label="Your Email" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth name="title" label="Subject / Role" variant="outlined" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth multiline rows={5} name="message" label="Your Message / Job Description" variant="outlined" sx={inputStyles} />
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
                          bgcolor: 'var(--primary-glow)',
                          color: '#050814',
                          fontWeight: 700,
                          py: 1.5,
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.95rem',
                          borderRadius: '10px',
                          textTransform: 'none',
                          boxShadow: '0 0 25px rgba(0, 242, 254, 0.3)',
                          '&:hover': { bgcolor: 'var(--secondary-glow)', boxShadow: '0 0 35px rgba(0, 242, 254, 0.5)' },
                          '&:disabled': { bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
                        }}
                      >
                        {loading ? <CircularProgress size={22} sx={{ color: '#050814' }} /> : 'Transmit Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
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
          sx={{ width: '100%', borderRadius: '10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;
