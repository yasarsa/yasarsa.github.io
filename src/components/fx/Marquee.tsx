import { gsap, MQ, ScrollTrigger } from '../../lib/gsap';
import { useGsap } from '../../hooks/useGsap';
import styles from './Marquee.module.css';

interface Props {
    items: string[];
    /** 1 scrolls left, -1 scrolls right. */
    direction?: 1 | -1;
    /** Seconds for one full loop at rest. */
    speed?: number;
    className?: string;
}

/**
 * Infinite marquee whose speed and skew react to scroll velocity.
 * The content is rendered twice and translated by -50% for a seamless loop;
 * the second copy is aria-hidden.
 */
export default function Marquee({ items, direction = 1, speed = 28, className }: Props) {
    const ref = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            const track = root.querySelector<HTMLElement>('[data-track]')!;
            const loop = gsap.fromTo(
                track,
                { xPercent: direction === 1 ? 0 : -50 },
                { xPercent: direction === 1 ? -50 : 0, duration: speed, ease: 'none', repeat: -1 }
            );
            const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });
            let settle: gsap.core.Tween | null = null;

            ScrollTrigger.create({
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate(self) {
                    const v = self.getVelocity();
                    const boost = gsap.utils.clamp(-6, 6, v / 300);
                    settle?.kill();
                    loop.timeScale(1 + Math.abs(boost));
                    settle = gsap.to(loop, { timeScale: 1, duration: 0.8, ease: 'power2.out', delay: 0.05 });
                    skewTo(gsap.utils.clamp(-12, 12, -v / 250) * direction);
                },
                onLeave: () => skewTo(0),
                onLeaveBack: () => skewTo(0),
            });
        });
        return () => mm.revert();
    });

    const row = (hidden: boolean) => (
        <div className={styles.Group} aria-hidden={hidden || undefined}>
            {items.map((item, i) => (
                <span key={`${item}-${i}`} className={styles.Item}>
                    {item}
                    <span className={styles.Star} aria-hidden="true">✦</span>
                </span>
            ))}
        </div>
    );

    return (
        <div ref={ref} className={`${styles.Marquee} ${className ?? ''}`}>
            <div className={styles.Track} data-track>
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}
