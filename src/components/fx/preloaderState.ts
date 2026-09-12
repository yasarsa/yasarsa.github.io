const SEEN_KEY = 'preloader-seen';

/** Whether the intro should play: first visit this session, motion allowed. */
export function shouldShowPreloader(): boolean {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
        return sessionStorage.getItem(SEEN_KEY) !== '1';
    } catch {
        return false;
    }
}

export function markPreloaderSeen() {
    try {
        sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
        // storage unavailable — the intro will simply play again next time
    }
}
