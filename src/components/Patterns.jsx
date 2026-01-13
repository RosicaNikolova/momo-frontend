import { useState } from "react";
import InfoSection from "./InfoSection";
import "./Patterns.css";

export default function Patterns({ events, baseline }) {
  const timeToHours = (timeStr) => {
    if (!timeStr) return 0;
    if (typeof timeStr !== 'string') return 0;

    // Handle "Xh Ymin" format
    let match = timeStr.match(/(\d+)h\s*(\d+)?min/);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const mins = parseInt(match[2]) || 0;
      return hours + mins / 60;
    }

    // Handle "Xmin" format (minutes only)
    match = timeStr.match(/(\d+)min/);
    if (match) {
      const mins = parseInt(match[1]) || 0;
      return mins / 60;
    }

    // Handle "Xh" format (hours only)
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

    if (diff > 0) return "higher"; // Orange for higher than baseline
    if (diff < 0) return "lower";  // Blue for lower than baseline
    return ""; // No color if equal
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
      <InfoSection
        title="Patterns & Anomalies"
        description="Shows specific dates when the resident’s behavior patterns changed significantly or anomalies occurred"
      >
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
                    {formatDate(evt.date)} : Baseline Changed to
                    <span className={`anomaly-value ${getAnomalyColor(evt.value)}`}>{evt.value || '—'}</span>
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
      </InfoSection>
    </>
  );
}
