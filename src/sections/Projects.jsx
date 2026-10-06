import { useState } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Chip, IconButton, Button, Tooltip } from '@mui/material';
import { GitHub, OpenInNew, Visibility, ContentCopy, Check, Star, Bolt, Terminal } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectModal from '../components/ui/ProjectModal';
import { projectsData } from '../data/projects';
import { useThemeMode } from '../context/ThemeContext';

const ProjectCard = ({ project, onViewDetails }) => {
  const { isDark } = useThemeMode();
  const [copied, setCopied] = useState(false);

  const handleCopyClone = (e) => {
    e.stopPropagation();
    if (project.cloneCmd) {
      navigator.clipboard.writeText(project.cloneCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      <Card
        className="glass-container card-hover-lift"
        onClick={onViewDetails}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: '18px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: project.resumeFlagship ? '1px solid var(--primary-glow)' : '1px solid var(--card-border)',
          bgcolor: 'var(--card-bg)',
          position: 'relative',
          boxShadow: project.resumeFlagship ? '0 10px 30px rgba(0, 242, 254, 0.15)' : 'var(--card-shadow)'
        }}
      >
        {/* Project Thumbnail with Overlay Badges */}
        <Box sx={{ position: 'relative', height: '210px', overflow: 'hidden', flexShrink: 0 }}>
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.04)' }
            }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ${isDark ? 'rgba(7,10,19,0.92)' : 'rgba(255,255,255,0.95)'} 100%)` }} />

          {/* Top Badges */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            <Chip
              label={project.category}
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(7, 10, 19, 0.9)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: isDark ? '1px solid rgba(0, 242, 254, 0.5)' : '1px solid rgba(2, 132, 199, 0.35)',
                color: 'var(--primary-glow)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            />
            {project.resumeFlagship && (
              <Chip
                icon={<Star sx={{ fontSize: '13px !important', color: '#10b981 !important' }} />}
                label="Resume Flagship"
                size="small"
                sx={{
                  bgcolor: isDark ? 'rgba(7, 10, 19, 0.9)' : 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #10b981',
                  color: isDark ? '#34d399' : '#059669',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              />
            )}
          </Box>

          {/* Quick Clone Button */}
          {project.cloneCmd && (
            <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              <Tooltip title={copied ? "Copied git clone!" : "Copy git clone command"}>
                <IconButton
                  size="small"
                  onClick={handleCopyClone}
                  sx={{
                    bgcolor: isDark ? 'rgba(7, 10, 19, 0.9)' : 'rgba(255, 255, 255, 0.92)',
                    color: copied ? '#10b981' : 'var(--text-secondary)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--card-border)',
                    backdropFilter: 'blur(8px)',
                    '&:hover': { color: 'var(--primary-glow)', bgcolor: 'var(--card-bg)' }
                  }}
                >
                  {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Timeline Pill */}
          <Box sx={{ position: 'absolute', bottom: 10, left: 14, zIndex: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#cbd5e1', fontSize: '0.75rem', bgcolor: 'rgba(0,0,0,0.6)', px: 1, py: 0.3, borderRadius: '4px' }}>
              {project.timeline}
            </Typography>
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 2.2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              mb: 1,
              fontSize: '1.15rem'
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              mb: 2.5,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '68px',
              fontSize: '0.88rem'
            }}
          >
            {project.headline || project.description}
          </Typography>

          {/* Tech stack chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="code-badge" style={{ fontSize: '0.7rem' }}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="code-badge" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                +{project.techStack.length - 4} more
              </span>
            )}
          </Box>

          {/* Bottom Action Footer */}
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              size="small"
              startIcon={<Visibility sx={{ fontSize: 16 }} />}
              onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
              sx={{
                color: 'var(--primary-glow)',
                textTransform: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.08)' }
              }}
            >
              Architecture & Details
            </Button>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {project.github && project.github !== '#' && (
                <IconButton
                  size="small"
                  href={project.github}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  sx={{ color: 'var(--text-secondary)', '&:hover': { color: '#fff' } }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
              {project.demo && project.demo !== '#' && (
                <IconButton
                  size="small"
                  href={project.demo}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  sx={{ color: 'var(--text-secondary)', '&:hover': { color: 'var(--primary-glow)' } }}
                >
                  <OpenInNew fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Projects = ({ onSelectProjectModal, selectedProjectModal, onCloseProjectModal }) => {
  const [internalSelected, setInternalSelected] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const { isDark } = useThemeMode();

  const selectedProject = selectedProjectModal || internalSelected;
  const handleSelect = (project) => {
    if (onSelectProjectModal) {
      onSelectProjectModal(project);
    } else {
      setInternalSelected(project);
    }
  };
  const handleClose = () => {
    if (onCloseProjectModal) {
      onCloseProjectModal();
    } else {
      setInternalSelected(null);
    }
  };

  const categories = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'FLAGSHIP', label: '⭐ Resume Flagships' },
    { id: 'AI & LLM', label: 'AI & LLM' },
    { id: 'Systems & Security', label: 'Systems & Linux' },
    { id: 'Mobile Apps', label: 'Mobile Apps' }
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'FLAGSHIP') return p.resumeFlagship;
    return p.category === filter;
  });

  return (
    <section id="projects" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="ENGINEERED SYSTEMS"
          title="Featured Projects"
          subtitle="Four independent flagship architectures built across AI & LLMs, Linux Security, and Mobile Systems."
        />

        {/* Category Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.2, mb: 6 }}>
          {categories.map((cat) => {
            const count = cat.id === 'ALL'
              ? projectsData.length
              : cat.id === 'FLAGSHIP'
              ? projectsData.filter((p) => p.resumeFlagship).length
              : projectsData.filter((p) => p.category === cat.id).length;

            const isSelected = filter === cat.id;
            return (
              <Chip
                key={cat.id}
                label={`${cat.label} (${count})`}
                onClick={() => setFilter(cat.id)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  py: 2.2,
                  px: 1.2,
                  borderRadius: '10px',
                  bgcolor: isSelected ? 'var(--primary-glow)' : 'var(--card-bg)',
                  color: isSelected ? (isDark ? '#050814' : '#ffffff') : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary-glow)' : 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isSelected ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.12)',
                    borderColor: 'var(--primary-glow)'
                  }
                }}
              />
            );
          })}
        </Box>

        {/* Projects Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3.5,
            width: '100%'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => handleSelect(project)}
              />
            ))}
          </AnimatePresence>
        </Box>
      </Container>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onClose={handleClose}
      />
    </section>
  );
};

export default Projects;
