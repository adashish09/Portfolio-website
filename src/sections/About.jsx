import { useState } from 'react';
import { Box, Container, Grid, Typography, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  School, 
  LocationOn, 
  Code, 
  CheckCircle, 
  AutoAwesome, 
  Speed, 
  Security,
  Bolt,
  Psychology,
  Handyman,
  ArrowForward
} from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import TiltCard from '../components/ui/TiltCard';
import { adaptabilityPrinciples } from '../data/skills';
import { personalInfo } from '../data/socialLinks';

const stats = [
  { label: 'MCA CGPA', value: '8.24 / 10', highlight: 'Chandigarh University (2026)' },
  { label: 'Independent Stacks', value: '4 Stacks', highlight: 'AI, Web, Mobile, Linux' },
  { label: 'Projects Engineered', value: '15+', highlight: 'Real-World Production Focus' },
  { label: 'Framework Ramp-Up', value: '< 72 hrs', highlight: 'First-Principles Learner' }
];

const caseStudies = [
  {
    tag: "AI & LLM Workaround",
    title: "Overcoming Cloud API Billing & Latency with Local Ollama RAG",
    stack: "Python • Ollama • Llama 3.1:8B • RAG",
    challenge: "Commercial LLM APIs incur unpredictable per-token pricing and strict rate-limits when testing adaptive interview pipelines.",
    solution: "Engineered a local inference engine running Llama 3.1:8B served via Ollama, integrated with custom vector embeddings and semantic search in Python for grounded, deterministic queries with zero token costs."
  },
  {
    tag: "Linux & Systems Workaround",
    title: "Lightweight Socket Anomaly Detection Without Heavy Daemons",
    stack: "Linux AF_PACKET • Python • React.js",
    challenge: "Enterprise network monitoring systems are heavy, opaque, and complex to deploy for targeted inspection.",
    solution: "Wrote raw Linux socket listeners in Python with protocol dissection and pattern-based rule parsing, streaming near real-time syslog alerts directly to an interactive React security dashboard."
  },
  {
    tag: "Mobile Resilience Workaround",
    title: "Zero-Data-Loss Offline-First Cache Reconciliation",
    stack: "Flutter • Dart • Hive / SQLite • Cloud Firestore",
    challenge: "Students studying in intermittent mobile network environments lose quiz answers and test scores during sudden disconnections.",
    solution: "Architected a local persistence layer that safely queues quiz state offline, with bidirectional background reconciliation that pushes scores to Cloud Firestore once connectivity returns."
  }
];

