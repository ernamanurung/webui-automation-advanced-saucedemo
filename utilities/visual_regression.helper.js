const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch').default;
const { PNG } = require('pngjs');

/**
 * Fungsi untuk melakukan visual regression (komparasi gambar)
 * @param {WebDriver} driver - Instance selenium webdriver
 * @param {string} imageName - Nama file gambar (tanpa ekstensi)
 * @param {number} maxDiffPercent - Toleransi perbedaan (default 1%)
 */
async function compareScreenshot(driver, imageName, maxDiffPercent = 1) {
    const baselineDir = path.join('visual_regression', 'baseline');
    const currentDir = path.join('visual_regression', 'current');
    const diffDir = path.join('visual_regression', 'diff');

    // Buat folder jika belum ada
    [currentDir, baselineDir, diffDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    const baselinePath = path.join(baselineDir, imageName + '.png');
    const currentPath = path.join(currentDir, imageName + '.png');
    const diffPath = path.join(diffDir, imageName + '.png');

    // Ambil screenshot terbaru
    const screenshot = await driver.takeScreenshot();
    const imgBuffer = Buffer.from(screenshot, 'base64');
    fs.writeFileSync(currentPath, imgBuffer);

    // Jika baseline belum ada, jadikan screenshot ini sebagai baseline
    if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(currentPath, baselinePath);
        console.log(`Baseline created for ${imageName}`);
        return;
    }

    // Baca gambar baseline dan current
    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(fs.readFileSync(currentPath));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    // Komparasi menggunakan pixelmatch
    const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
    );

    const diffPercent = (numDiffPixels / (width * height)) * 100;

    // Jika perbedaan melebihi ambang batas, tulis diff dan lempar error
    if (diffPercent > maxDiffPercent) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        throw new Error(`Visual mismatch for ${imageName}: ${diffPercent.toFixed(2)}%`);
    }
}

module.exports = { compareScreenshot };
