import type { Cv, TechId } from '../data/cv.types';
import { techLabel } from '../data/tech';
import { monthsBetween } from './dates';

export interface DevCommit {
    hash: string;
    years: string;
    message: string;
    isHead: boolean;
}

export interface DevDependency {
    name: string;
    /** semver-ish "^years.months.0" — time spent using it professionally. */
    version: string;
    months: number;
}

export interface DevLog {
    handle: string;
    whoami: string;
    commits: DevCommit[];
    dependencies: DevDependency[];
    education: string[];
    totalYears: number;
}

/** Deterministic 7-char hex "commit hash" from an id (FNV-1a). */
function shortHash(input: string): string {
    let h = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function slug(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ı/g, 'i')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/** "TED University" → "tedu", "Riga Technical University" → "rtu". */
function institutionExt(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/)
        .filter((w) => w.toLowerCase() !== 'of')
        .map((w) => (w === w.toUpperCase() && w.length > 1 ? w : w[0]))
        .join('')
        .toLowerCase();
}

function yearSpan(start: string, end: string | null): string {
    const a = start.slice(0, 4);
    const b = end ? end.slice(0, 4) : 'now';
    return a === b ? a : `${a}–${b}`;
}

export function toDevLog(cv: Cv): DevLog {
    const commits: DevCommit[] = cv.work.map((entry, i) => ({
        hash: shortHash(entry.id),
        years: yearSpan(entry.startDate, entry.endDate),
        message: `${entry.title} @ ${entry.company}`,
        isHead: i === 0,
    }));

    const monthsByTech = new Map<TechId, number>();
    for (const entry of cv.work) {
        const months = Math.max(1, monthsBetween(entry.startDate, entry.endDate));
        for (const tech of entry.tech) monthsByTech.set(tech, (monthsByTech.get(tech) ?? 0) + months);
    }
    const dependencies: DevDependency[] = Array.from(monthsByTech.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([id, months]) => ({
            name: techLabel(id).toLowerCase().replace(/\s+/g, '-'),
            version: `^${Math.floor(months / 12)}.${months % 12}.0`,
            months,
        }));

    const education = cv.education.map(
        (e) => `${e.studyType.toLowerCase()}-${slug(e.area)}.${institutionExt(e.institution)}`
    );

    return {
        handle: slug(cv.basics.name),
        whoami: `${cv.basics.name} — Software Architect & Team Lead @ ${cv.work[0]?.company ?? ''}`,
        commits,
        dependencies,
        education,
        totalYears: Math.floor(monthsBetween(cv.careerStart) / 12),
    };
}
