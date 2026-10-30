/**
 * Games shown on the homepage and the Projects page.
 * Descriptions are summarised from each project's own README/notes in
 * ~/Desktop/projects/godot-projects.
 */
export type GameStatus = 'in-development' | 'playable' | 'released';

export interface GameProject {
    id: string;
    title: string;
    status: GameStatus;
    engine?: string;
    /** e.g. ['Mobile', 'Web'] */
    platforms: string[];
    blurb: string;
    year: string;
    href?: string;
}

export const GAME_STATUS_LABEL: Record<GameStatus, string> = {
    'in-development': 'In development',
    playable: 'Playable',
    released: 'Released',
};

export const GAMES: GameProject[] = [
    {
        id: 'wizard-swipe',
        title: 'Wizard Swipe',
        status: 'playable',
        engine: 'Godot',
        platforms: ['Mobile', 'Web'],
        blurb: 'A roguelike deckbuilder where you cast spells by tracing their runes from memory. Chain casts for combos across three acts.',
        year: '2026',
        href: 'https://anilsansak.itch.io/wizard-swipe',
    },
    {
        id: 'clash-of-steel',
        title: 'Clash of Steel: Cards & Honour',
        status: 'playable',
        engine: 'Godot',
        platforms: ['Mobile', 'Web'],
        blurb: 'A dueling-knights card game. Pick your weapon, shield and armor, then outguess your opponent one face-down card at a time.',
        year: '2026',
        href: 'https://anilsansak.itch.io/clash-of-steel',
    },
    {
        id: 'bouncing-balls',
        title: 'Bouncing Balls',
        status: 'playable',
        engine: 'Godot',
        platforms: ['Mobile', 'Web'],
        blurb: 'A fast dodge-em-up: survive the bouncing enemies, grab freeze, shield and ghost power-ups, and unlock new ball skins.',
        year: '2026',
        href: 'https://anilsansak.itch.io/bouncing-balls',
    },
    {
        id: 'sea-legs',
        title: 'Sea Legs',
        status: 'playable',
        engine: 'Godot',
        platforms: ['Mobile', 'Web'],
        blurb: 'Tilt your phone to keep a waiter\'s tray of drinks level on a rolling ship\'s deck.',
        year: '2026',
        href: 'https://anilsansak.itch.io/sea-legs',
    },
    {
        id: 'gym-rush',
        title: 'Gym Rush',
        status: 'in-development',
        engine: 'Godot',
        platforms: ['Mobile', 'Web'],
        blurb: 'A real-time time-management game about finishing your workout in a crowded gym. Hit your targets, play each rep, and keep your machine from the regulars.',
        year: '2026',
        href: 'https://anilsansak.itch.io/gym-rush',
    },
];
