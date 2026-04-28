const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor() {
        // Element Selectors
        this.selectors = {
            inputUsername: By.id('user-name'),
            inputPassword: By.id('password'),
            btnLogin: By.id('login-button'),
            errorMessage: By.css('[data-test="error"]'),
            pageTitle: By.css('.title'),
            btnBurgerMenu: By.id('react-burger-menu-btn'),
            btnLogout: By.id('logout_sidebar_link')
        };
    }

    async open(driver) {
        await driver.get('https://www.saucedemo.com');
        await driver.manage().window().maximize();
    }

    async login(driver, username, password) {
        const userField = await driver.findElement(this.selectors.inputUsername);
        const passField = await driver.findElement(this.selectors.inputPassword);
        
        await userField.clear();
        await userField.sendKeys(username);
        await passField.clear();
        await passField.sendKeys(password);
        
        const loginBtn = await driver.findElement(this.selectors.btnLogin);
        await driver.executeScript("arguments[0].click();", loginBtn);
    }

    async logout(driver) {
        const burgerBtn = await driver.wait(until.elementLocated(this.selectors.btnBurgerMenu), 5000);
        await burgerBtn.click();
        
        const logoutBtn = await driver.wait(until.elementLocated(this.selectors.btnLogout), 5000);
        await driver.executeScript("arguments[0].click();", logoutBtn);
    }

    async getErrorMessage(driver) {
        const errorEl = await driver.wait(until.elementLocated(this.selectors.errorMessage), 5000);
        return await errorEl.getText();
    }

    async getPageTitle(driver) {
        const titleEl = await driver.wait(until.elementLocated(this.selectors.pageTitle), 5000);
        return await titleEl.getText();
    }
}

module.exports = new LoginPage();
