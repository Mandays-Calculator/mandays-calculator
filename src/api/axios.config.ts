import type { GenericErrorResponse } from "./types";
import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { getUser } from "~/utils/oidc-utils";
import { LOCAL_STORAGE_ITEMS } from "~/utils/constants";
import { getItemStorage, setItemStorage } from "~/utils/storageHelper";

const init = async (): Promise<void> => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const user = getUser();
      if (user) {
        config.headers.Authorization = `Bearer ${user?.access_token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data?.status >= 201) {
        return Promise.reject(response.data);
      }
      return response;
    },
    (error: AxiosError) => {
      const user = getUser();
      if (error.response && error.response.status === 401 && user) {
        const sessionStorage = getItemStorage(LOCAL_STORAGE_ITEMS.sessionState);
        sessionStorage.unauthorized = true;
        setItemStorage(LOCAL_STORAGE_ITEMS.sessionState, sessionStorage);
      }
      const axiosError = error as AxiosError<GenericErrorResponse>;
      return axiosError && axiosError.response
        ? Promise.reject(axiosError.response.data)
        : Promise.reject(error);
    }
  );
};

export default init;
