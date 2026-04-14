import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import NetworkCanvas from './components/NetworkCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AdminPage from './components/AdminPage';
import defaultPortfolioData from './data/defaultPortfolioData';
import './App.css';

const CONTENT_STORAGE_KEY = 'portfolio-admin-content-v1';

const cloneData = (value) => JSON.parse(JSON.stringify(value));
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const loadPortfolioData = () => {
  const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
  if (!raw) return cloneData(defaultPortfolioData);

  try {
    const parsed = JSON.parse(raw);
    const base = cloneData(defaultPortfolioData);
    const oldProfile = isObject(parsed) && isObject(parsed.profile) ? parsed.profile : null;
    const migratedHero = oldProfile
      ? {
          ...base.hero,
          name: oldProfile.name || base.hero.name,
          designation: oldProfile.designation || base.hero.designation,
          statusText: oldProfile.description || base.hero.statusText,
        }
      : base.hero;
    const migratedAbout = oldProfile
      ? {
          ...base.about,
          bio: oldProfile.bio || base.about.bio,
          details: oldProfile.details || base.about.details,
          degree: oldProfile.degree || base.about.degree,
          status: oldProfile.status || base.about.status,
          mode: oldProfile.mode || base.about.mode,
        }
      : base.about;

    return {
      ...base,
      ...(isObject(parsed) ? parsed : {}),
      header: { ...base.header, ...(isObject(parsed.header) ? parsed.header : {}) },
      hero: { ...migratedHero, ...(isObject(parsed.hero) ? parsed.hero : {}) },
      about: { ...migratedAbout, ...(isObject(parsed.about) ? parsed.about : {}) },
      footer: { ...base.footer, ...(isObject(parsed.footer) ? parsed.footer : {}) },
      skills: Array.isArray(parsed.skills) ? parsed.skills : base.skills,
      projects: Array.isArray(parsed.projects) ? parsed.projects : base.projects,
      timeline: Array.isArray(parsed.timeline) ? parsed.timeline : base.timeline,
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : base.certifications,
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : base.contacts,
    };
  } catch (error) {
    console.error('Invalid stored portfolio content. Reverting to defaults.', error);
    return cloneData(defaultPortfolioData);
  }
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showLoader, setShowLoader] = useState(true);
  const [portfolioData, setPortfolioData] = useState(() => loadPortfolioData());
  const isAdminRoute = window.location.pathname === '/admin';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(portfolioData));
  }, [portfolioData]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (isAdminRoute) {
    return (
      <AdminPage
        data={portfolioData}
        onSave={setPortfolioData}
        onReset={() => setPortfolioData(cloneData(defaultPortfolioData))}
      />
    );
  }

  return (
    <>
      <div className="app">
        <NetworkCanvas />
        <Navbar theme={theme} toggleTheme={toggleTheme} header={portfolioData.header} />
        <Hero hero={portfolioData.hero} />
        <About about={portfolioData.about} />
        <Skills skillGroups={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Timeline items={portfolioData.timeline} />
        <Certifications certifications={portfolioData.certifications} />
        <Contact contacts={portfolioData.contacts} footer={portfolioData.footer} />
      </div>

      {showLoader && <LoadingScreen onDone={() => setShowLoader(false)} />}
    </>
  );
}

export default App;
