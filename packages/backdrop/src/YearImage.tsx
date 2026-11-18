import { styled } from '@mui/material/styles';

export interface YearImageProps {
  /** Image that places the visitor in the year (e.g. a face mask for 2020). */
  src: string;
  /** 0–1. Kept low so it reads as texture. */
  opacity?: number;
  className?: string;
}

const Img = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  pointerEvents: 'none',
  userSelect: 'none',
});

/** A decorative picture of the year. Empty alt: it adds atmosphere, not information. */
export function YearImage({ src, opacity = 0.08, className }: YearImageProps) {
  return <Img src={src} alt="" className={className} style={{ opacity }} />;
}
