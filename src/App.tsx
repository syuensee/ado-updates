import "./App.css";
import { QueryForm } from "./components/QueryForm";
import { SummaryReport } from "./components/SummaryReport";
import { useAdoQuery } from "./hooks/useAdoQuery";

function App() {
  const { summary, loading, error, runQuery } = useAdoQuery();

  return (
    <div className="app">
      <header>
        <h1>ADO Monthly Report</h1>
        <p className="subtitle">
          Generate monthly summaries from Azure DevOps work items
        </p>
      </header>

      <main>
        <QueryForm onSubmit={runQuery} loading={loading} />

        {error && (
          <div className="error-banner" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {summary && <SummaryReport summary={summary} />}
      </main>
    </div>
  );
}

export default App;
