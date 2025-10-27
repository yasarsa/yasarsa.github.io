import type { CharacterClasses, DamageTypes, Feats } from "./constants";

export interface IDamage {
    damageDieCount: number;
    damageDieType: number;
    damageBonus: number;
    damageType: DamageType;
}

export interface IAttack {
    name: string;
    attackBonus: number;
    critRange: number;
    critMultiplier: number;
    selectedFeats?: FeatsType[];
    selectedFeatures?: ICharacterClassFeature[];
    damages: IDamage[];
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

export type DamageType = typeof DamageTypes[number];

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

export type KTWeaponType = "melee" | "ranged";

export interface IKTWeapon {
    name: string;
    type: KTWeaponType;
    atk: number;
    hit: number;
    normalDmg: number;
    critDmg: number;
    wr: string[];
}

export interface IKTOperatorAbility {
    name: string;
    description: string;
}

export interface IKTOperator {
    name: string;
    imgSrc?: string;
    apl: number;
    move: number;
    save: number;
    wounds: number;
    weapons: IKTWeapon[];
    abilities?: IKTOperatorAbility[];
}