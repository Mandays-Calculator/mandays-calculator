import { I18nextProvider } from 'react-i18next';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Formik } from 'formik';
import i18n from '~/i18n';

import { CHANGEPASSWORD_TESTCASES, CHANGE_PASSWORD_TEXT } from '~/__tests__/__mocks__/dataMock';
import ChangePasswordModal from '~/pages/auth/ChangePasswordModal';
import { cleanAllCallback } from './utils/auth-utils';

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {},
    },
    lng: 'en',
    interpolation: { escapeValue: false }, // react already safes from xss
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const handleSubmit = jest.fn();
const handleClose = jest.fn();

afterEach((done) => {
    cleanAllCallback(done);
});

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN user changes password via modal,', () => {
    test('WHEN ChangePasswordModal is closed, THEN it should not render the ChangePassword Modal', () => {
        renderChangePasswordModal(false);

        expect(screen.queryByText(CHANGE_PASSWORD_TEXT.label)).toBeNull();
    });

    test('WHEN user access the ChangePasswordModal, THEN it should render the ChangePassword Modal correctly', () => {
        renderChangePasswordModal(true);

        expect(screen.getByText(CHANGE_PASSWORD_TEXT.label)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.changePassword })).toBeInTheDocument();
    });

    test.each(CHANGEPASSWORD_TESTCASES)(
        `%s`,
        async ({ password, confirmPassword, expectedResults }) => {
            renderChangePasswordModal(true);
            const user = userEvent.setup();

            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.password), password);
            await user.type(screen.getByPlaceholderText(CHANGE_PASSWORD_TEXT.placeholder.confirmPassword), confirmPassword);
            await user.click(screen.getByRole('button', { name: CHANGE_PASSWORD_TEXT.btnlabel.changePassword }));

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

const renderChangePasswordModal = (open: boolean): void => {
    render(
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <ChangePasswordModal open={open} onClose={handleClose} />
            </Formik>
        </I18nextProvider>
    );
};
