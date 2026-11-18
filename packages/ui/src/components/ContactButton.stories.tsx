import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { ContactButton } from './ContactButton';
import { ERA_STYLES, ERA_STYLE_LABELS } from '../eraStyles';
import { createEraTheme } from '../theme/createEraTheme';

const meta = {
  title: 'Library/ContactButton',
  component: ContactButton,
  args: { href: '#contact' },
} satisfies Meta<typeof ContactButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uses the era picked in the toolbar. */
export const Default: Story = {};

/** The same button in every era, side by side. */
export const AcrossEras: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <Stack spacing={1}>
      {ERA_STYLES.map((style) => {
        const theme = createEraTheme(style);
        return (
          <ThemeProvider key={style} theme={theme}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.default',
                color: 'text.primary',
              }}
            >
              <Typography sx={{ width: 160 }}>{ERA_STYLE_LABELS[style]}</Typography>
              <ContactButton {...args} />
            </Stack>
          </ThemeProvider>
        );
      })}
    </Stack>
  ),
};
