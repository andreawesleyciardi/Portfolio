import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CODE_PLACEMENTS, type CodePlacement } from '@portfolio/backdrop';
import { highlightCode } from '@portfolio/backdrop/highlight';
import { eras, type Era } from '@portfolio/eras';
import { createPageTheme } from '@portfolio/ui';
import { EraPanel } from './EraPanel';
import { EraScene, SCENE_PAGE_MODES, type ScenePageMode } from './EraScene';

const byId = Object.fromEntries(eras.map((era) => [era.id, era])) as Record<string, Era>;

interface SceneArgs {
  eraId: string;
  pageMode: ScenePageMode;
  codePlacement: CodePlacement;
  codeIncline: number;
  codeSize: number;
}

function HighlightedEraScene({ eraId, ...rest }: SceneArgs) {
  const era = byId[eraId]!;
  const highlighted = useMemo(() => highlightCode(era.code.snippet, era.code.language), [era]);
  return <EraScene era={era} contactHref="#contact" highlightedCode={highlighted} {...rest} />;
}

const meta = {
  title: 'Scene',
  parameters: { layout: 'fullscreen' },
  args: {
    eraId: eras[0]!.id,
    pageMode: 'split',
    codePlacement: 'right',
    codeIncline: -6,
    codeSize: 1.2,
  },
  argTypes: {
    eraId: { name: 'Era', control: 'select', options: eras.map((era) => era.id) },
    pageMode: { name: 'Page mode', control: 'inline-radio', options: SCENE_PAGE_MODES },
    codePlacement: { name: 'Code placement', control: 'inline-radio', options: CODE_PLACEMENTS },
    codeIncline: { name: 'Code incline', control: { type: 'range', min: -20, max: 20, step: 1 } },
    codeSize: { name: 'Code size', control: { type: 'range', min: 0.6, max: 2.5, step: 0.1 } },
  },
} satisfies Meta<SceneArgs>;

export default meta;
type Story = StoryObj<SceneArgs>;

/**
 * One era's final frame, as on the site. The page is neutral (light or dark); the era's own
 * look is inside the devices and on the Contact Me button.
 */
export const Scene: Story = {
  name: 'EraScene',
  render: (args) => (
    <div style={{ height: '100vh' }}>
      <HighlightedEraScene {...args} />
    </div>
  ),
};

/** The right-hand panel on its own, on the page theme. */
export const Panel: Story = {
  name: 'EraPanel',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    codePlacement: { table: { disable: true } },
    codeIncline: { table: { disable: true } },
    codeSize: { table: { disable: true } },
  },
  render: ({ eraId, pageMode }) => {
    // The panel sits on the dark side in split mode.
    const theme = createPageTheme(pageMode === 'light' ? 'light' : 'dark');
    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            minHeight: '100vh',
            padding: 32,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <EraPanel era={byId[eraId]!} />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
