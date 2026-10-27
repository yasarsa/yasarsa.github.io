import type { MouseEvent } from 'react';

/**
 * Click handler for in-page links (skip link, contact). The hash is not
 * pushed: the router would treat it as a navigation and ScrollRestoration
 * would snap back. Instead focus moves to the target, so keyboard and
 * screen-reader users land there too, and the page scrolls to it.
 */
export function jumpTo(id: string, before?: () => void) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        before?.();
        // Wait a frame so anything collapsing (the mobile menu) has settled.
        requestAnimationFrame(() => {
            const target = document.getElementById(id);
            if (!target) return;
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.focus({ preventScroll: true });
            target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        });
    };
}
