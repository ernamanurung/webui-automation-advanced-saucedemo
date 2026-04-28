const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const LoginPage = require('../../pageObjects/LoginPage.js');
const { users, expectedValues } = require('../../testData/sauceDemoData.js');

describe('Login SauceDemo', function () {
    this.timeout(60000);
    let driver;

    beforeEach(async function () {
        console.log('\n▶️  [beforeEach] Memulai test case...');
        console.log('Sebelum test');
        driver = await new Builder().forBrowser('chrome').build();
        await LoginPage.open(driver);
    });

    afterEach(async function () {
        console.log('Setelah test');
        if (driver) {
            await driver.quit();
        }
    });

    it('[Sanity] TC-01 | Login sukses dengan kredensial valid', async function () {
        await LoginPage.login(
            driver,
            users.standardUser.username,
            users.standardUser.password
        );
        
        // Tunggu URL berubah
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes('inventory.html');
        }, 5000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal(expectedValues.inventoryUrl);
        
        const title = await LoginPage.getPageTitle(driver);
        expect(title).to.equal(expectedValues.pageTitle);
    });

    it('TC-02 | Login gagal - password salah', async function () {
        await LoginPage.login(
            driver,
            users.standardUser.username,
            users.invalidUser.password
        );
        const errorMsg = await LoginPage.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorInvalidCredentials);
    });

    it('TC-03 | Login gagal - akun terkunci (locked out user)', async function () {
        await LoginPage.login(
            driver,
            users.lockedUser.username,
            users.lockedUser.password
        );
        const errorMsg = await LoginPage.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorLockedUser);
    });

    it('TC-04 | Login gagal - username kosong', async function () {
        await LoginPage.login(driver, '', users.standardUser.password);
        const errorMsg = await LoginPage.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorEmptyUsername);
    });

    it('TC-05 | Login gagal - password kosong', async function () {
        await LoginPage.login(driver, users.standardUser.username, '');
        const errorMsg = await LoginPage.getErrorMessage(driver);
        expect(errorMsg).to.contain(expectedValues.errorEmptyPassword);
    });

    it('TC-06 | Logout berhasil setelah login sukses', async function () {
        await LoginPage.login(
            driver,
            users.standardUser.username,
            users.standardUser.password
        );
        
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes('inventory.html');
        }, 5000);

        await LoginPage.logout(driver);

        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url === expectedValues.baseUrl + '/';
        }, 5000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal(expectedValues.baseUrl + '/');
    });

});
