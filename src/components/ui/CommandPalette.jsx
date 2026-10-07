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
  Description, 
  ArrowForward, 
  Bolt, 
  Close, 
  CheckCircle, 
  SmartToy, 
  Security, 
  PhoneAndroid, 
  Layers, 
  LightMode, 
  DarkMode,
  Handyman
} from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { projectsData } from '../../data/projects';
import { skillsList } from '../../data/skills';
import TechIcon from './TechIcon';
import { useThemeMode } from '../../context/ThemeContext';

const CATEGORIES = [
  { id: 'ALL', label: 'All Results' },
  { id: 'ACTIONS', label: '⚡ Actions' },
  { id: 'SKILLS', label: '🛠️ Stack' },
  { id: 'PROJECTS', label: '🚀 Projects' },
  { id: 'NAVIGATION', label: '🧭 Jump' },
  { id: 'CONTACT', label: '📬 Contact' }
];

const CommandPalette = ({ open, onClose, onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState('');
  const listRef = useRef(null);
  const { mode, toggleTheme, setThemeMode, themes, currentTheme, isDark } = useThemeMode();

  // Reset state on open/close
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setActiveCategory('ALL');
    }
  }, [open]);

  // Construct Searchable Command Palette Database
  const items = useMemo(() => {
    const actions = [
      {
        id: 'action-theme-cosmic',
        category: 'ACTIONS',
        title: 'Universe: Cosmic Cyber 🌌',
        subtitle: 'Deep space obsidian, cyan glow & 3D stellar constellation',
        badge: 'Universe',
        icon: <Box sx={{ fontSize: 16 }}>🌌</Box>,
        color: '#00f2fe',
        shortcut: '↵ Switch',
        actionType: 'set-theme',
        payload: 'dark'
      },
      {
        id: 'action-theme-synthwave',
        category: 'ACTIONS',
        title: 'Universe: Neon Synthwave 🌆',
        subtitle: 'Outrun retro-future, hot pink magenta & 3D wireframe grid',
        badge: 'Universe',
        icon: <Box sx={{ fontSize: 16 }}>🌆</Box>,
        color: '#ff2a85',
        shortcut: '↵ Switch',
        actionType: 'set-theme',
        payload: 'synthwave'
      },
      {
        id: 'action-theme-matrix',
        category: 'ACTIONS',
        title: 'Universe: Matrix Terminal 💻',
        subtitle: 'Encrypted cyber, hacker emerald & 3D data code streams',
        badge: 'Universe',
        icon: <Box sx={{ fontSize: 16 }}>💻</Box>,
        color: '#00ff88',
        shortcut: '↵ Switch',
        actionType: 'set-theme',
        payload: 'matrix'
      },
      {
        id: 'action-theme-frost',
        category: 'ACTIONS',
        title: 'Universe: Nordic Frost ❄️',
        subtitle: 'Glacier pearl, electric cobalt & 3D floating glass spheres',
        badge: 'Universe',
        icon: <Box sx={{ fontSize: 16 }}>❄️</Box>,
        color: '#0284c7',
        shortcut: '↵ Switch',
        actionType: 'set-theme',
        payload: 'light'
      },
      {
        id: 'action-resume',
        category: 'ACTIONS',
        title: 'Open Interactive Resume PDF',
        subtitle: 'View, examine or download Ashish Kumar CV',
        badge: 'Quick View',
        icon: <Description sx={{ fontSize: 18, color: '#10b981' }} />,
        color: '#10b981',
        shortcut: '↵ Open',
        actionType: 'resume',
        payload: null
      },
      {
        id: 'action-copy-email',
        category: 'ACTIONS',
        title: `Copy Email Address: ${personalInfo.email}`,
        subtitle: 'Direct email for interviews and engineering queries',
        badge: 'Clipboard',
        icon: <Email sx={{ fontSize: 18, color: '#00f2fe' }} />,
        color: '#00f2fe',
        shortcut: '↵ Copy',
        actionType: 'copy',
        payload: personalInfo.email
      },
      {
        id: 'action-github',
        category: 'ACTIONS',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/adashish09 • 20+ public repositories',
        badge: 'External',
        icon: <GitHub sx={{ fontSize: 18, color: '#94a3b8' }} />,
        color: '#94a3b8',
        shortcut: '↵ Open',
        actionType: 'external',
        payload: personalInfo.github
      },
      {
        id: 'action-linkedin',
        category: 'ACTIONS',
        title: 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/ashish-kumar-ad0016 • Connect & Message',
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

    const skills = skillsList.map((skill) => ({
      id: `skill-${skill.id}`,
      category: 'SKILLS',
      title: skill.name,
      subtitle: `${skill.domain} • ${skill.specialty}`,
      badge: skill.tier,
      icon: <TechIcon iconKey={skill.iconKey} size={18} color={skill.brandColor} />,
      color: skill.brandColor,
      shortcut: '↵ Inspect',
      actionType: 'scroll',
      payload: 'skills'
    }));

    const navigation = [
      { id: 'nav-hero', category: 'NAVIGATION', title: 'Terminal Hero Overview', subtitle: 'Interactive CLI & live status indicators', badge: 'Top', icon: <Terminal sx={{ fontSize: 18, color: '#00f2fe' }} />, color: '#00f2fe', shortcut: '↵ Jump', actionType: 'scroll', payload: 'hero' },
      { id: 'nav-about', category: 'NAVIGATION', title: 'Engineering Profile & Adaptability', subtitle: 'Academic background & core architecture values', badge: 'About', icon: <Person sx={{ fontSize: 18, color: '#38bdf8' }} />, color: '#38bdf8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'about' },
      { id: 'nav-skills', category: 'NAVIGATION', title: 'Technical Arsenal & Stack', subtitle: 'Categorized technical domains & tool logos', badge: 'Skills', icon: <Handyman sx={{ fontSize: 18, color: '#4facfe' }} />, color: '#4facfe', shortcut: '↵ Jump', actionType: 'scroll', payload: 'skills' },
      { id: 'nav-projects', category: 'NAVIGATION', title: 'Engineered Systems & Showcase', subtitle: 'RAG, NIDS, Android & Flutter implementations', badge: 'Projects', icon: <Work sx={{ fontSize: 18, color: '#818cf8' }} />, color: '#818cf8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'projects' },
      { id: 'nav-experience', category: 'NAVIGATION', title: 'Journey Timeline & Education', subtitle: 'MCA Chandigarh University & Project milestones', badge: 'Timeline', icon: <School sx={{ fontSize: 18, color: '#a855f7' }} />, color: '#a855f7', shortcut: '↵ Jump', actionType: 'scroll', payload: 'experience' },
      { id: 'nav-certs', category: 'NAVIGATION', title: 'Verified Certifications', subtitle: 'AWS Generative AI, Prompt Eng, Meta Android & React', badge: 'Certs', icon: <WorkspacePremium sx={{ fontSize: 18, color: '#f59e0b' }} />, color: '#f59e0b', shortcut: '↵ Jump', actionType: 'scroll', payload: 'certifications' },
      { id: 'nav-github', category: 'NAVIGATION', title: 'GitHub Metrics & Repositories', subtitle: 'Open-source stats, starred repositories & streaks', badge: 'GitHub', icon: <GitHub sx={{ fontSize: 18, color: '#94a3b8' }} />, color: '#94a3b8', shortcut: '↵ Jump', actionType: 'scroll', payload: 'github' },
      { id: 'nav-resume', category: 'NAVIGATION', title: 'Interactive Resume Preview', subtitle: 'Embedded PDF viewer, credentials & download', badge: 'Resume', icon: <Description sx={{ fontSize: 18, color: '#10b981' }} />, color: '#10b981', shortcut: '↵ Jump', actionType: 'scroll', payload: 'resume' },
      { id: 'nav-contact', category: 'NAVIGATION', title: 'Direct Contact & Inquiries', subtitle: 'Email, LinkedIn, location & message form', badge: 'Contact', icon: <Email sx={{ fontSize: 18, color: '#ec4899' }} />, color: '#ec4899', shortcut: '↵ Jump', actionType: 'scroll', payload: 'contact' }
    ];

    const contact = [
      { id: 'contact-email', category: 'CONTACT', title: `Send Email: ${personalInfo.email}`, subtitle: 'Available for full-time & high-impact engineering roles', badge: 'Direct', icon: <Email sx={{ fontSize: 18, color: '#00f2fe' }} />, color: '#00f2fe', shortcut: '↵ Mail', actionType: 'external', payload: `mailto:${personalInfo.email}` },
      { id: 'contact-linkedin', category: 'CONTACT', title: 'Connect on LinkedIn', subtitle: 'linkedin.com/in/ashish-kumar-ad0016', badge: 'Direct', icon: <LinkedIn sx={{ fontSize: 18, color: '#60a5fa' }} />, color: '#60a5fa', shortcut: '↵ Open', actionType: 'external', payload: personalInfo.linkedin }
    ];

    return [...actions, ...skills, ...projects, ...navigation, ...contact];
  }, [mode]);

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

  const scrollToTarget = useCallback((targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const executeItem = useCallback((item) => {
    if (!item) return;

    if (item.actionType === 'scroll') {
      onClose();
      setTimeout(() => scrollToTarget(item.payload), 150);
    } else if (item.actionType === 'project') {
      onClose();
      if (onSelectProject) {
        setTimeout(() => onSelectProject(item.payload), 150);
      }
    } else if (item.actionType === 'resume') {
      onClose();
      setTimeout(() => scrollToTarget('resume'), 150);
    } else if (item.actionType === 'set-theme') {
      setThemeMode(item.payload);
      onClose();
    } else if (item.actionType === 'theme') {
      toggleTheme();
    } else if (item.actionType === 'external') {
      window.open(item.payload, '_blank');
      onClose();
    } else if (item.actionType === 'copy') {
      navigator.clipboard.writeText(item.payload);
      setCopiedNotification(`Copied: ${item.payload}`);
      setTimeout(() => setCopiedNotification(''), 2200);
    }
  }, [onClose, onSelectProject, scrollToTarget, setThemeMode, toggleTheme]);

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark ? 'rgba(3, 6, 16, 0.75)' : 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(8px)'
          }
        },
        paper: {
          sx: {
            backgroundColor: isDark ? 'rgba(6, 9, 22, 0.96)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid var(--card-border)',
            borderRadius: '18px',
            boxShadow: isDark
              ? '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.12)'
              : '0 25px 60px -10px rgba(15, 23, 42, 0.18)',
            overflow: 'hidden'
          }
        }
      }}
    >
      {/* Search Header Bar */}
      <Box sx={{ p: 2.2, px: 2.5, borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: 1.8 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: 'var(--subtle-chip-bg)',
            border: '1px solid var(--card-border)',
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
          placeholder="Search commands, projects, skills, or jump to section... (e.g. 'Python', 'RAG', 'theme')"
          value={query}
          onChange={handleQueryChange}
          sx={{
            color: 'var(--text-primary)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1rem',
            '& input::placeholder': {
              color: 'var(--text-muted)',
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
          borderBottom: '1px solid var(--card-border)',
          bgcolor: isDark ? 'rgba(7, 11, 24, 0.7)' : 'rgba(241, 245, 249, 0.85)'
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
                color: isActive ? 'var(--primary-glow)' : 'var(--text-secondary)',
                bgcolor: isActive ? (isDark ? 'rgba(0, 242, 254, 0.12)' : 'rgba(2, 132, 199, 0.12)') : 'transparent',
                border: isActive ? '1px solid var(--primary-glow)' : '1px solid transparent',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: 'var(--text-primary)',
                  bgcolor: 'var(--subtle-chip-bg)'
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
            bgcolor: 'rgba(16, 185, 129, 0.14)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            py: 1,
            px: 2.5,
            color: '#10b981',
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
      <List ref={listRef} sx={{ maxHeight: 400, overflowY: 'auto', p: 1.5, py: 1 }}>
        {filteredItems.length === 0 ? (
          <Box sx={{ py: 7, textAlign: 'center' }}>
            <Bolt sx={{ fontSize: 36, color: 'var(--text-muted)', mb: 1, opacity: 0.5 }} />
            <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>
              No matches found for "{query}"
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', mt: 0.5, opacity: 0.7 }}>
              Try searching "Python", "RAG", "resume", "skills", or "email"
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
                    border: isSelected ? '1px solid var(--primary-glow)' : '1px solid transparent',
                    bgcolor: isSelected ? (isDark ? 'rgba(0, 242, 254, 0.08)' : 'rgba(2, 132, 199, 0.08)') : 'transparent',
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
                      bgcolor: isSelected ? `${item.color}22` : 'var(--subtle-chip-bg)',
                      border: `1px solid ${isSelected ? item.color : 'var(--card-border)'}`,
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
                          color: isSelected ? 'var(--primary-glow)' : 'var(--text-primary)',
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
                      bgcolor: 'var(--subtle-chip-bg)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-muted)',
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
                      py: 0.3,
                      borderRadius: '6px',
                      bgcolor: isSelected ? 'var(--primary-glow)' : 'var(--subtle-chip-bg)',
                      color: isSelected ? (isDark ? '#050814' : '#fff') : 'var(--text-muted)',
                      fontSize: '0.7rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {item.shortcut}
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>

      {/* Footer Navigation Bar */}
      <Box
        sx={{
          p: 1.6,
          px: 2.5,
          borderTop: '1px solid var(--card-border)',
          bgcolor: isDark ? 'rgba(7, 11, 24, 0.7)' : 'rgba(241, 245, 249, 0.85)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <span className="kbd-badge">↑</span>
            <span className="kbd-badge">↓</span>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
              Navigate
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <span className="kbd-badge">↵</span>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
              Select
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
          {filteredItems.length} results available
        </Typography>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
