import { apiGet, METRIC_TYPES } from '../utils/api.js';

/**
 * Service for interacting with the insights/anomalies endpoint
 */
export class AnomaliesService {
    /**
     * Fetch anomalies data for a specific metric and resident
     * @param {string} metric - The metric type (must be one of METRIC_TYPES)
     * @param {number} residentId - The resident ID
     * @returns {Promise<AnomaliesData>} The anomalies data response
     * @throws {Error} If metric is invalid or API call fails
     */
    static async getAnomaliesData(metric, residentId) {
        // Validate metric type
        const validMetrics = Object.values(METRIC_TYPES);
        if (!validMetrics.includes(metric)) {
            throw new Error(`Invalid metric: ${metric}. Valid metrics are: ${validMetrics.join(', ')}`);
        }

        // Validate resident ID
        if (!residentId || isNaN(residentId)) {
            throw new Error('Invalid resident ID. Must be a valid number.');
        }

        const endpoint = `/api/insights/anomalies/${metric}/${residentId}`;

        try {
            const data = await apiGet(endpoint);
            return data;
        } catch (error) {
            // The axios interceptor already handles error formatting
            // Just re-throw the error with additional context if needed
            if (error.message.includes('400') || error.message.includes('Invalid request')) {
                throw new Error(`Invalid metric "${metric}" or resident ID "${residentId}". Please check your inputs.`);
            }
            throw error;
        }
    }

    /**
     * Get available metric types
     * @returns {object} Object containing all available metric types
     */
    static getAvailableMetrics() {
        return METRIC_TYPES;
    }
}

/**
 * Convenience function to get anomalies data
 * @param {string} metric - The metric type
 * @param {number} residentId - The resident ID
 * @returns {Promise<AnomaliesData>} The anomalies data response
 */
export const getAnomaliesData = (metric, residentId) => {
    return AnomaliesService.getAnomaliesData(metric, residentId);
};