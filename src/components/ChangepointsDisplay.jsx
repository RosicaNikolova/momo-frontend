import React, { useState, useEffect } from 'react';
import { getChangepointsData } from '../services/changepointsService.js';
import { METRIC_TYPES } from '../utils/api.js';
import { METRIC_DISPLAY_NAMES } from '../types/api.js';
import './ChangepointsDisplay.css';

/**
 * Component for displaying changepoints data for a resident
 */
const ChangepointsDisplay = ({ metric = METRIC_TYPES.TIME_IN_BED }) => {
    const [changepointsData, setChangepointsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState(metric);

    // Hardcoded resident ID - change this value as needed
    const HARDCODED_RESIDENT_ID = 1;

    /**
     * Fetch changepoints data from the API
     */
    const fetchChangepointsData = async (metricType) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getChangepointsData(metricType, HARDCODED_RESIDENT_ID);
            setChangepointsData(data);
        } catch (err) {
            setError(err.message);
            setChangepointsData(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts or metric changes
    useEffect(() => {
        fetchChangepointsData(selectedMetric);
    }, [selectedMetric]);

    const handleMetricChange = (e) => {
        setSelectedMetric(e.target.value);
    };

    const handleRefresh = () => {
        fetchChangepointsData(selectedMetric);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="changepoints-display">
            <div className="changepoints-controls">
                <h2>Pattern Shifts Detected</h2>
                <p className="changepoints-explanation">
                    Shows specific dates when the resident's behavior patterns changed significantly.
                    These shifts may indicate health events, medication changes, or care adjustments needed.
                </p>

                <div className="controls-row">
                    <div className="control-group">
                        <label htmlFor="changepoints-metric-select">Metric:</label>
                        <select
                            id="changepoints-metric-select"
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

            <div className="changepoints-content">
                {loading && (
                    <div className="loading">
                        <p>Loading changepoints data...</p>
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

                {changepointsData && !loading && (
                    <div className="changepoints-data">
                        <div className="changepoints-header">
                            <h3>{METRIC_DISPLAY_NAMES[selectedMetric]} - Resident #{changepointsData.resident_id}</h3>
                        </div>

                        <div className="changepoints-summary">
                            <div className="summary-item">
                                <label>Change Points Detected:</label>
                                <span className="summary-value">{changepointsData.n_change_points}</span>
                            </div>
                        </div>

                        {changepointsData.n_change_points > 0 && (
                            <div className="changepoints-list">
                                <h4>Change Points Details</h4>
                                <div className="changepoints-grid">
                                    {changepointsData.change_point_dates.map((date, index) => (
                                        <div key={index} className="changepoint-item">
                                            <div className="changepoint-number">#{index + 1}</div>
                                            <div className="changepoint-details">
                                                <div className="changepoint-date">
                                                    {formatDate(date)}
                                                </div>
                                                <div className="changepoint-value">
                                                    {changepointsData.change_point_values[index]}
                                                </div>
                                                <div className="changepoint-index">
                                                    Index: {changepointsData.change_point_indices[index]}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="changepoints-description">
                            <p>{changepointsData.description}</p>
                        </div>
                    </div>
                )}

                {!changepointsData && !loading && !error && (
                    <div className="no-data">
                        <p>No changepoints data available. Select a metric to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangepointsDisplay;