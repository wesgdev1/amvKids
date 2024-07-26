import axios from "axios";
import { clearSession, getSession } from "./sessions";
// import { getSession, clearSession } from "./session";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // Append token in Authorization header if is present
    const token = getSession();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 403 no autorizado
    // 401 no autenticado
    if (error.response?.status === 403) {
      clearSession();
      window.location = "/login";
    }

    // Procesar los errores de todas las respuestas del backend
    // en un solo lugar

    if (error.response.data.error) {
      return Promise.reject(error.response.data.error);
    }

    return Promise.reject(error);
  }
);
