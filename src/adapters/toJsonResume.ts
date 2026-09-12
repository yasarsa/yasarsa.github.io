import type { Cv } from '../data/cv.types';
import { techLabel } from '../data/tech.ts';
import type { JsonResume } from './jsonResume.types';

/**
 * Pure Cv -> JSON Resume (jsonresume.org) mapping.
 * `phone` is deliberately omitted — see the JSON lens privacy note.
 */
export function toJsonResume(cv: Cv): JsonResume {
    return {
        $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
        basics: {
            name: cv.basics.name,
            label: cv.basics.label,
            email: cv.basics.email,
            summary: cv.basics.summary,
            location: cv.basics.location,
            profiles: cv.basics.profiles,
        },
        work: cv.work.map((entry) => ({
            name: entry.company,
            position: entry.title,
            location: entry.location,
            startDate: entry.startDate,
            ...(entry.endDate ? { endDate: entry.endDate } : {}),
            summary: entry.summary,
            highlights: entry.highlights,
        })),
        education: cv.education.map((entry) => ({
            institution: entry.institution,
            area: entry.area,
            studyType: entry.studyType,
            startDate: entry.startDate,
            ...(entry.endDate ? { endDate: entry.endDate } : {}),
            ...(entry.score ? { score: `${entry.score.gpa.toFixed(2)}/${entry.score.scale.toFixed(2)}` } : {}),
            ...(entry.thesis ? { courses: [`Thesis: ${entry.thesis.title} (Supervisor: ${entry.thesis.supervisor})`] } : {}),
        })),
        skills: cv.skills.map((skill) => ({
            name: skill.name,
            keywords: skill.keywords.map(techLabel),
        })),
        languages: cv.languages.map((lang) => ({
            language: lang.language,
            fluency: [lang.fluency, ...(lang.certifications ?? [])].join(' — '),
        })),
        interests: cv.interests.map((name) => ({ name })),
    };
}
