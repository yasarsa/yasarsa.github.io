import type { JsonTreeApi } from '../../hooks/useJsonTree';
import styles from './JsonNode.module.css';

interface Props {
    value: unknown;
    keyName?: string;
    depth: number;
    path: string;
    isLast: boolean;
    tree: JsonTreeApi;
}

function valueClassName(value: unknown): string {
    if (value === null) return styles.Null;
    switch (typeof value) {
        case 'string': return styles.String;
        case 'number': return styles.Number;
        case 'boolean': return styles.Bool;
        default: return '';
    }
}

function renderPrimitive(value: unknown): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
}

export default function JsonNode({ value, keyName, depth, path, isLast, tree }: Props) {
    const comma = isLast ? '' : ',';
    const keyPrefix = keyName !== undefined ? <span className={styles.Key}>"{keyName}"</span> : null;

    const isArray = Array.isArray(value);
    const isObject = !isArray && value !== null && typeof value === 'object';

    if (isArray || isObject) {
        const entries: [string, unknown][] = isArray
            ? (value as unknown[]).map((v, i) => [String(i), v])
            : Object.entries(value as Record<string, unknown>);
        const expanded = tree.isExpanded(path, depth);
        const openBracket = isArray ? '[' : '{';
        const closeBracket = isArray ? ']' : '}';

        if (entries.length === 0) {
            return (
                <div className={styles.Line} style={{ paddingLeft: `calc(3.5em + ${depth * 1.25}em)` }}>
                    {keyPrefix}{keyPrefix && ': '}{openBracket}{closeBracket}{comma}
                </div>
            );
        }

        return (
            <>
                <div className={styles.Line} style={{ paddingLeft: `calc(3.5em + ${depth * 1.25}em)` }}>
                    <button
                        type="button"
                        className={styles.Toggle}
                        onClick={() => tree.toggle(path, depth)}
                        aria-expanded={expanded}
                        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${keyName ?? (depth === 0 ? 'resume' : `item ${Number(path.slice(path.lastIndexOf('.') + 1)) + 1}`)}`}
                    >
                        {expanded ? '▾' : '▸'}
                    </button>
                    {keyPrefix}{keyPrefix && ': '}{openBracket}
                    {!expanded && (
                        <span className={styles.Collapsed}>
                            {' '}…{entries.length} {isArray ? 'items' : 'keys'}{' '}
                        </span>
                    )}
                    {!expanded && closeBracket}{!expanded && comma}
                </div>
                {expanded && entries.map(([k, v], i) => (
                    <JsonNode
                        key={k}
                        value={v}
                        keyName={isArray ? undefined : k}
                        depth={depth + 1}
                        path={`${path}.${k}`}
                        isLast={i === entries.length - 1}
                        tree={tree}
                    />
                ))}
                {expanded && (
                    <div className={styles.Line} style={{ paddingLeft: `calc(3.5em + ${depth * 1.25}em)` }}>
                        {closeBracket}{comma}
                    </div>
                )}
            </>
        );
    }

    return (
        <div className={styles.Line} style={{ paddingLeft: `calc(3.5em + ${depth * 1.25}em)` }}>
            {keyPrefix}{keyPrefix && ': '}
            <span className={valueClassName(value)}>{renderPrimitive(value)}</span>{comma}
        </div>
    );
}
