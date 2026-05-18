import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import { skillsData } from '../data/skills';
import { personalInfo } from '../data/socialLinks';
import { DiJavascript1, DiPython, DiJava } from 'react-icons/di';
import { SiKotlin, SiDart, SiCplusplus, SiMysql, SiC } from 'react-icons/si';

const iconMap = {
  "JavaScript": <DiJavascript1 size={18} />,
  "Python": <DiPython size={18} />,
  "Java": <DiJava size={18} />,
  "Kotlin": <SiKotlin size={18} />,
  "Dart": <SiDart size={18} />,
  "C++": <SiCplusplus size={18} />,
  "C": <SiC size={18} />,
  "SQL": <SiMysql size={18} />
};

// Orbital Node Component (Domain or specific Skill)
const OrbitNode = ({ title, icon, index, total, radius, isSkill, onClick }) => {
  const angle = (index / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{ x, y, opacity: 1, scale: 1 }}
      exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: index * 0.1 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
    >
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.15, boxShadow: '0 0 25px rgba(0, 242, 254, 0.8)' }}
        animate={{ rotate: -360 }} // Counter-rotate to keep text horizontal
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          padding: isSkill ? '10px 16px' : '16px 24px',
          borderRadius: '30px',
          background: 'rgba(21, 16, 48, 0.95)',
          border: '1px solid rgba(0, 242, 254, 0.5)',
          boxShadow: '0 0 15px rgba(0, 242, 254, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap'
        }}
      >
        {icon && <span style={{ display: 'flex', alignItems: 'center', color: 'var(--primary-glow)' }}>{icon}</span>}
        <Typography variant={isSkill ? "body2" : "subtitle2"} sx={{ color: '#fff', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </motion.div>
    </motion.div>
  );
};

const GalaxySystem = ({ centerTitle, centerSubtitle, items, isSkillGalaxy, onBack, radius }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', width: '100%', height: radius * 2.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {onBack && (
        <IconButton 
          onClick={onBack} 
          sx={{ position: 'absolute', top: 0, left: { xs: 0, md: '10%' }, color: 'var(--primary-glow)', border: '1px solid var(--primary-glow)', '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.1)' } }}
        >
          <ArrowBack />
        </IconButton>
      )}

      {/* Neural Orbit Rings */}
      <Box sx={{ position: 'absolute', width: radius * 2, height: radius * 2, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', width: radius * 1.5, height: radius * 1.5, border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '50%' }} />

      {/* Center Core */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 242, 254, 0.6)' }}
        style={{
          width: isSkillGalaxy ? '140px' : '180px',
          height: isSkillGalaxy ? '140px' : '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(0,242,254,0.2) 0%, rgba(5,8,22,1) 100%)',
          border: '2px solid rgba(0, 242, 254, 0.8)',
          boxShadow: '0 0 30px rgba(0, 242, 254, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 20,
          padding: '20px'
        }}
      >
        <Typography variant={isSkillGalaxy ? "body1" : "h6"} sx={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,242,254,0.8)' }}>
          {centerTitle}
        </Typography>
        {centerSubtitle && (
          <Typography variant="caption" sx={{ color: 'var(--primary-glow)', mt: 1 }}>
            {centerSubtitle}
          </Typography>
        )}
      </motion.div>

      {/* Rotating Planets Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
      >
        <AnimatePresence>
          {items.map((item, index) => {
            // Slight radius variations for a more organic look if it's the skills view
            const nodeRadius = isSkillGalaxy ? radius * (0.8 + Math.random() * 0.4) : radius;
            return (
              <OrbitNode 
                key={item.title}
                title={item.title}
                icon={item.icon}
                index={index}
                total={items.length}
                radius={nodeRadius}
                isSkill={isSkillGalaxy}
                onClick={item.onClick}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const radius = isMobile ? 140 : 260;

  // Prepare Macro Galaxy Items (Domains)
  const domainItems = skillsData.map((group, index) => ({
    title: group.domain,
    onClick: () => setSelectedDomain(index)
  }));

  // Prepare Micro Galaxy Items (Skills of selected domain)
  const getSkillItems = () => {
    if (selectedDomain === null) return [];
    return skillsData[selectedDomain].skills.map(skill => ({
      title: skill,
      icon: iconMap[skill] || null,
      onClick: null
    }));
  };

  return (
    <section id="skills" style={{ minHeight: '100vh', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Knowledge Universe" subtitle="Explore domains to see specific technologies" />
        
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {selectedDomain === null ? (
              <GalaxySystem 
                key="macro"
                centerTitle={personalInfo.name}
                centerSubtitle="Software Engineer"
                items={domainItems}
                isSkillGalaxy={false}
                radius={radius}
              />
            ) : (
              <GalaxySystem 
                key="micro"
                centerTitle={skillsData[selectedDomain].domain}
                centerSubtitle="Domain Expertise"
                items={getSkillItems()}
                isSkillGalaxy={true}
                onBack={() => setSelectedDomain(null)}
                radius={radius}
              />
            )}
          </AnimatePresence>
        </Box>
      </Container>
    </section>
  );
};

export default Skills;
