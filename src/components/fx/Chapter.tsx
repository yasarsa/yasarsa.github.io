import type { ReactNode } from 'react';
import { gsap, MQ } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import styles from './Chapter.module.css';

interface Props {
    id: string;
    /** "01 / Software" — shown by the ScrollHud while this chapter is centred. */
    hud: string;
    /** Big faint word behind the chapter. */
    watermark?: string;
    className?: string;
    labelledBy?: string;
    children: ReactNode;
}

/**
 * A realm chapter. Its background layer starts as an inset, rounded
 * "portal" and scrubs open to full-bleed as the chapter scrolls in —
 * the realm-shift transition between chapters.
 */
export default function Chapter({ id, hud, watermark, className, labelledBy, children }: Props) {
    const ref = useGsap<HTMLElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            gsap.fromTo(
                '[data-realm-bg]',
                { clipPath: 'inset(9% 5% 0% 5% round 56px)' },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    ease: 'none',
                    scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 15%', scrub: true },
                }
            );
            if (watermark) {
                gsap.fromTo(
                    '[data-watermark]',
                    { xPercent: 12 },
                    {
                        xPercent: -28,
                        ease: 'none',
                        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );
            }
        });
        return () => mm.revert();
    });

    return (
        <section ref={ref} id={id} data-hud={hud} aria-labelledby={labelledBy} className={`${styles.Chapter} ${className ?? ''}`}>
            <div className={styles.Bg} data-realm-bg aria-hidden="true">
                {watermark && <span className={styles.Watermark} data-watermark>{watermark}</span>}
            </div>
            <div className={styles.Content}>{children}</div>
        </section>
    );
}
