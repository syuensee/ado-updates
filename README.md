# ADO Monthly Report

A VS Code workspace that uses GitHub Copilot with an Azure DevOps MCP server to query IC3 Data Science work items, generate status reports, and answer questions about project progress — all through natural language in Copilot Chat.

## Getting Started

### Prerequisites

- **VS Code** with the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension installed
- **Node.js** ≥ 18 (required to run the MCP server)
- Access to the **SCC** Azure DevOps project at `https://skype.visualstudio.com`
- Authenticated to Azure DevOps via your Microsoft account (the MCP server uses your logged-in identity)

### Clone and Open

```bash
git clone https://github.com/syuensee/ado-updates.git
cd ado-updates
code .
```

### Start the ADO MCP Server

1. Open VS Code in the cloned repo.
2. When prompted, allow the MCP server to start — or open the Command Palette (`Ctrl+Shift+P`) and run **MCP: List Servers**, then start the `ado` server.
3. VS Code will prompt you for your Azure DevOps **organization name** (enter `skype`).
4. The MCP server authenticates using your current Azure identity. Make sure you're signed in to the Microsoft account that has access to the SCC project.

### Use the Agent

Open **Copilot Chat** (`Ctrl+Shift+I`) and start asking questions. The agent is pre-configured with knowledge of our IC3 Data Science team structure, ADO queries, and work item hierarchy. Example prompts:

- *"What's the current status of the AAF project?"*
- *"Summarize what Chathra's team has been working on this month"*
- *"What are the most recent projects worked on by the RTC Analytics team?"*
- *"Give me a progress report on CY26H1 key results"*

The Copilot instructions in `.github/copilot-instructions.md` provide context about our team structure, ADO query IDs, area paths, and reporting conventions so the agent can retrieve and summarize work items accurately.

### Customize for Your Area

If you want the agent to focus on your specific team, you can edit `.github/copilot-instructions.md` to adjust:

- Which ADO queries the agent prioritizes
- Your role and team context
- Any additional conventions or formatting preferences

## Project Structure

```
.github/
└── copilot-instructions.md  # Agent context: team structure, ADO queries, conventions
.vscode/
└── mcp.json                 # MCP server config for Azure DevOps
src/                         # React app (optional web UI for report generation)
├── components/              # QueryForm, SummaryReport
├── hooks/                   # useAdoQuery
├── services/                # adoClient, summaryGenerator
└── types/                   # Shared TypeScript interfaces
```

## MCP Server Configuration

The `.vscode/mcp.json` file configures the [Azure DevOps MCP Server](https://www.npmjs.com/package/@azure-devops/mcp) to run via `npx`. It exposes ADO core, work, and work-items API domains to Copilot.

On first use, VS Code will prompt for the organization name. Enter `skype` for our team's ADO instance.

## Web App (Optional)

The repo also includes a React app for generating monthly summary reports through a browser UI.

```bash
npm install
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
