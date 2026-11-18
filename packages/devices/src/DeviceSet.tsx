import type { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

export interface DeviceSetProps {
  monitor: ReactNode;
  tablet?: ReactNode;
  phone?: ReactNode;
  className?: string;
}

const Set = styled('div')({
  position: 'relative',
  width: '100%',
  // Leaves room at the bottom for the tablet and phone overlapping the monitor.
  paddingBottom: '8%',
});

const TabletSlot = styled('div')({ position: 'absolute', left: '-4%', bottom: 0, width: '26%' });
const PhoneSlot = styled('div')({ position: 'absolute', right: '-2%', bottom: 0, width: '13%' });

/**
 * Arranges the devices of an era: the monitor at the back, the tablet and phone in front.
 * Tablet and phone appear only in the eras when they existed.
 */
export function DeviceSet({ monitor, tablet, phone, className }: DeviceSetProps) {
  return (
    <Set className={className}>
      <div style={{ width: '86%', margin: '0 auto' }}>{monitor}</div>
      {tablet && <TabletSlot>{tablet}</TabletSlot>}
      {phone && <PhoneSlot>{phone}</PhoneSlot>}
    </Set>
  );
}
