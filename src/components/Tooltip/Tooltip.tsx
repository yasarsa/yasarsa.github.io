import { useRef, useState } from 'react';
import styles from './Tooltip.module.css';

interface Props {
    content: string;
    children: React.ReactNode;
}

export default function Tooltip({ content, children }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    return (
        <div
            className={styles.TooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.Content}>
                {children}
            </div>
            {isVisible && (
                <div className={styles.Tooltip}>
                    {content}
                </div>
            )}
        </div>
    );
}