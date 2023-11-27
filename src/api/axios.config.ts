import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { getUser } from "~/utils/oidc-utils";
import { LOCAL_STORAGE_ITEMS } from "~/utils/constants";
import { getItemStorage, setItemStorage } from "~/utils/storageHelper";

const init = async (): Promise<void> => {
  const user = getUser();
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (user) {
        config.headers.Authorization = `Bearer ${user?.access_token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data?.status >= 201) {
        return Promise.reject(response.data.message);
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401 && user) {
        const sessionStorage = getItemStorage(LOCAL_STORAGE_ITEMS.sessionState);
        sessionStorage.unauthorized = true;
        setItemStorage(LOCAL_STORAGE_ITEMS.sessionState, sessionStorage);
      }
      return Promise.reject(error);
    }
  );
};

export default init;
