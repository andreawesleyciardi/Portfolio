'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { styled } from '@mui/material/styles';

export interface TimelineItem {
  /** Also used as the section's DOM id, so `#id` links jump to it. */
  id: string;
  /** Short name, announced to screen readers in slider mode (e.g. "2008–2009"). */
  label: string;
}

/**
 * - `scroll`: desktop. Each item is pinned while the visitor scrolls through it.
 * - `slider`: mobile. One item per slide, with previous/next arrows and swipe.
 * - `auto`: `slider` below the breakpoint, `scroll` above it. Switched with CSS on the same DOM.
 */
export type TimelineMode = 'auto' | 'scroll' | 'slider';

export interface TimelineProps<T extends TimelineItem> {
  items: readonly T[];
  /** Renders the final frame of an item. The same output is used in every mode. */
  renderItem: (item: T, index: number) => ReactNode;
  mode?: TimelineMode;
  /** Scroll distance of each item in scroll mode. Longer means more time on each era. */
  scrollLength?: string;
  /** Called when a different item becomes the active one. */
  onActiveChange?: (item: T, index: number) => void;
  /** Accessible name for the timeline. */
  label?: string;
  className?: string;
}

/** Width below which `auto` mode becomes a slider (MUI's `md` breakpoint). */
export const SLIDER_MEDIA_QUERY = '(max-width: 899.95px)';

const scrollStyles = {
  '& [data-part="track"]': { display: 'block', listStyle: 'none', margin: 0, padding: 0 },
  '& [data-part="item"]': { height: 'var(--timeline-scroll-length)' },
  '& [data-part="frame"]': { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' },
  '& [data-part="controls"]': { display: 'none' },
} as const;

const sliderStyles = {
  '& [data-part="track"]': {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    overscrollBehaviorX: 'contain',
  },
  '& [data-part="item"]': { flex: '0 0 100%', scrollSnapAlign: 'start', height: 'auto' },
  '& [data-part="frame"]': { position: 'relative', minHeight: '100svh' },
  '& [data-part="controls"]': { display: 'flex' },
} as const;

const Root = styled('section')({
  position: 'relative',
  '&[data-mode="scroll"]': scrollStyles,
  '&[data-mode="slider"]': sliderStyles,
  '&[data-mode="auto"]': {
    ...scrollStyles,
    [`@media ${SLIDER_MEDIA_QUERY}`]: sliderStyles,
  },
  '@media (prefers-reduced-motion: no-preference)': {
    '& [data-part="track"]': { scrollBehavior: 'smooth' },
  },
});

const Controls = styled('div')({
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '8px 16px',
  // Neutral bar, like the site header: readable over any era.
  background: 'rgb(17 17 17 / 0.85)',
  backdropFilter: 'blur(8px)',
  color: '#f5f5f5',
});

const ArrowButton = styled('button')({
  minWidth: 44,
  minHeight: 44,
  borderRadius: 22,
  border: '1px solid currentColor',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  cursor: 'pointer',
  '&:disabled': { opacity: 0.35, cursor: 'default' },
});

function useIsSlider(mode: TimelineMode) {
  const [matches, setMatches] = useState(mode === 'slider');
  useEffect(() => {
    if (mode !== 'auto') {
      setMatches(mode === 'slider');
      return;
    }
    const query = window.matchMedia(SLIDER_MEDIA_QUERY);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [mode]);
  return matches;
}

/** The timeline of eras. Renders every item once; the mode only changes layout and navigation. */
export function Timeline<T extends TimelineItem>({
  items,
  renderItem,
  mode = 'auto',
  scrollLength = '200vh',
  onActiveChange,
  label = 'Timeline',
  className,
}: TimelineProps<T>) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const isSlider = useIsSlider(mode);

  // Track which item is active: the one crossing the middle of the viewport (scroll)
  // or most visible in the track (slider).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const elements = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      isSlider
        ? { root: track, threshold: 0.6 }
        : { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isSlider, items.length]);

  useEffect(() => {
    const item = items[active];
    if (item) onActiveChange?.(item, active);
  }, [active, items, onActiveChange]);

  const goTo = useCallback((index: number) => {
    const target = trackRef.current?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({ inline: 'start', block: 'nearest' });
  }, []);

  const current = items[active];

  return (
    <Root
      aria-label={label}
      aria-roledescription={isSlider ? 'carousel' : undefined}
      data-mode={mode}
      className={className}
      style={{ ['--timeline-scroll-length' as string]: scrollLength }}
    >
      <ol data-part="track" ref={trackRef}>
        {items.map((item, index) => (
          <li
            key={item.id}
            id={item.id}
            data-part="item"
            data-active={index === active || undefined}
            aria-roledescription={isSlider ? 'slide' : undefined}
            aria-label={isSlider ? `${index + 1} of ${items.length}: ${item.label}` : undefined}
          >
            <div data-part="frame">{renderItem(item, index)}</div>
          </li>
        ))}
      </ol>

      <Controls data-part="controls">
        <ArrowButton
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous era"
        >
          ←
        </ArrowButton>
        <span aria-live="polite">{current?.label}</span>
        <ArrowButton
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next era"
        >
          →
        </ArrowButton>
      </Controls>
    </Root>
  );
}
