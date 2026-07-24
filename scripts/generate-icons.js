const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Modern HR Document & Visa Expiry SVG icon design
const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="url(#bg_grad)"/>
  
  <defs>
    <linearGradient id="bg_grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0F172A"/>
      <stop offset="1" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="accent_grad" x1="120" y1="120" x2="392" y2="392" gradientUnits="userSpaceOnUse">
      <stop stop-color="#38BDF8"/>
      <stop offset="1" stop-color="#6366F1"/>
    </linearGradient>
    <linearGradient id="shield_grad" x1="180" y1="140" x2="330" y2="360" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
    <filter id="glow" x="70" y="70" width="372" height="372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="16" result="blur"/>
    </filter>
  </defs>

  <!-- Glowing background card -->
  <rect x="96" y="96" width="320" height="320" rx="48" fill="#6366F1" opacity="0.15" filter="url(#glow)"/>
  
  <!-- Document Container Base -->
  <rect x="116" y="106" width="280" height="300" rx="32" fill="url(#accent_grad)"/>
  <rect x="124" y="114" width="264" height="284" rx="26" fill="#1E293B"/>

  <!-- Document Header Lines -->
  <rect x="160" y="156" width="100" height="14" rx="7" fill="#E2E8F0"/>
  <rect x="160" y="182" width="160" height="10" rx="5" fill="#64748B"/>
  <rect x="160" y="202" width="130" height="10" rx="5" fill="#475569"/>

  <!-- Stamp / Shield / Visa Badge -->
  <path d="M256 230 C 290 230, 340 240, 340 280 C 340 335, 275 365, 256 374 C 237 365, 172 335, 172 280 C 172 240, 222 230, 256 230 Z" fill="url(#shield_grad)"/>

  <!-- Checkmark / Expiry Verified emblem inside shield -->
  <path d="M228 300 L248 320 L288 274" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Clock Expiry Notification Dot -->
  <circle cx="346" cy="156" r="28" fill="#EF4444"/>
  <path d="M346 142 V156 H358" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svgBuffer = Buffer.from(svgContent);

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  // Save source SVG
  fs.writeFileSync(path.join(outputDir, 'app-icon.svg'), svgContent);

  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192x192.png'));

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512x512.png'));

  // Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // Maskable 512x512 (with padding safe-zone)
  await sharp(svgBuffer)
    .resize(400, 400)
    .extend({
      top: 56,
      bottom: 56,
      left: 56,
      right: 56,
      background: '#0F172A'
    })
    .png()
    .toFile(path.join(outputDir, 'maskable-icon-512x512.png'));

  console.log('Successfully generated all PWA icons in public/icons/');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
