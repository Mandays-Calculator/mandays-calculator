import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Formik } from 'formik';

import PasswordInput from '~/pages/auth/components/password-input/PasswordInput';

const PLACEHOLDER = 'Enter your password';

describe('GIVEN PasswordInput Component', () => {
    test('WHEN PasswordInput component is rendered, THEN it should hide the password by default', () => {
        renderPasswordInput();

        const passwordInput = screen.getByPlaceholderText(PLACEHOLDER);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('WHEN the eye icon is clicked, THEN it should toggle password visibility', async () => {
        renderPasswordInput();

        const passwordInput = screen.getByPlaceholderText(PLACEHOLDER);
        expect(passwordInput).toHaveAttribute('type', 'password');

        // toggles the eye icon to show password
        const eyeIcon = screen.getByTestId('icon-button');
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

    test('WHEN PasswordInput component is rendered, THEN it should have showPassword set to false by default', () => {
        renderPasswordInput();

        const passwordInput = screen.getByPlaceholderText(PLACEHOLDER);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('WHEN PasswordInput component is rendered with helperText, THEN it should render the helper text', () => {
        const helperText = 'Helper text here';
        render(
            <Formik initialValues={{}} onSubmit={jest.fn()}>
                <PasswordInput name="password" helperText={helperText} />
            </Formik>
        );

        const helperTextElement = screen.getByText(helperText);
        expect(helperTextElement).toBeInTheDocument();
    });

    test('WHEN PasswordInput component is rendered with custom placeholder, THEN it should render the custom placeholder', () => {
        renderPasswordInput();

        const passwordInput = screen.getByPlaceholderText(PLACEHOLDER);
        expect(passwordInput).toBeInTheDocument();
    });
});

const renderPasswordInput = () => {
    render(
        <Formik initialValues={{}} onSubmit={jest.fn()}>
            <PasswordInput name="password" placeholder={PLACEHOLDER} />
        </Formik>
    );
};