import { Feats as FeatsEnum } from '../../utils/constants';
import type { FeatsType } from '../../utils/types';
import styles from './Feats.module.css';

interface Props {
    selectedFeats: FeatsType[],
    setSelectedFeats?: (feats: FeatsType[]) => void
}

export default function Feats({ selectedFeats, setSelectedFeats }: Props) {
    const handleAddFeat = () => {
        if (setSelectedFeats) {
            setSelectedFeats([...selectedFeats, FeatsEnum[0]]);
        }
    };

    const handleRemoveFeat = (index: number) => {
        if (setSelectedFeats) {
            setSelectedFeats(selectedFeats.filter((_, i) => i !== index));
        }
    };

    const handleFeatChange = (index: number, newFeat: FeatsType) => {
        if (setSelectedFeats) {
            const updatedFeats = [...selectedFeats];
            updatedFeats[index] = newFeat;
            setSelectedFeats(updatedFeats);
        }
    };

    return (
        <div className={styles.Feats}>
            <div className={styles.FeatsTitle}>Feats:</div>
            {selectedFeats.map((feat, index) => (
                <div key={index} className={styles.FeatRow}>
                    <select
                        value={feat as string}
                        onChange={(e) => handleFeatChange(index, e.target.value as FeatsType)}
                    >
                        {FeatsEnum.map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                    <button
                        className={styles.RemoveFeatButton}
                        onClick={() => handleRemoveFeat(index)}
                    >
                        Remove Feat
                    </button>
                </div>
            ))}
            <button
                className={styles.AddFeatButton}
                onClick={handleAddFeat}
            >
                Add New Feat
            </button>
        </div>
    )
}