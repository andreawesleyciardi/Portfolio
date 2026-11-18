/**
 * Browser versions from 2001 to today: the layout and colors that defined each one.
 * Placeholder fidelity: each entry captures the recognizable traits (tab position and shape,
 * menu bar, button style, colors), to be refined into detailed replicas later.
 */

export const BROWSER_BRANDS = ['microsoft', 'firefox', 'chrome', 'safari'] as const;
export type BrowserBrand = (typeof BROWSER_BRANDS)[number];

interface BrowserColors {
  /** Title bar / tab strip. Any CSS background. */
  frame: string;
  toolbar: string;
  activeTab: string;
  text: string;
  address: string;
  border: string;
}

export interface BrowserSpec {
  brand: BrowserBrand;
  /** Shown in the title bar and in Storybook, e.g. "Internet Explorer 7". */
  name: string;
  /** Year this look appeared. */
  year: number;
  /** Text in a separate title bar row (Windows XP / Vista era), if any. */
  titleBar?: string;
  /** Title bar text color, when it differs from the toolbar text (e.g. white on XP blue). */
  titleBarText?: string;
  /** Window buttons: Windows (right) or macOS traffic lights (left). */
  windowControls: 'windows' | 'mac';
  /** Menu bar items, if the menu bar was visible by default. */
  menuBar?: readonly string[];
  /** Where the tabs sit: none, top of the window, below the toolbar, or in the address row. */
  tabs: 'none' | 'top' | 'below' | 'inline';
  tabShape: 'square' | 'trapezoid' | 'rounded' | 'pill';
  /** Glossy round back/forward buttons (2000s) or flat icons. */
  navButtons: 'glossy' | 'flat';
  /** Firefox 4's orange app button. */
  appButton?: { label: string; color: string };
  addressAlign: 'left' | 'center';
  addressRadius: number;
  windowRadius: number;
  /** Translucent, blurred surfaces (Safari 26). */
  glass?: boolean;
  light: BrowserColors;
  /** Browsers with a dark theme (2018 on). */
  dark?: BrowserColors;
}

const WINDOWS_MENU_IE = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];
const WINDOWS_MENU_FF = ['File', 'Edit', 'View', 'History', 'Bookmarks', 'Tools', 'Help'];

