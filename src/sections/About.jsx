import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';

const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Projects Completed', value: '15+' },
  { label: 'Technologies', value: '20+' }
];

const About = () => {
  return (
    <section id="about" style={{ minHeight: '100vh', padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="About Me" subtitle="Introduction" />
        
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                I'm a passionate Full Stack and Android Developer with a strong focus on AI systems, MCP architectures, and modern web applications. My journey in software engineering is driven by a continuous learning mindset and a deep interest in building scalable, production-grade solutions.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                Whether it's developing RAG-based LLM pipelines, architecting robust Linux-based packet capture systems, or crafting immersive, pixel-perfect user interfaces, I approach every problem with curiosity and technical rigor.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={4} md={12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="glass-container" sx={{ textAlign: 'center', py: 2 }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', mb: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default About;
