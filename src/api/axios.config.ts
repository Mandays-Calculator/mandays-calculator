import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const keycloakToken = localStorage.getItem("kcToken");
    if (keycloakToken) {
      config.headers["Authorization"] = `Bearer ${keycloakToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
