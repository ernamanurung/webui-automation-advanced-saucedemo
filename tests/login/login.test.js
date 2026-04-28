import LoginPage from '../../pageObjects/LoginPage.js';
import { users, expectedValues } from '../../testData/sauceDemoData.js';

// ================================================================
// Test Suite: Login SauceDemo
// Skenario yang diuji:
//   TC-01 : Login sukses dengan kredensial valid
//   TC-02 : Login gagal - password salah
//   TC-03 : Login gagal - akun terkunci (locked user)
//   TC-04 : Login gagal - username kosong
//   TC-05 : Login gagal - password kosong
//   TC-06 : Logout setelah login sukses
// ================================================================

describe('Login SauceDemo', () => {

    // ============================================================
    // MOCHA HOOKS
    // ============================================================

    /**
     * before()
     * Dijalankan SATU KALI sebelum semua test case dalam describe ini.
     * Gunakan untuk: setup yang hanya perlu dilakukan sekali
     * (misal: buka koneksi, siapkan data awal)
     */
    before(async () => {
        console.log('\n📋 [before] Memulai Test Suite: Login SauceDemo');
        console.log('📋 [before] Total skenario: 6 test case');
    });

    /**
     * beforeEach()
     * Dijalankan SEBELUM setiap test case (it).
     * Gunakan untuk: reset kondisi browser, buka halaman awal
     * agar setiap test selalu mulai dari kondisi yang sama (bersih)
     */
    beforeEach(async () => {
        console.log('\n▶️  [beforeEach] Membuka halaman login...');
        await LoginPage.open();
    });

    /**
     * afterEach()
     * Dijalankan SETELAH setiap test case (it) - baik passed maupun failed.
     * Gunakan untuk: screenshot saat gagal, log status test, cleanup
     */
    afterEach(async () => {
        console.log('⏹️  [afterEach] Test selesai. Mengambil screenshot jika gagal...');
        try {
            const testName = (await browser.getTitle()) || 'test';
            if (browser.sessionId) {
                // Contoh: ambil screenshot ketika test gagal
                // await browser.saveScreenshot(`./screenshots/${testName}.png`);
            }
        } catch (e) {
            // Session mungkin sudah tidak valid (misal: browser tertutup)
            console.log('⚠️  [afterEach] Browser session tidak tersedia, skip screenshot.');
        }
    });

    /**
     * after()
     * Dijalankan SATU KALI setelah semua test case dalam describe selesai.
     * Gunakan untuk: cleanup, tutup koneksi, hapus data uji
     */
    after(async () => {
        console.log('\n🏁 [after] Semua test case selesai dijalankan.');
        console.log('🏁 [after] Browser akan ditutup oleh framework.\n');
    });

    // ============================================================
    // TEST CASES
    // ============================================================

    it('TC-01 | Login sukses dengan kredensial valid', async () => {
        await LoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
        await expect(browser).toHaveUrl(expectedValues.inventoryUrl);
        const title = await LoginPage.getPageTitle();
        await expect(title).toBe(expectedValues.pageTitle);
    });

    it('TC-02 | Login gagal - password salah', async () => {
        await LoginPage.login(
            users.standardUser.username,
            users.invalidUser.password
        );
        const errorMsg = await LoginPage.getErrorMessage();
        await expect(errorMsg).toContain(expectedValues.errorInvalidCredentials);
    });

    it('TC-03 | Login gagal - akun terkunci (locked out user)', async () => {
        await LoginPage.login(
            users.lockedUser.username,
            users.lockedUser.password
        );
        const errorMsg = await LoginPage.getErrorMessage();
        await expect(errorMsg).toContain(expectedValues.errorLockedUser);
    });

    it('TC-04 | Login gagal - username kosong', async () => {
        await LoginPage.login('', users.standardUser.password);
        const errorMsg = await LoginPage.getErrorMessage();
        await expect(errorMsg).toContain(expectedValues.errorEmptyUsername);
    });

    it('TC-05 | Login gagal - password kosong', async () => {
        await LoginPage.login(users.standardUser.username, '');
        const errorMsg = await LoginPage.getErrorMessage();
        await expect(errorMsg).toContain(expectedValues.errorEmptyPassword);
    });

    it('TC-06 | Logout berhasil setelah login sukses', async () => {
        await LoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
        await expect(browser).toHaveUrl(expectedValues.inventoryUrl);

        await LoginPage.logout();

        await expect(browser).toHaveUrl(expectedValues.baseUrl + '/');
        await expect(LoginPage.btnLogin).toBeDisplayed();
    });

});
