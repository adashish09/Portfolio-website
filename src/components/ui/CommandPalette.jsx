import { useState } from 'react';
import { Dialog, Box, Typography, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { 
  Search, 
  Terminal, 
  Code, 
  Person, 
  Work, 
  School, 
  WorkspacePremium, 
  GitHub, 
  LinkedIn, 
  Email, 
  Phone, 
  Description, 
  ArrowForward 
} from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { projectsData } from '../../data/projects';

const CommandPalette = ({ open, onClose, onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const handleClose = () => {
    setQuery('');
    setCopiedText('');
    onClose();
  };

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const scrollTo = (id) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Commands & Navigation items
  const navItems = [
    { label: 'Go to Hero & Overview', icon: <Terminal fontSize="small" />, action: () => scrollTo('hero'), tag: 'Navigation' },
    { label: 'Go to About & Engineering Philosophy', icon: <Person fontSize="small" />, action: () => scrollTo('about'), tag: 'Navigation' },
    { label: 'Go to Skills & Tech Matrix', icon: <Code fontSize="small" />, action: () => scrollTo('skills'), tag: 'Navigation' },
    { label: 'Go to Featured Projects', icon: <Work fontSize="small" />, action: () => scrollTo('projects'), tag: 'Navigation' },
    { label: 'Go to Journey & Timeline', icon: <School fontSize="small" />, action: () => scrollTo('experience'), tag: 'Navigation' },
    { label: 'Go to Certifications', icon: <WorkspacePremium fontSize="small" />, action: () => scrollTo('certifications'), tag: 'Navigation' },
    { label: 'Go to GitHub & Open Source', icon: <GitHub fontSize="small" />, action: () => scrollTo('github'), tag: 'Navigation' },
    { label: 'Go to Resume & Highlights', icon: <Description fontSize="small" />, action: () => scrollTo('resume'), tag: 'Navigation' },
    { label: 'Go to Contact & Connect', icon: <Email fontSize="small" />, action: () => scrollTo('contact'), tag: 'Navigation' }
  ];

  const quickActions = [
    { 
      label: `Copy Email: ${personalInfo.email}`, 
      icon: <Email fontSize="small" />, 
      action: () => handleCopy(personalInfo.email, 'Email copied to clipboard!'), 
      tag: 'Contact' 
    },
    { 
      label: `Copy Phone: ${personalInfo.phone}`, 
      icon: <Phone fontSize="small" />, 
      action: () => handleCopy(personalInfo.phone, 'Phone number copied!'), 
      tag: 'Contact' 
    },
    { 
      label: 'Open GitHub Profile (@adashish09)', 
      icon: <GitHub fontSize="small" />, 
      action: () => window.open(personalInfo.github, '_blank'), 
      tag: 'Social' 
    },
    { 
      label: 'Open LinkedIn Profile', 
      icon: <LinkedIn fontSize="small" />, 
      action: () => window.open(personalInfo.linkedin, '_blank'), 
      tag: 'Social' 
    },
    { 
      label: 'Download Ashish Kumar Resume (PDF)', 
      icon: <Description fontSize="small" />, 
      action: () => {
        const link = document.createElement('a');
        link.href = '/assets/resume/Ashish_Kumar_Resume.pdf';
        link.download = 'Ashish_Kumar_Resume.pdf';
        link.click();
        handleClose();
      }, 
      tag: 'Document' 
    }
  ];

  const projectItems = projectsData.map((project) => ({
    label: `Project: ${project.title}`,
    icon: <Code fontSize="small" />,
    action: () => {
      scrollTo('projects');
      if (onSelectProject) onSelectProject(project);
    },
    tag: project.category
  }));

  const allItems = [...quickActions, ...navItems, ...projectItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(item => 
        item.label.toLowerCase().includes(query.toLowerCase()) || 
        item.tag.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#070c1a',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0,242,254,0.15)',
          overflow: 'hidden',
          color: '#fff',
          p: 0
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(3, 7, 18, 0.75)',
            backdropFilter: 'blur(8px)'
          }
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Search sx={{ color: 'var(--primary-glow)', fontSize: 22 }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Type a command, project, or section... (e.g. 'RAG', 'resume', 'contact')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            color: '#fff',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.95rem'
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span className="kbd-badge">ESC</span>
        </Box>
      </Box>

      {copiedText && (
        <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', p: 1, px: 2, color: '#34d399', fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace' }}>
          ✓ {copiedText}
        </Box>
      )}

      <List sx={{ maxHeight: 380, overflowY: 'auto', p: 1 }}>
        {filteredItems.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center', color: 'var(--text-muted)' }}>
            <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>
              No matches found for "{query}"
            </Typography>
          </Box>
        ) : (
          filteredItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={item.action}
                sx={{
                  borderRadius: '10px',
                  py: 1,
                  px: 1.5,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: 'rgba(56, 189, 248, 0.1)',
                    '& .arrow-icon': {
                      opacity: 1,
                      transform: 'translateX(3px)'
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'var(--primary-glow)', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                      {item.label}
                    </Typography>
                  }
                />
                <Chip 
                  label={item.tag} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.04)', 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.72rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    height: 22,
                    mr: 1
                  }} 
                />
                <ArrowForward className="arrow-icon" sx={{ fontSize: 16, color: 'var(--primary-glow)', opacity: 0, transition: 'all 0.15s ease' }} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      <Box sx={{ p: 1.5, px: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          Navigation Spotlight • <span style={{ color: 'var(--primary-glow)' }}>{personalInfo.status}</span>
        </Typography>
        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          [↑/↓] Navigate • [Enter] Select
        </Typography>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
