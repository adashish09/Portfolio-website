import React, { useState, useMemo, useRef } from 'react';
import { Box, Container, Typography, InputBase, Chip, Button, IconButton } from '@mui/material';
import {
  Search,
  Code,
  Storage,
  Smartphone,
  Terminal,
  AutoAwesome,
  Bolt,
  Launch,
  Close,
  Lightbulb,
  Memory,
  FilterList
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import TechIcon from '../components/ui/TechIcon';
import { skillsList, domains, marqueeStack } from '../data/skills';
import { useThemeMode } from '../context/ThemeContext';

const domainIcons = {
  "All Tech": <FilterList fontSize="small" />,
  "AI & Machine Learning": <AutoAwesome fontSize="small" />,
  "Frontend & Mobile": <Smartphone fontSize="small" />,
  "Backend & Databases": <Storage fontSize="small" />,
  "Languages & Core CS": <Code fontSize="small" />,
  "Systems, Cloud & Tools": <Terminal fontSize="small" />
};

const tierColors = {
  "Flagship Core": "#10b981",
  "Production Shipped": "#00f2fe",
  "Daily Driver": "#38bdf8",
  "Core Foundation": "#a855f7",
  "Production Tested": "#00f2fe",
  "Core Engine": "#10b981",
  "Certified Coursera": "#f59e0b",
  "Google Play Shipped": "#10b981",
  "Core Mastery": "#38bdf8",
  "Certified Mastery": "#10b981",
  "Daily Driver Workstation": "#38bdf8",
  "Deep Systems": "#ef4444"
};

const Skills = () => {
  const [activeDomain, setActiveDomain] = useState('All Tech');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(skillsList[0]);
  const inspectorRef = useRef(null);
  const { isDark } = useThemeMode();

  // Filter skills by domain and search query
  const filteredSkills = useMemo(() => {
    return skillsList.filter((tech) => {
      const domainMatch = activeDomain === 'All Tech' || tech.domain === activeDomain;
      if (!domainMatch) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        tech.name.toLowerCase().includes(q) ||
        tech.specialty.toLowerCase().includes(q) ||
        tech.domain.toLowerCase().includes(q) ||
        tech.tier.toLowerCase().includes(q) ||
        (tech.powersProject && tech.powersProject.toLowerCase().includes(q)) ||
        tech.capabilities.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [activeDomain, searchQuery]);

  const handleCardClick = (tech) => {
    setSelectedTech(tech);
    // Smoothly scroll to the side poster / inspector HUD with navbar clearance
    if (inspectorRef.current) {
      const isMobile = window.innerWidth < 900;
      const navClearance = isMobile ? 75 : 100; // Clean clearance below fixed navbar
      const elementTop = inspectorRef.current.getBoundingClientRect().top + window.pageYOffset;
      const targetScroll = Math.max(0, elementTop - navClearance);
      
      const rect = inspectorRef.current.getBoundingClientRect();
      if (rect.top < (isMobile ? 75 : 95) || rect.top > window.innerHeight - 200) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="skills"
      className="skills-ambient-bg"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'clip'
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 9, md: 14 }, px: { xs: 2, sm: 3 } }}>
        <SectionHeader
          tag="TECH ARSENAL & TOOLING"
          title="Skills & Technical Ecosystem"
          subtitle="Battle-tested tools and frameworks applied across local AI/ML inference, high-scale mobile applications, and low-level Linux systems."
        />

        {/* 1. Animated Marquee of Core Technologies */}
        <Box sx={{ mb: { xs: 3.5, md: 5 }, width: '100%', minWidth: 0 }}>
          <Box
            sx={{
              p: { xs: 1.2, sm: 1.5 },
              borderRadius: '16px',
              bgcolor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--card-shadow)',
              overflow: 'hidden',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: { xs: 1, sm: 2 }, mb: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span className="pulse-indicator" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--primary-glow)', letterSpacing: '0.05em', fontSize: { xs: '0.72rem', sm: '0.78rem' } }}>
                  CORE ARSENAL & DAILY DRIVERS
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: { xs: 'none', md: 'inline' }, fontFamily: 'JetBrains Mono, monospace' }}>
                • Interactive stack: Click any tool to inspect production architecture
              </Typography>
            </Box>

            <div className="marquee-container">
              <div className="marquee-content">
                {/* Render marquee list duplicated for infinite looping */}
                {[...marqueeStack, ...marqueeStack].map((item, idx) => (
                  <Box
                    key={idx}
                    onClick={() => {
                      // Exact match first (prevent "java" matching "javascript" substring)
                      const exact = skillsList.find((s) => s.iconKey === item.iconKey || s.id === item.iconKey || s.name.toLowerCase() === item.name.toLowerCase());
                      const found = exact || skillsList.find((s) => s.name.toLowerCase().startsWith(item.name.toLowerCase())) || skillsList.find((s) => s.name.toLowerCase().includes(item.name.toLowerCase()));
                      if (found) handleCardClick(found);
                    }}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.2,
                      px: 2,
                      py: 1,
                      borderRadius: '10px',
                      bgcolor: 'var(--subtle-chip-bg)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: `${item.color}15`,
                        borderColor: item.color,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <TechIcon iconKey={item.iconKey} size={20} color={item.color} />
                    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </div>
            </div>
          </Box>
        </Box>

        {/* 2. Search & Category Filters */}
        <Box sx={{ mb: { xs: 3.5, md: 4.5 }, width: '100%', minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', md: 'center' },
              gap: 2,
              mb: 2.5
            }}
          >
            {/* Search Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                px: 2,
                py: 1.2,
                width: { xs: '100%', md: '380px' },
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
                '&:focus-within': { borderColor: 'var(--primary-glow)' }
              }}
            >
              <Search sx={{ color: 'var(--primary-glow)', fontSize: 20 }} />
              <InputBase
                placeholder="Search tools (e.g. 'Python', 'React', 'Ollama', 'Sockets')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
              {searchQuery && (
                <Typography
                  onClick={() => setSearchQuery('')}
                  sx={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Clear
                </Typography>
              )}
            </Box>

            {/* Quick Metrics */}
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Showing {filteredSkills.length} tools • Active: <span style={{ color: 'var(--primary-glow)', fontWeight: 700 }}>{selectedTech ? selectedTech.name : 'None'}</span>
            </Typography>
          </Box>

          {/* Domain Category Filter Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {domains.map((dom) => {
              const isSelected = activeDomain === dom;
              return (
                <Chip
                  key={dom}
                  icon={
                    <span style={{ display: 'flex', color: isSelected ? (isDark ? '#050814' : '#fff') : 'var(--primary-glow)' }}>
                      {domainIcons[dom] || <Code fontSize="small" />}
                    </span>
                  }
                  label={dom}
                  onClick={() => setActiveDomain(dom)}
                  sx={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: { xs: '0.74rem', sm: '0.8rem' },
                    py: { xs: 1.5, sm: 2 },
                    px: { xs: 0.5, sm: 1 },
                    bgcolor: isSelected ? 'var(--primary-glow)' : 'var(--card-bg)',
                    color: isSelected ? (isDark ? '#050814' : '#fff') : 'var(--text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--primary-glow)' : 'var(--card-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isSelected ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.1)'
                    }
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* 3. Main Interactive Workspace: Tech Grid + Sticky Tech Inspector HUD */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'minmax(0, 1fr) 340px',
              lg: 'minmax(0, 1fr) 380px'
            },
            gap: { xs: 3, md: 3.5 },
            alignItems: 'start',
            width: '100%',
            minWidth: 0
          }}
        >
          
          {/* Tech Grid Column (Uniform Cards) */}
          <Box sx={{ width: '100%', minWidth: 0 }}>
            {filteredSkills.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'var(--card-bg)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
                <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>
                  No tools found for "{searchQuery}". Try searching for 'Python', 'React', 'Ollama', 'Flutter', or 'Linux'.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                    md: 'repeat(4, minmax(0, 1fr))'
                  },
                  gap: { xs: 1.25, sm: 2 },
                  width: '100%',
                  minWidth: 0
                }}
              >
                <AnimatePresence>
                  {filteredSkills.map((tech) => {
                    const isSelected = selectedTech && selectedTech.id === tech.id;
                    const tierColor = tierColors[tech.tier] || '#38bdf8';

                    return (
                      <motion.div
                        key={tech.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        style={{ minWidth: 0, width: '100%' }}
                      >
                        <Box
                          onClick={() => handleCardClick(tech)}
                          className={`tech-badge-card ${isSelected ? 'active-inspected' : ''}`}
                          sx={{
                            height: { xs: '150px', sm: '162px' },
                            boxSizing: 'border-box',
                            width: '100%',
                            minWidth: 0,
                            p: { xs: 1.25, sm: 2 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textAlign: 'center',
                            overflow: 'hidden',
                            borderColor: isSelected ? tech.brandColor : 'var(--card-border)',
                            boxShadow: isSelected ? `0 12px 30px -6px ${tech.brandColor}40` : 'none',
                            '&:hover': {
                              borderColor: tech.brandColor,
                              boxShadow: `0 10px 24px -6px ${tech.brandColor}33`,
                              '& .tech-icon-wrapper': {
                                transform: 'scale(1.15) rotate(4deg)',
                                bgcolor: `${tech.brandColor}22`
                              }
                            }
                          }}
                        >
                          {/* Top: Tier dot & Domain indicator */}
                          <Box
                            sx={{
                              width: '100%',
                              height: '18px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 0.5,
                              minWidth: 0
                            }}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                flexShrink: 0,
                                bgcolor: tierColor,
                                boxShadow: `0 0 8px ${tierColor}`
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'var(--text-muted)',
                                fontSize: { xs: '0.62rem', sm: '0.66rem' },
                                fontFamily: 'JetBrains Mono, monospace',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minWidth: 0,
                                maxWidth: 'calc(100% - 12px)',
                                textAlign: 'right'
                              }}
                            >
                              {tech.tier}
                            </Typography>
                          </Box>

                          {/* Center: Brand Logo */}
                          <Box
                            className="tech-icon-wrapper"
                            sx={{
                              width: { xs: 42, sm: 48 },
                              height: { xs: 42, sm: 48 },
                              borderRadius: '12px',
                              flexShrink: 0,
                              bgcolor: isSelected ? `${tech.brandColor}20` : 'var(--subtle-chip-bg)',
                              border: `1px solid ${isSelected ? tech.brandColor : 'var(--card-border)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <TechIcon iconKey={tech.iconKey} size={24} color={tech.brandColor} />
                          </Box>

                          {/* Bottom: Name & Specialty Subtext */}
                          <Box sx={{ width: '100%', minWidth: 0 }}>
                            <Box sx={{ height: { xs: '34px', sm: '38px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 700,
                                  color: 'var(--text-primary)',
                                  fontSize: { xs: '0.80rem', sm: '0.90rem' },
                                  lineHeight: 1.2,
                                  textAlign: 'center',
                                  wordBreak: 'break-word',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {tech.name}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: isSelected ? tech.brandColor : 'var(--text-muted)',
                                fontSize: { xs: '0.65rem', sm: '0.70rem' },
                                fontFamily: 'JetBrains Mono, monospace',
                                display: 'block',
                                lineHeight: 1.2,
                                height: '16px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%'
                              }}
                            >
                              {tech.specialty}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </Box>
            )}
          </Box>

          {/* Sticky Tech Inspector HUD Column */}
          <Box
            ref={inspectorRef}
            sx={{
              position: { md: 'sticky' },
              top: { md: '90px' },
              scrollMarginTop: { xs: '80px', md: '110px' },
              width: '100%',
              minWidth: 0
            }}
          >
            <AnimatePresence mode="wait">
              {selectedTech && (
                <motion.div
                  key={selectedTech.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: '100%', minWidth: 0 }}
                >
                  <Box
                    className="tech-inspector-panel"
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderTop: `4px solid ${selectedTech.brandColor}`,
                      boxSizing: 'border-box',
                      width: '100%',
                      maxWidth: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Header: Logo, Title, Domain */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2, minWidth: 0, width: '100%' }}>
                      <Box
                        sx={{
                          width: { xs: 48, sm: 58 },
                          height: { xs: 48, sm: 58 },
                          borderRadius: '14px',
                          flexShrink: 0,
                          bgcolor: `${selectedTech.brandColor}18`,
                          border: `1.5px solid ${selectedTech.brandColor}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 8px 20px -4px ${selectedTech.brandColor}35`
                        }}
                      >
                        <TechIcon iconKey={selectedTech.iconKey} size={28} color={selectedTech.brandColor} />
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            lineHeight: 1.25,
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {selectedTech.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'var(--text-muted)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.76rem',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {selectedTech.domain}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Tier Chip */}
                    <Box sx={{ mb: 2.2, display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%' }}>
                      <Chip
                        label={selectedTech.tier}
                        size="small"
                        sx={{
                          bgcolor: `${tierColors[selectedTech.tier] || '#38bdf8'}18`,
                          color: tierColors[selectedTech.tier] || '#38bdf8',
                          border: `1px solid ${tierColors[selectedTech.tier] || '#38bdf8'}40`,
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: { xs: '0.68rem', sm: '0.72rem' },
                          fontWeight: 700
                        }}
                      />
                      <Chip
                        label={selectedTech.specialty}
                        size="small"
                        sx={{
                          bgcolor: 'var(--subtle-chip-bg)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--card-border)',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: { xs: '0.68rem', sm: '0.72rem' }
                        }}
                      />
                    </Box>

                    {/* Production Implementation Detail */}
                    <Box sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: '12px', bgcolor: 'var(--subtle-chip-bg)', border: '1px solid var(--card-border)', mb: 2.5, width: '100%', boxSizing: 'border-box' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: selectedTech.brandColor,
                          mb: 0.6,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.8,
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: { xs: '0.70rem', sm: '0.75rem' }
                        }}
                      >
                        <Lightbulb sx={{ fontSize: 16, flexShrink: 0 }} /> WHERE ASHISH APPLIED THIS:
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.82rem', sm: '0.86rem' }, lineHeight: 1.6, wordBreak: 'break-word' }}>
                        {selectedTech.productionUsage}
                      </Typography>
                    </Box>

                    {/* Key Architectural Capabilities */}
                    <Box sx={{ mb: 2.5, width: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-primary)', mb: 1, display: 'flex', alignItems: 'center', gap: 0.8, fontFamily: 'JetBrains Mono, monospace' }}>
                        <Memory sx={{ fontSize: 16, color: 'var(--accent-purple)', flexShrink: 0 }} /> KEY CAPABILITIES:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, width: '100%' }}>
                        {selectedTech.capabilities.map((cap, idx) => (
                          <span key={idx} className="code-badge" style={{ fontSize: '0.74rem', padding: '3px 8px', maxWidth: '100%', wordBreak: 'break-word' }}>
                            {cap}
                          </span>
                        ))}
                      </Box>
                    </Box>

                    {/* 1-Click Project Jump */}
                    {selectedTech.powersProject && (
                      <Box
                        sx={{
                          pt: 2,
                          borderTop: '1px solid var(--card-border)',
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          justifyContent: 'space-between',
                          gap: 1.5,
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                            SHIPPED IN PRODUCTION:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--primary-glow)', fontSize: '0.88rem', wordBreak: 'break-word' }}>
                            {selectedTech.powersProject}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => scrollToSection('projects')}
                          endIcon={<Launch sx={{ fontSize: 14 }} />}
                          sx={{
                            color: 'var(--primary-glow)',
                            borderColor: 'var(--primary-glow)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.76rem',
                            textTransform: 'none',
                            py: 0.6,
                            px: 1.5,
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                              bgcolor: 'rgba(0, 242, 254, 0.1)',
                              borderColor: 'var(--primary-glow)'
                            }
                          }}
                        >
                          View Project
                        </Button>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Skills;
