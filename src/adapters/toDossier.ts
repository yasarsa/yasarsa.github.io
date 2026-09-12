import type { Cv, EntryKey } from '../data/cv.types';
import { DEPLOYMENT_TITLES, DOSSIER_HEADER, SCHOLAM_TITLES } from '../data/dossierMeta';
import { techLabel } from '../data/tech';
import { formatRange, monthsBetween } from './dates';

export interface DossierDeployment {
    id: string;
    range: string;
    rank: string;
    title: string;
    company: string;
    note: string;
}

export interface DossierScholam {
    id: string;
    title: string;
    institution: string;
    range: string;
    note?: string;
}

export interface Dossier {
    header: typeof DOSSIER_HEADER;
    name: string;
    serviceYears: number;
    campaigns: number;
    deployments: DossierDeployment[];
    rites: string[];
    lingua: string[];
    scholam: DossierScholam[];
    email: string;
}

export function toDossier(cv: Cv): Dossier {
    const deployments: DossierDeployment[] = cv.work.map((entry) => {
        const key: EntryKey = `work:${entry.id}`;
        const meta = DEPLOYMENT_TITLES[key];
        return {
            id: entry.id,
            range: formatRange(entry.startDate, entry.endDate),
            rank: meta?.rank ?? entry.title,
            title: entry.title,
            company: entry.team ? `${entry.company} — ${entry.team}` : entry.company,
            note: meta?.note ?? entry.summary,
        };
    });

    const rites = Array.from(new Set(cv.work.flatMap((w) => w.tech)))
        .slice(0, 10)
        .map((id) => `Rite of ${techLabel(id)}`);

    const scholam: DossierScholam[] = cv.education.map((e) => ({
        id: e.id,
        title: SCHOLAM_TITLES[`education:${e.id}`] ?? `${e.studyType} ${e.area}`,
        institution: e.institution,
        range: formatRange(e.startDate, e.endDate),
        note: e.thesis ? `Thesis: “${e.thesis.title}”` : undefined,
    }));

    return {
        header: DOSSIER_HEADER,
        name: cv.basics.name,
        serviceYears: Math.floor(monthsBetween(cv.careerStart) / 12),
        campaigns: cv.work.length,
        deployments,
        rites,
        lingua: cv.languages.map((l) => `${l.language} — ${l.fluency}`),
        scholam,
        email: cv.basics.email,
    };
}
