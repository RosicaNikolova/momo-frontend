import axios from 'axios';

// API configuration
export const API_BASE_URL = 'http://127.0.0.1:8000';

// Metric types available in the API
export const METRIC_TYPES = {
    TIME_IN_BED: 'time_in_bed',
    LOW_ACTIVITY: 'low_activity',
    HIGH_ACTIVITY: 'high_activity',
    AT_REST: 'at_rest',
    OUT_OF_BED_NIGHT: 'out_of_bed_night',
    OUT_OF_BED_DAY: 'out_of_bed_day'
};

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error(`API Error ${error.response.status}:`, error.response.data);

            // Handle specific error codes
            if (error.response.status === 400) {
                throw new Error(`Invalid request: ${error.response.data?.detail || 'Bad request'}`);
            } else if (error.response.status === 404) {
                throw new Error('Endpoint not found');
            } else if (error.response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            }

            throw new Error(`HTTP ${error.response.status}: ${error.response.data?.detail || error.message}`);
        } else if (error.request) {
            // Network error
            console.error('Network error:', error.request);
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            // Something else happened
            console.error('Request setup error:', error.message);
            throw new Error(`Request failed: ${error.message}`);
        }
    }
);

// Helper function to make API requests
export const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await apiClient({
            url: endpoint,
            ...options,
        });

        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Convenience methods for different HTTP verbs
export const apiGet = (endpoint, config = {}) => {
    return apiRequest(endpoint, { method: 'GET', ...config });
};

export const apiPost = (endpoint, data, config = {}) => {
    return apiRequest(endpoint, { method: 'POST', data, ...config });
};

export const apiPut = (endpoint, data, config = {}) => {
    return apiRequest(endpoint, { method: 'PUT', data, ...config });
};

export const apiDelete = (endpoint, config = {}) => {
    return apiRequest(endpoint, { method: 'DELETE', ...config });
};