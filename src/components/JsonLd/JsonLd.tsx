import { useEffect } from 'react';
import { cv } from '../../data/cv';

const ORIGIN = 'https://yasarsa.github.io';

export default function JsonLd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: cv.basics.name,
            jobTitle: cv.work[0]?.title,
            url: ORIGIN,
            email: `mailto:${cv.basics.email}`,
            address: {
                '@type': 'PostalAddress',
                addressLocality: cv.basics.location.city,
                addressCountry: cv.basics.location.countryCode,
            },
            worksFor: {
                '@type': 'Organization',
                name: cv.work[0]?.company,
            },
            alumniOf: cv.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
            knowsAbout: cv.skills.flatMap((s) => s.keywords),
            sameAs: cv.basics.profiles.map((p) => p.url),
        });
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null;
}
