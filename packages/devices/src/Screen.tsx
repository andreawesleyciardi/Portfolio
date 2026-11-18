'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { styled } from '@mui/material/styles';

export interface ScreenProps {
  /**
   * The resolution the content is laid out at, in CSS pixels (e.g. 1024 for a 2008 monitor,
   * 320 for an iPhone 3G). The content is then scaled to fit the device, like a real screen.
   */
  virtualWidth: number;
  children: ReactNode;
  className?: string;
}

const Viewport = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

// The content's container queries see `virtualWidth`, so a 320px phone gets the mobile layout
// and a 1024px monitor gets the desktop one, whatever their size on the page.
const Content = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: 'top left',
  containerType: 'inline-size',
  containerName: 'screen',
});

/** A device screen: renders its content at a real resolution and scales it to fit. */
export function Screen({ virtualWidth, children, className }: ScreenProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const scale = width / virtualWidth;
      setSize({ scale, height: scale > 0 ? height / scale : 0 });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [virtualWidth]);

  return (
    <Viewport ref={viewportRef} className={className}>
      {/* The site on screen is an illustration: not focusable or clickable. */}
      <Content
        inert
        style={{
          width: virtualWidth,
          height: size.height || undefined,
          transform: `scale(${size.scale})`,
        }}
      >
        {children}
      </Content>
    </Viewport>
  );
}
