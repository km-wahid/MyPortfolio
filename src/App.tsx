import { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { loadSiteContent } from './content/siteContent';
import type { SiteContent } from './content/siteContent';

// ─── Lazy Imports ────────────────────────────────────────────────────────────
const AdminPanel       = lazy(() => import('./components/AdminPanel'));
const About            = lazy(() => import('./components/About'));
const Skills           = lazy(() => import('./components/Skills'));
const Projects         = lazy(() => import('./components/Projects'));
const Certificates     = lazy(() => import('./components/Certificates'));
const Contact          = lazy(() => import('./components/Contact'));
const Footer           = lazy(() => import('./components/Footer'));
const LoadingScreen    = lazy(() => import('./components/LoadingScreen'));

// ─── Constants ───────────────────────────────────────────────────────────────
const LOADER_SEEN_KEY      = 'portfolio-loader-seen';
const THEME_KEY            = 'theme-mode';
const DEFERRED_DELAY_MS    = 120;

type Theme = 'dark' | 'light';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getInitialTheme = (): Theme =>
  localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';

const getInitialLoading = (isAdmin: boolean): boolean =>
  !isAdmin && sessionStorage.getItem(LOADER_SEEN_KEY) !== '1';

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Decorative ambient gradient blobs */
const AmbientBlobs: React.FC = () => (
  <>
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
  </>
);

/** Deferred content sections rendered after initial load */
interface DeferredSectionsProps {
  content: SiteContent;
}

const DeferredSections: React.FC<DeferredSectionsProps> = ({ content }) => (
  <Suspense fallback={null}>
    <div className="portfolio-section-frame"><About        content={content.about}        /></div>
    <div className="portfolio-section-frame"><Skills       content={content.skills}       /></div>
    <div className="portfolio-section-frame"><Projects     content={content.projects}     /></div>
    <div className="portfolio-section-frame"><Certificates content={content.certificates} /></div>
    <div className="portfolio-section-frame"><Contact      content={content.contact} socials={content.socials} /></div>
  </Suspense>
);

// ─── Main App ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const isAdmin = window.location.pathname.startsWith('/admin');

  const [loading,          setLoading         ] = useState(() => getInitialLoading(isAdmin));
  const [theme,            setTheme            ] = useState<Theme>(getInitialTheme);
  const [sectionsReady,    setSectionsReady    ] = useState(false);
  const [content                               ] = useState<SiteContent>(() => loadSiteContent());

  // Sync theme class + persist
  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Defer non-critical sections until after hero renders
  useEffect(() => {
    if (isAdmin || loading) return;
    const id = window.setTimeout(() => setSectionsReady(true), DEFERRED_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [isAdmin, loading]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
    setLoading(false);
  }, []);

  // ── Admin route ─────────────────────────────────────────────────────────
  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
        <AdminPanel />
      </Suspense>
    );
  }

  // ── Loading screen ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <Suspense fallback={null}>
        <LoadingScreen onComplete={handleLoadingComplete} />
      </Suspense>
    );
  }

  // ── Main portfolio ──────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen overflow-hidden portfolio-app-shell">

      <AmbientBlobs />

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="portfolio-main-content">
        <div className="portfolio-section-frame hero">
          <Hero content={content.hero} socials={content.socials} theme={theme} />
        </div>

        {sectionsReady && <DeferredSections content={content} />}
      </main>

      {sectionsReady && (
        <Suspense fallback={null}>
          <Footer content={content.footer} socials={content.socials} />
        </Suspense>
      )}
    </div>
  );
};

export default App;