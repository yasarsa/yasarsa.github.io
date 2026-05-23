import { useNavigate } from 'react-router-dom';
import CardCarousel from '../../components/CardCarousel/CardCarousel';
import { cvCards } from '../../utils/cvData';
import styles from './Home.module.css';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.Home}>
            <CardCarousel cards={cvCards} />

            <div className={styles.NavLinks}>
                <button onClick={() => navigate('/dnd')}>D&D Damage Calculator</button>
                <button onClick={() => navigate('/kt')}>Kill Team Operatives</button>
            </div>
        </div>
    )
}  