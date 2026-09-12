/** The five CV chapters, in page order. Shared by the realm index, HUD and menu. */
export interface Realm {
    id: string;
    number: string;
    name: string;
    tagline: string;
    glyph: string;
    className: string;
}

export const REALMS: Realm[] = [
    { id: 'software', number: '01', name: 'Software', tagline: 'The CV as a terminal session — git log, dependencies and all.', glyph: '</>', className: 'soft' },
    { id: 'gamedev', number: '02', name: 'Game Dev', tagline: 'CAREER.EXE — five stages cleared, one in progress, nine achievements.', glyph: '1UP', className: 'game' },
    { id: 'warhammer', number: '03', name: 'Warhammer', tagline: 'A classified Imperial personnel dossier. Clearance required.', glyph: '=][=', className: 'wh' },
    { id: 'mtg', number: '04', name: 'Magic', tagline: 'A career in five cards — one of them legendary.', glyph: '✦', className: 'mtg' },
    { id: 'dnd', number: '05', name: 'D&D', tagline: 'A multiclass character sheet — every number rolled from real CV data.', glyph: 'd20', className: 'dnd' },
];
