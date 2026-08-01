export interface SocialLink {
  label: 'GitHub' | 'LinkedIn' | 'Email';
  href: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  github: string;
  live?: string;
  accent: 'cyan' | 'violet' | 'green' | 'orange';
}

export interface Credential {
  title: string;
  issuer: string;
  kind: 'Certificate' | 'Achievement';
  image?: string;
  credentialId?: string;
  detail?: string;
}

export const profile = {
  name: 'Khalid Muhammad Wahid',
  shortName: 'Khalid',
  title: 'Software Engineer',
  specialty: 'Backend · real-time systems · AI',
  location: 'Dhaka, Bangladesh',
  email: 'khalidmuhammad.official@gmail.com',
  phone: '+8801723688320',
  availability: 'Open to software engineering opportunities',
  intro:
    'I solve complex problems by designing dependable backend, real-time, and AI-powered systems.',
  about: [
    'I am a Computer Science student and software engineer working across Node.js, AdonisJS, Python, Django, real-time applications, APIs, automation, and AI integrations. Technology is a tool; the real work is understanding the problem and designing the right system around it.',
    'My work spans real-time services, campaign automation, education analytics, IoT data pipelines, and AI-assisted workflows. Across each project, I care about practical architecture, understandable code, and dependable software that solves a measurable problem.',
  ],
  education: 'BSc in Computer Science & Engineering · Dhaka International University',
  socials: [
    { label: 'GitHub', href: 'https://github.com/km-wahid' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/' },
    { label: 'Email', href: 'mailto:khalidmuhammad.official@gmail.com' },
  ] satisfies SocialLink[],
};

export const skillGroups: SkillGroup[] = [
  { title: 'Languages & backend', skills: ['JavaScript', 'TypeScript', 'Node.js', 'AdonisJS', 'Python', 'Django', 'FastAPI'] },
  { title: 'Real-time & data', skills: ['WebSockets', 'Event-driven Systems', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'MQTT'] },
  { title: 'AI, automation & delivery', skills: ['AI Integration', 'LLM Workflows', 'Celery', 'Selenium', 'Docker', 'Linux', 'AWS', 'Git & GitHub'] },
  { title: 'Engineering fundamentals', skills: ['System Design', 'REST APIs', 'Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Unit Testing'] },
];

export const projects: Project[] = [
  {
    id: 'whatsapp-automation', index: '01', title: 'WhatsApp Bulk Automation', accent: 'cyan',
    summary: 'A Django campaign platform for scheduled, asynchronous WhatsApp outreach.',
    problem: 'Manual outreach made campaigns repetitive, difficult to schedule, and hard to manage consistently.',
    solution: 'Built a Django application integrating Selenium and Celery, with campaign scheduling, persistent data, and asynchronous delivery workflows.',
    outcome: 'Created a reusable workflow for organizing campaigns and delivering messages without blocking the user experience.',
    technologies: ['Django', 'Selenium', 'Celery', 'PostgreSQL'],
    github: 'https://github.com/km-wahid/Whatsapp_Automation',
  },
  {
    id: 'clo-assessment', index: '02', title: 'CLO Assessment', accent: 'violet',
    summary: 'A centralized web application for Course Learning Outcome evaluation and reporting.',
    problem: 'Spreadsheet-based CLO evaluation required repeated manual calculation and made reporting difficult to follow.',
    solution: 'Developed a web-based assessment workflow that centralizes course data, automates calculations, and presents results clearly.',
    outcome: 'Reduced manual calculation time by 60% while improving transparency and consistency in academic reporting.',
    technologies: ['Java', 'Jetty', 'MySQL', 'Chart.js'],
    github: 'https://github.com/km-wahid/CLOAssessment',
    live: 'https://cloassessment.onrender.com/',
  },
  {
    id: 'air-quality', index: '03', title: 'IoT Air Quality Monitor', accent: 'green',
    summary: 'A real-time environmental data pipeline deployed on AWS EC2.',
    problem: 'Environmental readings needed a dependable path from physical sensors to live, understandable dashboards.',
    solution: 'Connected ESP32 sensors through MQTT to InfluxDB, then built Grafana dashboards and automated Linux services on AWS.',
    outcome: 'Delivered continuous data collection, visualization, and a scalable foundation for real-time air-quality monitoring.',
    technologies: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'AWS'],
    github: 'https://github.com/km-wahid/Air-Quality-with-ESP32',
  },
  {
    id: 'youtube-downloader', index: '04', title: 'Dockerized Media Downloader', accent: 'orange',
    summary: 'A containerized download utility with format selection and a web interface.',
    problem: 'Local media download tools can be difficult to configure consistently across environments.',
    solution: 'Packaged a Python and yt-dlp workflow with a FastAPI backend, React interface, and Docker-based runtime.',
    outcome: 'Made the application portable and easier to run while supporting progress feedback and multiple formats.',
    technologies: ['Python', 'FastAPI', 'yt-dlp', 'React', 'Docker'],
    github: 'https://github.com/km-wahid/yt-downloder',
    live: 'https://yt-downloder-rmgg.onrender.com/',
  },
];

export const credentials: Credential[] = [
  { title: 'Machine Learning with Python', issuer: 'IBM', kind: 'Certificate', image: '/certificates/ibm-ml.png', credentialId: 'FFZOBHZL6MAN' },
  { title: 'AI Prompt Engineer Level 1™', issuer: 'AI CERTs™', kind: 'Certificate', image: '/certificates/ai-prompt.png', credentialId: 'ef11be4ead9c' },
  { title: 'CPC Hackathon Winner', issuer: 'Dhaka International University', kind: 'Achievement', image: '/certificates/hackathon.jpg', detail: 'Competitive problem solving and collaborative software development.' },
  { title: '200+ DSA Problems Solved', issuer: 'LeetCode & Codeforces', kind: 'Achievement', detail: 'Practice across arrays, trees, dynamic programming, and graph problems.' },
];
