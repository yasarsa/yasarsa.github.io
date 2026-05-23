export interface CVCardData {
    name: string;
    manaCost: string;
    type: string;
    skills: string[];
    description: string;
    flavorText?: string;
    power?: string;
    toughness?: string;
    /** Use a gradient background instead of an image */
    gradient?: string;
}

export const cvCards: CVCardData[] = [
    {
        name: "Yaşar Anıl Sansak",
        manaCost: "{2}{U}{R}",
        type: "Legendary Creature — Frontend Developer",
        skills: ["React • TypeScript • AWS", "Team Leadership • Architecture", "Turkish (Native) • English (C1/C2)"],
        description: "Software Architect & Team Lead with extensive front-end experience. Passionate about elegant UIs, mentoring, and exploring new technologies.",
        flavorText: "\"The code is strong with this one.\"",
        power: "4",
        toughness: "4",
    },
    {
        name: "Software Architect",
        manaCost: "{3}{W}{U}",
        type: "Enchantment — Vestel • Jun 2022 — Present",
        skills: ["React • TypeScript • CSS • AWS", "IoT • AI Chatbots • TOGG EVC", "Team Lead — IoT Front-End"],
        description: "Led multiple projects across IoT (Smart Life), EV Charging (TOGG), and AI chatbots. Designed UI & architecture for web tools. Built IFA 2024 & 2025 showcase projects with cutting-edge AI. Mentored interns and juniors.",
        flavorText: "\"Architecture is not just about code — it's about vision.\"",
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    },
    {
        name: "Senior Software Dev.",
        manaCost: "{2}{W}",
        type: "Creature — Vestel • Feb 2021 — Jun 2022",
        skills: ["React • TypeScript • CSS", ".NET • C# • AWS", "Full-Stack — IoT Cybersecurity"],
        description: "Contributed to EV Charging System APIs with .NET and C#. Designed and implemented web dashboards with React. Gained hands-on experience with AWS services: Cognito, S3, Lambda, API Gateway.",
        flavorText: "\"Full-stack means seeing the whole battlefield.\"",
        gradient: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
    },
    {
        name: "Software Developer",
        manaCost: "{1}{R}",
        type: "Creature — 4A Labs • Oct 2020 — Jan 2021",
        skills: ["React • JavaScript • TypeScript", "CSS • Responsive Design"],
        description: "Front-end developer on the new bilyoner.com website. Delivered high-performance, responsive UI components in a fast-paced environment.",
        flavorText: "\"Speed and precision — the hallmarks of a great front-end.\"",
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
    },
    {
        name: "Software Developer",
        manaCost: "{2}{G}",
        type: "Creature — Otsimo • Aug 2018 — Sep 2020",
        skills: ["React • React Native • TypeScript", "Detox UI Testing", "Special Education & Speech Therapy Apps"],
        description: "Built Otsimo Special Education and Speech Therapy apps used by thousands of children. Developed otsimo.com and internal tools. Implemented automated UI testing with Detox.",
        flavorText: "\"Technology that makes a difference in people's lives.\"",
        gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    },
    {
        name: "Junior Developer",
        manaCost: "{1}{G}",
        type: "Creature — Bidolubaski • Dec 2017 — Jul 2018",
        skills: ["Drupal • PHP • JavaScript", "MailChimp • Kissmetrics"],
        description: "Developed bidolubaski.com and internal company tools. Integrated marketing platforms MailChimp and Kissmetrics into the product.",
        flavorText: "\"Every journey begins with a single line of code.\"",
        gradient: "linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)",
    },
    {
        name: "R&D Intern",
        manaCost: "{0}",
        type: "Token Creature — Vestel • Jul 2016",
        skills: ["Python • Test Automation", "Set-Top Box Testing"],
        description: "Acquired knowledge about test automation and wrote test scripts for set-top boxes. Prepared regular test result reports.",
        flavorText: "\"Even a token can change the game.\"",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
        name: "MSc. Interactive Computing",
        manaCost: "{3}{U}{U}",
        type: "Sorcery — TED University • 2019 — 2023",
        skills: ["CGPA: 3.29 / 4.00", "Image Processing • ML • CV", "Thesis: Stuttering Detection"],
        description: "Thesis: \"Automatic Stuttering Detection and Classification\" under Assist. Prof. Dr. Venera Adanova. Research areas: Image Processing, Computer Vision, Machine Learning, Symmetry Analysis.",
        flavorText: "\"Knowledge is the most powerful spell.\"",
        gradient: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    },
    {
        name: "BSc. Computer Engineering",
        manaCost: "{2}{U}",
        type: "Sorcery — İzmir Uni. of Economics • 2013 — 2017",
        skills: ["CGPA: 3.02 / 4.00", "Erasmus @ Riga Technical Uni.", "Computer Science Foundations"],
        description: "Bachelor's degree in Computer Engineering. Completed Erasmus Exchange Programme in Computer Science at Riga Technical University, Latvia (2016).",
        flavorText: "\"The foundation upon which all else is built.\"",
        gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
];
