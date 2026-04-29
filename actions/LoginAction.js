const LoginPage = require('../pageObjects/LoginPage');
const { until } = require('selenium-webdriver');

class LoginAction {
    async open(driver) {
        await driver.get('https://www.saucedemo.com');
        await driver.manage().window().maximize();
    }

    async login(driver, username, password) {
        const userField = await driver.findElement(LoginPage.inputUsername);
        const passField = await driver.findElement(LoginPage.inputPassword);
        
        await userField.clear();
        await userField.sendKeys(username);
        await passField.clear();
        await passField.sendKeys(password);
        
        const loginBtn = await driver.findElement(LoginPage.btnLogin);
        await driver.executeScript("arguments[0].click();", loginBtn);
    }

    async logout(driver) {
        const burgerBtn = await driver.wait(until.elementLocated(LoginPage.btnBurgerMenu), 5000);
        await burgerBtn.click();
        
        const logoutBtn = await driver.wait(until.elementLocated(LoginPage.btnLogout), 5000);
        await driver.executeScript("arguments[0].click();", logoutBtn);
    }

    async getErrorMessage(driver) {
        const errorEl = await driver.wait(until.elementLocated(LoginPage.errorMessage), 5000);
        return await errorEl.getText();
    }

    async getPageTitle(driver) {
        const titleEl = await driver.wait(until.elementLocated(LoginPage.pageTitle), 5000);
        return await titleEl.getText();
    }
}

module.exports = new LoginAction();
