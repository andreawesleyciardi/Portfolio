import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import css from 'shiki/langs/css.mjs';
import html from 'shiki/langs/html.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import darkPlus from 'shiki/themes/dark-plus.mjs';
import lightPlus from 'shiki/themes/light-plus.mjs';
import type { HighlightedCode } from './types';

/** VS Code's default themes: Light+ for the light page, Dark+ for the dark one. */
export const CODE_THEMES = { light: 'light-plus', dark: 'dark-plus' } as const;

let highlighter: ReturnType<typeof createHighlighterCoreSync> | undefined;

// Synchronous highlighter with the JavaScript regex engine: no WebAssembly, and only the
// languages and themes we use. Created on first use.
function getHighlighter() {
  highlighter ??= createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    langs: [html, css, javascript, tsx],
    themes: [lightPlus, darkPlus],
  });
  return highlighter;
}

/**
 * Splits code into tokens colored with VS Code's grammars, in both the light and dark theme.
 * Meant for build time (server components) and Storybook: the result is plain data, so the
 * page doesn't ship the highlighter to the browser.
 */
export function highlightCode(code: string, language: string): HighlightedCode {
  const tokens = getHighlighter().codeToTokensWithThemes(code, {
    lang: language,
    themes: CODE_THEMES,
  });
  return {
    lines: tokens.map((line) =>
      line.map((token) => {
        // Shiki's FontStyle flags: 1 italic, 2 bold. Light+ and Dark+ agree on them.
        const fontStyle = token.variants.light?.fontStyle ?? 0;
        return {
          content: token.content,
          color: { light: token.variants.light?.color, dark: token.variants.dark?.color },
          italic: (fontStyle & 1) !== 0 || undefined,
          bold: (fontStyle & 2) !== 0 || undefined,
        };
      }),
    ),
  };
}
