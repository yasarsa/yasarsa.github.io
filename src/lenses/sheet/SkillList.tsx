import type { SkillData } from '../../adapters/toCharacterSheet';
import styles from './SkillList.module.css';

interface Props {
    skills: SkillData[];
}

export default function SkillList({ skills }: Props) {
    return (
        <div className="sheetPanel">
            <h2 className="sheetPanelTitle">Skills</h2>
            <table className={styles.Table}>
                <caption className="visually-hidden">Skills and modifiers</caption>
                <thead>
                    <tr>
                        <th scope="col" className="visually-hidden">Proficiency</th>
                        <th scope="col">Skill</th>
                        <th scope="col">Ability</th>
                        <th scope="col">Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr key={skill.name}>
                            <td>
                                <span
                                    className={styles.Dot}
                                    data-state={skill.expertise ? 'expertise' : skill.proficient ? 'proficient' : 'none'}
                                    aria-label={skill.expertise ? 'expertise' : skill.proficient ? 'proficient' : 'not proficient'}
                                />
                            </td>
                            <td>{skill.name}</td>
                            <td className={styles.Ability}>{skill.ability}</td>
                            <td className={styles.Mod}>{skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
