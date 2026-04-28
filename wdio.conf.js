export const config = {
    runner: 'local',
    specs: [
        './tests/**/*.test.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--guest',
                '--no-sandbox',
                '--disable-dev-shm-usage'
            ],
            prefs: {
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false
            }
        }
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // ============================================================
    // WDIO-LEVEL HOOKS (dijalankan oleh WebdriverIO framework)
    // ============================================================

    /**
     * Hook ini dijalankan SATU KALI sebelum seluruh test suite dimulai.
     * Cocok untuk: setup global, koneksi database, inisialisasi laporan
     */
    onPrepare: function () {
        console.log('\n====================================================');
        console.log('🚀 [onPrepare] Persiapan awal: Memulai test suite...');
        console.log('====================================================');
    },

    /**
     * Hook ini dijalankan sebelum worker process diluncurkan.
     * Cocok untuk: setup environment per-worker
     */
    before: function () {
        console.log('🟢 [before] Worker siap. Browser akan segera dibuka.');
    },

    /**
     * Hook ini dijalankan setelah seluruh test selesai.
     * Cocok untuk: cleanup global, kirim notifikasi hasil test
     */
    after: function (result) {
        console.log('\n====================================================');
        if (result === 0) {
            console.log('✅ [after] Semua test selesai dengan SUKSES.');
        } else {
            console.log('❌ [after] Ada test yang GAGAL. Periksa laporan.');
        }
        console.log('====================================================\n');
    },

    /**
     * Hook ini dijalankan SATU KALI setelah seluruh test suite selesai.
     * Cocok untuk: tutup koneksi, generate laporan akhir
     */
    onComplete: function () {
        console.log('🏁 [onComplete] Test suite selesai sepenuhnya.');
    },
}
