import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TechStack, TECH_STACK_VARIANTS } from './TechStack';

const meta = {
  title: 'Library/TechStack',
  component: TechStack,
  args: { variant: 'icons' },
  argTypes: { variant: { control: 'inline-radio', options: TECH_STACK_VARIANTS } },
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Era2008: Story = {
  args: { items: ['HTML', 'CSS', 'jQuery', 'ASP.NET', 'PHP', 'MySQL'] },
};

export const Today: Story = {
  args: {
    items: ['React', 'TypeScript', 'TanStack', 'Zod', 'OpenAPI', 'Storybook', 'GitHub Copilot'],
  },
};

/** Technologies without a logo in Simple Icons get a lettered badge in the same style. */
export const Fallbacks: Story = {
  args: { items: ['AngularJS', 'SharePoint', 'Kendo UI', 'JavascriptMVC'] },
};

/** The three display options side by side. */
export const AllVariants: Story = {
  args: { items: ['HTML5', 'CSS3', 'jQuery', 'AngularJS', 'React', 'Next.js', 'TypeScript'] },
  render: (args) => (
    <Stack spacing={3}>
      {TECH_STACK_VARIANTS.map((variant) => (
        <Stack key={variant} spacing={1}>
          <Typography variant="overline">{variant}</Typography>
          <TechStack {...args} variant={variant} />
        </Stack>
      ))}
    </Stack>
  ),
};
