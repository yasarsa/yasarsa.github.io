// Post-build step for GitHub Pages: copy dist/index.html to every known
// route so a direct hit on e.g. /cv/mtg returns a real 200 with its own
// <title>/description, instead of relying solely on the 404.html SPA
// fallback (which crawlers read as "gone"). dist/404.html stays as the
// catch-all for genuinely unknown paths.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const indexPath = join(distDir, 'index.html');
const indexHtml = readFileSync(indexPath, 'utf-8');

const ORIGIN = 'https://yasarsa.github.io';

/** @type {{ path: string, title: string, description: string }[]} */
const ROUTES = [
    {
        path: '/cv/mtg',
        title: 'CV — MTG Card Set — Yaşar Anıl Sansak',
        description: 'The Magic realm: career and education presented as a set of Magic: The Gathering-style trading cards.',
    },
    {
        path: '/cv/sheet',
        title: 'CV — Character Sheet — Yaşar Anıl Sansak',
        description: 'The D&D realm: career and education translated into a full D&D 5e character sheet.',
    },
    {
        path: '/cv/json',
        title: 'CV — JSON Resume — Yaşar Anıl Sansak',
        description: 'The Software realm: the CV as machine-readable JSON, following the open JSON Resume schema.',
    },
    {
        path: '/projects',
        title: 'Projects — Yaşar Anıl Sansak',
        description: "A curated list of projects, including two playable apps built into this site.",
    },
    {
        path: '/dnd',
        title: 'D&D Damage Calculator — Yaşar Anıl Sansak',
        description: 'A character and attack manager for tabletop D&D sessions.',
    },
    {
        path: '/kt',
        title: 'Kill Team Operatives — Yaşar Anıl Sansak',
        description: 'Stat cards and weapon tables for Warhammer 40k: Kill Team operatives.',
    },
];

function withMeta(html, route) {
    const escapedTitle = route.title.replace(/&/g, '&amp;');
    const escapedDesc = route.description.replace(/"/g, '&quot;');
    const url = `${ORIGIN}${route.path}`;

    return html
        .replace(/<title>.*?<\/title>/s, `<title>${escapedTitle}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapedDesc}" />`)
        .replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${url}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapedTitle}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapedDesc}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${url}" />`);
}

for (const route of ROUTES) {
    const html = withMeta(indexHtml, route);
    const outDir = join(distDir, route.path.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
    console.log(`Emitted ${route.path}/index.html`);
}

// dist/404.html stays as the SPA fallback for genuinely unknown paths.
copyFileSync(indexPath, join(distDir, '404.html'));
console.log('Refreshed 404.html');
