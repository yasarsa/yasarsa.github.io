import { useLayoutEffect, useRef, type DependencyList } from 'react';
import { gsap } from '../lib/gsap';

type Setup<T> = (root: T) => void | (() => void);

/**
 * Runs `setup` inside a gsap.context() scoped to the returned ref, so
 * string selectors only match descendants and every tween, SplitText and
 * ScrollTrigger created inside is reverted on unmount (StrictMode-safe).
 */
export function useGsap<T extends HTMLElement>(setup: Setup<T>, deps: DependencyList = []) {
    const ref = useRef<T | null>(null);

    useLayoutEffect(() => {
        const root = ref.current;
        if (!root) return;
        let cleanup: void | (() => void);
        const ctx = gsap.context(() => {
            cleanup = setup(root);
        }, root);
        return () => {
            cleanup?.();
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ref;
}
