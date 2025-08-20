import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
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
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const api = {
  // Contact endpoints
  submitContact: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },

  getContacts: async () => {
    const response = await apiClient.get('/contacts');
    return response.data;
  },

  // Projects endpoints
  getProjects: async (category = null) => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  // Services endpoints
  getServices: async () => {
    const response = await apiClient.get('/services');
    return response.data;
  },

  // Testimonials endpoints
  getTestimonials: async () => {
    const response = await apiClient.get('/testimonials');
    return response.data;
  },

  // Company info endpoints
  getCompanyInfo: async () => {
    const response = await apiClient.get('/company');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/');
    return response.data;
  }
};

export default api;