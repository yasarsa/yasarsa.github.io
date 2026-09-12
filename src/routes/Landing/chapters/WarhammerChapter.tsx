import { cv } from '../../../data/cv';
import { toDossier } from '../../../adapters/toDossier';
import { gsap, MQ, ScrollTrigger } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Chapter from '../../../components/fx/Chapter';
import Picture from '../../../components/Picture/Picture';
import styles from './WarhammerChapter.module.css';

const dossier = toDossier(cv);
const { header } = dossier;

function Seal() {
    return (
        <svg className={styles.Seal} viewBox="0 0 120 190" aria-hidden="true">
            <defs>
                <radialGradient id="wax" cx="40%" cy="35%" r="70%">
                    <stop offset="0" stopColor="#c0302a" />
                    <stop offset=".6" stopColor="#8a0f0f" />
                    <stop offset="1" stopColor="#4d0606" />
                </radialGradient>
            </defs>
            <path d="M40 80 32 186l14-10 10 12 4-108z" fill="#e8dcbc" stroke="#a8946a" />
            <path d="M80 80l8 106-14-10-10 12-4-108z" fill="#ddd0ab" stroke="#a8946a" />
            <text x="41" y="130" transform="rotate(86 41 130)" fontSize="9" fill="#5a3a1a" style={{ fontFamily: 'var(--font-gothic)' }}>Purity</text>
            <text x="71" y="118" transform="rotate(94 71 118)" fontSize="9" fill="#5a3a1a" style={{ fontFamily: 'var(--font-gothic)' }}>Verified</text>
            <path
                d="M60 8c6 0 8 5 13 6s10-2 14 2 1 9 4 13 9 5 9 11-5 8-6 13 3 10-1 14-9 1-13 4-5 9-11 9-8-5-13-6-10 2-14-2-1-9-4-13-9-5-9-11 5-8 6-13-3-10 1-14 9-1 13-4 5-9 11-9z"
                fill="url(#wax)"
            />
            <circle cx="60" cy="52" r="27" fill="none" stroke="#5c0808" strokeWidth="2" opacity=".7" />
            <text x="60" y="62" textAnchor="middle" fontSize="28" fill="#f0c9a8" opacity=".85" style={{ fontFamily: 'var(--font-gothic)' }}>
                =][=
            </text>
        </svg>
    );
}

