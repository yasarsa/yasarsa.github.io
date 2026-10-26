export interface JsonResumeProfile {
    network: string;
    username: string;
    url: string;
}

export interface JsonResumeBasics {
    name: string;
    label: string;
    email: string;
    summary: string;
    location: { city: string; region: string; countryCode: string };
    profiles: JsonResumeProfile[];
}

export interface JsonResumeWork {
    name: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    summary: string;
    highlights: string[];
}

export interface JsonResumeEducation {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
    score?: string;
    courses?: string[];
}

export interface JsonResumeSkill {
    name: string;
    keywords: string[];
}

export interface JsonResumeLanguage {
    language: string;
    fluency: string;
}

export interface JsonResume {
    $schema: string;
    basics: JsonResumeBasics;
    work: JsonResumeWork[];
    education: JsonResumeEducation[];
    skills: JsonResumeSkill[];
    languages: JsonResumeLanguage[];
    interests: { name: string }[];
}
