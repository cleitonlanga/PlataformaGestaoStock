// frontend/src/api/axios.js
import axios from "axios";

const isElectron = window?.process?.versions?.electron;

// Usa variáveis de ambiente para produção
const baseURL = isElectron
  ? "http://localhost:5000/api"
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL,
});

export default api;
