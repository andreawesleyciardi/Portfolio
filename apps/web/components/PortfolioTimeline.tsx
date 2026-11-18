'use client';

import type { HighlightedCode } from '@portfolio/backdrop';
import type { Era } from '@portfolio/eras';
import { EraScene } from '@portfolio/scene';
import { Timeline } from '@portfolio/timeline';

interface PortfolioTimelineProps {
  eras: readonly Era[];
  /** Each era's background code with VS Code colors, keyed by era id. */
  highlightedCode: Record<string, HighlightedCode>;
  contactHref: string;
}

const toItem = (era: Era) => ({ ...era, label: `${era.years[0]}–${era.years[1]}` });

/** All eras as one timeline: scroll through time on desktop, a slideshow on mobile. */
export function PortfolioTimeline({ eras, highlightedCode, contactHref }: PortfolioTimelineProps) {
  return (
    <Timeline
      label="Frontend development from 2008 to today"
      items={eras.map(toItem)}
      renderItem={(era) => (
        <EraScene era={era} contactHref={contactHref} highlightedCode={highlightedCode[era.id]} />
      )}
    />
  );
}
