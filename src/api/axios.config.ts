import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const init = async (kcToken: string | undefined): Promise<void> => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = `Bearer ${kcToken}`;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

export default init;
