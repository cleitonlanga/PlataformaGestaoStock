import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // atualize se o backend estiver em outro host
});

export default api;
