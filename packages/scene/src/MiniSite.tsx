import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export interface MiniSiteProps {
  /** Name shown in the site's header. */
  name: string;
  /** Before responsive design the site keeps its fixed width on every device. */
  responsive: boolean;
}

// The page around the site. Before responsive design the site had a fixed width (960px) and the
// rest of the window showed the page background, often a gradient: the most typical sight of the
// era, so it is made clearly visible.
const Body = styled('div')(({ theme }) => ({
  minHeight: '100%',
  background: theme.palette.background.default,
  '&[data-responsive="false"]': {
    background: `linear-gradient(to bottom, ${theme.palette.primary.dark} 0, ${theme.palette.primary.main} 220px, ${theme.palette.background.default} 640px) no-repeat, ${theme.palette.background.default}`,
  },
}));

// One skeleton for every era (CSS Zen Garden style): the era theme restyles it, so its parts
// can morph from one era to the next. The real markup of each era is shown in the background code.
const Site = styled('div')(({ theme }) => ({
  minHeight: '100%',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '&[data-responsive="false"]': {
    width: 960,
    margin: '0 auto',
    background: theme.palette.background.paper,
    boxShadow: '0 0 12px rgba(0, 0, 0, 0.35)',
  },
}));

const Nav = styled('nav')({
  display: 'flex',
  gap: 16,
  '@container screen (max-width: 600px)': { display: 'none' },
});

const Cards = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
  padding: 24,
  '@container screen (max-width: 600px)': { gridTemplateColumns: '1fr' },
});

/**
 * Placeholder website shown inside the devices. Later replaced by a stylized recreation of
 * the project I was working on in each era.
 */
export function MiniSite({ name, responsive }: MiniSiteProps) {
  return (
    <Body data-responsive={String(responsive)}>
      <Site data-responsive={String(responsive)}>
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography component="span" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          <Nav aria-label="Demo site">
            <span>Home</span>
            <span>Products</span>
            <span>About</span>
            <span>Contact</span>
          </Nav>
        </Box>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="p" gutterBottom>
            Welcome to {name}
          </Typography>
          <Button variant="contained">Learn more</Button>
        </Box>
        <Cards>
          {[1, 2, 3].map((n) => (
            <Paper key={n} sx={{ p: 2, minHeight: 80 }}>
              Feature {n}
            </Paper>
          ))}
        </Cards>
      </Site>
    </Body>
  );
}
