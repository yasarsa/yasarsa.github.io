import type { ICharacterClassFeature, IData } from "./types";

export const CharacterClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"] as const;

export const DamageTypes = ["Slashing", "Piercing", "Bludgeoning", "Fire", "Cold", "Lightning", "Thunder", "Acid", "Poison", "Psychic", "Radiant", "Necrotic", "Force"] as const;

export const Feats = ["Great Weapon Master", "Great Weapon Fighting", "Savage Attacker", "Elemental Adept"] as const;

export const RougeClassFeatures: ICharacterClassFeature[] = [
    { name: "Sneak Attack", unlockedLevel: 1, extraDamageDieCount: 1, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 3, extraDamageDieCount: 2, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 5, extraDamageDieCount: 3, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 7, extraDamageDieCount: 4, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 9, extraDamageDieCount: 5, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 11, extraDamageDieCount: 6, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 13, extraDamageDieCount: 7, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 15, extraDamageDieCount: 8, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 17, extraDamageDieCount: 9, extraDamageDieType: 6 },
    { name: "Sneak Attack", unlockedLevel: 19, extraDamageDieCount: 10, extraDamageDieType: 6 },
]

export const RangerClassFeatures: ICharacterClassFeature[] = [
    { name: "Dreadful Strikes", unlockedLevel: 3, extraDamageDieCount: 1, extraDamageDieType: 4, extraDamageType: "Psychic" },
    { name: "Dreadful Strikes", unlockedLevel: 11, extraDamageDieCount: 1, extraDamageDieType: 6, extraDamageType: "Psychic" },
]

export const data: IData = {
    rogue: {
        className: "Rogue",
        features: RougeClassFeatures,
    },
    ranger: {
        className: "Ranger",
        features: RangerClassFeatures,
    },
    barbarian: {
        className: "Barbarian",
        features: [],
    },
    bard: {
        className: "Bard",
        features: [],
    },
    cleric: {
        className: "Cleric",
        features: [],
    },
    druid: {
        className: "Druid",
        features: [],
    },
    fighter: {
        className: "Fighter",
        features: [],
    },
    monk: {
        className: "Monk",
        features: [],
    },
    paladin: {
        className: "Paladin",
        features: [],
    },
    sorcerer: {
        className: "Sorcerer",
        features: [],
    },
    warlock: {
        className: "Warlock",
        features: [],
    },
    wizard: {
        className: "Wizard",
        features: [],
    },
    artificer: {
        className: "Artificer",
        features: [],
    },
}

export const DAMAGE_TYPE_COLORS = {
    Acid: '#32CD32',      // Lime green
    Cold: '#00FFFF',      // Cyan
    Fire: '#FF4500',      // Red-orange
    Force: '#9370DB',     // Medium purple
    Lightning: '#FFD700',  // Gold
    Necrotic: '#800080',  // Purple
    Poison: '#008000',    // Green
    Psychic: '#FF69B4',   // Hot pink
    Radiant: '#FFFF00',   // Yellow
    Thunder: '#4169E1',   // Royal blue
    // Default color for physical damage types
    Slashing: '#A0522D',  // Brown
    Piercing: '#A0522D',  // Brown
    Bludgeoning: '#A0522D' // Brown
} as const;