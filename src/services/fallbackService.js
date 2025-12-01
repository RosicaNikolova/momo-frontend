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
    // Keep behaviour visible for dev; components will exercise their error paths if mock is missing
    // eslint-disable-next-line no-console
    console.warn(`${label} service failed, falling back to local mock:`, err && err.message ? err.message : err);
    return mockFn(metric, residentId);
  }
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
