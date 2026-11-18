import { createTheme, type Theme } from '@mui/material/styles';

export type PageMode = 'light' | 'dark';

const cache = new Map<PageMode, Theme>();

/**
 * The neutral theme of the page around the devices: the same in every era, in light or dark.
 * Era themes (`createEraTheme`) apply only to what evolves: the sites inside the devices and
 * the Contact Me button.
 */
export function createPageTheme(mode: PageMode): Theme {
  let theme = cache.get(mode);
  if (!theme) {
    theme = createTheme({
      palette:
        mode === 'dark'
          ? {
              mode,
              background: { default: '#0e1014', paper: '#171a21' },
              text: { primary: '#eceef2', secondary: '#a3a9b6' },
            }
          : {
              mode,
              background: { default: '#f4f5f7', paper: '#ffffff' },
              text: { primary: '#16181d', secondary: '#555b66' },
            },
      typography: {
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      },
    });
    cache.set(mode, theme);
  }
  return theme;
}
