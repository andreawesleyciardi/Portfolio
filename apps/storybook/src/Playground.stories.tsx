import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import { CODE_PLACEMENTS, type CodePlacement, type HighlightedCode } from '@portfolio/backdrop';
import { highlightCode } from '@portfolio/backdrop/highlight';
import { MONITOR_RATIOS } from '@portfolio/devices';
import { eras, type Era } from '@portfolio/eras';
import { EraScene, SCENE_PAGE_MODES, type ScenePageMode } from '@portfolio/scene';
import { Timeline, type TimelineMode } from '@portfolio/timeline';

// Every attribute of every component in one place. Device and style attributes default to
// "auto", which keeps the selected era's own value; pick anything else to override it.

const AUTO = 'auto';
type Auto = typeof AUTO;
type Handheld = Auto | 'none' | 'classic' | 'modern';

interface PlaygroundArgs {
  // Era
  eraId: string;
  // Page
  pageMode: ScenePageMode;
  panelGlow: boolean;
  // Devices
  monitorRatio: Auto | (typeof MONITOR_RATIOS)[number];
  monitorWidth: Auto | '1024' | '1280' | '1366' | '1440' | '1920' | '2560';
  devicesMaxHeight: number;
  tablet: Handheld;
  phone: Handheld;
  // Code
  codePlacement: CodePlacement;
  codeIncline: number;
  codeSize: number;
  codeOpacity: number;
  codeFade: boolean;
}

interface TimelineArgs extends PlaygroundArgs {
  mode: TimelineMode;
  scrollLength: string;
}

const byId = Object.fromEntries(eras.map((era) => [era.id, era])) as Record<string, Era>;

const HANDHELD_WIDTHS = {
  tablet: { classic: 768, modern: 834 },
  phone: { classic: 320, modern: 390 },
} as const;

function overrideHandheld(
  kind: 'tablet' | 'phone',
  choice: Handheld,
  current: Era['devices']['tablet'],
): Era['devices']['tablet'] {
  if (choice === AUTO) return current;
  if (choice === 'none') return undefined;
  return { generation: choice, virtualWidth: HANDHELD_WIDTHS[kind][choice] };
}

/** The era with the overrides from the controls applied. */
function applyOverrides(era: Era, args: PlaygroundArgs): Era {
  const { devices } = era;
  return {
    ...era,
    devices: {
      monitor: {
        ratio: args.monitorRatio === AUTO ? undefined : args.monitorRatio,
        model: devices.monitor.model,
        virtualWidth:
          args.monitorWidth === AUTO ? devices.monitor.virtualWidth : Number(args.monitorWidth),
      },
      browserBrand: devices.browserBrand,
      tablet: overrideHandheld('tablet', args.tablet, devices.tablet),
      phone: overrideHandheld('phone', args.phone, devices.phone),
    },
  };
}

function sceneProps(args: PlaygroundArgs) {
  return {
    pageMode: args.pageMode,
    devicesMaxHeight: `${args.devicesMaxHeight}svh`,
    panelGlow: args.panelGlow,
    codePlacement: args.codePlacement,
    codeIncline: args.codeIncline,
    codeSize: args.codeSize,
    codeOpacity: args.codeOpacity,
    codeFade: args.codeFade,
  };
}

const withAuto = <T extends string>(options: readonly T[]) => [AUTO, ...options];
const range = (min: number, max: number, step: number) => ({
  control: { type: 'range' as const, min, max, step },
});

