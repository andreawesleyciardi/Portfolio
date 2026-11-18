import type { Preview } from '@storybook/react-vite';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ERA_STYLES, ERA_STYLE_LABELS, createEraTheme, type EraStyle } from '@portfolio/ui';

const preview: Preview = {
  // Toolbar switch: render any story in the style of any era.
  globalTypes: {
    era: {
      description: 'Era style',
      toolbar: {
        title: 'Era',
        icon: 'calendar',
        items: ERA_STYLES.map((style) => ({ value: style, title: ERA_STYLE_LABELS[style] })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { era: 'web2' },
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={createEraTheme(context.globals.era as EraStyle)}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Playground',
          'Library',
          'Devices',
          'Backdrop',
          'Timeline',
          'Scene',
        ],
      },
    },
  },
};

export default preview;
