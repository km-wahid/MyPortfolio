import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, header = {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = Array.isArray(header.links) ? header.links : [];

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="prompt">{header.prompt || '[PORTFOLIO ~]$'}</span>
        <span className="cursor" />
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button key={`${l.label}-${l.targetId}`} onClick={() => handleNav(l.targetId)}>
            <span className="cmd-prefix">./nav</span> {l.cmd}
          </button>
        ))}
        <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '[LIGHT]' : '[DARK]'}
        </button>
      </div>
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </div>
    </nav>
  );
};

export default Navbar;
