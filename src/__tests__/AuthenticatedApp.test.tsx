import type { ConfigType } from "~/utils/env-config";

import { BrowserRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { render, waitFor } from "@testing-library/react";

import { checkUserAuthentication, useUserAuth } from "~/hooks/user";
import AuthenticatedApp from "~/AuthenticatedApp";
import { getEnvConfig } from "~/utils/env-config";
import { useErrorModals } from "~/hooks/modal";

import { cleanAllCallback } from "./pages/auth/utils/auth-utils";

jest.mock("~/api/axios.config");
jest.mock("~/utils/env-config");
jest.mock("~/hooks/modal");
jest.mock("~/hooks/user");
jest.mock("react-redux");

const mockGetEnvConfig = getEnvConfig as jest.MockedFunction<
  typeof getEnvConfig
>;
const mockCheckUserAuthentication = checkUserAuthentication as jest.MockedFunction<
  typeof checkUserAuthentication
>;
const mockUseUserAuth = useUserAuth as jest.MockedFunction<
  typeof useUserAuth
>;
const mockUseDispatch = useDispatch as jest.MockedFunction<
  typeof useDispatch
>;
const mockUseErrorModals = useErrorModals as jest.MockedFunction<
  typeof useErrorModals
>;

afterAll((done) => {
  cleanAllCallback(done);
});

describe("GIVEN AuthenticatedApp Component is called", () => {
  test("WHEN page is still in verification process, THEN it should render the page loader", async () => {
    const checkUserAuthenticationData = {
      status: false,
      mcUser: 'AUTHENTICATEDUSERTOKENSAMPLE',
    };
    const getEnvConfigData = {
      enableAuth: false,
      idleTimeoutConfig: {
        durationUntilPromptSeconds: 100
      }
    };
    const useUserAuthData = {
      state: {
        loading: true,
        isAuthenticated: false,
        permissions: [{
          displayName: "ROLE_SYS_ADMIN",
          icon: "icon_sample",
          path: "icon_path",
          roles: ["ROLE_SYS_ADMIN"],
          subMenuItems: null
        }]
      }
    }
    const useErrorModalsData = {
      showUnauthorizedModal: false,
      systemErrorModal: false,
      setSystemErrorModal: jest.fn()
    }

    const renderResult = renderAuthenticatedApp(getEnvConfigData, checkUserAuthenticationData, useUserAuthData, useErrorModalsData);

    if (!renderResult) {
      throw new Error("Rendering failed.");
    }

    const { container } = renderResult;

    await waitFor(() => {
      expect(container).toMatchSnapshot(`auth-page-loader`);
    });
  });

  test("WHEN user is not authenticated, THEN it user cannot proceed to the landing page", async () => {
    const checkUserAuthenticationData = {
      status: false,
      mcUser: 'AUTHENTICATEDUSERTOKENSAMPLE',
    };
    const getEnvConfigData = {
      enableAuth: false,
      idleTimeoutConfig: {
        durationUntilPromptSeconds: 100
      }
    };
    const useUserAuthData = {
      state: {
        loading: false,
        isAuthenticated: false,
        permissions: [{
          displayName: "ROLE_SYS_ADMIN",
          icon: "icon_sample",
          path: "icon_path",
          roles: ["ROLE_SYS_ADMIN"],
          subMenuItems: null
        }]
      }
    }
    const useErrorModalsData = {
      showUnauthorizedModal: false,
      systemErrorModal: false,
      setSystemErrorModal: jest.fn()
    }

    const renderResult = renderAuthenticatedApp(getEnvConfigData, checkUserAuthenticationData, useUserAuthData, useErrorModalsData);

    if (!renderResult) {
      throw new Error("Rendering failed.");
    }

    const { container } = renderResult;

    await waitFor(() => {
      expect(container).toMatchSnapshot(`user-not-authenticated`);
    });
  });

  test("WHEN user is authenticated, THEN it user should be redirected to the landing page", async () => {
    const checkUserAuthenticationData = {
      status: true,
      mcUser: 'AUTHENTICATEDUSERTOKENSAMPLE',
    };
    const getEnvConfigData = {
      enableAuth: true,
      idleTimeoutConfig: {
        durationUntilPromptSeconds: 100
      }
    };
    const useUserAuthData = {
      state: {
        loading: false,
        isAuthenticated: true,
        permissions: [{
          displayName: "ROLE_SYS_ADMIN",
          icon: "icon_sample",
          path: "icon_path",
          roles: ["ROLE_SYS_ADMIN"],
          subMenuItems: null
        }]
      }
    }
    const useErrorModalsData = {
      showUnauthorizedModal: false,
      systemErrorModal: false,
      setSystemErrorModal: jest.fn()
    }

    const renderResult = renderAuthenticatedApp(getEnvConfigData, checkUserAuthenticationData, useUserAuthData, useErrorModalsData);

    if (!renderResult) {
      throw new Error("Rendering failed.");
    }

    const { container } = renderResult;

    await waitFor(() => {
      expect(container).toMatchSnapshot(`user-authenticated`);
    });
  });
});

const renderAuthenticatedApp = (
  getEnvConfigData: object,
  checkUserAuthenticationData: object,
  useUserAuthData: object,
  useErrorModalsData: object
): ReturnType<typeof render> | undefined => {
  runAuthenticatedAppMocks(getEnvConfigData, checkUserAuthenticationData, useUserAuthData, useErrorModalsData);

  return render(
    <BrowserRouter>
      <AuthenticatedApp />
    </BrowserRouter>
  );;
};

const runAuthenticatedAppMocks = (
  getEnvConfigData: object,
  checkUserAuthenticationData: object,
  useUserAuthData: object,
  useErrorModalsData: object
): void => {
  mockGetEnvConfig.mockReturnValue(getEnvConfigData as unknown as ConfigType);
  mockCheckUserAuthentication.mockReturnValue(
    checkUserAuthenticationData as unknown as ReturnType<
      typeof checkUserAuthentication
    >
  );
  mockUseUserAuth.mockReturnValue(useUserAuthData as unknown as ReturnType<
    typeof useUserAuth
  >);
  mockUseDispatch.mockReturnValue(jest.fn() as unknown as ReturnType<
    typeof useDispatch
  >);
  mockUseErrorModals.mockReturnValue(useErrorModalsData as unknown as ReturnType<
    typeof useErrorModals
  >);
};
