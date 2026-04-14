import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Home, User, Wrench, Briefcase, ShoppingBag, Mail } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import logo from '../assets/coding.png';

const navLinks = [
  { name: 'Home', href: '#home', icon: <Home className="h-4 w-4" />, sectionId: 'home' },
  { name: 'About', href: '#about', icon: <User className="h-4 w-4" />, sectionId: 'about' },
  { name: 'Skills', href: '#skills', icon: <Wrench className="h-4 w-4" />, sectionId: 'skills' },
  { name: 'Projects', href: '#projects', icon: <Briefcase className="h-4 w-4" />, sectionId: 'projects' },
  { name: 'Services', href: '#services', icon: <ShoppingBag className="h-4 w-4" />, sectionId: 'services' },
  { name: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4" />, sectionId: 'contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleSmoothNav = (event: MouseEvent<HTMLAnchorElement>, href: string, closeMenu = false) => {
    if (!href.startsWith('#')) {
      if (closeMenu) setIsMobileMenuOpen(false);
      return;
    }
    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', href);
    if (closeMenu) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const sections = navLinks
      .map((item) => document.getElementById(item.sectionId))
      .filter(Boolean) as HTMLElement[];

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';
      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <>
      <header className="portfolio-mobile-nav lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="portfolio-mobile-bar">
          <a href="#home" className="flex items-center gap-2" onClick={(e) => handleSmoothNav(e, '#home')}>
            <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg object-cover border border-white/10" />
            <span className="text-sm font-semibold tracking-wide text-white">
              Khalid <span className="text-neon-blue">Muhammad</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeSwitch checked={theme === 'light'} onChange={onToggleTheme} />
            <button
              className="text-gray-300 hover:text-neon-blue transition-colors"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <header className="hidden lg:block fixed top-0 left-0 right-0 z-40 px-5 py-4">
        <div className="portfolio-topbar">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <a href="#home" className="justify-self-start flex items-center gap-2" onClick={(e) => handleSmoothNav(e, '#home')}>
              <img src={logo} alt="Logo" className="h-9 w-9 rounded-xl object-cover border border-white/10" />
              <span className="text-sm font-semibold text-white">
                Khalid <span className="text-neon-blue">Muhammad</span>
              </span>
            </a>
            <nav className="flex items-center gap-2 justify-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`portfolio-top-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleSmoothNav(e, link.href)}
                    >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>
            <div className="justify-self-end flex items-center gap-3">
              <ThemeSwitch checked={theme === 'light'} onChange={onToggleTheme} />
              <a
                href="/resume.pdf"
                download="Khalid_Resume.pdf"
                className="portfolio-resume-link"
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu backdrop"
            />
            <motion.nav
              className="absolute top-16 left-4 right-4 rounded-2xl p-4 portfolio-mobile-menu"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`portfolio-mobile-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleSmoothNav(e, link.href, true)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>
              <a
                href="/resume.pdf"
                download="Khalid_Resume.pdf"
                className="portfolio-resume-link mt-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </a>
              <div className="mt-3 flex justify-center">
                <ThemeSwitch checked={theme === 'light'} onChange={onToggleTheme} />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
