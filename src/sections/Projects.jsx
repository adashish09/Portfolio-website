import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, IconButton, Button } from '@mui/material';
import { GitHub, OpenInNew, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectModal from '../components/ui/ProjectModal';
import { projectsData } from '../data/projects';

const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Card 
        className="glass-container"
        onClick={onViewDetails}
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '380px',
          minHeight: '500px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 10px 30px -10px rgba(0, 242, 254, 0.4)',
            borderColor: 'rgba(0, 242, 254, 0.4)'
          }
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '220px', flexShrink: 0, borderRadius: 'inherit' }}>
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          {/* Action Buttons overlaying image */}
          <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1, zIndex: 2 }}>
            {project.github !== '#' && (
              <IconButton 
                href={project.github} 
                target="_blank"
                size="small"
                onClick={(e) => e.stopPropagation()} // prevent triggering modal
                sx={{ bgcolor: 'rgba(5, 8, 22, 0.8)', color: '#fff', '&:hover': { bgcolor: 'var(--primary-glow)', color: '#000' } }}
              >
                <GitHub fontSize="small" />
              </IconButton>
            )}
            {project.demo !== '#' && (
              <IconButton 
                href={project.demo} 
                target="_blank"
                size="small"
                onClick={(e) => e.stopPropagation()} // prevent triggering modal
                sx={{ bgcolor: 'rgba(5, 8, 22, 0.8)', color: '#fff', '&:hover': { bgcolor: 'var(--primary-glow)', color: '#000' } }}
              >
                <OpenInNew fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography variant="overline" sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', letterSpacing: 1, height: '24px', display: 'block' }}>
            {project.timeline}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 0.5, color: '#fff', lineHeight: 1.2, height: '46px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {project.title}
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, height: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {project.description}
          </Typography>
          
          {/* Lock the height of the chips container so rows align exactly */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, height: '64px', overflow: 'hidden', alignContent: 'flex-start' }}>
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <Chip 
                key={idx} 
                label={tech} 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  color: 'text.secondary',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.75rem'
                }} 
              />
            ))}
            {project.techStack.length > 4 && (
               <Chip label={`+${project.techStack.length - 4}`} size="small" sx={{ bgcolor: 'transparent', color: 'var(--primary-glow)', fontSize: '0.75rem' }} />
            )}
          </Box>

          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button 
              onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
              startIcon={<Visibility />}
              fullWidth
              sx={{ color: 'var(--primary-glow)', fontWeight: 'bold', '&:hover': { bgcolor: 'rgba(0, 242, 254, 0.1)' } }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" style={{ minHeight: '100vh', padding: '100px 0', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeader title="Selected Works" subtitle="Featured Projects & Applications" />
        
        {/* Responsive CSS Grid Layout */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 360px))',
            justifyContent: 'center',
            gap: '32px',
            width: '100%', 
            maxWidth: '1400px', 
            margin: '0 auto', 
            padding: '2rem' 
          }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} onViewDetails={() => setSelectedProject(project)} />
          ))}
        </Box>
      </Container>

      <ProjectModal 
        project={selectedProject} 
        open={Boolean(selectedProject)} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
