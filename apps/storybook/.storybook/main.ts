import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Stories live next to their components in each package; this app holds the config, the
  // introduction and the Playground, which combines every package.
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../../../packages/*/src/**/*.mdx',
    '../../../packages/*/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  viteFinal: (viteConfig) => {
    // MUI marks its files with "use client" for Next.js; Vite warns that it drops it. Harmless here.
    const build = (viteConfig.build ??= {});
    const options = (build.rollupOptions ??= {});
    options.onwarn = (warning, warn) => {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
      warn(warning);
    };
    return viteConfig;
  },
};

export default config;
