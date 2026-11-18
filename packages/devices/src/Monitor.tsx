import type { CSSProperties, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { getMonitorSpec, type MonitorModel, type MonitorRatio, type MonitorSpec } from './monitors';

export interface MonitorProps {
  /** The monitor design (bezel, chin, stand) of the time. */
  model: MonitorModel;
  /** Overrides the model's own aspect ratio. */
  aspectRatio?: MonitorRatio;
  children: ReactNode;
  className?: string;
}

const Body = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const Panel = styled('div')({
  position: 'relative',
  width: '100%',
  boxShadow: '0 14px 32px rgba(0, 0, 0, 0.35)',
  // Shape and bezel animate when the era changes.
  transition: 'aspect-ratio 600ms ease, padding 600ms ease, border-radius 600ms ease',
});

const Glass = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: '#000',
});

function Stand({ stand }: { stand: MonitorSpec['stand'] }) {
  const neck: CSSProperties = { background: stand.color };
  switch (stand.shape) {
    case 'block':
      return (
        <>
          <div style={{ ...neck, width: '11%', height: 26 }} />
          <div style={{ ...neck, width: '30%', height: 12, borderRadius: 3 }} />
        </>
      );
    case 'round':
      return (
        <>
          <div style={{ ...neck, width: '7%', height: 30 }} />
          <div style={{ ...neck, width: '28%', height: 16, borderRadius: '50%' }} />
        </>
      );
    case 'slim':
      return (
        <>
          <div style={{ ...neck, width: '13%', height: 38 }} />
          <div style={{ ...neck, width: '24%', height: 6, borderRadius: 3 }} />
        </>
      );
    case 'legs':
      return (
        <>
          <div style={{ ...neck, width: '5%', height: 34 }} />
          <div
            style={{
              width: '46%',
              height: 14,
              background: stand.color,
              clipPath: 'polygon(0 100%, 46% 0, 54% 0, 100% 100%, 90% 100%, 50% 25%, 10% 100%)',
              borderBottom: stand.accent ? `2px solid ${stand.accent}` : undefined,
            }}
          />
        </>
      );
  }
}

/** A desktop monitor of its time: shape, bezel, chin and stand come from the model. */
export function Monitor({ model, aspectRatio, children, className }: MonitorProps) {
  const spec = getMonitorSpec(model);
  const { bezel } = spec;
  const ratio = aspectRatio ?? spec.ratio;
  // Padding percentages are relative to the width; convert the chin to a height percentage.
  const [ratioWidth = 16, ratioHeight = 9] = ratio.split('/').map(Number);
  const ledBottom = (bezel.bottom / 2) * (ratioWidth / ratioHeight);
  return (
    <Body className={className} data-monitor={model} data-ratio={ratio}>
      <Panel
        style={{
          aspectRatio: ratio,
          padding: `${bezel.top}% ${bezel.side}% ${bezel.bottom}%`,
          borderRadius: bezel.radius,
          background: bezel.color,
        }}
      >
        {bezel.glossy && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: bezel.radius,
              background:
                'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 35%, transparent 36%)',
              pointerEvents: 'none',
            }}
          />
        )}
        <Glass>
          {children}
          {spec.curved && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.28), transparent 12%, transparent 88%, rgba(0,0,0,0.28))',
                pointerEvents: 'none',
              }}
            />
          )}
        </Glass>
        {spec.led && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '3%',
              bottom: `${ledBottom}%`,
              transform: 'translateY(50%)',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: spec.led,
              boxShadow: `0 0 6px ${spec.led}`,
            }}
          />
        )}
      </Panel>
      <div aria-hidden="true" style={{ display: 'contents' }}>
        <Stand stand={spec.stand} />
      </div>
    </Body>
  );
}
