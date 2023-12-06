import type { UserPermissionState } from "~/redux/reducers/user/types";
import { useSelector } from "react-redux";
import { selectUser } from "~/redux/reducers/user";
import { getItemStorage } from "~/utils/storageHelper";
import { SESSION_STORAGE_ITEMS } from "~/utils/constants";
import { LoginResponse } from "~/api/auth";

/**
 * Custom hook to access the user's authentication state.
 * This hook uses the `selectUser` selector to retrieve the user's state from the Redux store.
 *
 * @returns {UserPermissionState} The current state of the user's permissions.
 */
export const useUserAuth = (): UserPermissionState => {
  const userState: UserPermissionState = useSelector(selectUser);
  return userState;
};

/**
 * Function to perform logout operation.
 * Currently, this function only logs to the console.
 * In a real application, this would handle the logout logic such as
 * dispatching a logout action, clearing relevant state, and redirecting the user.
 */
export const logout = (): void => {
  console.log("dispatching logout for user");
};

export const checkUserAuthentication = (): {
  status: boolean;
  mcUser: LoginResponse | null;
} => {
  const mcUser = getItemStorage(SESSION_STORAGE_ITEMS.mcUser, "session");
  const storedToken = mcUser.token;

  if (
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
