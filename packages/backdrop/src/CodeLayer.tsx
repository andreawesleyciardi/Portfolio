'use client';

import { styled, useTheme } from '@mui/material/styles';
import type { HighlightedCode } from './types';

/** Where the code sits in the background. */
export const CODE_PLACEMENTS = [
  'left',
  'top-left',
  'bottom-left',
  'bottom-center',
  'right',
  'top-right',
  'full',
] as const;
export type CodePlacement = (typeof CODE_PLACEMENTS)[number];

export interface CodeLayerProps {
  /** The snippet in the coding style of the era. Shown in plain color if `highlighted` is missing. */
  code: string;
  /** Language name (html, css, javascript, tsx). */
  language: string;
  /** The same code with VS Code colors, from `highlightCode` (build time). */
  highlighted?: HighlightedCode;
  placement?: CodePlacement;
  /** 0–1. The layer is decoration, so keep it low. */
  opacity?: number;
  /** Font size in rem (a multiplier of the viewport-based size for `full`). */
  fontSize?: number;
  /** Rotation in degrees. Negative tilts the code up to the right. */
  incline?: number;
  /** Fades the code out toward its edges, so it blends into the background. */
  fade?: boolean;
  className?: string;
}

const HEADER_SPACE = 88;

const Pre = styled('pre')({
  position: 'absolute',
  margin: 0,
  fontFamily:
    '"Cascadia Code", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  lineHeight: 1.6,
  whiteSpace: 'pre',
  overflow: 'hidden',
  pointerEvents: 'none',
  userSelect: 'none',
  opacity: 'var(--code-opacity)',
  // A separate property from `transform`, so it combines with each placement's centering.
  rotate: 'var(--code-incline)',
  transformOrigin: 'center',
  // Small screens: the code sits right behind the text, so it gets fainter.
  '@container (max-width: 899.95px)': { opacity: 'calc(var(--code-opacity) * 0.6)' },
  '&[data-placement="left"]': {
    top: '50%',
    left: '3%',
    width: '60%',
    transform: 'translateY(-50%)',
  },
  '&[data-placement="top-left"]': { top: HEADER_SPACE, left: '3%', width: '60%' },
  '&[data-placement="bottom-left"]': { bottom: '4%', left: '3%', width: '60%' },
  '&[data-placement="bottom-center"]': {
    bottom: '4%',
    left: '50%',
    maxWidth: '90%',
    transform: 'translateX(-50%)',
  },
  // Behind the era panel (the right column of the scene), vertically centered.
  '&[data-placement="right"]': {
    top: '50%',
    left: '58%',
    right: 0,
    transform: 'translateY(-50%)',
    // Single-column layout (mobile): the panel sits below the devices, so the code does too.
    '@container (max-width: 899.95px)': {
      top: 'auto',
      bottom: '6%',
      left: '4%',
      transform: 'none',
    },
  },
  // Top of the right column, just below the header.
  '&[data-placement="top-right"]': { top: HEADER_SPACE, left: '58%', right: 0 },
  // Big code across the whole background, with the content on top (as on tamalsen.dev).
  '&[data-placement="full"]': {
    inset: `${HEADER_SPACE}px 0 0 0`,
    display: 'grid',
    alignContent: 'center',
    padding: '0 3%',
  },
  '&[data-fade="true"]': {
    maskImage:
      'linear-gradient(to bottom, transparent, #000 12%, #000 80%, transparent), linear-gradient(to right, #000 65%, transparent)',
    maskComposite: 'intersect',
  },
  '&[data-fade="true"][data-placement="full"]': {
    maskImage: 'radial-gradient(ellipse at center, #000 45%, transparent 85%)',
  },
});

/** Font size: rem for the side placements; scales with the viewport for `full`. */
function fontSizeFor(placement: CodePlacement, scale: number) {
  return placement === 'full' ? `calc(${scale} * clamp(1rem, 2vw, 2.25rem))` : `${scale}rem`;
}

/**
 * The era's code, shown faintly in the background with VS Code colors: Light+ or Dark+,
 * following the mode of the surrounding theme.
 * Decorative, so hidden from assistive technology (the era panel explains the same change in words).
 * TODO: animate changes between eras with shiki-magic-move.
 */
export function CodeLayer({
  code,
  language,
  highlighted,
  placement = 'right',
  opacity = 0.25,
  fontSize = 1.2,
  incline = -6,
  fade = true,
  className,
}: CodeLayerProps) {
  const mode = useTheme().palette.mode;
  return (
    <Pre
      aria-hidden="true"
      className={className}
      data-language={language}
      data-placement={placement}
      data-fade={String(fade)}
      style={{
        ['--code-opacity' as string]: opacity,
        ['--code-incline' as string]: `${incline}deg`,
        fontSize: fontSizeFor(placement, fontSize),
      }}
    >
      <code>
        {highlighted
          ? highlighted.lines.map((line, i) => (
              <span key={i}>
                {line.map((token, j) => (
                  <span
                    key={j}
                    style={{
                      color: token.color[mode],
                      fontStyle: token.italic ? 'italic' : undefined,
                      fontWeight: token.bold ? 700 : undefined,
                    }}
                  >
                    {token.content}
                  </span>
                ))}
                {'\n'}
              </span>
            ))
          : code}
      </code>
    </Pre>
  );
}
