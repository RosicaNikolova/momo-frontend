import "./Patterns.css";

export default function Patterns({ events, baseline }) {
  const timeToHours = (timeStr) => {
    if (!timeStr) return 0;
    if (typeof timeStr !== 'string') return 0;

    
    let match = timeStr.match(/(\d+)h\s*(\d+)?min/);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const mins = parseInt(match[2]) || 0;
      return hours + mins / 60;
    }

    
    match = timeStr.match(/(\d+(?:\.\d+)?)\s*h/);
    if (match) {
      return parseFloat(match[1]) || 0;
    }

    return 0;
  };

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
    return fmt.format(dateObj);
  };

  return (
    <>
      <h3 className="timeline-title">Patterns & Anomalies</h3>
      <div className="timeline-card">
        {baseline && (
          <div className="baseline-box" aria-label={`Baseline: ${baseline}`}>
            <span className="baseline-label">Baseline:</span>
            <span className="baseline-hours">{baseline}</span>
          </div>
        )}
        <div className="timeline">
          {events.map((evt, index) => (
            <div
              className="timeline-item"
              key={index}
              role="article"
              aria-label={`${formatDate(evt.date)} ${evt.type === 'shift' ? 'Pattern changed' : 'Anomaly'}: ${evt.value || '—'}`}
            >
              <div className={`timeline-dot ${evt.type}`} aria-hidden="true"></div>

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
