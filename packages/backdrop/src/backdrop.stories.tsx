import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import { Backdrop } from './Backdrop';
import { CodeLayer, CODE_PLACEMENTS, type CodePlacement } from './CodeLayer';
import { highlightCode } from './highlight';

const samples = {
  html: `<table width="960" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td colspan="2"><img src="header.jpg" width="960" height="120"></td>
  </tr>
  <tr>
    <td width="200" valign="top" bgcolor="#e6eef7">Menu</td>
    <td width="760" valign="top"><font face="Verdana" size="2">Welcome!</font></td>
  </tr>
</table>`,
  css: `.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "nav header"
    "nav main";
  gap: 24px;
}`,
  tsx: `export function Vehicles() {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
  if (isLoading) return <Skeleton />;
  return <VehicleList vehicles={data} />;
}`,
};

type Language = keyof typeof samples;

interface CodeArgs {
  language: Language;
  placement: CodePlacement;
  opacity: number;
  fontSize: number;
  incline: number;
  fade: boolean;
}

/** Highlights with the VS Code theme that matches the era picked in the toolbar. */
function HighlightedCodeLayer(args: CodeArgs) {
  const code = samples[args.language];
  const highlighted = useMemo(() => highlightCode(code, args.language), [code, args.language]);
  return <CodeLayer {...args} code={code} highlighted={highlighted} />;
}

const meta = {
  title: 'Backdrop',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const codeArgTypes = {
  language: { control: 'inline-radio', options: Object.keys(samples) },
  placement: { control: 'inline-radio', options: CODE_PLACEMENTS },
  opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  fontSize: { control: { type: 'range', min: 0.6, max: 2.5, step: 0.1 } },
  incline: { control: { type: 'range', min: -20, max: 20, step: 1 } },
} as const;

const codeArgs: CodeArgs = {
  language: 'html',
  placement: 'right',
  opacity: 0.25,
  fontSize: 1.2,
  incline: -6,
  fade: true,
};

/**
 * The code layer with VS Code colors: Light+ on light eras, Dark+ on dark ones
 * (follows the mode of the era picked in the toolbar). Try the placements and the fade.
 */
export const Code: StoryObj<CodeArgs> = {
  name: 'CodeLayer',
  args: codeArgs,
  argTypes: codeArgTypes,
  render: (args) => (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <HighlightedCodeLayer {...args} />
    </div>
  ),
};

/** The full background layer with content on top. */
export const Layered: StoryObj<CodeArgs> = {
  name: 'Backdrop',
  args: codeArgs,
  argTypes: codeArgTypes,
  render: (args) => (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Backdrop code={<HighlightedCodeLayer {...args} />} />
      <div style={{ position: 'relative', padding: 48, fontSize: 32 }}>Content sits on top</div>
    </div>
  ),
};
