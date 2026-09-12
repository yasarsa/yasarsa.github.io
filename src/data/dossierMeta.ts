import type { EntryKey } from './cv.types';

/** Hand-authored grimdark flavour for the Warhammer (Imperial dossier) chapter. */

export const DOSSIER_HEADER = {
    authority: 'Ordo Technicus',
    clearance: 'Vermillion',
    fileRef: 'IZM-2016-0701-YAS',
    designation: 'Magos Architectus',
    homeworld: 'Izmir, Anatolia Sector, Segmentum Solar',
    thought: 'Untested code is heresy.',
    verdict: 'Approved for deployment',
};

export const DEPLOYMENT_TITLES: Partial<Record<EntryKey, { rank: string; note: string }>> = {
    'work:vestel-architect': {
        rank: 'Magos Architectus',
        note: 'Commands the IoT Front-End cohort. Campaigns across IoT, EV charging and machine-spirit (AI) fronts.',
    },
    'work:vestel-senior': {
        rank: 'Senior Tech-Adept',
        note: 'Hardened EV-charging cogitator APIs (.NET, C#). Bound AWS machine spirits.',
    },
    'work:4a-labs': {
        rank: 'Adept of the Front Line',
        note: 'Rebuilt the bilyoner.com data-shrine interface.',
    },
    'work:otsimo': {
        rank: 'Adept, Order of Healing',
        note: 'Forged special-education and speech-therapy engines for the young of the Imperium.',
    },
    'work:bidolubaski': {
        rank: 'Initiate Scribe',
        note: 'Maintained the bidolubaski.com shrine. Integrated MailChimp and Kissmetrics augurs.',
    },
    'work:vestel-intern': {
        rank: 'Novitiate',
        note: 'Wrote litanies of test automation for set-top boxes.',
    },
};

export const SCHOLAM_TITLES: Partial<Record<EntryKey, string>> = {
    'education:msc-ted': 'Schola Progenium — Master of Interactive Computing',
    'education:bsc-iue': 'Schola Technica — Bachelor of Computer Engineering',
    'education:erasmus-riga': 'Off-world Exchange — Riga Technical University',
};
