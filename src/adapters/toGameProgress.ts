import type { Cv, CvEntry, EntryKey, Track } from '../data/cv.types';
import { ACHIEVEMENTS, STAGE_META, type AchievementIcon, type AchievementMeta } from '../data/gameMeta';
import { PROJECTS } from '../data/projects';
import { monthsBetween } from './dates';

export interface GameStage {
    key: EntryKey;
    number: string;
    stage: string;
    title: string;
    company: string;
    years: string;
    track: Track;
    current: boolean;
}

export interface GameAchievement {
    id: string;
    title: string;
    description: string;
    icon: AchievementIcon;
    year: string;
    rarity: AchievementMeta['rarity'];
}

export interface GameRelease {
    id: string;
    title: string;
    blurb: string;
    href: string;
}

export interface GameProgress {
    player: string;
    level: number;
    /** 0..1 progress toward the next level (the next career year). */
    xp: number;
    xpLabel: string;
    stages: GameStage[];
    achievements: GameAchievement[];
    releases: GameRelease[];
}

function entryFor(cv: Cv, key: EntryKey): CvEntry | undefined {
    const [kind, id] = key.split(':');
    return kind === 'work' ? cv.work.find((w) => w.id === id) : cv.education.find((e) => e.id === id);
}

export function toGameProgress(cv: Cv): GameProgress {
    const months = monthsBetween(cv.careerStart);
    const level = Math.floor(months / 12);

    // Oldest first — you play a career from stage 1.
    const stages: GameStage[] = [...cv.work].reverse().map((entry, i) => {
        const key: EntryKey = `work:${entry.id}`;
        return {
            key,
            number: String(i + 1).padStart(2, '0'),
            stage: STAGE_META[key]?.stage ?? entry.company,
            title: entry.title,
            company: entry.company,
            years: `${entry.startDate.slice(0, 4)}${entry.endDate ? (entry.endDate.slice(0, 4) !== entry.startDate.slice(0, 4) ? `–${entry.endDate.slice(0, 4)}` : '') : '–now'}`,
            track: entry.track,
            current: entry.endDate === null,
        };
    });

    const achievements: GameAchievement[] = ACHIEVEMENTS.map((a) => {
        const entry = a.source ? entryFor(cv, a.source) : undefined;
        const year = entry ? (entry.endDate ?? entry.startDate).slice(0, 4) : a.year ?? '—';
        return { id: a.id, title: a.title, description: a.description, icon: a.icon, year, rarity: a.rarity };
    });

    const releases: GameRelease[] = PROJECTS.filter((p) => p.kind === 'internal').map((p) => ({
        id: p.id,
        title: p.title,
        blurb: p.blurb,
        href: p.href,
    }));

    return {
        player: cv.basics.name,
        level,
        xp: (months % 12) / 12,
        xpLabel: `${months % 12}/12 months to LVL ${level + 1}`,
        stages,
        achievements,
        releases,
    };
}
