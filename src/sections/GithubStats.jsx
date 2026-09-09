import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, CircularProgress, Button, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, Star, ForkRight, ContentCopy, Check, Code, OpenInNew } from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';

const StatCard = ({ title, value, subtitle }) => (
  <Box
    className="glass-container card-hover-lift"
    sx={{
      textAlign: 'center',
      p: 3,
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.16)'
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
      {value}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
      {title}
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
    name: "AI_Resume_Interviewer",
    description: "Adaptive role-specific interview simulation platform grounded with RAG & local Ollama (Llama 3.1).",
    language: "JavaScript / Python",
    stars: 12,
    forks: 4,
    url: "https://github.com/adashish09/AI_Resume_Interviewer"
  },
  {
    name: "NetSentinel",
    description: "Linux-based Network Intrusion Detection System with live packet capture and anomaly alerts.",
    language: "Python",
    stars: 9,
    forks: 3,
    url: "https://github.com/adashish09/NetSentinel"
  },
  {
    name: "FlipLearn",
    description: "Cross-platform Flutter educational app with offline-first local cache synchronization.",
    language: "Dart",
    stars: 7,
    forks: 2,
    url: "https://github.com/adashish09/FlipLearn"
  },
  {
    name: "Linux_monitoring",
    description: "Real-time system telemetry and log monitoring dashboard with anomaly visualization.",
    language: "Python / React",
    stars: 6,
    forks: 1,
    url: "https://github.com/adashish09/Linux_monitoring"
  }
];

const GithubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedRepo, setCopiedRepo] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = personalInfo.githubUsername || 'adashish09';
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        setStats({
          repos: data.public_repos || 24,
          followers: data.followers || 15,
          following: data.following || 10,
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
    setTimeout(() => setCopiedRepo(''), 2000);
  };

  return (
    <section id="github" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="OPEN SOURCE"
          title="GitHub & Code Activity"
          subtitle="Continuous integration, open-source repositories, and code telemetry."
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--primary-glow)' }} />
          </Box>
        ) : (
          <>
            {/* 4 Stats Metrics */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid item xs={6} md={3}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                  <StatCard title="Public Repositories" value={stats?.repos} subtitle="github.com/adashish09" />
                </motion.div>
              </Grid>
              <Grid item xs={6} md={3}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <StatCard title="Total Commits" value={stats?.commits} subtitle="Across all projects" />
                </motion.div>
              </Grid>
              <Grid item xs={6} md={3}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                  <StatCard title="Followers" value={stats?.followers} subtitle="Developer Network" />
                </motion.div>
              </Grid>
              <Grid item xs={6} md={3}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <StatCard title="Following" value={stats?.following} subtitle="Open Source Peers" />
                </motion.div>
              </Grid>
            </Grid>

            {/* Featured Repositories Grid */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#fff', display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Code sx={{ color: 'var(--primary-glow)' }} /> Starred Repositories
              </Typography>

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
                        height: { xs: '210px', sm: '210px', md: '215px' },
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                        border: '1px solid rgba(56, 189, 248, 0.16)',
                        background: 'linear-gradient(155deg, rgba(12, 18, 34, 0.85) 0%, rgba(6, 10, 22, 0.92) 100%)',
                        backdropFilter: 'blur(16px)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          borderColor: 'var(--primary-glow)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px -10px rgba(0, 242, 254, 0.3)'
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
                          height: '2px',
                          background: 'linear-gradient(90deg, var(--primary-glow), transparent 70%)'
                        }}
                      />

                      {/* Top Bar: Icon + Truncated Name + Clone Action */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '34px', mb: 1.2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, pr: 1 }}>
                          <GitHub sx={{ color: 'var(--primary-glow)', fontSize: 19, flexShrink: 0 }} />
                          <Typography
                            component="a"
                            href={repo.url}
                            target="_blank"
                            title={repo.name}
                            sx={{
                              color: '#fff',
                              fontWeight: 700,
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '0.93rem',
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

                      {/* Description with strict 44px container so all cards stay identically sized */}
                      <Box sx={{ height: '44px', overflow: 'hidden', mb: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'var(--text-secondary)',
                            lineHeight: 1.55,
                            fontSize: '0.84rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {repo.description}
                        </Typography>
                      </Box>

                      {/* Footer: Fixed height, pinned to bottom */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.2, borderTop: '1px solid rgba(255,255,255,0.06)', mt: 'auto', height: '32px' }}>
                        <span className="code-badge" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          {repo.language}
                        </span>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)' }}>
                            <Star sx={{ fontSize: 15, color: '#f59e0b' }} />
                            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{repo.stars}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)' }}>
                            <ForkRight sx={{ fontSize: 15 }} />
                            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{repo.forks}</Typography>
                          </Box>
                          <IconButton href={repo.url} target="_blank" size="small" sx={{ color: 'var(--text-secondary)', p: 0.5, '&:hover': { color: '#fff' } }}>
                            <OpenInNew sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Readme and Streak Widgets */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ width: '100%', maxWidth: '850px' }}>
                <Box
                  component="img"
                  src={`https://github-readme-stats.vercel.app/api?username=${personalInfo.githubUsername || 'adashish09'}&show_icons=true&theme=radical&hide_border=true&bg_color=070a13&title_color=00f2fe&icon_color=38bdf8&text_color=94a3b8`}
                  alt="GitHub Stats"
                  sx={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ width: '100%', maxWidth: '850px' }}>
                <Box
                  component="img"
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${personalInfo.githubUsername || 'adashish09'}&theme=radical&hide_border=true&background=070a13&ring=00f2fe&fire=38bdf8&currStreakLabel=00f2fe`}
                  alt="GitHub Streak"
                  sx={{ width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />
              </motion.div>

              <Button
                variant="outlined"
                href={personalInfo.github}
                target="_blank"
                startIcon={<GitHub />}
                sx={{
                  mt: 2,
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  color: 'var(--primary-glow)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  py: 1.2,
                  px: 3,
                  borderRadius: '10px',
                  '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.1)', borderColor: 'var(--primary-glow)' }
                }}
              >
                Follow @adashish09 on GitHub
              </Button>
            </Box>
          </>
        )}
      </Container>
    </section>
  );
};

export default GithubStats;
