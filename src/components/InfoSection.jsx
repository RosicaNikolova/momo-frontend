import { useState } from "react";
import "./InfoSection.css";

export default function InfoSection({ title, description, children }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <button 
          className={`info-button ${showInfo ? 'active' : ''}`}
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Show information"
          title="Show information"
        >
          ?
        </button>
      </div>
      <div className="section-card">
        {showInfo && (
          <div className="info-overlay">
            <p>{description}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
