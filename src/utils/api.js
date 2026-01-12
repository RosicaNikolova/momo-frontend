import axios from 'axios';

export const API_BASE_URL = 'http://127.0.0.1:8000';

export const METRIC_TYPES = {
    TIME_IN_BED: 'time_in_bed',
    LOW_ACTIVITY: 'low_activity',
    HIGH_ACTIVITY: 'high_activity',
    AT_REST: 'at_rest',
    OUT_OF_BED_NIGHT: 'out_of_bed_night',
    OUT_OF_BED_DAY: 'out_of_bed_day'
};

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`API Error ${error.response.status}:`, error.response.data);

            if (error.response.status === 400) {
                throw new Error(`Invalid request: ${error.response.data?.detail || 'Bad request'}`);
            } else if (error.response.status === 404) {
                throw new Error('Endpoint not found');
            } else if (error.response.status >= 500) {
                throw new Error('Server error. Please try again later.');
            }

            throw new Error(`HTTP ${error.response.status}: ${error.response.data?.detail || error.message}`);
        } else if (error.request) {
            console.error('Network error:', error.request);
            throw new Error('Network error. Please check your connection and try again.');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error(`Request failed: ${error.message}`);
        }
    }
);

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

export const apiGet = (endpoint, config = {}) => apiRequest(endpoint, { method: 'GET', ...config });
export const apiPost = (endpoint, data, config = {}) => apiRequest(endpoint, { method: 'POST', data, ...config });
export const apiPut = (endpoint, data, config = {}) => apiRequest(endpoint, { method: 'PUT', data, ...config });
export const apiDelete = (endpoint, config = {}) => apiRequest(endpoint, { method: 'DELETE', ...config });