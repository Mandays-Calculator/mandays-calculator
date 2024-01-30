import type { AnyAction } from "@reduxjs/toolkit";
import type { UserPermissionState } from "~/redux/reducers/user/types";
import type { LoginResponse, Token } from "~/api/auth";

import { useDispatch, useSelector } from "react-redux";

import { logout, selectUser } from "~/redux/reducers/user";
import { getItemStorage } from "~/utils/helpers";
import { SESSION_STORAGE_ITEMS, cookieAuthKey } from "~/utils/constants";
import { getCookie } from "~/utils/cookieUtils";

/**
 * Custom hook to access the user's authentication state.
 * This hook uses the `selectUser` selector to retrieve the user's state from the Redux store.
 *
 * @returns {UserPermissionState} The current state of the user's permissions.
 */
export const useUserAuth = (): {
  state: UserPermissionState;
  logout: () => void;
} => {
  const userState: UserPermissionState = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(
      logout({ callbacks: { onFailure: () => {} } }) as unknown as AnyAction,
    );
  };
  return { state: userState, logout: handleLogout };
};

export const checkUserAuthentication = (): {
  status: boolean;
  mcUser: LoginResponse | null;
} => {
  const mcUser = getItemStorage(SESSION_STORAGE_ITEMS.mcUser, "session");
  const storedToken = getUserToken();
  if (
    Object.keys(mcUser).length > 0 &&
    storedToken &&
    storedToken.accessToken &&
    new Date().getTime() < storedToken.issuedAtInMs + storedToken.expiresInMs
  ) {
    return {
      status: true,
      mcUser: mcUser,
    };
  } else {
    return {
      status: false,
      mcUser: null,
    };
  }
};

export const getUserToken = (): Token => {
  return getCookie(cookieAuthKey);
};
