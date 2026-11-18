import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  contactHref: string;
  nowHref: string;
}

/**
 * The persistent header, in a neutral style that the eras don't change: whatever year is on
 * screen, a visitor can see who I am, contact me, or jump to now.
 * Later: the aging avatar goes here.
 */
export function SiteHeader({ contactHref, nowHref }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.identity}>
        <strong>Andrea Ciardi</strong>
        <span>Senior Frontend Developer · since 2008</span>
      </p>
      <nav aria-label="Main" className={styles.nav}>
        <a href={nowHref}>Now</a>
        <a href={contactHref}>Contact</a>
      </nav>
    </header>
  );
}
