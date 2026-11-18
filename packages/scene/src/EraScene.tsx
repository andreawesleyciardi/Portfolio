'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import {
  ContactButton,
  createEraTheme,
  createPageTheme,
  type PageMode,
  type TechStackVariant,
} from '@portfolio/ui';
import {
  BrowserFrame,
  DeviceSet,
  Monitor,
  Phone,
  Screen,
  Tablet,
  getMonitorSpec,
} from '@portfolio/devices';
import {
  Backdrop,
  CodeLayer,
  YearImage,
  type CodePlacement,
  type HighlightedCode,
} from '@portfolio/backdrop';
import { eraBrowser, type Era } from '@portfolio/eras';
import { EraPanel } from './EraPanel';
import { MiniSite } from './MiniSite';

export interface EraSceneProps {
  era: Era;
  /** Target of the Contact Me button. */
  contactHref: string;
  /** The era's code with VS Code colors, prepared at build time (`highlightCode`). */
  highlightedCode?: HighlightedCode;
  /** Where the background code sits. */
  codePlacement?: CodePlacement;
  /** Rotation of the background code, in degrees. */
  codeIncline?: number;
  /** Size of the background code, in rem. */
  codeSize?: number;
  /** Opacity of the background code, 0–1. */
  codeOpacity?: number;
  /** Fades the background code out toward its edges. */
  codeFade?: boolean;
  /** Glow around the panel text. */
  panelGlow?: boolean;
  /** How the tech stack is shown: logos, tags, or both. */
  techStackVariant?: TechStackVariant;
  /**
   * The page around the devices: light, dark, or split (light behind the devices, dark behind
   * the text, for readability). The era's own look stays inside the devices.
   */
  pageMode?: ScenePageMode;
  /**
   * Maximum height of the devices (any CSS length). Keeps tall monitors (4:3) from growing
   * bigger than the wide ones and pushing the layout around.
   */
  devicesMaxHeight?: string;
}

export type ScenePageMode = PageMode | 'split';
export const SCENE_PAGE_MODES: readonly ScenePageMode[] = ['split', 'light', 'dark'];

// DeviceSet geometry: the monitor is 86% of the set's width, the set adds 8% of its width
// below for the handhelds, and the stand is about 40px tall.
const MONITOR_SHARE = 0.86;
const HANDHELD_ROOM = 0.08;
const STAND_HEIGHT = '40px';

/** Width of the device set: as wide as the column allows, but no taller than `maxHeight`. */
function devicesWidth(ratio: string, maxHeight: string) {
  const [w = 16, h = 9] = ratio.split('/').map(Number);
  const heightPerWidth = MONITOR_SHARE / (w / h) + HANDHELD_ROOM;
  return `min(100%, calc((${maxHeight} - ${STAND_HEIGHT}) / ${heightPerWidth.toFixed(4)}))`;
}

// The iPhone's default viewport: how phones showed non-responsive sites, zoomed out.
const DESKTOP_SITE_ON_HANDHELD = 980;

const Scene = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  minHeight: 'inherit',
  overflow: 'hidden',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  containerType: 'inline-size',
}));

// The text side's background in split mode. Positioned from the measured layout: a vertical
// split between the columns on wide screens, a horizontal one above the panel on small ones.
const TextSideBackground = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 0,
  right: 0,
  bottom: 0,
  // Before measuring: the gap between the 3fr / 2fr columns.
  top: 0,
  left: '58.8cqw',
  background: theme.palette.background.default,
}));

type Split = { axis: 'x' | 'y'; offset: number } | undefined;

/** Measures where the devices end and the panel begins, so the split falls between them. */
function useSplit(enabled: boolean) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState<Split>();

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!enabled || !scene) return;
    const measure = () => {
      const devices = devicesRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!devices || !panel) return;
      const box = scene.getBoundingClientRect();
      const sideBySide = panel.left >= devices.right;
      // Side by side: half a grid gap (4cqw) before the text column, so the line stays in the
      // same place in every era, whatever the size of the devices.
      setSplit(
        sideBySide
          ? { axis: 'x', offset: panel.left - box.left - box.width * 0.02 }
          : { axis: 'y', offset: (devices.bottom + panel.top) / 2 - box.top },
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    if (panelRef.current) observer.observe(panelRef.current);
    measure();
    return () => observer.disconnect();
  }, [enabled]);

  const style: CSSProperties | undefined =
    split?.axis === 'x'
      ? { left: split.offset, top: 0 }
      : split?.axis === 'y'
        ? { left: 0, top: split.offset }
        : undefined;

  return { sceneRef, devicesRef, panelRef, style };
}

