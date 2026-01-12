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

// Mock residents/rooms list data
const mockResidents = [
  {
    id: 1,
    name: "John Smith",
    room_number: "101",
    floor: 1,
    wing: "A",
    admission_date: "2024-01-15",
    age: 78,
    status: "active"
  },
  {
    id: 2,
    name: "Mary Johnson",
    room_number: "102",
    floor: 1,
    wing: "A",
    admission_date: "2024-02-20",
    age: 82,
    status: "active"
  },
  {
    id: 3,
    name: "Robert Williams",
    room_number: "103",
    floor: 1,
    wing: "A",
    admission_date: "2024-03-10",
    age: 75,
    status: "active"
  },
  {
    id: 4,
    name: "Patricia Brown",
    room_number: "201",
    floor: 2,
    wing: "B",
    admission_date: "2024-01-25",
    age: 80,
    status: "active"
  },
  {
    id: 5,
    name: "James Davis",
    room_number: "202",
    floor: 2,
    wing: "B",
    admission_date: "2024-04-05",
    age: 73,
    status: "active"
  }
];

/**
 * Fetch mock residents list with pagination
 * @param {number} offset - Starting position for pagination
 * @param {number} limit - Maximum number of residents to fetch
 * @returns {Promise<Array>} Array of resident objects
 */
export const getResidents = (offset = 0, limit = 50) => {
  console.log(`getResidents called with offset="${offset}", limit="${limit}"`);
  const paginatedResidents = mockResidents.slice(offset, offset + limit);
  return Promise.resolve(paginatedResidents);
};

/**
 * Fetch mock resident details by ID
 * @param {number} residentId - The resident ID
 * @returns {Promise<Object>} Resident object with details
 */
export const getResidentById = (residentId) => {
  console.log(`getResidentById called with residentId="${residentId}"`);
  const resident = mockResidents.find(r => r.id === Number(residentId));

  if (!resident) {
    console.warn(`No resident found with id="${residentId}"`);
    return Promise.reject(new Error(`Resident with id="${residentId}" not found`));
  }

  // Return resident with additional details
  const detailedResident = {
    ...resident,
    medical_conditions: ["Hypertension", "Arthritis"],
    medications: ["Lisinopril", "Ibuprofen"],
    emergency_contact: {
      name: "Jane Smith",
      relationship: "Daughter",
      phone: "(555) 123-4567"
    },
    care_level: "Assisted Living",
    mobility: "Walker",
    diet: "Regular"
  };

  return Promise.resolve(detailedResident);
};

export default {
  getTrendData,
  getChangepointsData,
  getAnomaliesData,
  getResidents,
  getResidentById,
};
