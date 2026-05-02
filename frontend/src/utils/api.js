import axios from "axios";

export const api = axios.create({
  baseURL: "https://team-task-manager-production-02b2.up.railway.app",
});

// ✅ हर request में token भेजेगा
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});