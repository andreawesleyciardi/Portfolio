import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export interface TechStackProps {
  /** Technology names, in display order. */
  items: readonly string[];
  /** Accessible name for the list. */
  label?: string;
}

/**
 * The tech stack used in an era, as a list of chips.
 * TODO: add an icon for each technology (e.g. Simple Icons).
 */
export function TechStack({ items, label = 'Tech stack' }: TechStackProps) {
  return (
    <Stack
      component="ul"
      aria-label={label}
      direction="row"
      useFlexGap
      sx={{ flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0 }}
    >
      {items.map((item) => (
        <li key={item}>
          {/* Solid background, so the chips stay readable over the background code. */}
          <Chip label={item} size="small" variant="outlined" sx={{ bgcolor: 'background.paper' }} />
        </li>
      ))}
    </Stack>
  );
}
