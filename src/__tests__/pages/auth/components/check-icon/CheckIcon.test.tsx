import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import CustomCheckIcon from '~/pages/auth/components/check-icon/CheckIcon';

describe('GIVEN a CustomCheckIcon component', () => {
    test('WHEN rendered without children, THEN it should not display the children container', () => {
        renderCustomCheckIcon(null);

        expect(screen.queryByText('Custom Text')).not.toBeInTheDocument();
    });

    test('WHEN rendered with children, THEN it should display the children container', () => {
        const childrenText = 'Custom Text';

        renderCustomCheckIcon(childrenText);

        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });
});

const renderCustomCheckIcon = (children: ReactNode): void => {
    render(
        <CustomCheckIcon>{children}</CustomCheckIcon>
    );
};
