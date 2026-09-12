import type { TechId } from '../../data/cv.types';
import { techLabel } from '../../data/tech';
import styles from './TechTag.module.css';

interface Props {
    id: TechId;
}

export default function TechTag({ id }: Props) {
    return <span className={styles.TechTag}>{techLabel(id)}</span>;
}
