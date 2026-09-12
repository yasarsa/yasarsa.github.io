import type { TechId, TechKind } from './cv.types';

export interface Tech {
    id: TechId;
    label: string;
    kind: TechKind;
}

export const TECH_REGISTRY: Record<TechId, Tech> = {
    react: { id: 'react', label: 'React', kind: 'framework' },
    'react-native': { id: 'react-native', label: 'React Native', kind: 'framework' },
    typescript: { id: 'typescript', label: 'TypeScript', kind: 'language' },
    javascript: { id: 'javascript', label: 'JavaScript', kind: 'language' },
    css: { id: 'css', label: 'CSS', kind: 'language' },
    html: { id: 'html', label: 'HTML', kind: 'language' },
    nodejs: { id: 'nodejs', label: 'Node.js', kind: 'platform' },
    dotnet: { id: 'dotnet', label: '.NET', kind: 'framework' },
    csharp: { id: 'csharp', label: 'C#', kind: 'language' },
    python: { id: 'python', label: 'Python', kind: 'language' },
    php: { id: 'php', label: 'PHP', kind: 'language' },
    drupal: { id: 'drupal', label: 'Drupal', kind: 'framework' },
    aws: { id: 'aws', label: 'AWS', kind: 'cloud' },
    git: { id: 'git', label: 'Git', kind: 'tool' },
    figma: { id: 'figma', label: 'Figma', kind: 'tool' },
    detox: { id: 'detox', label: 'Detox', kind: 'tool' },
    mailchimp: { id: 'mailchimp', label: 'MailChimp', kind: 'tool' },
    kissmetrics: { id: 'kissmetrics', label: 'Kissmetrics', kind: 'tool' },
};

export function techLabel(id: TechId): string {
    return TECH_REGISTRY[id].label;
}

export function techsByKind(ids: TechId[], kind: TechKind): TechId[] {
    return ids.filter((id) => TECH_REGISTRY[id].kind === kind);
}