const argTypes = {
  eraId: {
    name: 'Era',
    control: 'select',
    options: eras.map((era) => era.id),
    table: { category: 'Era' },
  },
  pageMode: {
    name: 'Page mode',
    control: 'inline-radio',
    options: SCENE_PAGE_MODES,
    table: { category: 'Page' },
  },
  panelGlow: { name: 'Panel text glow', control: 'boolean', table: { category: 'Page' } },
  monitorRatio: {
    name: 'Monitor ratio',
    control: 'select',
    options: withAuto(MONITOR_RATIOS),
    table: { category: 'Devices' },
  },
  monitorWidth: {
    name: 'Monitor resolution (px)',
    control: 'select',
    options: [AUTO, '1024', '1280', '1366', '1440', '1920', '2560'],
    table: { category: 'Devices' },
  },
  devicesMaxHeight: {
    name: 'Devices max height (% of screen height)',
    ...range(30, 90, 1),
    table: { category: 'Devices' },
  },
  tablet: {
    name: 'Tablet',
    control: 'inline-radio',
    options: [AUTO, 'none', 'classic', 'modern'],
    table: { category: 'Devices' },
  },
  phone: {
    name: 'Phone',
    control: 'inline-radio',
    options: [AUTO, 'none', 'classic', 'modern'],
    table: { category: 'Devices' },
  },
  codePlacement: {
    name: 'Placement',
    control: 'select',
    options: CODE_PLACEMENTS,
    table: { category: 'Code' },
  },
  codeIncline: { name: 'Incline (°)', ...range(-20, 20, 1), table: { category: 'Code' } },
  codeSize: { name: 'Size (rem)', ...range(0.6, 2.5, 0.1), table: { category: 'Code' } },
  codeOpacity: { name: 'Opacity', ...range(0, 1, 0.05), table: { category: 'Code' } },
  codeFade: { name: 'Fade edges', control: 'boolean', table: { category: 'Code' } },
} as const;

const defaultArgs: PlaygroundArgs = {
  eraId: eras[0]!.id,
  pageMode: 'split',
  panelGlow: true,
  monitorRatio: AUTO,
  monitorWidth: AUTO,
  devicesMaxHeight: 52,
  tablet: AUTO,
  phone: AUTO,
  codePlacement: 'right',
  codeIncline: -6,
  codeSize: 1.2,
  codeOpacity: 0.25,
  codeFade: true,
};

const meta = {
  title: 'Playground',
  parameters: { layout: 'fullscreen', controls: { expanded: true, sort: 'none' } },
  argTypes,
  args: defaultArgs,
} satisfies Meta<PlaygroundArgs>;

export default meta;

function PlaygroundScene(args: PlaygroundArgs) {
  const era = byId[args.eraId]!;
  const highlighted = useMemo(() => highlightCode(era.code.snippet, era.code.language), [era]);
  return (
    <EraScene
      era={applyOverrides(era, args)}
      contactHref="#contact"
      highlightedCode={highlighted}
      {...sceneProps(args)}
    />
  );
}

/** One era, with every attribute adjustable. "auto" keeps the era's own value. */
export const Scene: StoryObj<PlaygroundArgs> = {
  name: 'One era',
  render: (args) => (
    <div style={{ height: '100vh' }}>
      <PlaygroundScene {...args} />
    </div>
  ),
};

function PlaygroundTimeline(args: TimelineArgs) {
  const highlighted = useMemo(
    () =>
      Object.fromEntries(
        eras.map((era) => [era.id, highlightCode(era.code.snippet, era.code.language)]),
      ) as Record<string, HighlightedCode>,
    [],
  );
  const items = eras.map((era) => ({ ...era, label: `${era.years[0]}–${era.years[1]}` }));
  return (
    <Timeline
      mode={args.mode}
      scrollLength={args.scrollLength}
      label="Frontend development from 2008 to today"
      items={items}
      renderItem={(era) => (
        <EraScene
          era={applyOverrides(era, args)}
          contactHref="#contact"
          highlightedCode={highlighted[era.id]}
          {...sceneProps(args)}
        />
      )}
    />
  );
}

/**
 * The whole timeline, as on the site. Page, devices and code settings apply to every era
 * ("auto" keeps each era's own values). The Era control is not used here.
 */
export const FullTimeline: StoryObj<TimelineArgs> = {
  name: 'Full timeline',
  args: { mode: 'auto', scrollLength: '200vh' },
  argTypes: {
    mode: {
      name: 'Mode',
      control: 'inline-radio',
      options: ['auto', 'scroll', 'slider'],
      table: { category: 'Timeline' },
    },
    scrollLength: {
      name: 'Scroll length per era',
      control: 'inline-radio',
      options: ['100vh', '150vh', '200vh', '300vh'],
      table: { category: 'Timeline' },
    },
    eraId: { table: { disable: true } },
  },
  render: (args) => <PlaygroundTimeline {...args} />,
};
