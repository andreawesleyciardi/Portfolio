import type { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

/** 'classic': thick bezels and a home button (2008–2016). 'modern': edge-to-edge screen. */
export type HandheldGeneration = 'classic' | 'modern';

interface HandheldProps {
  generation: HandheldGeneration;
  children: ReactNode;
  className?: string;
}

const Shell = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#111',
  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35), inset 0 0 0 2px #444',
});

const Glass = styled('div')({
  width: '100%',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
  background: '#000',
});

const HomeButton = styled('div')({
  width: '14%',
  aspectRatio: '1',
  borderRadius: '50%',
  border: '2px solid #555',
  flexShrink: 0,
});

function makeHandheld(name: string, ratio: { classic: string; modern: string }) {
  function Handheld({ generation, children, className }: HandheldProps) {
    const classic = generation === 'classic';
    return (
      <Shell
        className={className}
        data-generation={generation}
        style={{
          aspectRatio: ratio[generation],
          padding: classic ? '14% 6% 4%' : '3.5%',
          borderRadius: classic ? '12% / 7%' : '9% / 5%',
          gap: classic ? '4%' : 0,
        }}
      >
        <Glass style={{ borderRadius: classic ? 0 : '6% / 3%' }}>{children}</Glass>
        {classic && <HomeButton aria-hidden="true" />}
      </Shell>
    );
  }
  Handheld.displayName = name;
  return Handheld;
}

export type PhoneProps = HandheldProps;
export type TabletProps = HandheldProps;

/** A phone replica: iPhone 3G style (2008) up to modern edge-to-edge phones. */
export const Phone = makeHandheld('Phone', { classic: '9 / 17', modern: '9 / 19' });

/** A tablet replica, available from 2010 (iPad). */
export const Tablet = makeHandheld('Tablet', { classic: '3 / 4.3', modern: '3 / 4.2' });
