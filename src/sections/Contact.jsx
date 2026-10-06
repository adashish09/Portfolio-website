import { useRef, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Snackbar, Alert, CircularProgress, IconButton, Tooltip, Chip } from '@mui/material';
import { Send, LocationOn, Email, LinkedIn, GitHub, ContentCopy, Check, AccessTime, Code, Terminal, Launch } from '@mui/icons-material';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';
import { useThemeMode } from '../context/ThemeContext';

const ContactCard = ({ icon, title, value, link, copyValue, badge }) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useThemeMode();

  const handleCopy = (e) => {
    e.stopPropagation();
    if (copyValue) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
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
        bgcolor: isDark ? 'var(--card-bg)' : 'rgba(248, 250, 252, 0.85)',
        border: '1px solid var(--card-border)',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(15, 23, 42, 0.04)',
        mb: 2,
        transition: 'all 0.22s ease',
        '&:hover': {
          borderColor: 'var(--primary-glow)',
          bgcolor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Box
          sx={{
            p: 1.2,
            borderRadius: '10px',
            bgcolor: 'rgba(0, 242, 254, 0.1)',
            color: 'var(--primary-glow)',
            display: 'flex',
            flexShrink: 0
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              {title}
            </Typography>
            {badge && (
              <Chip
                label={badge}
                size="small"
                sx={{
                  bgcolor: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(5, 150, 105, 0.12)',
                  color: isDark ? '#10b981' : '#059669',
                  height: 18,
                  fontSize: '0.65rem',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            )}
          </Box>
          {link ? (
            <Typography
              component="a"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '&:hover': { color: 'var(--primary-glow)' }
              }}
            >
              {value}
            </Typography>
          ) : (
            <Typography sx={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {value}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, ml: 1.5 }}>
        {copyValue && (
          <Tooltip title={copied ? "Copied to clipboard!" : "Copy value"}>
            <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? '#10b981' : 'var(--text-secondary)' }}>
              {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
            </IconButton>
          </Tooltip>
        )}
        {link && (
          <Tooltip title="Open link">
            <IconButton component="a" href={link} target="_blank" size="small" sx={{ color: 'var(--text-secondary)', '&:hover': { color: 'var(--primary-glow)' } }}>
              <Launch sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState({ open: false, type: 'success', message: '' });
  const [loading, setLoading] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const { isDark } = useThemeMode();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setStatus({ open: true, type: 'success', message: 'Message transmitted successfully! Ashish will reply within 12 hours.' });
        form.current.reset();
        setLoading(false);
      }, () => {
        setStatus({ open: true, type: 'error', message: 'Message transmission queued. You can also email ashishkumar.dev16@gmail.com directly!' });
        setLoading(false);
      });
  };

  const handleCopyEmailDirect = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(248, 250, 252, 0.85)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.9rem',
      color: 'var(--text-primary)',
      transition: 'all 0.2s ease',
      boxShadow: isDark ? 'none' : 'inset 0 1px 2px rgba(15, 23, 42, 0.04)',
      '& fieldset': {
        borderColor: isDark ? 'var(--card-border)' : 'rgba(203, 213, 225, 0.85)',
        borderWidth: '1px'
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary-glow)'
      },
      '&.Mui-focused': {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
        boxShadow: isDark ? '0 0 16px rgba(0, 242, 254, 0.12)' : '0 0 16px rgba(2, 132, 199, 0.14)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-glow)',
        borderWidth: '1.5px'
      },
      '& .MuiInputBase-input': {
        color: 'var(--text-primary)',
        py: 1.6
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'var(--text-muted)',
        opacity: 0.85
      }
    },
    '& .MuiInputLabel-root': {
      color: 'var(--text-secondary)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.85rem',
      '&.Mui-focused': { color: 'var(--primary-glow)', fontWeight: 600 }
    }
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="COMMUNICATION & INQUIRIES"
          title="Let's Build Together"
          subtitle="Open for full-time Software Engineer roles, high-impact projects, and technical discussions."
        />

        <Grid container spacing={4.5} alignItems="stretch">
          {/* Left Column: Direct Dev Reachouts */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <Box
                className="glass-container"
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: '20px',
                  border: '1px solid var(--card-border)',
                  bgcolor: 'var(--card-bg)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  {/* Status Banner */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2, bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', px: 2, py: 1, borderRadius: '10px' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                      Available for Immediate Full-Time Roles
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'var(--text-primary)' }}>
                    Direct <span className="text-gradient">Channels</span>
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3.5, lineHeight: 1.7, fontSize: '0.92rem' }}>
                    I am actively seeking software engineering roles in <strong>full-stack web development</strong>, <strong>AI/LLM systems</strong>, and <strong>mobile application engineering</strong>. Reach out directly via email or LinkedIn!
                  </Typography>

                  {/* Contact Cards - NO PHONE */}
                  <ContactCard
                    icon={<Email fontSize="small" />}
                    title="Direct Email"
                    value={personalInfo.email}
                    link={`mailto:${personalInfo.email}`}
                    copyValue={personalInfo.email}
                    badge="Primary"
                  />
                  <ContactCard
                    icon={<LinkedIn fontSize="small" />}
                    title="LinkedIn Profile"
                    value="in/ashish-kumar-ad0016"
                    link={personalInfo.linkedin}
                    badge="Verified"
                  />
                  <ContactCard
                    icon={<GitHub fontSize="small" />}
                    title="GitHub Repositories"
                    value="github.com/adashish09"
                    link={personalInfo.github}
                    badge="Open Source"
                  />
                  <ContactCard
                    icon={<LocationOn fontSize="small" />}
                    title="Location"
                    value="Bengaluru, Karnataka, India"
                    badge="IST (UTC+5:30)"
                  />
                </Box>

                {/* Quick Dev CLI Box */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: '12px',
                    bgcolor: isDark ? 'rgba(4, 8, 20, 0.8)' : 'rgba(241, 245, 249, 0.95)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(203, 213, 225, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Terminal sx={{ color: 'var(--primary-glow)', fontSize: 18 }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#475569' }}>
                      mailto:{personalInfo.email}
                    </Typography>
                  </Box>
                  <Tooltip title={copiedCli ? "Email Copied!" : "Copy mailto address"}>
                    <Button
                      size="small"
                      onClick={handleCopyEmailDirect}
                      sx={{
                        color: copiedCli ? '#10b981' : (isDark ? 'var(--primary-glow)' : '#0284c7'),
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.74rem',
                        textTransform: 'none',
                        px: 1.5,
                        py: 0.4,
                        borderRadius: '6px',
                        bgcolor: isDark ? 'transparent' : 'rgba(2, 132, 199, 0.08)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.3)',
                        '&:hover': {
                          bgcolor: isDark ? 'rgba(0, 242, 254, 0.12)' : 'rgba(2, 132, 199, 0.16)'
                        }
                      }}
                    >
                      {copiedCli ? "Copied" : "Copy"}
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Column: Contact Transmission Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <Box
                className="glass-container"
                sx={{
                  p: { xs: 3, sm: 4.5 },
                  borderRadius: '20px',
                  border: '1px solid var(--card-border)',
                  bgcolor: 'var(--card-bg)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                      Transmit <span className="text-gradient">Message</span>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'var(--text-muted)' }}>
                      <AccessTime sx={{ fontSize: 15, color: 'var(--primary-glow)' }} />
                      <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                        Response time: &lt; 12 hours
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3.5, lineHeight: 1.6 }}>
                    Fill out the form below to send an encrypted transmission directly to my inbox. I am eager to discuss engineering opportunities and technical challenges.
                  </Typography>

                  <form ref={form} onSubmit={sendEmail}>
                    <Grid container spacing={2.5}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField required fullWidth name="name" label="Your Name" placeholder="e.g. Hiring Manager / Engineer" variant="outlined" sx={inputStyles} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField required fullWidth type="email" name="email" label="Your Email" placeholder="recruiter@company.com" variant="outlined" sx={inputStyles} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField required fullWidth name="title" label="Subject / Opportunity" placeholder="e.g. Software Engineer Role • Full-Stack / AI" variant="outlined" sx={inputStyles} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField required fullWidth multiline rows={6} name="message" label="Project Details / Role Requirements" placeholder="Share role specifics, company mission, or what technical challenge you are solving..." variant="outlined" sx={inputStyles} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          fullWidth
                          endIcon={loading ? null : <Send sx={{ fontSize: 18 }} />}
                          sx={{
                            background: isDark
                              ? 'linear-gradient(135deg, #00f2fe 0%, #38bdf8 100%)'
                              : 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                            color: isDark ? '#050814' : '#ffffff',
                            fontWeight: 700,
                            py: 1.6,
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.95rem',
                            letterSpacing: '0.02em',
                            borderRadius: '12px',
                            textTransform: 'none',
                            boxShadow: isDark
                              ? '0 8px 25px rgba(0, 242, 254, 0.35)'
                              : '0 8px 24px rgba(2, 132, 199, 0.35)',
                            transition: 'all 0.25s ease',
                            '&:hover': {
                              background: isDark
                                ? 'linear-gradient(135deg, #38bdf8 0%, #00f2fe 100%)'
                                : 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
                              boxShadow: isDark
                                ? '0 12px 35px rgba(0, 242, 254, 0.55)'
                                : '0 10px 28px rgba(2, 132, 199, 0.45)',
                              transform: 'translateY(-2px)'
                            },
                            '&:disabled': {
                              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                            }
                          }}
                        >
                          {loading ? <CircularProgress size={22} sx={{ color: isDark ? '#050814' : '#ffffff' }} /> : 'Transmit Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
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
          sx={{ width: '100%', borderRadius: '12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.88rem' }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;
