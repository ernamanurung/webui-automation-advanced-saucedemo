const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const SharingAction = require('../actions/sharing.action');
const LoginPage = require('../pageobjects/login.page');
const { users, expectedValues } = require('../../testData/sauceDemoData');
const { compareScreenshot } = require('../../utilities/visual_regression.helper');

describe('Login SauceDemo - Sesi 11 Advanced Part 2', function () {
    this.timeout(60000);
    let driver;
    let loginAction;
    let sharingAction;

    beforeEach(async function () {
        console.log('   [beforeEach] Memulai building driver...');
        driver = await new Builder().forBrowser('chrome').build();
        console.log('   [beforeEach] Driver dibuat.');
        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openLoginPage(expectedValues.baseUrl);
        console.log('   [beforeEach] Halaman dibuka.');
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Positive Case | Login sukses dengan kredensial valid', async function () {
        await loginAction.inputUsername(users.standardUser.username);
        await loginAction.inputPassword(users.standardUser.password);
        await loginAction.clickLogin();
        
        // Assertions
        await loginAction.assertLoginSuccess();

        // Manual Screenshot (PDF Page 17)
        await sharingAction.fullPageScreenshot('login_success_manual');

        // Visual Regression (PDF Page 26)
        // Tunggu sebentar agar halaman stabil sebelum komparasi
        await driver.sleep(2000);
        await compareScreenshot(driver, 'login_success_visual');
    });

    it('Negative Case | Login menggunakan invalid username', async function () {
        await loginAction.inputUsername('invalid_user_digital_skola');
        await loginAction.inputPassword(users.standardUser.password);
        await loginAction.clickLogin();

        // Assertions
        await loginAction.assertLoginFailed(expectedValues.errorInvalidCredentials);

        // Manual Screenshot
        await sharingAction.fullPageScreenshot('login_failed_invalid_user');

        // Visual Regression
        await compareScreenshot(driver, 'login_failed_invalid_user_visual');
    });

    it('Negative Case | Login menggunakan wrong password', async function () {
        await loginAction.inputUsername(users.standardUser.username);
        await loginAction.inputPassword('wrong_password_123');
        await loginAction.clickLogin();

        // Assertions
        await loginAction.assertLoginFailed(expectedValues.errorInvalidCredentials);

        // Manual Screenshot
        await sharingAction.fullPageScreenshot('login_failed_wrong_password');

        // Visual Regression
        await compareScreenshot(driver, 'login_failed_wrong_password_visual');
    });

    it('Negative Case | Login menggunakan Locked_out_user', async function () {
        await loginAction.inputUsername(users.lockedUser.username);
        await loginAction.inputPassword(users.lockedUser.password);
        await loginAction.clickLogin();

        // Assertions
        await loginAction.assertLoginFailed(expectedValues.errorLockedUser);

        // Manual Screenshot
        await sharingAction.fullPageScreenshot('login_failed_locked_user');

        // Visual Regression
        await compareScreenshot(driver, 'login_failed_locked_user_visual');
    });
});
