import { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import LoadingScreen from './components/LoadingScreen';
import { loadSiteContent } from './content/siteContent';

const AdminPanel = lazy(() => import('./components/AdminPanel'));

const App: React.FC = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const [loading, setLoading] = useState(() => {
    if (isAdminRoute) return false;
    return sessionStorage.getItem('portfolio-loader-seen') !== '1';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoadingComplete = () => {
    sessionStorage.setItem('portfolio-loader-seen', '1');
    setLoading(false);
  };

  const content = loadSiteContent();

  return (
    <>
      {isAdminRoute && (
        <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
          <AdminPanel />
        </Suspense>
      )}

      {!isAdminRoute && loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!loading && !isAdminRoute && (
        <div className="relative min-h-screen overflow-hidden portfolio-app-shell">
          <NeuralBackground />

          {/* Ambient gradient blobs */}
          <div
            className="gradient-blob"
            style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
              top: '5%', left: '-10%',
              animationDelay: '0s',
            }}
          />
          <div
            className="gradient-blob"
            style={{
              width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(178,75,243,0.05) 0%, transparent 70%)',
              top: '40%', right: '-8%',
              animationDelay: '-4s',
            }}
          />
          <div
            className="gradient-blob"
            style={{
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)',
              bottom: '10%', left: '30%',
              animationDelay: '-8s',
            }}
          />

          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main className="portfolio-main-content">
            <div className="portfolio-section-frame hero">
              <Hero content={content.hero} socials={content.socials} theme={theme} />
            </div>
            <div className="portfolio-section-frame">
              <About content={content.about} />
            </div>
            <div className="portfolio-section-frame">
              <Skills content={content.skills} />
            </div>
            <div className="portfolio-section-frame">
              <Projects content={content.projects} />
            </div>
            <div className="portfolio-section-frame">
              <Services content={content.services} />
            </div>
            <div className="portfolio-section-frame">
              <Contact content={content.contact} socials={content.socials} />
            </div>
          </main>
          <Footer content={content.footer} socials={content.socials} />
        </div>
      )}
    </>
  );
};

export default App;
