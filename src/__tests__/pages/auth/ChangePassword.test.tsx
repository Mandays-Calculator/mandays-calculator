import { I18nextProvider } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { ChangePassword } from '~/pages/auth';

import { cleanAllCallback } from './utils/auth-utils';

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const CHANGE_PASSWORD_TEXT = {
    label: 'changePassword.label.createNewPassword',
    placeholder: {
        password: "changePassword.placeholder.userName",
        confirmPassword: "changePassword.placeholder.password"
    },
    button: 'changePassword.btnlabel.changePassword'
};

const handleSubmit = jest.fn();

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN user changes password,', () => {
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

    test('WHEN user access the ChangePassword page, THEN it should render the ChangePassword component correctly', () => {
        renderChangePassword();

        expect(screen.getByText(CHANGE_PASSWORD_TEXT.label)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.button })).toBeInTheDocument();
    });

    test.each(testCases)(
        `%s`,
        async ({ password, confirmPassword, expectedResults }) => {
            renderChangePassword();
            const user = userEvent.setup();

            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password), password);
            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword), confirmPassword);
            await user.click(screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.button }));

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
});

describe('GIVEN user wants to go cancel changing password,', () => {
    test('WHEN user clicks the cancel button, THEN it should navigate back', async () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        renderChangePassword();

        await userEvent.click(screen.getByRole('button', { name: /Cancel/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });
});

const renderChangePassword = () => {
    render(
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <ChangePassword />
            </Formik>
        </I18nextProvider>
    );
};
