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
        id: 'frp-helper',
        title: 'FRP Helper',
        blurb: 'A companion app for D&D 5e and Pathfinder tables: characters, initiative, monsters, battle maps and dice rolls, all in the browser.',
        year: '2026',
        status: 'active',
        kind: 'live',
        href: 'https://frp-helper.netlify.app/',
        tech: ['react', 'typescript'],
        art: 'linear-gradient(135deg, #2b2140 0%, #0e0f11 100%)',
        featured: true,
    },
    {
        id: 'this-site',
        title: 'This Site',
        blurb: 'This portfolio: a minimal, game-menu-styled site about games and code. React, zero UI dependencies.',
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
        blurb: 'Reserved slot. Fill in with title, blurb, tech, and links in src/data/projects.ts.',
        year: '',
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
        blurb: 'Reserved slot. Fill in with title, blurb, tech, and links in src/data/projects.ts.',
        year: '',
        status: 'todo',
        kind: 'repo',
        href: '#',
        tech: [],
        art: 'linear-gradient(135deg, #403e3a 0%, #1a1917 100%)',
        featured: false,
    },
];
