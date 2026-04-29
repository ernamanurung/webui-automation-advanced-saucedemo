const { By } = require('selenium-webdriver');

class LoginPage {
    constructor() {
        // Element Selectors
        this.inputUsername = By.id('user-name');
        this.inputPassword = By.id('password');
        this.btnLogin = By.id('login-button');
        this.errorMessage = By.css('[data-test="error"]');
        this.pageTitle = By.css('.title');
        this.btnBurgerMenu = By.id('react-burger-menu-btn');
        this.btnLogout = By.id('logout_sidebar_link');
    }
}

module.exports = new LoginPage();

