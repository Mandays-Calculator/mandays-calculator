import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { getUser } from "~/utils/oidc-utils";

const init = async (): Promise<void> => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const user = getUser();
      config.headers.Authorization = `Bearer ${user?.access_token}`;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

export default init;
