const fs = require('fs');
const path = require('path');
const base64Path = path.join(__dirname, '..', 'assets', 'hero-ferris.base64.txt');
const outPath = path.join(__dirname, '..', 'assets', 'hero-ferris.png');

const b64 = fs.readFileSync(base64Path, 'utf8').trim();
// If file contains a leading comment line, strip it
const lines = b64.split(/\r?\n/).filter(l => !l.startsWith('//'));
const cleaned = lines.join('');
const buf = Buffer.from(cleaned, 'base64');
fs.writeFileSync(outPath, buf);
console.log('Wrote', outPath, '(', buf.length, 'bytes)');
