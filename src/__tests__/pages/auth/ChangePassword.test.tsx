import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { render, waitFor } from '@testing-library/react';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { useResetPasswordMutation } from '~/mutations/auth';
import { useRequestHandler } from '~/hooks/request-handler';
import { ChangePassword } from '~/pages/auth';

import { cleanAllCallback } from './utils/auth-utils';
import userEvent from '@testing-library/user-event';

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {
            translation: {
                "changePassword": {
                    "label": {
                        "createNewPassword": "Create New Password",
                        "enterNewPassword": "Enter new password",
                        "confirmNewPassword": "Confirm new password"
                    },
                    "btnlabel": {
                        "changePassword": "Change Password",
                        "cancel": "Cancel"
                    },
                    "validationInfo": {
                        "charCount": "Password must be at least 8 characters long",
                        "uppercase": "Password must contain an uppercase letter",
                        "lowercase": "Password must contain a lowercase letter",
                        "number": "Password must contain a number",
                        "symbol": "Password must contain one of the following symbols (#$-_!)",
                        "match": "New password and confirm new password must match."
                    }
                },
            },
        },
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

const CHANGE_PASSWORD_TEXT = {
    label: 'changePassword.label.createNewPassword',
    placeholder: {
        password: "changePassword.placeholder.password",
        confirmPassword: "changePassword.placeholder.confirmPassword"
    },
    btnlabel: {
        changePassword: 'changePassword.btnlabel.changePassword',
        cancel: 'changePassword.btnlabel.cancel'
    }
};

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
>;
const mockUseResetPasswordMutation = useResetPasswordMutation as jest.MockedFunction<
    typeof useResetPasswordMutation
>;
const mockUseRequestHandler = useRequestHandler as jest.MockedFunction<
    typeof useRequestHandler
>;

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

const queryClient = new QueryClient();
const handleSubmit = jest.fn();

describe('GIVEN ChangePassword component is called,', () => {
    interface TestConfig {
        title: string;
        password: string;
        confirmPassword: string;
        expectedResults: Record<string, boolean>;
    }

    const testCases: TestConfig[] = [
        {
            title: 'WHEN the passwords entered by the user are matched and valid, THEN all validations are passed',
            password: 'Passw0rd!',
            confirmPassword: 'Passw0rd!',
            expectedResults: {
                'green-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'green-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user is less than the minimum characters, THEN `length` validation must be red',
            password: 'P0d!',
            confirmPassword: 'P0d!',
            expectedResults: {
                'red-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'green-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user has no uppercase, THEN `no uppercase` validation must be red',
            password: 'passw0rd!',
            confirmPassword: 'passw0rd!',
            expectedResults: {
                'green-icon-password-length': true,
                'red-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'green-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user has no lowercase, THEN `no lowercase` validation must be red',
            password: 'PASSW0RD!',
            confirmPassword: 'PASSW0RD!',
            expectedResults: {
                'green-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'red-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'green-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user has no number, THEN `no number` validation must be red',
            password: 'Password!',
            confirmPassword: 'Password!',
            expectedResults: {
                'green-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'red-icon-password-number': true,
                'green-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user has no symbol, THEN `no symbol` validation must be red',
            password: 'Passw0rd1',
            confirmPassword: 'Passw0rd1',
            expectedResults: {
                'green-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'red-icon-password-symbol': true,
                'green-icon-password-match': true,
            },
        },
        {
            title: 'WHEN the passwords entered by the user are not matched, THEN `not match` validation must be red',
            password: 'Passw0rd!',
            confirmPassword: 'Passw0rd!!',
            expectedResults: {
                'green-icon-password-length': true,
                'green-icon-password-uppecase': true,
                'green-icon-password-lowercase': true,
                'green-icon-password-number': true,
                'green-icon-password-symbol': true,
                'red-icon-password-match': true,
            },
        },
    ];

    test.each(testCases)(
        `%s`,
        async ({ password, confirmPassword, expectedResults }) => {
            const { getByPlaceholderText, queryByTestId } = renderChangePassword(false, false);
            const user = userEvent.setup();

            await user.type(getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password), password);
            await user.type(getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword), confirmPassword);

            await waitFor(() => {
                Object.entries(expectedResults).forEach(([testId, shouldExist]) => {
                    const element = queryByTestId(testId);
                    if (shouldExist) {
                        expect(element).toBeInTheDocument();
                    } else {
                        expect(element).toBeNull();
                    }
                });
            });
        }
    );

    test('WHEN user changes password, THEN it should display correctly', async () => {
        const { container, getByRole } = renderChangePassword(false, false);
        const user = userEvent.setup();

        await user.click(getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.changePassword }));
        await user.click(getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.cancel }));

        await waitFor(() => {
            expect(container).toMatchSnapshot(`change-password`);
        });
    });

    test('WHEN user succesfully changes the password, THEN it should display a success message', async () => {
        const { container, getByRole } = renderChangePassword(true, true);
        const user = userEvent.setup();

        await user.click(getByRole('button', { name: 'login.btnlabel.signIn' }));

        await waitFor(() => {
            expect(container).toMatchSnapshot(`change-password-success`);
        });
    });
});

const renderChangePassword = (codeParam: boolean, successChangePassword: boolean) => {
    runChangePasswordMocks(codeParam, successChangePassword);

    return render(
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
    }

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
