// Web uygulamasını (index.html, manifest, ikonlar) hedef klasöre kopyalar.
// Kullanım: node scripts/copy-web.js <hedef-klasör>
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const dest = path.resolve(process.argv[2] || 'web');
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.join(dest, 'icons'), { recursive: true });
for (const f of ['index.html', 'manifest.webmanifest', 'sw.js']) fs.copyFileSync(path.join(root, f), path.join(dest, f));
for (const f of fs.readdirSync(path.join(root, 'icons'))) fs.copyFileSync(path.join(root, 'icons', f), path.join(dest, 'icons', f));
console.log('Web dosyaları kopyalandı →', dest);
