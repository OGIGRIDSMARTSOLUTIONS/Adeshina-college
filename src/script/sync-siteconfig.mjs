/**
 * Phase 2 — load siteConfig.yaml, validate with module.yaml, write src/data/siteConfig.ts
 *
 * React still imports TypeScript. This file is the "transformer":
 *   YAML (content) + module.yaml (rules) → siteConfig.ts (what the app reads)
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { backupFileBeforeWrite } from './lib/backup.mjs';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '../..');
const RULES_PATH = path.join(SCRIPT_DIR, 'module.yaml');

function quote(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function isPresent(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'object') return true;
  return true;
}

function loadYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function validateSiteConfig(data, rules) {
  const errors = [];

  for (const field of rules.required_fields ?? []) {
    if (!isPresent(data?.[field])) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  const nested = rules.required_nested ?? {};
  for (const [parent, keys] of Object.entries(nested)) {
    const object = data?.[parent];
    if (!object || typeof object !== 'object') {
      errors.push(`Missing required object: ${parent}`);
      continue;
    }
    for (const key of keys) {
      if (!isPresent(object[key])) {
        errors.push(`Missing required field: ${parent}.${key}`);
      }
    }
  }

  const portalKeys = ['studentPortal', 'applyNow'];
  for (const key of portalKeys) {
    const portal = data?.portals?.[key];
    if (portal && typeof portal === 'object') {
      if (!isPresent(portal.label)) errors.push(`Missing required field: portals.${key}.label`);
      if (!isPresent(portal.path)) errors.push(`Missing required field: portals.${key}.path`);
    }
  }

  return errors;
}

function generateSiteConfigTs(data) {
  const socials = Array.isArray(data.socials) ? data.socials : [];

  return `import { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  institutionName: ${quote(data.institutionName)},
  shortName: ${quote(data.shortName)},
  location: ${quote(data.location)},
  fullLocation: ${quote(data.fullLocation)},
  tagline: ${quote(data.tagline)},
  shortDescription: ${quote(data.shortDescription)},
  designerCredit: ${quote(data.designerCredit)},
  designerUrl: ${quote(data.designerUrl ?? '')},
  brand: {
    // Single configurable logo path - pointing to the official Adeshina emblem asset
    logoUrl: ${quote(data.brand?.logoUrl ?? '')},
    logoLightUrl: ${quote(data.brand?.logoLightUrl ?? '')},
    faviconUrl: ${quote(data.brand.faviconUrl)},
  },
  portals: {
    studentPortal: {
      label: ${quote(data.portals.studentPortal.label)},
      path: ${quote(data.portals.studentPortal.path)},
    },
    applyNow: {
      label: ${quote(data.portals.applyNow.label)},
      path: ${quote(data.portals.applyNow.path)},
    },
  },
  contact: {
    campusAddress: ${quote(data.contact.campusAddress)},
    stateCountry: ${quote(data.contact.stateCountry)},
    email: ${quote(data.contact.email)},
    phone: ${quote(data.contact.phone)},
    officeHours: ${quote(data.contact.officeHours ?? '')},
  },
  socials: ${JSON.stringify(socials)},
};
`;
}

function resolveYamlPath(input) {
  if (!input || input === 'siteConfig' || input === 'siteConfig.yaml') {
    return path.join(SCRIPT_DIR, 'data', 'siteConfig.yaml');
  }

  if (path.isAbsolute(input)) return input;

  const fromScriptData = path.join(SCRIPT_DIR, 'data', path.basename(input));
  if (fs.existsSync(fromScriptData)) return fromScriptData;

  return path.resolve(PROJECT_ROOT, input);
}

function printStatus(rules) {
  const source = path.join(SCRIPT_DIR, rules.modules.siteConfig.source);
  const target = path.join(PROJECT_ROOT, rules.modules.siteConfig.target);

  console.log('Adeshina modular pipeline (Phase 2)');
  console.log('');
  console.log('  DATA   src/script/data/siteConfig.yaml  → school facts (name, phone, logo)');
  console.log('  RULES  src/script/module.yaml           → which fields are required');
  console.log('  APP    src/data/siteConfig.ts           → what React still imports');
  console.log('');
  console.log(`  YAML exists: ${fs.existsSync(source) ? 'yes' : 'NO'}`);
  console.log(`  TS target:   ${path.relative(PROJECT_ROOT, target)}`);
  console.log('');
  console.log('Commands:');
  console.log('  npm run sync:siteconfig');
  console.log('  npm run sync:siteconfig -- load siteConfig.yaml');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const rules = loadYaml(RULES_PATH);
  const moduleRules = rules?.modules?.siteConfig;
  if (!moduleRules) {
    throw new Error('module.yaml is missing modules.siteConfig');
  }

  if (!command) {
    printStatus(rules);
    return;
  }

  if (command !== 'load' && command !== 'sync') {
    console.error(`Unknown command: ${command}`);
    console.error('Use: npm run sync:siteconfig -- load siteConfig.yaml');
    process.exit(1);
  }

  const yamlPath = resolveYamlPath(args[1]);
  const targetPath = path.join(PROJECT_ROOT, moduleRules.target);

  console.log(`Loading:  ${path.relative(PROJECT_ROOT, yamlPath)}`);
  console.log(`Rules:    ${path.relative(PROJECT_ROOT, RULES_PATH)}`);
  console.log(`Writing:  ${path.relative(PROJECT_ROOT, targetPath)}`);
  console.log('');

  const data = loadYaml(yamlPath);
  const errors = validateSiteConfig(data, moduleRules);

  if (errors.length > 0) {
    console.error('Validation failed. src/data/siteConfig.ts was NOT changed.');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const backupPath = backupFileBeforeWrite(targetPath);
  fs.writeFileSync(targetPath, generateSiteConfigTs(data), 'utf8');

  console.log('Validation passed.');
  if (backupPath) {
    console.log(`Backup saved: ${path.relative(PROJECT_ROOT, backupPath)}`);
  }
  console.log('Updated src/data/siteConfig.ts from YAML.');
  console.log('React still reads the TypeScript file — no page files were changed.');
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
