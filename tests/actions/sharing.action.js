const fs = require('fs');
const path = require('path');

class SharingAction {
    constructor(driver) {
        this.driver = driver;
    }

    async fullPageScreenshot(fileName) {
        const folderPath = 'screenshot';
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        
        const fullScreen = await this.driver.takeScreenshot();
        fs.writeFileSync(path.join(folderPath, fileName + '.png'), fullScreen, 'base64');
        console.log(`Manual screenshot saved: ${fileName}.png`);
    }

    async partialScreenshot(element, fileName) {
        const folderPath = 'screenshot';
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const partial = await this.driver.findElement(element).takeScreenshot();
        fs.writeFileSync(path.join(folderPath, fileName + '.png'), partial, 'base64');
        console.log(`Partial screenshot saved: ${fileName}.png`);
    }
}

module.exports = SharingAction;
