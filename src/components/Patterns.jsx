import "./Patterns.css";

export default function Patterns({ events }) {
  return (
    <>
      <h3 className="timeline-title">Patterns & Anomalies</h3>
      <div className="timeline-card">
      <div className="timeline">
        {events.map((evt, index) => (
          <div className="timeline-item" key={index}>
            <div className={`timeline-dot ${evt.type}`}></div>

            <div className="timeline-content">
              {evt.type === "shift" ? (
                <strong>Pattern shifted on {evt.date}</strong>
              ) : (
                <span>{evt.date} : {evt.duration}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
