import type { AuthContextProps } from 'react-oidc-context';
import type { ConfigType } from '~/utils/env-config';
import type { User } from 'oidc-client-ts';

import { useAuth } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next } from 'react-i18next';

import { render, waitFor } from '@testing-library/react';

import i18n from 'i18next';

import AuthenticatedApp from '~/AuthenticatedApp';
import { getEnvConfig } from '~/utils/env-config';
import { getUser } from '~/utils/oidc-utils';

import { cleanAllCallback } from './pages/auth/utils/auth-utils';

// Mock the i18next translation function
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
    react: {
        useSuspense: false,
    },
});

jest.mock('~/api/axios.config')
jest.mock('~/utils/oidc-utils')
jest.mock('~/utils/env-config')
jest.mock('react-oidc-context');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockGetUser = getUser as jest.MockedFunction<typeof getUser>;
const mockGetEnvConfig = getEnvConfig as jest.MockedFunction<typeof getEnvConfig>;

afterAll((done) => {
    cleanAllCallback(done);
});

describe('GIVEN AuthenticatedApp Component is called', () => {
    test('WHEN user is authenticated, THEN it should render the landing page', async () => {
        const useAuthData = { isLoading: false, isAuthenticated: true };
        const getUserData = { access_token: 'mockAccessToken', profile: { name: 'Juan Dela Cruz' } };
        const getEnvConfigData = { enableAuth: true };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`user-authenticated`);
        });
    });

    test('WHEN user is not authenticated, THEN it should render Auth component', async () => {
        const useAuthData = { isLoading: false, isAuthenticated: false };
        const getUserData = {};
        const getEnvConfigData = { enableAuth: true };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`user-not-authenticated`);
        });
    });

    test('WHEN user is already authenticated, THEN it should automatically be signedin', async () => {
        const useAuthData = { isLoading: false, isAuthenticated: true };
        const getUserData = { access_token: 'mockAccessToken', profile: { name: 'Juan Dela Cruz' } };
        const getEnvConfigData = { enableAuth: false };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`user-already-authenticated`);
        });
    });

    test('WHEN user is signing in, THEN it should display the `Signing you in...` text', async () => {
        const useAuthData = { activeNavigator: 'signinSilent', isLoading: true, isAuthenticated: true };
        const getUserData = { access_token: 'mockAccessToken' };
        const getEnvConfigData = { enableAuth: true };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`user-signin`);
        });
    });

    test('WHEN user is signing out, THEN it should display the `Signing you out...` text', async () => {
        const useAuthData = { activeNavigator: 'signoutRedirect', isLoading: false, isAuthenticated: true };
        const getUserData = {};
        const getEnvConfigData = { enableAuth: true };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`user-signout`);
        });
    });

    test('WHEN page loads, THEN it should display the PageLoader', async () => {
        const useAuthData = { isLoading: true, isAuthenticated: false };
        const getUserData = {};
        const getEnvConfigData = { enableAuth: true };

        const renderResult = renderAuthenticatedApp(useAuthData, getUserData, getEnvConfigData);

        if (!renderResult) {
            throw new Error('Rendering failed.');
        }

        const { container } = renderResult;

        await waitFor(() => {
            expect(container).toMatchSnapshot(`page-loading`);
        });
    });
});

const renderAuthenticatedApp = (useAuthData: object, getUserData: object, getEnvConfigData: object): ReturnType<typeof render> | undefined => {
    runAuthenticatedAppMocks(useAuthData, getUserData, getEnvConfigData);

    return render(
        <BrowserRouter>
            <AuthenticatedApp />
        </BrowserRouter>
    );
}

const runAuthenticatedAppMocks = (useAuthData: object, getUserData: object, getEnvConfigData: object): void => {
    mockUseAuth.mockReturnValue(useAuthData as unknown as AuthContextProps);
    mockGetUser.mockReturnValue(getUserData as unknown as User);
    mockGetEnvConfig.mockReturnValue(getEnvConfigData as unknown as ConfigType);
}