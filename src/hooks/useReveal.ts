import { useEffect, useRef } from 'react';

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
    if (!sharedObserver) {
        sharedObserver = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-revealed', 'true');
                        sharedObserver?.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
        );
    }
    return sharedObserver;
}

export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = getObserver();
        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    return ref;
}
