/**
 * The visual eras of web design covered by the library.
 * Each one has its own MUI theme (see `createEraTheme`).
 */
export const ERA_STYLES = [
  'web2', // 2008–2009: glossy gradients, fixed width
  'responsive', // 2010–2011: fluid grids, Bootstrap
  'flat', // 2012–2013: Metro / iOS 7 flat
  'material', // 2014–2016: Material Design, cards
  'systems', // 2017–2019: CSS Grid, design systems
  'utility', // 2020–2022: utility-first, dark mode, glassmorphism
  'platform', // 2023–2026: native platform features, glass
] as const;

export type EraStyle = (typeof ERA_STYLES)[number];

export const ERA_STYLE_LABELS: Record<EraStyle, string> = {
  web2: 'Web 2.0',
  responsive: 'Responsive dawn',
  flat: 'Flat design',
  material: 'Material',
  systems: 'Design systems',
  utility: 'Utility-first',
  platform: 'Platform & AI',
};
