import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact',  href: '#contact'  },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'navbar-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <Cpu className="h-6 w-6 text-neon-blue animate-glowPulse" />
              <div className="absolute inset-0 blur-sm bg-neon-blue opacity-30 rounded-full" />
            </div>
            <span className="text-xl font-grotesk font-bold tracking-tight">
              <span className="text-white">Khalid</span>
              <span className="neon-text-blue"> Muhammad</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue transition-all duration-300 group-hover:w-full shadow-sm" style={{ boxShadow: '0 0 6px #00F5FF' }} />
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              download="Khalid_Resume.pdf"
              className="neon-button-blue flex items-center space-x-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-neon-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden navbar-glass border-t border-neon-blue/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-gray-300 hover:text-neon-blue hover:bg-neon-blue/5 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download="Khalid_Resume.pdf"
                className="flex items-center space-x-2 py-3 px-4 text-neon-blue font-medium"
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;