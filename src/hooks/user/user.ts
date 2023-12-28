import type { UserPermissionState } from "~/redux/reducers/user/types";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState, selectUser } from "~/redux/reducers/user";
import { getItemStorage, removeStateStorage } from "~/utils/helpers";
import { SESSION_STORAGE_ITEMS } from "~/utils/constants";
import { LoginResponse } from "~/api/auth";

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
    window.location.reload();
    dispatch(resetUserState());
    removeStateStorage("session");
  };

  return { state: userState, logout: handleLogout };
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
