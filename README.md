# ADO Monthly Report

A VS Code workspace that uses GitHub Copilot with an Azure DevOps MCP server to query IC3 Data Science work items, generate status reports, and answer questions about project progress — all through natural language in Copilot Chat. Responses are generated with AI assistance using Azure DevOps data and may contain inaccuracies — always verify critical details against the source work items.

# Resources
- Uses this [repo]([url](https://github.com/microsoft/azure-devops-mcp?tab=readme-ov-file#-installation--getting-started)) 
- Followed this [documentation]([url](https://loop.cloud.microsoft/p/eyJ1IjoiaHR0cHM6Ly9taWNyb3NvZnQuc2hhcmVwb2ludC1kZi5jb20vY29udGVudHN0b3JhZ2UvQ1NQXzM0OTQ0YTFjLTQwYTEtNDdiYy05ZTFhLWQyMzY3MjBkNGNjMz9uYXY9Y3owbE1rWmpiMjUwWlc1MGMzUnZjbUZuWlNVeVJrTlRVQ1UxUmpNME9UUTBZVEZqSlRKRU5EQmhNU1V5UkRRM1ltTWxNa1E1WlRGaEpUSkVaREl6TmpjeU1HUTBZMk16Sm1ROVlpVXlNVWhGY1ZWT1MwWkJka1ZsWlVkMFNUSmpaekZOZHpGSWJVbDJObFpEUlZwRGNuSlJiRVZvZW1zemEzWnhhMGhNYkVGdWFEbFVZVFp2Y2xKM2RYaFlRMmNtWmowd01WVk1UREpRUlU5T1FWUmFVVXBHTlZSWlFrWXlSVTFZTTFkV1NsSkhOVTlDSm1NOUpUSkcifQ%3D%3D))

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

## Sample Prompt and Response
### Prompt
Give me a summary of the key milestones/highlights, risks/blockers, and next steps for the IC3DS team for the month of february 2026

### Response

# IC3 Data Science — February 2026 Monthly Summary

## Overall Snapshot (384 work items across 5 teams)

| Team | Total | Closed | Resolved | In Progress | Open | Blocked |
|------|-------|--------|----------|-------------|------|---------|
| Chathra (Phone & Messaging) | 45 | 2 | 4 | 20 | 18 | 1 |
| Teele (Fraud/Protection) | 74 | 43 | 4 | 7 | 17 | 3 |
| Oliver (CQ&R) | 102 | 47 | 0 | 18 | 31 | 6 |
| Martin (RTC Analytics) | 160 | 103 | 3 | 17 | 33 | 4 |
| Aysu (LLM Evals) | 61 | 12 | 2 | 13 | 33 | 1 |

---

## Key Milestones & Highlights

### Call Quality & Reliability Analytics (Oliver)

- **Classifier Application for Doppler completed** — Epic [4395686](https://skype.visualstudio.com/SCC/_workitems/edit/4395686) closed, including the ML classifier evaluation against Doppler SilentTest calls ([4113316](https://skype.visualstudio.com/SCC/_workitems/edit/4113316)).
- **Automated Drillthrough feature closed** — [4366793](https://skype.visualstudio.com/SCC/_workitems/edit/4366793) delivered.
- **Models Fast Delivery (MLOps)** — DEV Finalizer completed ([4116978](https://skype.visualstudio.com/SCC/_workitems/edit/4116978)); PROD deployment blocked ([4423498](https://skype.visualstudio.com/SCC/_workitems/edit/4423498)). The broader MLOps epic ([4154117](https://skype.visualstudio.com/SCC/_workitems/edit/4154117)) and Model Delivery System features ([4151908](https://skype.visualstudio.com/SCC/_workitems/edit/4151908), [3979222](https://skype.visualstudio.com/SCC/_workitems/edit/3979222)) remain in progress.
- **Copilot Agent Enhancement** — Excel Data Update, PBI Refresh, and Prediction Debugging completed ([4417951](https://skype.visualstudio.com/SCC/_workitems/edit/4417951)).
- **Tenant Alerting** — Active work across multiple epics: alert scoring algorithm ([4395656](https://skype.visualstudio.com/SCC/_workitems/edit/4395656)), troubleshooting methods ([4395658](https://skype.visualstudio.com/SCC/_workitems/edit/4395658)), internal alert reporting views ([4395659](https://skype.visualstudio.com/SCC/_workitems/edit/4395659)), precision measurement ([4415018](https://skype.visualstudio.com/SCC/_workitems/edit/4415018)), and Alerts Summary Dashboard build ([4451077](https://skype.visualstudio.com/SCC/_workitems/edit/4451077)).
- **Model Monitoring improvements** in progress ([4395651](https://skype.visualstudio.com/SCC/_workitems/edit/4395651), [4366780](https://skype.visualstudio.com/SCC/_workitems/edit/4366780)).
- **CQD Kusto documentation** — Ongoing work on detailed schema description ([3209971](https://skype.visualstudio.com/SCC/_workitems/edit/3209971)) and wiki page ([3511960](https://skype.visualstudio.com/SCC/_workitems/edit/3511960)).

### RTC Analytics (Martin)

- **AAF Migration to Neuron completed** — [4415192](https://skype.visualstudio.com/SCC/_workitems/edit/4415192): Finalized AAF migration from Synapse to Neuron and retired Synapse orchestration. Supporting items also closed: P0/P2 monitoring metrics ([4416184](https://skype.visualstudio.com/SCC/_workitems/edit/4416184), [4416203](https://skype.visualstudio.com/SCC/_workitems/edit/4416203)), legacy table deprecation ([4415212](https://skype.visualstudio.com/SCC/_workitems/edit/4415212)), NetworkHeatmap decommission ([4416889](https://skype.visualstudio.com/SCC/_workitems/edit/4416889)), and PROD Release 2026.3 ([4416225](https://skype.visualstudio.com/SCC/_workitems/edit/4416225)).
- **AAF Synapse 3.5 runtime demonstrated** — Libraries ([4323837](https://skype.visualstudio.com/SCC/_workitems/edit/4323837)), pipelines ([4404729](https://skype.visualstudio.com/SCC/_workitems/edit/4404729)), and mstsad ([4411595](https://skype.visualstudio.com/SCC/_workitems/edit/4411595)) all validated for Synapse 3.5 compatibility.
- **Synapse 3.5 adhoc pool created** ahead of March 31 deadline ([4459810](https://skype.visualstudio.com/SCC/_workitems/edit/4459810)).

### Fraud/Protection Intelligence (Teele)

- **Strongest closure rate across teams** — 43 items closed, 4 resolved (64% completion).
- **IRSF Anomaly Detection v3** shipped ([4414904](https://skype.visualstudio.com/SCC/_workitems/edit/4414904)) with dynamic threshold improvements ([4423109](https://skype.visualstudio.com/SCC/_workitems/edit/4423109), [4410707](https://skype.visualstudio.com/SCC/_workitems/edit/4410707)) and improved ACS PSTN dashboards ([4457856](https://skype.visualstudio.com/SCC/_workitems/edit/4457856)).
- **SCoRS ML** — Deployed alerting mechanism ([4457606](https://skype.visualstudio.com/SCC/_workitems/edit/4457606)), cleaned up pipelines ([4367805](https://skype.visualstudio.com/SCC/_workitems/edit/4367805), [4376001](https://skype.visualstudio.com/SCC/_workitems/edit/4376001)), and investigated silent precision drop ([4458631](https://skype.visualstudio.com/SCC/_workitems/edit/4458631)).
- **FASS** — Improved model labeling for GroupInvite spam ([4411459](https://skype.visualstudio.com/SCC/_workitems/edit/4411459)), expanded rule coverage for spammers from empty IPs ([4416706](https://skype.visualstudio.com/SCC/_workitems/edit/4416706)), and increased model training frequency ([4416801](https://skype.visualstudio.com/SCC/_workitems/edit/4416801)).

### LLM Evaluations (Aysu)

- **QUEST tool launched** — Set up for DSAT Root Cause Clustering ([4444637](https://skype.visualstudio.com/SCC/_workitems/edit/4444637)) and Project Metis overlap evaluation ([4444640](https://skype.visualstudio.com/SCC/_workitems/edit/4444640)).
- **UIO metrics understood** — Completed analysis of existing metrics across Chat, Calendar, and Meetings ([4453175](https://skype.visualstudio.com/SCC/_workitems/edit/4453175)).
- **SmartIcM** — MoreInfo integration deployed and tested in PPE ([4415683](https://skype.visualstudio.com/SCC/_workitems/edit/4415683), [4408853](https://skype.visualstudio.com/SCC/_workitems/edit/4408853)).

### Phone & Messaging Analytics (Chathra)

- **Multiple epics resolved** — MCL & Usage Correlation ([4344944](https://skype.visualstudio.com/SCC/_workitems/edit/4344944)), Teams Premium Recording & Transcription Forecast Enhancements ([4281941](https://skype.visualstudio.com/SCC/_workitems/edit/4281941)), Visual Insights/RTAF Cost Model ([4281949](https://skype.visualstudio.com/SCC/_workitems/edit/4281949)), and Correlation Analysis for both RTC $/KPI ([4282134](https://skype.visualstudio.com/SCC/_workitems/edit/4282134)) and Messaging $/KPI ([4282152](https://skype.visualstudio.com/SCC/_workitems/edit/4282152)).
- **IC3 Data Hub v0** in progress ([4421629](https://skype.visualstudio.com/SCC/_workitems/edit/4421629)).

### Cross-team

- **Security compliance** — SFI code bug remediation ([4413078](https://skype.visualstudio.com/SCC/_workitems/edit/4413078)), M365 security review closed for IC3 RTC MLOps ([4343825](https://skype.visualstudio.com/SCC/_workitems/edit/4343825)), and multiple CVE vulnerability alerts resolved ([4455855](https://skype.visualstudio.com/SCC/_workitems/edit/4455855), [4455902](https://skype.visualstudio.com/SCC/_workitems/edit/4455902), [4455910](https://skype.visualstudio.com/SCC/_workitems/edit/4455910), [4455920](https://skype.visualstudio.com/SCC/_workitems/edit/4455920)).
- **Voicemail** — OneRAI submission for GA prepared and submitted ([4414921](https://skype.visualstudio.com/SCC/_workitems/edit/4414921)), regression test framework initiated ([4460834](https://skype.visualstudio.com/SCC/_workitems/edit/4460834)).

---

## Risks & Blockers (9 items)

| Item | Team | Blocker |
|------|------|---------|
| [4438570](https://skype.visualstudio.com/SCC/_workitems/edit/4438570) — UED Metric Requirements | Chathra (BI) | Blocked; assigned to Ryan Del Bel — likely waiting on stakeholder input |
| [4446090](https://skype.visualstudio.com/SCC/_workitems/edit/4446090) — Investigate COEP Support for UIO Evaluation | Aysu (Evals) | Blocked; dependency on COEP platform team |
| [4413089](https://skype.visualstudio.com/SCC/_workitems/edit/4413089) — 1CS review to onboard IRSF to Heron | Teele (Fraud) | Blocked on IC3Fraud team (Mihkel Kanarik) for 1CS review approval |
| [4413090](https://skype.visualstudio.com/SCC/_workitems/edit/4413090) — 1CS review to onboard SCoRS to Heron | Teele (Fraud) | Same dependency as above |
| [4414929](https://skype.visualstudio.com/SCC/_workitems/edit/4414929) — 1CS review to onboard IRSF to Heron | Teele (Fraud) | Duplicate/related to 4413089 |
| [4423498](https://skype.visualstudio.com/SCC/_workitems/edit/4423498) — Models Fast Delivery Finalizer (PROD) | Oliver (CQ&R) | Blocked; DEV version closed in Feb but PROD deployment stuck |
| [4395677](https://skype.visualstudio.com/SCC/_workitems/edit/4395677) — Fix discrepancies between telemetry pipelines for web | Oliver (CQ&R) | Blocked epic |
| [4248901](https://skype.visualstudio.com/SCC/_workitems/edit/4248901) — Mapping Web, CQD, SCR metrics | Oliver (CQ&R) | Long-standing blocked item |
| [4452864](https://skype.visualstudio.com/SCC/_workitems/edit/4452864) — Security Review for IC3-AIIM-Fraud | Cross-team | Security review meeting was scheduled for Feb 25 |
| [4456553](https://skype.visualstudio.com/SCC/_workitems/edit/4456553) — Rewrite IRSF ongoing calls duration logic | Cross-team | Blocked; data delay issues |

---

## Next Steps (March 2026)

1. **CQ&R** — Unblock Models Fast Delivery PROD Finalizer ([4423498](https://skype.visualstudio.com/SCC/_workitems/edit/4423498)), continue tenant alerting workstream (scoring, troubleshooting, dashboard), advance threshold forecasting ([4395521](https://skype.visualstudio.com/SCC/_workitems/edit/4395521)), and resolve web telemetry discrepancy blocker ([4395677](https://skype.visualstudio.com/SCC/_workitems/edit/4395677)).
2. **AAF** — Complete P1 monitoring metrics ([4416193](https://skype.visualstudio.com/SCC/_workitems/edit/4416193)), finish TCR dashboard in Neuron Analytics ([4364180](https://skype.visualstudio.com/SCC/_workitems/edit/4364180)), continue BRB metrics experiment ([4158996](https://skype.visualstudio.com/SCC/_workitems/edit/4158996)).
3. **Fraud** — Deploy XGBoost model on randomly-sampled data ([4452948](https://skype.visualstudio.com/SCC/_workitems/edit/4452948)), build ACS AD model PSTN blocking ([4457860](https://skype.visualstudio.com/SCC/_workitems/edit/4457860)), unblock Heron 1CS reviews, complete the SCoRS automated training pipeline ([4406215](https://skype.visualstudio.com/SCC/_workitems/edit/4406215)).
4. **Evals** — Expand DSAT triage across Chat, Meeting Prep, and Meeting Recap ([4444627](https://skype.visualstudio.com/SCC/_workitems/edit/4444627), [4444623](https://skype.visualstudio.com/SCC/_workitems/edit/4444623), [4444626](https://skype.visualstudio.com/SCC/_workitems/edit/4444626)), build Collective IQ evalsets ([4446074](https://skype.visualstudio.com/SCC/_workitems/edit/4446074)), extend QUEST to close the DSAT→EVAL→SEVAL loop ([4453165](https://skype.visualstudio.com/SCC/_workitems/edit/4453165)).
5. **BI** — Deliver IC3 Data Hub v0, progress on AI Interpreter & COGS Council features ([4438573](https://skype.visualstudio.com/SCC/_workitems/edit/4438573), [4438585](https://skype.visualstudio.com/SCC/_workitems/edit/4438585)), unblock UED Metric Requirements.
6. **Security** — M365 Custom Job Deprecation for ADO AML pipelines due ([4456959](https://skype.visualstudio.com/SCC/_workitems/edit/4456959)), security review initiation for IC3-AIIM-Fraud due March 21 ([4413103](https://skype.visualstudio.com/SCC/_workitems/edit/4413103)), Technical Excellence presentation due March 20 ([4456491](https://skype.visualstudio.com/SCC/_workitems/edit/4456491)).
7. **Synapse 3.5 migration** — March 31 deadline; adhoc pool created, remaining workloads need to migrate.

