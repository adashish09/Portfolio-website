import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'dark') => {
  const isLight = mode === 'light';
  
  // Theme-specific color configurations
  const themeConfigs = {
    dark: {
      primary: '#00f2fe',
      primaryLight: '#38bdf8',
      primaryDark: '#0284c7',
      secondary: '#38bdf8',
      bgDefault: '#050814',
      bgPaper: '#090e22',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textDisabled: '#64748b',
      divider: 'rgba(255, 255, 255, 0.08)',
      cardBg: 'rgba(9, 14, 28, 0.82)',
      cardBorder: 'rgba(56, 189, 248, 0.18)',
      contrastText: '#050814'
    },
    synthwave: {
      primary: '#ff2a85',
      primaryLight: '#f472b6',
      primaryDark: '#db2777',
      secondary: '#c026d3',
      bgDefault: '#0c0517',
      bgPaper: '#170a2c',
      textPrimary: '#ffffff',
      textSecondary: '#f0abfc',
      textDisabled: '#a855f7',
      divider: 'rgba(255, 42, 133, 0.12)',
      cardBg: 'rgba(23, 10, 44, 0.82)',
      cardBorder: 'rgba(255, 42, 133, 0.22)',
      contrastText: '#ffffff'
    },
    matrix: {
      primary: '#00ff88',
      primaryLight: '#4ade80',
      primaryDark: '#059669',
      secondary: '#00f5d4',
      bgDefault: '#020d07',
      bgPaper: '#051b0f',
      textPrimary: '#f0fdf4',
      textSecondary: '#86efac',
      textDisabled: '#4ade80',
      divider: 'rgba(0, 255, 136, 0.12)',
      cardBg: 'rgba(5, 27, 15, 0.82)',
      cardBorder: 'rgba(0, 255, 136, 0.2)',
      contrastText: '#020d07'
    },
    light: {
      primary: '#0284c7',
      primaryLight: '#38bdf8',
      primaryDark: '#0369a1',
      secondary: '#0ea5e9',
      bgDefault: '#f8fafc',
      bgPaper: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textDisabled: '#94a3b8',
      divider: 'rgba(15, 23, 42, 0.08)',
      cardBg: 'rgba(255, 255, 255, 0.94)',
      cardBorder: 'rgba(14, 165, 233, 0.22)',
      contrastText: '#ffffff'
    }
  };

  const config = themeConfigs[mode] || themeConfigs.dark;

  return createTheme({
    palette: {
      mode: isLight ? 'light' : 'dark',
      primary: {
        main: config.primary,
        light: config.primaryLight,
        dark: config.primaryDark,
        contrastText: config.contrastText,
      },
      secondary: {
        main: config.secondary,
        light: config.primaryLight,
        dark: config.primaryDark,
      },
      background: {
        default: config.bgDefault,
        paper: config.bgPaper,
      },
      text: {
        primary: config.textPrimary,
        secondary: config.textSecondary,
        disabled: config.textDisabled,
      },
      divider: config.divider,
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 800,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      h5: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      h6: {
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backgroundColor: config.cardBg,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${config.cardBorder}`,
            boxShadow: isLight
              ? '0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)'
              : '0 10px 30px rgba(0, 0, 0, 0.45)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 600,
          },
        },
      },
    },
  });
};

const defaultTheme = createAppTheme('dark');
export default defaultTheme;
