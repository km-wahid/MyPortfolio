import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Rocket, Code } from 'lucide-react';
import Gear from './Gear';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const highlights = [
    {
      icon: <Brain className="h-6 w-6 text-neon-blue" />,
      title: 'System-level thinking',
      description: 'Passion for understanding complex systems and architectures from the ground up.',
    },
    {
      icon: <Cpu className="h-6 w-6 text-neon-orange" />,
      title: 'Real Projects',
      description: 'Experience building WhatsApp automation, CLO tools, and Django + Selenium apps.',
    },
    {
      icon: <Rocket className="h-6 w-6 text-neon-purple" />,
      title: 'Automation Focus',
      description: 'Dedicated to turning complexity into clean, automated systems.',
    },
    {
      icon: <Code className="h-6 w-6 text-accent-success" />,
      title: 'Future Builder',
      description: 'Every line of code is a brick in the future I\'m building.',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Gear
          size={200}
          top="10%"
          left="5%"
          opacity={0.05}
          className="animate-slowRotateGear hidden lg:block"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-neon-blue mb-4 uppercase font-semibold tracking-wider">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Engineer <span className="text-gradient">Behind the Code</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="bg-dark-200 rounded-lg p-6 border border-dark-100 shadow-xl">
                <p className="text-lg leading-relaxed mb-6">
                  Hi, I'm a Software  developer on a mission to understanding complex system and find the best solution. I
                  don't just learn — I reverse-engineer. I dive deep into backend architecture, automation, and
                  full-stack development with the mindset of a builder and strategist.
                </p>
                <p className="text-lg leading-relaxed">
                  With a background in Django and a passion for system design, I approach every project as an
                  opportunity to build something exceptional. I believe in elegant automation, robust architecture, and
                  code that stands the test of time.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="bg-dark-200 rounded-lg p-4 border border-dark-100 hover:border-neon-blue transition-all duration-300 shadow-md"
                  >
                    <div className="flex items-center mb-3">
                      <div className="mr-3">{item.icon}</div>
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;