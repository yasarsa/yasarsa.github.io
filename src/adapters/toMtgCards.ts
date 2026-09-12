import type { Cv, CvEntry, EntryKey } from '../data/cv.types';
import { MTG_META, type MtgArt, type MtgRarity } from '../data/mtgMeta';
import { techLabel } from '../data/tech';
import { formatRange, yearsBetween } from './dates';

export interface MtgCard {
    key: EntryKey;
    name: string;
    typeLine: string;
    footerLine: string;
    summary: string;
    rulesText: string[];
    techLine: string;
    flavorText?: string;
    power?: number;
    toughness?: number;
    rarity: MtgRarity;
    art: MtgArt;
    artistCredit?: string;
    facet: 'person' | 'experience' | 'education';
}

function entryKey(entry: CvEntry): EntryKey {
    return entry.kind === 'work' ? `work:${entry.id}` : `education:${entry.id}`;
}

function deriveRarity(entry: CvEntry): MtgRarity {
    if (entry.kind === 'work') {
        if (entry.track === 'lead') return 'rare';
        if (entry.track === 'ic') return 'uncommon';
        return 'common';
    }
    return entry.studyType === 'MSc' ? 'rare' : 'common';
}

function buildCard(key: EntryKey, entry: CvEntry | null): MtgCard {
    const meta = MTG_META[key];

    if (!entry) {
        // person card
        return {
            key,
            name: 'Yaşar Anıl Sansak',
            typeLine: `${(meta.supertypes ?? []).join(' ')} ${meta.cardType} — ${meta.creatureSubtype}`.trim(),
            footerLine: 'Software Architect & Team Lead',
            summary: 'Software Architect & Team Lead with extensive front-end experience.',
            rulesText: [
                'Software Architect & Team Lead with extensive front-end experience.',
                'Passionate about elegant UIs, mentoring, and exploring new technologies.',
            ],
            techLine: 'React • TypeScript • AWS • Team Leadership',
            flavorText: meta.flavorText,
            power: meta.ptOverride?.power,
            toughness: meta.ptOverride?.toughness,
            rarity: 'mythic',
            art: meta.art,
            artistCredit: meta.artistCredit,
            facet: 'person',
        };
    }

    const years = Math.round(yearsBetween(entry.startDate, entry.endDate));
    const rarity = deriveRarity(entry);

    if (entry.kind === 'work') {
        const location = entry.company;
        const typeLine = `${(meta.supertypes ?? []).join(' ')} ${meta.cardType} — ${location}`.trim();
        const power = years + (entry.track === 'lead' ? 2 : 0);
        const toughness = entry.tech.length;
        return {
            key,
            name: entry.title,
            typeLine,
            footerLine: `${formatRange(entry.startDate, entry.endDate)} • ${entry.location}`,
            summary: entry.summary,
            rulesText: entry.highlights,
            techLine: entry.tech.map(techLabel).join(' • '),
            flavorText: meta.flavorText,
            power: meta.cardType === 'Creature' ? power : undefined,
            toughness: meta.cardType === 'Creature' ? toughness : undefined,
            rarity,
            art: meta.art,
            artistCredit: meta.artistCredit,
            facet: 'experience',
        };
    }

    const typeLine = `${meta.cardType} — ${entry.institution}`;
    return {
        key,
        name: `${entry.studyType}. ${entry.area}`,
        typeLine,
        footerLine: `${formatRange(entry.startDate, entry.endDate)} • ${entry.location}`,
        summary: entry.thesis?.title ?? (entry.researchAreas ?? []).join(' • ') ?? entry.highlights[0] ?? '',
        rulesText: entry.highlights,
        techLine: entry.score
            ? `CGPA: ${entry.score.gpa.toFixed(2)} / ${entry.score.scale.toFixed(2)}`
            : (entry.researchAreas ?? []).join(' • '),
        flavorText: meta.flavorText,
        rarity,
        art: meta.art,
        artistCredit: meta.artistCredit,
        facet: 'education',
    };
}

export function toMtgCards(cv: Cv): MtgCard[] {
    const personCard = buildCard('person', null);
    const workCards = cv.work.map((entry) => buildCard(entryKey(entry), entry));
    const educationCards = cv.education.map((entry) => buildCard(entryKey(entry), entry));
    return [personCard, ...workCards, ...educationCards];
}
