import { useCallback, useEffect, useState } from 'react';

export type ThemeSetting = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

function applyTheme(setting: ThemeSetting) {
    const root = document.documentElement;
    if (setting === 'system') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', setting);
    }
}

function readStoredTheme(): ThemeSetting {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {
        // localStorage unavailable — fall through to default
    }
    return 'system';
}

export function useTheme() {
    const [theme, setThemeState] = useState<ThemeSetting>(readStoredTheme);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const setTheme = useCallback((next: ThemeSetting) => {
        setThemeState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
    }, []);

    return { theme, setTheme };
}
