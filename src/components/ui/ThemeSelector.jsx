import { useState } from 'react';
import { Box, Typography, Menu, MenuItem, IconButton, Tooltip, Chip } from '@mui/material';
import { Palette, Check, AutoAwesome } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { mode, currentTheme, themes, setThemeMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTheme = (themeId, event) => {
    setThemeMode(themeId, event);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Switch Universe / Theme Preset">
        <Box
          id="theme-selector-trigger"
          onClick={handleClick}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: { xs: 1, sm: 1.4 },
            py: 0.6,
            borderRadius: '10px',
            cursor: 'pointer',
            bgcolor: 'var(--subtle-chip-bg)',
            border: '1px solid var(--card-border)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              borderColor: 'var(--primary-glow)',
              boxShadow: '0 0 16px var(--theme-halo)',
              transform: 'scale(1.03)'
            }
          }}
        >
          <Box
            sx={{
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1
            }}
          >
            {currentTheme.icon}
          </Box>
          <Typography
            sx={{
              display: { xs: 'none', md: 'inline' },
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            {currentTheme.name}
          </Typography>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: currentTheme.primaryColor,
              boxShadow: `0 0 8px ${currentTheme.primaryColor}`
            }}
          />
        </Box>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.2,
              minWidth: 260,
              bgcolor: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              boxShadow: 'var(--card-shadow)',
              p: 1
            }
          }
        }}
      >
        <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid var(--card-border)', mb: 0.8 }}>
          <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-glow)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <AutoAwesome sx={{ fontSize: 14 }} /> SELECT UNIVERSE THEME
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace' }}>
            Each theme features a unique 3D background
          </Typography>
        </Box>

        {themes.map((theme) => {
          const isSelected = theme.id === mode;
          return (
            <MenuItem
              key={theme.id}
              data-theme-id={theme.id}
              onClick={(e) => handleSelectTheme(theme.id, e)}
              sx={{
                borderRadius: '10px',
                my: 0.4,
                py: 1,
                px: 1.5,
                bgcolor: isSelected ? 'var(--theme-halo)' : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? theme.primaryColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${theme.primaryColor}15`,
                  borderColor: `${theme.primaryColor}50`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                <Box sx={{ fontSize: '1.25rem', lineHeight: 1 }}>{theme.icon}</Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? theme.primaryColor : 'var(--text-primary)',
                      lineHeight: 1.2
                    }}
                  >
                    {theme.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                      display: 'block'
                    }}
                  >
                    {theme.tagline}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Color preview dot */}
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: theme.primaryColor,
                    boxShadow: `0 0 8px ${theme.primaryColor}`
                  }}
                />
                {isSelected && <Check sx={{ fontSize: 16, color: theme.primaryColor }} />}
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ThemeSelector;
