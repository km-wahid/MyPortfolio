import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { FooterContent, SocialLink } from "../content/siteContent";
const logo = "/dist/assets/coding-Cvd-eEEH.png";

interface FooterProps {
  content: FooterContent;
  socials: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ content, socials }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact',  href: '#contact'  },
  ];

  return (
    <footer className="relative py-10 overflow-hidden portfolio-footer-shell">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(19,255,170,0.42), rgba(30,103,198,0.38), rgba(206,132,207,0.42), transparent)' }} />

      <div
        className="w-full px-4 sm:px-6 lg:px-8 rounded-3xl py-8"
        style={{ border: '1px solid rgba(148,163,184,0.22)', background: 'linear-gradient(150deg, rgba(10,14,26,0.9), rgba(18,12,30,0.85))', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-2 group" whileHover={{ scale: 1.03 }}>
            <img src={logo} alt="Logo" className="h-9 w-9 rounded-xl object-cover border border-white/10" />
            <span className="font-grotesk font-bold text-lg">
              <span className="text-white">Khalid</span>
              <span className="neon-text-blue"> Muhammad</span>
            </span>
          </motion.a>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href}
                className="text-sm text-gray-500 hover:text-neon-blue transition-colors duration-200 font-medium">
                {l.name}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-neon-blue transition-all duration-300"
                style={{ background: 'rgba(19,255,170,0.06)', border: '1px solid rgba(148,163,184,0.2)' }}
                whileHover={{ y: -2, borderColor: 'rgba(19,255,170,0.38)' }}
                title={s.label}
              >
                {s.label === 'GitHub' && <Github className="h-4 w-4" />}
                {s.label === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                {s.label === 'Email' && <Mail className="h-4 w-4" />}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-gray-600 text-xs">
            &copy; {currentYear} Khalid Muhammad · All rights reserved
          </p>
          <p className="text-gray-600 text-xs">
            {content.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
