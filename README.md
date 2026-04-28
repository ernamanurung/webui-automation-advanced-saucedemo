# SauceDemo Login Automation - Selenium Mocha

Project Web UI Automation Advanced untuk website [SauceDemo](https://www.saucedemo.com), menggunakan **Selenium WebDriver** dan **Mocha**.

## Tech Stack

| Tool | Fungsi |
|------|--------|
| [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/) | Browser Automation Library |
| [Mocha](https://mochajs.org/) | Test Framework / Runner |
| [Chai](https://www.chaijs.com/) | Assertion Library |
| [Mochawesome](https://adamgruber.github.io/mochawesome/) | HTML Reporting |

## Struktur Project

```
10. WebUI Automation Advanced Part 1/
├── pageObjects/
│   └── LoginPage.js        # Page Object Model (Selenium Syntax)
├── testData/
│   └── sauceDemoData.js    # Data uji (username, password, expected values)
├── tests/
│   └── login/
│       └── login.test.js   # Test suite dengan 6 skenario + hooks
├── mochawesome-report/     # Laporan hasil test (Generated after npm test)
├── .gitignore
├── package.json
└── README.md
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

## Hooks yang Diimplementasikan (Mocha Hooks)

| Hook | Kapan Dijalankan | Kegunaan |
|------|-----------------|----------|
| `beforeEach()` | Sebelum tiap test | Inisialisasi Driver & Buka halaman login |
| `afterEach()` | Setelah tiap test | Menutup Driver & Log status |

## Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Jalankan semua test
```bash
npm test
```

### 3. Melihat Laporan
Setelah test selesai, buka file berikut di browser :
`mochawesome-report/mochawesome.html`
