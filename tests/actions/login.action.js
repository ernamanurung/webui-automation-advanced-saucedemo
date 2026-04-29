const { until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

class LoginAction {
    constructor(driver) {
        this.driver = driver;
    }

    async openLoginPage(url) {
        await this.driver.get(url);
        await this.driver.manage().window().maximize();
    }

    async inputUsername(username) {
        const element = await this.driver.findElement(LoginPage.usernameInput);
        await element.clear();
        await element.sendKeys(username);
    }

    async inputPassword(password) {
        const element = await this.driver.findElement(LoginPage.passwordInput);
        await element.clear();
        await element.sendKeys(password);
    }

    async clickLogin() {
        const element = await this.driver.findElement(LoginPage.loginButton);
        await this.driver.executeScript("arguments[0].click();", element);
    }

    async assertLoginSuccess() {
        const title = await this.driver.wait(until.elementLocated(LoginPage.pageTitle), 5000).getText();
        assert.strictEqual(title, 'Products');
    }

    async assertLoginFailed(expectedError) {
        const errorMsg = await this.driver.wait(until.elementLocated(LoginPage.errorMessage), 5000).getText();
        assert.ok(errorMsg.includes(expectedError), `Expected error to contain "${expectedError}", but got "${errorMsg}"`);
    }
}

module.exports = LoginAction;
