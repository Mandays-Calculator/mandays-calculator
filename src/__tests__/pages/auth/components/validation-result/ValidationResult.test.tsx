import { I18nextProvider } from 'react-i18next';

import { render, screen } from '@testing-library/react';

import i18n from "~/i18n";

import ValidationResult from '~/pages/auth/components/validation-result/ValidationResult';

import { CHANGEPASSWORD_TESTCASES } from '~/__tests__/__mocks__/dataMock';
import { cleanAll } from "../../utils/auth-utils";

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {},
    },
    lng: 'en',
    interpolation: { escapeValue: false }, // react already safes from xss
});

afterAll(() => {
    cleanAll();
});

describe("GIVEN ValidationResult Component is called", () => {
    test.each(CHANGEPASSWORD_TESTCASES)(
        `%s`,
        ({ password, confirmPassword, expectedResults }) => {
            const values = {
                password: password,
                confirmPassword: confirmPassword
            };

            renderValidationResult(values);

            Object.entries(expectedResults).forEach(([testId, shouldExist]) => {
                const element = screen.queryByTestId(testId);
                if (shouldExist) {
                    expect(element).toBeInTheDocument();
                } else {
                    expect(element).toBeNull();
                }
            });
        }
    );

    test('WHEN ValidationResult is rendered, THEN it should display all validation info correctly', () => {
        const values = {
            password: '',
            confirmPassword: ''
        };

        renderValidationResult(values);

        const VALIDATION_INFO = {
            charCount: "changePassword.validationInfo.charCount",
            uppercase: "changePassword.validationInfo.uppercase",
            lowercase: "changePassword.validationInfo.lowercase",
            number: "changePassword.validationInfo.number",
            symbol: "changePassword.validationInfo.symbol",
            match: "changePassword.validationInfo.match"
        };

        for (const key in VALIDATION_INFO) {
            const validationMessage = VALIDATION_INFO[key as keyof typeof VALIDATION_INFO];
            expect(screen.getByText(validationMessage)).toBeInTheDocument();
        }
    });
});

const renderValidationResult = (values: { password: string; confirmPassword: string; }): void => {
    render(
        <I18nextProvider i18n={i18n}>
            <ValidationResult values={values} />
        </I18nextProvider>
    );
};
