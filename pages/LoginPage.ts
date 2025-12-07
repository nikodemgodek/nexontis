const { I } = inject();

export const LoginPage = {
    fields: {
        usernameField: 'input[data-test="username"]',
        passwordField: 'input[data-test="password"]',
        loginButton: 'input[data-test="login-button"]'
    },

    fillLoginForm(username: string, password: string) { 
        I.fillField(this.fields.usernameField, username);
        I.fillField(this.fields.passwordField, password);
    }
};