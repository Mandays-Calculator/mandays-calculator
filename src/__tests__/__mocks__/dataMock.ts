export const CHANGE_PASSWORD_TEXT = {
    label: 'changePassword.label.createNewPassword',
    placeholder: {
        password: "changePassword.placeholder.password",
        confirmPassword: "changePassword.placeholder.confirmPassword"
    },
    btnlabel: {
        changePassword: 'changePassword.btnlabel.changePassword',
        cancel: 'changePassword.btnlabel.cancel'
    }
};

interface ChangePasswordTestConfig {
    title: string;
    password: string;
    confirmPassword: string;
    expectedResults: Record<string, boolean>;
}

export const CHANGEPASSWORD_TESTCASES: ChangePasswordTestConfig[] = [
    {
        title: 'WHEN the passwords entered by the user are matched and valid, THEN all validations are passed',
        password: 'Passw0rd!',
        confirmPassword: 'Passw0rd!',
        expectedResults: {
            'green-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'green-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user is less than the minimum characters, THEN `length` validation must be red',
        password: 'P0d!',
        confirmPassword: 'P0d!',
        expectedResults: {
            'red-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'green-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user has no uppercase, THEN `no uppercase` validation must be red',
        password: 'passw0rd!',
        confirmPassword: 'passw0rd!',
        expectedResults: {
            'green-icon-password-length': true,
            'red-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'green-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user has no lowercase, THEN `no lowercase` validation must be red',
        password: 'PASSW0RD!',
        confirmPassword: 'PASSW0RD!',
        expectedResults: {
            'green-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'red-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'green-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user has no number, THEN `no number` validation must be red',
        password: 'Password!',
        confirmPassword: 'Password!',
        expectedResults: {
            'green-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'red-icon-password-number': true,
            'green-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user has no symbol, THEN `no symbol` validation must be red',
        password: 'Passw0rd1',
        confirmPassword: 'Passw0rd1',
        expectedResults: {
            'green-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'red-icon-password-symbol': true,
            'green-icon-password-match': true,
        },
    },
    {
        title: 'WHEN the passwords entered by the user are not matched, THEN `not match` validation must be red',
        password: 'Passw0rd!',
        confirmPassword: 'Passw0rd!!',
        expectedResults: {
            'green-icon-password-length': true,
            'green-icon-password-uppecase': true,
            'green-icon-password-lowercase': true,
            'green-icon-password-number': true,
            'green-icon-password-symbol': true,
            'red-icon-password-match': true,
        },
    },
];