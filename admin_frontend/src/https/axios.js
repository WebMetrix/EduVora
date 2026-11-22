import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,    // Allow sending cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the token if cookies are blocked
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('sessionid');
    if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle global 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear the token and force a logout
            sessionStorage.removeItem('sessionid');
            // Check if we are not already on the login page to avoid redirect loops
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgotpassword') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;