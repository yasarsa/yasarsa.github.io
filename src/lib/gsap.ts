import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Media-query conditions shared by every gsap.matchMedia() call.
 * All motion lives behind `motion`, so prefers-reduced-motion users get
 * the static, fully-visible layout the CSS already describes.
 */
export const MQ = {
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 768px)',
    mobile: '(max-width: 767px)',
    fine: '(pointer: fine)',
} as const;

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
    lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
    return lenisInstance;
}

/** Smooth-scroll to an element or y offset; falls back to native scrolling. */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
    const lenis = getLenis();
    if (lenis) {
        lenis.scrollTo(target, { immediate, duration: 1.4 });
        return;
    }
    if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
        return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}

export function lockScroll(locked: boolean) {
    const lenis = getLenis();
    if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
    }
    document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export { gsap, ScrollTrigger, SplitText };
