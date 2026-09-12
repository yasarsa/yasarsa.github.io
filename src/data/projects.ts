import type { TechId } from './cv.types';

export type ProjectKind = 'internal' | 'live' | 'repo';
export type ProjectStatus = 'active' | 'archived' | 'todo';

export interface Project {
    id: string;
    title: string;
    blurb: string;
    year: string;
    status: ProjectStatus;
    kind: ProjectKind;
    href: string;
    tech: TechId[];
    art: string; // CSS gradient
    featured: boolean;
}

export const PROJECTS: Project[] = [
    {
        id: 'dnd-damage-calculator',
        title: 'D&D Damage Calculator',
        blurb: 'A character and attack manager for tabletop D&D sessions — track characters, roll damage, and manage feats in the browser.',
        year: '2025',
        status: 'active',
        kind: 'internal',
        href: '/dnd',
        tech: ['react', 'typescript'],
        art: 'linear-gradient(135deg, #7a2b1e 0%, #2b2118 100%)',
        featured: true,
    },
    {
        id: 'kill-team-operatives',
        title: 'Kill Team Operatives',
        blurb: 'Stat cards and weapon tables for Warhammer 40k: Kill Team operatives, built for quick reference at the table.',
        year: '2025',
        status: 'active',
        kind: 'internal',
        href: '/kt',
        tech: ['react', 'typescript'],
        art: 'linear-gradient(135deg, #ED5B20 0%, #1a1917 100%)',
        featured: true,
    },
    {
        id: 'this-site',
        title: 'This Site',
        blurb: 'This portfolio itself — one CV told five ways (terminal, video game, Warhammer dossier, MTG cards, D&D sheet), with scroll-driven motion built on React, GSAP and Lenis.',
        year: '2026',
        status: 'active',
        kind: 'repo',
        href: 'https://github.com/yasarsa/yasarsa.github.io',
        tech: ['react', 'typescript'],
        art: 'linear-gradient(135deg, #234c80 0%, #10233a 100%)',
        featured: true,
    },
    {
        id: 'todo-project-1',
        title: 'TODO: Next project',
        blurb: 'Reserved slot — fill in with title, blurb, tech, and links in src/data/projects.ts.',
        year: '—',
        status: 'todo',
        kind: 'repo',
        href: '#',
        tech: [],
        art: 'linear-gradient(135deg, #403e3a 0%, #1a1917 100%)',
        featured: false,
    },
    {
        id: 'todo-project-2',
        title: 'TODO: Next project',
        blurb: 'Reserved slot — fill in with title, blurb, tech, and links in src/data/projects.ts.',
        year: '—',
        status: 'todo',
        kind: 'repo',
        href: '#',
        tech: [],
        art: 'linear-gradient(135deg, #403e3a 0%, #1a1917 100%)',
        featured: false,
    },
];
