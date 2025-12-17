import mockData from '../data/mock_dataset.json';

/**
 * Local mock service that mimics the API services.
 * Each function returns a Promise that resolves to the same data shape
 * that the components expect from the remote API.
 */

const resolveOrError = (data, metric, residentId, kind) => {
  if (!data) {
    return Promise.reject(new Error(`No local ${kind} data for metric="${metric}", residentId="${residentId}"`));
  }
  return Promise.resolve(data);
};

export const getTrendData = (metric, residentId) => {
  const metricObj = mockData.trend?.[metric];
  const res = metricObj?.[String(residentId)];
  return resolveOrError(res, metric, residentId, 'trend');
};

export const getChangepointsData = (metric, residentId) => {
  const metricObj = mockData.changepoints?.[metric];
  const res = metricObj?.[String(residentId)];
  return resolveOrError(res, metric, residentId, 'changepoints');
};

export const getAnomaliesData = (metric, residentId) => {
  const metricObj = mockData.anomalies?.[metric];
  const res = metricObj?.[String(residentId)];
  return resolveOrError(res, metric, residentId, 'anomalies');
};

export default {
  getTrendData,
  getChangepointsData,
  getAnomaliesData,
};
