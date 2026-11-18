import Button, { type ButtonProps } from '@mui/material/Button';

export interface ContactButtonProps extends Omit<ButtonProps, 'href' | 'children'> {
  /** Where the button leads: a mailto: link, a form page or an anchor. */
  href: string;
  /** Visible label. Keep it the same in every era so the accessible name never changes. */
  label?: string;
}

/**
 * The always-visible Contact Me button. It takes its look from the era theme around it,
 * so the same element evolves from a glossy Web 2.0 button to a modern glass one.
 */
export function ContactButton({ href, label = 'Contact me', ...rest }: ContactButtonProps) {
  return (
    <Button variant="contained" color="primary" size="large" href={href} {...rest}>
      {label}
    </Button>
  );
}
