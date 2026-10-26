import { cv } from '../../data/cv';
import { toJsonResume } from '../../adapters/toJsonResume';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useJsonTree } from '../../hooks/useJsonTree';
import JsonToolbar from './JsonToolbar';
import JsonNode from './JsonNode';
import styles from './JsonLens.module.css';
import './jsonIsland.css';

const resume = toJsonResume(cv);

export default function JsonLens() {
    useDocumentTitle('CV | JSON Resume | Yaşar Anıl Sansak', 'The CV as machine-readable JSON, following the open JSON Resume schema.');
    const tree = useJsonTree();

    return (
        <div className={`${styles.JsonLens} jsonIsland`}>
            <header className={styles.Header}>
                <h1 className={styles.Title}>JSON Resume</h1>
                <p className={styles.Subtitle}>
                    The same CV, serialized to the open{' '}
                    <a href="https://jsonresume.org" target="_blank" rel="noopener noreferrer">
                        JSON Resume
                        <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>{' '}
                    schema. Also served statically at{' '}
                    <a href="/cv.json" download>/cv.json</a>. Phone number is intentionally omitted from this machine-readable copy.
                </p>
            </header>

            <JsonToolbar tree={tree} json={resume} filename="yasar-anil-sansak.resume.json" />

            <div className={styles.Viewer} role="tree" aria-label="CV JSON tree">
                <JsonNode value={resume} depth={0} path="$" isLast tree={tree} />
            </div>
        </div>
    );
}
