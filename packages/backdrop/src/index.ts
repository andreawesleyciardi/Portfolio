export { CodeLayer, CODE_PLACEMENTS, type CodePlacement, type CodeLayerProps } from './CodeLayer';
export { YearImage, type YearImageProps } from './YearImage';
export { Backdrop, type BackdropProps } from './Backdrop';
export type { CodeToken, HighlightedCode } from './types';
// The highlighter itself is a separate entry point, `@portfolio/backdrop/highlight`, so it
// stays out of client bundles.
