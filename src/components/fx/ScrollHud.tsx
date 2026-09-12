import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import styles from './ScrollHud.module.css';

/**
 * Top progress rail + a chapter readout ("03 / WARHAMMER") driven by
 * every `[data-hud]` section on the page.
 */
export default function ScrollHud() {
    const barRef = useRef<HTMLDivElement>(null);
    const [label, setLabel] = useState('');

    useEffect(() => {
        const bar = barRef.current!;
        const setScale = gsap.quickSetter(bar, 'scaleX');
        const triggers: ScrollTrigger[] = [];

        triggers.push(
            ScrollTrigger.create({
                start: 0,
                end: 'max',
                onUpdate: (self) => setScale(self.progress),
            })
        );

        // Wait a frame so chapter pins exist before measuring.
        const id = requestAnimationFrame(() => {
            document.querySelectorAll<HTMLElement>('[data-hud]').forEach((section) => {
                triggers.push(
                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        onToggle: (self) => {
                            if (self.isActive) setLabel(section.dataset.hud ?? '');
                        },
                    })
                );
            });
        });

        return () => {
            cancelAnimationFrame(id);
            triggers.forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className={styles.Hud} aria-hidden="true">
            <div ref={barRef} className={styles.Bar} />
            <div className={styles.Label}>
                <span className={styles.Dot} />
                <span key={label} className={styles.LabelText}>{label || 'Start'}</span>
            </div>
        </div>
    );
}
