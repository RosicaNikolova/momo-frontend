import "./RecentChanges.css";

export default function RecentChanges({ baseline, lastWeek, difference }) {
  return (
    <>
      <h3 className="recent-title">Recent changes</h3>
      <div className="recent-card">
      <div className="recent-grid">

        <div className="recent-item">
          <h4>Baseline</h4>
          <div className="dial-black">{baseline}</div>
        </div>

        <div className="recent-item">
          <h4>Last week</h4>
          <div className="dial-purple">{lastWeek}</div>
        </div>

      </div>

      <p className="recent-diff">
        The time in bed of the resident has <strong>decreased</strong> by  
        <br />
        <span className="diff-value">▼ {difference}</span>
      </p>
    </div>
    </>
  );
}
