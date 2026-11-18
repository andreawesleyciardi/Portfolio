import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { BrowserFrame } from './BrowserFrame';
import { BROWSERS, BROWSER_BRANDS, BROWSER_VERSIONS, type Browser } from './browsers';
import { DeviceSet } from './DeviceSet';
import { Phone, Tablet } from './Handheld';
import { Monitor } from './Monitor';
import { MONITORS, MONITOR_MODELS, type MonitorModel } from './monitors';
import { Screen } from './Screen';

/** Stand-in content that shows the screen's virtual width. */
function TestCard({ width }: { width: number }) {
  return (
    <div
      style={{
        height: '100%',
        padding: 16,
        background: '#f0f4f8',
        color: '#123',
        fontFamily: 'sans-serif',
      }}
    >
      <strong>{width}px wide</strong>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 8,
          marginTop: 12,
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ height: 60, background: '#c8d6e5' }} />
        ))}
      </div>
    </div>
  );
}

const screen = (width: number): ReactNode => (
  <Screen virtualWidth={width}>
    <TestCard width={width} />
  </Screen>
);

const meta = {
  title: 'Devices',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

export const MonitorModels: StoryObj<{ model: MonitorModel }> = {
  name: 'Monitor',
  args: { model: 'lcd-2006' },
  argTypes: {
    model: {
      control: 'select',
      options: MONITORS,
      labels: Object.fromEntries(MONITORS.map((id) => [id, MONITOR_MODELS[id].name])),
    },
  },
  render: ({ model }) => (
    <div style={{ width: 640 }}>
      <Monitor model={model}>{screen(1024)}</Monitor>
    </div>
  ),
};

/** Every monitor design, in order: what the desk looked like from 2006 to today. */
export const MonitorTimeline: StoryObj = {
  name: 'Monitor timeline',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 32 }}>
      {[...MONITORS]
        .sort((a, b) => MONITOR_MODELS[a].year - MONITOR_MODELS[b].year)
        .map((id) => (
          <figure key={id} style={{ margin: 0, width: 340 }}>
            <Monitor model={id}>{screen(1280)}</Monitor>
            <figcaption style={{ marginTop: 6, fontFamily: 'sans-serif', fontSize: 13 }}>
              {MONITOR_MODELS[id].name} · {MONITOR_MODELS[id].year}
            </figcaption>
          </figure>
        ))}
    </div>
  ),
};

export const Browsers: StoryObj<{ browser: Browser; mode: 'light' | 'dark'; url: string }> = {
  name: 'BrowserFrame',
  args: { browser: 'ie7', mode: 'light', url: 'http://www.example.com/' },
  argTypes: {
    browser: {
      control: 'select',
      options: BROWSERS,
      labels: Object.fromEntries(BROWSERS.map((id) => [id, BROWSER_VERSIONS[id].name])),
    },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
  },
  render: ({ browser, mode, url }) => (
    <div style={{ width: 720, aspectRatio: '4 / 3' }}>
      <Screen virtualWidth={1024}>
        <BrowserFrame browser={browser} url={url} mode={mode}>
          <TestCard width={1024} />
        </BrowserFrame>
      </Screen>
    </div>
  ),
};

/** Every browser version, by brand and year. Versions from 2018 on also have a dark theme. */
export const BrowserTimeline: StoryObj<{ mode: 'light' | 'dark' }> = {
  name: 'Browser timeline',
  args: { mode: 'light' },
  argTypes: { mode: { control: 'inline-radio', options: ['light', 'dark'] } },
  render: ({ mode }) => (
    <div style={{ display: 'grid', gap: 32 }}>
      {BROWSER_BRANDS.map((brand) => (
        <div key={brand} style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {BROWSERS.filter((id) => BROWSER_VERSIONS[id].brand === brand)
            .sort((a, b) => BROWSER_VERSIONS[a].year - BROWSER_VERSIONS[b].year)
            .map((id) => (
              <figure key={id} style={{ margin: 0, flex: '0 0 300px' }}>
                <div style={{ aspectRatio: '16 / 10' }}>
                  <Screen virtualWidth={1024}>
                    <BrowserFrame browser={id} url="http://www.example.com/" mode={mode}>
                      <TestCard width={1024} />
                    </BrowserFrame>
                  </Screen>
                </div>
                <figcaption style={{ marginTop: 6, fontFamily: 'sans-serif', fontSize: 13 }}>
                  {BROWSER_VERSIONS[id].name} · {BROWSER_VERSIONS[id].year}
                </figcaption>
              </figure>
            ))}
        </div>
      ))}
    </div>
  ),
};

export const Handhelds: StoryObj<{ generation: 'classic' | 'modern' }> = {
  name: 'Phone and Tablet',
  args: { generation: 'classic' },
  argTypes: { generation: { control: 'inline-radio', options: ['classic', 'modern'] } },
  render: ({ generation }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
      <div style={{ width: 300 }}>
        <Tablet generation={generation}>{screen(768)}</Tablet>
      </div>
      <div style={{ width: 150 }}>
        <Phone generation={generation}>{screen(320)}</Phone>
      </div>
    </div>
  ),
};

export const FullSet: StoryObj = {
  name: 'DeviceSet',
  render: () => (
    <div style={{ width: 800, padding: '0 40px' }}>
      <DeviceSet
        monitor={
          <Monitor model="widescreen-2009">
            <Screen virtualWidth={1280}>
              <BrowserFrame browser="firefox-2011" url="http://www.example.com/">
                <TestCard width={1280} />
              </BrowserFrame>
            </Screen>
          </Monitor>
        }
        tablet={<Tablet generation="classic">{screen(768)}</Tablet>}
        phone={<Phone generation="classic">{screen(320)}</Phone>}
      />
    </div>
  ),
};
