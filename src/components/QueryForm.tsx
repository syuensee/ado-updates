import { useState } from "react";
import type { QueryParams } from "../types";

interface QueryFormProps {
  onSubmit: (params: QueryParams) => void;
  loading: boolean;
}

const WORK_ITEM_TYPES = [
  "User Story",
  "Bug",
  "Task",
  "Feature",
  "Epic",
  "Issue",
];

export function QueryForm({ onSubmit, loading }: QueryFormProps) {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [organization, setOrganization] = useState(
    () => localStorage.getItem("ado_org") ?? ""
  );
  const [project, setProject] = useState(
    () => localStorage.getItem("ado_project") ?? ""
  );
  const [pat, setPat] = useState(
    () => localStorage.getItem("ado_pat") ?? ""
  );
  const [dateFrom, setDateFrom] = useState(formatDate(firstOfMonth));
  const [dateTo, setDateTo] = useState(formatDate(lastOfMonth));
  const [teamOrArea, setTeamOrArea] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Persist connection settings (not PAT in production!)
    localStorage.setItem("ado_org", organization);
    localStorage.setItem("ado_project", project);
    localStorage.setItem("ado_pat", pat);

    onSubmit({
      organization,
      project,
      pat,
      dateFrom,
      dateTo,
      teamOrArea: teamOrArea || undefined,
      workItemTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
    });
  }

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  return (
    <form onSubmit={handleSubmit} className="query-form">
      <h2>ADO Query</h2>

      <fieldset>
        <legend>Connection</legend>
        <label>
          Organization
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="my-org"
            required
          />
        </label>
        <label>
          Project
          <input
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="my-project"
            required
          />
        </label>
        <label>
          Personal Access Token
          <input
            type="password"
            value={pat}
            onChange={(e) => setPat(e.target.value)}
            placeholder="PAT with Work Items (Read) scope"
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Date Range</legend>
        <label>
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </label>
        <label>
          To
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Filters (Optional)</legend>
        <label>
          Team / Area Path
          <input
            type="text"
            value={teamOrArea}
            onChange={(e) => setTeamOrArea(e.target.value)}
            placeholder="Project\Team"
          />
        </label>

        <div className="type-filters">
          <span>Work Item Types:</span>
          {WORK_ITEM_TYPES.map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={loading}>
        {loading ? "Querying…" : "Generate Summary"}
      </button>
    </form>
  );
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
