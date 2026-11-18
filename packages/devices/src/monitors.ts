/**
 * Desktop monitor designs from the late 2000s to today: generic models (no brands), each with
 * the traits that date it. Placeholder fidelity, to be refined into detailed replicas later.
 */

export type MonitorRatio = '4/3' | '5/4' | '16/10' | '16/9' | '21/9';
export const MONITOR_RATIOS: readonly MonitorRatio[] = ['4/3', '5/4', '16/10', '16/9', '21/9'];

export interface MonitorSpec {
  /** Shown in Storybook. */
  name: string;
  year: number;
  ratio: MonitorRatio;
  bezel: {
    /** Any CSS background. */
    color: string;
    /** Thickness as a percentage of the monitor width. */
    top: number;
    side: number;
    /** The bottom bezel, or "chin". */
    bottom: number;
    radius: number;
    /** Piano-black reflection across the frame. */
    glossy?: boolean;
  };
  /** Power light on the chin. */
  led?: string;
  /** Darker screen edges suggesting a curved panel. */
  curved?: boolean;
  stand: {
    shape: 'block' | 'round' | 'slim' | 'legs';
    color: string;
    /** Accent color (gaming monitors). */
    accent?: string;
  };
}

export const MONITOR_MODELS = {
  'lcd-2006': {
    name: 'Silver LCD, 4:3',
    year: 2006,
    ratio: '4/3',
    bezel: {
      color: 'linear-gradient(to bottom, #d5d5d1, #b4b4b0)',
      top: 4,
      side: 4,
      bottom: 6.5,
      radius: 8,
    },
    led: '#7cd36b',
    stand: { shape: 'block', color: 'linear-gradient(to bottom, #bdbdb9, #9d9d99)' },
  },
  'widescreen-2009': {
    name: 'Piano-black widescreen, 16:10',
    year: 2009,
    ratio: '16/10',
    bezel: { color: '#0d0d0f', top: 3.2, side: 3.2, bottom: 5, radius: 10, glossy: true },
    led: '#3d8bff',
    stand: { shape: 'round', color: 'radial-gradient(ellipse at 50% 30%, #3a3a3e, #0d0d0f 70%)' },
  },
  'hd-2012': {
    name: 'Matte black Full HD, 16:9',
    year: 2012,
    ratio: '16/9',
    bezel: { color: '#1c1c1e', top: 2.2, side: 2.2, bottom: 3.4, radius: 4 },
    led: '#ffffff',
    stand: { shape: 'block', color: '#1c1c1e' },
  },
  'slim-2015': {
    name: 'Slim bezel with aluminum chin, 16:9',
    year: 2015,
    ratio: '16/9',
    bezel: {
      color: 'linear-gradient(to bottom, #111 0 94%, #c9ccd1 94%)',
      top: 1.6,
      side: 1.6,
      bottom: 5.5,
      radius: 6,
    },
    stand: { shape: 'slim', color: 'linear-gradient(to right, #b7bac0, #e3e5e8, #b7bac0)' },
  },
  'frameless-2018': {
    name: 'Three-side frameless, 16:9',
    year: 2018,
    ratio: '16/9',
    bezel: { color: '#141416', top: 0.6, side: 0.6, bottom: 2.4, radius: 4 },
    led: '#ffffff',
    stand: { shape: 'slim', color: 'linear-gradient(to right, #26262a, #3a3a40, #26262a)' },
  },
  'ultrawide-2020': {
    name: 'Curved gaming ultrawide, 21:9',
    year: 2020,
    ratio: '21/9',
    bezel: { color: '#0b0b0d', top: 0.5, side: 0.5, bottom: 1.4, radius: 6 },
    curved: true,
    led: '#ff3b3b',
    stand: { shape: 'legs', color: '#1a1a1d', accent: '#ff3b3b' },
  },
  'studio-2024': {
    name: 'Thin uniform bezel, silver stand, 21:9',
    year: 2024,
    ratio: '21/9',
    bezel: { color: '#1d1d1f', top: 0.8, side: 0.8, bottom: 0.8, radius: 10 },
    stand: { shape: 'slim', color: 'linear-gradient(to right, #c4c6ca, #eceef1, #c4c6ca)' },
  },
} as const satisfies Record<string, MonitorSpec>;

export type MonitorModel = keyof typeof MONITOR_MODELS;
export const MONITORS = Object.keys(MONITOR_MODELS) as MonitorModel[];

export function getMonitorSpec(model: MonitorModel): MonitorSpec {
  return MONITOR_MODELS[model];
}
