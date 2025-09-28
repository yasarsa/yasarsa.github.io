import type { CharacterClasses } from "./contants";

export interface IAttack {
    name: string;
    damageDieCount: number;
    damageDieType: number;
    damageBonus: number;
    attackBonus: number;
    critRange: number;
    critMultiplier: number;
    isSavageAttacker: boolean;
    isGreatWeaponFighting: boolean;
    isGreatWeaponMaster: boolean;
    proficiencyBonus: number;
}

export interface ICharacter {
    id: number;
    name: string;
    level: number;
    characterClass: CharacterClassType;
    attacks?: IAttack[]
}

export type ItemType = "attack" | "character" | undefined

export type CharacterClassType = (typeof CharacterClasses)[keyof typeof CharacterClasses]