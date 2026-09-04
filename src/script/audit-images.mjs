/**
 * Phase 5 helper — list local image sizes under public/
 * Run: npm run audit:images
 *
 * Guideline (Mr. Femi): keep logos small; hero/campus photos ideally under ~500KB.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const files = walk(PUBLIC_DIR);
console.log('Adeshina image size audit (public/)');
console.log('');

if (files.length === 0) {
  console.log('No local image files found under public/.');
  console.log('(Some pages still use external Unsplash URLs — those are not in public/)');
  process.exit(0);
}

let warnings = 0;
for (const file of files) {
  const kb = fs.statSync(file).size / 1024;
  const rel = path.relative(PROJECT_ROOT, file);
  const flag = kb > 500 ? '  ⚠ large' : kb > 200 ? '  · ok-ish' : '  ✓ ok';
  if (kb > 500) warnings += 1;
  console.log(`${flag}  ${kb.toFixed(1).padStart(7)} KB  ${rel}`);
}

console.log('');
console.log(`Checked ${files.length} file(s). ${warnings} over 500KB.`);
console.log('Logo target: under ~100KB. Hero/campus: under ~500KB when possible.');
