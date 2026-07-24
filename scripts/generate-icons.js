const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputImage = path.join(__dirname, '../public/screen.png');
const outputDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIconsFromScreen() {
  console.log('Generating PWA icons from public/screen.png...');

  if (!fs.existsSync(inputImage)) {
    console.error('Source image public/screen.png does not exist!');
    process.exit(1);
  }

  // 192x192
  await sharp(inputImage)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile(path.join(outputDir, 'icon-192x192.png'));

  // 512x512
  await sharp(inputImage)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(path.join(outputDir, 'icon-512x512.png'));

  // Apple Touch Icon (180x180)
  await sharp(inputImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // Maskable 512x512
  await sharp(inputImage)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(path.join(outputDir, 'maskable-icon-512x512.png'));

  console.log('Successfully updated all PWA icons from screen.png in public/icons/');
}

generateIconsFromScreen().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
