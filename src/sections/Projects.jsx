import { useState } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, Chip, IconButton, Button, Tooltip } from '@mui/material';
import { GitHub, OpenInNew, Visibility, ContentCopy, Check } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectModal from '../components/ui/ProjectModal';
import { projectsData } from '../data/projects';

const ProjectCard = ({ project, onViewDetails }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClone = (e) => {
    e.stopPropagation();
    if (project.cloneCmd) {
      navigator.clipboard.writeText(project.cloneCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid rgba(56, 189, 248, 0.16)',
          bgcolor: 'rgba(10, 15, 29, 0.75)',
          position: 'relative'
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
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,10,19,0.2) 0%, rgba(7,10,19,0.85) 100%)' }} />

          {/* Top Category Badge */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
            <Chip
              label={project.category}
              size="small"
              sx={{
                bgcolor: 'rgba(7, 10, 19, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 242, 254, 0.5)',
                color: 'var(--primary-glow)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            />
          </Box>

          {/* Quick Clone Button */}
          {project.cloneCmd && (
            <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              <Tooltip title={copied ? "Copied!" : "Copy git clone"}>
                <IconButton
                  size="small"
                  onClick={handleCopyClone}
                  sx={{
                    bgcolor: 'rgba(7, 10, 19, 0.85)',
                    color: copied ? '#10b981' : 'var(--text-secondary)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    '&:hover': { color: 'var(--primary-glow)', bgcolor: '#040814' }
                  }}
                >
                  {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Timeline Pill */}
          <Box sx={{ position: 'absolute', bottom: 10, left: 14, zIndex: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#cbd5e1', fontSize: '0.75rem' }}>
              {project.timeline}
            </Typography>
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#fff',
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
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '68px'
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
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              size="small"
              startIcon={<Visibility sx={{ fontSize: 16 }} />}
              onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
              sx={{
                color: 'var(--primary-glow)',
                textTransform: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.08)' }
              }}
            >
              Architecture Deep Dive
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

  const categories = ['ALL', 'AI & LLM', 'Systems & Security', 'Mobile Apps', 'Full Stack'];

  const filteredProjects = filter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ minHeight: '100vh', padding: '110px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader
          tag="CODE & SYSTEMS"
          title="Featured Projects"
          subtitle="Production-ready applications, local AI pipelines, network telemetry, and cross-platform mobile systems."
        />

        {/* Category Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.2, mb: 6 }}>
          {categories.map((cat) => {
            const count = cat === 'ALL' ? projectsData.length : projectsData.filter((p) => p.category === cat).length;
            const isSelected = filter === cat;
            return (
              <Chip
                key={cat}
                label={`${cat} (${count})`}
                onClick={() => setFilter(cat)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  py: 2.2,
                  px: 1,
                  borderRadius: '10px',
                  bgcolor: isSelected ? 'var(--primary-glow)' : 'rgba(12, 18, 34, 0.6)',
                  color: isSelected ? '#050814' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary-glow)' : 'rgba(56, 189, 248, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isSelected ? 'var(--secondary-glow)' : 'rgba(56, 189, 248, 0.1)',
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
