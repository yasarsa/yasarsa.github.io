import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { gsap, MQ } from '../../lib/gsap';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    /** 0..1 — how far the button follows the pointer. */
    strength?: number;
}

/** An anchor that leans toward the pointer while hovered (fine pointers only). */
export default function MagneticButton({ children, strength = 0.35, ...rest }: Props) {
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !window.matchMedia(`${MQ.fine} and ${MQ.motion}`).matches) return;
        const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            xTo(dx * strength);
            yTo(dy * strength);
            if (inner) gsap.to(inner, { x: dx * strength * 0.4, y: dy * strength * 0.4, duration: 0.6, ease: 'power3' });
        };
        const onLeave = () => {
            xTo(0);
            yTo(0);
            if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
        };

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, [strength]);

    return (
        <a ref={ref} {...rest}>
            <span data-magnetic-inner style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
                {children}
            </span>
        </a>
    );
}
