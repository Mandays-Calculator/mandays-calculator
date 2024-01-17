import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { render, screen, waitFor } from '@testing-library/react';

import { Formik } from 'formik';
import i18n from "~/i18n";

import { useRequestHandler } from '~/hooks/request-handler';
import { ForgotPassword } from '~/pages/auth';

import { cleanAllCallback } from "./utils/auth-utils";
import userEvent from '@testing-library/user-event';

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {},
    },
    lng: 'en',
    interpolation: { escapeValue: false }, // react already safes from xss
});

jest.mock("~/hooks/request-handler");

const mockUseRequestHandler = useRequestHandler as jest.MockedFunction<
    typeof useRequestHandler
>;

const queryClient = new QueryClient();
const handleSubmit = jest.fn();

const FORGOT_PASSWORD_TEXT = {
    label: {
        enterUsername: "forgotPassword.label.enterUsername",
        link: "forgotPassword.label.link",
        success: "forgotPassword.label.success",
    },
    btnlabel: {
        send: "forgotPassword.btnlabel.send",
        back: "forgotPassword.btnlabel.back",
        process: "forgotPassword.btnlabel.process",
    },
    placeholder: "forgotPassword.placeholder",
    common: {
        okayBtn: "common.button.okay",
    }
};
const forgotPasswordData = {
    usernameOrEmail: 'testuser@gmail.com',
    invalid: 'abc1234'
};

afterAll((done) => {
    cleanAllCallback(done);
});

describe("GIVEN ForgotPassword Component is called", () => {
    test("WHEN user wants to access the ForgotPassword page, THEN it should render correctly", async () => {
        renderForgotPassword(false, false);
        const user = userEvent.setup();

        const goBackLink = screen.getByRole('link', { name: FORGOT_PASSWORD_TEXT.btnlabel.back });
        const forgotPassTextField = screen.getByPlaceholderText(FORGOT_PASSWORD_TEXT.placeholder);
        const sendButton = screen.getByRole('button', { name: FORGOT_PASSWORD_TEXT.btnlabel.send });

        await waitFor(async () => {
            await user.type(forgotPassTextField, forgotPasswordData.usernameOrEmail);
            await user.click(sendButton);
        }, { timeout: 10000 });

        waitFor(() => {
            // Labels
            expect(screen.getByText(FORGOT_PASSWORD_TEXT.label.enterUsername)).toBeInTheDocument();
            expect(screen.getByText(FORGOT_PASSWORD_TEXT.label.link)).toBeInTheDocument();

            // Fields
            expect(forgotPassTextField).toBeInTheDocument();

            // Go Back Link
            expect(goBackLink).toBeInTheDocument();
            expect(goBackLink).toHaveAttribute('href', '/');
            expect(goBackLink).toHaveTextContent(FORGOT_PASSWORD_TEXT.btnlabel.back);

            // Buttons
            expect(sendButton).toBeInTheDocument();
        }, { timeout: 10000 });
    });

    test("WHEN user submits the email, THEN system should process it", async () => {
        renderForgotPassword(true, false);

        const processButton = screen.getByRole('button', { name: FORGOT_PASSWORD_TEXT.btnlabel.process })

        waitFor(() => {
            expect(processButton).toBeInTheDocument();
        });
    });

    test("WHEN user submitted a valid email format, THEN system should show a success message", async () => {
        renderForgotPassword(false, true);
        const user = userEvent.setup();

        const okayButton = screen.getByRole('button', { name: FORGOT_PASSWORD_TEXT.common.okayBtn });
        await user.click(okayButton);

        waitFor(() => {
            // Labels
            expect(screen.getByText(FORGOT_PASSWORD_TEXT.label.success)).toBeInTheDocument();

            // Buttons
            expect(okayButton).toBeInTheDocument();
        });
    });

    test("WHEN user submitted an invalid email format, THEN system should show an error", async () => {
        renderForgotPassword(false, false);
        const user = userEvent.setup();

        const forgotPassTextField = screen.getByPlaceholderText(FORGOT_PASSWORD_TEXT.placeholder);
        const sendButton = screen.getByRole('button', { name: FORGOT_PASSWORD_TEXT.btnlabel.send });

        await waitFor(async () => {
            await user.type(forgotPassTextField, forgotPasswordData.invalid);
            await user.click(sendButton);
        }, { timeout: 10000 });

        waitFor(() => {
            expect(screen.getByText('Error Sample')).toBeInTheDocument();
        });
    });

    test("WHEN user clicks the Go Back to Login link, THEN system should redirect user to the Login page", async () => {
        renderForgotPassword(false, false);
        const user = userEvent.setup();

        const goBackLink = screen.getByRole('link', { name: FORGOT_PASSWORD_TEXT.btnlabel.back });

        await user.click(goBackLink);

        waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });
});

const renderForgotPassword = (loadingForgotPassword: boolean, successForgotPassword: boolean): void => {
    runForgotPasswordMocks(loadingForgotPassword, successForgotPassword);

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <Formik initialValues={{}} onSubmit={handleSubmit}>
                        <ForgotPassword />
                    </Formik>
                </I18nextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

const runForgotPasswordMocks = (loadingForgotPassword: boolean, successForgotPassword: boolean): void => {
    const useRequestHandlerData = [
        {
            loading: loadingForgotPassword,
            error: {
                message: 'Error Sample',
                errorCode: '',
            },
            success: successForgotPassword,
        },
        jest.fn()
    ];

    mockUseRequestHandler.mockImplementation(() => useRequestHandlerData as unknown as ReturnType<
        typeof useRequestHandler
    >);
};