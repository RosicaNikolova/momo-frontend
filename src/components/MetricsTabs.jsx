import "./MetricsTabs.css";

export default function MetricsTabs({ selected, onChange }) {
  const tabs = [
    { id: "timeInBed", label: "Time in bed" },
    { id: "highActivity", label: "High activity" },
    { id: "lowActivity", label: "Low activity" }
  ];

  return (
    <div className="metrics-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`metric-tab ${selected === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
