import type { GenericErrorResponse } from "./types";
import { refreshTokenApi, type Token } from "./auth";
import { BroadcastChannel } from "broadcast-channel";

import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { getUser } from "~/utils/helpers";
import { CHANNELS, cookieAuthKey, ERROR_CODES } from "~/utils/constants";
import { getUserToken } from "~/hooks/user";
import { setCookie } from "~/utils/cookieUtils";

let isRefreshing = false;
let isLoggingOut = false;
let refreshPromise: Promise<void> | null = null;
const requestQueue: (() => Promise<any>)[] = [];

const isTokenExpired = (accessToken: Token): boolean => {
  if (
    isRefreshing ||
    !accessToken ||
    !accessToken.expiresInMs ||
    !accessToken.issuedAtInMs
  ) {
    return false;
  }

  const expirationTimestamp =
    accessToken.issuedAtInMs + accessToken.expiresInMs;
  const currentTimestamp = Date.now();
  return currentTimestamp > expirationTimestamp;
};

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
    async (config: InternalAxiosRequestConfig) => {
      const user = getUser();
      const token = getUserToken();

      if (config.url?.includes("/refresh-token")) {
        config.headers.Authorization = "No Auth";
      } else if (user) {
        if (isTokenExpired(token)) {
          if (!isRefreshing) {
            isRefreshing = true;

            refreshPromise = refreshTokenApi({
              refreshToken: token.refreshToken,
            })
              .then(({ token: newToken }) => {
                console.log("Token refreshed"); // for debugging purposes
                setCookie(cookieAuthKey, newToken);
                config.headers.Authorization = `Bearer ${newToken.accessToken}`;
                replayRequests();
              })
              .catch((refreshError) => {
                throw refreshError;
              })
              .finally(() => {
                isRefreshing = false;
                isLoggingOut = false;
                refreshPromise = null;
              });

            await refreshPromise;
          }
        } else {
          config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
      }

      if (config.url?.endsWith("/logout")) {
        isLoggingOut = true;
      } else {
        isLoggingOut = false;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (!isLoggingOut) {
        const user = getUser();
        if (user) {
          if (error.response && error.response.status === 401) {
            enqueueRequest(() => axios.request((error as any).config));
            try {
              await refreshPromise;
            } catch (refreshError) {
              channel.postMessage(events.unauthorized);
            }
          }
          if (
            error &&
            (error as unknown as GenericErrorResponse).errorCode ===
              ERROR_CODES.genericError
          ) {
            channel.postMessage(events.systemError);
          }
        }
      }

      const axiosError = error as AxiosError<GenericErrorResponse>;

      return axiosError && axiosError.response
        ? Promise.reject(axiosError.response.data)
        : Promise.reject(error);
    },
  );

  async function replayRequests() {
    while (requestQueue.length > 0) {
      const request = requestQueue.shift();
      if (request) {
        await request();
      }
    }
  }

  function enqueueRequest(request: () => Promise<any>) {
    requestQueue.push(request);
  }
};

export default init;
