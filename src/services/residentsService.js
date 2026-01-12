import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import localMock from './localMockService.js';

/**
 * Fetch all residents from the API with fallback to mock data
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
        console.error('Error fetching residents from API, falling back to mock data:', error);
        try {
            return await localMock.getResidents(offset, limit);
        } catch (mockError) {
            console.error('Error fetching mock residents:', mockError);
            throw mockError;
        }
    }
};

/**
 * Fetch a single resident by ID with fallback to mock data
 * @param {number} residentId - The resident ID
 * @returns {Promise<Object>} Resident object
 */
export const fetchResidentById = async (residentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/residents/${residentId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching resident ${residentId} from API, falling back to mock data:`, error);
        try {
            return await localMock.getResidentById(residentId);
        } catch (mockError) {
            console.error('Error fetching mock resident:', mockError);
            throw mockError;
        }
    }
};
