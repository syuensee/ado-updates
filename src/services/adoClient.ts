import type { QueryParams, WorkItem } from "../types";

const ADO_API_VERSION = "7.1";

function buildHeaders(pat: string): HeadersInit {
  const encoded = btoa(`:${pat}`);
  return {
    Authorization: `Basic ${encoded}`,
    "Content-Type": "application/json",
  };
}

function buildBaseUrl(org: string, project: string): string {
  return `https://dev.azure.com/${org}/${project}`;
}

/**
 * Executes a WIQL query against Azure DevOps and returns full work item details.
 */
export async function queryWorkItems(
  params: QueryParams
): Promise<WorkItem[]> {
  const { organization, project, pat, dateFrom, dateTo, teamOrArea, workItemTypes } = params;
  const baseUrl = buildBaseUrl(organization, project);
  const headers = buildHeaders(pat);

  const typeFilter =
    workItemTypes && workItemTypes.length > 0
      ? `AND [System.WorkItemType] IN (${workItemTypes.map((t) => `'${t}'`).join(", ")})`
      : "";

  const areaFilter = teamOrArea
    ? `AND [System.AreaPath] UNDER '${teamOrArea}'`
    : "";

  // Fetch items changed within the date range
  const wiql = `
    SELECT [System.Id]
    FROM WorkItems
    WHERE [System.ChangedDate] >= '${dateFrom}'
      AND [System.ChangedDate] <= '${dateTo}'
      ${typeFilter}
      ${areaFilter}
    ORDER BY [System.ChangedDate] DESC
  `;

  const queryResponse = await fetch(
    `${baseUrl}/_apis/wit/wiql?api-version=${ADO_API_VERSION}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query: wiql }),
    }
  );

  if (!queryResponse.ok) {
    const errorText = await queryResponse.text();
    throw new Error(`WIQL query failed (${queryResponse.status}): ${errorText}`);
  }

  const queryResult = await queryResponse.json();
  const ids: number[] = queryResult.workItems?.map(
    (wi: { id: number }) => wi.id
  ) ?? [];

  if (ids.length === 0) return [];

  return fetchWorkItemDetails(baseUrl, headers, ids);
}

/**
 * Fetches full details for a list of work item IDs (batched in groups of 200).
 */
async function fetchWorkItemDetails(
  baseUrl: string,
  headers: HeadersInit,
  ids: number[]
): Promise<WorkItem[]> {
  const fields = [
    "System.Id",
    "System.Title",
    "System.State",
    "System.WorkItemType",
    "System.AssignedTo",
    "System.CreatedDate",
    "Microsoft.VSTS.Common.ClosedDate",
    "System.Tags",
    "System.AreaPath",
    "System.IterationPath",
    "Microsoft.VSTS.Scheduling.StoryPoints",
    "Microsoft.VSTS.Common.Priority",
  ].join(",");

  const batchSize = 200;
  const allItems: WorkItem[] = [];

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const idsParam = batch.join(",");

    const response = await fetch(
      `${baseUrl}/_apis/wit/workitems?ids=${idsParam}&fields=${fields}&api-version=${ADO_API_VERSION}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch work item details: ${response.status}`);
    }

    const data = await response.json();
    const items = data.value.map(mapWorkItem);
    allItems.push(...items);
  }

  return allItems;
}

function mapWorkItem(raw: Record<string, unknown>): WorkItem {
  const fields = raw.fields as Record<string, unknown>;
  const assignedTo = fields["System.AssignedTo"] as
    | { displayName: string }
    | undefined;

  return {
    id: fields["System.Id"] as number,
    title: fields["System.Title"] as string,
    state: fields["System.State"] as string,
    type: fields["System.WorkItemType"] as string,
    assignedTo: assignedTo?.displayName ?? "Unassigned",
    createdDate: fields["System.CreatedDate"] as string,
    closedDate: (fields["Microsoft.VSTS.Common.ClosedDate"] as string) ?? null,
    tags: ((fields["System.Tags"] as string) ?? "")
      .split(";")
      .map((t) => t.trim())
      .filter(Boolean),
    areaPath: fields["System.AreaPath"] as string,
    iterationPath: fields["System.IterationPath"] as string,
    storyPoints:
      (fields["Microsoft.VSTS.Scheduling.StoryPoints"] as number) ?? null,
    priority: (fields["Microsoft.VSTS.Common.Priority"] as number) ?? null,
  };
}
