import { useState } from 'react';
import type { JsonTreeApi } from '../../hooks/useJsonTree';
import styles from './JsonToolbar.module.css';

interface Props {
    tree: JsonTreeApi;
    json: unknown;
    filename: string;
}

export default function JsonToolbar({ tree, json, filename }: Props) {
    const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
    const text = JSON.stringify(json, null, 2);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyState('copied');
        } catch {
            setCopyState('error');
        }
        setTimeout(() => setCopyState('idle'), 2000);
    };

    const onDownload = () => {
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.Toolbar}>
            <button type="button" className={styles.Button} onClick={onCopy}>
                {copyState === 'copied' ? 'Copied ✓' : copyState === 'error' ? 'Copy failed' : 'Copy'}
            </button>
            <button type="button" className={styles.Button} onClick={onDownload}>Download</button>
            <button type="button" className={styles.Button} onClick={tree.expandAll}>Expand all</button>
            <button type="button" className={styles.Button} onClick={() => tree.collapseToDepth(2)}>Collapse to depth 2</button>
            <span aria-live="polite" className="visually-hidden">
                {copyState === 'copied' ? 'Copied to clipboard' : copyState === 'error' ? 'Copy failed: clipboard permission denied' : ''}
            </span>
        </div>
    );
}
