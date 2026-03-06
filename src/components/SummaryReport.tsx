import type { MonthlySummary } from "../types";
import { formatSummaryAsMarkdown } from "../services/summaryGenerator";

interface SummaryReportProps {
  summary: MonthlySummary;
}

export function SummaryReport({ summary }: SummaryReportProps) {
  function handleCopyMarkdown() {
    const md = formatSummaryAsMarkdown(summary);
    navigator.clipboard.writeText(md);
  }

  return (
    <div className="summary-report">
      <div className="summary-header">
        <h2>
          Summary: {summary.period.from} — {summary.period.to}
        </h2>
        <button onClick={handleCopyMarkdown} className="copy-btn">
          📋 Copy as Markdown
        </button>
      </div>

      {/* Highlights */}
      <section className="highlights">
        <h3>Highlights</h3>
        <ul>
          {summary.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      {/* Overview metrics */}
      <section className="overview-grid">
        <MetricCard label="Total Items" value={summary.totalItems} />
        <MetricCard label="Completed" value={summary.completedItems.length} />
        <MetricCard label="In Progress" value={summary.inProgressItems.length} />
        <MetricCard label="Story Points" value={summary.storyPointsCompleted} />
      </section>

      {/* By type */}
      <section>
        <h3>By Work Item Type</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary.byType).map(([type, count]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* By assignee */}
      <section>
        <h3>By Assignee</h3>
        <table>
          <thead>
            <tr>
              <th>Assignee</th>
              <th>Completed</th>
              <th>In Progress</th>
              <th>New</th>
              <th>Story Pts</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary.byAssignee).map(([name, stats]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{stats.completed}</td>
                <td>{stats.inProgress}</td>
                <td>{stats.new}</td>
                <td>{stats.storyPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Completed items */}
      {summary.completedItems.length > 0 && (
        <section>
          <h3>Completed Items ({summary.completedItems.length})</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Title</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {summary.completedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric-card">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
