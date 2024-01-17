import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { useResetPasswordMutation } from '~/mutations/auth';
import { useRequestHandler } from '~/hooks/request-handler';
import { ChangePassword } from '~/pages/auth';

import { CHANGEPASSWORD_TESTCASES, CHANGE_PASSWORD_TEXT } from '~/__tests__/__mocks__/dataMock';
import { cleanAllCallback } from './utils/auth-utils';

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {},
    },
    lng: 'en',
    interpolation: { escapeValue: false }, // react already safes from xss
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(),
}));
jest.mock("~/mutations/auth");
jest.mock("~/hooks/request-handler");

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
>;
const mockUseResetPasswordMutation = useResetPasswordMutation as jest.MockedFunction<
    typeof useResetPasswordMutation
>;
const mockUseRequestHandler = useRequestHandler as jest.MockedFunction<
    typeof useRequestHandler
>;

const queryClient = new QueryClient();
const handleSubmit = jest.fn();

const SIGNIN_BTN_LABEL = 'login.btnlabel.signIn';

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN ChangePassword component is called,', () => {
    test.each(CHANGEPASSWORD_TESTCASES)(
        `%s`,
        async ({ password, confirmPassword, expectedResults }) => {
            renderChangePassword(false, false);
            const user = userEvent.setup();

            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password), password);
            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword), confirmPassword);

            await waitFor(() => {
                Object.entries(expectedResults).forEach(([testId, shouldExist]) => {
                    const element = screen.queryByTestId(testId);
                    if (shouldExist) {
                        expect(element).toBeInTheDocument();
                    } else {
                        expect(element).toBeNull();
                    }
                });
            });
        }
    );

    test('WHEN user wants to access the ChangePassword page, THEN it should display correctly', async () => {
        renderChangePassword(false, false);
        const user = userEvent.setup();

        const passwordTextField = screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password);
        const confirmPasswordTextField = screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword);
        const changePasswordButton = screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.changePassword });
        const cancelButton = screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.cancel });

        await user.type(passwordTextField, 'Passw0rd'!);
        await user.type(confirmPasswordTextField, 'Passw0rd!');
        await user.click(changePasswordButton);

        await waitFor(() => {
            // Labels
            expect(screen.getByText(CHANGE_PASSWORD_TEXT.label.createNewPassword)).toBeInTheDocument();
            expect(screen.getByText(CHANGE_PASSWORD_TEXT.label.enterNewPassword)).toBeInTheDocument();
            expect(screen.getByText(CHANGE_PASSWORD_TEXT.label.confirmNewPassword)).toBeInTheDocument();

            // Fields
            expect(passwordTextField).toBeInTheDocument();
            expect(confirmPasswordTextField).toBeInTheDocument();

            // Buttons
            expect(changePasswordButton).toBeInTheDocument();
            expect(cancelButton).toBeInTheDocument();
        });
    });

    test('WHEN user succesfully changes the password, THEN it should display a success message', async () => {
        renderChangePassword(true, true);
        const user = userEvent.setup();

        const signInlButton = screen.getByRole('button', { name: SIGNIN_BTN_LABEL });

        await user.click(signInlButton);

        await waitFor(() => {
            // Labels
            expect(screen.getByText(CHANGE_PASSWORD_TEXT.label.title)).toBeInTheDocument();
            expect(screen.getByText(CHANGE_PASSWORD_TEXT.label.success)).toBeInTheDocument();

            // Buttons
            expect(signInlButton).toBeInTheDocument();
        });
    });

    test('WHEN user wants to cancel changing the password, THEN system should redirect user to the Login page', async () => {
        renderChangePassword(false, false);
        const user = userEvent.setup();

        const cancelButton = screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.cancel });

        await user.click(cancelButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/login');
        });
    });
});

const renderChangePassword = (codeParam: boolean, successChangePassword: boolean): void => {
    runChangePasswordMocks(codeParam, successChangePassword);

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <Formik initialValues={{}} onSubmit={handleSubmit}>
                        <ChangePassword />
                    </Formik>
                </I18nextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

const runChangePasswordMocks = (codeParam: boolean, successChangePassword: boolean): void => {
    const useSearchParamsData = [
        {
            get: jest.fn(() => codeParam)
        }
    ];

    mockUseSearchParams.mockImplementation(() => useSearchParamsData as unknown as ReturnType<
        typeof useSearchParams
    >);

    const useResetPasswordMutationData = {
        mutate: null
    };

    mockUseResetPasswordMutation.mockImplementation(() => useResetPasswordMutationData as unknown as ReturnType<
        typeof useResetPasswordMutation
    >);

    const useRequestHandlerData = [
        {
            loading: false,
            error: {
                message: '',
                errorCode: '',
            },
            success: successChangePassword,
        },
        jest.fn()
    ];

    mockUseRequestHandler.mockImplementation(() => useRequestHandlerData as unknown as ReturnType<
        typeof useRequestHandler
    >);
};