export const BROWSER_VERSIONS = {
  ie6: {
    brand: 'microsoft',
    name: 'Internet Explorer 6',
    year: 2001,
    titleBar: 'Microsoft Internet Explorer',
    titleBarText: '#ffffff',
    windowControls: 'windows',
    menuBar: WINDOWS_MENU_IE,
    tabs: 'none',
    tabShape: 'square',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 0,
    windowRadius: 8,
    light: {
      frame: 'linear-gradient(to bottom, #0a5ee8, #0446c8 40%, #0d47c0)',
      toolbar: '#ece9d8',
      activeTab: '#ece9d8',
      text: '#000000',
      address: '#ffffff',
      border: '#7f9db9',
    },
  },
  ie7: {
    brand: 'microsoft',
    name: 'Internet Explorer 7',
    year: 2006,
    titleBar: 'Windows Internet Explorer',
    windowControls: 'windows',
    tabs: 'below',
    tabShape: 'square',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #c4d8f1, #a5c0e5)',
      toolbar: 'linear-gradient(to bottom, #dbe8f8, #c6d9f0)',
      activeTab: '#ffffff',
      text: '#1b2b44',
      address: '#ffffff',
      border: '#7a96bd',
    },
  },
  ie9: {
    brand: 'microsoft',
    name: 'Internet Explorer 9',
    year: 2011,
    windowControls: 'windows',
    tabs: 'inline',
    tabShape: 'square',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 0,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #e2ecf8, #d3e2f4)',
      toolbar: 'linear-gradient(to bottom, #e2ecf8, #d3e2f4)',
      activeTab: '#ffffff',
      text: '#1e1e1e',
      address: '#ffffff',
      border: '#a8bfdc',
    },
  },
  ie11: {
    brand: 'microsoft',
    name: 'Internet Explorer 11',
    year: 2013,
    windowControls: 'windows',
    tabs: 'inline',
    tabShape: 'square',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 0,
    windowRadius: 0,
    light: {
      frame: '#f0f0f0',
      toolbar: '#f0f0f0',
      activeTab: '#ffffff',
      text: '#1e1e1e',
      address: '#ffffff',
      border: '#cccccc',
    },
  },
  'edge-2015': {
    brand: 'microsoft',
    name: 'Microsoft Edge (2015)',
    year: 2015,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'square',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 0,
    windowRadius: 0,
    light: {
      frame: '#e6e6e6',
      toolbar: '#f2f2f2',
      activeTab: '#f2f2f2',
      text: '#1e1e1e',
      address: '#ffffff',
      border: '#d0d0d0',
    },
  },
  'edge-2020': {
    brand: 'microsoft',
    name: 'Microsoft Edge (Chromium)',
    year: 2020,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'rounded',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 4,
    windowRadius: 8,
    light: {
      frame: '#e9e9e9',
      toolbar: '#f7f7f7',
      activeTab: '#f7f7f7',
      text: '#1b1b1b',
      address: '#ffffff',
      border: '#d6d6d6',
    },
    dark: {
      frame: '#202020',
      toolbar: '#3b3b3b',
      activeTab: '#3b3b3b',
      text: '#ffffff',
      address: '#2b2b2b',
      border: '#4a4a4a',
    },
  },
  'firefox-2008': {
    brand: 'firefox',
    name: 'Firefox 3',
    year: 2008,
    titleBar: 'Mozilla Firefox',
    windowControls: 'windows',
    menuBar: WINDOWS_MENU_FF,
    tabs: 'below',
    tabShape: 'square',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #c4d8f1, #a5c0e5)',
      toolbar: 'linear-gradient(to bottom, #f2f2f2, #d9d9d9)',
      activeTab: '#f2f2f2',
      text: '#222222',
      address: '#ffffff',
      border: '#9a9a9a',
    },
  },
  'firefox-2011': {
    brand: 'firefox',
    name: 'Firefox 4',
    year: 2011,
    windowControls: 'windows',
    appButton: { label: 'Firefox', color: 'linear-gradient(to bottom, #f78f1e, #e66000)' },
    tabs: 'top',
    tabShape: 'rounded',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 3,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #c4d8f1, #b4cbe8)',
      toolbar: 'linear-gradient(to bottom, #eef3fa, #dde7f3)',
      activeTab: '#eef3fa',
      text: '#1f2a37',
      address: '#ffffff',
      border: '#93a9c6',
    },
  },
  'firefox-2014': {
    brand: 'firefox',
    name: 'Firefox 29 (Australis)',
    year: 2014,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'trapezoid',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 4,
    light: {
      frame: '#dcdcdc',
      toolbar: '#f5f5f5',
      activeTab: '#f5f5f5',
      text: '#222222',
      address: '#ffffff',
      border: '#bdbdbd',
    },
  },
  'firefox-2017': {
    brand: 'firefox',
    name: 'Firefox Quantum',
    year: 2017,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'square',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 0,
    light: {
      frame: '#e3e4e6',
      toolbar: '#f9f9fa',
      activeTab: '#f9f9fa',
      text: '#0c0c0d',
      address: '#ffffff',
      border: '#cccccc',
    },
    dark: {
      frame: '#0c0c0d',
      toolbar: '#323234',
      activeTab: '#323234',
      text: '#f9f9fa',
      address: '#474749',
      border: '#4a4a4f',
    },
  },
  'firefox-2021': {
    brand: 'firefox',
    name: 'Firefox (Proton)',
    year: 2021,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'pill',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 4,
    windowRadius: 8,
    light: {
      frame: '#f0f0f4',
      toolbar: '#f9f9fb',
      activeTab: '#ffffff',
      text: '#15141a',
      address: '#ffffff',
      border: '#e0e0e6',
    },
    dark: {
      frame: '#1c1b22',
      toolbar: '#2b2a33',
      activeTab: '#42414d',
      text: '#fbfbfe',
      address: '#1c1b22',
      border: '#3a3944',
    },
  },
  'chrome-2008': {
    brand: 'chrome',
    name: 'Google Chrome (2008)',
    year: 2008,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'trapezoid',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 3,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #5b8ed3, #3f75c4)',
      toolbar: 'linear-gradient(to bottom, #f3f7fd, #dbe6f5)',
      activeTab: '#f3f7fd',
      text: '#202124',
      address: '#ffffff',
      border: '#8aa6cf',
    },
  },
  'chrome-2013': {
    brand: 'chrome',
    name: 'Google Chrome (2013)',
    year: 2013,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'trapezoid',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 4,
    light: {
      frame: '#cdd9e8',
      toolbar: '#f2f2f2',
      activeTab: '#f2f2f2',
      text: '#222222',
      address: '#ffffff',
      border: '#b5b5b5',
    },
  },
  'chrome-2016': {
    brand: 'chrome',
    name: 'Google Chrome (2016)',
    year: 2016,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'trapezoid',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 2,
    windowRadius: 0,
    light: {
      frame: '#d6d6d6',
      toolbar: '#f2f2f2',
      activeTab: '#f2f2f2',
      text: '#333333',
      address: '#ffffff',
      border: '#c4c4c4',
    },
  },
  'chrome-2018': {
    brand: 'chrome',
    name: 'Google Chrome (2018 refresh)',
    year: 2018,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'rounded',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 999,
    windowRadius: 8,
    light: {
      frame: '#dee1e6',
      toolbar: '#ffffff',
      activeTab: '#ffffff',
      text: '#202124',
      address: '#f1f3f4',
      border: '#dadce0',
    },
    dark: {
      frame: '#202124',
      toolbar: '#35363a',
      activeTab: '#35363a',
      text: '#e8eaed',
      address: '#202124',
      border: '#3c4043',
    },
  },
  'chrome-2023': {
    brand: 'chrome',
    name: 'Google Chrome (2023 refresh)',
    year: 2023,
    windowControls: 'windows',
    tabs: 'top',
    tabShape: 'rounded',
    navButtons: 'flat',
    addressAlign: 'left',
    addressRadius: 999,
    windowRadius: 10,
    light: {
      frame: '#d3e3fd',
      toolbar: '#ffffff',
      activeTab: '#ffffff',
      text: '#1f1f1f',
      address: '#e9eef6',
      border: '#c7d7f2',
    },
    dark: {
      frame: '#1f1f1f',
      toolbar: '#3c3c3c',
      activeTab: '#3c3c3c',
      text: '#e3e3e3',
      address: '#282828',
      border: '#474747',
    },
  },
  'safari-2008': {
    brand: 'safari',
    name: 'Safari 3',
    year: 2007,
    titleBar: 'Safari',
    windowControls: 'mac',
    tabs: 'below',
    tabShape: 'square',
    navButtons: 'glossy',
    addressAlign: 'left',
    addressRadius: 4,
    windowRadius: 6,
    light: {
      frame: 'linear-gradient(to bottom, #d4d4d4, #b2b2b2)',
      toolbar: 'linear-gradient(to bottom, #b2b2b2, #979797)',
      activeTab: '#d0d0d0',
      text: '#1d1d1d',
      address: '#ffffff',
      border: '#6e6e6e',
    },
  },
  'safari-2014': {
    brand: 'safari',
    name: 'Safari 8',
    year: 2014,
    windowControls: 'mac',
    tabs: 'below',
    tabShape: 'square',
    navButtons: 'flat',
    addressAlign: 'center',
    addressRadius: 4,
    windowRadius: 6,
    light: {
      frame: '#ececec',
      toolbar: '#ececec',
      activeTab: '#f6f6f6',
      text: '#2b2b2b',
      address: '#ffffff',
      border: '#d1d1d1',
    },
  },
  'safari-2021': {
    brand: 'safari',
    name: 'Safari 15',
    year: 2021,
    windowControls: 'mac',
    tabs: 'inline',
    tabShape: 'rounded',
    navButtons: 'flat',
    addressAlign: 'center',
    addressRadius: 8,
    windowRadius: 10,
    light: {
      frame: '#f6f6f6',
      toolbar: '#f6f6f6',
      activeTab: '#ffffff',
      text: '#1d1d1f',
      address: '#e8e8e8',
      border: '#dcdcdc',
    },
    dark: {
      frame: '#2d2d2f',
      toolbar: '#2d2d2f',
      activeTab: '#454547',
      text: '#f5f5f7',
      address: '#3a3a3c',
      border: '#1d1d1f',
    },
  },
  'safari-2025': {
    brand: 'safari',
    name: 'Safari 26',
    year: 2025,
    windowControls: 'mac',
    tabs: 'inline',
    tabShape: 'pill',
    navButtons: 'flat',
    addressAlign: 'center',
    addressRadius: 999,
    windowRadius: 16,
    glass: true,
    light: {
      frame: 'rgba(246, 246, 248, 0.72)',
      toolbar: 'rgba(246, 246, 248, 0.72)',
      activeTab: 'rgba(255, 255, 255, 0.85)',
      text: '#1d1d1f',
      address: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(0, 0, 0, 0.08)',
    },
    dark: {
      frame: 'rgba(40, 40, 44, 0.7)',
      toolbar: 'rgba(40, 40, 44, 0.7)',
      activeTab: 'rgba(90, 90, 96, 0.7)',
      text: '#f5f5f7',
      address: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.12)',
    },
  },
} as const satisfies Record<string, BrowserSpec>;

export type Browser = keyof typeof BROWSER_VERSIONS;
export const BROWSERS = Object.keys(BROWSER_VERSIONS) as Browser[];

export function getBrowserSpec(browser: Browser): BrowserSpec {
  return BROWSER_VERSIONS[browser];
}

/** The latest version of a brand available in a given year (falls back to its first version). */
export function browserForYear(brand: BrowserBrand, year: number): Browser {
  const versions = BROWSERS.filter((id) => BROWSER_VERSIONS[id].brand === brand).sort(
    (a, b) => BROWSER_VERSIONS[a].year - BROWSER_VERSIONS[b].year,
  );
  let match = versions[0]!;
  for (const id of versions) if (BROWSER_VERSIONS[id].year <= year) match = id;
  return match;
}
