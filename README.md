# ADO Monthly Report

A React app that queries Azure DevOps work items and generates monthly summary reports.

## Prerequisites

- **Node.js** ≥ 18
- An **Azure DevOps** organization with a [Personal Access Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) (PAT) with **Work Items (Read)** scope.

## Quick Start

```bash
npm install
npm run dev
```

Open the app, enter your ADO organization, project, and PAT, select a date range, and click **Generate Summary**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## Architecture

```
src/
├── components/      # React UI components
│   ├── QueryForm    – form for ADO connection + date range + filters
│   └── SummaryReport – rendered summary with tables and metric cards
├── hooks/
│   └── useAdoQuery  – orchestrates fetching + summary generation
├── services/
│   ├── adoClient    – Azure DevOps REST API wrapper (WIQL queries)
│   └── summaryGenerator – transforms raw work items into MonthlySummary
└── types/           # Shared TypeScript interfaces
```

## MCP Integration

This project includes a VS Code MCP server configuration (`.vscode/mcp.json`) for the [Azure DevOps MCP Server](https://www.npmjs.com/package/@tiberriver256/mcp-server-azure-devops). This lets AI assistants query your ADO data directly during development.

Set the following environment variables (or use a `.env` file) before using the MCP server:

- `AZURE_DEVOPS_ORG_URL` — e.g. `https://dev.azure.com/my-org`
- `AZURE_DEVOPS_AUTH_METHOD` — `pat`
- `AZURE_DEVOPS_PAT` — your Personal Access Token
