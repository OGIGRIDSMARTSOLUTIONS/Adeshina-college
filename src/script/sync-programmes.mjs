/**
 * Phase 3 — load programmes.yaml, validate with module.yaml, write src/data/programmes.ts
 *
 * Same pattern as siteConfig:
 *   YAML (course list) + rules → TypeScript that React already imports
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

function quoteList(values) {
  if (!Array.isArray(values) || values.length === 0) return '[]';
  return `[${values.map((v) => quote(v)).join(', ')}]`;
}

function isPresent(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return true;
  return true;
}

function loadYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function validateProgrammes(list, rules) {
  const errors = [];
  const required = rules.required_fields ?? ['id', 'name', 'collegeId', 'level', 'duration', 'mode'];
  const allowedColleges = rules.allowed_collegeIds ?? [];
  const allowedModes = rules.allowed_modes ?? [];
  const allowedStatus = rules.allowed_verificationStatus ?? [];
  const seenIds = new Set();

  if (!Array.isArray(list) || list.length === 0) {
    errors.push('programmes.yaml must contain a non-empty programmes: list');
    return errors;
  }

  list.forEach((item, index) => {
    const label = item?.id || item?.name || `#${index + 1}`;

    for (const field of required) {
      if (!isPresent(item?.[field])) {
        errors.push(`${label}: missing required field '${field}'`);
      }
    }

    if (item?.id) {
      if (seenIds.has(item.id)) {
        errors.push(`${label}: duplicate id '${item.id}'`);
      }
      seenIds.add(item.id);
    }

    if (item?.collegeId && allowedColleges.length && !allowedColleges.includes(item.collegeId)) {
      errors.push(`${label}: collegeId '${item.collegeId}' is not allowed`);
    }

    if (Array.isArray(item?.mode) && allowedModes.length) {
      for (const mode of item.mode) {
        if (!allowedModes.includes(mode)) {
          errors.push(`${label}: mode '${mode}' is not allowed`);
        }
      }
    }

    if (
      item?.verificationStatus &&
      allowedStatus.length &&
      !allowedStatus.includes(item.verificationStatus)
    ) {
      errors.push(`${label}: verificationStatus '${item.verificationStatus}' is not allowed`);
    }
  });

  return errors;
}

function generateProgrammeObject(p) {
  const lines = [
    '  {',
    `    id: ${quote(p.id)},`,
    `    name: ${quote(p.name)},`,
    `    collegeId: ${quote(p.collegeId)},`,
    `    level: ${quote(p.level)},`,
    `    duration: ${quote(p.duration)},`,
    `    mode: ${quoteList(p.mode)},`,
  ];

  if (p.verificationStatus) {
    lines.push(`    verificationStatus: ${quote(p.verificationStatus)},`);
  }
  if (p.description) {
    lines.push(`    description: ${quote(p.description)},`);
  }
  if (Array.isArray(p.entryRequirements) && p.entryRequirements.length) {
    lines.push(`    entryRequirements: ${quoteList(p.entryRequirements)},`);
  }
  if (Array.isArray(p.careerOpportunities) && p.careerOpportunities.length) {
    lines.push(`    careerOpportunities: ${quoteList(p.careerOpportunities)},`);
  }
  if (p.code) {
    lines.push(`    code: ${quote(p.code)},`);
  }

  lines.push('  }');
  return lines.join('\n');
}

function generateProgrammesTs(list) {
  const health = list.filter((p) => p.collegeId === 'health-technology');
  const education = list.filter((p) => p.collegeId === 'education');
  const other = list.filter(
    (p) => p.collegeId !== 'health-technology' && p.collegeId !== 'education',
  );

  const sections = [];

  if (health.length) {
    sections.push(
      `  // ==========================================\n` +
        `  // ADESHINA COLLEGE OF HEALTH TECHNOLOGY\n` +
        `  // ==========================================\n` +
        health.map(generateProgrammeObject).join(',\n'),
    );
  }

  if (education.length) {
    sections.push(
      `  // ==========================================\n` +
        `  // ADESHINA COLLEGE OF EDUCATION\n` +
        `  // ==========================================\n` +
        education.map(generateProgrammeObject).join(',\n'),
    );
  }

  if (other.length) {
    sections.push(other.map(generateProgrammeObject).join(',\n'));
  }

  return `import { Programme } from '@/types/programme';

export const programmes: Programme[] = [
${sections.join(',\n\n')},
];
`;
}

function resolveYamlPath(input) {
  if (!input || input === 'programmes' || input === 'programmes.yaml') {
    return path.join(SCRIPT_DIR, 'data', 'programmes.yaml');
  }
  if (path.isAbsolute(input)) return input;
  const fromScriptData = path.join(SCRIPT_DIR, 'data', path.basename(input));
  if (fs.existsSync(fromScriptData)) return fromScriptData;
  return path.resolve(PROJECT_ROOT, input);
}

function printStatus(rules) {
  const source = path.join(SCRIPT_DIR, rules.modules.programmes.source);
  const target = path.join(PROJECT_ROOT, rules.modules.programmes.target);

  console.log('Adeshina modular pipeline (Phase 3 — programmes)');
  console.log('');
  console.log('  DATA   src/script/data/programmes.yaml  → course list');
  console.log('  RULES  src/script/module.yaml           → required fields / allowed values');
  console.log('  APP    src/data/programmes.ts           → what React still imports');
  console.log('');
  console.log(`  YAML exists: ${fs.existsSync(source) ? 'yes' : 'NO'}`);
  console.log(`  TS target:   ${path.relative(PROJECT_ROOT, target)}`);
  console.log('');
  console.log('Commands:');
  console.log('  npm run sync:programmes');
  console.log('  npm run sync:programmes -- load programmes.yaml');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const rulesDoc = loadYaml(RULES_PATH);
  const moduleRules = rulesDoc?.modules?.programmes;
  if (!moduleRules) {
    throw new Error('module.yaml is missing modules.programmes — add Phase 3 rules first');
  }

  if (!command) {
    printStatus(rulesDoc);
    return;
  }

  if (command !== 'load' && command !== 'sync') {
    console.error(`Unknown command: ${command}`);
    console.error('Use: npm run sync:programmes -- load programmes.yaml');
    process.exit(1);
  }

  const yamlPath = resolveYamlPath(args[1]);
  const targetPath = path.join(PROJECT_ROOT, moduleRules.target);

  console.log(`Loading:  ${path.relative(PROJECT_ROOT, yamlPath)}`);
  console.log(`Rules:    ${path.relative(PROJECT_ROOT, RULES_PATH)}`);
  console.log(`Writing:  ${path.relative(PROJECT_ROOT, targetPath)}`);
  console.log('');

  const data = loadYaml(yamlPath);
  const list = Array.isArray(data) ? data : data?.programmes;
  const errors = validateProgrammes(list, moduleRules);

  if (errors.length > 0) {
    console.error('Validation failed. src/data/programmes.ts was NOT changed.');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  const backupPath = backupFileBeforeWrite(targetPath);
  fs.writeFileSync(targetPath, generateProgrammesTs(list), 'utf8');

  console.log('Validation passed.');
  if (backupPath) {
    console.log(`Backup saved: ${path.relative(PROJECT_ROOT, backupPath)}`);
  }
  console.log(`Updated src/data/programmes.ts (${list.length} programmes) from YAML.`);
  console.log('React still reads the TypeScript file — no page files were changed.');
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
