import { useState } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { School, Work, CalendarToday } from '@mui/icons-material';
import SectionHeader from '../components/ui/SectionHeader';
import { timelineData } from '../data/experience';

const Experience = () => {
  const [filter, setFilter] = useState('ALL');

  const filteredTimeline = filter === 'ALL'
    ? timelineData
    : timelineData.filter(item => item.type === filter);

  return (
    <section id="experience" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="md">
        <SectionHeader
          tag="TIMELINE & MILESTONES"
          title="Engineering Journey"
          subtitle="Education, professional app engagements, and independent systems development milestones."
        />

        {/* Filter Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 6 }}>
          {[
            { label: 'All Milestones', val: 'ALL' },
            { label: 'Projects & Work', val: 'work' },
            { label: 'Education & Academics', val: 'education' }
          ].map((tab) => (
            <Chip
              key={tab.val}
              label={tab.label}
              onClick={() => setFilter(tab.val)}
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                py: 2,
                px: 1.2,
                borderRadius: '8px',
                bgcolor: filter === tab.val ? 'var(--primary-glow)' : 'rgba(12, 18, 34, 0.6)',
                color: filter === tab.val ? '#050814' : 'var(--text-secondary)',
                fontWeight: filter === tab.val ? 700 : 500,
                border: '1px solid',
                borderColor: filter === tab.val ? 'var(--primary-glow)' : 'rgba(56, 189, 248, 0.2)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: filter === tab.val ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.1)'
                }
              }}
            />
          ))}
        </Box>

        {/* Vertical Timeline Structure */}
        <Box sx={{ position: 'relative', mt: 4 }}>
          {/* Vertical spine */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: '20px', md: '50%' },
              transform: { xs: 'none', md: 'translateX(-50%)' },
              top: 10,
              bottom: 10,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--primary-glow), rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.3))'
            }}
          />

          {filteredTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  mb: 6,
                  position: 'relative'
                }}
              >
                {/* Glowing Center Node */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: '20px', md: '50%' },
                    transform: 'translate(-50%, -50%)',
                    top: { xs: '28px', md: '50%' },
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    bgcolor: '#070a13',
                    border: '3px solid var(--primary-glow)',
                    zIndex: 2,
                    boxShadow: '0 0 15px var(--primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', bgcolor: '#fff' }} />
                </Box>

                {/* Timeline Card Content */}
                <Box
                  sx={{
                    width: { xs: 'calc(100% - 50px)', md: '45%' },
                    ml: { xs: '50px', md: 0 },
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-end' : 'flex-start'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    style={{ width: '100%' }}
                  >
                    <Box
                      className="glass-container card-hover-lift"
                      sx={{
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: '16px',
                        border: '1px solid rgba(56, 189, 248, 0.18)',
                        textAlign: 'left'
                      }}
                    >
                      {/* Period and Type Tag */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'var(--primary-glow)' }}>
                          <CalendarToday sx={{ fontSize: 15 }} />
                          <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 700 }}>
                            {item.period}
                          </Typography>
                        </Box>
                        <Chip
                          icon={item.type === 'education' ? <School sx={{ fontSize: '13px !important' }} /> : <Work sx={{ fontSize: '13px !important' }} />}
                          label={item.type === 'education' ? 'Academics' : 'Project / Dev'}
                          size="small"
                          sx={{
                            bgcolor: item.type === 'education' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(0, 242, 254, 0.12)',
                            color: item.type === 'education' ? 'var(--accent-purple)' : 'var(--primary-glow)',
                            border: '1px solid',
                            borderColor: item.type === 'education' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(0, 242, 254, 0.3)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.7rem',
                            height: 22
                          }}
                        />
                      </Box>

                      {/* Title & Organization */}
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 0.5, fontSize: '1.15rem' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--secondary-glow)', fontWeight: 600, mb: 1.5, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>
                        {item.organization} • <span style={{ color: '#10b981' }}>{item.highlight}</span>
                      </Typography>

                      {/* Description */}
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.65, mb: 2.5, fontSize: '0.9rem' }}>
                        {item.description}
                      </Typography>

                      {/* Skills Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="code-badge" style={{ fontSize: '0.7rem' }}>
                            {skill}
                          </span>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </section>
  );
};

export default Experience;
