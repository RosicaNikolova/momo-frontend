import mockData from '../data/mock_dataset.json';

const resolveOrError = (data, metric, residentId, kind) => {
  if (!data) {
    console.warn(`No local ${kind} data for metric="${metric}", residentId="${residentId}". Available metrics:`, Object.keys(mockData[kind] || {}));
    return Promise.reject(new Error(`No local ${kind} data for metric="${metric}", residentId="${residentId}"`));
  }
  return Promise.resolve(data);
};

export const getTrendData = (metric, residentId) => {
  const metricObj = mockData.trend?.[metric];
  const res = metricObj?.[String(residentId)];
  console.log(`getTrendData called with metric="${metric}", residentId="${residentId}", found:`, !!res);
  return resolveOrError(res, metric, residentId, 'trend');
};

export const getChangepointsData = (metric, residentId) => {
  const metricObj = mockData.changepoints?.[metric];
  const res = metricObj?.[String(residentId)];
  console.log(`getChangepointsData called with metric="${metric}", residentId="${residentId}", found:`, !!res);
  return resolveOrError(res, metric, residentId, 'changepoints');
};

export const getAnomaliesData = (metric, residentId) => {
  const metricObj = mockData.anomalies?.[metric];
  const res = metricObj?.[String(residentId)];
  console.log(`getAnomaliesData called with metric="${metric}", residentId="${residentId}", found:`, !!res);
  return resolveOrError(res, metric, residentId, 'anomalies');
};

export default {
  getTrendData,
  getChangepointsData,
  getAnomaliesData,
};
