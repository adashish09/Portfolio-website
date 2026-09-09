import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Dialog, 
  Box, 
  Typography, 
  InputBase, 
  List, 
  ListItem, 
  ListItemButton, 
  Chip,
  IconButton
} from '@mui/material';
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
  ArrowForward,
  Bolt,
  Close,
  CheckCircle,
  SmartToy,
  Security,
  PhoneAndroid,
  Layers
} from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { projectsData } from '../../data/projects';

const CATEGORIES = [
  { id: 'ALL', label: 'All Results' },
  { id: 'ACTIONS', label: '⚡ Actions' },
  { id: 'PROJECTS', label: '🚀 Projects' },
  { id: 'NAVIGATION', label: '🧭 Navigation' },
  { id: 'CONTACT', label: '📬 Contact' }
];

const CommandPalette = ({ open, onClose, onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState('');
  const listRef = useRef(null);

  // Reset states on close
  const handleClose = useCallback(() => {
    setQuery('');
    setActiveCategory('ALL');
    setSelectedIndex(0);
    setCopiedNotification('');
    onClose();
  }, [onClose]);

  // Copy helper with feedback
  const handleCopy = useCallback((text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(''), 2400);
  }, []);

  const scrollTo = useCallback((id) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }, [handleClose]);

  // Unified item execution dispatcher
  const executeItem = useCallback((item) => {
    switch (item.actionType) {
      case 'copy':
        handleCopy(item.payload, item.copyMsg);
        break;
      case 'download': {
        const link = document.createElement('a');
        link.href = item.payload;
        link.download = 'Ashish_Kumar_Resume.pdf';
        link.click();
        handleClose();
        break;
      }
      case 'external':
        window.open(item.payload, '_blank');
        break;
      case 'scroll':
        scrollTo(item.payload);
        break;
      case 'project':
        scrollTo('projects');
        if (onSelectProject) onSelectProject(item.payload);
        break;
      default:
        break;
    }
  }, [handleCopy, handleClose, scrollTo, onSelectProject]);

  // Optimized Items Dataset
  const items = useMemo(() => {
    const actions = [
      {
        id: 'action-email',
        category: 'ACTIONS',
        title: 'Copy Email Address',
        subtitle: personalInfo.email,
        badge: 'Clipboard',
        icon: <Email sx={{ fontSize: 18, color: '#00f2fe' }} />,
        color: '#00f2fe',
        shortcut: '↵ Copy',
        actionType: 'copy',
        payload: personalInfo.email,
        copyMsg: `Copied email: ${personalInfo.email}`
      },
      {
        id: 'action-phone',
        category: 'ACTIONS',
        title: 'Copy Phone Number',
        subtitle: personalInfo.phone,
        badge: 'Clipboard',
        icon: <Phone sx={{ fontSize: 18, color: '#38bdf8' }} />,
        color: '#38bdf8',
        shortcut: '↵ Copy',
        actionType: 'copy',
        payload: personalInfo.phone,
        copyMsg: `Copied phone: ${personalInfo.phone}`
      },
      {
        id: 'action-resume',
        category: 'ACTIONS',
        title: 'Download Resume (PDF)',
        subtitle: 'Ashish Kumar • Software Engineer (MCA 8.24 CGPA)',
        badge: 'Document',
        icon: <Description sx={{ fontSize: 18, color: '#10b981' }} />,
        color: '#10b981',
        shortcut: '↵ Download',
        actionType: 'download',
        payload: '/assets/resume/Ashish_Kumar_Resume.pdf'
      },
      {
        id: 'action-github',
        category: 'ACTIONS',
        title: 'Open GitHub Profile',
        subtitle: 'https://github.com/adashish09',
        badge: 'External',
        icon: <GitHub sx={{ fontSize: 18, color: '#f1f5f9' }} />,
        color: '#94a3b8',
        shortcut: '↵ Open',
        actionType: 'external',
        payload: personalInfo.github
      },
      {
        id: 'action-linkedin',
        category: 'ACTIONS',
        title: 'Open LinkedIn Profile',
        subtitle: 'https://linkedin.com/in/ashish-kumar-dev',
        badge: 'External',
        icon: <LinkedIn sx={{ fontSize: 18, color: '#60a5fa' }} />,
        color: '#60a5fa',
        shortcut: '↵ Open',
        actionType: 'external',
        payload: personalInfo.linkedin
      }
    ];

    const projectIcons = {
      'AI & Machine Learning': <SmartToy sx={{ fontSize: 18, color: '#00f2fe' }} />,
      'Systems & Security': <Security sx={{ fontSize: 18, color: '#a855f7' }} />,
      'Mobile Apps': <PhoneAndroid sx={{ fontSize: 18, color: '#10b981' }} />,
      'Web Systems': <Layers sx={{ fontSize: 18, color: '#f59e0b' }} />
    };

    const projects = projectsData.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'PROJECTS',
      title: proj.title,
      subtitle: proj.description,
      badge: proj.techStack?.slice(0, 3).join(' • ') || proj.category,
      icon: projectIcons[proj.category] || <Code sx={{ fontSize: 18, color: '#00f2fe' }} />,
      color: '#00f2fe',
      shortcut: '↵ View',
      actionType: 'project',
      payload: proj
    }));

    const navigation = [
      { id: 'nav-hero', category: 'NAVIGATION', title: 'Terminal Hero Overview', subtitle: 'Interactive CLI & live status indicators', badge: 'Top', icon: <Terminal sx={{ fontSize: 18, color: '#00f2fe' }} />, color: '#00f2fe', shortcut: '↵ Jump', actionType: 'scroll', payload: 'hero' },
      { id: 'nav-about', category: 'NAVIGATION', title: 'Engineering Profile & Principles', subtitle: 'Academic background & core architecture values', badge: 'About', icon: <Person sx={{ fontSize: 18, color: '#38bdf8' }} />, color: '#38bdf8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'about' },
      { id: 'nav-skills', category: 'NAVIGATION', title: 'Interactive Skills Matrix', subtitle: 'Categorized technical domains & competencies', badge: 'Skills', icon: <Code sx={{ fontSize: 18, color: '#4facfe' }} />, color: '#4facfe', shortcut: '↵ Jump', actionType: 'scroll', payload: 'skills' },
      { id: 'nav-projects', category: 'NAVIGATION', title: 'Engineered Systems & Showcase', subtitle: 'RAG, NIDS, Android & Flutter implementations', badge: 'Projects', icon: <Work sx={{ fontSize: 18, color: '#818cf8' }} />, color: '#818cf8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'projects' },
      { id: 'nav-experience', category: 'NAVIGATION', title: 'Journey Timeline & Education', subtitle: 'MCA Chandigarh University & Project milestones', badge: 'Timeline', icon: <School sx={{ fontSize: 18, color: '#a855f7' }} />, color: '#a855f7', shortcut: '↵ Jump', actionType: 'scroll', payload: 'experience' },
      { id: 'nav-certs', category: 'NAVIGATION', title: 'Verified Certifications', subtitle: 'AWS Generative AI, Prompt Eng, Meta Android & React', badge: 'Certs', icon: <WorkspacePremium sx={{ fontSize: 18, color: '#f59e0b' }} />, color: '#f59e0b', shortcut: '↵ Jump', actionType: 'scroll', payload: 'certifications' },
      { id: 'nav-github', category: 'NAVIGATION', title: 'GitHub Metrics & Repositories', subtitle: 'Open-source stats, starred repositories & streaks', badge: 'GitHub', icon: <GitHub sx={{ fontSize: 18, color: '#94a3b8' }} />, color: '#94a3b8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'github' },
      { id: 'nav-resume', category: 'NAVIGATION', title: 'Interactive Resume Preview', subtitle: 'Embedded PDF viewer, credentials & download', badge: 'Resume', icon: <Description sx={{ fontSize: 18, color: '#10b981' }} />, color: '#10b981', shortcut: '↵ Jump', actionType: 'scroll', payload: 'resume' },
      { id: 'nav-contact', category: 'NAVIGATION', title: 'Direct Contact & Inquiries', subtitle: 'Email, phone, location & message form', badge: 'Contact', icon: <Email sx={{ fontSize: 18, color: '#ec4899' }} />, color: '#ec4899', shortcut: '↵ Jump', actionType: 'scroll', payload: 'contact' }
    ];

    const contact = [
      { id: 'contact-email', category: 'CONTACT', title: `Send Email: ${personalInfo.email}`, subtitle: 'Available for full-time & high-impact engineering roles', badge: 'Direct', icon: <Email sx={{ fontSize: 18, color: '#00f2fe' }} />, color: '#00f2fe', shortcut: '↵ Mail', actionType: 'external', payload: `mailto:${personalInfo.email}` },
      { id: 'contact-call', category: 'CONTACT', title: `Call Phone: ${personalInfo.phone}`, subtitle: 'Direct voice/mobile contact', badge: 'Direct', icon: <Phone sx={{ fontSize: 18, color: '#10b981' }} />, color: '#10b981', shortcut: '↵ Call', actionType: 'external', payload: `tel:${personalInfo.phone}` }
    ];

    return [...actions, ...projects, ...navigation, ...contact];
  }, []);

  // Filtered Items based on Query & Category Tab
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, query, activeCategory]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSelectedIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          executeItem(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, executeItem]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(7, 12, 26, 0.96)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 45px rgba(0, 242, 254, 0.22)',
          overflow: 'hidden',
          color: '#fff',
          p: 0
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(28px) saturate(180%) contrast(105%)',
            backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(0, 242, 254, 0.12) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(2, 4, 10, 0.94) 85%)'
          }
        }
      }}
    >
      {/* Search Header Bar */}
      <Box sx={{ p: 2.2, px: 2.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: 1.8 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: 'rgba(0, 242, 254, 0.12)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Search sx={{ color: 'var(--primary-glow)', fontSize: 20 }} />
        </Box>

        <InputBase
          autoFocus
          fullWidth
          placeholder="Search commands, projects, skills, or jump to section... (e.g. 'RAG', 'resume', 'email')"
          value={query}
          onChange={handleQueryChange}
          sx={{
            color: '#fff',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1rem',
            '& input::placeholder': {
              color: 'rgba(148, 163, 184, 0.7)',
              opacity: 1
            }
          }}
        />

        {query && (
          <IconButton size="small" onClick={() => { setQuery(''); setSelectedIndex(0); }} sx={{ color: 'var(--text-muted)' }}>
            <Close fontSize="small" />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <span className="kbd-badge">ESC</span>
        </Box>
      </Box>

      {/* Category Filter Tabs */}
      <Box
        sx={{
          px: 2.5,
          py: 1.2,
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          bgcolor: 'rgba(4, 7, 18, 0.6)'
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Box
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              sx={{
                px: 1.8,
                py: 0.6,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.76rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#00f2fe' : 'var(--text-secondary)',
                bgcolor: isActive ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(0, 242, 254, 0.35)' : '1px solid transparent',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.04)'
                }
              }}
            >
              {cat.label}
            </Box>
          );
        })}
      </Box>

      {/* Toast Confirmation for Clipboard actions */}
      {copiedNotification && (
        <Box
          sx={{
            bgcolor: 'rgba(16, 185, 129, 0.16)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.35)',
            py: 1,
            px: 2.5,
            color: '#34d399',
            fontSize: '0.84rem',
            fontFamily: 'JetBrains Mono, monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <CheckCircle sx={{ fontSize: 16 }} />
          {copiedNotification}
        </Box>
      )}

      {/* Results List */}
      <List ref={listRef} sx={{ maxHeight: 390, overflowY: 'auto', p: 1.5, py: 1 }}>
        {filteredItems.length === 0 ? (
          <Box sx={{ py: 7, textAlign: 'center' }}>
            <Bolt sx={{ fontSize: 36, color: 'rgba(148, 163, 184, 0.3)', mb: 1 }} />
            <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>
              No matches found for "{query}"
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(148, 163, 184, 0.5)', display: 'block', mt: 0.5 }}>
              Try searching "RAG", "resume", "skills", or "email"
            </Typography>
          </Box>
        ) : (
          filteredItems.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.6 }}>
                <ListItemButton
                  data-index={index}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  sx={{
                    borderRadius: '12px',
                    py: 1.1,
                    px: 1.8,
                    border: isSelected ? '1px solid rgba(0, 242, 254, 0.35)' : '1px solid transparent',
                    bgcolor: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.6
                  }}
                >
                  {/* Category-coded Icon */}
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '10px',
                      bgcolor: isSelected ? `${item.color}22` : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${isSelected ? item.color : 'rgba(255, 255, 255, 0.08)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Main Content Info */}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isSelected ? '#fff' : '#e2e8f0',
                          fontSize: '0.92rem',
                          fontFamily: 'Space Grotesk, sans-serif'
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mt: 0.2
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>

                  {/* Tag / Tech Badge */}
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.7rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      height: 22,
                      display: { xs: 'none', sm: 'inline-flex' }
                    }}
                  />

                  {/* Shortcut Indicator */}
                  <Box
                    sx={{
                      px: 1,
                      py: 0.4,
                      borderRadius: '6px',
                      bgcolor: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isSelected ? 'var(--primary-glow)' : 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexShrink: 0
                    }}
                  >
                    <span>{item.shortcut}</span>
                    <ArrowForward sx={{ fontSize: 12, opacity: isSelected ? 1 : 0.4 }} />
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>

      {/* Footer Status & Navigation Shortcuts */}
      <Box
        sx={{
          p: 1.4,
          px: 2.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          bgcolor: 'rgba(2, 4, 10, 0.85)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.76rem' }}>
            Spotlight • <span style={{ color: 'var(--primary-glow)' }}>{filteredItems.length} commands</span>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
            [↑/↓] Navigate
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
            [↵] Select
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>
            [ESC] Close
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
