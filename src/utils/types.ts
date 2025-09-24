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