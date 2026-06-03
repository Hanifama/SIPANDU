import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../services/tokenService";


const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ganti sesuai .env kamu
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
