// frontend/src/api/axios.js
import axios from "axios";


// Usa variáveis de ambiente para produção
const baseURL = import.meta.env.VITE_API_URL;
console.log(`Base URL: ${baseURL}`);

const api = axios.create({
  baseURL,
});

export default api;
