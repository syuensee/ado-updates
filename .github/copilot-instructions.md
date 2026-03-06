# ADO Monthly Report — Copilot Instructions

## Build & Run

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (http://localhost:5173)
npm run build        # type-check (tsc -b) then production build
npm run lint         # ESLint across the project
```

There are no tests yet. When adding tests, use Vitest (already compatible with the Vite toolchain).

## Architecture

This is a **React 19 + TypeScript + Vite** single-page app that queries Azure DevOps work items via the REST API and renders monthly summary reports.

### Data flow

```
QueryForm (user input)
  → useAdoQuery hook
    → adoClient.queryWorkItems (WIQL query → fetch work item details)
    → summaryGenerator.generateSummary (aggregate into MonthlySummary)
  → SummaryReport (render tables, metric cards, highlights)
```

### Key layers

- **`src/services/adoClient.ts`** — All Azure DevOps REST API calls. Uses WIQL to query work item IDs, then batch-fetches details (200 per request). Auth is via PAT using Basic auth header.
- **`src/services/summaryGenerator.ts`** — Pure functions that take `WorkItem[]` and produce `MonthlySummary`. Also has `formatSummaryAsMarkdown()` for clipboard export. State categorization (Done/In Progress/New) is defined by the `DONE_STATES` and `IN_PROGRESS_STATES` constants at the top of the file.
- **`src/hooks/useAdoQuery.ts`** — React hook that wires the service layer to component state (loading, error, results).
- **`src/types/index.ts`** — All shared TypeScript interfaces (`WorkItem`, `MonthlySummary`, `QueryParams`, etc.).

### Component structure

- **`App.tsx`** — Root layout; composes QueryForm + SummaryReport.
- **`QueryForm.tsx`** — Form for ADO connection settings, date range, and filters. Persists org/project/PAT to localStorage.
- **`SummaryReport.tsx`** — Displays the generated summary with metric cards, tables by type/assignee, and a "Copy as Markdown" button.

## Conventions

- All ADO API interaction is isolated in `src/services/adoClient.ts`. Components never call `fetch()` directly.
- Types are centralized in `src/types/index.ts` — import from `"../types"`, not from individual service files.
- The summary generator is a pure function with no side effects, making it easy to test independently.
- ADO API version is pinned to `7.1` via the `ADO_API_VERSION` constant in `adoClient.ts`.

## MCP Server

The project includes `.vscode/mcp.json` configured with the `@tiberriver256/mcp-server-azure-devops` MCP server. This allows Copilot to query ADO work items, repos, and pipelines directly during development. It prompts for the org URL and PAT on first use.
