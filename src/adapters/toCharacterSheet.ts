import type { Cv, ExperienceEntry, TechId } from '../data/cv.types';
import { techLabel, techsByKind } from '../data/tech';
import {
    ABILITY_SCORES,
    EXPERTISE_SKILLS,
    SHEET_ACTIONS,
    SHEET_FEATS,
    SHEET_FEATURES,
    SHEET_INVENTORY,
    type AbilityName,
    type SkillName,
} from '../data/sheetMeta';
import { yearsBetween } from './dates';

export interface ClassLevel {
    name: string;
    subclass: string;
    level: number;
    hitDie: number;
}

export interface AbilityBlockData {
    ability: AbilityName;
    score: number;
    modifier: number;
    rationale: string;
}

export interface SavingThrowData {
    ability: AbilityName;
    modifier: number;
    proficient: boolean;
}

export interface SkillData {
    name: SkillName;
    ability: AbilityName;
    modifier: number;
    proficient: boolean;
    expertise: boolean;
}

export interface CharacterSheet {
    name: string;
    classes: ClassLevel[];
    level: number;
    proficiencyBonus: number;
    hitDiceLabel: string;
    hp: number;
    ac: number;
    armorName: string;
    initiative: number;
    speed: number;
    passivePerception: number;
    abilities: AbilityBlockData[];
    savingThrows: SavingThrowData[];
    skills: SkillData[];
    commonTongues: string;
    exoticTongues: string;
    toolProficiencies: string;
    features: typeof SHEET_FEATURES;
    feats: typeof SHEET_FEATS;
    inventory: typeof SHEET_INVENTORY;
    actions: typeof SHEET_ACTIONS;
    backstory: string;
    xpProgress: number; // 0..1 toward next level
}

function abilityMod(score: number): number {
    return Math.floor((score - 10) / 2);
}

function yearsByTrack(work: ExperienceEntry[], track: ExperienceEntry['track']): number {
    return work
        .filter((entry) => entry.track === track)
        .reduce((sum, entry) => sum + yearsBetween(entry.startDate, entry.endDate), 0);
}

function joinedHighlights(cv: Cv): string {
    return [
        ...cv.work.flatMap((w) => w.highlights),
        ...cv.education.flatMap((e) => e.highlights),
    ]
        .join(' ')
        .toLowerCase();
}

const SKILL_ABILITY: Record<SkillName, AbilityName> = {
    Acrobatics: 'DEX',
    'Animal Handling': 'WIS',
    Arcana: 'INT',
    Athletics: 'STR',
    Deception: 'CHA',
    History: 'INT',
    Insight: 'WIS',
    Intimidation: 'CHA',
    Investigation: 'INT',
    Medicine: 'WIS',
    Nature: 'INT',
    Perception: 'WIS',
    Performance: 'CHA',
    Persuasion: 'CHA',
    Religion: 'INT',
    'Sleight of Hand': 'DEX',
    Stealth: 'DEX',
    Survival: 'WIS',
};

function skillEvidence(cv: Cv, skill: SkillName): number {
    const text = joinedHighlights(cv);
    const workTech = (ids: TechId[]) => cv.work.filter((w) => ids.some((id) => w.tech.includes(id))).length;
    const leadRoles = cv.work.filter((w) => w.track === 'lead').length;

    switch (skill) {
        case 'Arcana':
            return workTech(['react', 'typescript']);
        case 'Sleight of Hand':
            return workTech(['css']);
        case 'Investigation':
            return (cv.education.some((e) => e.thesis) ? 1 : 0) + (/debug|architecture|design/.test(text) ? 1 : 0);
        case 'Persuasion':
            return leadRoles + (/mentor|design/.test(text) ? 1 : 0);
        case 'Performance':
            return cv.work.filter((w) => w.domains.includes('AI') || /ifa|demo/.test(text)).length;
        case 'History':
            return workTech(['drupal', 'php', 'dotnet']);
        case 'Insight':
            return cv.work.filter((w) => w.domains.some((d) => ['Special Education', 'Speech Therapy', 'IoT'].includes(d))).length;
        case 'Perception':
            return leadRoles;
        case 'Athletics':
            return cv.work.filter((w) => {
                const hasFrontend = w.tech.some((t) => ['react', 'react-native', 'css'].includes(t));
                const hasBackend = w.tech.some((t) => ['dotnet', 'csharp', 'python', 'php'].includes(t));
                return hasFrontend && hasBackend;
            }).length;
        case 'Survival':
            return /production|deployment/.test(text) ? 1 : 0;
        case 'Animal Handling':
            return leadRoles;
        case 'Religion':
            return cv.interests.includes('Philosophy') ? 1 : 0;
        case 'Deception':
            return 0;
        default:
            return 0;
    }
}

