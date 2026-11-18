import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline, type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  { id: 'y2008', label: '2008–2009' },
  { id: 'y2010', label: '2010–2011' },
  { id: 'y2012', label: '2012–2013' },
  { id: 'y2014', label: '2014–2016' },
];

const colors = ['#dbe8f8', '#f5f5f5', '#1abc9c', '#3f51b5'];

const meta = {
  title: 'Timeline',
  component: Timeline,
  parameters: { layout: 'fullscreen' },
  args: {
    items,
    renderItem: (item: TimelineItem, index: number) => (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
          minHeight: 'inherit',
          background: colors[index],
          fontSize: 48,
          fontFamily: 'sans-serif',
        }}
      >
        {item.label}
      </div>
    ),
  },
  argTypes: { mode: { control: 'inline-radio', options: ['auto', 'scroll', 'slider'] } },
} satisfies Meta<typeof Timeline<TimelineItem>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop: each era stays pinned while you scroll through it. */
export const Scroll: Story = { args: { mode: 'scroll' } };

/** Mobile: one era per slide, with arrows and swipe. */
export const Slider: Story = { args: { mode: 'slider' } };

/** Switches between the two with the viewport width. Resize the window to try it. */
export const Auto: Story = { args: { mode: 'auto' } };
