/**
 * One-time helper: dump existing programmes.ts → programmes.yaml
 * Run: npx tsx src/script/dump-programmes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { programmes } from '../data/programmes.ts';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(SCRIPT_DIR, 'data', 'programmes.yaml');

const header = `# =============================================================================
# programmes.yaml  =  COURSE / PROGRAMME LIST (the facts)
# =============================================================================
# Each item under "programmes:" is one course the school offers.
#
# Important fields:
#   id                 → unique code used in the app (do not duplicate)
#   name               → what students see (e.g. CHEW, NCE English / History)
#   collegeId          → health-technology  OR  education
#   level              → Diploma, Certificate, NCE, etc.
#   duration           → e.g. 3 Years
#   mode               → study mode list (currently Full-Time only)
#   verificationStatus → verified  OR  research-found
#
# React does NOT read this file directly.
# Run:  npm run sync:programmes -- load programmes.yaml
# That updates src/data/programmes.ts for the website.
#

`;

const doc = { programmes };

const body = yaml.dump(doc, {
  lineWidth: 100,
  noRefs: true,
  quotingType: "'",
  forceQuotes: false,
});

fs.writeFileSync(outPath, header + body, 'utf8');
console.log(`Wrote ${programmes.length} programmes → ${outPath}`);
