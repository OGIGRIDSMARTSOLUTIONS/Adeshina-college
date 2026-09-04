/**
 * Dump Phase 4 TypeScript data → YAML (one-time / refresh helper)
 * Run: npx tsx src/script/dump-phase4.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { colleges } from '../data/colleges.ts';
import { mainNavItems, footerSections } from '../data/navigation.ts';
import { admissionInfo } from '../data/admissions.ts';
import { newsArticles } from '../data/news.ts';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(SCRIPT_DIR, 'data');

function writeYaml(filename, header, doc) {
  const body = yaml.dump(doc, {
    lineWidth: 100,
    noRefs: true,
    quotingType: "'",
    forceQuotes: false,
  });
  const outPath = path.join(DATA_DIR, filename);
  fs.writeFileSync(outPath, `${header}\n${body}`, 'utf8');
  console.log(`Wrote ${outPath}`);
}

writeYaml(
  'colleges.yaml',
  `# =============================================================================
# colleges.yaml  =  THE TWO COLLEGES (facts)
# =============================================================================
# Each item is one college: Health Technology or Education.
# Edit here, then:  npm run sync:colleges -- load colleges.yaml
# React still reads src/data/colleges.ts after sync.
#`,
  { colleges },
);

writeYaml(
  'navigation.yaml',
  `# =============================================================================
# navigation.yaml  =  MENU LINKS (header + footer)
# =============================================================================
# mainNavItems  → top website menu
# footerSections → footer link groups
# Edit here, then:  npm run sync:navigation -- load navigation.yaml
#`,
  { mainNavItems, footerSections },
);

writeYaml(
  'admissions.yaml',
  `# =============================================================================
# admissions.yaml  =  ADMISSIONS INFO (steps, requirements, FAQs)
# =============================================================================
# session, applicationOpen, generalNotice, steps, requirements, faqs
# Edit here, then:  npm run sync:admissions -- load admissions.yaml
#`,
  { admissionInfo },
);

writeYaml(
  'news.yaml',
  `# =============================================================================
# news.yaml  =  NEWS / UPDATES (articles)
# =============================================================================
# Each item is one news article (title, date, summary, content…)
# Edit here, then:  npm run sync:news -- load news.yaml
#`,
  { newsArticles },
);

console.log('Phase 4 YAML dump complete.');
