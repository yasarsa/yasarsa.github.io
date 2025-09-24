import type { IAttack } from '../../utils/types';
import Attack from '../Attack/Attack';
import styles from './DND.module.css';

export default function DND() {


    const data: { attacks: IAttack[] } = {
        attacks: [
            {
                name: 'Vicious Greatsword',
                damageDieCount: 4,
                damageDieType: 6,
                damageBonus: 5,
                attackBonus: 10,
                critRange: 19,
                isSavageAttacker: true,
                isGreatWeaponFighting: true,
                isGreatWeaponMaster: true,
                proficiencyBonus: 5,
            },
            {
                name: 'Returning Handaxe',
                damageDieCount: 1,
                damageDieType: 6,
                damageBonus: 6,
                attackBonus: 11,
                critRange: 20,
                isSavageAttacker: true,
                isGreatWeaponFighting: false,
                isGreatWeaponMaster: false,
                proficiencyBonus: 5,
            }
        ]
    }


    return (
        <div className={styles.DND}>
            {data.attacks.map((attack, index) => (
                <Attack key={index} name={attack.name} attack={attack} />
            ))}

        </div>
    )
}