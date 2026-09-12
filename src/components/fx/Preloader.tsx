import { useLayoutEffect, useRef } from 'react';
import { gsap, lockScroll } from '../../lib/gsap';
import D20 from './D20';
import { markPreloaderSeen } from './preloaderState';
import styles from './Preloader.module.css';

interface Props {
    onReveal: () => void;
    onDone: () => void;
}

/** "Rolling for initiative…" — a d20 tumbles to a natural 20, then wipes away. */
export default function Preloader({ onReveal, onDone }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const root = ref.current!;
        const count = root.querySelector<HTMLElement>('[data-count]')!;
        const counter = { v: 1 };
        lockScroll(true);
        markPreloaderSeen();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    lockScroll(false);
                    onDone();
                },
            });
            tl.from('[data-die]', { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)' })
                .to('[data-die]', { rotate: 1080, duration: 1.5, ease: 'power3.inOut' }, 0.1)
                .to(counter, {
                    v: 20,
                    duration: 1.5,
                    ease: 'power3.inOut',
                    onUpdate: () => {
                        count.textContent = String(Math.round(counter.v)).padStart(2, '0');
                    },
                }, 0.1)
                .to('[data-status]', { yPercent: -100, duration: 0.4, ease: 'expo.inOut' }, 1.45)
                .to('[data-die]', { scale: 1.25, color: 'var(--ember)', duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 1 }, 1.55)
                .add(onReveal, 2.0)
                .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, 2.0);
        }, root);

        return () => {
            ctx.revert();
            lockScroll(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={ref} className={styles.Preloader} role="status" aria-label="Loading">
            <div className={styles.Die} data-die>
                <D20 face="" strokeWidth={1.5} />
            </div>
            <div className={styles.Count}>
                <span data-count>01</span>
                <span className={styles.Of}>/20</span>
            </div>
            <div className={styles.StatusMask}>
                <div className={styles.Status} data-status>
                    <span>Rolling for initiative…</span>
                    <span className={styles.Nat}>Natural 20 — critical success</span>
                </div>
            </div>
        </div>
    );
}
