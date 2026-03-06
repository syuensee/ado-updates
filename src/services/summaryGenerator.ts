import type { WorkItem, MonthlySummary, AssigneeSummary } from "../types";

const DONE_STATES = ["Closed", "Done", "Resolved", "Completed"];
const IN_PROGRESS_STATES = ["Active", "In Progress", "Committed"];

export function generateSummary(
  items: WorkItem[],
  dateFrom: string,
  dateTo: string
): MonthlySummary {
  const byType: Record<string, number> = {};
  const byState: Record<string, number> = {};
  const byAssignee: Record<string, AssigneeSummary> = {};

  const completedItems: WorkItem[] = [];
  const newItems: WorkItem[] = [];
  const inProgressItems: WorkItem[] = [];
  let storyPointsCompleted = 0;

  for (const item of items) {
    // Count by type
    byType[item.type] = (byType[item.type] ?? 0) + 1;

    // Count by state
    byState[item.state] = (byState[item.state] ?? 0) + 1;

    // Initialize assignee
    if (!byAssignee[item.assignedTo]) {
      byAssignee[item.assignedTo] = {
        completed: 0,
        inProgress: 0,
        new: 0,
        storyPoints: 0,
      };
    }

    // Categorize by state
    if (DONE_STATES.includes(item.state)) {
      completedItems.push(item);
      byAssignee[item.assignedTo].completed++;
      if (item.storyPoints) {
        storyPointsCompleted += item.storyPoints;
        byAssignee[item.assignedTo].storyPoints += item.storyPoints;
      }
    } else if (IN_PROGRESS_STATES.includes(item.state)) {
      inProgressItems.push(item);
      byAssignee[item.assignedTo].inProgress++;
    } else {
      newItems.push(item);
      byAssignee[item.assignedTo].new++;
    }
  }

  const highlights = buildHighlights(
    items,
    completedItems,
    storyPointsCompleted,
    byAssignee
  );

  return {
    period: { from: dateFrom, to: dateTo },
    totalItems: items.length,
    byType,
    byState,
    byAssignee,
    completedItems,
    newItems,
    inProgressItems,
    storyPointsCompleted,
    highlights,
  };
}

function buildHighlights(
  allItems: WorkItem[],
  completedItems: WorkItem[],
  storyPointsCompleted: number,
  byAssignee: Record<string, AssigneeSummary>
): string[] {
  const highlights: string[] = [];

  highlights.push(
    `${completedItems.length} of ${allItems.length} items completed`
  );

  if (storyPointsCompleted > 0) {
    highlights.push(`${storyPointsCompleted} story points delivered`);
  }

  // Top contributor
  const topContributor = Object.entries(byAssignee).sort(
    ([, a], [, b]) => b.completed - a.completed
  )[0];
  if (topContributor && topContributor[1].completed > 0) {
    highlights.push(
      `Top contributor: ${topContributor[0]} (${topContributor[1].completed} items)`
    );
  }

  // High-priority completed items
  const highPriCompleted = completedItems.filter(
    (i) => i.priority !== null && i.priority <= 2
  );
  if (highPriCompleted.length > 0) {
    highlights.push(
      `${highPriCompleted.length} high-priority items completed`
    );
  }

  return highlights;
}

/**
 * Formats the summary as a markdown string for easy copy/paste.
 */
export function formatSummaryAsMarkdown(summary: MonthlySummary): string {
  const lines: string[] = [];

  lines.push(`# Monthly Summary: ${summary.period.from} — ${summary.period.to}`);
  lines.push("");

  // Highlights
  lines.push("## Highlights");
  for (const h of summary.highlights) {
    lines.push(`- ${h}`);
  }
  lines.push("");

  // Overview
  lines.push("## Overview");
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total items | ${summary.totalItems} |`);
  lines.push(`| Completed | ${summary.completedItems.length} |`);
  lines.push(`| In progress | ${summary.inProgressItems.length} |`);
  lines.push(`| New / Other | ${summary.newItems.length} |`);
  lines.push(`| Story points delivered | ${summary.storyPointsCompleted} |`);
  lines.push("");

  // By type
  lines.push("## By Work Item Type");
  lines.push(`| Type | Count |`);
  lines.push(`|------|-------|`);
  for (const [type, count] of Object.entries(summary.byType)) {
    lines.push(`| ${type} | ${count} |`);
  }
  lines.push("");

  // By assignee
  lines.push("## By Assignee");
  lines.push(`| Assignee | Completed | In Progress | New | Story Points |`);
  lines.push(`|----------|-----------|-------------|-----|--------------|`);
  for (const [name, stats] of Object.entries(summary.byAssignee)) {
    lines.push(
      `| ${name} | ${stats.completed} | ${stats.inProgress} | ${stats.new} | ${stats.storyPoints} |`
    );
  }
  lines.push("");

  // Completed items
  if (summary.completedItems.length > 0) {
    lines.push("## Completed Items");
    lines.push(`| ID | Type | Title | Assigned To |`);
    lines.push(`|----|------|-------|-------------|`);
    for (const item of summary.completedItems) {
      lines.push(
        `| ${item.id} | ${item.type} | ${item.title} | ${item.assignedTo} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}
