import { useEffect, useState } from 'react';
import { cv } from '../../data/cv';
import Keycap from '../Keycap/Keycap';
import styles from './SiteFooter.module.css';

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_LABEL: Record<CopyState, string> = {
    idle: 'copy',
    copied: 'copied',
    failed: 'failed',
};

export default function SiteFooter() {
    const year = new Date().getFullYear();
    const [copyState, setCopyState] = useState<CopyState>('idle');

    useEffect(() => {
        if (copyState === 'idle') return;
        const timer = setTimeout(() => setCopyState('idle'), 2000);
        return () => clearTimeout(timer);
    }, [copyState]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(cv.basics.email);
            setCopyState('copied');
        } catch {
            setCopyState('failed');
        }
    };

    return (
        <footer className={styles.SiteFooter} data-site-footer id="contact" tabIndex={-1} aria-label="Contact">
            <div className={styles.Inner}>
                <p className="label">
                    <span className={styles.Prompt} aria-hidden="true">&gt;</span> contact
                </p>
                <h2 className={styles.Lead}>Want to build something, or talk about games?</h2>

                <div className={styles.EmailRow}>
                    <a href={`mailto:${cv.basics.email}`} className={styles.Email}>
                        {cv.basics.email}
                        <span className="cursor" aria-hidden="true" />
                    </a>
                    <button type="button" className={styles.Copy} data-state={copyState} onClick={copyEmail}>
                        {COPY_LABEL[copyState]}
                        {copyState === 'idle' && <span className="visually-hidden"> email address</span>}
                    </button>
                    <span role="status" className="visually-hidden">
                        {copyState === 'copied' && 'Email address copied'}
                        {copyState === 'failed' && 'Could not copy the email address'}
                    </span>
                </div>

                <div className={styles.Actions}>
                    {cv.basics.profiles.map((p) => (
                        <Keycap key={p.network} keyLabel={p.network[0]} href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.network}<span className="visually-hidden"> (opens in a new tab)</span>
                        </Keycap>
                    ))}
                    <Keycap keyLabel="J" href="/cv.json" download>
                        cv.json<span className="visually-hidden"> (download the CV as JSON)</span>
                    </Keycap>
                </div>

                <p className={styles.Meta}>
                    © {year} <span lang="tr">{cv.basics.name}</span>.
                </p>
            </div>
        </footer>
    );
}
