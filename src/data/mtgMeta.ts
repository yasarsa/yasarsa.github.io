import type { EntryKey } from './cv.types';

export type MtgCardType = 'Creature' | 'Enchantment' | 'Sorcery' | 'Instant' | 'Artifact' | 'Land';
export type MtgRarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export type MtgArt =
    | { kind: 'gradient'; value: string }
    | { kind: 'image'; src: string; alt: string };

export interface MtgMeta {
    cardName?: string;
    supertypes?: ('Legendary' | 'Token')[];
    cardType: MtgCardType;
    creatureSubtype?: string;
    flavorText?: string;
    art: MtgArt;
    ptOverride?: { power: number; toughness: number };
    artistCredit?: string;
}

export const MTG_META: Record<EntryKey, MtgMeta> = {
    person: {
        supertypes: ['Legendary'],
        cardType: 'Creature',
        creatureSubtype: 'Frontend Developer',
        flavorText: '"The code is strong with this one."',
        art: { kind: 'image', src: '/portrait/yasar-anil-sansak-800.webp', alt: 'Yaşar Anıl Sansak' },
        ptOverride: { power: 4, toughness: 4 },
        artistCredit: 'Self-portrait, digitally remastered',
    },

    'work:vestel-architect': {
        cardType: 'Enchantment',
        flavorText: '"Architecture is not just about code — it\'s about vision."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
    },
    'work:vestel-senior': {
        cardType: 'Creature',
        creatureSubtype: 'Full-Stack Developer',
        flavorText: '"Full-stack means seeing the whole battlefield."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)' },
    },
    'work:4a-labs': {
        cardType: 'Creature',
        creatureSubtype: 'Frontend Developer',
        flavorText: '"Speed and precision — the hallmarks of a great front-end."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)' },
    },
    'work:otsimo': {
        cardType: 'Creature',
        creatureSubtype: 'Frontend Developer',
        flavorText: '"Technology that makes a difference in people\'s lives."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    },
    'work:bidolubaski': {
        cardType: 'Creature',
        creatureSubtype: 'Junior Developer',
        flavorText: '"Every journey begins with a single line of code."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)' },
    },
    'work:vestel-intern': {
        supertypes: ['Token'],
        cardType: 'Creature',
        creatureSubtype: 'R&D Intern',
        flavorText: '"Even a token can change the game."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    },

    'education:msc-ted': {
        cardType: 'Sorcery',
        flavorText: '"Knowledge is the most powerful spell."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #000428 0%, #004e92 100%)' },
    },
    'education:bsc-iue': {
        cardType: 'Sorcery',
        flavorText: '"The foundation upon which all else is built."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
    },
    'education:erasmus-riga': {
        cardType: 'Instant',
        flavorText: '"Adventure abroad, wisdom in tow."',
        art: { kind: 'gradient', value: 'linear-gradient(135deg, #614385 0%, #516395 100%)' },
    },
};