export default function WarhammerChapter() {
    const ref = useGsap<HTMLDivElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            // The file slides up and settles.
            gsap.fromTo(
                '[data-sheet]',
                { y: 160, rotate: -5 },
                { y: 0, rotate: -1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 10%', scrub: true } }
            );

            // Header "transmission" types out.
            gsap.utils.toArray<HTMLElement>('[data-type]', root).forEach((el, i) => {
                const len = el.textContent?.length ?? 10;
                gsap.fromTo(
                    el,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: len * 0.03,
                        ease: `steps(${len})`,
                        delay: i * 0.35,
                        scrollTrigger: { trigger: '[data-sheet]', start: 'top 70%', once: true },
                    }
                );
            });

            // Service record lines stamp in.
            gsap.set('[data-stamp-in]', { autoAlpha: 0, scale: 1.12, filter: 'blur(4px)' });
            ScrollTrigger.batch('[data-stamp-in]', {
                start: 'top 85%',
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power4.in', stagger: 0.16 }),
            });

            // Redaction lifts off the vox channel as it crosses the viewport.
            gsap.fromTo(
                '[data-redact]',
                { scaleX: 1 },
                { scaleX: 0, ease: 'none', scrollTrigger: { trigger: '[data-redact]', start: 'top 75%', end: 'top 45%', scrub: true } }
            );

            // Final verdict: seal drops, stamp slams, the sheet jolts.
            const verdict = gsap.timeline({ scrollTrigger: { trigger: '[data-verdict]', start: 'top 80%', once: true } });
            verdict
                .from('[data-seal]', { y: -120, rotate: -40, autoAlpha: 0, duration: 0.6, ease: 'bounce.out' })
                .from('[data-stamp]', { scale: 3.2, rotate: -35, autoAlpha: 0, duration: 0.32, ease: 'power4.in' }, '+=0.1')
                .to('[data-sheet]', { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' })
                .set('[data-sheet]', { x: 0 });
        });
        return () => mm.revert();
    });

    return (
        <Chapter id="warhammer" hud="03 / Warhammer" watermark="IMPERIUM" className={styles.Chapter} labelledBy="wh-title">
            <div ref={ref} className={styles.Wrap}>
                <div className={styles.Intro}>
                    <p className={styles.Eyebrow}>03 — Warhammer 40,000</p>
                    <p className={styles.Lede}>In the grim darkness of the far future, there is only… a very well-organised CV.</p>
                </div>

                <article className={styles.Sheet} data-sheet>
                    <div className={styles.Band}>
                        <span data-type>+++ Inquisitorial personnel dossier +++</span>
                    </div>
                    <div className={styles.MetaRow}>
                        <span data-type>File ref: {header.fileRef}</span>
                        <span className={styles.Clearance} data-type>Clearance: {header.clearance}</span>
                    </div>

                    <h2 id="wh-title" className={styles.Name}>
                        <span className={styles.NameGlyph} aria-hidden="true">=][=</span> {dossier.name}
                    </h2>

                    <div className={styles.Subject}>
                        <figure className={styles.Pict}>
                            <Picture
                                srcBase="/portrait/yasar-anil-sansak"
                                widths={[400, 800]}
                                alt={`Pict-capture of ${dossier.name}`}
                                width={400}
                                height={400}
                                sizes="200px"
                                className={styles.PictImg}
                            />
                            <figcaption>Pict-capture 01 · verified</figcaption>
                        </figure>
                        <dl className={styles.Fields}>
                            <div><dt>Designation</dt><dd>{header.designation} <small>(Software Architect &amp; Team Lead)</small></dd></div>
                            <div><dt>Homeworld</dt><dd>{header.homeworld}</dd></div>
                            <div><dt>Years of service</dt><dd>{dossier.serviceYears} standard years</dd></div>
                            <div><dt>Campaigns</dt><dd>{dossier.campaigns} deployments, 0 heresies</dd></div>
                            <div><dt>Authority</dt><dd>{header.authority}</dd></div>
                            <div>
                                <dt>Vox channel</dt>
                                <dd className={styles.Redactable}>
                                    <a href={`mailto:${dossier.email}`}>{dossier.email}</a>
                                    <span className={styles.Redaction} data-redact aria-hidden="true" />
                                </dd>
                            </div>
                            <div><dt>Vox code</dt><dd><span className={styles.Blackout}>████████████</span> <small>(clearance insufficient)</small></dd></div>
                        </dl>
                    </div>

                    <h3 className={styles.Section}>Service record</h3>
                    <ol className={styles.Record}>
                        {dossier.deployments.map((d) => (
                            <li key={d.id} className={styles.Deployment} data-stamp-in>
                                <span className={styles.Range}>{d.range}</span>
                                <div>
                                    <p className={styles.Rank}>{d.rank}</p>
                                    <p className={styles.Real}>{d.title} — {d.company}</p>
                                    <p className={styles.Note}>{d.note}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className={styles.Columns}>
                        <div>
                            <h3 className={styles.Section}>Sanctioned rites</h3>
                            <ul className={styles.Rites}>
                                {dossier.rites.map((r) => <li key={r} data-stamp-in>{r}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className={styles.Section}>Scholam records</h3>
                            <ul className={styles.Scholam}>
                                {dossier.scholam.map((s) => (
                                    <li key={s.id} data-stamp-in>
                                        <strong>{s.title}</strong>
                                        <span>{s.institution} · {s.range}</span>
                                        {s.note && <em>{s.note}</em>}
                                    </li>
                                ))}
                            </ul>
                            <h3 className={styles.Section}>Lingua</h3>
                            <ul className={styles.Lingua}>
                                {dossier.lingua.map((l) => <li key={l}>{l}</li>)}
                            </ul>
                        </div>
                    </div>

                    <footer className={styles.Verdict} data-verdict>
                        <p className={styles.Thought}>
                            <span>Thought for the day:</span> {header.thought}
                        </p>
                        <div data-seal className={styles.SealWrap}><Seal /></div>
                        <p className={styles.Stamp} data-stamp>{header.verdict}</p>
                    </footer>
                </article>
            </div>
        </Chapter>
    );
}
