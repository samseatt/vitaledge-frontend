import axios from 'axios';

// Base URLs for different systems
const BASE_URLS = {
  standard: process.env.REACT_APP_STANDARD_API_URL || 'http://localhost:8080',
  genomic: process.env.REACT_APP_GENOMIC_API_URL || 'http://127.0.0.1:5000',
  aggregator: process.env.REACT_APP_AGGREGATOR_API_URL || 'http://127.0.0.1:5001',
};

// Function to create an axios instance with the specified base URL
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

  // Request interceptor to add the token
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export axios instances for different APIs
export const standardApi = createAxiosInstance(BASE_URLS.standard);
export const genomicApi = createAxiosInstance(BASE_URLS.genomic);
export const aggregatorApi = createAxiosInstance(BASE_URLS.aggregator);
