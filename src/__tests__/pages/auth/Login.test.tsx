import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Formik } from "formik";
import i18n from "~/i18n";

import { Login } from "~/pages/auth";

import { cleanAllCallback } from "./utils/auth-utils";

// Mock the i18next translation function
i18n.init({
  resources: {
    en: {},
  },
  lng: 'en',
  interpolation: { escapeValue: false }, // react already safes from xss
});

jest.mock("react-redux");

const mockUseDispatch = useDispatch as jest.MockedFunction<
  typeof useDispatch
>;
const mockUseSelector = useSelector as jest.MockedFunction<
  typeof useSelector
>;

const handleSubmit = jest.fn();
const LOGIN_TEXT = {
  management: "login.management",
  label: {
    signIn: "login.label.signIn",
    userName: "login.label.userName",
    password: "login.label.password",
    forgotPassword: "login.label.forgotPassword",
  },
  btnlabel: {
    signIn: "login.btnlabel.signIn",
  },
  placeholder: {
    userName: "login.placeholder.userName",
    password: "login.placeholder.password",
  },
  error: {
    usernameRequired: "common.errorMessage.auth.login.usernameRequired",
    passwordRequired: "common.errorMessage.auth.login.passwordRequired",
  },
  authSignInLoading: "common.userManagement.auth.signInLoading",
};
const loginData = {
  username: "sample@gmail.com",
  password: "@pass1234",
};

afterAll((done) => {
  cleanAllCallback(done);
});

describe("GIVEN Login Component is called", () => {
  test("WHEN user wants to access the Login page, THEN it should render correctly", async () => {
    renderLogin(false);
    const user = userEvent.setup();

    const usernameTextField = screen.getByPlaceholderText(LOGIN_TEXT.placeholder.userName);
    const passwordTextField = screen.getByPlaceholderText(LOGIN_TEXT.placeholder.password);
    const goBackLink = screen.getByRole('link', { name: LOGIN_TEXT.label.forgotPassword });
    const signinButton = screen.getByRole('button', { name: LOGIN_TEXT.btnlabel.signIn });

    await waitFor(async () => {
      await user.type(usernameTextField, loginData.username);
      await user.type(passwordTextField, loginData.password);
      await user.click(signinButton);

      await Promise.resolve();
    }, { timeout: 10000 });

    // Labels
    expect(screen.getByText(LOGIN_TEXT.label.signIn)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_TEXT.label.userName)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_TEXT.label.password)).toBeInTheDocument();

    // Fields
    expect(usernameTextField).toBeInTheDocument();
    expect(passwordTextField).toBeInTheDocument();

    // Forgot Password Link
    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute('href', '/forgot-password');
    expect(goBackLink).toHaveTextContent(LOGIN_TEXT.label.forgotPassword);

    // Buttons
    expect(signinButton).toBeInTheDocument();
  });

  test("WHEN user tries to login, THEN system should process the authentication", async () => {
    renderLogin(true);

    const authSigninLoadingButton = screen.getByRole('button', { name: LOGIN_TEXT.authSignInLoading });

    waitFor(() => {
      expect(authSigninLoadingButton).toBeInTheDocument();
    });
  });

  test("WHEN user tries to login without giving username and password, THEN system should show an error", async () => {
    renderLogin(false);
    const user = userEvent.setup();

    const signinButton = screen.getByRole('button', { name: LOGIN_TEXT.btnlabel.signIn });

    waitFor(() => {
      user.click(signinButton);

      Promise.resolve();
    }, { timeout: 10000 });

    await waitFor(() => {
      expect(screen.getByText(LOGIN_TEXT.error.usernameRequired)).toBeInTheDocument();
      expect(screen.getByText(LOGIN_TEXT.error.passwordRequired)).toBeInTheDocument();
    }, { timeout: 10000 });
  });

  test("WHEN user clicks the ForgotPassword link, THEN system should redirect user to the ForgotPassword page", async () => {
    renderLogin(false);
    const user = userEvent.setup();

    const goBackLink = screen.getByRole('link', { name: LOGIN_TEXT.label.forgotPassword });

    await user.click(goBackLink);

    waitFor(() => {
      expect(window.location.pathname).toBe('/forgot-password');
    });
  });
});

const renderLogin = (loadingLogin: boolean): void => {
  runLoginMocks(loadingLogin);

  render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          <Login />
        </Formik>
      </I18nextProvider>
    </BrowserRouter>
  );
};

const runLoginMocks = (loadingLogin: boolean): void => {
  mockUseDispatch.mockReturnValue(jest.fn() as unknown as ReturnType<
    typeof useDispatch
  >);

  const useSelectorData = {
    loading: loadingLogin,
    error: {
      message: LOGIN_TEXT.error.usernameRequired,
      errorCode: '',
    }
  };

  mockUseSelector.mockReturnValue(useSelectorData as unknown as ReturnType<
    typeof useSelector
  >);
};
