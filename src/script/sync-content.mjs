/**
 * Phase 4 — sync colleges / navigation / admissions / news
 *
 * Same pattern as siteConfig + programmes:
 *   YAML (edit) → validate with module.yaml → write src/data/*.ts (React still imports .ts)
 *
 * Usage:
 *   node sync-content.mjs colleges
 *   node sync-content.mjs load colleges.yaml
 *   npm run sync:colleges -- load colleges.yaml
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

const MODULE_ALIASES = {
  colleges: 'colleges',
  'colleges.yaml': 'colleges',
  navigation: 'navigation',
  'navigation.yaml': 'navigation',
  admissions: 'admissions',
  'admissions.yaml': 'admissions',
  news: 'news',
  'news.yaml': 'news',
};

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
  if (Array.isArray(value)) return true;
  if (typeof value === 'object') return true;
  if (typeof value === 'boolean') return true;
  return true;
}

function loadYaml(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function resolveModuleName(input) {
  if (!input) return null;
  const base = path.basename(String(input));
  return MODULE_ALIASES[base] || MODULE_ALIASES[input] || null;
}

function resolveYamlPath(moduleName, input) {
  if (!input || input === moduleName || input === `${moduleName}.yaml`) {
    return path.join(SCRIPT_DIR, 'data', `${moduleName}.yaml`);
  }
  if (path.isAbsolute(input)) return input;
  const fromData = path.join(SCRIPT_DIR, 'data', path.basename(input));
  if (fs.existsSync(fromData)) return fromData;
  return path.resolve(PROJECT_ROOT, input);
}

function validateRequired(obj, fields, prefix, errors) {
  for (const field of fields) {
    if (!isPresent(obj?.[field])) {
      errors.push(`${prefix}: missing required field '${field}'`);
    }
  }
}

function validateColleges(data, rules) {
  const errors = [];
  const list = data?.colleges;
  if (!Array.isArray(list) || list.length === 0) {
    errors.push('colleges.yaml must contain a non-empty colleges: list');
    return errors;
  }
  const required = rules.required_fields ?? [];
  const allowedIds = rules.allowed_ids ?? [];
  const seen = new Set();

  list.forEach((item, i) => {
    const label = item?.id || `#${i + 1}`;
    validateRequired(item, required, label, errors);
    if (item?.id) {
      if (seen.has(item.id)) errors.push(`${label}: duplicate id`);
      seen.add(item.id);
      if (allowedIds.length && !allowedIds.includes(item.id)) {
        errors.push(`${label}: id '${item.id}' is not allowed`);
      }
    }
  });
  return errors;
}

function validateNavigation(data, rules) {
  const errors = [];
  if (!Array.isArray(data?.mainNavItems) || data.mainNavItems.length === 0) {
    errors.push('navigation.yaml must contain mainNavItems');
  }
  if (!Array.isArray(data?.footerSections) || data.footerSections.length === 0) {
    errors.push('navigation.yaml must contain footerSections');
  }

  const itemFields = rules.nav_item_required_fields ?? ['label', 'path'];
  (data?.mainNavItems ?? []).forEach((item, i) => {
    validateRequired(item, itemFields, `mainNavItems[${i}]`, errors);
    (item.children ?? []).forEach((child, j) => {
      validateRequired(child, itemFields, `mainNavItems[${i}].children[${j}]`, errors);
    });
  });

  (data?.footerSections ?? []).forEach((section, i) => {
    if (!isPresent(section?.title)) errors.push(`footerSections[${i}]: missing title`);
    if (!Array.isArray(section?.items)) errors.push(`footerSections[${i}]: missing items`);
    (section?.items ?? []).forEach((item, j) => {
      validateRequired(item, itemFields, `footerSections[${i}].items[${j}]`, errors);
    });
  });

  return errors;
}

function validateAdmissions(data, rules) {
  const errors = [];
  const info = data?.admissionInfo;
  if (!info || typeof info !== 'object') {
    errors.push('admissions.yaml must contain admissionInfo');
    return errors;
  }
  validateRequired(info, rules.required_fields ?? [], 'admissionInfo', errors);
  if (!Array.isArray(info.steps) || info.steps.length === 0) {
    errors.push('admissionInfo.steps must be a non-empty list');
  }
  (info.steps ?? []).forEach((step, i) => {
    validateRequired(step, rules.step_required_fields ?? ['step', 'title', 'description'], `steps[${i}]`, errors);
  });
  (info.requirements ?? []).forEach((req, i) => {
    validateRequired(
      req,
      rules.requirement_required_fields ?? ['collegeId', 'collegeName', 'qualification', 'requirements', 'mandatorySubjects'],
      `requirements[${i}]`,
      errors,
    );
  });
  (info.faqs ?? []).forEach((faq, i) => {
    validateRequired(faq, ['question', 'answer'], `faqs[${i}]`, errors);
  });
  return errors;
}

function validateNews(data, rules) {
  const errors = [];
  const list = data?.newsArticles;
  if (!Array.isArray(list) || list.length === 0) {
    errors.push('news.yaml must contain a non-empty newsArticles: list');
    return errors;
  }
  const required = rules.required_fields ?? [];
  const seen = new Set();
  list.forEach((item, i) => {
    const label = item?.id || `#${i + 1}`;
    validateRequired(item, required, label, errors);
    if (item?.id) {
      if (seen.has(item.id)) errors.push(`${label}: duplicate id`);
      seen.add(item.id);
    }
  });
  return errors;
}

function generateNavItem(item, indent = 2) {
  const pad = ' '.repeat(indent);
  const lines = [`${pad}{`];
  lines.push(`${pad}  label: ${quote(item.label)},`);
  lines.push(`${pad}  path: ${quote(item.path)},`);
  if (item.isExternal) lines.push(`${pad}  isExternal: true,`);
  if (Array.isArray(item.children) && item.children.length) {
    lines.push(`${pad}  children: [`);
    item.children.forEach((child, index) => {
      lines.push(generateNavItem(child, indent + 4) + (index < item.children.length - 1 ? ',' : ''));
    });
    lines.push(`${pad}  ],`);
  }
  lines.push(`${pad}}`);
  return lines.join('\n');
}

function generateCollegesTs(list) {
  const blocks = list.map((c) => {
    const lines = [
      '  {',
      `    id: ${quote(c.id)},`,
      `    name: ${quote(c.name)},`,
      `    shortName: ${quote(c.shortName)},`,
      `    slug: ${quote(c.slug)},`,
      `    tagline: ${quote(c.tagline)},`,
      `    description: ${quote(c.description)},`,
    ];
    if (c.heroImage) lines.push(`    heroImage: ${quote(c.heroImage)},`);
    if (c.accentColor) lines.push(`    accentColor: ${quote(c.accentColor)},`);
    if (Array.isArray(c.trainingFoci)) {
      lines.push(`    trainingFoci: ${quoteList(c.trainingFoci)},`);
    }
    if (Array.isArray(c.features)) {
      lines.push('    features: [');
      c.features.forEach((f, i) => {
        lines.push('      {');
        lines.push(`        title: ${quote(f.title)},`);
        lines.push(`        description: ${quote(f.description)},`);
        if (f.iconName) lines.push(`        iconName: ${quote(f.iconName)},`);
        lines.push(`      }${i < c.features.length - 1 ? ',' : ''}`);
      });
      lines.push('    ],');
    }
    lines.push('  }');
    return lines.join('\n');
  });

  return `import { College } from '@/types/college';

export const colleges: College[] = [
${blocks.join(',\n')},
];
`;
}

function generateNavigationTs(data) {
  const nav = (data.mainNavItems ?? []).map((item, i, arr) => {
    return generateNavItem(item, 2) + (i < arr.length - 1 ? ',' : '');
  });

  const footer = (data.footerSections ?? []).map((section, i, arr) => {
    const items = (section.items ?? [])
      .map((item, j, a) => generateNavItem(item, 8) + (j < a.length - 1 ? ',' : ''))
      .join('\n');
    return (
      `  {\n` +
      `    title: ${quote(section.title)},\n` +
      `    items: [\n${items}\n    ],\n` +
      `  }${i < arr.length - 1 ? ',' : ''}`
    );
  });

  return `import { NavItem, FooterSection } from '@/types/navigation';

export const mainNavItems: NavItem[] = [
${nav.join('\n')}
];

export const footerSections: FooterSection[] = [
${footer.join('\n')}
];
`;
}

function generateAdmissionsTs(info) {
  const steps = (info.steps ?? [])
    .map((s, i, arr) => {
      const lines = [
        '    {',
        `      step: ${quote(s.step)},`,
        `      title: ${quote(s.title)},`,
        `      description: ${quote(s.description)},`,
      ];
      if (s.details) lines.push(`      details: ${quote(s.details)},`);
      lines.push(`    }${i < arr.length - 1 ? ',' : ''}`);
      return lines.join('\n');
    })
    .join('\n');

  const requirements = (info.requirements ?? [])
    .map((r, i, arr) => {
      return (
        `    {\n` +
        `      collegeId: ${quote(r.collegeId)},\n` +
        `      collegeName: ${quote(r.collegeName)},\n` +
        `      qualification: ${quote(r.qualification)},\n` +
        `      mandatorySubjects: ${quoteList(r.mandatorySubjects ?? [])},\n` +
        `      requirements: ${quoteList(r.requirements ?? [])},\n` +
        `    }${i < arr.length - 1 ? ',' : ''}`
      );
    })
    .join('\n');

  const faqs = (info.faqs ?? [])
    .map((f, i, arr) => {
      return (
        `    {\n` +
        `      question: ${quote(f.question)},\n` +
        `      answer: ${quote(f.answer)},\n` +
        `    }${i < arr.length - 1 ? ',' : ''}`
      );
    })
    .join('\n');

  return `export interface AdmissionStep {
  step: string;
  title: string;
  description: string;
  details?: string;
}

export interface AdmissionFAQ {
  question: string;
  answer: string;
}

export interface AdmissionRequirementCategory {
  collegeId: string;
  collegeName: string;
  qualification: string;
  requirements: string[];
  mandatorySubjects: string[];
}

export interface AdmissionInfo {
  session: string;
  applicationOpen: boolean;
  generalNotice: string;
  steps: AdmissionStep[];
  requirements: AdmissionRequirementCategory[];
  faqs: AdmissionFAQ[];
}

export const admissionInfo: AdmissionInfo = {
  session: ${quote(info.session)},
  applicationOpen: ${Boolean(info.applicationOpen)},
  generalNotice: ${quote(info.generalNotice)},
  steps: [
${steps}
  ],
  requirements: [
${requirements}
  ],
  faqs: [
${faqs}
  ],
};
`;
}

function generateNewsTs(list) {
  const blocks = list.map((n) => {
    const lines = [
      '  {',
      `    id: ${quote(n.id)},`,
      `    title: ${quote(n.title)},`,
      `    slug: ${quote(n.slug)},`,
      `    date: ${quote(n.date)},`,
      `    category: ${quote(n.category)},`,
      `    summary: ${quote(n.summary)},`,
    ];
    if (n.content) lines.push(`    content: ${quote(n.content)},`);
    if (n.featuredImage) lines.push(`    featuredImage: ${quote(n.featuredImage)},`);
    if (n.collegeId) lines.push(`    collegeId: ${quote(n.collegeId)},`);
    lines.push('  }');
    return lines.join('\n');
  });

  return `import { NewsArticle } from '@/types/news';

export const newsArticles: NewsArticle[] = [
${blocks.join(',\n')},
];
`;
}

function printStatus(moduleName, rules) {
  const mod = rules.modules[moduleName];
  const source = path.join(SCRIPT_DIR, mod.source);
  console.log(`Adeshina modular pipeline (Phase 4 — ${moduleName})`);
  console.log('');
  console.log(`  DATA   src/script/data/${moduleName}.yaml`);
  console.log('  RULES  src/script/module.yaml');
  console.log(`  APP    ${mod.target}`);
  console.log('');
  console.log(`  YAML exists: ${fs.existsSync(source) ? 'yes' : 'NO'}`);
  console.log('');
  console.log(`Commands:`);
  console.log(`  npm run sync:${moduleName}`);
  console.log(`  npm run sync:${moduleName} -- load ${moduleName}.yaml`);
}

function syncModule(moduleName, yamlPath, moduleRules) {
  const targetPath = path.join(PROJECT_ROOT, moduleRules.target);
  const data = loadYaml(yamlPath);

  let errors = [];
  let output = '';
  let summary = '';

  if (moduleName === 'colleges') {
    errors = validateColleges(data, moduleRules);
    if (!errors.length) {
      output = generateCollegesTs(data.colleges);
      summary = `${data.colleges.length} colleges`;
    }
  } else if (moduleName === 'navigation') {
    errors = validateNavigation(data, moduleRules);
    if (!errors.length) {
      output = generateNavigationTs(data);
      summary = `${data.mainNavItems.length} nav items, ${data.footerSections.length} footer sections`;
    }
  } else if (moduleName === 'admissions') {
    errors = validateAdmissions(data, moduleRules);
    if (!errors.length) {
      output = generateAdmissionsTs(data.admissionInfo);
      summary = 'admissionInfo';
    }
  } else if (moduleName === 'news') {
    errors = validateNews(data, moduleRules);
    if (!errors.length) {
      output = generateNewsTs(data.newsArticles);
      summary = `${data.newsArticles.length} articles`;
    }
  } else {
    throw new Error(`Unsupported module: ${moduleName}`);
  }

  console.log(`Loading:  ${path.relative(PROJECT_ROOT, yamlPath)}`);
  console.log(`Rules:    ${path.relative(PROJECT_ROOT, RULES_PATH)}`);
  console.log(`Writing:  ${path.relative(PROJECT_ROOT, targetPath)}`);
  console.log('');

  if (errors.length) {
    console.error(`Validation failed. ${moduleRules.target} was NOT changed.`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  const backupPath = backupFileBeforeWrite(targetPath);
  fs.writeFileSync(targetPath, output, 'utf8');
  console.log('Validation passed.');
  if (backupPath) {
    console.log(`Backup saved: ${path.relative(PROJECT_ROOT, backupPath)}`);
  }
  console.log(`Updated ${moduleRules.target} (${summary}) from YAML.`);
  console.log('React still reads the TypeScript file — no page files were changed.');
}

function main() {
  const args = process.argv.slice(2);
  const rulesDoc = loadYaml(RULES_PATH);

  // Patterns supported:
  //   node sync-content.mjs colleges
  //   node sync-content.mjs load colleges.yaml
  //   node sync-content.mjs colleges load colleges.yaml   (npm run sync:colleges -- load ...)
  let command = args[0];
  let fileOrModule = args[1];

  if (resolveModuleName(args[0]) && (args[1] === 'load' || args[1] === 'sync')) {
    const moduleName = resolveModuleName(args[0]);
    const moduleRules = rulesDoc?.modules?.[moduleName];
    if (!moduleRules) throw new Error(`module.yaml is missing modules.${moduleName}`);
    const yamlPath = resolveYamlPath(moduleName, args[2] || `${moduleName}.yaml`);
    syncModule(moduleName, yamlPath, moduleRules);
    return;
  }

  let moduleName = resolveModuleName(command);
  if (moduleName && command !== 'load' && command !== 'sync') {
    printStatus(moduleName, rulesDoc);
    return;
  }

  if (command === 'load' || command === 'sync') {
    moduleName = resolveModuleName(fileOrModule);
    if (!moduleName) {
      console.error('Specify which content to load: colleges, navigation, admissions, or news');
      process.exit(1);
    }
    const moduleRules = rulesDoc?.modules?.[moduleName];
    if (!moduleRules) {
      throw new Error(`module.yaml is missing modules.${moduleName}`);
    }
    const yamlPath = resolveYamlPath(moduleName, fileOrModule);
    syncModule(moduleName, yamlPath, moduleRules);
    return;
  }

  console.log('Adeshina Phase 4 content sync');
  console.log('');
  console.log('  npm run sync:colleges -- load colleges.yaml');
  console.log('  npm run sync:navigation -- load navigation.yaml');
  console.log('  npm run sync:admissions -- load admissions.yaml');
  console.log('  npm run sync:news -- load news.yaml');
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
