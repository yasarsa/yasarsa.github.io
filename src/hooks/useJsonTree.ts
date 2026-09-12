import { useCallback, useState } from 'react';

export function useJsonTree() {
    const [overrides, setOverrides] = useState<Map<string, boolean>>(new Map());
    const [defaultDepth, setDefaultDepth] = useState(2);

    const isExpanded = useCallback((path: string, depth: number) => {
        if (overrides.has(path)) return overrides.get(path)!;
        return depth < defaultDepth;
    }, [overrides, defaultDepth]);

    const toggle = useCallback((path: string, depth: number) => {
        setOverrides((prev) => {
            const next = new Map(prev);
            const current = next.has(path) ? next.get(path)! : depth < defaultDepth;
            next.set(path, !current);
            return next;
        });
    }, [defaultDepth]);

    const expandAll = useCallback(() => {
        setOverrides(new Map());
        setDefaultDepth(Infinity);
    }, []);

    const collapseToDepth = useCallback((depth: number) => {
        setOverrides(new Map());
        setDefaultDepth(depth);
    }, []);

    return { isExpanded, toggle, expandAll, collapseToDepth };
}

export type JsonTreeApi = ReturnType<typeof useJsonTree>;
