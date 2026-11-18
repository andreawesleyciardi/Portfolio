import { highlightCode } from '@portfolio/backdrop/highlight';
import { eras } from '@portfolio/eras';
import { SiteHeader } from '../components/SiteHeader';
import { PortfolioTimeline } from '../components/PortfolioTimeline';

// TODO: decide the real contact target (form, mailto or LinkedIn).
const CONTACT_HREF = '#contact';

// Runs at build time (server component): the page gets plain colored tokens, not the highlighter.
const highlightedCode = Object.fromEntries(
  eras.map((era) => [era.id, highlightCode(era.code.snippet, era.code.language)]),
);

export default function HomePage() {
  const lastEra = eras[eras.length - 1];
  return (
    <>
      <SiteHeader contactHref={CONTACT_HREF} nowHref={lastEra ? `#${lastEra.id}` : '#'} />
      <main>
        <h1 className="visually-hidden">Andrea Ciardi, Senior Frontend Developer since 2008</h1>
        <PortfolioTimeline
          eras={eras}
          highlightedCode={highlightedCode}
          contactHref={CONTACT_HREF}
        />
      </main>
    </>
  );
}
