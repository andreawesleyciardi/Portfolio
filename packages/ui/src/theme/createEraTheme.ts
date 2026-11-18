import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import type { EraStyle } from '../eraStyles';

/**
 * Era-specific theme options. Only the differences from MUI's defaults are set here;
 * the components read everything else from the theme, so one component can render in
 * the style of any era.
 */
const eraOptions: Record<EraStyle, ThemeOptions> = {
  web2: {
    palette: {
      mode: 'light',
      primary: { main: '#3b8fd9' },
      secondary: { main: '#f7941d' },
      background: { default: '#eef3f8', paper: '#ffffff' },
    },
    shape: { borderRadius: 6 },
    typography: { fontFamily: 'Verdana, Tahoma, Geneva, sans-serif', fontSize: 12 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            border: '1px solid #1f5f99',
            textShadow: '0 -1px 0 rgba(0, 0, 0, 0.35)',
            backgroundImage:
              'linear-gradient(to bottom, #8cc4f2 0%, #4a9de4 50%, #2f86d4 51%, #3d93dc 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 3px rgba(0, 0, 0, 0.25)',
            '&:hover': {
              backgroundImage:
                'linear-gradient(to bottom, #a3d1f7 0%, #5aaaf0 50%, #3a92e0 51%, #4c9fe6 100%)',
            },
          },
        },
      },
    },
  },
  responsive: {
    palette: {
      mode: 'light',
      primary: { main: '#0069d6' },
      background: { default: '#ffffff', paper: '#f5f5f5' },
    },
    shape: { borderRadius: 4 },
    typography: { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 13 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            backgroundImage: 'linear-gradient(to bottom, #049cdb, #0064cd)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  },
  flat: {
    palette: {
      mode: 'light',
      primary: { main: '#1abc9c' },
      secondary: { main: '#e74c3c' },
      background: { default: '#ecf0f1', paper: '#ffffff' },
    },
    shape: { borderRadius: 0 },
    typography: { fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif' },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: { root: { textTransform: 'uppercase', letterSpacing: '0.05em' } },
      },
    },
  },
  material: {
    // Material Design itself: MUI's own defaults are the authentic look for this era.
    palette: { mode: 'light', primary: { main: '#3f51b5' }, secondary: { main: '#ff4081' } },
    typography: { fontFamily: 'Roboto, Arial, sans-serif' },
  },
  systems: {
    palette: {
      mode: 'light',
      primary: { main: '#5b4cdb' },
      background: { default: '#fafafa', paper: '#ffffff' },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
      },
    },
  },
  utility: {
    palette: {
      mode: 'dark',
      primary: { main: '#818cf8' },
      background: { default: '#0f172a', paper: '#1e293b' },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Inter, system-ui, sans-serif' },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
      },
    },
  },
  platform: {
    palette: {
      mode: 'dark',
      primary: { main: '#7dd3fc' },
      background: { default: '#0b0b0f', paper: '#16161d' },
    },
    shape: { borderRadius: 999 },
    typography: { fontFamily: 'system-ui, sans-serif' },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            // Glass: takes the text color of the page around it, so it works on light and dark.
            color: 'inherit',
            background: 'rgba(125, 211, 252, 0.16)',
            border: '1px solid rgba(125, 211, 252, 0.45)',
            backdropFilter: 'blur(12px) saturate(160%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            '&:hover': { background: 'rgba(125, 211, 252, 0.26)' },
          },
        },
      },
    },
  },
};

const cache = new Map<EraStyle, Theme>();

/** Returns the MUI theme for an era. Themes are created once and reused. */
export function createEraTheme(era: EraStyle): Theme {
  let theme = cache.get(era);
  if (!theme) {
    theme = createTheme(eraOptions[era]);
    cache.set(era, theme);
  }
  return theme;
}
