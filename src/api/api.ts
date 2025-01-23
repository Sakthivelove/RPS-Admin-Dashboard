import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Define the base URL for your API
// const API_BASE_URL = 'https://s1olo8t9dj.execute-api.ap-southeast-2.amazonaws.com/dev';
const API_BASE_URL = 'https://lxnkhh5om3.execute-api.ap-southeast-2.amazonaws.com/dev';
// const API_BASE_URL = 'http://84.247.170.127:3003';
// Create an axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response handling
api.interceptors.request.use(
  (config) => {
    // Example: Adding a token to request headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add interceptors for response handling
api.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error: Log out and redirect to login
      localStorage.removeItem('token'); // Clear the token from storage
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error); // For other errors, reject the promise
  }
);

// Example: A generic function to handle API response data and error types
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const handleError = (error: AxiosError): string => {
  if (error.response) {
    // Server error
    return `Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    // Network error
    return 'Network error, please try again later.';
  } else {
    // Other error
    return `Error: ${error.message}`;
  }
};

export { api, handleResponse, handleError };
