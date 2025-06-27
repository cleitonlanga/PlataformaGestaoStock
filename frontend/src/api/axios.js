// frontend/src/api/axios.js
import axios from "axios";

const isElectron = window?.process?.versions?.electron;

const api = axios.create({
  baseURL: isElectron
    ? "http://localhost:5000/api"
    : "http://localhost:5000/api",
});

export default api;
