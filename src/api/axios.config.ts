import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { LOCAL_STORAGE_ITEMS } from "~/utils/constants";
import { getItemStorage, setItemStorage } from "~/utils/storageHelper";

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

  // Response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        const sessionStorage = getItemStorage(LOCAL_STORAGE_ITEMS.sessionState);
        sessionStorage.unauthorized = true;
        setItemStorage(LOCAL_STORAGE_ITEMS.sessionState, sessionStorage);
      }
      return Promise.reject(error);
    }
  );
};

export default init;
