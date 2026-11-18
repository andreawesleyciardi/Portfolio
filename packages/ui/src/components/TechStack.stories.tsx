import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechStack } from './TechStack';

const meta = {
  title: 'Library/TechStack',
  component: TechStack,
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Era2008: Story = {
  args: { items: ['HTML', 'CSS', 'jQuery', 'ASP.NET', 'PHP', 'MySQL'] },
};

export const Today: Story = {
  args: { items: ['React', 'TypeScript', 'TanStack', 'Zod', 'OpenAPI', 'Storybook'] },
};
