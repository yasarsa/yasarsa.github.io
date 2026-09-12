import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, setLenis } from '../lib/gsap';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * One Lenis instance for the whole site shell, driven by the GSAP ticker
 * so ScrollTrigger and Lenis agree on every frame. Touch scrolling stays
 * native (Lenis' default), which is what mobile users expect.
 */
export function useSmoothScroll() {
    const reduced = usePrefersReducedMotion();

    useEffect(() => {
        if (reduced) return;

        const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: false });
        lenis.on('scroll', ScrollTrigger.update);

        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        setLenis(lenis);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            setLenis(null);
        };
    }, [reduced]);
}
