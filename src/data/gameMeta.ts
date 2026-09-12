import type { EntryKey } from './cv.types';

/** Hand-authored flavour for the "CAREER.EXE" (game dev) chapter. */

export interface StageMeta {
    /** Short arcade-style stage name. */
    stage: string;
}

export const STAGE_META: Partial<Record<EntryKey, StageMeta>> = {
    'work:vestel-intern': { stage: 'Tutorial Island' },
    'work:bidolubaski': { stage: 'Print Shop Plains' },
    'work:otsimo': { stage: 'Kindness Castle' },
    'work:4a-labs': { stage: 'Speedrun Sprint' },
    'work:vestel-senior': { stage: 'Full-Stack Fortress' },
    'work:vestel-architect': { stage: 'Architect Tower' },
};

export type AchievementIcon = 'star' | 'trophy' | 'scroll' | 'plane' | 'shield' | 'crown' | 'mic' | 'chat' | 'heart';

export interface AchievementMeta {
    id: string;
    title: string;
    description: string;
    icon: AchievementIcon;
    /** CV entry this unlock is derived from — its dates drive the year shown. */
    source?: EntryKey;
    /** Fallback when there's no single source entry. */
    year?: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: AchievementMeta[] = [
    { id: 'tutorial', title: 'Tutorial Complete', description: 'Wrote first test scripts for set-top boxes as an R&D intern.', icon: 'star', source: 'work:vestel-intern', rarity: 'common' },
    { id: 'passport', title: 'Passport Stamped', description: 'Erasmus exchange in Computer Science — Riga, Latvia.', icon: 'plane', source: 'education:erasmus-riga', rarity: 'rare' },
    { id: 'class', title: 'Class Unlocked: Engineer', description: "Bachelor's in Computer Engineering, İzmir University of Economics.", icon: 'scroll', source: 'education:bsc-iue', rarity: 'rare' },
    { id: 'kindness', title: 'Healer Build', description: 'Shipped special-education & speech-therapy apps for children.', icon: 'heart', source: 'work:otsimo', rarity: 'epic' },
    { id: 'party', title: 'Party Leader', description: 'Promoted to Software Architect & Team Lead.', icon: 'crown', source: 'work:vestel-architect', rarity: 'legendary' },
    { id: 'boss', title: 'Boss Defeated: Thesis', description: 'MSc thesis — Automatic Stuttering Detection and Classification.', icon: 'trophy', source: 'education:msc-ted', rarity: 'legendary' },
    { id: 'stage', title: 'Main Stage', description: 'Built AI-powered demos for IFA 2024 and IFA 2025.', icon: 'mic', year: '2025', rarity: 'epic' },
    { id: 'polyglot', title: 'Polyglot', description: 'English at C1/C2 (YDS 92) on top of native Turkish.', icon: 'chat', year: '—', rarity: 'rare' },
    { id: 'mentor', title: 'Co-op Mode', description: 'Mentored interns and juniors through full dev cycles.', icon: 'shield', source: 'work:vestel-architect', rarity: 'epic' },
];
