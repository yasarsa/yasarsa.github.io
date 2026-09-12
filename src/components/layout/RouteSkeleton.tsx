import styles from './RouteSkeleton.module.css';

export default function RouteSkeleton() {
    return (
        <div className={styles.RouteSkeleton} aria-hidden="true">
            <div className={styles.Bar} style={{ width: '40%' }} />
            <div className={styles.Bar} style={{ width: '70%' }} />
            <div className={styles.Bar} style={{ width: '55%' }} />
        </div>
    );
}
