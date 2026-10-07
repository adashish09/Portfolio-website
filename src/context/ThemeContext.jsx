import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme/theme';

export const THEME_PRESETS = [
  {
    id: 'dark',
    name: 'Cosmic Cyber',
    icon: '🌌',
    tagline: 'Deep Space & Cyan Glow',
    primaryColor: '#00f2fe',
    secondaryColor: '#38bdf8',
    accentColor: '#a855f7',
    bgColor: '#050814',
    isDark: true
  },
  {
    id: 'synthwave',
    name: 'Neon Synthwave',
    icon: '🌆',
    tagline: 'Outrun & Magenta Sunset',
    primaryColor: '#ff2a85',
    secondaryColor: '#c026d3',
    accentColor: '#fbbf24',
    bgColor: '#0c0517',
    isDark: true
  },
  {
    id: 'matrix',
    name: 'Matrix Terminal',
    icon: '💻',
    tagline: 'Encrypted Emerald & Cyber Teal',
    primaryColor: '#00ff88',
    secondaryColor: '#00f5d4',
    accentColor: '#38bdf8',
    bgColor: '#020d07',
    isDark: true
  },
  {
    id: 'light',
    name: 'Nordic Frost',
    icon: '❄️',
    tagline: 'Glacier Pearl & Cobalt Blue',
    primaryColor: '#0284c7',
    secondaryColor: '#0ea5e9',
    accentColor: '#6366f1',
    bgColor: '#f8fafc',
    isDark: false
  }
];

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeContextProvider');
  }
  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme_mode');
      if (['dark', 'synthwave', 'matrix', 'light'].includes(saved)) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [warpActive, setWarpActive] = useState(false);
  const [warpOrigin, setWarpOrigin] = useState({ x: 50, y: 50 }); // percentage

  const currentTheme = useMemo(() => {
    return THEME_PRESETS.find((t) => t.id === mode) || THEME_PRESETS[0];
  }, [mode]);

  const triggerWarp = useCallback((originX = 50, originY = 50) => {
    setWarpOrigin({ x: originX, y: originY });
    setWarpActive(true);
    const timer = setTimeout(() => setWarpActive(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const setThemeMode = useCallback((newMode, event) => {
    if (newMode === mode) return;
    if (['dark', 'synthwave', 'matrix', 'light'].includes(newMode)) {
      if (event && event.clientX && event.clientY) {
        const originX = (event.clientX / window.innerWidth) * 100;
        const originY = (event.clientY / window.innerHeight) * 100;
        triggerWarp(originX, originY);
      } else {
        triggerWarp(50, 50);
      }
      setMode(newMode);
    }
  }, [mode, triggerWarp]);

  // Cycle to next theme preset
  const cycleTheme = useCallback((event) => {
    const currentIndex = THEME_PRESETS.findIndex((t) => t.id === mode);
    const nextIndex = (currentIndex + 1) % THEME_PRESETS.length;
    setThemeMode(THEME_PRESETS[nextIndex].id, event);
  }, [mode, setThemeMode]);

  // Binary toggle between current mode and light (or dark if already light)
  const toggleTheme = useCallback((event) => {
    if (mode === 'light') {
      setThemeMode('dark', event);
    } else {
      setThemeMode('light', event);
    }
  }, [mode, setThemeMode]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_theme_mode', mode);
    } catch (e) {
      // Ignore local storage error
    }

    document.documentElement.setAttribute('data-theme', mode);
    
    // Remove all previous theme classes
    document.body.classList.remove('dark-mode', 'light-mode', 'theme-synthwave', 'theme-matrix', 'theme-dark', 'theme-light');
    
    // Apply appropriate classes
    if (mode === 'light') {
      document.body.classList.add('light-mode', 'theme-light');
    } else {
      document.body.classList.add('dark-mode');
      if (mode === 'synthwave') document.body.classList.add('theme-synthwave');
      else if (mode === 'matrix') document.body.classList.add('theme-matrix');
      else document.body.classList.add('theme-dark');
    }
  }, [mode]);

  const muiTheme = useMemo(() => {
    return createAppTheme(mode);
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        currentTheme,
        themes: THEME_PRESETS,
        toggleTheme,
        cycleTheme,
        setThemeMode,
        isDark: mode !== 'light',
        warpActive,
        warpOrigin,
        triggerWarp
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
