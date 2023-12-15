import type { GenericErrorResponse } from "./types";
import { BroadcastChannel } from "broadcast-channel";
import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { getUser } from "~/utils/helpers";
import { CHANNELS, ERROR_CODES } from "~/utils/constants";

/**
 * Initializes Axios with global interceptors to handle authorization and error management.
 * - Configures a request interceptor to automatically add the user's access token to headers for authenticated requests.
 * - Sets up a response interceptor to handle HTTP responses and errors, particularly focusing on 401 Unauthorized errors.
 * - Uses a broadcast channel to communicate unauthorized states across different parts of the application.
 * @param isAuthenticated - Indicates if the user is currently authenticated.
 */
const init = async (): Promise<void> => {
  const { items, events } = CHANNELS;
  const channel = new BroadcastChannel(items.sessionState);

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const user = getUser();
      if (user) {
        config.headers.Authorization = `Bearer ${user?.token?.accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const user = getUser();
      if (error.response && error.response.status == 401 && user) {
        channel.postMessage(events.unauthorized);
      }
      if (
        error &&
        (error as unknown as GenericErrorResponse).errorCode ===
          ERROR_CODES.genericError
      ) {
        channel.postMessage(events.systemError);
      }
      const axiosError = error as AxiosError<GenericErrorResponse>;
      return axiosError && axiosError.response
        ? Promise.reject(axiosError.response.data)
        : Promise.reject(error);
    }
  );
};

export default init;
