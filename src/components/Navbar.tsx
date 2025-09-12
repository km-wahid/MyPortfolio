import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-neon-blue" />
            <span className="text-xl font-montserrat font-bold tracking-tight">
              <span className="text-white">Khalid</span>
              <span className="neon-text-blue">Muhammad </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
  href="/resume.pdf"
  className="flex items-center space-x-1 neon-button-blue"
  target="_blank"
  rel="noopener noreferrer"
>
  <Download className="h-4 w-4" />
  <span>Resume</span>
</a>

          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-neon-blue"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-dark-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-300 hover:text-neon-blue transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="flex items-center space-x-1 py-2 text-neon-blue"
          >
            <Download className="h-4 w-4" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;