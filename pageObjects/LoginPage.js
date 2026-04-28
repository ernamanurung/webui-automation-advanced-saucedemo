class LoginPage {
    // Element Selectors
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnLogin()      { return $('#login-button'); }
    get errorMessage()  { return $('[data-test="error"]'); }
    get pageTitle()     { return $('.title'); }
    get btnBurgerMenu() { return $('#react-burger-menu-btn'); }
    get btnLogout()     { return $('#logout_sidebar_link'); }

    async open() {
        await browser.url('/');
        await browser.maximizeWindow();
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        // Gunakan JS Click untuk menembus popup Chrome
        await browser.execute((el) => el.click(), await this.btnLogin);
    }

    async logout() {
        await this.btnBurgerMenu.waitForClickable();
        await this.btnBurgerMenu.click();
        // Tunggu elemen ada di DOM
        await this.btnLogout.waitForExist({ timeout: 5000 });
        // Gunakan JS Click untuk mengabaikan popup yang menghalangi secara visual
        await browser.execute((el) => el.click(), await this.btnLogout);
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.getText();
    }

    async getPageTitle() {
        return await this.pageTitle.getText();
    }
}

export default new LoginPage();
