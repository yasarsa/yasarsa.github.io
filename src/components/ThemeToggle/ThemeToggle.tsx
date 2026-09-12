import { useTheme, type ThemeSetting } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const OPTIONS: { value: ThemeSetting; label: string; icon: string }[] = [
    { value: 'system', label: 'System theme', icon: '◐' },
    { value: 'light', label: 'Light theme', icon: '☀' },
    { value: 'dark', label: 'Dark theme', icon: '☾' },
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.ThemeToggle} role="group" aria-label="Theme">
            {OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    className={`${styles.Option} ${theme === opt.value ? styles.Active : ''}`}
                    aria-pressed={theme === opt.value}
                    aria-label={opt.label}
                    title={opt.label}
                    onClick={() => setTheme(opt.value)}
                >
                    <span aria-hidden="true">{opt.icon}</span>
                </button>
            ))}
        </div>
    );
}
