import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { cv } from '../src/data/cv.ts';
import { toJsonResume } from '../src/adapters/toJsonResume.ts';

const outPath = fileURLToPath(new URL('../public/cv.json', import.meta.url));
const resume = toJsonResume(cv);

writeFileSync(outPath, JSON.stringify(resume, null, 2) + '\n', 'utf-8');
console.log(`Generated ${outPath}`);
