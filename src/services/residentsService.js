import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

/**
 * Fetch all residents from the API
 * @param {number} offset - Starting position for pagination
 * @param {number} limit - Maximum number of residents to fetch
 * @returns {Promise<Array>} Array of resident objects
 */
export const fetchResidents = async (offset = 0, limit = 50) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/residents/`, {
            params: { offset, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching residents:', error);
        throw error;
    }
};

/**
 * Fetch a single resident by ID
 * @param {number} residentId - The resident ID
 * @returns {Promise<Object>} Resident object
 */
export const fetchResidentById = async (residentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/residents/${residentId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching resident ${residentId}:`, error);
        throw error;
    }
};
