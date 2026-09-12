import { useEffect, useRef } from 'react';
import { gsap, MQ } from '../../lib/gsap';
import styles from './Cursor.module.css';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]';

/**
 * Blend-mode cursor: a dot that tracks 1:1 and a ring that lags behind.
 * Grows over interactive elements and shows `data-cursor="Label"` text.
 * Only mounts its listeners for fine pointers with motion allowed.
 */
export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const mql = window.matchMedia(`${MQ.fine} and ${MQ.motion}`);
        if (!mql.matches) return;
        const dot = dotRef.current!;
        const ring = ringRef.current!;
        const label = labelRef.current!;
        const root = document.documentElement;
        root.dataset.cursor = 'on';

        const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
        let visible = false;

        const onMove = (e: PointerEvent) => {
            if (!visible) {
                visible = true;
                gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
                gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
            }
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
        };

        const onOver = (e: PointerEvent) => {
            const target = (e.target as Element).closest?.(INTERACTIVE) as HTMLElement | null;
            const text = target?.dataset.cursor ?? '';
            label.textContent = text;
            ring.dataset.state = target ? (text ? 'label' : 'hover') : '';
        };

        const onLeave = () => {
            visible = false;
            gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
        };

        const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
        const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(3)' });

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onOver, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);

        return () => {
            delete root.dataset.cursor;
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onOver);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
        };
    }, []);

    return (
        <div className={styles.Cursor} aria-hidden="true">
            <div ref={ringRef} className={styles.Ring}>
                <span ref={labelRef} className={styles.Label} />
            </div>
            <div ref={dotRef} className={styles.Dot} />
        </div>
    );
}
