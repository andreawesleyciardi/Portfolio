import {
  siBootstrap,
  siCss,
  siCypress,
  siDotnet,
  siGithubcopilot,
  siGulp,
  siHtml5,
  siJavascript,
  siJest,
  siJquery,
  siLess,
  siMui,
  siMysql,
  siNextdotjs,
  siOpenapiinitiative,
  siPhp,
  siReact,
  siReactbootstrap,
  siReacthookform,
  siReactquery,
  siSass,
  siStorybook,
  siStyledcomponents,
  siTanstack,
  siTestinglibrary,
  siTypescript,
  siVite,
  siWebpack,
  siYarn,
  siZod,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Logos for the technology names used in the era data, from Simple Icons (CC0).
 * Names without a logo in the set (e.g. AngularJS, SharePoint, Kendo UI, JavascriptMVC)
 * fall back to a lettered badge.
 */
const ICONS: Record<string, SimpleIcon> = {
  HTML: siHtml5,
  HTML5: siHtml5,
  CSS: siCss,
  CSS3: siCss,
  JavaScript: siJavascript,
  jQuery: siJquery,
  'ASP.NET': siDotnet,
  PHP: siPhp,
  MySQL: siMysql,
  Less: siLess,
  Sass: siSass,
  Bootstrap: siBootstrap,
  'React Bootstrap': siReactbootstrap,
  Gulp: siGulp,
  React: siReact,
  'React Query': siReactquery,
  Webpack: siWebpack,
  Yarn: siYarn,
  Vite: siVite,
  'Next.js': siNextdotjs,
  TanStack: siTanstack,
  'React Hook Form': siReacthookform,
  'Material UI': siMui,
  'Styled Components': siStyledcomponents,
  Cypress: siCypress,
  Jest: siJest,
  'React Testing Library': siTestinglibrary,
  TypeScript: siTypescript,
  Zod: siZod,
  OpenAPI: siOpenapiinitiative,
  Storybook: siStorybook,
  'GitHub Copilot': siGithubcopilot,
};

export function getTechIcon(name: string): SimpleIcon | undefined {
  return ICONS[name];
}

/** Letters for the fallback badge: the capitals of the name (max 2), else its first letters. */
export function techInitials(name: string): string {
  const capitals = name.replace(/[^A-Z]/g, '');
  return (capitals.length >= 2 ? capitals : name.replace(/[^A-Za-z0-9]/g, '')).slice(0, 2);
}
