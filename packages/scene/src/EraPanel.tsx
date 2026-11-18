import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TechStack } from '@portfolio/ui';
import type { Era } from '@portfolio/eras';

export interface EraPanelProps {
  era: Era;
  /** Usually the `ContactButton`, pinned at the bottom of the panel. */
  action?: ReactNode;
  /** Glow around the text, in the page's background color, to separate it from the code behind. */
  glow?: boolean;
}

/** The right side of an era: what I was working on, the tech stack and the trends of the time. */
export function EraPanel({ era, action, glow = true }: EraPanelProps) {
  const [start, end] = era.years;
  return (
    <Box
      component="article"
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        color: theme.palette.text.primary,
        // A glow in the page's background color separates the text from the code behind it.
        // Stacked small blurs: one big blur spreads too thin to cover the code.
        textShadow: !glow
          ? 'none'
          : [1, 2, 3, 6, 10, 16]
              .map((blur) => `0 0 ${blur}px ${theme.palette.background.default}`)
              .join(', '),
      })}
    >
      <header>
        <Typography variant="overline" component="p">
          {start}–{end}
        </Typography>
        <Typography variant="h4" component="h2">
          {era.title}
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.8 }}>{era.intro}</Typography>
      </header>

      {era.work.map((work) => (
        <Box key={work.company}>
          <Typography variant="h6" component="h3">
            {work.company}
            {work.sideProject && (
              <Typography component="span" variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
                (alongside)
              </Typography>
            )}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {work.role} · {work.field}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {work.summary}
          </Typography>
        </Box>
      ))}

      {/* Chips and button have solid backgrounds: no glow needed. */}
      <Box sx={{ textShadow: 'none' }}>
        <TechStack items={era.stack} label={`Tech stack ${start}–${end}`} />
      </Box>

      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
        {era.trends.map((trend) => (
          <Typography component="li" variant="body2" key={trend}>
            {trend}
          </Typography>
        ))}
      </Box>

      {action && <Box sx={{ mt: 1, textShadow: 'none' }}>{action}</Box>}
    </Box>
  );
}