export function toCharacterSheet(cv: Cv): CharacterSheet {
    const artificerYears = yearsByTrack(cv.work, 'ic') + yearsByTrack(cv.work, 'intern');
    const bardYears = yearsByTrack(cv.work, 'lead');
    const wizardCount = cv.education.filter((e) => e.studyType === 'MSc').length;

    const artificerLevel = Math.max(0, Math.round(artificerYears));
    const bardLevel = Math.max(0, Math.round(bardYears));
    const wizardLevel = Math.max(0, wizardCount);

    const level = Math.min(20, Math.max(1, artificerLevel + bardLevel + wizardLevel));
    const proficiencyBonus = 2 + Math.floor((level - 1) / 4);

    const classes: ClassLevel[] = [
        { name: 'Artificer', subclass: 'Battlesmith', level: artificerLevel, hitDie: 8 },
        { name: 'Bard', subclass: 'College of Lore', level: bardLevel, hitDie: 8 },
        { name: 'Wizard', subclass: 'School of Divination', level: wizardLevel, hitDie: 6 },
    ].filter((c) => c.level > 0);

    const dice = classes.flatMap((c) => Array.from({ length: c.level }, () => c.hitDie));
    const firstDie = dice[0] ?? 8;
    const remainingDice = dice.slice(1);
    const avgDie = (d: number) => Math.ceil(d / 2) + 1;
    const conMod = abilityMod(ABILITY_SCORES.CON.score);
    const hp = firstDie + remainingDice.reduce((sum, d) => sum + avgDie(d), 0) + conMod * level;

    const diceByType = new Map<number, number>();
    for (const d of dice) diceByType.set(d, (diceByType.get(d) ?? 0) + 1);
    const hitDiceLabel = Array.from(diceByType.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([die, count]) => `${count}d${die}`)
        .join(' + ');

    const dexMod = abilityMod(ABILITY_SCORES.DEX.score);
    const leadYearsFloor = Math.floor(bardYears);
    const ac = 10 + dexMod + Math.min(5, leadYearsFloor);

    const abilities: AbilityBlockData[] = (Object.keys(ABILITY_SCORES) as AbilityName[]).map((ability) => ({
        ability,
        score: ABILITY_SCORES[ability].score,
        modifier: abilityMod(ABILITY_SCORES[ability].score),
        rationale: ABILITY_SCORES[ability].rationale,
    }));

    const CLASS_SAVES: Record<string, AbilityName[]> = {
        Artificer: ['CON', 'INT'],
        Bard: ['DEX', 'CHA'],
        Wizard: ['INT', 'WIS'],
    };
    const proficientSaves = new Set<AbilityName>();
    for (const c of classes) {
        for (const save of CLASS_SAVES[c.name] ?? []) proficientSaves.add(save);
    }
    const savingThrows: SavingThrowData[] = (Object.keys(ABILITY_SCORES) as AbilityName[]).map((ability) => {
        const proficient = proficientSaves.has(ability);
        return {
            ability,
            proficient,
            modifier: abilityMod(ABILITY_SCORES[ability].score) + (proficient ? proficiencyBonus : 0),
        };
    });

    const skillNames = Object.keys(SKILL_ABILITY) as SkillName[];
    const skills: SkillData[] = skillNames
        .map((name) => {
            const ability = SKILL_ABILITY[name];
            const evidence = skillEvidence(cv, name);
            const proficient = evidence >= 1;
            const expertise = EXPERTISE_SKILLS.includes(name);
            const base = abilityMod(ABILITY_SCORES[ability].score);
            const modifier = base + (expertise ? 2 * proficiencyBonus : proficient ? proficiencyBonus : 0);
            return { name, ability, modifier, proficient, expertise };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const wisMod = abilityMod(ABILITY_SCORES.WIS.score);
    const perceptionProficient = skills.find((s) => s.name === 'Perception')?.proficient ?? false;
    const passivePerception = 10 + wisMod + (perceptionProficient ? proficiencyBonus : 0);

    const allTech = Array.from(new Set(cv.work.flatMap((w) => w.tech)));
    const languageTech = techsByKind(allTech, 'language');
    const toolTech = techsByKind(allTech, 'tool');

    const commonTongues = cv.languages
        .map((l) => `${l.language} (${l.fluency}${l.certifications ? `, ${l.certifications.join(', ')}` : ''})`)
        .join('; ');
    const exoticTongues = languageTech.map(techLabel).join(', ');
    const toolProficiencies = toolTech.map(techLabel).join(', ');

    const monthsInCurrentRole = cv.work[0]
        ? Math.round(yearsBetween(cv.work[0].startDate, cv.work[0].endDate) * 12)
        : 0;
    const xpProgress = Math.min(1, (monthsInCurrentRole % 12) / 12);

    return {
        name: cv.basics.name,
        classes,
        level,
        proficiencyBonus,
        hitDiceLabel,
        hp,
        ac,
        armorName: 'Half Plate of Code Review (+experience)',
        initiative: dexMod,
        speed: 30,
        passivePerception,
        abilities,
        savingThrows,
        skills,
        commonTongues,
        exoticTongues,
        toolProficiencies,
        features: SHEET_FEATURES,
        feats: SHEET_FEATS,
        inventory: SHEET_INVENTORY,
        actions: SHEET_ACTIONS,
        backstory: cv.basics.summary,
        xpProgress,
    };
}
