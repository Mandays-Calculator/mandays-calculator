import { I18nextProvider } from 'react-i18next';
import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import i18n from '~/i18n';

import { Auth } from '~/pages/auth';

// Mock the i18next translation function
i18n.init({
    resources: {
        en: {},
    },
    lng: 'en',
    interpolation: { escapeValue: false }, // react already safes from xss
});

describe('GIVEN a CustomCheckIcon component', () => {
    test('WHEN rendered without children, THEN it should not display the children container', () => {
        renderAuth(null);

        expect(screen.queryByText('Custom Text')).not.toBeInTheDocument();
    });

    test('WHEN rendered with children, THEN it should display the children container', () => {
        const childrenText = 'Custom Text';

        renderAuth(childrenText);

        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });
});

const renderAuth = (children: ReactNode): void => {
    render(
        <I18nextProvider i18n={i18n}>
            <Auth>{children}</Auth>
        </I18nextProvider>
    );
};
