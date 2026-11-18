import type { CSSProperties, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { getBrowserSpec, type Browser, type BrowserSpec } from './browsers';

export interface BrowserFrameProps {
  browser: Browser;
  /** Address shown in the address bar. */
  url: string;
  /** Title of the open tab. */
  tabTitle?: string;
  /** Uses the browser's dark theme, where it had one (2018 on). */
  mode?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
}

// Sizes in real CSS pixels: the frame is meant to sit inside a `Screen`, which renders at the
// device's real resolution, so the browser is to scale with the site.
const Frame = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  fontFamily: 'system-ui, "Segoe UI", Tahoma, sans-serif',
  fontSize: 12,
});

const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '0 8px',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

const Viewport = styled('div')({
  flex: 1,
  minHeight: 0,
  position: 'relative',
  overflow: 'hidden',
  background: '#fff',
});

function WindowButtons({ spec }: { spec: BrowserSpec }) {
  if (spec.windowControls === 'mac') {
    return (
      <span style={{ display: 'inline-flex', gap: 6, marginRight: 6 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
          <span
            key={color}
            style={{ width: 11, height: 11, borderRadius: '50%', background: color }}
          />
        ))}
      </span>
    );
  }
  return <span style={{ marginLeft: 'auto', letterSpacing: 10, opacity: 0.8 }}>–▢✕</span>;
}

function NavButtons({ spec, colors }: { spec: BrowserSpec; colors: BrowserSpec['light'] }) {
  if (spec.navButtons === 'glossy') {
    const bubble: CSSProperties = {
      display: 'inline-grid',
      placeItems: 'center',
      width: 24,
      height: 24,
      borderRadius: '50%',
      color: '#fff',
      fontSize: 11,
      background: 'radial-gradient(circle at 50% 30%, #8fc1f5, #2d6fc2 70%)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.3)',
    };
    return (
      <span style={{ display: 'inline-flex', gap: 3 }}>
        <span style={{ ...bubble, width: 28, height: 28 }}>◀</span>
        <span style={bubble}>▶</span>
      </span>
    );
  }
  return (
    <span
      style={{ display: 'inline-flex', gap: 12, fontSize: 15, color: colors.text, opacity: 0.75 }}
    >
      <span>←</span>
      <span>→</span>
      <span>⟳</span>
    </span>
  );
}

const tabRadius: Record<BrowserSpec['tabShape'], string> = {
  square: '0',
  trapezoid: '6px 6px 0 0',
  rounded: '8px 8px 0 0',
  pill: '6px',
};

function Tab({
  spec,
  colors,
  title,
}: {
  spec: BrowserSpec;
  colors: BrowserSpec['light'];
  title: string;
}) {
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    minWidth: 120,
    maxWidth: 200,
    height: spec.tabShape === 'pill' ? 26 : '100%',
    padding: '0 12px',
    borderRadius: tabRadius[spec.tabShape],
    background: colors.activeTab,
    color: colors.text,
    border: spec.tabShape === 'pill' ? 'none' : `1px solid ${colors.border}`,
    borderBottom: spec.tabs === 'top' ? 'none' : undefined,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // Slanted tab sides, Chrome and Australis style.
    clipPath:
      spec.tabShape === 'trapezoid'
        ? 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)'
        : undefined,
    boxShadow: spec.tabShape === 'pill' ? '0 1px 3px rgba(0,0,0,0.15)' : undefined,
  };
  return (
    <span style={style}>
      <span
        style={{ width: 12, height: 12, borderRadius: 2, background: '#7aa7e0', flexShrink: 0 }}
      />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
    </span>
  );
}

/**
 * A browser window replica from a given year, wrapping the era's website.
 * Decorative: the browser's controls are hidden from assistive technology.
 */
export function BrowserFrame({
  browser,
  url,
  tabTitle = 'Welcome',
  mode = 'light',
  children,
  className,
}: BrowserFrameProps) {
  const spec = getBrowserSpec(browser);
  const colors = (mode === 'dark' && spec.dark) || spec.light;
  const glass: CSSProperties = spec.glass ? { backdropFilter: 'blur(20px) saturate(180%)' } : {};
  const tabRowControls = !spec.titleBar && spec.tabs === 'top';
  const toolbarControls = !spec.titleBar && spec.tabs !== 'top';

  const address = (
    <span
      style={{
        flex: 1,
        minWidth: 0,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: spec.addressAlign === 'center' ? 'center' : 'flex-start',
        padding: '0 10px',
        borderRadius: spec.addressRadius,
        background: colors.address,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {url}
    </span>
  );

  return (
    <Frame
      className={className}
      data-browser={browser}
      style={{ borderRadius: spec.windowRadius, border: `1px solid ${colors.border}` }}
    >
      <div
        aria-hidden="true"
        style={{ display: 'flex', flexDirection: 'column', color: colors.text }}
      >
        {spec.titleBar && (
          <Row
            style={{
              height: 26,
              background: colors.frame,
              color: spec.titleBarText ?? colors.text,
              fontWeight: 600,
            }}
          >
            {spec.windowControls === 'mac' && <WindowButtons spec={spec} />}
            <span
              style={{ flex: spec.windowControls === 'mac' ? 1 : undefined, textAlign: 'center' }}
            >
              {tabTitle} - {spec.titleBar}
            </span>
            {spec.windowControls === 'windows' && <WindowButtons spec={spec} />}
          </Row>
        )}

        {spec.menuBar && (
          <Row style={{ height: 22, gap: 14, background: colors.toolbar }}>
            {spec.menuBar.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </Row>
        )}

        {spec.tabs === 'top' && (
          <Row
            style={{
              height: 34,
              alignItems: 'flex-end',
              paddingTop: 6,
              background: colors.frame,
              ...glass,
            }}
          >
            {tabRowControls && spec.windowControls === 'mac' && <WindowButtons spec={spec} />}
            {spec.appButton && (
              <span
                style={{
                  alignSelf: 'flex-start',
                  marginTop: -6,
                  padding: '3px 12px',
                  borderRadius: '0 0 4px 4px',
                  background: spec.appButton.color,
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                {spec.appButton.label} ▾
              </span>
            )}
            <Tab spec={spec} colors={colors} title={tabTitle} />
            <span style={{ alignSelf: 'center', opacity: 0.6, fontSize: 14 }}>+</span>
            {tabRowControls && spec.windowControls === 'windows' && <WindowButtons spec={spec} />}
          </Row>
        )}

        <Row style={{ height: 38, gap: 10, background: colors.toolbar, ...glass }}>
          {toolbarControls && spec.windowControls === 'mac' && <WindowButtons spec={spec} />}
          <NavButtons spec={spec} colors={colors} />
          {spec.tabs === 'inline' ? (
            <>
              {address}
              <Tab spec={spec} colors={colors} title={tabTitle} />
            </>
          ) : (
            address
          )}
          {toolbarControls && spec.windowControls === 'windows' && <WindowButtons spec={spec} />}
        </Row>

        {spec.tabs === 'below' && (
          <Row
            style={{
              height: 28,
              alignItems: 'flex-end',
              background: colors.toolbar,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <Tab spec={spec} colors={colors} title={tabTitle} />
          </Row>
        )}
      </div>
      <Viewport>{children}</Viewport>
    </Frame>
  );
}
