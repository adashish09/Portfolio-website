import { useThemeMode } from '../../context/ThemeContext';
import { Box, Typography } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

/**
 * ThemeWarpTransition: Cinematic "Fade-Away & Roll-In" Universe Transition
 * Seamlessly sweeps an energetic light curtain across the screen:
 * - The previous theme gracefully fades away under an ethereal frosted blur
 * - The new theme rolls in behind a radiant laser aurora beam
 * - A sleek holographic HUD badge confirms the newly activated universe
 */
const ThemeWarpTransition = () => {
  const { warpActive, currentTheme } = useThemeMode();

  if (!warpActive) return null;

  return (
    <div className="theme-roll-container" aria-hidden="true">
      {/* 1. Full-screen Rolling Curtain */}
      <div
        className="theme-roll-curtain"
        style={{
          background: `linear-gradient(180deg, ${currentTheme.bgColor}f0 0%, ${currentTheme.bgColor}99 100%)`
        }}
      >
        {/* Leading Laser Aurora Beam */}
        <div
          className="theme-roll-laser"
          style={{
            borderColor: currentTheme.primaryColor,
            boxShadow: `0 0 35px 8px ${currentTheme.primaryColor}, 0 0 70px 20px ${currentTheme.secondaryColor}`
          }}
        />
      </div>

      {/* 2. Floating Holographic Universe Roll-In Pill */}
      <div className="theme-roll-badge-wrapper">
        <Box
          className="theme-roll-badge"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            px: 2.2,
            py: 1,
            borderRadius: '9999px',
            bgcolor: `${currentTheme.bgColor}ee`,
            border: `1.5px solid ${currentTheme.primaryColor}`,
            boxShadow: `0 10px 30px -5px ${currentTheme.primaryColor}50`,
            backdropFilter: 'blur(20px)'
          }}
        >
          <Box sx={{ fontSize: '1.25rem', lineHeight: 1 }}>{currentTheme.icon}</Box>
          <Box>
            <Typography
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: currentTheme.primaryColor,
                letterSpacing: '0.04em',
                lineHeight: 1.2
              }}
            >
              {currentTheme.name.toUpperCase()} ACTIVATED
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                display: 'block'
              }}
            >
              {currentTheme.tagline}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ThemeWarpTransition;
