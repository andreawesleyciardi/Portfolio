import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { getContrastRatio, useTheme } from '@mui/material/styles';
import { getTechIcon, techInitials } from './techIcons';

/**
 * - `tags`: the names as tags.
 * - `icons`: the logos only (the name shows as a tooltip and is the accessible label).
 * - `both`: the logo inside the tag.
 */
export const TECH_STACK_VARIANTS = ['tags', 'icons', 'both'] as const;
export type TechStackVariant = (typeof TECH_STACK_VARIANTS)[number];

export interface TechStackProps {
  /** Technology names, in display order. */
  items: readonly string[];
  variant?: TechStackVariant;
  /** Accessible name for the list. */
  label?: string;
}

/** The brand color, or the text color when the brand color would vanish on the background. */
function useLogoColor() {
  const theme = useTheme();
  const background = theme.palette.background.paper;
  return (hex: string) =>
    getContrastRatio(`#${hex}`, background) >= 2 ? `#${hex}` : theme.palette.text.primary;
}

function Logo({ name, size }: { name: string; size: number }) {
  const logoColor = useLogoColor();
  const icon = getTechIcon(name);
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: 'inline-grid',
          placeItems: 'center',
          width: size,
          height: size,
          borderRadius: size / 4,
          border: '1.5px solid currentColor',
          fontSize: size * 0.42,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {techInitials(name)}
      </span>
    );
  }
  return (
    <svg
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={logoColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** The tech stack used in an era: as tags, as logos, or both. */
export function TechStack({ items, variant = 'tags', label = 'Tech stack' }: TechStackProps) {
  return (
    <Stack
      component="ul"
      aria-label={label}
      direction="row"
      useFlexGap
      sx={{
        flexWrap: 'wrap',
        gap: variant === 'icons' ? 1.25 : 1,
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
    >
      {items.map((item) => (
        <li key={item}>
          {variant === 'icons' ? (
            <Tooltip title={item} arrow>
              <Stack
                component="span"
                role="img"
                aria-label={item}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  // Solid background, so the logos stay readable over the background code.
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <Logo name={item} size={24} />
              </Stack>
            </Tooltip>
          ) : (
            <Chip
              label={item}
              size="small"
              variant="outlined"
              icon={variant === 'both' ? <Logo name={item} size={14} /> : undefined}
              sx={{ bgcolor: 'background.paper', '& .MuiChip-icon': { ml: '6px' } }}
            />
          )}
        </li>
      ))}
    </Stack>
  );
}
