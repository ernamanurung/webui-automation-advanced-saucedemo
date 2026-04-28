# SauceDemo Login Automation - Advanced

Project Web UI Automation Advanced untuk website [SauceDemo](https://www.saucedemo.com), fokus pada **skenario login** dan implementasi **hooks** menggunakan WebdriverIO & Mocha.

## Tech Stack

| Tool | Fungsi |
|------|--------|
| [WebdriverIO v9](https://webdriver.io/) | Framework UI Automation |
| [Mocha](https://mochajs.org/) | Test Framework |
| [ChromeDriver](https://chromedriver.chromium.org/) | Driver untuk Chrome |
| [Allure Reporter](https://webdriver.io/docs/allure-reporter/) | Laporan hasil test |

## Struktur Project

```
10. WebUI Automation Advanced Part 1/
├── pageObjects/
│   └── LoginPage.js        # Page Object Model untuk halaman Login
├── testData/
│   └── sauceDemoData.js    # Data uji (username, password, expected values)
├── tests/
│   └── login/
│       └── login.test.js   # Test suite dengan 6 skenario + hooks
├── .gitignore
├── package.json
├── README.md
└── wdio.conf.js            # Konfigurasi WebdriverIO + WDIO-level hooks
```

## Skenario Test

| ID | Skenario | Expected Result |
|----|----------|-----------------|
| TC-01 | Login sukses dengan kredensial valid | Diarahkan ke halaman Products |
| TC-02 | Login gagal - password salah | Muncul pesan error credentials |
| TC-03 | Login gagal - akun terkunci | Muncul pesan error locked out |
| TC-04 | Login gagal - username kosong | Muncul pesan error username required |
| TC-05 | Login gagal - password kosong | Muncul pesan error password required |
| TC-06 | Logout setelah login sukses | Kembali ke halaman login |

## Hooks yang Diimplementasikan

### Mocha Hooks (dalam test file)

| Hook | Kapan Dijalankan | Kegunaan |
|------|-----------------|----------|
| `before()` | 1x sebelum semua test | Setup awal suite (log info) |
| `beforeEach()` | Sebelum tiap test | Buka halaman login (reset kondisi) |
| `afterEach()` | Setelah tiap test | Screenshot jika gagal, cleanup |
| `after()` | 1x setelah semua test | Cleanup akhir, log summary |

### WDIO Hooks (dalam wdio.conf.js)

| Hook | Kapan Dijalankan |
|------|-----------------|
| `onPrepare` | Sebelum seluruh test suite dimulai |
| `before` | Sebelum worker process diluncurkan |
| `after` | Setelah seluruh test selesai |
| `onComplete` | Setelah test suite selesai sepenuhnya |

## Cara Menjalankan

### Install dependencies
```bash
npm install
```

### Jalankan semua test
```bash
npm test
```

## Data Login SauceDemo

| Username | Password | Keterangan |
|----------|----------|------------|
| `standard_user` | `secret_sauce` | User valid |
| `locked_out_user` | `secret_sauce` | User terkunci |
