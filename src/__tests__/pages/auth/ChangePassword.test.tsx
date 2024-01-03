import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { render, waitFor } from '@testing-library/react';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { ChangePassword } from '~/pages/auth';

import { QueryClient, QueryClientProvider } from 'react-query';
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

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

const queryClient = new QueryClient();
const handleSubmit = jest.fn();

describe('GIVEN ChangePassword component is called,', () => {
    test('WHEN user changes password, THEN it should display correctly', async () => {
        const { container } = renderChangePassword();

        await waitFor(() => {
            expect(container).toMatchSnapshot(`change-password`);
        });
    });
});

const renderChangePassword = () => {
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
