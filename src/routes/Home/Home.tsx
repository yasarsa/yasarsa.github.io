import { useNavigate } from 'react-router-dom';
import MTGCard from '../../components/MTGCard/MTGCard';
import styles from './Home.module.css';

export default function Home() {
    const navigate = useNavigate();

    const handleDNDClick = () => {
        navigate('/dnd');
    }

    const handleKTClick = () => {
        navigate('/kt');
    }

    return (
        <div className={styles.Home}>
            <MTGCard description='desc' image={""} name='Yaşar Anıl Sansak' skills={["skills1", "skiills2"]} type='Legendary Creature - Frontend Developer' flavorText='flavor' manaCost='manacost' power='power' toughness='toughness' />

            <button onClick={handleDNDClick}>Go to DND Damage Calculator</button>
            <button onClick={handleKTClick}>Go to KT Page</button>
        </div>
    )
}  