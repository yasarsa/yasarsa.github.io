import type { CharacterClasses, DamageTypes, Feats } from "./contants";

export interface IAttack {
    name: string;
    damageDieCount: number;
    damageDieType: number;
    damageBonus: number;
    attackBonus: number;
    critRange: number;
    critMultiplier: number;
    selectedFeats?: FeatsType[];
    selectedFeatures?: ICharacterClassFeature[];
}

export interface ICharacter {
    id: number;
    name: string;
    level: number;
    selectedFeatures: ICharacterClassFeature[];
    characterClass: ICharacterClassDefinition[];
    attacks?: IAttack[]
    feats?: FeatsType[]
}

export type ItemType = "attack" | "character" | undefined

export type CharacterClassType = (typeof CharacterClasses)[keyof typeof CharacterClasses]

export type DamageType = (typeof DamageTypes)[keyof typeof DamageTypes]

export type FeatsType = (typeof Feats)[keyof typeof Feats]

export interface ICharacterClassFeature {
    unlockedLevel: number;
    name: string;
    extraDamageDieCount?: number;
    extraDamageDieType?: number;
    extraDamageBonus?: number;
    extraDamageType?: DamageType;
}

export interface ICharacterClass {
    className: CharacterClassType;
    features: ICharacterClassFeature[];
}

export interface IData {
    barbarian: ICharacterClass;
    bard: ICharacterClass;
    cleric: ICharacterClass;
    druid: ICharacterClass;
    fighter: ICharacterClass;
    monk: ICharacterClass;
    paladin: ICharacterClass;
    ranger: ICharacterClass;
    rogue: ICharacterClass;
    sorcerer: ICharacterClass;
    warlock: ICharacterClass;
    wizard: ICharacterClass;
    artificer: ICharacterClass;
}

export interface ICharacterClassDefinition {
    characterClass: CharacterClassType;
    level: number;
}