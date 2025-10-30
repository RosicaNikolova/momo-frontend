import React, { useState, useEffect } from 'react';
import { getAnomaliesData } from '../services/anomaliesService.js';
import { METRIC_TYPES } from '../utils/api.js';
import { METRIC_DISPLAY_NAMES } from '../types/api.js';
import './AnomaliesDisplay.css';

/**
 * Component for displaying anomalies data for a resident
 */
const AnomaliesDisplay = ({ metric = METRIC_TYPES.TIME_IN_BED }) => {
    const [anomaliesData, setAnomaliesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState(metric);

    // Hardcoded resident ID - change this value as needed
    const HARDCODED_RESIDENT_ID = 1;

    /**
     * Fetch anomalies data from the API
     */
    const fetchAnomaliesData = async (metricType) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAnomaliesData(metricType, HARDCODED_RESIDENT_ID);
            setAnomaliesData(data);
        } catch (err) {
            setError(err.message);
            setAnomaliesData(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts or metric changes
    useEffect(() => {
        fetchAnomaliesData(selectedMetric);
    }, [selectedMetric]);

    const handleMetricChange = (e) => {
        setSelectedMetric(e.target.value);
    };

    const handleRefresh = () => {
        fetchAnomaliesData(selectedMetric);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getAnomalyType = (value) => {
        // Simple heuristic to categorize anomalies based on value
        const numericValue = parseFloat(value.replace('h', '').replace('min', ''));
        if (numericValue > 20) return 'high';
        if (numericValue < 14) return 'low';
        return 'moderate';
    };

    const getAnomalyIcon = (value) => {
        const type = getAnomalyType(value);
        if (type === 'high') return '!';
        if (type === 'low') return '!';
        return '•'; // Use a dot instead of exclamation mark for moderate
    };

    return (
        <div className="anomalies-display">
            <div className="anomalies-controls">
                <h2>Anomalies Detected </h2>
                <p className="anomalies-explanation">
                    Identifies days when the resident's behavior was significantly different from their normal patterns.
                    These alerts help spot potential health concerns or environmental factors affecting the resident.
                </p>

                <div className="controls-row">
                    <div className="control-group">
                        <label htmlFor="anomalies-metric-select">Metric:</label>
                        <select
                            id="anomalies-metric-select"
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

            <div className="anomalies-content">
                {loading && (
                    <div className="loading">
                        <p>Loading anomalies data...</p>
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

                {anomaliesData && !loading && (
                    <div className="anomalies-data">
                        <div className="anomalies-header">
                            <h3>{METRIC_DISPLAY_NAMES[selectedMetric]} - Resident #{anomaliesData.resident_id}</h3>
                        </div>

                        <div className="anomalies-summary">
                            <div className="summary-item">
                                <label>Anomalies Detected:</label>
                                <span className="summary-value">{anomaliesData.n_anomalies}</span>
                            </div>
                        </div>

                        {anomaliesData.n_anomalies > 0 && (
                            <div className="anomalies-list">
                                <h4>Anomalies Details</h4>
                                <div className="anomalies-grid">
                                    {anomaliesData.anomaly_dates.map((date, index) => (
                                        <div key={index} className={`anomaly-item ${getAnomalyType(anomaliesData.anomaly_values[index])}`}>
                                            <div className="anomaly-indicator">
                                                {getAnomalyType(anomaliesData.anomaly_values[index]) !== 'moderate' && (
                                                    <div className="anomaly-icon">{getAnomalyIcon(anomaliesData.anomaly_values[index])}</div>
                                                )}
                                            </div>
                                            <div className="anomaly-details">
                                                <div className="anomaly-date">
                                                    {formatDate(date)}
                                                </div>
                                                <div className="anomaly-value">
                                                    {anomaliesData.anomaly_values[index]}
                                                </div>
                                                <div className="anomaly-index">
                                                    Index: {anomaliesData.anomaly_indices[index]}
                                                </div>
                                            </div>
                                            <div className="anomaly-type">
                                                {getAnomalyType(anomaliesData.anomaly_values[index])}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="anomalies-description">
                            <p>{anomaliesData.description}</p>
                        </div>
                    </div>
                )}

                {!anomaliesData && !loading && !error && (
                    <div className="no-data">
                        <p>No anomalies data available. Select a metric to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnomaliesDisplay;