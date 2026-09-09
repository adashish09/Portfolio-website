import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  School, 
  LocationOn, 
  Code, 
  CheckCircle, 
  AutoAwesome, 
  Speed, 
  Security 
} from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';

const stats = [
  { label: 'MCA CGPA', value: '8.24 / 10', highlight: 'Chandigarh Univ' },
  { label: 'Projects Built', value: '15+', highlight: 'AI, Web & Mobile' },
  { label: 'Technologies', value: '25+', highlight: 'Full Stack & Linux' },
  { label: 'Experience', value: '2+ Years', highlight: 'Hands-on Coding' }
];

const principles = [
  {
    index: "01",
    color: '#00f2fe',
    icon: <AutoAwesome sx={{ color: '#00f2fe', fontSize: 18 }} />,
    title: 'Pragmatic AI & LLMs',
    tag: 'RAG & Ollama',
    desc: 'Engineering contextual RAG pipelines and lightweight local inference delivering measurable utility over generic wrappers.'
  },
  {
    index: "02",
    color: '#4facfe',
    icon: <Speed sx={{ color: '#4facfe', fontSize: 18 }} />,
    title: 'Offline-First Resilience',
    tag: 'Architecture',
    desc: 'Architecting local state caching, background sync, and lifecycle reconciliation for seamless offline reliability.'
  },
  {
    index: "03",
    color: '#a855f7',
    icon: <Security sx={{ color: '#a855f7', fontSize: 18 }} />,
    title: 'System-Level Thinking',
    tag: 'Linux & NIDS',
    desc: 'Investigating Linux internals, raw packet inspection, socket streams, and rule-based anomaly detection engines.'
  },
  {
    index: "04",
    color: '#10b981',
    icon: <Code sx={{ color: '#10b981', fontSize: 18 }} />,
    title: 'Core Fundamentals',
    tag: 'DSA & Systems',
    desc: 'Grounding systems in algorithmic efficiency, clean object-oriented patterns, and relational DBMS integrity.'
  }
];

const About = () => {
  return (
    <section id="about" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="PROFILE & VALUES"
          title="Engineering Profile"
          subtitle="Software Engineer with a focus on practical AI integration, full-stack scalability, and deep system fundamentals."
        />

        {/* Narrative & Quick Specs Grid */}
        <Grid container spacing={5} alignItems="stretch" sx={{ mb: 6 }}>
          {/* Left: Bio Narrative */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <Box className="glass-container" sx={{ p: { xs: 3, md: 4.5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5, color: '#fff' }}>
                    Bridging <span className="text-gradient">Modern Web, Local AI & Mobile Systems</span>
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, mb: 2.5 }}>
                    I am a Software Engineer and MCA graduate (2024–2026, <strong>CGPA: 8.24/10</strong>) from Chandigarh University, previously earning my BCA from IGNOU (<strong>70.11%</strong>).
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, mb: 2.5 }}>
                    Over the past two years, I have architected four independent production-ready systems spanning disparate technology stacks — from building <strong>RAG-grounded local LLM inference engines</strong> and <strong>Linux network intrusion detection suites</strong>, to shipping native <strong>Android</strong> and <strong>cross-platform Flutter</strong> applications with offline-first synchronization.
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                    My engineering approach emphasizes reliable architectures, modular code separation, and solving real user constraints with technical rigor.
                  </Typography>
                </Box>

                {/* Specs Pill Matrix */}
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(255,255,255,0.03)', px: 1.5, py: 0.8, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <LocationOn sx={{ color: 'var(--primary-glow)', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>
                      Location: Bengaluru, India
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(255,255,255,0.03)', px: 1.5, py: 0.8, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <School sx={{ color: 'var(--secondary-glow)', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>
                      Education: MCA '26 (8.24 CGPA)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(16, 185, 129, 0.1)', px: 1.5, py: 0.8, borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <CheckCircle sx={{ color: '#10b981', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#34d399', fontWeight: 600 }}>
                      Status: Open for Opportunities
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right: Key Stats */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={2.5} sx={{ height: '100%' }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={12} key={index} sx={{ display: 'flex' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <Box
                      className="glass-container card-hover-lift"
                      sx={{
                        p: 3,
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: '16px'
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: 'JetBrains Mono, monospace',
                          color: 'var(--primary-glow)',
                          fontWeight: 800,
                          mb: 0.5,
                          fontSize: { xs: '2rem', md: '2.4rem' }
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {stat.highlight}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Engineering Philosophy Cards - Strictly Uniform Grid */}
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3.5,
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '1.25rem'
            }}
          >
            &lt;EngineeringPrinciples /&gt;
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 3
            }}
          >
            {principles.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <Box
                  className="card-hover-lift"
                  sx={{
                    p: 2.8,
                    width: '100%',
                    height: { xs: '250px', sm: '250px', md: '260px' },
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    background: 'linear-gradient(155deg, rgba(12, 18, 34, 0.85) 0%, rgba(6, 10, 22, 0.92) 100%)',
                    backdropFilter: 'blur(16px)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: p.color,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 14px 32px -8px ${p.color}33`
                    }
                  }}
                >
                  {/* Top Glowing Accent Line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: `linear-gradient(90deg, ${p.color}, transparent 80%)`
                    }}
                  />

                  {/* Header: Status Index & Icon */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '36px', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                      <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: p.color, fontSize: '0.8rem', fontWeight: 700 }}>
                        CORE // {p.index}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '10px',
                        bgcolor: `${p.color}15`,
                        border: `1px solid ${p.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {p.icon}
                    </Box>
                  </Box>

                  {/* Title: Exactly 42px height container so descriptions align across all cards */}
                  <Box sx={{ height: '42px', display: 'flex', alignItems: 'center', mb: 1.2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: '#fff',
                        fontSize: '1.02rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {p.title}
                    </Typography>
                  </Box>

                  {/* Description: Exactly 68px height container with 3-line clamp */}
                  <Box sx={{ height: '68px', overflow: 'hidden', mb: 1.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        fontSize: '0.84rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {p.desc}
                    </Typography>
                  </Box>

                  {/* Bottom Tag: Fixed height, pinned to bottom */}
                  <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                    <span
                      className="code-badge"
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {p.tag}
                    </span>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default About;
