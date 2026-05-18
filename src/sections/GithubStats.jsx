import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import { personalInfo } from '../data/socialLinks';

const StatCard = ({ title, value }) => (
  <Card className="glass-container" sx={{ textAlign: 'center', p: 2 }}>
    <CardContent>
      <Typography variant="h3" sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const GithubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = personalInfo.githubUsername;
        if (!username || username === 'ashishkumar') {
          setStats({
            repos: 45,
            followers: 120,
            following: 50,
            commits: '1.5k+'
          });
          setLoading(false);
          return;
        }

        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        
        setStats({
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          commits: '1k+' 
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="github" style={{ padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Open Source" subtitle="GitHub Contributions & Stats" />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'var(--primary-glow)' }} />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <StatCard title="Public Repositories" value={stats?.repos || 0} />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <StatCard title="Followers" value={stats?.followers || 0} />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <StatCard title="Following" value={stats?.following || 0} />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <StatCard title="Total Commits" value={stats?.commits || 0} />
              </motion.div>
            </Grid>

            <Grid item xs={12} sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
               <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ width: '100%', maxWidth: '800px' }}>
                  <Box 
                    component="img"
                    src={`https://github-readme-stats.vercel.app/api?username=${personalInfo.githubUsername || 'ashishkumar'}&theme=radical&hide_border=true&bg_color=050816&title_color=00f2fe&icon_color=4facfe`}
                    alt="GitHub Stats"
                    sx={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 242, 254, 0.1)' }}
                  />
               </motion.div>
               <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ width: '100%', maxWidth: '800px' }}>
                  <Box 
                    component="img"
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${personalInfo.githubUsername || 'ashishkumar'}&theme=radical&hide_border=true&background=050816&ring=00f2fe&fire=4facfe&currStreakLabel=00f2fe`}
                    alt="GitHub Streak"
                    sx={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 242, 254, 0.1)' }}
                  />
               </motion.div>
            </Grid>
          </Grid>
        )}
      </Container>
    </section>
  );
};

export default GithubStats;
