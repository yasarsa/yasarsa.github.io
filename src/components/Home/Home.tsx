import MTGCard from '../MTGCard/MTGCard';
import styles from './Home.module.css';

export default function Home() {

    const handleClick = () => {
        window.location.href = '/dnd';
    }

    return (
        <div className={styles.Home}>
            <MTGCard description='desc' image={""} name='Yaşar Anıl Sansak' skills={["skills1", "skiills2"]} type='Legendary Creature - Frontend Developer' flavorText='flavor' manaCost='manacost' power='power' toughness='toughness' />

            <button onClick={handleClick}>Go to DND Damage Calculator</button>
        </div>
    )
}  