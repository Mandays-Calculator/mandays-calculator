import { MemoryRouter } from 'react-router-dom';

import { RenderResult, render, waitFor } from '@testing-library/react';

import { Auth } from '~/pages/auth';

import { cleanAllCallback } from './utils/auth-utils';

jest.mock('~/pages/auth/components/auth-container', () => ({
    ...jest.requireActual('~/pages/auth/components/auth-container'),
    AuthContainer: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('~/pages/auth', () => ({
    ...jest.requireActual('~/pages/auth'),
    Login: jest.fn(() => <div>Login Component</div>),
    ForgotPassword: jest.fn(() => <div>Forgot Password Component</div>),
}));

jest.mock('~/components/footer', () => ({
    Footer: jest.fn(() => <div>Footer Component</div>),
}));

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN Auth Component,', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('WHEN Auth Component is called and has a default path, THEN user should be redirected to the Login component', async () => {
        const { getByText } = renderAuth('/');

        await waitFor(() => {
            expect(getByText('Login Component')).toBeInTheDocument();
            expect(getByText('Footer Component')).toBeInTheDocument(); // expect footer component to be rendered
        });
    });

    test('WHEN Auth Component is called and has login path, THEN user should be redirected to the Login component', async () => {
        const { getByText } = renderAuth('/login');

        await waitFor(() => {
            expect(getByText('Login Component')).toBeInTheDocument();
            expect(getByText('Footer Component')).toBeInTheDocument(); // expect footer component to be rendered
        });
    });

    test('WHEN Auth Component is called and has forgot-password path, THEN user should be redirected to the ForgotPassword component', async () => {
        const { getByText } = renderAuth('/forgot-password');

        await waitFor(() => {
            expect(getByText('Forgot Password Component')).toBeInTheDocument();
            expect(getByText('Footer Component')).toBeInTheDocument(); // expect footer component to be rendered
        });
    });

    test('WHEN Auth Component is called and has no particular path, THEN user should be redirected to the Login component', async () => {
        const { getByText } = renderAuth('/*');

        await waitFor(() => {
            expect(getByText('Login Component')).toBeInTheDocument();
            expect(getByText('Footer Component')).toBeInTheDocument(); // expect footer component to be rendered
        });
    });
});

const renderAuth = (path: string): RenderResult => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Auth />
        </MemoryRouter>
    );

}