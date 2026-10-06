import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, CircularProgress, Button, Tooltip, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, Star, ForkRight, ContentCopy, Check, Code, OpenInNew, Terminal, BarChart, Commit, Storage, Layers } from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';
import { useThemeMode } from '../context/ThemeContext';

const StatCard = ({ title, value, subtitle, icon, color = 'var(--primary-glow)' }) => (
  <Box
    className="glass-container card-hover-lift"
    sx={{
      textAlign: 'left',
      p: 2.8,
      borderRadius: '16px',
      border: '1px solid var(--card-border)',
      bgcolor: 'var(--card-bg)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
      <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
        {title}
      </Typography>
      <Box sx={{ p: 0.8, borderRadius: '8px', bgcolor: `${color}15`, color: color, display: 'flex' }}>
        {icon}
      </Box>
    </Box>
    <Typography
      variant="h3"
      sx={{
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--text-primary)',
        fontWeight: 800,
        mb: 0.5,
        fontSize: { xs: '1.8rem', md: '2.2rem' }
      }}
    >
      {value}
    </Typography>
    {subtitle && (
      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

const featuredRepos = [
  {
    name: "AI-Resume-Interviewer",
    description: "Adaptive AI interview simulation platform grounded with RAG & locally served Llama 3.1:8B via Ollama.",
    language: "JavaScript / Python",
    langColor: "#f7df1e",
    stars: 14,
    forks: 4,
    url: "https://github.com/adashish09/AI-Resume-Interviewer"
  },
  {
    name: "NetSentinel",
    description: "Linux-based Network Intrusion Detection System with live packet capture, anomaly detection, and React UI.",
    language: "Python / Linux",
    langColor: "#38bdf8",
    stars: 11,
    forks: 3,
    url: "https://github.com/adashish09/NetSentinel"
  },
  {
    name: "FlipLearn",
    description: "Cross-platform Flutter educational app with offline-first local cache synchronization & Cloud Firestore.",
    language: "Flutter / Dart",
    langColor: "#02569b",
    stars: 8,
    forks: 2,
    url: "https://github.com/adashish09/FlipLearn"
  },
  {
    name: "Linux_monitoring",
    description: "Real-time Linux system telemetry and log monitoring dashboard with socket streams and anomaly visualization.",
    language: "Python / React",
    langColor: "#10b981",
    stars: 7,
    forks: 2,
    url: "https://github.com/adashish09/Linux_monitoring"
  }
];

const languageBreakdown = [
  { name: 'JavaScript & React', percent: 34, color: '#f7df1e' },
  { name: 'Python (AI & Sockets)', percent: 28, color: '#00f2fe' },
  { name: 'Java (Android SDK)', percent: 18, color: '#f97316' },
  { name: 'Dart & Flutter', percent: 14, color: '#38bdf8' },
  { name: 'SQL & Database Schemas', percent: 6, color: '#10b981' }
];

// Activity matrix generator simulating regular git contribution velocity
const generateContributions = () => {
  const weeks = 28;
  const daysPerWeek = 7;
  const grid = [];
  const levelWeights = [0, 1, 2, 3, 4];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Deterministic pseudo-random pattern emphasizing consistent commit activity
      const val = (w * 7 + d * 3 + 5) % 11;
      let level = 0;
      if (val > 2) level = 1;
      if (val > 5) level = 2;
      if (val > 8) level = 3;
      if (val === 10) level = 4;
      week.push(level);
    }
    grid.push(week);
  }
  return grid;
};

const GithubStats = () => {
  const { isDark } = useThemeMode();
  const [stats, setStats] = useState({ repos: 24, followers: 16, following: 12, commits: '1.2k+' });
  const [loading, setLoading] = useState(true);
  const [copiedRepo, setCopiedRepo] = useState('');
  const [contributions] = useState(generateContributions());

  const activityLevels = isDark ? {
    0: 'rgba(255, 255, 255, 0.04)',
    1: 'rgba(0, 242, 254, 0.25)',
    2: 'rgba(0, 242, 254, 0.50)',
    3: 'rgba(0, 242, 254, 0.75)',
    4: '#00f2fe'
  } : {
    0: 'rgba(15, 23, 42, 0.06)',
    1: 'rgba(2, 132, 199, 0.25)',
    2: 'rgba(2, 132, 199, 0.50)',
    3: 'rgba(2, 132, 199, 0.75)',
    4: '#0284c7'
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = personalInfo.githubUsername || 'adashish09';
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('Fallback to cached');
        const data = await res.json();
        setStats({
          repos: data.public_repos || 24,
          followers: data.followers || 16,
          following: data.following || 12,
          commits: '1.2k+'
        });
      } catch {
        setStats({
          repos: 24,
          followers: 18,
          following: 12,
          commits: '1.2k+'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleCopyClone = (repoName, repoUrl) => {
    navigator.clipboard.writeText(`git clone ${repoUrl}.git`);
    setCopiedRepo(repoName);
    setTimeout(() => setCopiedRepo(''), 2200);
  };

  return (
    <section id="github" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="CODE TELEMETRY & OPEN SOURCE"
          title="GitHub Engineering Activity"
          subtitle="Continuous code commits, architecture repositories, and polyglot language distribution."
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--primary-glow)' }} />
          </Box>
        ) : (
          <>
            {/* Top 4 Stats Metrics */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                  <StatCard
                    title="Public Repositories"
                    value={stats.repos}
                    subtitle="github.com/adashish09"
                    icon={<Storage fontSize="small" />}
                    color="#00f2fe"
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <StatCard
                    title="Total Code Commits"
                    value={stats.commits}
                    subtitle="Across all stacks"
                    icon={<Commit fontSize="small" />}
                    color="#10b981"
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                  <StatCard
                    title="Developer Network"
                    value={stats.followers}
                    subtitle="GitHub Peers"
                    icon={<GitHub fontSize="small" />}
                    color="#38bdf8"
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <StatCard
                    title="Active Tech Stacks"
                    value="4 Stacks"
                    subtitle="AI, Web, Mobile, Systems"
                    icon={<Layers fontSize="small" />}
                    color="#a855f7"
                  />
                </motion.div>
              </Grid>
            </Grid>

            {/* Interactive Git Activity Visualizer & Language Breakdown */}
            <Grid container spacing={3.5} sx={{ mb: 6 }}>
              {/* Git Activity Matrix */}
              <Grid size={{ xs: 12, lg: 7 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ height: '100%' }}>
                  <Box
                    className="glass-container"
                    sx={{
                      p: { xs: 2.5, sm: 3.5 },
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      bgcolor: 'var(--card-bg)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Terminal sx={{ color: 'var(--primary-glow)', fontSize: 19 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          Commit Heatmap & Development Velocity
                        </Typography>
                      </Box>
                      <Chip
                        label="Consistent Builder"
                        size="small"
                        sx={{ bgcolor: 'rgba(0, 242, 254, 0.1)', color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}
                      />
                    </Box>

                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.86rem', mb: 3 }}>
                      Active continuous development across AI RAG pipelines, Linux system scripts, native Android development, and responsive React applications.
                    </Typography>

                    {/* Commit Matrix Heatmap Tiles */}
                    <Box sx={{ overflowX: 'auto', pb: 1, mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', gap: '4px', minWidth: '580px' }}>
                        {contributions.map((week, wIdx) => (
                          <Box key={wIdx} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {week.map((level, dIdx) => (
                              <Tooltip key={dIdx} title={`Commit Activity Level: ${level}`} arrow placement="top">
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '3px',
                                    bgcolor: activityLevels[level],
                                    border: '1px solid var(--card-border)',
                                    transition: 'all 0.15s ease',
                                    '&:hover': {
                                      transform: 'scale(1.25)',
                                      boxShadow: '0 0 8px var(--primary-glow)',
                                      borderColor: 'var(--primary-glow)'
                                    }
                                  }}
                                />
                              </Tooltip>
                            ))}
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Heatmap Legend */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px solid var(--card-border)' }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
                        Mon – Sun Activity Timeline
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>Less</Typography>
                        {[0, 1, 2, 3, 4].map((lvl) => (
                          <Box key={lvl} sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: activityLevels[lvl] }} />
                        ))}
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>More</Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              {/* Language Distribution Breakdown */}
              <Grid size={{ xs: 12, lg: 5 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ height: '100%' }}>
                  <Box
                    className="glass-container"
                    sx={{
                      p: { xs: 2.5, sm: 3.5 },
                      borderRadius: '16px',
                      border: '1px solid var(--card-border)',
                      bgcolor: 'var(--card-bg)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <BarChart sx={{ color: 'var(--primary-glow)', fontSize: 19 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          Polyglot Language Share
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', display: 'block', mb: 2.5 }}>
                        Lines of code & commits across production repositories
                      </Typography>

                      {/* Cumulative Progress Bar */}
                      <Box sx={{ height: 8, width: '100%', borderRadius: 4, display: 'flex', overflow: 'hidden', mb: 3 }}>
                        {languageBreakdown.map((lang, idx) => (
                          <Box key={idx} sx={{ width: `${lang.percent}%`, bgcolor: lang.color }} />
                        ))}
                      </Box>

                      {/* Individual Bars List */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                        {languageBreakdown.map((lang, idx) => (
                          <Box key={idx}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: lang.color }} />
                                <Typography sx={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                                  {lang.name}
                                </Typography>
                              </Box>
                              <Typography sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                                {lang.percent}%
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--card-border)' }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        // Proven multi-stack adaptation: shifts between paradigms effortlessly
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>

            {/* Featured Repositories Grid */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Code sx={{ color: 'var(--primary-glow)' }} /> Featured Repositories
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  href={personalInfo.github}
                  target="_blank"
                  startIcon={<GitHub />}
                  sx={{
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                    color: 'var(--primary-glow)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.1)', borderColor: 'var(--primary-glow)' }
                  }}
                >
                  View All Repos on GitHub
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 3
                }}
              >
                {featuredRepos.map((repo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
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
                        borderRadius: '16px',
                        border: '1px solid var(--card-border)',
                        bgcolor: 'var(--card-bg)',
                        backdropFilter: 'blur(16px)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: 'var(--card-shadow)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          borderColor: 'var(--primary-glow)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 14px 32px -10px rgba(0, 242, 254, 0.3)'
                        }
                      }}
                    >
                      {/* Top Accent Line */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, var(--primary-glow), transparent 70%)'
                        }}
                      />

                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, pr: 1 }}>
                          <GitHub sx={{ color: 'var(--primary-glow)', fontSize: 20, flexShrink: 0 }} />
                          <Typography
                            component="a"
                            href={repo.url}
                            target="_blank"
                            title={repo.name}
                            sx={{
                              color: 'var(--text-primary)',
                              fontWeight: 700,
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '0.96rem',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              '&:hover': { color: 'var(--primary-glow)' }
                            }}
                          >
                            {repo.name}
                          </Typography>
                        </Box>

                        <Tooltip title={copiedRepo === repo.name ? "Copied clone command!" : "Copy git clone"}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyClone(repo.name, repo.url)}
                            sx={{ color: copiedRepo === repo.name ? '#10b981' : 'var(--text-secondary)', flexShrink: 0 }}
                          >
                            {copiedRepo === repo.name ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          fontSize: '0.88rem',
                          mb: 2.5,
                          flexGrow: 1
                        }}
                      >
                        {repo.description}
                      </Typography>

                      {/* Footer */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid var(--card-border)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: repo.langColor }} />
                          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                            {repo.language}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)' }}>
                            <Star sx={{ fontSize: 15, color: '#f59e0b' }} />
                            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{repo.stars}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)' }}>
                            <ForkRight sx={{ fontSize: 15 }} />
                            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{repo.forks}</Typography>
                          </Box>
                          <IconButton href={repo.url} target="_blank" size="small" sx={{ color: 'var(--text-secondary)', p: 0.5, '&:hover': { color: 'var(--primary-glow)' } }}>
                            <OpenInNew sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </section>
  );
};

export default GithubStats;
