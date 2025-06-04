import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download, Code } from 'lucide-react';
import Gear from './Gear';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center circuit-board-bg pt-16 overflow-hidden">
      {/* Background gears */}
      <Gear
        size={300}
        top="10%"
        right="-5%"
        opacity={0.07}
        className="animate-slowRotateGear hidden lg:block"
      />
      <Gear
        size={200}
        bottom="10%"
        left="-5%"
        opacity={0.05}
        className="animate-rotateGear hidden lg:block"
      />
      <Gear
        size={150}
        top="60%"
        right="10%"
        opacity={0.05}
        className="animate-rotateGear hidden lg:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <p className="text-neon-orange mb-4 font-semibold tracking-wider">
              SOFTWARE DEVELOPER
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="glitch" data-text="From logic to launch —">
                From logic to launch —
              </span>
              <br />
              <span className="text-gradient">I build systems that work.</span>
            </h1>
            <h2 className="text-gray-400 text-xl mb-8">
              <TypeAnimation
                sequence={[
                  'Software Developer',
                  1000,
                  'Automation Enthusiast',
                  1000,
                  'Problem Solver',
                  1000,
                ]}
                repeat={Infinity}
              />
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#contact" className="neon-button-blue">
                Let's Connect
              </a>
              <a href="#" className="neon-button-orange">
                <span className="flex items-center">
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/km-wahid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=khalidmuhammad.official@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="perspective-container hidden lg:block"
          >
            <div className="relative w-full h-96 card-3d">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <Gear
                    size={250}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotateGear"
                    color="#00f0ff"
                    opacity={0.2}
                  />
                  <Gear
                    size={150}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slowRotateGear"
                    color="#ff7b00"
                    opacity={0.2}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-dark-200 flex items-center justify-center border-2 border-neon-blue shadow-lg z-10">
                    <Code className="h-10 w-10 text-neon-blue" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-500 hover:text-neon-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
