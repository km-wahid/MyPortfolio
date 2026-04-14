export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  roles: string[];
  ctaText: string;
  resumeText: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  tech: string[];
  problem: string;
  solution: string;
  impact: string;
  github?: string;
  demo?: string;
  description: string;
  accentColor: string;
}

export interface ProjectsContent {
  title: string;
  subtitle: string;
  items: ProjectItem[];
}

export interface SkillsContent {
  title: string;
  subtitle: string;
  items: string[];
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  availability: string;
}

export interface FooterContent {
  tagline: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  accent: string;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  fiverrLabel: string;
  freelancerLabel: string;
  fiverrUrl: string;
  freelancerUrl: string;
  items: ServiceItem[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  projects: ProjectsContent;
  contact: ContactContent;
  services: ServicesContent;
  footer: FooterContent;
  socials: SocialLink[];
}

export const CONTENT_STORAGE_KEY = 'portfolio-admin-content-v1';

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: 'Software Developer',
    titleLine1: 'From logic to launch —',
    titleLine2: 'I build systems that work.',
    roles: ['Python/Django Developer', 'AI Enthusiast', 'Fast Learner', 'Team Player'],
    ctaText: "Let's Connect",
    resumeText: 'Download Resume',
  },
  about: {
    title: 'The Engineer',
    subtitle: 'Behind the Code',
    paragraphs: [
      'I’m a Python/Django Developer focused on building practical, scalable web applications, with a strong and growing interest in AI-driven solutions.',
      'I solve problems by understanding how systems work, not just by writing code. I learn quickly, adapt to new technologies, and apply them to real-world projects with confidence.',
      'I have experience in full-stack Django development, automation, and building user-focused systems. I value teamwork, clear communication, and continuous improvement, and I’m currently growing toward becoming an AI Engineer with stronger backend and system design expertise.',
    ],
  },
  skills: {
    title: 'My Skills & Tools',
    subtitle: 'Technologies I use to architect, automate, and deploy production-grade systems.',
    items: [
      'HTML', 'CSS', 'JavaScript', 'Python', 'C++', 'Django', 'Git', 'GitHub', 'Docker', 'NGINX',
      'Celery', 'Redis', 'PostgreSQL', 'MySQL', 'SQL', 'AWS', 'Selenium', 'Scrapy', 'Problem Solving',
      'Critical Thinking', 'Communication', 'Adaptability', 'Growth Mindset', 'Rapid Learning',
    ],
  },
  projects: {
    title: "Systems I've Built",
    subtitle: 'Each project represents a problem solved, a system architected, and value delivered.',
    items: [
      {
        id: 1,
        title: 'WhatsApp Campaign Manager',
        image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tech: ['Django', 'Selenium', 'PostgreSQL', 'Redis', 'Bootstrap'],
        problem: 'Manual WhatsApp messaging was limiting business outreach capabilities.',
        solution: 'Automated WhatsApp messaging platform with QR code management and scheduling.',
        impact: 'Increased campaign efficiency by 300% and enabled simultaneous multi-channel outreach.',
        github: 'https://github.com/km-wahid/Whatsapp_Automation',
        demo: 'In Production Server',
        description: 'A comprehensive WhatsApp automation platform built with Django and Selenium. The system manages Chrome profiles, handles QR code authentication, and schedules messages to be sent to customized contact groups. Features include message templating, media attachment support, and detailed analytics dashboards.',
        accentColor: '#00F5FF',
      },
      {
        id: 2,
        title: 'CLO Performance Evaluator',
        image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tech: ['Java', 'Jetty', 'MySQL', 'Chart.js', 'Bootstrap'],
        problem: 'Tracking performance metrics for CLOs required manual calculations and analysis.',
        solution: 'Automated evaluation system with real-time dashboards and reporting.',
        impact: 'Reduced evaluation time from days to minutes and improved accuracy by 95%.',
        github: 'https://github.com/km-wahid/CLOAssessment',
        demo: 'https://cloassessment.onrender.com/',
        description: 'A Java-based application running on Jetty server that evaluates the performance of Collateralized Loan Obligations. The system imports financial data, runs complex calculations, and generates detailed performance reports with visual charts and export capabilities.',
        accentColor: '#B24BF3',
      },
      {
        id: 3,
        title: 'IoT Air Quality Monitoring System',
        image: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tech: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'AWS'],
        problem: 'Real-time monitoring of environmental air quality was not available for small areas.',
        solution: 'IoT-based system with ESP32 sensors sending live data to InfluxDB and visualized in Grafana dashboards.',
        impact: 'Enabled continuous monitoring of air quality and real-time data visualization on AWS.',
        github: 'https://github.com/km-wahid/Air-Quality-with-ESP32',
        demo: 'Deployed on AWS (no preview)',
        description: 'A real-time IoT Air Quality Monitoring System using ESP32 sensors that collect environmental data and transmit via MQTT. Data is stored in InfluxDB and visualized in Grafana dashboards deployed on AWS. The system provides live monitoring, historical analysis, and alerting for key air quality metrics.',
        accentColor: '#00FF9F',
      },
      {
        id: 4,
        title: 'Dockerized YouTube Downloader',
        image: 'https://images.pexels.com/photos/2265482/pexels-photo-2265482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tech: ['Python', 'Docker', 'yt-dlp', 'FastAPI', 'React'],
        problem: 'Existing downloaders lacked reliability and format options.',
        solution: 'Containerized application with progress tracking and format selection.',
        impact: 'Achieved 99.8% download success rate and supported 50+ video platforms.',
        github: 'https://github.com/km-wahid/yt-downloder',
        demo: 'https://yt-downloder-rmgg.onrender.com/',
        description: 'A containerized YouTube downloader built with Python and yt-dlp, wrapped in a FastAPI backend and React frontend. The application features real-time progress tracking, format selection, batch downloading, and automatic media conversion options. The Docker implementation ensures consistent behavior across different environments.',
        accentColor: '#ff7b00',
      },
    ],
  },
  contact: {
    title: "Let's Connect",
    subtitle: "Have a project in mind or just want to chat about technology? I'm always open to new opportunities and collaborations.",
    email: 'khalidmuhammad.official@gmail.com',
    availability: 'Available for new opportunities',
  },
  services: {
    title: 'Professional Services I Offer',
    subtitle: 'You can hire me directly through my freelancing profiles. Click Buy on a service and I’ll continue from the contact section.',
    fiverrLabel: 'Talk in Fiverr',
    freelancerLabel: 'Talk in Freelancer.com',
    fiverrUrl: 'https://www.fiverr.com/km_wahid25?public_mode=true',
    freelancerUrl: 'https://www.freelancer.com/u/khalidmuhammad25',
    items: [
      {
        id: 1,
        title: 'Django Web Application Development',
        description: 'Build a production-ready Django web app with clean architecture, authentication, database design, and deployment-ready structure.',
        highlights: ['Custom dashboard', 'Database models & API', 'Secure auth flow'],
        accent: 'rgba(19,255,170,0.25)',
      },
      {
        id: 2,
        title: 'Automation & Bot Solutions',
        description: 'Automate repetitive workflows using Python, Selenium, and task scheduling to save time and improve reliability.',
        highlights: ['Web automation', 'Scheduled jobs', 'Reporting workflow'],
        accent: 'rgba(30,103,198,0.25)',
      },
      {
        id: 3,
        title: 'Backend API & System Design',
        description: 'Design scalable backend systems with clear APIs, robust data flow, and maintainable architecture for long-term growth.',
        highlights: ['REST API design', 'Performance tuning', 'Deployment guidance'],
        accent: 'rgba(206,132,207,0.25)',
      },
    ],
  },
  footer: {
    tagline: 'Code forged with discipline and caffeine ☕',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/km-wahid' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/' },
    { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=khalidmuhammad.official@gmail.com' },
  ],
};

export const loadSiteContent = (): SiteContent => {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw) as SiteContent;
    return { ...defaultSiteContent, ...parsed };
  } catch {
    return defaultSiteContent;
  }
};

export const saveSiteContent = (content: SiteContent) => {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
};

export const resetSiteContent = () => {
  localStorage.removeItem(CONTENT_STORAGE_KEY);
};
