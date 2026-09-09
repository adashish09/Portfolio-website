import { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, InputBase, Chip, LinearProgress } from '@mui/material';
import { Search, Code, Storage, Smartphone, Terminal, Hub, Layers, AutoAwesome } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import { skillsData } from '../data/skills';

const domainIcons = {
  "AI & LLM Engineering": <AutoAwesome fontSize="small" />,
  "Frontend Engineering": <Layers fontSize="small" />,
  "Backend & Microservices": <Hub fontSize="small" />,
  "Mobile Development": <Smartphone fontSize="small" />,
  "Databases & Cloud": <Storage fontSize="small" />,
  "Systems, Security & DevOps": <Terminal fontSize="small" />,
  "Core Programming Languages": <Code fontSize="small" />
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten or filter skills
  const filteredData = useMemo(() => {
    return skillsData.map((category) => {
      // Check category match
      const categoryMatches = activeTab === 'ALL' || category.domain === activeTab;
      if (!categoryMatches) return null;

      // Filter skills by search query
      const matchingSkills = category.skills.filter((s) => {
        const q = searchQuery.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q);
      });

      if (matchingSkills.length === 0) return null;

      return {
        ...category,
        skills: matchingSkills
      };
    }).filter(Boolean);
  }, [activeTab, searchQuery]);

  return (
    <section id="skills" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="TECH MATRIX"
          title="Skills & Capabilities"
          subtitle="Production-tested technologies, architectural patterns, languages, and frameworks."
        />

        {/* Search & Domain Filter Bar */}
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mb: 3
            }}
          >
            {/* Search Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'rgba(12, 18, 34, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '12px',
                px: 2,
                py: 1,
                width: { xs: '100%', md: '380px' }
              }}
            >
              <Search sx={{ color: 'var(--primary-glow)', fontSize: 20 }} />
              <InputBase
                placeholder="Search skills (e.g. 'RAG', 'Kotlin', 'React')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: '#fff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
              {searchQuery && (
                <Typography
                  onClick={() => setSearchQuery('')}
                  sx={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Clear
                </Typography>
              )}
            </Box>

            {/* Quick Stats Pill */}
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Showing {filteredData.reduce((acc, cat) => acc + cat.skills.length, 0)} skills across {filteredData.length} domains
            </Typography>
          </Box>

          {/* Domain Category Filter Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="All Domains"
              onClick={() => setActiveTab('ALL')}
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
                bgcolor: activeTab === 'ALL' ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'ALL' ? '#050814' : 'var(--text-secondary)',
                fontWeight: activeTab === 'ALL' ? 700 : 500,
                border: '1px solid',
                borderColor: activeTab === 'ALL' ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                '&:hover': { bgcolor: activeTab === 'ALL' ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.1)' }
              }}
            />
            {skillsData.map((cat) => (
              <Chip
                key={cat.domain}
                icon={<span style={{ display: 'flex', color: activeTab === cat.domain ? '#050814' : 'var(--primary-glow)' }}>{domainIcons[cat.domain]}</span>}
                label={cat.domain}
                onClick={() => setActiveTab(cat.domain)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.78rem',
                  bgcolor: activeTab === cat.domain ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === cat.domain ? '#050814' : 'var(--text-secondary)',
                  fontWeight: activeTab === cat.domain ? 700 : 500,
                  border: '1px solid',
                  borderColor: activeTab === cat.domain ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: activeTab === cat.domain ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.1)' }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Skills Cards by Domain */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'rgba(12, 18, 34, 0.5)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>
                No skills match "{searchQuery}". Try searching for 'Python', 'React', 'RAG', or 'Linux'.
              </Typography>
            </Box>
          ) : (
            filteredData.map((group, groupIdx) => (
              <motion.div
                key={group.domain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
              >
                <Box
                  className="glass-container"
                  sx={{
                    p: { xs: 2.5, sm: 3.5 },
                    borderRadius: '16px',
                    border: '1px solid rgba(56, 189, 248, 0.15)'
                  }}
                >
                  {/* Category Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(0, 242, 254, 0.1)', color: 'var(--primary-glow)', display: 'flex' }}>
                        {domainIcons[group.domain] || <Code fontSize="small" />}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
                          {group.domain}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: { xs: 'none', sm: 'block' } }}>
                          {group.description}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={`${group.skills.length} skills`}
                      size="small"
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}
                    />
                  </Box>

                  {/* Skills Grid */}
                  <Grid container spacing={2}>
                    {group.skills.map((skill, skillIdx) => (
                      <Grid item xs={12} sm={6} md={4} key={skillIdx}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'rgba(4, 8, 20, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'rgba(0, 242, 254, 0.4)',
                              bgcolor: 'rgba(56, 189, 248, 0.06)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                              {skill.name}
                            </Typography>
                            <span className="code-badge" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                              {skill.tag}
                            </span>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={skill.level}
                              sx={{
                                flexGrow: 1,
                                height: 5,
                                borderRadius: 3,
                                bgcolor: 'rgba(255, 255, 255, 0.06)',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))'
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--secondary-glow)', fontSize: '0.72rem', minWidth: '32px', textAlign: 'right' }}>
                              {skill.level}%
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            ))
          )}
        </Box>
      </Container>
    </section>
  );
};

export default Skills;
