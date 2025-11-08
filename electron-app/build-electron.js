#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Drawnix Electron App...\n');

// Step 1: Build web app
console.log('📦 Step 1: Building web application...');
try {
  execSync('cd .. && npm run build:web', { stdio: 'inherit' });
  console.log('✅ Web app built successfully\n');
} catch (error) {
  console.error('❌ Failed to build web app');
  process.exit(1);
}

// Step 2: Fix HTML file for Electron (modify in place)
console.log('🔧 Step 2: Fixing HTML for Electron compatibility...');
const htmlPath = path.join(__dirname, '../dist/apps/web/index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Remove <base href="/" /> tag
htmlContent = htmlContent.replace(/<base\s+href=["'][^"']*["']\s*\/?>/gi, '<!-- base tag removed for Electron compatibility -->');

// Fix absolute paths to relative paths
htmlContent = htmlContent.replace(/src=["']\/assets\//g, 'src="./assets/');
htmlContent = htmlContent.replace(/href=["']\/assets\//g, 'href="./assets/');

fs.writeFileSync(htmlPath, htmlContent);
console.log('✅ HTML fixed for Electron\n');

// Step 3: Build Electron app
console.log('⚡ Step 4: Building Electron application...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('\n✅ Electron app built successfully!');
  console.log('\n📍 Output location: electron-app/release/mac-arm64/Drawnix.app');
  console.log('\n🎉 Done! You can now run:');
  console.log('   open electron-app/release/mac-arm64/Drawnix.app\n');
} catch (error) {
  console.error('❌ Failed to build Electron app');
  process.exit(1);
}
