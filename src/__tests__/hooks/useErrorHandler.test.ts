import { renderHook } from "@testing-library/react"; // For testing hooks
import { t } from "i18next";
import { useErrorHandler } from "~/hooks/error-handler";
import { APIError } from "~/hooks/request-handler";
import { ERROR_CODES } from "~/utils/constants";

const genericErrorMessage = "Generic error message";

jest.mock("i18next", () => ({
  t: jest.fn((key) =>
    key === "common.errorMessage.genericError" ? genericErrorMessage : key
  ),
}));

describe("useErrorHandler", () => {
  const mockError = {
    message: "",
    errorCode: ERROR_CODES.genericError,
  };

  it("returns correct error message for generic error", () => {
    const { result } = renderHook(() => useErrorHandler(mockError, t));

    expect(result.current).toBe(genericErrorMessage);
  });

  it("returns correct error message for network error", () => {
    const networkError = {
      message: "Network error occurred",
      errorCode: ERROR_CODES.networkError,
    };

    const { result } = renderHook(() => useErrorHandler(networkError, t));

    expect(result.current).toBe(networkError.message);
  });

  it("returns correct error message for user not found error", () => {
    const userNotFoundError = {
      message: "User not found",
      errorCode: ERROR_CODES.userNotFound,
    };

    const { result } = renderHook(() => useErrorHandler(userNotFoundError, t));

    expect(result.current).toBe(userNotFoundError.message);
  });

  it("returns empty string for undefined error code", () => {
    const undefinedErrorCodeError: APIError = {
      message: "Undefined error code",
      errorCode: "",
      code: "",
    };

    const { result } = renderHook(() =>
      useErrorHandler(undefinedErrorCodeError, t)
    );

    expect(result.current).toBe("");
  });

  it("returns empty string for null error code", () => {
    const nullErrorCodeError: APIError = {
      message: "Null error code",
      errorCode: "",
    };

    const { result } = renderHook(() => useErrorHandler(nullErrorCodeError, t));

    expect(result.current).toBe("");
  });

  it("returns empty string for empty string error code", () => {
    const emptyStringErrorCodeError = {
      message: "Empty string error code",
      errorCode: "",
    };

    const { result } = renderHook(() =>
      useErrorHandler(emptyStringErrorCodeError, t)
    );

    expect(result.current).toBe("");
  });
});
