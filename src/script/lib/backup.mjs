/**
 * Shared backup helper for Phase 5.
 * Before overwriting a src/data/*.ts file, copy the current version into
 * src/script/backup/ with a timestamp — local only (gitignored).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
const BACKUP_DIR = path.join(LIB_DIR, '..', 'backup');

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

/**
 * @param {string} targetPath Absolute path to the file about to be overwritten (e.g. src/data/programmes.ts)
 * @returns {string|null} Path of the backup file, or null if nothing to back up
 */
export function backupFileBeforeWrite(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return null;
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const base = path.basename(targetPath); // e.g. programmes.ts
  const backupName = `${base}.${timestamp()}.bak`;
  const backupPath = path.join(BACKUP_DIR, backupName);

  fs.copyFileSync(targetPath, backupPath);
  return backupPath;
}
