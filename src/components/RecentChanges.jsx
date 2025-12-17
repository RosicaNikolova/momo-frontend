import "./RecentChanges.css";

export default function RecentChanges({ baseline, lastWeek, difference, description }) {
  const trendText = (description || '').toLowerCase();
  const isDecrease = trendText.includes('decreas');
  const isIncrease = trendText.includes('increas');
  const arrow = isDecrease ? '▼' : isIncrease ? '▲' : '';
  const diffClass = isDecrease ? 'down' : isIncrease ? 'up' : '';

  // Keep only the text up to the last " by" and bold increase/decrease keyword
  const baseText = description
    ? (() => {
      const lower = description.toLowerCase();
      const byIdx = lower.lastIndexOf(' by');
      return byIdx !== -1 ? description.slice(0, byIdx + 3) : description;
    })()
    : 'Recent change';

  const capitalizedText = baseText
    ? baseText.charAt(0).toUpperCase() + baseText.slice(1)
    : baseText;

  const emphasize = (text) => {
    const match = text.match(/(decreas\w*|increas\w*)/i);
    if (!match) return text;
    const [found] = match;
    const idx = match.index ?? 0;
    return (
      <>
        {text.slice(0, idx)}
        <strong>{found}</strong>
        {text.slice(idx + found.length)}
      </>
    );
  };
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
          {emphasize(capitalizedText)}
          <br />
          <span className={`diff-value ${diffClass}`}>{arrow} {difference}</span>
        </p>
      </div>
    </>
  );
}