const About = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  return (
    <section id="about" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="MINDSET & ADAPTABILITY"
          title="Engineering Profile & Problem Solving"
          subtitle="Software Engineer focused on rapid technology adaptation, local AI pipelines, and resilient system design."
        />

        {/* Narrative & Stats Grid */}
        <Grid container spacing={4} alignItems="stretch" sx={{ mb: 6 }}>
          {/* Left: Bio Narrative */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <Box className="glass-container" sx={{ p: { xs: 3, md: 4.5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '20px' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Psychology sx={{ color: 'var(--primary-glow)', fontSize: 20 }} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontSize: '0.85rem', fontWeight: 600 }}>
                      // Core Engineering Ethos: Continuous Learner
                    </Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2.5, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    Eager to Learn, Adapt, and <span className="text-gradient">Work Around Complex Constraints</span>
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.8, mb: 2.5 }}>
                    I am a Software Engineer and MCA graduate (2024–2026, <strong>CGPA: 8.24/10</strong>) from Chandigarh University, with prior undergraduate studies in BCA from IGNOU (<strong>70.11%</strong>).
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.8, mb: 2.5 }}>
                    Over the past year, I built four independent systems spanning four completely distinct technology stacks. When handed a tool or framework I haven't touched before, I don't wait for guided tutorials — I study official documentation, read RFCs, examine source implementations, and prototype reliable software in days.
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.8 }}>
                    Whether architecting <strong>RAG-grounded local LLM inference engines</strong>, capturing <strong>raw Linux network packets</strong>, or publishing <strong>native Android & Flutter apps</strong>, I focus on solving the real bottlenecks: latency, cost, memory, and offline resilience.
                  </Typography>
                </Box>

                {/* Specs Pill Matrix */}
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(255,255,255,0.03)', px: 1.5, py: 0.7, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <LocationOn sx={{ color: 'var(--primary-glow)', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>
                      Location: Bengaluru, India
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(255,255,255,0.03)', px: 1.5, py: 0.7, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <School sx={{ color: 'var(--secondary-glow)', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>
                      Education: MCA '26 (8.24 CGPA)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: 'rgba(16, 185, 129, 0.1)', px: 1.5, py: 0.7, borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <CheckCircle sx={{ color: '#10b981', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#34d399', fontWeight: 600 }}>
                      Status: Open to Full-Time Roles
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right: Key Stats */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2.5} sx={{ height: '100%' }}>
              {stats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 12 }} key={index} sx={{ display: 'flex' }}>
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
                        borderRadius: '16px',
                        border: '1px solid rgba(56, 189, 248, 0.18)'
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
                      <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
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

        {/* Interactive "How I Work Around Things" Case Studies */}
        <Box sx={{ mb: 6 }}>
          <Box className="glass-container" sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Handyman sx={{ color: 'var(--primary-glow)', fontSize: 22 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                  Engineering Case Studies: How I Work Around Obstacles
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                Click a scenario to see the engineering solution
              </Typography>
            </Box>

            {/* Scenario Tabs */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {caseStudies.map((cs, idx) => (
                <Chip
                  key={idx}
                  label={cs.tag}
                  onClick={() => setActiveCaseIdx(idx)}
                  sx={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8rem',
                    py: 2,
                    px: 1,
                    borderRadius: '8px',
                    bgcolor: activeCaseIdx === idx ? 'var(--primary-glow)' : 'var(--subtle-chip-bg)',
                    color: activeCaseIdx === idx ? '#050814' : 'var(--text-secondary)',
                    fontWeight: activeCaseIdx === idx ? 700 : 500,
                    border: '1px solid',
                    borderColor: activeCaseIdx === idx ? 'var(--primary-glow)' : 'var(--card-border)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: activeCaseIdx === idx ? 'var(--secondary-glow)' : 'rgba(0, 242, 254, 0.1)'
                    }
                  }}
                />
              ))}
            </Box>

            {/* Selected Scenario Details */}
            <Box sx={{ p: 3, bgcolor: 'var(--subtle-chip-bg)', borderRadius: '14px', border: '1px solid var(--card-border)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                  {caseStudies[activeCaseIdx].title}
                </Typography>
                <Chip
                  label={caseStudies[activeCaseIdx].stack}
                  size="small"
                  sx={{ bgcolor: 'rgba(0, 242, 254, 0.12)', color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}
                />
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, borderRadius: '10px', bgcolor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <Typography variant="caption" sx={{ color: '#f87171', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', display: 'block', mb: 0.8 }}>
                      // The Real Constraint
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                      {caseStudies[activeCaseIdx].challenge}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ p: 2, borderRadius: '10px', bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', display: 'block', mb: 0.8 }}>
                      // The Engineering Workaround
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                      {caseStudies[activeCaseIdx].solution}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        {/* 4 Adaptability Principles Grid */}
        <Box sx={{ mt: 7 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--primary-glow)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                display: 'block',
                mb: 1
              }}
            >
              // FIRST PRINCIPLES & AGILITY
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: { xs: '1.45rem', sm: '1.85rem' }
              }}
            >
              Core Adaptability Principles
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--text-secondary)',
                maxWidth: '580px',
                mx: 'auto',
                mt: 1,
                fontSize: '0.9rem'
              }}
            >
              How I approach unfamiliar technologies, engineer pragmatic workarounds, and ground solutions in CS fundamentals.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 3
            }}
          >
            {adaptabilityPrinciples.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ width: '100%', display: 'flex' }}
              >
                <TiltCard maxTilt={5} scale={1.015} style={{ width: '100%', height: '100%', display: 'flex' }}>
                  <Box
                    className="card-hover-lift"
                  sx={{
                    p: 2.8,
                    width: '100%',
                    minHeight: '260px',
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(16px)',
                    position: 'relative',
                    boxShadow: 'var(--card-shadow)',
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
                      height: '3px',
                      background: `linear-gradient(90deg, ${p.color}, transparent 80%)`,
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  />

                  {/* Header: Status Index & Number */}
                  <Box sx={{ mb: 1.8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                      <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: p.color, fontSize: '0.82rem', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
                        CORE // {p.number}
                      </Typography>
                    </Box>

                    <Chip
                      label={p.subtitle}
                      size="small"
                      sx={{
                        bgcolor: `${p.color}14`,
                        color: p.color,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.70rem',
                        height: 22,
                        fontWeight: 600,
                        border: `1px solid ${p.color}30`,
                        maxWidth: '100%',
                        '& .MuiChip-label': { px: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Box sx={{ minHeight: '38px', display: 'flex', alignItems: 'center', mb: 1.2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        fontSize: '1.05rem',
                        lineHeight: 1.3
                      }}
                    >
                      {p.title}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Box sx={{ flexGrow: 1, mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        fontSize: '0.88rem'
                      }}
                    >
                      {p.description}
                    </Typography>
                  </Box>
                </Box>
              </TiltCard>
            </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default About;
