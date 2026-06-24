# Orientt Studio — Portfolio Site

Portfolio site for a design studio.

## Stack
- **Next.js** (App Router, TypeScript) + **Tailwind CSS v4** (CSS-based config in `src/app/globals.css`)
- **MDX** content for case studies — each project is an `.mdx` file with frontmatter under `content/work/`
- ESLint + `src/` directory, import alias `@/*`

## Structure
- `src/app/` — routes (App Router)
- `src/components/` — shared UI components
- `src/lib/` — data helpers (e.g. reading/parsing `content/work` MDX)
- `content/work/` — case-study `.mdx` files (frontmatter + body)
- `public/work/` — project images/assets

## Design source
The visual design lives in Figma: Portfolio-new
(`node-id=1262-12748`). We pull frames/styles/assets via the **Figma Dev Mode MCP**
server configured in `.mcp.json` (`figma-dev-mode`, http://127.0.0.1:3845/mcp).
Requires Figma desktop with the Dev Mode MCP server enabled, and a Claude Code
reconnect so the MCP tools load.

## UI polish
A `make-interfaces-feel-better` skill is installed under `.claude/skills/` —
apply its principles when building/refining UI.

## Status
Foundation scaffolded. Next: connect Figma MCP, then build pages to match the design.
