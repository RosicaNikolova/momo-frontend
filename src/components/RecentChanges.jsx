import InfoSection from "./InfoSection";
import "./RecentChanges.css";

export default function RecentChanges({ baseline, lastWeek, difference, description }) {
  const toHours = (value) => {
    if (!value) return 0;
    const match = String(value).match(/(\d+)\s*h\s*(\d+)?/i);
    if (!match) return 0;
    const h = parseInt(match[1], 10) || 0;
    const m = parseInt(match[2] || '0', 10) || 0;
    return h + m / 60;
  };

  const Dial = ({ value, variant }) => {
    const hours = toHours(value);
    const frac = Math.max(0, Math.min(1, hours / 24));
    const r = 44;
    const C = 2 * Math.PI * r;
    const dash = `${(C * frac).toFixed(2)} ${C.toFixed(2)}`;
    const stroke = variant === 'black' ? 'rgba(0,0,0,0.65)' : '#b84ecb';
    const label = variant === 'black' ? 'Baseline' : 'Last week';
    return (
      <div className={`dial-${variant}`} role="img" aria-label={`${label}: ${value}`}>
        <svg className="dial-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="dial-track" cx="50" cy="50" r={r} />
          <circle
            className="dial-progress"
            cx="50"
            cy="50"
            r={r}
            stroke={stroke}
            strokeDasharray={dash}
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="dial-text">{value}</span>
      </div>
    );
  };

  const trendText = (description || '').toLowerCase();
  const isDecrease = trendText.includes('decreas');
  const isIncrease = trendText.includes('increas');
  const arrow = isDecrease ? '▼' : isIncrease ? '▲' : '';
  const diffClass = isDecrease ? 'down' : isIncrease ? 'up' : '';

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
    <InfoSection 
      title="Recent changes" 
      description="This component shows the recent changes in the metric compared to the baseline."
    >
      <div className="recent-grid">

          <div className="recent-item">
            <h4>Baseline</h4>
            <Dial value={baseline} variant="black" />
          </div>

          <div className="recent-item">
            <h4>Last week</h4>
            <Dial value={lastWeek} variant="purple" />
          </div>

        </div>

        <p className="recent-diff">
          {emphasize(capitalizedText)}
          <br />
          <span className={`diff-value ${diffClass}`}>{arrow} {difference}</span>
        </p>
    </InfoSection>
  );
}
