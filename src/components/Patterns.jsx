import "./Patterns.css";

export default function Patterns({ events, baseline }) {
  // Convert time string format "XhYmin" or "X.Xh" to hours (numeric)
  const timeToHours = (timeStr) => {
    if (!timeStr) return 0;
    if (typeof timeStr !== 'string') return 0;

    // Try matching "Xh Ymin" format (e.g., "2h 30min")
    let match = timeStr.match(/(\d+)h\s*(\d+)?min/);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const mins = parseInt(match[2]) || 0;
      return hours + mins / 60;
    }

    // Try matching "X.Xh" format (e.g., "22.5h", "12h")
    match = timeStr.match(/(\d+(?:\.\d+)?)\s*h/);
    if (match) {
      return parseFloat(match[1]) || 0;
    }

    return 0;
  };

  // Get color class for anomaly based on comparison to baseline
  const getAnomalyColor = (anomalyValue) => {
    const baselineHours = timeToHours(baseline);
    const anomalyHours = timeToHours(anomalyValue);
    const diff = anomalyHours - baselineHours;

    if (diff < 0) return "lower";
    if (diff <= 2) return "medium-high";
    return "high";
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "—";
    const dateObj = new Date(isoDate);
    if (Number.isNaN(dateObj.getTime())) return isoDate;
    const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
    return fmt.format(dateObj); // e.g., 10 Jul
  };

  return (
    <>
      <h3 className="timeline-title">Patterns & Anomalies</h3>
      <div className="timeline-card">
        {baseline && (
          <div className="baseline-box">
            <span className="baseline-label">Baseline:</span>
            <span className="baseline-hours">{baseline}</span>
          </div>
        )}
        <div className="timeline">
          {events.map((evt, index) => (
            <div className="timeline-item" key={index}>
              <div className={`timeline-dot ${evt.type}`}></div>

              <div className="timeline-content">
                {evt.type === "shift" ? (
                  <strong title={evt.date}>
                    {formatDate(evt.date)} : Pattern Changed - {evt.value || '—'}
                  </strong>
                ) : (
                  <span title={evt.date}>
                    {formatDate(evt.date)} :
                    <span className={`anomaly-value ${getAnomalyColor(evt.value)}`}>{evt.value || '—'}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
