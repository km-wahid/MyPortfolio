'use client';

import Image from 'next/image';
import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowDown, ArrowRight, Award, Box, Braces, Check, Code2, Database,
  Download, ExternalLink, GraduationCap, Layers3,
  MapPin, Menu, MessageSquare, Network, Send, Server, Sparkles, Terminal,
  Trophy, Workflow, X,
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { credentials, profile, projects, skillGroups, type Project } from '@/data/portfolio';

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'],
  ['Achievements', 'achievements'], ['Contact', 'contact'],
] as const;

const iconForSocial = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, Email: MdEmail };

function SectionIntro({ eyebrow, title, accent, description }: { eyebrow: string; title: string; accent: string; description: string }) {
  return (
    <div className="section-intro">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title} <span>{accent}</span></h2>
      <p>{description}</p>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';
      navItems.forEach(([, id]) => {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={navigate} aria-label="Khalid Muhammad, home">
          <span className="brand-mark"><Terminal size={17} /></span>
          <span>Khalid<span>.dev</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="resume-nav" href="/resume.pdf" download="Khalid_Muhammad_Wahid_Resume.pdf">
          <Download size={15} /> Resume
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {navItems.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={navigate}>{label}</a>)}
            <a href="/resume.pdf" download="Khalid_Muhammad_Wahid_Resume.pdf" onClick={navigate}><Download size={16} /> Download résumé</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SystemVisual() {
  return (
    <div className="system-visual" aria-label="Real-time and AI system architecture illustration">
      <div className="system-toolbar"><span /><span /><span /><code>system.architecture</code></div>
      <div className="system-canvas">
        <div className="grid-lines" />
        <div className="system-node node-api"><Network /><small>REAL-TIME</small><strong>WebSocket</strong><span>live events</span></div>
        <div className="system-node node-server"><Server /><small>SERVICES</small><strong>API Core</strong><span>domain logic</span></div>
        <div className="system-node node-db"><Database /><small>DATA</small><strong>PostgreSQL</strong><span>persistent state</span></div>
        <div className="system-node node-queue"><Workflow /><small>EVENTS</small><strong>Redis Queue</strong><span>async workloads</span></div>
        <div className="system-node node-cloud"><Sparkles /><small>INTELLIGENCE</small><strong>AI Service</strong><span>model workflow</span></div>
        <svg className="connectors" viewBox="0 0 600 430" preserveAspectRatio="none" aria-hidden="true">
          <path d="M165 105 C220 105 220 196 270 196" /><path d="M378 195 C440 195 425 105 470 105" />
          <path d="M326 245 C326 280 174 280 174 325" /><path d="M326 245 C326 280 465 280 465 325" />
        </svg>
        <span className="data-pulse pulse-one" /><span className="data-pulse pulse-two" /><span className="data-pulse pulse-three" />
      </div>
      <div className="system-status"><span><i /> Events flowing normally</span><code>latency: 42ms</code></div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-glow" />
      <div className="hero-copy">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="availability"><span /> {profile.availability}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
          Engineering the<br /><span>systems behind</span><br />great software.
        </motion.h1>
        <motion.p className="hero-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}>
          {profile.intro}
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}>
          <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
          <a className="button button-secondary" href="#contact">Let&apos;s connect</a>
        </motion.div>
        <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
          <span><MapPin size={15} /> {profile.location}</span><span><Code2 size={15} /> {profile.specialty}</span>
        </motion.div>
      </div>
      <motion.div className="hero-visual-wrap" initial={{ opacity: 0, scale: 0.96, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
        <SystemVisual />
      </motion.div>
      <a className="scroll-cue" href="#about"><span>Scroll to discover</span><ArrowDown size={16} /></a>
    </section>
  );
}

function About() {
  const principles = [
    { icon: Network, title: 'Problem-first thinking', text: 'I start with the real problem, then shape the data flow, boundaries, and technology around it.' },
    { icon: Layers3, title: 'Practical architecture', text: 'I choose clear, dependable solutions that fit the real scale and constraints of a product.' },
    { icon: Sparkles, title: 'Continuous learning', text: 'I strengthen fundamentals through project work, experimentation, and problem solving.' },
  ];
  return (
    <section id="about" className="content-section section-shell">
      <Reveal><SectionIntro eyebrow="About me" title="Thoughtful engineering," accent="built to last." description="Technology-flexible, curious by nature, and motivated by software that makes complicated work feel simple." /></Reveal>
      <div className="about-grid">
        <Reveal className="about-story">
          <div className="terminal-heading"><span /><span /><span /><code>about_khalid.py</code></div>
          <div className="story-body">
            <p className="code-comment"># A little about the engineer</p>
            {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="education"><GraduationCap /><span><small>EDUCATION</small>{profile.education}</span></div>
          </div>
        </Reveal>
        <div className="principles">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="principle-card">
              <span className="principle-number">0{index + 1}</span><item.icon />
              <h3>{item.title}</h3><p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const skillIcons = [Code2, Database, Box, Braces];

function Skills() {
  return (
    <section id="skills" className="content-section skills-section">
      <div className="section-shell">
        <Reveal><SectionIntro eyebrow="Technical toolkit" title="The right tools for" accent="the problem at hand." description="A flexible toolkit spanning Node.js and Python backends, real-time communication, data, AI integration, infrastructure, and computer science fundamentals." /></Reveal>
        <div className="skill-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <Reveal className="skill-card" key={group.title} delay={index * 0.07}>
                <div className="skill-card-title"><span><Icon /></span><h3>{group.title}</h3><code>0{index + 1}</code></div>
                <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectGraphic({ project }: { project: Project }) {
  const Icon = project.id === 'whatsapp-automation' ? MessageSquare : project.id === 'clo-assessment' ? Layers3 : project.id === 'air-quality' ? Network : Download;
  return (
    <div className={`project-graphic accent-${project.accent}`}>
      <div className="project-grid-bg" /><span className="graphic-orbit orbit-one" /><span className="graphic-orbit orbit-two" />
      <div className="graphic-core"><Icon /><span>{project.technologies[0]}</span></div>
      <code>{`{ ${project.index} / ${project.id} }`}</code>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);
  return (
    <motion.div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.25 }}>
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close project details"><X /></button>
        <ProjectGraphic project={project} />
        <div className="dialog-body">
          <span className="eyebrow"><span className="eyebrow-dot" />Case study {project.index}</span>
          <h2 id="project-dialog-title">{project.title}</h2><p className="dialog-summary">{project.summary}</p>
          <div className="case-study-grid">
            <div><small>THE PROBLEM</small><p>{project.problem}</p></div>
            <div><small>THE SOLUTION</small><p>{project.solution}</p></div>
            <div><small>THE OUTCOME</small><p>{project.outcome}</p></div>
          </div>
          <div className="dialog-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="dialog-actions">
            <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer"><FaGithub size={17} /> View source</a>
            {project.live && <a className="button button-secondary" href={project.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={16} /></a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section id="projects" className="content-section section-shell">
      <Reveal><SectionIntro eyebrow="Selected work" title="Problems turned into" accent="working systems." description="Four projects that show how I approach automation, data workflows, backend architecture, and deployment." /></Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <article className="project-card">
              <ProjectGraphic project={project} />
              <div className="project-card-body">
                <span className="project-index">CASE STUDY / {project.index}</span><h3>{project.title}</h3><p>{project.summary}</p>
                <div className="project-tech">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
                <button type="button" onClick={() => setSelected(project)}>Explore case study <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="content-section credentials-section">
      <div className="section-shell">
        <Reveal><SectionIntro eyebrow="Growth & recognition" title="Learning proven through" accent="practice and results." description="Credentials and milestones that reflect continuous learning, collaboration, and problem-solving discipline." /></Reveal>
        <div className="credentials-grid">
          {credentials.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className={`credential-card ${item.image ? '' : 'credential-text-only'}`}>
              {item.image ? (
                <div className="credential-image"><Image src={item.image} alt={`${item.title} from ${item.issuer}`} fill sizes="(max-width: 768px) 100vw, 33vw" /></div>
              ) : <div className="achievement-mark"><Terminal /><strong>200+</strong><span>problems</span></div>}
              <div className="credential-body">
                <span className="credential-kind">{item.kind === 'Certificate' ? <Award /> : <Trophy />}{item.kind}</span>
                <h3>{item.title}</h3><p>{item.issuer}</p>
                {item.credentialId && <code>ID · {item.credentialId}</code>}{item.detail && <small>{item.detail}</small>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [lastSentAt, setLastSentAt] = useState(0);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return;
    const fromName = String(data.get('from_name') || '').trim();
    const fromEmail = String(data.get('from_email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (fromName.length < 2 || subject.length < 3 || message.length < 10 || !/^\S+@\S+\.\S+$/.test(fromEmail)) {
      setStatus('error'); setError('Please complete every field with valid information.'); return;
    }
    if (Date.now() - lastSentAt < 30_000) {
      setStatus('error'); setError('Your message was already sent. Please wait before sending another.'); return;
    }
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error'); setError('The contact form is not configured yet. Please email me directly.'); return;
    }
    setStatus('sending'); setError('');
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: fromName,
        from_email: fromEmail,
        reply_to: fromEmail,
        subject,
        message,
        to_name: profile.name,
        to_email: profile.email,
        sent_at: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dhaka' }),
      }, { publicKey });
      form.reset(); setLastSentAt(Date.now()); setStatus('success');
      window.setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error'); setError('Your message could not be sent. Please try again or use the email link.');
    }
  };
  return (
    <section id="contact" className="content-section section-shell contact-section">
      <Reveal><SectionIntro eyebrow="Start a conversation" title="Have a problem worth" accent="solving together?" description="I am open to software engineering opportunities, technical collaborations, and conversations about backend systems." /></Reveal>
      <div className="contact-grid">
        <Reveal className="contact-details">
          <span className="contact-status"><i /> Available for opportunities</span>
          <h3>Let&apos;s build something dependable.</h3>
          <p>The best projects start with a clear conversation. Tell me what you are building, where it is stuck, or what role you need filled.</p>
          <a className="email-link" href={`mailto:${profile.email}`}><span><MdEmail /></span><small>EMAIL ME DIRECTLY</small><strong>{profile.email}</strong><ArrowRight /></a>
          <div className="social-row">
            {profile.socials.filter((social) => social.label !== 'Email').map((social) => {
              const Icon = iconForSocial[social.label];
              return <a key={social.label} href={social.href} target="_blank" rel="noreferrer"><Icon />{social.label}<ExternalLink /></a>;
            })}
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.08}>
          <div className="terminal-heading"><span /><span /><span /><code>new_message.sh</code></div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label><span>Name</span><input name="from_name" type="text" required minLength={2} placeholder="Your name" autoComplete="name" /></label>
              <label><span>Email</span><input name="from_email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
            </div>
            <label><span>Subject</span><input name="subject" type="text" required minLength={3} placeholder="What would you like to discuss?" /></label>
            <label><span>Message</span><textarea name="message" required minLength={10} rows={5} placeholder="A few details about your idea, opportunity, or question..." /></label>
            <label className="honeypot" aria-hidden="true">Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
            <button className="button button-primary submit-button" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <><Send size={16} /> Send message</>}
            </button>
            <div className="form-message" aria-live="polite">
              {status === 'success' && <span className="success"><Check /> Message sent. I&apos;ll get back to you soon.</span>}
              {status === 'error' && <span className="error">{error} <a href={`mailto:${profile.email}`}>Email me directly</a>.</span>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer><div className="section-shell footer-inner">
      <a className="brand" href="#home"><span className="brand-mark"><Terminal size={17} /></span><span>Khalid<span>.dev</span></span></a>
      <p>Designed around clear thinking and dependable systems.</p>
      <span>© {new Date().getFullYear()} {profile.name}</span>
    </div></footer>
  );
}

export default function Portfolio() {
  return <><Navbar /><main><Hero /><About /><Skills /><Projects /><Achievements /><Contact /></main><Footer /></>;
}
