import type { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

export interface BackdropProps {
  /** Usually a `CodeLayer`. */
  code?: ReactNode;
  /** Usually a `YearImage`. */
  image?: ReactNode;
  className?: string;
}

const Layer = styled('div')({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
});

const CodeSlot = styled('div')({ position: 'absolute', inset: 0 });

const ImageSlot = styled('div')({
  position: 'absolute',
  right: '4%',
  bottom: '4%',
  width: '40%',
  height: '60%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
});

/** The decorative layer behind an era: the code style and the picture of the year. */
export function Backdrop({ code, image, className }: BackdropProps) {
  return (
    <Layer aria-hidden="true" className={className}>
      {code && <CodeSlot>{code}</CodeSlot>}
      {image && <ImageSlot>{image}</ImageSlot>}
    </Layer>
  );
}
