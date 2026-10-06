import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#00f2fe' : '#0284c7',
        light: isDark ? '#38bdf8' : '#38bdf8',
        dark: isDark ? '#0284c7' : '#0369a1',
        contrastText: isDark ? '#050814' : '#ffffff',
      },
      secondary: {
        main: isDark ? '#38bdf8' : '#0ea5e9',
        light: '#7dd3fc',
        dark: '#0369a1',
      },
      background: {
        default: isDark ? '#050814' : '#f8fafc',
        paper: isDark ? '#090e22' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#0f172a',
        secondary: isDark ? '#cbd5e1' : '#334155',
        disabled: isDark ? '#64748b' : '#94a3b8',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
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
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(9, 14, 28, 0.8)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            border: isDark ? '1px solid rgba(56, 189, 248, 0.18)' : '1px solid rgba(14, 165, 233, 0.22)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0, 0, 0, 0.4)'
              : '0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
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
