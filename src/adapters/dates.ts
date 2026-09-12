import type { YearMonth } from '../data/cv.types';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function parse(ym: YearMonth): { year: number; month: number } {
    const [year, month] = ym.split('-').map(Number);
    return { year, month };
}

export function formatMonthYear(ym: YearMonth): string {
    const { year, month } = parse(ym);
    return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null): string {
    const startLabel = formatMonthYear(start);
    const endLabel = end ? formatMonthYear(end) : 'Present';
    return `${startLabel} — ${endLabel}`;
}

export function monthsBetween(start: YearMonth, end?: YearMonth | null): number {
    const a = parse(start);
    const b = end ? parse(end) : monthYearNow();
    return (b.year - a.year) * 12 + (b.month - a.month);
}

export function yearsBetween(start: YearMonth, end?: YearMonth | null): number {
    return monthsBetween(start, end) / 12;
}

export function durationLabel(start: YearMonth, end?: YearMonth | null): string {
    const total = monthsBetween(start, end);
    const years = Math.floor(total / 12);
    const months = total % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} yr`);
    if (months > 0 || parts.length === 0) parts.push(`${months} mo`);
    return parts.join(' ');
}

function monthYearNow(): { year: number; month: number } {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
}
