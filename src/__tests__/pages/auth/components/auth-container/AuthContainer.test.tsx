import { ReactNode } from 'react';

import { RenderResult, render } from '@testing-library/react';

import { AuthContainer } from '~/pages/auth/components/auth-container';
import LoginIcon from "~/assets/svg/login-icon.svg";

describe('GIVEN AuthContainer Component', () => {
    test('WHEN AuthContainer Component is called with default props, THEN it should render correctly', () => {
        const { asFragment } = render(<AuthContainer />);

        expect(asFragment()).toMatchSnapshot(`component-default-props`);
    });

    test('WHEN AuthContainer Component is called with custom children, THEN it should render correctly', () => {
        const customChildren = <div>Custom Content</div>;
        const { asFragment } = renderAuthContainer(customChildren);

        expect(asFragment()).toMatchSnapshot(`component-custom-children`);
    });

    test('WHEN AuthContainer Component is called with different children (image), THEN it should render correctly', () => {
        const imageChildren = (
            <img src={LoginIcon} alt="example" width="100%" height="auto" />
        );
        const { asFragment } = renderAuthContainer(imageChildren);

        expect(asFragment()).toMatchSnapshot(`component-image-children`);
    });

    test('WHEN AuthContainer Component is called with different children (nested components), THEN it should render correctly', () => {
        const nestedChildren = (
            <div>
                <h1>Nested Content</h1>
                <p>Some text inside nested content.</p>
            </div>
        );
        const { asFragment } = renderAuthContainer(nestedChildren);

        expect(asFragment()).toMatchSnapshot(`component-nested-components`);
    });

    test('WHEN AuthContainer Component is called with empty children, THEN it should render correctly', () => {
        const { asFragment } = renderAuthContainer(null);

        expect(asFragment()).toMatchSnapshot(`component-empty-children`);
    });

    test('WHEN AuthContainer Component is called with multiple types of children, THEN it should render correctly', () => {
        const mixedChildren = (
            <>
                <div>First Child</div>
                <img src={LoginIcon} alt="example" width="100%" height="auto" />
                <p>Text Child</p>
            </>
        );
        const { asFragment } = renderAuthContainer(mixedChildren);

        expect(asFragment()).toMatchSnapshot(`component-multiple-types`);
    });
});

const renderAuthContainer = (children: ReactNode): RenderResult => {
    return render(
        <AuthContainer>{children}</AuthContainer>
    );
}