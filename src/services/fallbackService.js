import { getTrendData as realGetTrend } from './trendService.js';
import { getChangepointsData as realGetChangepoints } from './changepointsService.js';
import { getAnomaliesData as realGetAnomalies } from './anomaliesService.js';
import localMock from './localMockService.js';

const safeCall = async (realFn, mockFn, metric, residentId, label) => {
  try {
    const res = await realFn(metric, residentId);
    return res;
  } catch (err) {
    // Log and fallback to mock
    // eslint-disable-next-line no-console
    console.warn(`${label} service failed, falling back to local mock:`, err && err.message ? err.message : err);
    try {
      return await mockFn(metric, residentId);
    } catch (mockErr) {
      // If mock also fails, log it and return empty/default data to avoid white screen
      // eslint-disable-next-line no-console
      console.error(`${label} mock data also failed:`, mockErr && mockErr.message ? mockErr.message : mockErr);
      // Return a minimal default structure to prevent white screen
      return getDefaultData(label, metric, residentId);
    }
  }
};

const getDefaultData = (label, metric, residentId) => {
  if (label === 'Trend') {
    return {
      resident_id: residentId,
      baseline_hours: 0,
      last_7_days_hours: 0,
      difference_hours: 0,
      description: 'Data unavailable'
    };
  } else if (label === 'Changepoints') {
    return {
      resident_id: residentId,
      n_change_points: 0,
      change_point_dates: [],
      change_point_values: [],
      change_point_indices: [],
      description: 'No changepoints detected'
    };
  } else if (label === 'Anomalies') {
    return {
      resident_id: residentId,
      n_anomalies: 0,
      anomaly_dates: [],
      anomaly_values: [],
      anomaly_indices: [],
      description: 'No anomalies detected'
    };
  }
  return {};
};

export const getTrendData = (metric, residentId) => {
  return safeCall(realGetTrend, localMock.getTrendData, metric, residentId, 'Trend');
};

export const getChangepointsData = (metric, residentId) => {
  return safeCall(realGetChangepoints, localMock.getChangepointsData, metric, residentId, 'Changepoints');
};

export const getAnomaliesData = (metric, residentId) => {
  return safeCall(realGetAnomalies, localMock.getAnomaliesData, metric, residentId, 'Anomalies');
};

export default {
  getTrendData,
  getChangepointsData,
  getAnomaliesData,
};
