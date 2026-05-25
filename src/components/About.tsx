import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Rocket, Code, CheckCircle } from 'lucide-react';
import { AboutContent } from '../content/siteContent';

interface AboutProps {
  content: AboutContent;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const highlights = [
    {
      icon: <Brain className="h-5 w-5 text-blue-400" />,
      title: 'System-level thinking',
      description: 'Passion for understanding complex systems and architectures from the ground up.',
      color: 'border-blue-500/20',
      bg: 'bg-blue-500/5',
    },
    {
      icon: <Cpu className="h-5 w-5 text-amber-400" />,
      title: 'Real Projects',
      description: 'Experience building WhatsApp automation, CLO tools, and Django + Selenium apps.',
      color: 'border-amber-500/20',
      bg: 'bg-amber-500/5',
    },
    {
      icon: <Rocket className="h-5 w-5 text-teal-400" />,
      title: 'Automation Focus',
      description: 'Dedicated to turning complexity into clean, automated systems.',
      color: 'border-teal-500/20',
      bg: 'bg-teal-500/5',
    },
    {
      icon: <Code className="h-5 w-5 text-indigo-400" />,
      title: 'Future Builder',
      description: "Every line of code is a brick in the future I'm building.",
      color: 'border-indigo-500/20',
      bg: 'bg-indigo-500/5',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="glow-divider w-2/3 mb-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex justify-center mb-4">
              <span className="section-tag">About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {content.title} <span className="text-gradient">{content.subtitle}</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Bridging the gap between backend engineering and intelligent AI systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-2xl" />
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-teal-500/10 to-transparent rounded-br-2xl" />
                </div>

                {content.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={`${paragraph.slice(0, 20)}-${index}`}
                    variants={itemVariants}
                    transition={{ delay: index * 0.08 }}
                    className={`text-slate-300 text-base sm:text-lg leading-relaxed ${index < content.paragraphs.length - 1 ? 'mb-6' : ''}`}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-slate-700/30">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Available for new opportunities</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 md:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`glass-card rounded-xl p-5 transition-all duration-300 relative overflow-hidden group border ${item.color}`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                      style={{ background: `radial-gradient(circle at 50% 0%, ${item.bg.replace('/5', '/15')} 0%, transparent 70%)` }}
                    />
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative border ${item.color}`}
                      style={{ background: item.bg }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="glow-divider w-2/3 mt-16 sm:mt-24" />
    </section>
  );
};

export default About;
