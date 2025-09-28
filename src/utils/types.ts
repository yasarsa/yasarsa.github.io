export interface IAttack {
    name: string;
    damageDieCount: number;
    damageDieType: number;
    damageBonus: number;
    attackBonus: number;
    critRange: number;
    isSavageAttacker: boolean;
    isGreatWeaponFighting: boolean;
    isGreatWeaponMaster: boolean;
    proficiencyBonus: number;
}

export interface ICharacter {
    id: number;
    name: string;
    level: number;
    attacks?: IAttack[]
}

export type ItemType = "attack" | "character" | undefined