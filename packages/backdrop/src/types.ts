/** One colored piece of code. Plain data, so it can be passed from server to client. */
export interface CodeToken {
  content: string;
  /** Color in VS Code's Light+ and Dark+ themes, so the page can switch modes without re-highlighting. */
  color: { light?: string; dark?: string };
  italic?: boolean;
  bold?: boolean;
}

/** Code split into lines of colored tokens (see `highlightCode`). */
export interface HighlightedCode {
  lines: CodeToken[][];
}
