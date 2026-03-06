export interface AdoConfig {
  organization: string;
  project: string;
  pat: string;
}

export interface WorkItem {
  id: number;
  title: string;
  state: string;
  type: string;
  assignedTo: string;
  createdDate: string;
  closedDate: string | null;
  tags: string[];
  areaPath: string;
  iterationPath: string;
  storyPoints: number | null;
  priority: number | null;
}

export interface QueryParams {
  organization: string;
  project: string;
  pat: string;
  dateFrom: string;
  dateTo: string;
  teamOrArea?: string;
  workItemTypes?: string[];
}

export interface MonthlySummary {
  period: { from: string; to: string };
  totalItems: number;
  byType: Record<string, number>;
  byState: Record<string, number>;
  byAssignee: Record<string, AssigneeSummary>;
  completedItems: WorkItem[];
  newItems: WorkItem[];
  inProgressItems: WorkItem[];
  storyPointsCompleted: number;
  highlights: string[];
}

export interface AssigneeSummary {
  completed: number;
  inProgress: number;
  new: number;
  storyPoints: number;
}
