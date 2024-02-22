import { renderHook, act } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useUserAuth, checkUserAuthentication } from "~/hooks/user";
import { getItemStorage, removeStateStorage } from "~/utils/helpers";

jest.mock("react-redux");
jest.mock("~/redux/reducers/user");
jest.mock("~/utils/helpers");

describe("useUserAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the correct state and logout function", () => {
    const mockDispatch = jest.fn();
    const mockSelectUser = jest.fn();
    (useSelector as jest.Mock).mockImplementation(mockSelectUser);
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockUserState = {
      isAuthenticated: true,
      loading: false,
      error: null,
      user: {
        id: "6a0b5884-ae95-11ee-a2d3-00090faa0001",
        odc: null,
        firstName: "Mitzi",
        lastName: "Pacia",
        middleName: "Gaspar",
        suffix: "Ms",
        gender: "FEMALE",
        email: "jangaojhonrey@gmail.com",
        employeeId: "82008231",
        careerStep: "I03",
        joiningDate: 1704729600000,
        roles: ["ROLE_SPRINT_MANAGER", "ROLE_SYS_ADMIN"],
        active: false,
      },
      permissions: [],
      tokenExpiry: 10000,
    };
    mockSelectUser.mockReturnValue(mockUserState);

    const { result } = renderHook(() => useUserAuth());

    expect(result.current.state).toEqual(mockUserState);

    act(() => {
      result.current.logout();
    });

    expect(removeStateStorage).toHaveBeenCalledWith("local");
  });
});

describe("checkUserAuthentication", () => {
  test("returns correct status and mcUser when token is valid", () => {
    const mockToken = {
      token: {
        accessToken: "validAccessToken",
        issuedAtInMs: new Date().getTime(),
        expiresInMs: 3600000,
      },
    };

    (getItemStorage as jest.Mock).mockReturnValue(mockToken);

    const result = checkUserAuthentication();

    expect(result.status).toBe(true);
    expect(result.mcUser).toEqual(mockToken);
  });

  test("returns correct status and mcUser when token is invalid", () => {
    (getItemStorage as jest.Mock).mockReturnValue({
      token: {
        accessToken: "invalidAccessToken",
        issuedAtInMs: new Date().getTime() - 7200000,
        expiresInMs: 3600000,
      },
    });

    const result = checkUserAuthentication();

    expect(result.status).toBe(false);
    expect(result.mcUser).toBeNull();
  });
});
