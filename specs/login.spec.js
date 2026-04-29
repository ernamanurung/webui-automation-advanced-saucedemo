const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const LoginAction = require('../actions/LoginAction');
const { users, expectedValues } = require('../testData/sauceDemoData');
const { compareScreenshots } = require('../utils/visualRegression');

describe('Login SauceDemo - Advanced Part 2', function () {
    this.timeout(60000);
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await LoginAction.open(driver);
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Positive Case | Login sukses dengan kredensial valid', async function () {
        await LoginAction.login(
            driver,
            users.standardUser.username,
            users.standardUser.password
        );
        
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes('inventory.html');
        }, 5000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal(expectedValues.inventoryUrl);
        
        const title = await LoginAction.getPageTitle(driver);
        expect(title).to.equal(expectedValues.pageTitle);

        // Tunggu sebentar agar semua gambar di inventory page ter-load sempurna
        await driver.sleep(2000);

        // Visual Regression
        await compareScreenshots(driver, 'positive-login-success');
    });

    it('Negative Case | Login dengan invalid username', async function () {
        await LoginAction.login(
            driver,
            'user_tidak_ada',
            users.standardUser.password
        );
        const errorMsg = await LoginAction.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorInvalidCredentials);

        // Visual Regression
        await compareScreenshots(driver, 'negative-invalid-username');
    });

    it('Negative Case | Login dengan wrong password', async function () {
        await LoginAction.login(
            driver,
            users.standardUser.username,
            'password_salah'
        );
        const errorMsg = await LoginAction.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorInvalidCredentials);

        // Visual Regression
        await compareScreenshots(driver, 'negative-wrong-password');
    });

    it('Negative Case | Login dengan locked_out_user', async function () {
        await LoginAction.login(
            driver,
            users.lockedUser.username,
            users.lockedUser.password
        );
        const errorMsg = await LoginAction.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorLockedUser);

        // Visual Regression
        await compareScreenshots(driver, 'negative-locked-out-user');
    });
});
