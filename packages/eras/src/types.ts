import type {
  Browser,
  BrowserBrand,
  HandheldGeneration,
  MonitorModel,
  MonitorRatio,
} from '@portfolio/devices';
import type { EraStyle } from '@portfolio/ui';

export type { Browser, BrowserBrand, HandheldGeneration, MonitorModel, MonitorRatio };

export interface Work {
  company: string;
  role: string;
  /** The business field, in a few words (e.g. "Insurtech: telematics-based car insurance"). */
  field: string;
  /** What I built there, in one or two sentences. */
  summary: string;
  /** Marks a side role running alongside the main job. */
  sideProject?: boolean;
}

export interface Era {
  /** Also the section's anchor (`#web2`). */
  id: string;
  style: EraStyle;
  years: readonly [start: number, end: number];
  title: string;
  /** What frontend looked like then, in a sentence or two. */
  intro: string;
  devices: {
    monitor: {
      /** The typical monitor design of the era: sets the look and the aspect ratio. */
      model: MonitorModel;
      /** Overrides the model's aspect ratio (used by the Storybook Playground). */
      ratio?: MonitorRatio;
      /** Resolution the site is laid out at, in CSS pixels. */
      virtualWidth: number;
    };
    /**
     * The most used browser brand of the era (global desktop share). The version shown is the
     * one current in the era's final year: see `eraBrowser`.
     */
    browserBrand: BrowserBrand;
    tablet?: { generation: HandheldGeneration; virtualWidth: number };
    phone?: { generation: HandheldGeneration; virtualWidth: number };
  };
  /** Before responsive design, phones and tablets show the zoomed-out desktop site. */
  responsive: boolean;
  work: readonly Work[];
  stack: readonly string[];
  trends: readonly string[];
  code: { language: string; snippet: string };
  /** Decorative picture of the period. */
  image?: { src: string };
}
