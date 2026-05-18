import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f2fe',
    },
    secondary: {
      main: '#4facfe',
    },
    background: {
      default: '#050816',
      paper: '#151030',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaa6c3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
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
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: 'rgba(21, 16, 48, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

export default theme;
