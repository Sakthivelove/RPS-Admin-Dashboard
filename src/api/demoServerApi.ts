import axios from 'axios';

// Create an instance of Axios
const demoapi = axios.create({
    baseURL: 'http://84.247.170.127:3003/', // Your API base URL
});

// Add an interceptor to include the token in the request headers
demoapi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add Bearer token to the headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default demoapi;
