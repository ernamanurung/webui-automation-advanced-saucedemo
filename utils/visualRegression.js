const fs = require('fs-extra');
const resemble = require('resemblejs');
const path = require('path');

async function compareScreenshots(driver, testName) {
    const screenshot = await driver.takeScreenshot();
    const screenshotBuffer = Buffer.from(screenshot, 'base64');
    
    const baselinePath = path.join(__dirname, `../screenshots/baseline/${testName}.png`);
    const actualPath = path.join(__dirname, `../screenshots/actual/${testName}.png`);
    const diffPath = path.join(__dirname, `../screenshots/diff/${testName}.png`);

    await fs.ensureDir(path.dirname(baselinePath));
    await fs.ensureDir(path.dirname(actualPath));
    await fs.ensureDir(path.dirname(diffPath));

    if (!await fs.pathExists(baselinePath)) {
        await fs.writeFile(baselinePath, screenshotBuffer);
        console.log(`Baseline created for ${testName}`);
        return true;
    }

    await fs.writeFile(actualPath, screenshotBuffer);

    return new Promise((resolve, reject) => {
        resemble(baselinePath)
            .compareTo(actualPath)
            .ignoreColors()
            .onComplete((data) => {
                if (data.misMatchPercentage > 5.0) {
                    fs.writeFileSync(diffPath, data.getBuffer());
                    reject(new Error(`Visual mismatch for ${testName}: ${data.misMatchPercentage}%`));
                } else {
                    resolve(true);
                }
            });
    });
}

module.exports = { compareScreenshots };
