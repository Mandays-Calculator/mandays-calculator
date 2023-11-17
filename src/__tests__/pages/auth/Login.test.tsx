import type { AuthContextProps } from 'react-oidc-context';
import type { RenderResult } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { Login } from '~/pages/auth';

import { cleanAllCallback } from './utils/auth-utils';

// mock setup
jest.mock('react-oidc-context');

// mock the i18next translation function
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

// mocked function
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// constant var declarations
// const USERNAME_PLACEHOLDER = 'login.placeholder.userName';
const PASSWORD_PLACEHOLDER = 'login.placeholder.password';
const BUTTON_NAME = 'login.btnlabel.signIn';
const handleSignin = jest.fn();

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN Login Component', () => {
    test('WHEN Login is rendered, THEN it should hide the password by default', async () => {
        const { getByPlaceholderText, getByRole } = renderLogin();
        const user = userEvent.setup();

        const passwordInput = getByPlaceholderText(PASSWORD_PLACEHOLDER);
        await user.click(getByRole('button', { name: BUTTON_NAME }));

        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('WHEN the eye icon is clicked, THEN it should toggle password visibility', async () => {
        const { getByPlaceholderText, getByTestId } = renderLogin();

        const passwordInput = getByPlaceholderText(PASSWORD_PLACEHOLDER);
        expect(passwordInput).toHaveAttribute('type', 'password');

        // toggles the eye icon to show password
        const eyeIcon = getByTestId('icon-button');
        await userEvent.click(eyeIcon);

        await waitFor(() => {
            expect(passwordInput).toHaveAttribute('type', 'text');
        });

        // toggles the eye icon to hide password
        await userEvent.click(eyeIcon);

        await waitFor(() => {
            expect(passwordInput).toHaveAttribute('type', 'password');
        })
    });
});

const renderLogin = (): RenderResult => {
    runAuthenticatedAppMocks();

    return render(
        <MemoryRouter>
            <Formik initialValues={{}} onSubmit={handleSignin}>
                <Login />
            </Formik>
        </MemoryRouter>
    );
};

const runAuthenticatedAppMocks = (): void => {
    mockUseAuth.mockReturnValue({
        signinResourceOwnerCredentials: jest.fn()
    } as unknown as AuthContextProps);
}