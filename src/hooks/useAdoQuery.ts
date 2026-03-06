import { useState, useCallback } from "react";
import type { QueryParams, MonthlySummary, WorkItem } from "../types";
import { queryWorkItems } from "../services/adoClient";
import { generateSummary } from "../services/summaryGenerator";

interface UseAdoQueryResult {
  summary: MonthlySummary | null;
  rawItems: WorkItem[];
  loading: boolean;
  error: string | null;
  runQuery: (params: QueryParams) => Promise<void>;
}

export function useAdoQuery(): UseAdoQueryResult {
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [rawItems, setRawItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runQuery = useCallback(async (params: QueryParams) => {
    setLoading(true);
    setError(null);
    setSummary(null);
    setRawItems([]);

    try {
      const items = await queryWorkItems(params);
      setRawItems(items);
      const result = generateSummary(items, params.dateFrom, params.dateTo);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { summary, rawItems, loading, error, runQuery };
}
