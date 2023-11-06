import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ChangePassword } from '~/pages/auth';

afterEach(cleanup);

afterAll(cleanup);

describe('GIVEN user changes password,', () => {
    test('WHEN the passwords entered by the user are matched and valid, THEN all validations are passed', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'Passw0rd!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'Passw0rd!');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user is less than the minimum characters, THEN `length` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'P0d!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'P0d!');

        await waitFor(() =>{
            expect(screen.getByTestId('red-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user has no uppercase, THEN `no uppercase` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'passw0rd!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'passw0rd!');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('red-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user has no lowercase, THEN `no lowercase` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'PASSW0RD!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'PASSW0RD!');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('red-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user has no number, THEN `no number` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'Password!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'Password!');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('red-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user has no symbol, THEN `no symbol` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'Passw0rd1');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'Passw0rd1');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('red-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-match')).toBeInTheDocument();
        });
    });

    test('WHEN the passwords entered by the user are not matched, THEN `not match` validation must be red', async () => {
        render(<ChangePassword />)
        const user = userEvent.setup()

        await user.type(screen.getByPlaceholderText('Input Password'), 'Passw0rd!');
        await user.type(screen.getByPlaceholderText('Confirm Password'), 'Passw0rd!!');

        await waitFor(() =>{
            expect(screen.getByTestId('green-icon-password-length')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-uppecase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-lowercase')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-number')).toBeInTheDocument();
            expect(screen.getByTestId('green-icon-password-symbol')).toBeInTheDocument();
            expect(screen.getByTestId('red-icon-password-match')).toBeInTheDocument();
        });
    });
});