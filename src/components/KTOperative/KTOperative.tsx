import bulletsIcon from "../../assets/bullets.svg";
import swordIcon from "../../assets/sword.svg";
import type { IKTOperator } from "../../utils/types";
import styles from "./KTOperative.module.css";

interface Props {
    operator: IKTOperator
}
export default function KTOperative({ operator }: Props) {
    return (
        <div className={styles.KTOperative}>
            <div className={styles.TitleContainer}>
                <h2>{operator.name}</h2>
            </div>
            <div className={styles.StatsContainer}>
                <p>APL: {operator.apl}</p>
                <p>Move: {operator.move}</p>
                <p>Save: {operator.save}</p>
                <p>Wounds: {operator.wounds}</p>
            </div>
            <div className={styles.WeaponsContainer}>
                <table className={styles.WeaponsTable}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>ATK</th>
                            <th>HIT</th>
                            <th>DMG</th>
                            <th>WR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operator.weapons.map((weapon) => (
                            <tr key={weapon.name}>
                                <td><img src={weapon.type === "melee" ? swordIcon : bulletsIcon} /></td>
                                <td>{weapon.name}</td>
                                <td>{weapon.atk}</td>
                                <td>{weapon.hit}</td>
                                <td>{weapon.normalDmg}/{weapon.critDmg}</td>
                                <td>{weapon.wr.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className={styles.AbilitiesContainer}>
                {operator.abilities?.map((ability) => (
                    <p key={ability.name}>
                        <strong>{ability.name}:</strong> <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                    </p>
                ))}
            </div>
        </div>
    )
}