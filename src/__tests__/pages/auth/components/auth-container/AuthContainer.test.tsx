import { render, RenderResult } from '@testing-library/react';
import { AuthContainer } from '~/pages/auth/components/auth-container';

describe('GIVEN AuthContainer,', () => {
    let rendered: RenderResult;

    beforeEach(() => {
        rendered = renderAuthContainer();
    });

    it('WHEN AuthContainer is called, it should render the child component correctly', () => {
        const { getByText } = rendered;

        // Check if the child component is rendered
        expect(getByText('Child Component')).toBeInTheDocument();
    });

    it('WHEN AuthContainer is called, it should render the image with correct alt text and attributes', () => {
        const { getByAltText } = rendered;

        // Check if the image is rendered with the correct alt text
        const image = getByAltText('login');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('width', '556');
        expect(image).toHaveAttribute('height', '556');
    });
});

// Helper function to render the AuthContainer with a child component
function renderAuthContainer() {
    return render(
        <AuthContainer>
            <div>Child Component</div>
        </AuthContainer>
    );
}