import React from 'react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 py-10 border-t border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Code className="h-6 w-6 text-neon-blue mr-2" />
            <span className="text-xl font-montserrat font-bold tracking-tight">
              <span className="text-white">Khalid</span>
              <span className="neon-text-blue">Muhammmad</span>
            </span>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@yourname.com"
              className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-gray-500 text-sm">
            <p>&copy; {currentYear} | Code forged with discipline and caffeine</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;