const Layout = styled('div')({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
  alignItems: 'center',
  gap: '4cqw',
  height: '100%',
  padding: '96px 4cqw 48px',
  '@container (max-width: 899.95px)': {
    gridTemplateColumns: '1fr',
    alignContent: 'start',
    padding: '80px 16px 96px',
  },
});

/**
 * One era's final frame: devices with the mini-site, the era panel with Contact Me,
 * and the decorative background. Fully rendered on its own, with no animation needed.
 *
 * Two themes: the page uses the neutral page theme (light, dark or split); the era theme
 * applies only to what evolves, the sites inside the devices and the Contact Me button.
 */
export function EraScene({
  era,
  contactHref,
  highlightedCode,
  codePlacement,
  codeIncline,
  codeSize,
  codeOpacity,
  codeFade,
  panelGlow,
  techStackVariant,
  pageMode = 'split',
  devicesMaxHeight = '52svh',
}: EraSceneProps) {
  const isSplit = pageMode === 'split';
  // Split: light behind the devices, dark behind the text and the code.
  const devicesTheme = createPageTheme(isSplit ? 'light' : pageMode);
  const textTheme = createPageTheme(isSplit ? 'dark' : pageMode);
  const { sceneRef, devicesRef, panelRef, style: splitStyle } = useSplit(isSplit);
  const { devices, responsive } = era;
  const eraTheme = createEraTheme(era.style);
  const site = (
    <ThemeProvider theme={eraTheme}>
      <MiniSite name={`Year ${era.years[0]}`} responsive={responsive} />
    </ThemeProvider>
  );
  const handheldWidth = (width: number) => (responsive ? width : DESKTOP_SITE_ON_HANDHELD);

  return (
    <ThemeProvider theme={devicesTheme}>
      <Scene ref={sceneRef} data-era={era.id} data-page-mode={pageMode}>
        <ThemeProvider theme={textTheme}>
          {isSplit && <TextSideBackground aria-hidden="true" style={splitStyle} />}
          <Backdrop
            code={
              <CodeLayer
                code={era.code.snippet}
                language={era.code.language}
                highlighted={highlightedCode}
                placement={codePlacement}
                incline={codeIncline}
                fontSize={codeSize}
                opacity={codeOpacity}
                fade={codeFade}
              />
            }
            image={era.image && <YearImage src={era.image.src} />}
          />
        </ThemeProvider>
        <Layout>
          <div
            ref={devicesRef}
            style={{
              width: devicesWidth(
                devices.monitor.ratio ?? getMonitorSpec(devices.monitor.model).ratio,
                devicesMaxHeight,
              ),
              marginInline: 'auto',
            }}
            role="img"
            aria-label={`A website in the ${era.title} style, on the devices of ${era.years[0]}`}
          >
            <DeviceSet
              monitor={
                <Monitor model={devices.monitor.model} aspectRatio={devices.monitor.ratio}>
                  {/* The browser sits inside the screen, so it is to scale with the site. */}
                  <Screen virtualWidth={devices.monitor.virtualWidth}>
                    <BrowserFrame
                      browser={eraBrowser(era)}
                      url={`http://www.example.com/${era.years[0]}`}
                      tabTitle={`Year ${era.years[0]}`}
                      mode={eraTheme.palette.mode}
                    >
                      {site}
                    </BrowserFrame>
                  </Screen>
                </Monitor>
              }
              tablet={
                devices.tablet && (
                  <Tablet generation={devices.tablet.generation}>
                    <Screen virtualWidth={handheldWidth(devices.tablet.virtualWidth)}>
                      {site}
                    </Screen>
                  </Tablet>
                )
              }
              phone={
                devices.phone && (
                  <Phone generation={devices.phone.generation}>
                    <Screen virtualWidth={handheldWidth(devices.phone.virtualWidth)}>{site}</Screen>
                  </Phone>
                )
              }
            />
          </div>
          <ThemeProvider theme={textTheme}>
            <div ref={panelRef}>
              <EraPanel
                era={era}
                glow={panelGlow}
                techStackVariant={techStackVariant}
                action={
                  <ThemeProvider theme={eraTheme}>
                    <ContactButton href={contactHref} />
                  </ThemeProvider>
                }
              />
            </div>
          </ThemeProvider>
        </Layout>
      </Scene>
    </ThemeProvider>
  );
}
