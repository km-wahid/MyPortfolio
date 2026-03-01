import { Github, Linkedin, Mail, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact',  href: '#contact'  },
  ];

  return (
    <footer className="relative py-12 border-t overflow-hidden" style={{ borderColor: 'rgba(0,245,255,0.08)', background: 'rgba(11,15,26,0.9)' }}>
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(178,75,243,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-2 group" whileHover={{ scale: 1.03 }}>
            <div className="relative">
              <Cpu className="h-5 w-5 text-neon-blue" />
              <div className="absolute inset-0 blur-sm bg-neon-blue opacity-20 rounded-full" />
            </div>
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
            {[
              { href: 'https://github.com/km-wahid', icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
              { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=khalidmuhammad.official@gmail.com', icon: <Mail className="h-4 w-4" />, label: 'Email' },
            ].map((s) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-neon-blue transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                whileHover={{ y: -2, borderColor: 'rgba(0,245,255,0.3)' }}
                title={s.label}
              >
                {s.icon}
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
            Code forged with discipline and caffeine ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
