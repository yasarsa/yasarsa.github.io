export type YearMonth = `${number}-${number}`; // '2022-06'

export type TechKind = 'language' | 'framework' | 'platform' | 'cloud' | 'tool';

export type TechId =
    | 'react'
    | 'react-native'
    | 'typescript'
    | 'javascript'
    | 'css'
    | 'html'
    | 'nodejs'
    | 'dotnet'
    | 'csharp'
    | 'python'
    | 'php'
    | 'drupal'
    | 'aws'
    | 'git'
    | 'figma'
    | 'detox'
    | 'mailchimp'
    | 'kissmetrics';

export type Track = 'intern' | 'ic' | 'lead';

export interface ExperienceEntry {
    kind: 'work';
    id: string;
    company: string;
    companyUrl?: string;
    title: string;
    team?: string;
    track: Track;
    startDate: YearMonth;
    endDate: YearMonth | null; // null = current
    location: string;
    summary: string;
    highlights: string[];
    tech: TechId[];
    domains: string[];
}

export interface EducationEntry {
    kind: 'education';
    id: string;
    institution: string;
    institutionUrl?: string;
    studyType: 'MSc' | 'BSc' | 'Exchange';
    area: string;
    startDate: YearMonth;
    endDate: YearMonth | null;
    score?: { gpa: number; scale: number };
    thesis?: { title: string; supervisor: string };
    researchAreas?: string[];
    location: string;
    highlights: string[];
}

export type CvEntry = ExperienceEntry | EducationEntry;

export type EntryKey = `work:${string}` | `education:${string}` | 'person';

export interface CvProfile {
    network: 'LinkedIn' | 'GitHub';
    username: string;
    url: string;
}

export interface CvBasics {
    name: string;
    label: string;
    email: string;
    phone: string;
    location: { city: string; region: string; countryCode: 'TR' };
    summary: string;
    profiles: CvProfile[];
}

export interface CvSkill {
    name: string;
    keywords: TechId[];
}

export interface CvLanguage {
    language: string;
    fluency: string;
    certifications?: string[];
}

export interface Cv {
    basics: CvBasics;
    careerStart: YearMonth;
    work: ExperienceEntry[]; // newest first
    education: EducationEntry[]; // newest first
    skills: CvSkill[];
    languages: CvLanguage[];
    interests: string[];
}
