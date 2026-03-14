
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getToken, removeToken } from "../utils/sessionStorageUtils";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
         
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/auth/admin/refresh-token`,
            {},
            { withCredentials: true }
          );


          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token error", refreshError);
          removeToken();
         
          if (window.location.pathname !== '/admin/login') {
            window.location.href = "/admin/login";
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const authAxiosInstance = axiosInstance();
