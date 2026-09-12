import type { EntryKey } from './cv.types';

export type AbilityName = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface AbilityScore {
    score: number;
    rationale: string;
}

export type SkillName =
    | 'Acrobatics'
    | 'Animal Handling'
    | 'Arcana'
    | 'Athletics'
    | 'Deception'
    | 'History'
    | 'Insight'
    | 'Intimidation'
    | 'Investigation'
    | 'Medicine'
    | 'Nature'
    | 'Perception'
    | 'Performance'
    | 'Persuasion'
    | 'Religion'
    | 'Sleight of Hand'
    | 'Stealth'
    | 'Survival';

export interface SheetFeature {
    name: string;
    level: number;
    description: string;
}

export interface SheetFeat {
    name: string;
    description: string;
    unlockedBy: EntryKey;
}

export interface SheetInventoryItem {
    name: string;
    description: string;
}

export interface SheetAction {
    name: string;
    kind: string;
    description: string;
}

export const ABILITY_SCORES: Record<AbilityName, AbilityScore> = {
    STR: { score: 12, rationale: '.NET, C#, Node, Python, PHP — real backend weight, not the primary axis.' },
    DEX: { score: 18, rationale: 'React, React Native, TypeScript, CSS across five roles. The signature stat.' },
    CON: { score: 16, rationale: 'Ten years, three employers, 4+ years in one seat. CV says "manages stress effectively."' },
    INT: { score: 18, rationale: 'MSc + thesis + ML/CV research + system architecture.' },
    WIS: { score: 15, rationale: '"Adapts to rapidly changing environments." Also: philosophy.' },
    CHA: { score: 16, rationale: 'Team Lead, mentors interns and juniors, English C1/C2, IFA stage demos.' },
};

export const EXPERTISE_SKILLS: SkillName[] = ['Arcana', 'Sleight of Hand', 'Investigation', 'Persuasion'];

export const SHEET_FEATURES: SheetFeature[] = [
    {
        name: "Mentor's Aegis",
        level: 6,
        description: 'Allies within 30 ft add your proficiency bonus to their first attempt at an unfamiliar task.',
    },
    {
        name: "Architect's Foresight",
        level: 8,
        description: 'Once per long rest, foresee one flaw in a design before it ships, avoiding a failure entirely.',
    },
    {
        name: 'Stress Immunity',
        level: 3,
        description: 'Advantage on saving throws against being frightened by an approaching deadline.',
    },
];

export const SHEET_FEATS: SheetFeat[] = [
    { name: 'Cloud Attunement', description: 'You have advantage on checks made while wielding AWS services.', unlockedBy: 'work:vestel-senior' },
    { name: 'Researcher', description: 'You gain expertise in Investigation and can identify the true cause of any bug given time.', unlockedBy: 'education:msc-ted' },
    { name: 'Linguist', description: 'You have learned two additional tongues: JavaScript and TypeScript.', unlockedBy: 'education:bsc-iue' },
];

export const SHEET_INVENTORY: SheetInventoryItem[] = [
    { name: 'Mechanical Keyboard +1', description: 'Clicky. Requires attunement.' },
    { name: 'Wand of Prototyping', description: 'Figma, 7 charges. Regains 1d6+1 charges at dawn.' },
    { name: 'Rope of Rewinding, 50 ft', description: '`git reset --hard`. Use with caution.' },
    { name: 'Bag of Holding', description: '`node_modules`. Weight: yes, actually.' },
    { name: 'Shield of the Second Monitor +2', description: 'Grants advantage on Perception checks made while debugging.' },
    { name: 'Cup of Endless Turkish Coffee', description: 'Refills once per short rest.' },
];

export const SHEET_ACTIONS: SheetAction[] = [
    { name: 'Refactor', kind: 'Melee Weapon Attack', description: '+8 to hit, reach 5 ft, one target. Hit: 2d8 + 4 tech-debt damage.' },
    { name: 'Design Review', kind: 'Ranged, 30 ft', description: 'Target must make a DC 16 Wisdom saving throw or accept the proposal.' },
    { name: 'Ship to Production', kind: '1/Day', description: 'Recharges on a long rest. Deploys the current build to the live environment.' },
];
