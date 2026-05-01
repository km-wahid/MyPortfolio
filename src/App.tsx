import { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { loadSiteContent } from './content/siteContent';

const AdminPanel = lazy(() => import('./components/AdminPanel'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const NeuralBackground = lazy(() => import('./components/NeuralBackground'));
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));

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
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [content] = useState(() => loadSiteContent());

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  useEffect(() => {
    if (isAdminRoute || loading) return;
    const timer = window.setTimeout(() => setShowDeferredSections(true), 120);
    return () => window.clearTimeout(timer);
  }, [isAdminRoute, loading]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoadingComplete = () => {
    sessionStorage.setItem('portfolio-loader-seen', '1');
    setLoading(false);
  };

  return (
    <>
      {isAdminRoute && (
        <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
          <AdminPanel />
        </Suspense>
      )}

      {!isAdminRoute && loading && (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={handleLoadingComplete} />
        </Suspense>
      )}

      {!loading && !isAdminRoute && (
        <div className="relative min-h-screen overflow-hidden portfolio-app-shell">
          <Suspense fallback={null}>
            <NeuralBackground />
          </Suspense>

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
            {showDeferredSections && (
              <Suspense fallback={null}>
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
                  <Certificates content={content.certificates} />
                </div>
                <div className="portfolio-section-frame">
                  <Contact content={content.contact} socials={content.socials} />
                </div>
              </Suspense>
            )}
          </main>
          {showDeferredSections && (
            <Suspense fallback={null}>
              <Footer content={content.footer} socials={content.socials} />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
};

export default App;
