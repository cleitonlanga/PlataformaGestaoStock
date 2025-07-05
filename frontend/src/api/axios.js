// frontend/src/api/axios.js
import axios from "axios";


// Usa variáveis de ambiente para produção
const baseURL = import.meta.env.VITE_API_URL;
console.log(`Base URL: ${baseURL}`);

const api = axios.create({
  baseURL,
});

// Use a request interceptor to add the token to every request.
api.interceptors.request.use(
  (config) => {
    // Assumes you store the token in localStorage after login.
    const token = localStorage.getItem('token'); 
    if (token) {
      // Adds the 'Bearer ' prefix, which is a common standard.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
