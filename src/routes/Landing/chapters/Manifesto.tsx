import { cv } from '../../../data/cv';
import { monthsBetween } from '../../../adapters/dates';
import { gsap, MQ, ScrollTrigger, SplitText } from '../../../lib/gsap';
import { useGsap } from '../../../hooks/useGsap';
import Marquee from '../../../components/fx/Marquee';
import styles from './Manifesto.module.css';

const years = Math.floor(monthsBetween(cv.careerStart) / 12);
const companies = new Set(cv.work.map((w) => w.company)).size;

const STATS = [
    { value: years, suffix: '+', label: 'Years shipping software' },
    { value: cv.work.length, suffix: '', label: `Roles across ${companies} companies` },
    { value: cv.education.length, suffix: '', label: 'Degrees & exchanges' },
    { value: 5, suffix: '', label: 'Realms of obsession' },
];

const INTERESTS = ['Software', 'Game Dev', 'Magic: The Gathering', 'Warhammer 40K', 'Dungeons & Dragons'];

export default function Manifesto() {
    const ref = useGsap<HTMLElement>((root) => {
        const mm = gsap.matchMedia();
        mm.add(MQ.motion, () => {
            const split = SplitText.create('[data-manifesto]', { type: 'words' });
            gsap.fromTo(
                split.words,
                { opacity: 0.12 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'none',
                    scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 50%', scrub: true },
                }
            );

            root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
                const target = Number(el.dataset.count);
                const obj = { v: 0 };
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 95%',
                    once: true,
                    onEnter: () =>
                        gsap.to(obj, {
                            v: target,
                            duration: 1.6,
                            ease: 'power3.out',
                            onUpdate: () => {
                                el.textContent = String(Math.round(obj.v));
                            },
                        }),
                });
            });

            gsap.from('[data-stat]', {
                y: 40,
                autoAlpha: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.08,
                scrollTrigger: { trigger: '[data-stats]', start: 'top 88%', once: true },
            });

            return () => split.revert();
        });
        return () => mm.revert();
    });

    return (
        <section ref={ref} className={styles.Manifesto} id="about" data-hud="00 / About" aria-labelledby="manifesto-title">
            <div className={styles.Inner}>
                <p className="eyebrow" id="manifesto-title">(About — the short version)</p>
                <p className={styles.Text} data-manifesto>
                    I'm Yaşar — a <em>software architect</em> who leads a front-end team at Vestel, shipping IoT,
                    EV-charging and AI products. After hours I trade <em>pull requests</em> for{' '}
                    <span className={styles.Warm}>Magic drafts</span>, <span className={styles.Warm}>Kill Team skirmishes</span>,{' '}
                    <span className={styles.Warm}>D&amp;D campaigns</span> and <span className={styles.Warm}>game-dev experiments</span>.
                    So this site tells my CV five ways.
                </p>

                <dl className={styles.Stats} data-stats>
                    {STATS.map((s) => (
                        <div key={s.label} className={styles.Stat} data-stat>
                            <dt className={styles.StatLabel}>{s.label}</dt>
                            <dd className={styles.StatValue}>
                                <span data-count={s.value}>{s.value}</span>
                                {s.suffix}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={styles.Marquees} aria-label="Interests">
                <Marquee items={INTERESTS} className={styles.MarqueeSolid} />
                <Marquee items={INTERESTS} direction={-1} speed={34} className={styles.MarqueeOutline} />
            </div>
        </section>
    );
}
