/**
 * Phase 6 — Interactive terminal content manager
 *
 * Run:  npm run sync:interactive
 *
 * Asks questions in the terminal so you can:
 *   1) Load/sync an existing YAML file into src/data/
 *   2) Add a new programme (writes programmes.yaml, then syncs)
 *   3) Update a siteConfig field (writes siteConfig.yaml, then syncs)
 *
 * All writes still go through validation (module.yaml) via the sync scripts.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(SCRIPT_DIR, 'data');
const PROGRAMMES_YAML = path.join(DATA_DIR, 'programmes.yaml');
const SITE_CONFIG_YAML = path.join(DATA_DIR, 'siteConfig.yaml');

const LOADABLE = [
  { key: '1', label: 'siteConfig.yaml', file: 'siteConfig.yaml', npm: ['run', 'sync:siteconfig', '--', 'load', 'siteConfig.yaml'] },
  { key: '2', label: 'programmes.yaml', file: 'programmes.yaml', npm: ['run', 'sync:programmes', '--', 'load', 'programmes.yaml'] },
  { key: '3', label: 'colleges.yaml', file: 'colleges.yaml', npm: ['run', 'sync:colleges', '--', 'load', 'colleges.yaml'] },
  { key: '4', label: 'navigation.yaml', file: 'navigation.yaml', npm: ['run', 'sync:navigation', '--', 'load', 'navigation.yaml'] },
  { key: '5', label: 'admissions.yaml', file: 'admissions.yaml', npm: ['run', 'sync:admissions', '--', 'load', 'admissions.yaml'] },
  { key: '6', label: 'news.yaml', file: 'news.yaml', npm: ['run', 'sync:news', '--', 'load', 'news.yaml'] },
];

const SITE_CONFIG_FIELDS = [
  'institutionName',
  'shortName',
  'location',
  'fullLocation',
  'tagline',
  'shortDescription',
  'designerCredit',
  'designerUrl',
];

function runNpm(args) {
  console.log('');
  console.log(`> npm ${args.join(' ')}`);
  console.log('');
  const result = spawnSync('npm', args, {
    cwd: path.resolve(SCRIPT_DIR, '../..'),
    stdio: 'inherit',
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error('Sync command failed. YAML was saved only if this step ran after a YAML write.');
  }
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadYamlFile(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function saveProgrammesYaml(programmes) {
  const header = `# =============================================================================
# programmes.yaml  =  COURSE / PROGRAMME LIST (the facts)
# =============================================================================
# Each item under "programmes:" is one course the school offers.
#
# React does NOT read this file directly.
# Run:  npm run sync:programmes -- load programmes.yaml
#

`;
  const body = yaml.dump(
    { programmes },
    { lineWidth: 100, noRefs: true, quotingType: "'", forceQuotes: false },
  );
  fs.writeFileSync(PROGRAMMES_YAML, header + body, 'utf8');
}

function saveSiteConfigYaml(data) {
  const header = `# =============================================================================
# siteConfig.yaml  =  SCHOOL IDENTITY (the facts: name, logo, phone, email)
# =============================================================================
# React does NOT read this file directly.
# Run:  npm run sync:siteconfig -- load siteConfig.yaml
#

`;
  const body = yaml.dump(data, {
    lineWidth: 100,
    noRefs: true,
    quotingType: "'",
    forceQuotes: false,
  });
  fs.writeFileSync(SITE_CONFIG_YAML, header + body, 'utf8');
}

async function ask(rl, question, { defaultValue = '', required = true } = {}) {
  const hint = defaultValue ? ` [${defaultValue}]` : '';
  const answer = (await rl.question(`${question}${hint}: `)).trim();
  const value = answer || defaultValue;
  if (required && !value) {
    console.log('  (required — please enter a value)');
    return ask(rl, question, { defaultValue, required });
  }
  return value;
}

async function askChoice(rl, question, choices) {
  console.log(question);
  for (const c of choices) {
    console.log(`  ${c.key}) ${c.label}`);
  }
  const answer = (await rl.question('Choice: ')).trim();
  const match = choices.find((c) => c.key === answer || c.label === answer);
  if (!match) {
    console.log('  Invalid choice. Try again.');
    return askChoice(rl, question, choices);
  }
  return match;
}

async function handleLoad(rl) {
  const choice = await askChoice(rl, '\nWhich YAML do you want to load/sync into src/data/?', LOADABLE);
  runNpm(choice.npm);
  console.log(`\nDone. ${choice.label} synced to the TypeScript data file.`);
}

async function handleAddProgramme(rl) {
  console.log('\nAdd a new programme');
  console.log('(This updates programmes.yaml, then syncs to programmes.ts)\n');

  const name = await ask(rl, 'Programme name (e.g. Community Health Extension Worker)');
  const suggestedId = slugify(name);

  const id = await ask(rl, 'Programme id (unique, lowercase-with-dashes)', {
    defaultValue: suggestedId,
  });

  const college = await askChoice(rl, 'College:', [
    { key: '1', label: 'health-technology', value: 'health-technology' },
    { key: '2', label: 'education', value: 'education' },
  ]);

  const level = await ask(rl, 'Level (e.g. Diploma, Certificate, NCE)', {
    defaultValue: college.value === 'education' ? 'NCE' : 'Diploma',
  });

  const duration = await ask(rl, 'Duration (e.g. 3 Years)', { defaultValue: '3 Years' });

  const verificationStatus = await askChoice(rl, 'Verification status:', [
    { key: '1', label: 'research-found', value: 'research-found' },
    { key: '2', label: 'verified', value: 'verified' },
  ]);

  const description = await ask(rl, 'Short description (optional)', {
    defaultValue: '',
    required: false,
  });

  const doc = loadYamlFile(PROGRAMMES_YAML);
  const programmes = Array.isArray(doc?.programmes) ? doc.programmes : [];

  if (programmes.some((p) => p.id === id)) {
    console.log(`\nStopped: id "${id}" already exists. Pick a different id.`);
    return;
  }

  const entry = {
    id,
    name,
    collegeId: college.value,
    level,
    duration,
    mode: ['Full-Time'],
    verificationStatus: verificationStatus.value,
  };
  if (description) entry.description = description;

  programmes.push(entry);
  saveProgrammesYaml(programmes);
  console.log(`\nSaved to programmes.yaml (${programmes.length} programmes total).`);
  console.log('Syncing to src/data/programmes.ts…');
  runNpm(['run', 'sync:programmes', '--', 'load', 'programmes.yaml']);
  console.log('\nProgramme added and synced.');
}

async function handleUpdateSiteConfig(rl) {
  console.log('\nUpdate siteConfig (school identity)');
  console.log('(This updates siteConfig.yaml, then syncs to siteConfig.ts)\n');

  const data = loadYamlFile(SITE_CONFIG_YAML);

  const fieldChoices = SITE_CONFIG_FIELDS.map((field, i) => ({
    key: String(i + 1),
    label: `${field}  (current: ${String(data[field] ?? '').slice(0, 60)})`,
    field,
  }));

  fieldChoices.push({
    key: String(SITE_CONFIG_FIELDS.length + 1),
    label: 'contact.email',
    field: 'contact.email',
  });
  fieldChoices.push({
    key: String(SITE_CONFIG_FIELDS.length + 2),
    label: 'contact.phone',
    field: 'contact.phone',
  });

  const choice = await askChoice(rl, 'Which field do you want to change?', fieldChoices);
  const current =
    choice.field === 'contact.email'
      ? data.contact?.email
      : choice.field === 'contact.phone'
        ? data.contact?.phone
        : data[choice.field];

  const next = await ask(rl, `New value for ${choice.field}`, {
    defaultValue: String(current ?? ''),
  });

  if (choice.field === 'contact.email') {
    data.contact = data.contact || {};
    data.contact.email = next;
  } else if (choice.field === 'contact.phone') {
    data.contact = data.contact || {};
    data.contact.phone = next;
  } else {
    data[choice.field] = next;
  }

  saveSiteConfigYaml(data);
  console.log('\nSaved to siteConfig.yaml. Syncing…');
  runNpm(['run', 'sync:siteconfig', '--', 'load', 'siteConfig.yaml']);
  console.log('\nSite config updated and synced.');
}

async function main() {
  const rl = readline.createInterface({ input, output });

  console.log('========================================');
  console.log(' Adeshina content pipeline — interactive');
  console.log(' Phase 6');
  console.log('========================================');
  console.log('Edit content by answering questions.');
  console.log('React still reads src/data/*.ts after sync.\n');

  try {
    const action = await askChoice(rl, 'What do you want to do?', [
      { key: '1', label: 'Load / sync an existing YAML file' },
      { key: '2', label: 'Add a new programme' },
      { key: '3', label: 'Update siteConfig (name, phone, email, …)' },
      { key: '4', label: 'Exit' },
    ]);

    if (action.key === '1') await handleLoad(rl);
    else if (action.key === '2') await handleAddProgramme(rl);
    else if (action.key === '3') await handleUpdateSiteConfig(rl);
    else console.log('\nBye.');
  } catch (error) {
    console.error('\nError:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
