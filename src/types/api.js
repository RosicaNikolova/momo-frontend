/**
 * @typedef {Object} TrendData
 * @property {number} resident_id - The resident ID
 * @property {string} baseline_hours - Baseline time in "XhYmin" format
 * @property {string} last_7_days_hours - Last 7 days time in "XhYmin" format  
 * @property {string} difference_hours - Difference in "XhYmin" format
 * @property {string} description - Human readable description of the trend
 */

/**
 * @typedef {'time_in_bed' | 'low_activity' | 'high_activity' | 'at_rest' | 'out_of_bed_night' | 'out_of_bed_day'} MetricType
 */

/**
 * @typedef {Object} ChangepointsData
 * @property {number} resident_id - The resident ID
 * @property {string} metric - The metric type
 * @property {number} n_change_points - Number of change points detected
 * @property {number[]} change_point_indices - Array of change point indices
 * @property {string[]} change_point_dates - Array of change point dates in YYYY-MM-DD format
 * @property {string[]} change_point_values - Array of change point values in "XhYmin" format
 * @property {string} description - Human readable description of the changepoints analysis
 */

/**
 * @typedef {Object} AnomaliesData
 * @property {number} resident_id - The resident ID
 * @property {string} metric - The metric type
 * @property {number} n_anomalies - Number of anomalies detected
 * @property {number[]} anomaly_indices - Array of anomaly indices
 * @property {string[]} anomaly_dates - Array of anomaly dates in YYYY-MM-DD format
 * @property {string[]} anomaly_values - Array of anomaly values in "XhYmin" format
 * @property {string} description - Human readable description of the anomalies analysis
 */

/**
 * @typedef {Object} TrendApiError
 * @property {string} message - Error message
 * @property {number} status - HTTP status code
 */

// Export types for usage in other files
export const Types = {};

// Metric type constants for validation
export const VALID_METRICS = [
    'time_in_bed',
    'low_activity',
    'high_activity',
    'at_rest',
    'out_of_bed_night',
    'out_of_bed_day'
];

// Metric display names for UI
export const METRIC_DISPLAY_NAMES = {
    time_in_bed: 'Time in Bed',
    low_activity: 'Low Activity',
    high_activity: 'High Activity',
    at_rest: 'At Rest',
    out_of_bed_night: 'Out of Bed (Night)',
    out_of_bed_day: 'Out of Bed (Day)'
};