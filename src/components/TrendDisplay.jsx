import React, { useState, useEffect } from 'react';
import { getTrendData } from '../services/trendService.js';
import { METRIC_TYPES } from '../utils/api.js';
import { METRIC_DISPLAY_NAMES } from '../types/api.js';
import './TrendDisplay.css';

/**
 * Component for displaying trend data for a resident
 */
const TrendDisplay = ({ metric = METRIC_TYPES.TIME_IN_BED }) => {
    const [trendData, setTrendData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState(metric);

    // Hardcoded resident ID - change this value as needed
    const HARDCODED_RESIDENT_ID = 1;

    /**
     * Fetch trend data from the API
     */
    const fetchTrendData = async (metricType) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getTrendData(metricType, HARDCODED_RESIDENT_ID);
            setTrendData(data);
        } catch (err) {
            setError(err.message);
            setTrendData(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts or metric changes
    useEffect(() => {
        fetchTrendData(selectedMetric);
    }, [selectedMetric]);

    const handleMetricChange = (e) => {
        setSelectedMetric(e.target.value);
    };

    const handleRefresh = () => {
        fetchTrendData(selectedMetric);
    };

    return (
        <div className="trend-display">
            <div className="trend-controls">
                <h2>Recent Changes </h2>
                <p className="trend-explanation">
                    Compare how the resident's patterns have changed in the past week compared to their normal baseline.
                    This helps identify if care adjustments may be needed.
                </p>

                <div className="controls-row">
                    <div className="control-group">
                        <label htmlFor="metric-select">Metric:</label>
                        <select
                            id="metric-select"
                            value={selectedMetric}
                            onChange={handleMetricChange}
                            className="metric-select"
                        >
                            {Object.entries(METRIC_TYPES).map(([key, value]) => (
                                <option key={value} value={value}>
                                    {METRIC_DISPLAY_NAMES[value] || value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>

            <div className="trend-content">
                {loading && (
                    <div className="loading">
                        <p>Loading trend data...</p>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <h3>Error</h3>
                        <p>{error}</p>
                        <button onClick={handleRefresh} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                )}

                {trendData && !loading && (
                    <div className="trend-data">
                        <div className="trend-header">
                            <h3>{METRIC_DISPLAY_NAMES[selectedMetric]} - Resident #{trendData.resident_id}</h3>
                        </div>

                        <div className="trend-stats">
                            <div className="stat-item">
                                <label>Baseline:</label>
                                <span className="stat-value">{trendData.baseline_hours}</span>
                            </div>

                            <div className="stat-item">
                                <label>Last 7 Days:</label>
                                <span className="stat-value">{trendData.last_7_days_hours}</span>
                            </div>

                            <div className="stat-item">
                                <label>Difference:</label>
                                <span className="stat-value difference">{trendData.difference_hours}</span>
                            </div>
                        </div>

                        <div className="trend-description">
                            <p>{trendData.description}</p>
                        </div>
                    </div>
                )}

                {!trendData && !loading && !error && (
                    <div className="no-data">
                        <p>No trend data available. Select a metric to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendDisplay;