import { useEffect, useState } from 'react';
import { cv } from '../../../data/cv';
import SplitReveal from '../../../components/fx/SplitReveal';
import MagneticButton from '../../../components/fx/MagneticButton';
import styles from './Contact.module.css';

const timeFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit' });

function useIzmirTime() {
    const [time, setTime] = useState(() => timeFormat.format(new Date()));
    useEffect(() => {
        const id = window.setInterval(() => setTime(timeFormat.format(new Date())), 15_000);
        return () => window.clearInterval(id);
    }, []);
    return time;
}

export default function Contact() {
    const time = useIzmirTime();

    return (
        <section className={styles.Contact} id="contact" data-hud="07 / Contact" aria-labelledby="contact-title">
            <div className={styles.Glow} aria-hidden="true" />
            <p className="eyebrow">(Your turn)</p>
            <SplitReveal as="h2" id="contact-title" className={styles.Title} by="chars">
                Roll for initiative.
            </SplitReveal>
            <div className={styles.Row}>
                <p className={styles.Lede}>
                    A product to architect, a team to lead, or a seat at the table — I'd love to hear about it.
                </p>
                <MagneticButton href={`mailto:${cv.basics.email}`} className={styles.Button} data-cursor="Say hi">
                    Get in touch
                </MagneticButton>
            </div>

            <div className={styles.Bottom}>
                <a href={`mailto:${cv.basics.email}`} className={styles.Email}>{cv.basics.email}</a>
                <ul className={styles.Links}>
                    {cv.basics.profiles.map((p) => (
                        <li key={p.network}>
                            <a href={p.url} target="_blank" rel="noopener noreferrer">
                                {p.network}
                                <span className="visually-hidden"> (opens in a new tab)</span>
                            </a>
                        </li>
                    ))}
                    <li><a href="/cv.json" download>CV (JSON)</a></li>
                </ul>
                <p className={styles.Time}>
                    <span className={styles.Pulse} aria-hidden="true" /> Izmir — {time} local
                </p>
            </div>
        </section>
    );
}
