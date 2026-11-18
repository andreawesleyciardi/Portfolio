import { browserForYear, type Browser } from '@portfolio/devices';
import type { Era } from './types';

const milan2008to2016 = {
  company: 'Freelance & agencies, Milan',
  role: 'Frontend Developer',
  field: 'Banking, automotive, telecom and enterprise clients',
  summary:
    'Websites, e-banking portals, social platforms and enterprise apps for clients like CheBanca!, Credito Emiliano, Monte dei Paschi di Siena, Fiat, Ducati and Vodafone.',
};

const oseven = {
  company: 'OSeven Telematics',
  role: 'Senior Frontend Developer',
  field: 'Insurtech: telematics-based car insurance (UBI)',
  summary:
    "Built the company's first production web portal in AngularJS, then rebuilt it in React and created Monstera UI, the shared component library.",
};

// Placeholder content: the structure is final, the texts and snippets will be refined era by era.
export const eras: readonly Era[] = [
  {
    id: 'web2',
    style: 'web2',
    years: [2008, 2009],
    title: 'Web 2.0 and fixed widths',
    intro: '1024×768 screens, 960px layouts, IE6 still around, and jQuery everywhere.',
    devices: {
      monitor: { model: 'lcd-2006', virtualWidth: 1024 },
      browserBrand: 'microsoft', // Internet Explorer: about 65% of desktop users
      phone: { generation: 'classic', virtualWidth: 320 },
    },
    responsive: false,
    work: [milan2008to2016],
    stack: ['HTML', 'CSS', 'jQuery', 'ASP.NET', 'PHP', 'MySQL'],
    trends: [
      'Table layouts give way to divs and floats',
      'Glossy buttons from sliced images',
      'Flash for anything rich',
    ],
    code: {
      language: 'html',
      snippet: `<table width="960" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td colspan="2"><img src="header.jpg" width="960" height="120"></td>
  </tr>
  <tr>
    <td width="200" valign="top" bgcolor="#e6eef7">
      <a href="#"><img src="btn_home.gif" border="0"></a>
    </td>
    <td width="760" valign="top">
      <font face="Verdana" size="2">Welcome!</font>
    </td>
  </tr>
</table>`,
    },
  },
  {
    id: 'responsive',
    style: 'responsive',
    years: [2010, 2011],
    title: 'The responsive turning point',
    intro:
      'The iPad arrives, Flash starts to fade, and media queries change how layouts are built.',
    devices: {
      monitor: { model: 'widescreen-2009', virtualWidth: 1280 },
      browserBrand: 'microsoft', // Internet Explorer: still #1 until Chrome passed it in mid-2012
      tablet: { generation: 'classic', virtualWidth: 768 },
      phone: { generation: 'classic', virtualWidth: 320 },
    },
    responsive: true,
    work: [milan2008to2016],
    stack: ['HTML5', 'CSS3', 'jQuery', 'JavascriptMVC', 'Less'],
    trends: ['Responsive web design', 'Mobile first', 'Bootstrap'],
    code: {
      language: 'css',
      snippet: `.container { width: 940px; margin: 0 auto; }
.sidebar { float: left; width: 220px; }
.content { float: right; width: 700px; }
.clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }

@media (max-width: 767px) {
  .container { width: auto; padding: 0 20px; }
  .sidebar, .content { float: none; width: auto; }
}`,
    },
  },
  {
    id: 'flat',
    style: 'flat',
    years: [2012, 2013],
    title: 'Flat design and frontend tooling',
    intro: 'Skeuomorphism dies, one-page parallax sites spread, and builds move to Grunt and npm.',
    devices: {
      monitor: { model: 'hd-2012', virtualWidth: 1366 },
      browserBrand: 'chrome',
      tablet: { generation: 'classic', virtualWidth: 768 },
      phone: { generation: 'classic', virtualWidth: 320 },
    },
    responsive: true,
    work: [milan2008to2016],
    stack: ['AngularJS', 'Bootstrap', 'Less', 'jQuery', 'SharePoint'],
    trends: ['Flat design', 'Parallax one-pagers', 'Icon fonts and the hamburger menu'],
    code: {
      language: 'javascript',
      snippet: `angular.module('app', [])
  .controller('AccountsCtrl', function ($scope, $http) {
    $scope.accounts = [];
    $http.get('/api/accounts').success(function (data) {
      $scope.accounts = data;
    });
  });`,
    },
  },
  {
    id: 'material',
    style: 'material',
    years: [2014, 2016],
    title: 'Material and components',
    intro: 'Material Design, ES2015, and the move from pages to components.',
    devices: {
      monitor: { model: 'slim-2015', virtualWidth: 1440 },
      browserBrand: 'chrome',
      tablet: { generation: 'classic', virtualWidth: 768 },
      phone: { generation: 'classic', virtualWidth: 375 },
    },
    responsive: true,
    work: [milan2008to2016, oseven],
    stack: ['AngularJS', 'Sass', 'Bootstrap', 'Gulp'],
    trends: ['Material Design', 'ES2015 and Babel', 'Card-based UIs'],
    code: {
      language: 'css',
      snippet: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}`,
    },
  },
  {
    id: 'systems',
    style: 'systems',
    years: [2017, 2019],
    title: 'CSS Grid and design systems',
    intro:
      'CSS Grid lands in every browser, component libraries become design systems, and React takes over.',
    devices: {
      monitor: { model: 'frameless-2018', virtualWidth: 1920 },
      browserBrand: 'chrome',
      tablet: { generation: 'classic', virtualWidth: 834 },
      phone: { generation: 'modern', virtualWidth: 375 },
    },
    responsive: true,
    work: [oseven],
    stack: ['React', 'React Bootstrap', 'Sass', 'Webpack', 'Yarn'],
    trends: ['CSS Grid', 'Design systems and Storybook', 'React Hooks'],
    code: {
      language: 'css',
      snippet: `.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "nav header"
    "nav main";
  gap: 24px;
}`,
    },
  },
  {
    id: 'utility',
    style: 'utility',
    years: [2020, 2022],
    title: 'Performance and dark mode',
    intro: 'Core Web Vitals, dark mode everywhere, fast tooling, and a world working from home.',
    devices: {
      monitor: { model: 'ultrawide-2020', virtualWidth: 2560 },
      browserBrand: 'chrome', // about 65% of desktop users
      tablet: { generation: 'modern', virtualWidth: 834 },
      phone: { generation: 'modern', virtualWidth: 390 },
    },
    responsive: true,
    work: [
      oseven,
      {
        company: 'I6 Systems',
        role: 'Senior Frontend Developer (Consultant)',
        field: 'Fuel supply chain for airlines and airports',
        summary:
          'Led the refactor of the oldest of five portals with Next.js, alongside nine other frontend developers.',
        sideProject: true,
      },
    ],
    stack: ['React', 'Next.js', 'TanStack', 'React Hook Form', 'Material UI', 'Cypress'],
    trends: ['Core Web Vitals', 'Dark mode', 'Vite and esbuild'],
    code: {
      language: 'tsx',
      snippet: `export function Vehicles() {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
  if (isLoading) return <Skeleton />;
  return <VehicleList vehicles={data} />;
}`,
    },
  },
  {
    id: 'platform',
    style: 'platform',
    years: [2023, 2026],
    title: 'The platform and AI',
    intro:
      'Container queries, view transitions and :has() replace libraries, and AI joins the daily workflow.',
    devices: {
      monitor: { model: 'studio-2024', virtualWidth: 2560 },
      browserBrand: 'chrome',
      tablet: { generation: 'modern', virtualWidth: 1024 },
      phone: { generation: 'modern', virtualWidth: 393 },
    },
    responsive: true,
    work: [
      {
        company: 'Sitecore',
        role: 'Senior Frontend Developer',
        field: 'Digital experience platform: content, personalization and AI-powered marketing',
        summary:
          'Major features for the launch of Sitecore AI, and led the migration of its Search app into Unified UI, the company-wide monorepo.',
      },
      {
        company: 'Trading Point / XM',
        role: 'Senior Frontend Developer (Consultant)',
        field: 'Forex and CFD broker with 10M+ clients',
        summary:
          'Designed and built Katana, a UI library on top of Kendo UI, documented in Storybook.',
        sideProject: true,
      },
    ],
    stack: ['React', 'TypeScript', 'TanStack', 'Zod', 'OpenAPI', 'Storybook', 'GitHub Copilot'],
    trends: ['Container queries and :has()', 'View transitions', 'AI-assisted development'],
    code: {
      language: 'css',
      snippet: `.card {
  container-type: inline-size;
}
@container (width > 40rem) {
  .card:has(img) { grid-template-columns: 1fr 2fr; }
}
::view-transition-old(hero) { animation: fade-out 200ms; }`,
    },
  },
];

/** The browser an era shows: its most used brand, in the version of the era's final year. */
export function eraBrowser(era: Era): Browser {
  return browserForYear(era.devices.browserBrand, era.years[1]);
}
