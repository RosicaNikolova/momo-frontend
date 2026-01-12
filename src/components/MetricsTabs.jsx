import "./MetricsTabs.css";

export default function MetricsTabs({ selected, onChange }) {
  const tabs = [
    { id: "timeInBed", label: "Time in bed" },
    { id: "highActivity", label: "High activity" },
    { id: "lowActivity", label: "Low activity" },
    { id: "atRest", label: "At Rest" }

  ];

  return (
    <div className="metrics-tabs" role="tablist" aria-label="Metrics selection">
      {tabs.map(tab => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          aria-selected={selected === tab.id}
          aria-pressed={selected === tab.id}
          className={`metric-tab ${selected === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
